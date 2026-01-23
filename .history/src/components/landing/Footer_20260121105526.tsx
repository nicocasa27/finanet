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
    <footer className="bg-accent border-t-2 border-foreground">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 pb-8 border-b-2 border-foreground/20">
          {/* Navigation */}
          <div className="flex flex-wrap gap-8 mb-8 md:mb-0">
            {footerLinks.producto.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-mono text-sm text-foreground hover:underline"
              >
                {link.name}
              </a>
            ))}
            {footerLinks.empresa.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-mono text-sm text-foreground hover:underline"
              >
                {link.name}
              </a>
            ))}
            <Link to="/auth" className="font-mono text-sm text-foreground hover:underline">
              Comenzar →
            </Link>
          </div>
          
          {/* Copyright */}
          <p className="font-mono text-sm text-foreground/80">
            © 2025 Todos los derechos reservados
          </p>
        </div>

        {/* Large Logo */}
        <div className="pt-8">
          <Link to="/" className="inline-block">
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-normal text-foreground tracking-tight">
              Prisma
            </h1>
          </Link>
        </div>
      </div>
    </footer>
  );
}
