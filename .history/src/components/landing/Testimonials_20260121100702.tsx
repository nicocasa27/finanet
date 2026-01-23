import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Antes terminaba el mes sin saber si había ganado o perdido. Ahora lo veo en segundos.",
    author: "María González",
    role: "Dueña de Cafetería",
    avatar: "MG",
  },
  {
    quote: "Las alertas me salvaron de un mes catastrófico. Vi a tiempo que estaba gastando de más.",
    author: "Roberto Sánchez",
    role: "Food Truck",
    avatar: "RS",
  },
  {
    quote: "Por fin entiendo mis números sin necesidad de contratar un contador cada mes.",
    author: "Ana Martínez",
    role: "Tienda Online",
    avatar: "AM",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32">
      <div className="container px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="text-lg text-muted-foreground">
            Emprendedores como tú que tomaron el control de sus finanzas
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-card rounded-2xl p-8 border border-border/50 card-elevated"
            >
              <Quote className="h-8 w-8 text-primary/20 mb-4" />
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
