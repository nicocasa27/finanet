import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  Package2, 
  Calculator, 
  TrendingUp, 
  FileText, 
  CreditCard, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles,
  Plus,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { BusinessSelector } from "./BusinessSelector";
import { AddProductModal } from "./AddProductModal";

interface AppLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/app" },
  { name: "Mis Productos", icon: Package, path: "/app/productos" },
  { name: "Insumos", icon: Package2, path: "/app/insumos" },
  { name: "Calculadora", icon: Calculator, path: "/app/calculadora" },
  { name: "Simulador", icon: TrendingUp, path: "/app/simulador" },
  { name: "Reportes", icon: FileText, path: "/app/reportes" },
  { name: "Suscripción", icon: CreditCard, path: "/app/suscripcion" },
  { name: "Ajustes", icon: Settings, path: "/app/ajustes" },
];

export function AppLayout({ children }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-card border-r border-border/50 flex flex-col transition-all duration-300 z-40 shadow-friendly",
          collapsed ? "w-20" : "w-72"
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          <Link to="/app" className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0 shadow-friendly">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            {!collapsed && (
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Finanet
              </span>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-sm font-medium",
                  isActive
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-friendly"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-3 border-t border-border/50">
          <div className={cn(
            "flex items-center gap-3 p-3 rounded-2xl bg-accent/50",
            collapsed && "justify-center"
          )}>
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold shrink-0 shadow-friendly">
              {user?.email?.[0].toUpperCase() || "U"}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user?.user_metadata?.full_name || "Usuario"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            )}
          </div>
          <button
            onClick={signOut}
            className={cn(
              "mt-2 w-full flex items-center gap-2 px-4 py-3 rounded-2xl text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
              collapsed && "justify-center"
            )}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Cerrar sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className={cn(
        "flex-1 transition-all duration-300",
        collapsed ? "ml-20" : "ml-72"
      )}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Business selector */}
              <BusinessSelector />
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button className="h-11 w-11 rounded-2xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </button>
              
              <Button variant="hero" size="default" onClick={() => setIsAddProductOpen(true)}>
                <Plus className="h-4 w-4" />
                {!collapsed && "Nuevo producto"}
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Global Add Product Modal */}
      <AddProductModal
        open={isAddProductOpen}
        onOpenChange={setIsAddProductOpen}
      />
    </div>
  );
}
