import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const plans = [
  {
    name: "Gratis",
    description: "Para empezar a conocer tus números",
    priceMonthly: 0,
    priceYearly: 0,
    features: [
      "100 transacciones/mes",
      "1 negocio",
      "Dashboard básico",
      "Reportes del mes actual",
      "Categorías predefinidas",
    ],
    cta: "Comenzar gratis",
    popular: false,
  },
  {
    name: "Pro",
    description: "Para emprendedores serios",
    priceMonthly: 199,
    priceYearly: 1990,
    features: [
      "Transacciones ilimitadas",
      "3 negocios",
      "Dashboard completo",
      "Reportes históricos",
      "Categorías personalizadas",
      "Exportar PDF/CSV",
      "Indicadores avanzados",
      "Proyecciones",
      "Alertas inteligentes",
    ],
    cta: "Comenzar Pro",
    popular: true,
  },
  {
    name: "Negocio",
    description: "Para equipos y empresas",
    priceMonthly: 499,
    priceYearly: 4990,
    features: [
      "Todo en Pro",
      "Negocios ilimitados",
      "Usuarios del equipo",
      "Roles y permisos",
      "Soporte prioritario",
      "API access",
      "Reportes personalizados",
    ],
    cta: "Contactar ventas",
    popular: false,
  },
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const containerRef = useScrollAnimation();

  return (
    <section id="pricing" ref={containerRef} className="py-24 md:py-32 bg-muted/30">
      <div className="container px-4">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="animate-on-scroll text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Planes simples, sin sorpresas
          </h2>
          <p className="animate-on-scroll text-lg text-muted-foreground mb-8">
            Elige el plan que mejor se adapte a tu negocio
          </p>

          {/* Toggle */}
          <div className="animate-on-scroll inline-flex items-center gap-3 rounded-full bg-muted p-1.5">
            <button
              onClick={() => setIsYearly(false)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                !isYearly
                  ? "bg-background shadow-premium-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                isYearly
                  ? "bg-background shadow-premium-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Anual
              <span className="ml-1.5 rounded-full bg-success/10 px-2 py-0.5 text-xs text-success">
                -17%
              </span>
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`animate-on-scroll relative bg-card rounded-3xl p-8 border ${
                plan.popular
                  ? "border-primary shadow-premium-lg scale-105"
                  : "border-border/50"
              } card-elevated`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    <Sparkles className="h-3 w-3" />
                    Más popular
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">
                    ${isYearly ? plan.priceYearly : plan.priceMonthly}
                  </span>
                  <span className="text-muted-foreground">
                    MXN/{isYearly ? "año" : "mes"}
                  </span>
                </div>
              </div>

              <Button
                variant={plan.popular ? "hero" : "outline"}
                className="w-full mb-6"
                size="lg"
                asChild
              >
                <Link to="/auth">{plan.cta}</Link>
              </Button>

              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
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
    </section>
  );
}
