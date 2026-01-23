import { useAdmin } from "@/hooks/useAdmin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  CreditCard, 
  Building2, 
  ArrowLeftRight, 
  Shield,
  Crown,
  Sparkles,
  Clock
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function Admin() {
  const { isAdmin, loading, stats, auditLogs } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/app");
    }
  }, [loading, isAdmin, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const statCards = [
    { 
      label: "Total Usuarios", 
      value: stats?.total_users || 0, 
      icon: Users,
      color: "from-blue-500 to-blue-600"
    },
    { 
      label: "Plan Free", 
      value: stats?.free_users || 0, 
      icon: Users,
      color: "from-gray-500 to-gray-600"
    },
    { 
      label: "Plan Pro", 
      value: stats?.pro_users || 0, 
      icon: Sparkles,
      color: "from-primary to-secondary"
    },
    { 
      label: "Plan Team", 
      value: stats?.team_users || 0, 
      icon: Crown,
      color: "from-amber-500 to-amber-600"
    },
    { 
      label: "Suscripciones Activas", 
      value: stats?.active_subscriptions || 0, 
      icon: CreditCard,
      color: "from-green-500 to-green-600"
    },
    { 
      label: "Total Negocios", 
      value: stats?.total_businesses || 0, 
      icon: Building2,
      color: "from-purple-500 to-purple-600"
    },
    { 
      label: "Total Transacciones", 
      value: stats?.total_transactions || 0, 
      icon: ArrowLeftRight,
      color: "from-orange-500 to-orange-600"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Shield className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <p className="text-muted-foreground">Gestión y métricas del sistema</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-card rounded-2xl p-5 border border-border/50 card-elevated"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Plan distribution */}
      <div className="bg-card rounded-2xl p-6 border border-border/50">
        <h2 className="font-semibold mb-4">Distribución de Planes</h2>
        <div className="space-y-3">
          {[
            { name: "Free", count: stats?.free_users || 0, color: "bg-gray-500" },
            { name: "Pro", count: stats?.pro_users || 0, color: "bg-primary" },
            { name: "Team", count: stats?.team_users || 0, color: "bg-amber-500" },
          ].map((plan) => {
            const total = (stats?.free_users || 0) + (stats?.pro_users || 0) + (stats?.team_users || 0);
            const percent = total > 0 ? (plan.count / total) * 100 : 0;
            return (
              <div key={plan.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{plan.name}</span>
                  <span className="text-muted-foreground">{plan.count} ({percent.toFixed(1)}%)</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${plan.color} rounded-full transition-all`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Audit logs */}
      <div className="bg-card rounded-2xl p-6 border border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <h2 className="font-semibold">Logs de Auditoría Recientes</h2>
        </div>
        
        {auditLogs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No hay logs de auditoría aún
          </div>
        ) : (
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {auditLogs.map((log) => (
              <div 
                key={log.id}
                className="flex items-center justify-between p-3 rounded-xl bg-muted/50 text-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-background flex items-center justify-center">
                    <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{log.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {log.user_id ? `Usuario: ${log.user_id.slice(0, 8)}...` : "Sistema"}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(log.created_at), "dd MMM, HH:mm", { locale: es })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Promo codes info */}
      <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
        <h2 className="font-semibold mb-2">Códigos Promocionales Activos</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Códigos disponibles para testing:
        </p>
        <div className="grid gap-2 md:grid-cols-3">
          <div className="bg-background/50 rounded-xl p-3 border">
            <code className="text-sm font-mono font-bold">PRISMA-PRO-2024</code>
            <p className="text-xs text-muted-foreground mt-1">Plan Pro - Usos ilimitados</p>
          </div>
          <div className="bg-background/50 rounded-xl p-3 border">
            <code className="text-sm font-mono font-bold">TESTPRO</code>
            <p className="text-xs text-muted-foreground mt-1">Plan Pro - Usos ilimitados</p>
          </div>
          <div className="bg-background/50 rounded-xl p-3 border">
            <code className="text-sm font-mono font-bold">PRISMA-TEAM-VIP</code>
            <p className="text-xs text-muted-foreground mt-1">Plan Team - 10 usos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
