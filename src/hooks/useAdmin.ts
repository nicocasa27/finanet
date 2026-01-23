import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface AdminStats {
  total_users: number;
  free_users: number;
  pro_users: number;
  team_users: number;
  active_subscriptions: number;
  total_businesses: number;
  total_transactions: number;
}

interface AuditLog {
  id: string;
  action: string;
  user_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

export function useAdmin() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    checkAdminRole();
  }, [user]);

  const checkAdminRole = async () => {
    if (!user) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (error) {
      console.error("Error checking admin role:", error);
    }

    setIsAdmin(!!data);
    setLoading(false);

    if (data) {
      fetchStats();
      fetchAuditLogs();
    }
  };

  const fetchStats = async () => {
    const { data, error } = await supabase.rpc("get_admin_stats");

    if (error) {
      console.error("Error fetching admin stats:", error);
      return;
    }

    if (data && typeof data === 'object' && !Array.isArray(data) && !('error' in data)) {
      setStats(data as unknown as AdminStats);
    }
  };

  const fetchAuditLogs = async () => {
    const { data, error } = await supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Error fetching audit logs:", error);
      return;
    }

    setAuditLogs((data || []) as AuditLog[]);
  };

  return {
    isAdmin,
    loading,
    stats,
    auditLogs,
    refetchStats: fetchStats,
    refetchLogs: fetchAuditLogs,
  };
}
