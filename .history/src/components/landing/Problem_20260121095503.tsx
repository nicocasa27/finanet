import { AlertTriangle, FileSpreadsheet, HelpCircle, TrendingDown } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const problems = [
  {
    icon: FileSpreadsheet,
    title: "Excel no es para todos",
    description: "Hojas complicadas, fórmulas rotas y horas perdidas tratando de entender qué pasó con tu dinero.",
  },
  {
    icon: HelpCircle,
    title: "¿Realmente ganas dinero?",
    description: "Vendes, pagas, pero al final del mes no sabes si realmente hubo ganancia o pérdida.",
  },
  {
    icon: TrendingDown,
    title: "Números rojos invisibles",
    description: "Sin un sistema, los gastos se acumulan silenciosamente hasta que es demasiado tarde.",
  },
  {
    icon: AlertTriangle,
    title: "Decisiones a ciegas",
    description: "¿Subir precios? ¿Cortar gastos? Sin datos claros, cada decisión es un riesgo.",
  },
];

export function Problem() {
  const containerRef = useScrollAnimation();

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-muted/30">
      <div className="container px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="animate-on-scroll text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            El problema que enfrentas
          </h2>
          <p className="animate-on-scroll text-lg text-muted-foreground">
            Emprender es difícil. No saber tus números lo hace imposible.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="animate-on-scroll group relative bg-card rounded-2xl p-6 border border-border/50 card-elevated"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                <problem.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{problem.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
