import React, { useEffect, useRef } from 'react';
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from 'gsap';
import { Silk } from '@/components/ui/silk';

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
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-black">
        {/* Background Silk - Using the exact snippet logic provided but responsive */}
        <div className="absolute inset-0 flex items-center justify-center">
           <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <Silk
                speed={5}
                scale={1}
                color="#64627a"
                noiseIntensity={1.5}
                rotation={0}
              />
           </div>
        </div>

        <div className="max-w-[1800px] mx-auto w-full z-10 relative flex flex-col items-center text-center px-4 md:px-6">
            
            {/* Floating Status Badge */}
            <div className="mb-8 md:mb-12 flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-sm opacity-0 hero-fade-in translate-y-4">
                <div className="flex gap-1 h-3 items-center">
                    <span className="w-1 h-full bg-white rounded-full animate-[pulse_1s_ease-in-out_infinite]"></span>
                    <span className="w-1 h-2/3 bg-white rounded-full animate-[pulse_1.2s_ease-in-out_infinite]"></span>
                    <span className="w-1 h-full bg-white rounded-full animate-[pulse_0.8s_ease-in-out_infinite]"></span>
                </div>
                <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-white font-bold">Finanzas Claras</span>
            </div>

            {/* Main Title with Split Reveal */}
            <h1 className="text-[13vw] md:text-[10vw] leading-[0.9] font-bold tracking-tighter text-white uppercase flex flex-col items-center drop-shadow-2xl">
                <div className="overflow-hidden"><span className="hero-char transform translate-y-5 opacity-0 blur-md">Prisma</span></div>
                <div className="overflow-hidden"><span className="hero-char transform translate-y-5 opacity-0 blur-md">Financiero</span></div>
            </h1>

            {/* Subtitle */}
            <div className="mt-8 md:mt-12 max-w-xl mx-auto opacity-0 hero-fade-in translate-y-4">
                <p className="font-sans text-base md:text-xl text-gray-300 font-medium leading-relaxed text-balance drop-shadow-md">
                    Domina tus números con una plataforma diseñada para <span className="text-white font-bold">Emprendedores</span> que buscan <span className="text-white font-bold">claridad</span> y <span className="text-white font-bold">crecimiento</span>.
                </p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 md:mt-14 flex gap-4 opacity-0 hero-fade-in translate-y-4">
                <Link to="/auth" className="px-8 py-3 bg-white text-black rounded-full font-mono text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors duration-300 magnetic-btn shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    Comenzar Ahora
                </Link>
                <Link to="/auth" className="px-4 py-3 border border-white/20 bg-white/5 rounded-full hover:bg-white/10 transition-colors duration-200 magnetic-btn flex items-center justify-center text-white backdrop-blur-sm">
                   <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 hero-fade-in animate-bounce translate-y-4">
            <ArrowRight className="w-5 h-5 text-white/50 rotate-90" />
        </div>
    </section>
  );
}
