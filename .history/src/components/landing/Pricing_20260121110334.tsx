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
      const cards = cardsRef.current.filter(Boolean);
      
      // Asegurar que las tarjetas sean visibles desde el inicio
      gsap.set(cards, { opacity: 1, y: 0 });
      
      // Animar solo si el scroll trigger se dispara
      gsap.from(cards, {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="py-24 md:py-32 px-4 md:px-6 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
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
            className={`px-6 py-3 text-sm font-mono transition-all rounded-l-xl border border-foreground/20 ${
              !isYearly
                ? "bg-foreground text-background"
                : "bg-background text-foreground hover:bg-muted/50"
            }`}
          >
            Mensual
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-6 py-3 text-sm font-mono transition-all rounded-r-xl border border-foreground/20 border-l-0 ${
              isYearly
                ? "bg-foreground text-background"
                : "bg-background text-foreground hover:bg-muted/50"
            }`}
          >
            Anual
            <span className="ml-2 text-xs opacity-70">-17%</span>
          </button>
        </div>

        {/* Cards */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`relative p-6 md:p-8 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 opacity-100 ${
                plan.popular
                  ? "bg-foreground text-background shadow-2xl md:scale-[1.02]"
                  : "bg-card border-2 border-foreground/10 shadow-sm hover:border-foreground/20"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-6 bg-accent text-accent-foreground px-4 py-1.5 text-xs font-mono rounded-full shadow-md">
                  Más popular
                </div>
              )}

              {/* Plan name */}
              <div className="mb-6">
                <h3 className="text-lg font-mono mb-1">{plan.name}</h3>
                <p className={`text-sm ${plan.popular ? "text-background/70" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl md:text-5xl tracking-tight">
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
                className={`w-full mb-6 h-12 font-mono text-sm rounded-xl transition-all ${
                  plan.popular
                    ? "border-background/40 text-background bg-background/10 hover:bg-background hover:text-foreground"
                    : "bg-foreground text-background hover:bg-foreground/90"
                }`}
                asChild
              >
                <Link to="/auth">
                  {plan.cta}
                  <span className="ml-2">→</span>
                </Link>
              </Button>

              {/* Features */}
              <ul className="space-y-2.5">
                {plan.features.map((feature, featureIndex) => (
                  <li 
                    key={featureIndex} 
                    className={`flex items-start gap-3 text-sm ${
                      plan.popular ? "text-background/90" : "text-foreground/70"
                    }`}
                  >
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${plan.popular ? "bg-accent" : "bg-foreground/40"}`} />
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
