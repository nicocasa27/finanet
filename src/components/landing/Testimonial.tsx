import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "Estaba cobrando mis brownies muy baratos. Finanet me mostró que perdía dinero en cada venta. Ahora tengo 40% de margen.",
    author: "Ana Martínez",
    role: "Repostería artesanal",
    metric: "+40%",
    metricLabel: "margen",
  },
  {
    quote: "Usé el reporte de costeo para mi proyecto de emprendimiento y saqué 10. Mis profes quedaron impresionados con el nivel de detalle.",
    author: "Carlos López", 
    role: "Estudiante de Negocios, ITESM",
    metric: "10/10",
    metricLabel: "calificación",
  },
  {
    quote: "Por fin sé exactamente cuánto me cuesta cada producto. El simulador me ayudó a planear cuando subieron los materiales.",
    author: "María González",
    role: "Joyería artesanal",
    metric: "3x",
    metricLabel: "productos",
  },
];

export function Testimonial() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 md:py-32 px-4 md:px-6 w-full bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <p className="font-mono text-sm text-muted-foreground uppercase tracking-wider mb-4">
              [ Testimonios ]
            </p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              Lo que dicen
              <br />
              <span className="text-secondary">quienes ya lo usan</span>
            </h2>
          </div>
          
          {/* Navigation arrows */}
          <div className="flex gap-3">
            <button
              onClick={prev}
              className="h-14 w-14 border-2 border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={next}
              className="h-14 w-14 bg-foreground text-background flex items-center justify-center hover:bg-foreground/80 transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Testimonial display - Large single card */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Main quote - spans 2 cols */}
          <div className="md:col-span-2 bg-foreground text-background p-8 md:p-12 min-h-[300px] flex flex-col justify-between">
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed mb-8">
              "{testimonials[current].quote}"
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 bg-secondary flex items-center justify-center text-foreground font-bold text-lg">
                {testimonials[current].author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-bold text-lg">{testimonials[current].author}</p>
                <p className="text-background/60">{testimonials[current].role}</p>
              </div>
            </div>
          </div>

          {/* Metric highlight */}
          <div className="bg-secondary text-foreground p-8 md:p-12 flex flex-col justify-center items-center text-center">
            <span className="text-6xl md:text-7xl lg:text-8xl font-bold mb-2">
              {testimonials[current].metric}
            </span>
            <span className="text-foreground/80 font-medium uppercase tracking-wider">
              {testimonials[current].metricLabel}
            </span>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 transition-all duration-300 ${
                index === current 
                  ? "w-8 bg-secondary" 
                  : "w-2 bg-foreground/20 hover:bg-foreground/40"
              }`}
              aria-label={`Ver testimonio ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
