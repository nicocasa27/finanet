import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Star, Quote, ArrowRight } from "lucide-react";

const testimonials = [
  {
    quote: "Antes terminaba el mes sin saber si había ganado o perdido. Ahora lo veo en segundos.",
    author: "María González",
    role: "Dueña de Cafetería",
    avatar: "MG",
    rating: 5,
  },
  {
    quote: "Las alertas me salvaron de un mes catastrófico. Vi a tiempo que estaba gastando de más.",
    author: "Roberto Sánchez",
    role: "Food Truck",
    avatar: "RS",
    rating: 5,
  },
  {
    quote: "Por fin entiendo mis números sin necesidad de contratar un contador cada mes.",
    author: "Ana Martínez",
    role: "Tienda Online",
    avatar: "AM",
    rating: 5,
  },
];

export function Testimonial() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-4 md:px-6 w-full bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/30 to-background" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-6">
            <Star className="h-4 w-4 text-secondary fill-secondary" />
            <span className="text-sm font-medium text-foreground/80">Lo que dicen nuestros usuarios</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-4">
            Emprendedores como tú
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ya confían en nosotros
            </span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-border/50 hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.5s ease-out ${index * 0.15}s`,
              }}
            >
              {/* Quote icon */}
              <div className="absolute -top-3 -left-2">
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-friendly">
                  <Quote className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 pt-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-warning fill-warning" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-body text-foreground/90 mb-6 leading-relaxed text-lg">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold shadow-friendly">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a 
            href="/auth"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            <span>Únete a ellos</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
