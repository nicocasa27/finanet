import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full px-4 md:px-8 lg:px-16 py-4 flex justify-between items-center z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <Link to="/" className="flex items-center gap-2.5 pointer-events-auto">
        <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center border-2 border-primary shadow-brutal-sm">
          <span className="text-xl font-bold text-white">F</span>
        </div>
        <span className="text-xl font-bold text-primary">
          Finanet
        </span>
      </Link>
      
      <div className="flex items-center gap-6 md:gap-8 pointer-events-auto">
        <div className="hidden md:flex gap-8 items-center">
          <a href="#features" className="text-sm font-medium text-foreground hover:text-secondary transition-colors">
            Producto
          </a>
          <a href="#pricing" className="text-sm font-medium text-foreground hover:text-secondary transition-colors">
            Precios
          </a>
          <a href="#faq" className="text-sm font-medium text-foreground hover:text-secondary transition-colors">
            FAQ
          </a>
        </div>
        
        <Link 
          to="/auth" 
          className="hidden sm:flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-brutal-sm hover:shadow-brutal hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
        >
          Comenzar gratis
          <span>→</span>
        </Link>
        
        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground rounded-xl hover:bg-muted transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-background z-40 flex flex-col justify-center items-center pointer-events-auto md:hidden">
          <button
            className="absolute top-4 right-4 p-2 text-foreground"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="flex flex-col items-center gap-8">
            <a 
              href="#features" 
              className="text-2xl font-semibold text-foreground hover:text-secondary transition-colors" 
              onClick={() => setIsOpen(false)}
            >
              Producto
            </a>
            <a 
              href="#pricing" 
              className="text-2xl font-semibold text-foreground hover:text-secondary transition-colors" 
              onClick={() => setIsOpen(false)}
            >
              Precios
            </a>
            <a 
              href="#faq" 
              className="text-2xl font-semibold text-foreground hover:text-secondary transition-colors" 
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </a>
            <Link 
              to="/auth" 
              className="mt-4 px-8 py-4 bg-primary text-white rounded-full font-semibold shadow-brutal" 
              onClick={() => setIsOpen(false)}
            >
              Comenzar gratis →
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
