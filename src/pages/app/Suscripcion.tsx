import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Sparkles, CreditCard, Calendar, ArrowRight, Gift, Loader2 } from "lucide-react";
import { useSubscriptionContext } from "@/contexts/SubscriptionContext";
import { useToast } from "@/hooks/use-toast";

const plans = [
  {
    id: "free" as const,
    name: "Gratis",
    price: 0,
    features: [
      "25 transacciones/mes",
      "1 negocio",
      "Dashboard básico",
      "Reportes del mes actual",
    ],
  },
  {
    id: "pro" as const,
    name: "Pro",
    price: 199,
    popular: true,
    features: [
      "Transacciones ilimitadas",
      "3 negocios",
      "Dashboard completo",
      "Reportes históricos",
      "Exportar PDF/CSV",
      "Indicadores avanzados",
      "Proyecciones",
      "Alertas inteligentes",
    ],
  },
  {
    id: "team" as const,
    name: "Team",
    price: 499,
    features: [
      "Todo en Pro",
      "Negocios ilimitados",
      "Usuarios del equipo",
      "Roles y permisos",
      "Soporte prioritario",
      "API access",
    ],
  },
];

export default function Suscripcion() {
  const { plan, usage, limits, getTransactionUsagePercent, redeemPromoCode } = useSubscriptionContext();
  const { toast } = useToast();
  const [promoCode, setPromoCode] = useState("");
  const [isRedeeming, setIsRedeeming] = useState(false);

  const currentPlan = plans.find(p => p.id === plan) || plans[0];
  const usagePercent = getTransactionUsagePercent();

  const handleRedeemCode = async () => {
    if (!promoCode.trim()) {
      toast({
        title: "Error",
        description: "Ingresa un código promocional",
        variant: "destructive",
      });
      return;
    }

    setIsRedeeming(true);
    const result = await redeemPromoCode(promoCode.trim());
    setIsRedeeming(false);

    if (!result.success) {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    } else {
      setPromoCode("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold">Suscripción</h1>
        <p className="text-muted-foreground">Gestiona tu plan y métodos de pago</p>
      </div>

      {/* Current plan card */}
      <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Sparkles className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tu plan actual</p>
              <h2 className="text-2xl font-bold">Plan {currentPlan.name}</h2>
              <p className="text-sm text-muted-foreground">
                {limits.maxTransactionsPerMonth 
                  ? `${usage.transactionsThisMonth} de ${limits.maxTransactionsPerMonth} transacciones usadas este mes`
                  : `${usage.transactionsThisMonth} transacciones este mes`
                }
              </p>
            </div>
          </div>
          {plan === "free" && (
            <Button variant="hero" size="lg">
              <ArrowRight className="h-4 w-4 mr-2" />
              Actualizar a Pro
            </Button>
          )}
        </div>

        {/* Usage bar */}
        {limits.maxTransactionsPerMonth && (
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Transacciones usadas</span>
              <span className="font-medium">{usage.transactionsThisMonth}/{limits.maxTransactionsPerMonth}</span>
            </div>
            <div className="h-2 bg-background rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all ${
                  usagePercent >= 90 ? 'bg-destructive' : 'bg-gradient-to-r from-primary to-secondary'
                }`}
                style={{ width: `${usagePercent}%` }}
              />
            </div>
            {usagePercent >= 80 && (
              <p className="text-xs text-amber-600 mt-2">
                ⚠️ Te quedan pocas transacciones. Actualiza tu plan para continuar sin límites.
              </p>
            )}
          </div>
        )}

        {/* Business usage */}
        <div className="mt-4 pt-4 border-t border-primary/10">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Negocios</span>
            <span className="font-medium">
              {usage.businessCount}
              {limits.maxBusinesses ? ` de ${limits.maxBusinesses}` : ' (ilimitados)'}
            </span>
          </div>
        </div>
      </div>

      {/* Promo code section */}
      <div className="bg-card rounded-2xl p-6 border border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Gift className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Código promocional</h3>
        </div>
        <div className="flex gap-3">
          <Input
            placeholder="Ingresa tu código"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            className="flex-1"
            onKeyDown={(e) => e.key === 'Enter' && handleRedeemCode()}
          />
          <Button 
            onClick={handleRedeemCode} 
            disabled={isRedeeming}
            variant="default"
          >
            {isRedeeming ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Canjear"
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          ¿Tienes un código promocional? Ingrésalo aquí para actualizar tu plan.
        </p>
      </div>

      {/* Plans comparison */}
      <div>
        <h3 className="font-semibold mb-4">Comparar planes</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((planItem) => (
            <div
              key={planItem.id}
              className={`relative bg-card rounded-2xl p-6 border ${
                planItem.popular ? "border-primary shadow-premium-lg" : "border-border/50"
              }`}
            >
              {planItem.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    <Sparkles className="h-3 w-3" />
                    Recomendado
                  </span>
                </div>
              )}

              {plan === planItem.id && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-success px-3 py-1 text-xs font-medium text-white">
                    Plan actual
                  </span>
                </div>
              )}

              <div className="mb-4">
                <h4 className="text-lg font-bold">{planItem.name}</h4>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl font-bold">${planItem.price}</span>
                  <span className="text-muted-foreground">MXN/mes</span>
                </div>
              </div>

              <Button
                variant={plan === planItem.id ? "outline" : planItem.popular ? "hero" : "default"}
                className="w-full mb-4"
                disabled={plan === planItem.id}
              >
                {plan === planItem.id ? "Plan actual" : "Seleccionar"}
              </Button>

              <ul className="space-y-2">
                {planItem.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-success shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Payment info */}
      <div className="bg-card rounded-2xl p-6 border border-border/50">
        <h3 className="font-semibold mb-4">Información de pago</h3>
        <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-background flex items-center justify-center border">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">No hay método de pago</p>
              <p className="text-sm text-muted-foreground">Agrega una tarjeta para actualizar tu plan</p>
            </div>
          </div>
          <Button variant="outline">Agregar tarjeta</Button>
        </div>
      </div>

      {/* Billing history */}
      <div className="bg-card rounded-2xl p-6 border border-border/50">
        <h3 className="font-semibold mb-4">Historial de facturación</h3>
        <div className="text-center py-8">
          <Calendar className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No hay facturas aún</p>
          <p className="text-sm text-muted-foreground">Las facturas aparecerán aquí cuando actualices tu plan</p>
        </div>
      </div>
    </div>
  );
}
