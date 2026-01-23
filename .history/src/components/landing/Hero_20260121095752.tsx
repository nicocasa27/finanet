import React, { useEffect, useRef } from 'react';
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from 'gsap';
import Silk from '@/components/ui/silk';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Animations
    const tl = gsap.timeline();
    
    tl.to(".hero-char", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out"
      })
      .to(".hero-fade-in", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.8");

  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center items-center px-4 md:px-6 pt-20 md:pt-0 overflow-hidden bg-white">
        {/* Background Silk */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
           <Silk
             speed={5}
             scale={1}
             color="#7B7481"
             noiseIntensity={1.5}
             rotation={0}
           />
        </div>

        <div className="max-w-[1800px] mx-auto w-full z-10 relative flex flex-col items-center text-center">
            
            {/* Floating Status Badge */}
            <div className="mb-8 md:mb-12 flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-md border border-white/20 shadow-sm opacity-0 hero-fade-in translate-y-4">
                <div className="flex gap-1 h-3 items-center">
                    <span className="w-1 h-full bg-primary rounded-full animate-[pulse_1s_ease-in-out_infinite]"></span>
                    <span className="w-1 h-2/3 bg-primary rounded-full animate-[pulse_1.2s_ease-in-out_infinite]"></span>
                    <span className="w-1 h-full bg-primary rounded-full animate-[pulse_0.8s_ease-in-out_infinite]"></span>
                </div>
                <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-primary font-medium">Finanzas Claras</span>
            </div>

            {/* Main Title with Split Reveal */}
            <h1 className="text-[13vw] md:text-[10vw] leading-[0.9] font-semibold tracking-tighter text-primary uppercase mix-blend-darken flex flex-col items-center">
                <div className="overflow-hidden"><span className="hero-char transform translate-y-5 opacity-0 blur-md">Prisma</span></div>
                <div className="overflow-hidden"><span className="hero-char transform translate-y-5 opacity-0 blur-md">Financiero</span></div>
            </h1>

            {/* Subtitle */}
            <div className="mt-8 md:mt-12 max-w-xl mx-auto opacity-0 hero-fade-in translate-y-4">
                <p className="font-sans text-base md:text-xl text-secondary leading-relaxed text-balance">
                    Domina tus números con una plataforma diseñada para <span className="text-primary font-medium">Emprendedores</span> que buscan <span className="text-primary font-medium">claridad</span> y <span className="text-primary font-medium">crecimiento</span>.
                </p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 md:mt-14 flex gap-4 opacity-0 hero-fade-in translate-y-4">
                <Link to="/auth" className="px-8 py-3 bg-primary text-white rounded-full font-mono text-xs font-bold uppercase tracking-widest hover:bg-accent transition-colors duration-300 magnetic-btn">
                    Comenzar Ahora
                </Link>
                <Link to="/auth" className="px-4 py-3 border border-black/10 bg-white rounded-full hover:bg-gray-100 transition-colors duration-200 magnetic-btn flex items-center justify-center">
                   <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 hero-fade-in animate-bounce translate-y-4">
            <ArrowRight className="w-5 h-5 text-secondary/50 rotate-90" />
        </div>
    </section>
  );
}
