import { createContext, useContext, ReactNode } from "react";
import { useSubscription, SubscriptionPlan } from "@/hooks/useSubscription";

interface SubscriptionContextType {
  plan: SubscriptionPlan;
  loading: boolean;
  usage: {
    transactionsThisMonth: number;
    businessCount: number;
  };
  limits: {
    maxTransactionsPerMonth: number | null;
    maxBusinesses: number | null;
  };
  canAddTransaction: () => boolean;
  canAddBusiness: () => boolean;
  getTransactionUsagePercent: () => number;
  redeemPromoCode: (code: string) => Promise<{ success: boolean; message: string }>;
  refetch: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const subscription = useSubscription();

  return (
    <SubscriptionContext.Provider value={subscription}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscriptionContext() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscriptionContext must be used within a SubscriptionProvider");
  }
  return context;
}
