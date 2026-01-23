import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative w-full pt-32 pb-20 px-4 md:px-6 flex flex-col items-center text-center bg-gradient-to-b from-blue-100/50 via-background to-background">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-8 md:gap-12">
        {/* Headings */}
        <div className="flex flex-col items-center leading-none text-5xl md:text-7xl lg:text-8xl">
          <h1 className="font-serif tracking-tight text-foreground">
            Claridad financiera,
          </h1>
          <h2 className="font-sans font-normal tracking-tight text-foreground mt-2 md:mt-4">
            diseñada para crecer
          </h2>
        </div>

        {/* Subtitle */}
        <p className="font-serif text-lg md:text-xl text-foreground/80 max-w-2xl leading-relaxed">
          Domina tus números, reduce gastos y acelera tu crecimiento con confianza.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link 
            to="/auth"
            className="bg-foreground text-background hover:bg-foreground/90 rounded-none px-8 h-14 text-base font-mono border-2 border-foreground flex items-center justify-center gap-2.5"
          >
            <div className="w-1 h-1 bg-background rounded-full"></div>
            Solicitar demo
          </Link>
          <Link 
            to="/features"
            className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background rounded-none px-8 h-14 text-base font-mono flex items-center justify-center"
          >
            Explorar plataforma →
          </Link>
        </div>

        {/* Hero Dashboard Card */}
        <div className="relative w-full max-w-5xl mt-12 md:mt-20">
          <div className="aspect-[16/10] rounded-3xl overflow-hidden border-2 border-foreground relative bg-white shadow-lg">
            {/* Dashboard Content */}
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col">
              <div className="mb-6">
                <p className="font-mono text-sm text-foreground/60 mb-2">Buenos días, Tu Negocio</p>
                <p className="font-serif text-xl text-foreground">Tus métricas financieras están listas para revisar.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-muted/50 p-4 rounded-lg border border-foreground/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-foreground/60">Margen Bruto</span>
                    <span className="font-sans text-2xl font-medium">56%</span>
                  </div>
                  <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-[56%]"></div>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg border border-foreground/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-foreground/60">Utilidad Mensual</span>
                    <span className="font-sans text-2xl font-medium">$583.7K</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-success">↑ 16%</span>
                    <span className="font-mono text-xs text-foreground/60">vs meta mensual</span>
                  </div>
                </div>
              </div>

              {/* Chart Area */}
              <div className="flex-1 bg-muted/30 rounded-lg border border-foreground/10 p-4">
                <div className="h-full flex items-end gap-2">
                  {[65, 72, 58, 80, 75, 68].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-foreground rounded-t" 
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="font-mono text-xs text-foreground/60">
                        {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
