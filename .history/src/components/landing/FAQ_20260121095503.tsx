import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const faqs = [
  {
    question: "¿Necesito saber de contabilidad para usar Prisma?",
    answer: "Para nada. Prisma está diseñado para emprendedores sin conocimientos contables. Solo registra cuánto entra y cuánto sale, nosotros hacemos el resto.",
  },
  {
    question: "¿Qué diferencia hay entre Prisma y una hoja de Excel?",
    answer: "Excel requiere fórmulas, organización y tiempo. Prisma es automático: registras un movimiento y al instante ves tu utilidad, márgenes y alertas. Sin errores, sin complicaciones.",
  },
  {
    question: "¿Mis datos están seguros?",
    answer: "Absolutamente. Usamos encriptación de nivel bancario, copias de seguridad automáticas y servidores seguros. Tus datos financieros están protegidos 24/7.",
  },
  {
    question: "¿Puedo usar Prisma para varios negocios?",
    answer: "Sí. En el plan Pro puedes gestionar hasta 3 negocios, y en el plan Negocio no hay límite. Cada negocio tiene su propio dashboard y reportes.",
  },
  {
    question: "¿Qué pasa si supero el límite del plan gratuito?",
    answer: "Te notificaremos cuando estés cerca del límite. Puedes actualizar a Pro en cualquier momento para seguir registrando movimientos sin perder tu historial.",
  },
  {
    question: "¿Puedo cancelar mi suscripción en cualquier momento?",
    answer: "Sí, sin compromisos. Cancela cuando quieras y seguirás teniendo acceso hasta el final de tu período de facturación.",
  },
  {
    question: "¿Prisma genera facturas o reemplaza a mi contador?",
    answer: "Prisma te ayuda a entender tus números y tomar decisiones, pero no genera facturas fiscales ni reemplaza asesoría contable profesional. Es tu copiloto financiero.",
  },
];

export function FAQ() {
  const containerRef = useScrollAnimation();

  return (
    <section ref={containerRef} className="py-24 md:py-32">
      <div className="container px-4">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="animate-on-scroll text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Preguntas frecuentes
          </h2>
          <p className="animate-on-scroll text-lg text-muted-foreground">
            ¿Tienes dudas? Aquí están las respuestas más comunes
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="animate-on-scroll bg-card rounded-2xl border border-border/50 px-6 data-[state=open]:shadow-premium-md transition-shadow"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
