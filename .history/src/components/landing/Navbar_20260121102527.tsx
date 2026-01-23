import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full px-4 md:px-6 py-5 flex justify-between items-center z-50 bg-background/80 backdrop-blur-sm border-b border-foreground/10">
      <Link to="/" className="font-sans text-lg font-medium text-foreground hover:opacity-70 transition-opacity pointer-events-auto">
        Prisma
      </Link>
      
      <div className="flex items-center gap-6 md:gap-8 pointer-events-auto">
        <div className="hidden md:flex gap-6 items-center">
          <a href="#features" className="font-mono text-sm text-foreground hover:opacity-70 transition-opacity">
            Producto
          </a>
          <a href="#about" className="font-mono text-sm text-foreground hover:opacity-70 transition-opacity">
            Acerca de
          </a>
          <a href="#pricing" className="font-mono text-sm text-foreground hover:opacity-70 transition-opacity">
            Precios
          </a>
        </div>
        
        <Link 
          to="/auth" 
          className="bg-foreground text-background px-5 py-2 rounded-none font-mono text-sm hover:bg-foreground/90 transition-colors border-2 border-foreground"
        >
          Comenzar →
        </Link>
        
        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-background z-40 flex flex-col justify-center items-center pointer-events-auto md:hidden">
          <a href="#features" className="text-2xl font-mono py-4 hover:opacity-70 transition-opacity" onClick={() => setIsOpen(false)}>
            Producto
          </a>
          <a href="#about" className="text-2xl font-mono py-4 hover:opacity-70 transition-opacity" onClick={() => setIsOpen(false)}>
            Acerca de
          </a>
          <a href="#pricing" className="text-2xl font-mono py-4 hover:opacity-70 transition-opacity" onClick={() => setIsOpen(false)}>
            Precios
          </a>
          <Link 
            to="/auth" 
            className="mt-8 px-8 py-3 bg-foreground text-background font-mono text-sm border-2 border-foreground" 
            onClick={() => setIsOpen(false)}
          >
            Comenzar →
          </Link>
        </div>
      )}
    </nav>
  );
}
