import { ArrowRight, PenLine, BarChart3, Lightbulb } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  {
    number: "01",
    icon: PenLine,
    title: "Registra tus movimientos",
    description: "Agrega ingresos y gastos en segundos. Sin categorías complicadas, sin formularios eternos.",
    color: "from-primary to-primary/80",
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Visualiza tus números",
    description: "Gráficas claras te muestran tu utilidad, márgenes y tendencias al instante.",
    color: "from-secondary to-secondary/80",
  },
  {
    number: "03",
    icon: Lightbulb,
    title: "Toma decisiones informadas",
    description: "Alertas inteligentes y proyecciones te ayudan a planear el futuro de tu negocio.",
    color: "from-success to-success/80",
  },
];

export function HowItWorks() {
  const containerRef = useScrollAnimation();

  return (
    <section ref={containerRef} className="py-24 md:py-32">
      <div className="container px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="animate-on-scroll text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Así de fácil funciona
          </h2>
          <p className="animate-on-scroll text-lg text-muted-foreground">
            Tres pasos simples para tener claridad financiera
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-secondary/20 to-success/20 hidden lg:block" />

          <div className="grid gap-8 lg:gap-16">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`animate-on-scroll relative grid gap-8 lg:grid-cols-2 items-center ${
                  index % 2 === 1 ? 'lg:text-right' : ''
                }`}
              >
                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:order-2 lg:text-left' : ''}`}>
                  <div className="inline-block mb-4">
                    <span className="text-6xl font-bold text-muted-foreground/20">{step.number}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>

                {/* Icon card */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} flex justify-center`}>
                  <div className={`relative w-48 h-48 rounded-3xl bg-gradient-to-br ${step.color} p-1`}>
                    <div className="h-full w-full rounded-[22px] bg-background flex items-center justify-center">
                      <step.icon className="h-16 w-16 text-foreground/80" />
                    </div>
                    {/* Glow effect */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.color} blur-2xl opacity-30 -z-10`} />
                  </div>
                </div>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 hidden lg:block">
                    <ArrowRight className="h-6 w-6 text-muted-foreground/40 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
