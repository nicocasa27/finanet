import { Link } from "react-router-dom";
import { Twitter, Linkedin, Instagram } from "lucide-react";

const footerLinks = {
  producto: [
    { name: "Funciones", href: "#features" },
    { name: "Precios", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ],
  empresa: [
    { name: "Acerca de", href: "#about" },
    { name: "Blog", href: "/blog" },
    { name: "Contacto", href: "/contacto" },
  ],
  legal: [
    { name: "Privacidad", href: "/privacidad" },
    { name: "Términos", href: "/terminos" },
  ],
};

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-secondary" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center">
                <span className="text-xl font-bold text-primary">F</span>
              </div>
              <span className="text-xl font-bold">Finanet</span>
            </Link>
            <p className="text-white/60 text-sm mb-6">
              Calculadora de costeo para emprendedores universitarios. Sabe cuánto cobrar.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Producto</h4>
            <ul className="space-y-3">
              {footerLinks.producto.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-white/60 hover:text-white transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-white/60 hover:text-white transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-white/60 hover:text-white transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © 2026 Finanet. Todos los derechos reservados.
          </p>
          <Link 
            to="/auth" 
            className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-secondary/90 transition-all"
          >
            Comenzar gratis →
          </Link>
        </div>
      </div>
    </footer>
  );
}
