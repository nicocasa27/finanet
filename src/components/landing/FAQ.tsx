import { useEffect, useRef, useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "¿Tengo un side hustle pequeño, me sirve Finanet?",
    answer: "¡Claro! Finanet está diseñado exactamente para eso: emprendimientos pequeños como venta de brownies, galletas, productos artesanales, servicios freelance. No importa si vendes 10 o 1000 unidades.",
  },
  {
    question: "¿Puedo usarlo para un proyecto de clase?",
    answer: "Sí, muchos estudiantes usan Finanet para sus proyectos de emprendimiento. Puedes generar reportes PDF listos para presentar a tus profesores o en pitch competitions.",
  },
  {
    question: "¿Cómo calculo cuánto debo cobrar?",
    answer: "Agrega tus ingredientes/insumos con sus costos, indica cuánto usas de cada uno en tu producto, y Finanet calculará el costo total. Luego usa la calculadora de precio para definir tu margen deseado.",
  },
  {
    question: "¿Qué pasa cuando me gradúe?",
    answer: "Tu cuenta y datos se mantienen. Puedes seguir usando el plan gratuito o actualizar a Pro si tu negocio crece. Muchos usuarios empiezan como estudiantes y continúan después.",
  },
  {
    question: "¿Es realmente gratis para estudiantes?",
    answer: "El plan gratuito es para siempre y te permite hasta 3 productos y 10 insumos. Para la mayoría de side hustles universitarios es suficiente. Si necesitas más, el plan Estudiante es muy accesible.",
  },
  {
    question: "¿Necesito facturar para usar Finanet?",
    answer: "No necesitas. Finanet es para calcular costos y márgenes, no para facturación. Es perfecto para emprendimientos informales que quieren profesionalizarse poco a poco.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-item", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-4 md:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-accent/30" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-6">
            <HelpCircle className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-foreground/80">Preguntas frecuentes</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            ¿Tienes{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              preguntas?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            Respuestas para emprendedores universitarios
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item bg-white rounded-2xl border border-border/50 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full p-6 flex items-center justify-between text-left group"
              >
                <span className="text-lg font-medium pr-4 group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
                <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                  openIndex === index 
                    ? 'bg-gradient-to-br from-primary to-secondary' 
                    : 'bg-muted group-hover:bg-primary/10'
                }`}>
                  <ChevronDown
                    className={`w-5 h-5 transition-all duration-300 ${
                      openIndex === index ? "rotate-180 text-white" : "text-foreground/60"
                    }`}
                  />
                </div>
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 font-body text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
