import { Compass, Globe, ArrowRight } from "lucide-react";

const principles = [
  {
    icon: Compass,
    title: "Claridad impulsa acción",
    description: "Creemos que mejores decisiones empiezan con mejores datos—medidos, visibles y confiables.",
  },
  {
    icon: Globe,
    title: "Finanzas son un sistema",
    description: "Construimos herramientas que ayudan a conectar los puntos entre operaciones, impacto y responsabilidad.",
  },
  {
    icon: ArrowRight,
    title: "Progreso sobre perfección",
    description: "Apoyamos el impulso del mundo real—ayudando a las organizaciones a pasar de la ambición al cambio medible.",
  },
];

export function Principles() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-6 w-full bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-sans font-medium text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-center mb-12 md:mb-20">
          Diseñado para claridad<br />Construido para acción
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {principles.map((principle, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 border-2 border-foreground/10 hover:border-foreground/30 transition-colors"
            >
              <div className="mb-6">
                <principle.icon className="w-8 h-8 text-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="font-sans font-medium text-xl md:text-2xl mb-4 tracking-tight">
                {principle.title}
              </h3>
              <p className="font-serif text-base md:text-lg text-foreground/80 leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
