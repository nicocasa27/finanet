import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useBusiness } from "@/contexts/BusinessContext";
import { useToast } from "@/hooks/use-toast";

export type SubscriptionPlan = 'free' | 'pro' | 'team';

interface PlanLimits {
  maxTransactionsPerMonth: number | null; // null = unlimited
  maxBusinesses: number | null; // null = unlimited
}

const PLAN_LIMITS: Record<SubscriptionPlan, PlanLimits> = {
  free: { maxTransactionsPerMonth: 25, maxBusinesses: 1 },
  pro: { maxTransactionsPerMonth: null, maxBusinesses: 3 },
  team: { maxTransactionsPerMonth: null, maxBusinesses: null },
};

interface Subscription {
  id: string;
  plan: SubscriptionPlan;
  status: string;
  current_period_start: string | null;
  current_period_end: string | null;
}

interface UsageData {
  transactionsThisMonth: number;
  businessCount: number;
}

export function useSubscription() {
  const { user } = useAuth();
  const { businesses } = useBusiness();
  const { toast } = useToast();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [usage, setUsage] = useState<UsageData>({ transactionsThisMonth: 0, businessCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetchSubscription();
    fetchUsage();
  }, [user, businesses]);

  const fetchSubscription = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching subscription:", error);
    }

    // If no subscription exists, user is on free plan
    if (!data) {
      setSubscription({
        id: "",
        plan: "free",
        status: "active",
        current_period_start: null,
        current_period_end: null,
      });
    } else {
      setSubscription(data as Subscription);
    }
    setLoading(false);
  };

  const fetchUsage = async () => {
    if (!user) return;

    // Count transactions this month across all user's businesses
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const businessIds = businesses.map(b => b.id);
    
    if (businessIds.length === 0) {
      setUsage({ transactionsThisMonth: 0, businessCount: 0 });
      return;
    }

    const { count, error } = await supabase
      .from("transactions")
      .select("*", { count: "exact", head: true })
      .in("business_id", businessIds)
      .gte("created_at", startOfMonth.toISOString());

    if (error) {
      console.error("Error fetching usage:", error);
    }

    setUsage({
      transactionsThisMonth: count || 0,
      businessCount: businesses.length,
    });
  };

  const plan = subscription?.plan || "free";
  const limits = PLAN_LIMITS[plan];

  const canAddTransaction = () => {
    if (limits.maxTransactionsPerMonth === null) return true;
    return usage.transactionsThisMonth < limits.maxTransactionsPerMonth;
  };

  const canAddBusiness = () => {
    if (limits.maxBusinesses === null) return true;
    return usage.businessCount < limits.maxBusinesses;
  };

  const getTransactionUsagePercent = () => {
    if (limits.maxTransactionsPerMonth === null) return 0;
    return Math.min(100, (usage.transactionsThisMonth / limits.maxTransactionsPerMonth) * 100);
  };

  const redeemPromoCode = async (code: string): Promise<{ success: boolean; message: string }> => {
    if (!user) {
      return { success: false, message: "No autenticado" };
    }

    const { data, error } = await supabase.rpc("redeem_promo_code", { p_code: code });

    if (error) {
      console.error("Error redeeming code:", error);
      return { success: false, message: "Error al canjear el código" };
    }

    const result = data as { success: boolean; error?: string; message?: string; plan?: string };

    if (result.success) {
      toast({
        title: "¡Código canjeado!",
        description: result.message || `Plan actualizado a ${result.plan}`,
      });
      await fetchSubscription();
      return { success: true, message: result.message || "Plan actualizado" };
    } else {
      return { success: false, message: result.error || "Código inválido" };
    }
  };

  return {
    subscription,
    plan,
    limits,
    usage,
    loading,
    canAddTransaction,
    canAddBusiness,
    getTransactionUsagePercent,
    redeemPromoCode,
    refetch: fetchSubscription,
  };
}
