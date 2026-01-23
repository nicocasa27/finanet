import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useSettingsData } from "@/hooks/useSettingsData";
import { User, Building, Globe, Save, Loader2 } from "lucide-react";

const currencies = [
  { value: "MXN", label: "MXN (Peso Mexicano)" },
  { value: "USD", label: "USD (Dólar)" },
  { value: "EUR", label: "EUR (Euro)" },
  { value: "COP", label: "COP (Peso Colombiano)" },
  { value: "ARS", label: "ARS (Peso Argentino)" },
  { value: "CLP", label: "CLP (Peso Chileno)" },
];

const timezones = [
  { value: "America/Mexico_City", label: "Ciudad de México (GMT-6)" },
  { value: "America/Bogota", label: "Bogotá (GMT-5)" },
  { value: "America/Lima", label: "Lima (GMT-5)" },
  { value: "America/Santiago", label: "Santiago (GMT-4)" },
  { value: "America/Buenos_Aires", label: "Buenos Aires (GMT-3)" },
  { value: "America/New_York", label: "Nueva York (GMT-5)" },
  { value: "America/Los_Angeles", label: "Los Angeles (GMT-8)" },
  { value: "Europe/Madrid", label: "Madrid (GMT+1)" },
];

const businessTypes = [
  { value: "restaurante", label: "Restaurante / Comida" },
  { value: "tienda", label: "Tienda / Retail" },
  { value: "servicios", label: "Servicios profesionales" },
  { value: "tecnologia", label: "Tecnología / Software" },
  { value: "salud", label: "Salud / Bienestar" },
  { value: "educacion", label: "Educación" },
  { value: "manufactura", label: "Manufactura" },
  { value: "otro", label: "Otro" },
];

export default function Ajustes() {
  const { user } = useAuth();
  const { loading, saving, profile, business, saveAll } = useSettingsData();
  
  // Form state
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [currency, setCurrency] = useState("");
  const [timezone, setTimezone] = useState("");

  // Sync form with loaded data
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
    }
  }, [profile]);

  useEffect(() => {
    if (business) {
      setBusinessName(business.name || "");
      setBusinessType(business.type || "");
      setCurrency(business.currency || "MXN");
      setTimezone(business.timezone || "America/Mexico_City");
    }
  }, [business]);

  const handleSave = async () => {
    await saveAll(
      { fullName },
      { 
        name: businessName, 
        type: businessType, 
        currency, 
        timezone 
      }
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold">Ajustes</h1>
        <p className="text-muted-foreground">Configura tu perfil y preferencias</p>
      </div>

      {/* Profile section */}
      <div className="bg-card rounded-2xl p-6 border border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold">Perfil</h2>
            <p className="text-sm text-muted-foreground">Tu información personal</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Tu nombre"
              className="h-11 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={user?.email || ""}
              disabled
              className="h-11 rounded-xl bg-muted"
            />
          </div>
        </div>
      </div>

      {/* Business section */}
      <div className="bg-card rounded-2xl p-6 border border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center">
            <Building className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <h2 className="font-semibold">Negocio</h2>
            <p className="text-sm text-muted-foreground">Configuración de tu negocio activo</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="business-name">Nombre del negocio</Label>
            <Input
              id="business-name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Mi Negocio"
              className="h-11 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="business-type">Tipo de negocio</Label>
            <Select value={businessType} onValueChange={setBusinessType}>
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue placeholder="Selecciona un tipo" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {businessTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Preferences section */}
      <div className="bg-card rounded-2xl p-6 border border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-success/10 flex items-center justify-center">
            <Globe className="h-5 w-5 text-success" />
          </div>
          <div>
            <h2 className="font-semibold">Preferencias</h2>
            <p className="text-sm text-muted-foreground">Moneda y zona horaria</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="currency">Moneda</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue placeholder="Selecciona moneda" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {currencies.map((cur) => (
                  <SelectItem key={cur.value} value={cur.value}>
                    {cur.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Zona horaria</Label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue placeholder="Selecciona zona horaria" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {timezones.map((tz) => (
                  <SelectItem key={tz.value} value={tz.value}>
                    {tz.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <Button
          variant="hero"
          size="lg"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Guardar cambios
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
