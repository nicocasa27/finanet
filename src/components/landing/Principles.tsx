import { Compass, Globe, ArrowRight, Heart, Lightbulb, Target } from "lucide-react";

const principles = [
  {
    icon: Lightbulb,
    title: "Claridad impulsa acción",
    description: "Mejores decisiones empiezan con mejores datos—medidos, visibles y confiables.",
    emoji: "💡",
  },
  {
    icon: Target,
    title: "Finanzas son un sistema",
    description: "Herramientas que conectan operaciones, impacto y responsabilidad.",
    emoji: "🎯",
  },
  {
    icon: Heart,
    title: "Progreso sobre perfección",
    description: "Apoyamos el impulso real—ayudando a pasar de la ambición al cambio medible.",
    emoji: "💜",
  },
];

export function Principles() {
  return (
    <section id="about" className="py-20 md:py-32 px-4 md:px-6 w-full relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/50 via-background to-background" />
      
      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4">
            Diseñado para{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              claridad
            </span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Construido con los principios que guían cada decisión que tomamos
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {principles.map((principle, index) => (
            <div 
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-border/50 hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1"
            >
              {/* Emoji badge */}
              <div className="absolute -top-4 -right-2 text-4xl animate-bounce-soft" style={{ animationDelay: `${index * 0.2}s` }}>
                {principle.emoji}
              </div>
              
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <principle.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {principle.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
