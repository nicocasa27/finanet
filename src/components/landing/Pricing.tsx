import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Sparkles, Zap, Crown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Gratis",
    description: "Para proyectos de clase",
    priceMonthly: 0,
    priceYearly: 0,
    icon: Sparkles,
    features: [
      "3 productos",
      "10 insumos",
      "Calculadora de precio",
      "Dashboard básico",
      "1 emprendimiento",
    ],
    cta: "Comenzar gratis",
    popular: false,
    gradient: "from-muted to-muted",
  },
  {
    name: "Estudiante",
    description: "Para side hustles serios",
    priceMonthly: 79,
    priceYearly: 790,
    icon: Zap,
    features: [
      "Productos ilimitados",
      "Insumos ilimitados",
      "Simulador de escenarios",
      "Exportar reportes PDF",
      "3 emprendimientos",
      "Historial completo",
      "Soporte prioritario",
    ],
    cta: "Comenzar Estudiante",
    popular: true,
    gradient: "from-primary to-secondary",
  },
  {
    name: "Pro",
    description: "Cuando ya no seas estudiante",
    priceMonthly: 199,
    priceYearly: 1990,
    icon: Crown,
    features: [
      "Todo en Estudiante",
      "Emprendimientos ilimitados",
      "Colaboradores",
      "API access",
      "Reportes personalizados",
      "Soporte dedicado",
    ],
    cta: "Comenzar Pro",
    popular: false,
    gradient: "from-foreground to-foreground/80",
  },
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length === 0) return;

      gsap.set(cards, { opacity: 1 });
      gsap.fromTo(
        cards,
        { y: 40 },
        {
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="py-24 md:py-32 px-4 md:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/20 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground/80">Precios para estudiantes</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Planes simples,{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              precios justos
            </span>
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-xl mx-auto">
            Empieza gratis y crece con tu emprendimiento
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-0 mb-12">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-6 py-3 text-sm font-medium transition-all rounded-l-full border-2 ${
              !isYearly
                ? "bg-gradient-to-r from-primary to-secondary text-white border-transparent"
                : "bg-white text-foreground border-border hover:border-primary/30"
            }`}
          >
            Mensual
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-6 py-3 text-sm font-medium transition-all rounded-r-full border-2 border-l-0 ${
              isYearly
                ? "bg-gradient-to-r from-primary to-secondary text-white border-transparent"
                : "bg-white text-foreground border-border hover:border-primary/30"
            }`}
          >
            Anual
            <span className="ml-2 px-2 py-0.5 bg-success/20 text-success text-xs rounded-full">-17%</span>
          </button>
        </div>

        {/* Cards */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`relative p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 opacity-100 ${
                plan.popular
                  ? "bg-gradient-to-br from-primary to-secondary text-white shadow-friendly-lg scale-[1.02]"
                  : "bg-white border border-border/50 shadow-card hover:shadow-card-hover"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-warning text-warning-foreground px-4 py-1.5 text-xs font-semibold rounded-full shadow-md flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Más popular
                </div>
              )}

              {/* Icon */}
              <div className={`h-14 w-14 rounded-2xl ${plan.popular ? 'bg-white/20' : 'bg-gradient-to-br ' + plan.gradient} flex items-center justify-center mb-6 shadow-friendly`}>
                <plan.icon className={`h-7 w-7 ${plan.popular ? 'text-white' : plan.name === 'Pro' ? 'text-white' : 'text-primary'}`} />
              </div>

              {/* Plan name */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                <p className={`text-sm ${plan.popular ? "text-white/80" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-bold tracking-tight">
                    ${isYearly ? plan.priceYearly : plan.priceMonthly}
                  </span>
                  <span className={`text-sm ${plan.popular ? "text-white/70" : "text-muted-foreground"}`}>
                    MXN/{isYearly ? "año" : "mes"}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <Button
                className={`w-full mb-6 h-12 font-semibold rounded-full transition-all ${
                  plan.popular
                    ? "bg-white text-primary hover:bg-white/90 shadow-md"
                    : "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-friendly"
                }`}
                asChild
              >
                <Link to="/auth">
                  {plan.cta}
                </Link>
              </Button>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li 
                    key={featureIndex} 
                    className={`flex items-start gap-3 text-sm ${
                      plan.popular ? "text-white/90" : "text-foreground/70"
                    }`}
                  >
                    <Check className={`h-5 w-5 shrink-0 ${plan.popular ? 'text-white' : 'text-success'}`} />
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
