import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { BusinessProvider } from "@/contexts/BusinessContext";
import { DateRangeProvider } from "@/contexts/DateRangeContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Recuperar from "./pages/Recuperar";
import Reset from "./pages/Reset";
import NotFound from "./pages/NotFound";
import { AppLayout } from "./components/app/AppLayout";
import Dashboard from "./pages/app/Dashboard";
import Productos from "./pages/app/Productos";
import Insumos from "./pages/app/Insumos";
import Calculadora from "./pages/app/Calculadora";
import Simulador from "./pages/app/Simulador";
import Reportes from "./pages/app/Reportes";
import Suscripcion from "./pages/app/Suscripcion";
import Ajustes from "./pages/app/Ajustes";
import Admin from "./pages/app/Admin";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return (
    <BusinessProvider>
      <SubscriptionProvider>
        <DateRangeProvider>
          <AppLayout>{children}</AppLayout>
        </DateRangeProvider>
      </SubscriptionProvider>
    </BusinessProvider>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/recuperar" element={<Recuperar />} />
      <Route path="/reset" element={<Reset />} />
      
      {/* Protected app routes */}
      <Route path="/app" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/app/productos" element={<ProtectedRoute><Productos /></ProtectedRoute>} />
      <Route path="/app/insumos" element={<ProtectedRoute><Insumos /></ProtectedRoute>} />
      <Route path="/app/calculadora" element={<ProtectedRoute><Calculadora /></ProtectedRoute>} />
      <Route path="/app/simulador" element={<ProtectedRoute><Simulador /></ProtectedRoute>} />
      <Route path="/app/reportes" element={<ProtectedRoute><Reportes /></ProtectedRoute>} />
      <Route path="/app/suscripcion" element={<ProtectedRoute><Suscripcion /></ProtectedRoute>} />
      <Route path="/app/ajustes" element={<ProtectedRoute><Ajustes /></ProtectedRoute>} />
      <Route path="/app/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
