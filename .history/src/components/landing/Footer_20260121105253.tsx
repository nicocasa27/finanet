import { Link } from "react-router-dom";

const footerLinks = {
  producto: [
    { name: "Producto", href: "#features" },
    { name: "Precios", href: "#pricing" },
    { name: "Blog", href: "/blog" },
  ],
  empresa: [
    { name: "Acerca de", href: "#about" },
    { name: "Carreras", href: "#careers" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-foreground via-foreground/98 to-background text-background border-t border-foreground/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 pb-8 border-b border-background/10">
          {/* Navigation */}
          <div className="flex flex-wrap gap-8 mb-8 md:mb-0">
            {footerLinks.producto.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-mono text-sm text-background/80 hover:text-background transition-colors"
              >
                {link.name}
              </a>
            ))}
            {footerLinks.empresa.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-mono text-sm text-background/80 hover:text-background transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Link to="/auth" className="font-mono text-sm text-background/80 hover:text-background transition-colors">
              Comenzar →
            </Link>
          </div>
          
          {/* Copyright */}
          <p className="font-mono text-sm text-background/60">
            © 2025 Todos los derechos reservados
          </p>
        </div>

        {/* Large Logo */}
        <div className="pt-8">
          <Link to="/" className="inline-block">
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-normal text-background/90 tracking-tight">
              Prisma
            </h1>
          </Link>
        </div>
      </div>
    </footer>
  );
}
