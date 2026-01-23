-- Create promotional_codes table for testing Pro/Team access
CREATE TABLE public.promotional_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    plan public.subscription_plan NOT NULL DEFAULT 'pro',
    uses_remaining INTEGER DEFAULT NULL,
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    is_active BOOLEAN NOT NULL DEFAULT true
);

-- Enable RLS
ALTER TABLE public.promotional_codes ENABLE ROW LEVEL SECURITY;

-- Anyone can read active codes (to validate)
CREATE POLICY "Anyone can read active codes"
ON public.promotional_codes
FOR SELECT
USING (is_active = true);

-- Only admins can manage codes
CREATE POLICY "Admins can manage codes"
ON public.promotional_codes
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create code_redemptions to track who used what code
CREATE TABLE public.code_redemptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    code_id UUID NOT NULL REFERENCES public.promotional_codes(id),
    redeemed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(user_id, code_id)
);

-- Enable RLS
ALTER TABLE public.code_redemptions ENABLE ROW LEVEL SECURITY;

-- Users can see their own redemptions
CREATE POLICY "Users can view own redemptions"
ON public.code_redemptions
FOR SELECT
USING (auth.uid() = user_id);

-- Users can redeem codes
CREATE POLICY "Users can redeem codes"
ON public.code_redemptions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create function to redeem a promotional code
CREATE OR REPLACE FUNCTION public.redeem_promo_code(p_code TEXT)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_code_record promotional_codes%ROWTYPE;
    v_user_id UUID := auth.uid();
BEGIN
    IF v_user_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'No autenticado');
    END IF;

    SELECT * INTO v_code_record
    FROM promotional_codes
    WHERE UPPER(code) = UPPER(p_code)
      AND is_active = true
      AND (expires_at IS NULL OR expires_at > now())
      AND (uses_remaining IS NULL OR uses_remaining > 0);

    IF v_code_record.id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Código inválido o expirado');
    END IF;

    IF EXISTS (SELECT 1 FROM code_redemptions WHERE user_id = v_user_id AND code_id = v_code_record.id) THEN
        RETURN jsonb_build_object('success', false, 'error', 'Ya has usado este código');
    END IF;

    INSERT INTO code_redemptions (user_id, code_id) VALUES (v_user_id, v_code_record.id);

    IF v_code_record.uses_remaining IS NOT NULL THEN
        UPDATE promotional_codes SET uses_remaining = uses_remaining - 1 WHERE id = v_code_record.id;
    END IF;

    INSERT INTO subscriptions (user_id, plan, status)
    VALUES (v_user_id, v_code_record.plan, 'active')
    ON CONFLICT (user_id) 
    DO UPDATE SET plan = v_code_record.plan, status = 'active', updated_at = now();

    RETURN jsonb_build_object('success', true, 'plan', v_code_record.plan::text, 'message', 'Plan actualizado a ' || v_code_record.plan::text);
END;
$$;

-- Insert test promotional codes
INSERT INTO promotional_codes (code, plan, uses_remaining) VALUES
    ('PRISMA-PRO-2024', 'pro', NULL),
    ('PRISMA-TEAM-VIP', 'team', 10),
    ('TESTPRO', 'pro', NULL);

-- Create admin stats function
CREATE OR REPLACE FUNCTION public.get_admin_stats()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_stats jsonb;
BEGIN
    IF NOT public.has_role(auth.uid(), 'admin') THEN
        RETURN jsonb_build_object('error', 'No autorizado');
    END IF;

    SELECT jsonb_build_object(
        'total_users', (SELECT COUNT(*) FROM auth.users),
        'free_users', (SELECT COUNT(*) FROM subscriptions WHERE plan = 'free'),
        'pro_users', (SELECT COUNT(*) FROM subscriptions WHERE plan = 'pro'),
        'team_users', (SELECT COUNT(*) FROM subscriptions WHERE plan = 'team'),
        'active_subscriptions', (SELECT COUNT(*) FROM subscriptions WHERE status = 'active'),
        'total_businesses', (SELECT COUNT(*) FROM businesses),
        'total_transactions', (SELECT COUNT(*) FROM transactions)
    ) INTO v_stats;

    RETURN v_stats;
END;
$$;