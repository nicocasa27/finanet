-- Crear enum para roles de usuario
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Crear enum para planes de suscripción
CREATE TYPE public.subscription_plan AS ENUM ('free', 'pro', 'team');

-- Crear enum para estado de suscripción
CREATE TYPE public.subscription_status AS ENUM ('active', 'canceled', 'past_due', 'trialing');

-- Crear enum para tipo de transacción
CREATE TYPE public.transaction_type AS ENUM ('income', 'expense');

-- Tabla de perfiles de usuario
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabla de roles de usuario (separada por seguridad)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    UNIQUE (user_id, role)
);

-- Tabla de negocios
CREATE TABLE public.businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    type TEXT,
    currency TEXT DEFAULT 'MXN',
    timezone TEXT DEFAULT 'America/Mexico_City',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabla de categorías
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
    type transaction_type NOT NULL,
    name TEXT NOT NULL,
    color TEXT DEFAULT '#6366F1',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabla de transacciones
CREATE TABLE public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
    type transaction_type NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    note TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabla de suscripciones
CREATE TABLE public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    plan subscription_plan NOT NULL DEFAULT 'free',
    status subscription_status NOT NULL DEFAULT 'active',
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabla de logs de auditoría
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS en todas las tablas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Función para verificar rol (SECURITY DEFINER para evitar recursión)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role = _role
    )
$$;

-- Función para actualizar timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Función para crear perfil y suscripción al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Crear perfil
    INSERT INTO public.profiles (id, full_name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
    
    -- Crear rol de usuario
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user');
    
    -- Crear suscripción gratuita
    INSERT INTO public.subscriptions (user_id, plan, status)
    VALUES (NEW.id, 'free', 'active');
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger para nuevos usuarios
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Triggers para actualizar timestamps
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_businesses_updated_at
    BEFORE UPDATE ON public.businesses
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
    BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Políticas RLS para profiles
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Políticas RLS para user_roles (solo admins pueden ver roles)
CREATE POLICY "Users can view own role"
    ON public.user_roles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
    ON public.user_roles FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));

-- Políticas RLS para businesses
CREATE POLICY "Users can view own businesses"
    ON public.businesses FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create own businesses"
    ON public.businesses FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own businesses"
    ON public.businesses FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own businesses"
    ON public.businesses FOR DELETE
    USING (auth.uid() = user_id);

-- Políticas RLS para categories
CREATE POLICY "Users can view categories of own businesses"
    ON public.categories FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.businesses 
        WHERE id = categories.business_id AND user_id = auth.uid()
    ));

CREATE POLICY "Users can create categories for own businesses"
    ON public.categories FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.businesses 
        WHERE id = categories.business_id AND user_id = auth.uid()
    ));

CREATE POLICY "Users can update categories of own businesses"
    ON public.categories FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM public.businesses 
        WHERE id = categories.business_id AND user_id = auth.uid()
    ));

CREATE POLICY "Users can delete categories of own businesses"
    ON public.categories FOR DELETE
    USING (EXISTS (
        SELECT 1 FROM public.businesses 
        WHERE id = categories.business_id AND user_id = auth.uid()
    ));

-- Políticas RLS para transactions
CREATE POLICY "Users can view transactions of own businesses"
    ON public.transactions FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.businesses 
        WHERE id = transactions.business_id AND user_id = auth.uid()
    ));

CREATE POLICY "Users can create transactions for own businesses"
    ON public.transactions FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.businesses 
        WHERE id = transactions.business_id AND user_id = auth.uid()
    ));

CREATE POLICY "Users can update transactions of own businesses"
    ON public.transactions FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM public.businesses 
        WHERE id = transactions.business_id AND user_id = auth.uid()
    ));

CREATE POLICY "Users can delete transactions of own businesses"
    ON public.transactions FOR DELETE
    USING (EXISTS (
        SELECT 1 FROM public.businesses 
        WHERE id = transactions.business_id AND user_id = auth.uid()
    ));

-- Políticas RLS para subscriptions
CREATE POLICY "Users can view own subscription"
    ON public.subscriptions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all subscriptions"
    ON public.subscriptions FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));

-- Políticas RLS para audit_logs
CREATE POLICY "Users can view own logs"
    ON public.audit_logs FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all logs"
    ON public.audit_logs FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "System can insert logs"
    ON public.audit_logs FOR INSERT
    WITH CHECK (true);