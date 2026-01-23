import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Bell, 
  FileText, 
  Layers,
  Zap,
  Shield
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Dashboard en tiempo real",
    description: "Ve tus ingresos, gastos y utilidad actualizados al instante con visualizaciones claras.",
  },
  {
    icon: PieChart,
    title: "Estado de Resultados",
    description: "Reporte automático de Ingresos - Costos - Gastos = Utilidad. Exportable a PDF.",
  },
  {
    icon: TrendingUp,
    title: "Indicadores clave",
    description: "Margen bruto, margen neto, promedio diario y más métricas importantes.",
  },
  {
    icon: Bell,
    title: "Alertas inteligentes",
    description: "Notificaciones cuando estés en números rojos o gastos inusuales.",
  },
  {
    icon: FileText,
    title: "Categorías flexibles",
    description: "Organiza tus movimientos con categorías personalizadas y colores.",
  },
  {
    icon: Layers,
    title: "Multi-negocio",
    description: "Gestiona varios negocios desde una sola cuenta.",
  },
  {
    icon: Zap,
    title: "Proyecciones",
    description: "Proyección de fin de mes basada en tus tendencias actuales.",
  },
  {
    icon: Shield,
    title: "Datos seguros",
    description: "Tu información está protegida con encriptación de nivel empresarial.",
  },
];

export function Features() {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Todo lo que necesitas
          </h2>
          <p className="text-lg text-muted-foreground">
            Herramientas poderosas diseñadas para emprendedores, no para contadores
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-2xl p-6 border border-border/50 card-elevated"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
