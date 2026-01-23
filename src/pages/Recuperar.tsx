import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, ArrowLeft, Loader2, Mail, CheckCircle } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

const emailSchema = z.string().email("Email inválido");

export default function Recuperar() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      emailSchema.parse(email);
    } catch {
      setError("Por favor ingresa un email válido");
      return;
    }

    setIsLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/reset`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      if (error) {
        throw error;
      }

      setEmailSent(true);
      toast.success("Email enviado correctamente");
    } catch (err: any) {
      console.error('Password reset error:', err);
      toast.error(err.message || "Error al enviar el email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          {/* Back link */}
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a iniciar sesión
          </Link>

          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">PRISMA</span>
          </Link>

          {emailSent ? (
            // Success state
            <div className="text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-success/10">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Revisa tu email</h1>
              <p className="text-muted-foreground mb-6">
                Hemos enviado un enlace de recuperación a <strong>{email}</strong>. 
                Revisa tu bandeja de entrada y sigue las instrucciones.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                ¿No lo ves? Revisa tu carpeta de spam.
              </p>
              <Button
                variant="outline"
                onClick={() => setEmailSent(false)}
                className="mr-2"
              >
                Usar otro email
              </Button>
              <Link to="/auth">
                <Button variant="hero">
                  Volver a iniciar sesión
                </Button>
              </Link>
            </div>
          ) : (
            // Form state
            <>
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              
              <h1 className="text-3xl font-bold mb-2">¿Olvidaste tu contraseña?</h1>
              <p className="text-muted-foreground mb-8">
                No te preocupes. Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`h-12 rounded-xl ${error ? "border-destructive" : ""}`}
                  />
                  {error && (
                    <p className="text-xs text-destructive">{error}</p>
                  )}
                </div>

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
                      Enviando...
                    </>
                  ) : (
                    "Enviar enlace de recuperación"
                  )}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                ¿Recordaste tu contraseña?{" "}
                <Link
                  to="/auth?mode=login"
                  className="text-primary font-medium hover:underline"
                >
                  Inicia sesión
                </Link>
              </p>
            </>
          )}
        </div>
      </div>

      {/* Right side - Decorative */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 relative overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center px-12">
          <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-secondary shadow-premium-xl">
            <Sparkles className="h-10 w-10 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Recupera el acceso
            <br />
            a tus finanzas
          </h2>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Te ayudamos a restablecer tu contraseña para que puedas seguir monitoreando tu negocio.
          </p>
        </div>
      </div>
    </div>
  );
}
