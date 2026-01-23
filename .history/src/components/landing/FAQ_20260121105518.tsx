import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "¿Necesito saber de contabilidad?",
    answer: "Para nada. Prisma está diseñado para emprendedores sin conocimientos contables. Solo registra cuánto entra y cuánto sale, nosotros hacemos el resto.",
  },
  {
    question: "¿Qué diferencia hay con Excel?",
    answer: "Excel requiere fórmulas, organización y tiempo. Prisma es automático: registras un movimiento y al instante ves tu utilidad, márgenes y alertas. Sin errores, sin complicaciones.",
  },
  {
    question: "¿Mis datos están seguros?",
    answer: "Absolutamente. Usamos encriptación de nivel bancario, copias de seguridad automáticas y servidores seguros. Tus datos financieros están protegidos 24/7.",
  },
  {
    question: "¿Puedo gestionar varios negocios?",
    answer: "Sí. En el plan Pro puedes gestionar hasta 3 negocios, y en el plan Negocio no hay límite. Cada negocio tiene su propio dashboard y reportes.",
  },
  {
    question: "¿Qué pasa si supero el límite?",
    answer: "Te notificaremos cuando estés cerca del límite. Puedes actualizar a Pro en cualquier momento para seguir registrando movimientos sin perder tu historial.",
  },
  {
    question: "¿Puedo cancelar cuando quiera?",
    answer: "Sí, sin compromisos. Cancela cuando quieras y seguirás teniendo acceso hasta el final de tu período de facturación.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(rightRef.current, {
        opacity: 0,
        x: 40,
        duration: 0.8,
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
    <section ref={sectionRef} className="py-24 md:py-32 px-4 md:px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Left column - Title */}
          <div ref={leftRef} className="lg:col-span-2">
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-4 sticky top-24">
              Preguntas
              <br />
              frecuentes
            </h2>
            <p className="text-muted-foreground font-serif max-w-xs">
              Respuestas claras para emprendedores como tú
            </p>
          </div>

          {/* Right column - Accordion */}
          <div ref={rightRef} className="lg:col-span-3">
            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b-2 border-foreground"
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full py-6 flex items-center justify-between text-left group"
                  >
                    <span className="font-mono text-sm md:text-base pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      openIndex === index
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 font-serif text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
