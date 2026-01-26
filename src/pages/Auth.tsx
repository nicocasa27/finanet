import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Sparkles, ArrowLeft, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

const emailSchema = z.string().email("Email inválido");
const passwordSchema = z.string().min(6, "La contraseña debe tener al menos 6 caracteres");

export default function Auth() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "login" ? "login" : "signup";
  
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>({});
  
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; name?: string } = {};
    
    try {
      emailSchema.parse(email);
    } catch {
      newErrors.email = "Email inválido";
    }

    try {
      passwordSchema.parse(password);
    } catch {
      newErrors.password = "Mínimo 6 caracteres";
    }

    if (mode === "signup" && !fullName.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      if (mode === "login") {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Credenciales inválidas. Verifica tu email y contraseña.");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("¡Bienvenido de vuelta!");
          navigate("/app");
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes("User already registered")) {
            toast.error("Este email ya está registrado. Intenta iniciar sesión.");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("¡Cuenta creada! Revisa tu email para confirmar.");
          navigate("/app");
        }
      }
    } catch (err) {
      toast.error("Ocurrió un error. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 lg:px-16 bg-background">
        <div className="mx-auto w-full max-w-md">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>

          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2.5 mb-8">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-friendly">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Finanet
            </span>
          </Link>

          {/* Title */}
          <h1 className="text-3xl font-bold mb-2 text-foreground">
            {mode === "login" ? "Bienvenido de vuelta" : "Crea tu cuenta"}
          </h1>
          <p className="text-muted-foreground mb-8 font-body">
            {mode === "login"
              ? "Ingresa tus datos para acceder a tu cuenta"
              : "Comienza gratis y conoce tus números"}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Nombre completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`h-12 rounded-2xl border-2 ${errors.name ? "border-destructive" : "border-border focus:border-primary"}`}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`h-12 rounded-2xl border-2 ${errors.email ? "border-destructive" : "border-border focus:border-primary"}`}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`h-12 rounded-2xl border-2 pr-12 ${errors.password ? "border-destructive" : "border-border focus:border-primary"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password}</p>
              )}
            </div>

            {mode === "login" && (
              <div className="text-right">
                <Link
                  to="/recuperar"
                  className="text-sm text-primary hover:underline font-medium"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            )}

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Cargando...
                </>
              ) : mode === "login" ? (
                "Iniciar sesión"
              ) : (
                <>
                  Crear cuenta gratis
                  <Sparkles className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Toggle mode */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            {mode === "login" ? (
              <>
                ¿No tienes cuenta?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-primary font-semibold hover:underline"
                >
                  Regístrate gratis
                </button>
              </>
            ) : (
              <>
                ¿Ya tienes cuenta?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-primary font-semibold hover:underline"
                >
                  Inicia sesión
                </button>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Right side - Decorative */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 animated-gradient" />
        
        {/* Decorative blobs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/30 rounded-full blur-3xl blob" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-secondary/30 rounded-full blur-3xl blob" style={{ animationDelay: '-4s' }} />
        
        <div className="relative z-10 text-center px-12">
          <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-secondary shadow-friendly-lg">
            <Sparkles className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Tus finanzas,
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              claras y simples
            </span>
          </h2>
          <p className="text-muted-foreground max-w-sm mx-auto mb-8 font-body">
            Únete a +500 emprendedores que ya conocen sus números y toman mejores decisiones cada día.
          </p>
          
          {/* Features list */}
          <div className="flex flex-col gap-3 text-left max-w-xs mx-auto">
            {["Dashboard intuitivo", "Reportes automáticos", "Alertas inteligentes"].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="text-sm font-medium text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
