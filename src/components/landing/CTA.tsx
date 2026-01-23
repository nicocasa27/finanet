import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.children || [], {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%"
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return <section ref={sectionRef} className="py-24 md:py-32 px-4 md:px-6 bg-foreground">
      <div className="max-w-4xl mx-auto">
        {/* Card interior blanco para contraste */}
        <div ref={contentRef} className="bg-background rounded-2xl p-10 md:p-16 text-center border-2 border-foreground/10">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground mb-6">
            Empieza a tomar el control
            <br />
            de tus finanzas
          </h2>
          
          <p className="font-serif text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Únete a cientos de emprendedores que ya entienden sus números
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth" className="inline-flex items-center justify-center bg-foreground text-background px-8 h-14 font-mono text-sm hover:bg-foreground/90 transition-all hover:scale-105">
              Comenzar gratis
              <span className="ml-2">→</span>
            </Link>
            <button className="inline-flex items-center justify-center border-2 border-foreground text-foreground px-8 h-14 font-mono text-sm hover:bg-foreground/5 transition-all">
              Ver demo
            </button>
          </div>
        </div>
      </div>

      {/* Yellow accent bar at the bottom */}
      
    </section>;
}