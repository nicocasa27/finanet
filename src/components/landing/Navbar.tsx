import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full px-4 md:px-6 py-4 flex justify-between items-center z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <Link to="/" className="flex items-center gap-2.5 pointer-events-auto">
        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-friendly">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Finanet
        </span>
      </Link>
      
      <div className="flex items-center gap-6 md:gap-8 pointer-events-auto">
        <div className="hidden md:flex gap-6 items-center">
          <a href="#features" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
            Producto
          </a>
          <a href="#about" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
            Acerca de
          </a>
          <a href="#pricing" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
            Precios
          </a>
        </div>
        
        <Link 
          to="/auth" 
          className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-friendly hover:shadow-friendly-lg hover:scale-105 transition-all duration-300"
        >
          <span>Comenzar gratis</span>
          <span>✨</span>
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
          
          <div className="flex flex-col items-center gap-6">
            <a 
              href="#features" 
              className="text-2xl font-medium text-foreground hover:text-primary transition-colors" 
              onClick={() => setIsOpen(false)}
            >
              Producto
            </a>
            <a 
              href="#about" 
              className="text-2xl font-medium text-foreground hover:text-primary transition-colors" 
              onClick={() => setIsOpen(false)}
            >
              Acerca de
            </a>
            <a 
              href="#pricing" 
              className="text-2xl font-medium text-foreground hover:text-primary transition-colors" 
              onClick={() => setIsOpen(false)}
            >
              Precios
            </a>
            <Link 
              to="/auth" 
              className="mt-4 px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-medium shadow-friendly" 
              onClick={() => setIsOpen(false)}
            >
              Comenzar gratis ✨
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
