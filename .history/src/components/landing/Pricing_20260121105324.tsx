import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current.filter(Boolean), {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="py-24 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4">
            Planes simples,
            <br />
            sin sorpresas
          </h2>
          <p className="text-lg text-muted-foreground font-serif">
            Elige el plan que mejor se adapte a tu negocio
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center gap-0 mb-12">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-6 py-3 text-sm font-mono border-2 border-foreground transition-colors ${
              !isYearly
                ? "bg-foreground text-background"
                : "bg-background text-foreground hover:bg-muted"
            }`}
          >
            Mensual
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-6 py-3 text-sm font-mono border-2 border-foreground border-l-0 transition-colors ${
              isYearly
                ? "bg-foreground text-background"
                : "bg-background text-foreground hover:bg-muted"
            }`}
          >
            Anual
            <span className="ml-2 text-xs opacity-70">-17%</span>
          </button>
        </div>

        {/* Cards */}
        <div className="grid gap-0 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`relative p-8 md:p-10 border-2 border-foreground ${
                index > 0 ? "md:border-l-0" : ""
              } ${
                plan.popular
                  ? "bg-foreground text-background"
                  : "bg-background text-foreground"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-px left-8 bg-background text-foreground px-4 py-1 text-xs font-mono -translate-y-1/2">
                  Más popular
                </div>
              )}

              {/* Plan name */}
              <div className="mb-8">
                <h3 className="text-lg font-mono mb-1">{plan.name}</h3>
                <p className={`text-sm ${plan.popular ? "text-background/70" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl md:text-6xl tracking-tight">
                    ${isYearly ? plan.priceYearly : plan.priceMonthly}
                  </span>
                  <span className={`text-sm ${plan.popular ? "text-background/70" : "text-muted-foreground"}`}>
                    MXN/{isYearly ? "año" : "mes"}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <Button
                variant={plan.popular ? "outline" : "default"}
                className={`w-full mb-8 h-12 font-mono text-sm rounded-none border-2 ${
                  plan.popular
                    ? "border-background text-background hover:bg-background hover:text-foreground"
                    : "border-foreground bg-foreground text-background hover:bg-background hover:text-foreground"
                }`}
                asChild
              >
                <Link to="/auth">
                  {plan.cta}
                  <span className="ml-2">→</span>
                </Link>
              </Button>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li 
                    key={featureIndex} 
                    className={`flex items-start gap-3 text-sm ${
                      plan.popular ? "text-background/90" : "text-foreground/80"
                    }`}
                  >
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-current shrink-0" />
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
