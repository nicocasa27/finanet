import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  Download,
  Loader2,
  Pencil,
  Trash2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTransactions } from "@/hooks/useTransactions";
import { AddTransactionModal } from "@/components/app/AddTransactionModal";
import { DeleteConfirmDialog } from "@/components/app/DeleteConfirmDialog";
import { Tables } from "@/integrations/supabase/types";

export default function Transacciones() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingTransaction, setDeletingTransaction] = useState<Tables<'transactions'> | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { 
    transactions, 
    loading, 
    totalCount,
    refetch,
    deleteTransaction 
  } = useTransactions({
    type: filterType === "all" ? null : filterType,
    searchQuery,
  });

  const handleDeleteTransaction = async () => {
    if (!deletingTransaction) return;
    setIsDeleting(true);
    try {
      await deleteTransaction(deletingTransaction.id);
      setDeletingTransaction(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Transacciones</h1>
          <p className="text-muted-foreground">Historial de movimientos de tu negocio</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="default" disabled>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button variant="hero" size="default" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo movimiento
          </Button>
        </div>
      </div>

      {/* Filters bar */}
      <div className="bg-card rounded-2xl p-4 border border-border/50 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar transacciones..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 rounded-xl"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1 rounded-xl bg-muted p-1">
            {["all", "income", "expense"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type as typeof filterType)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterType === type
                    ? "bg-background shadow-premium-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {type === "all" ? "Todos" : type === "income" ? "Ingresos" : "Gastos"}
              </button>
            ))}
          </div>
          <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl" disabled>
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Transactions table */}
      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
              <ArrowUpRight className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-1">No hay transacciones</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Comienza agregando tu primer ingreso o gasto
            </p>
            <Button variant="hero" onClick={() => setIsAddModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar movimiento
            </Button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Fecha</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Descripción</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Categoría</th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">Monto</th>
                    <th className="text-center p-4 text-sm font-medium text-muted-foreground">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr 
                      key={transaction.id} 
                      className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">
                        <span className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString('es-MX', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                            transaction.type === "income" 
                              ? "bg-success/10" 
                              : "bg-destructive/10"
                          }`}>
                            {transaction.type === "income" ? (
                              <ArrowUpRight className="h-4 w-4 text-success" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4 text-destructive" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              {transaction.note || (transaction.type === 'income' ? 'Ingreso' : 'Gasto')}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        {transaction.categories ? (
                          <span 
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
                            style={{ 
                              backgroundColor: `${transaction.categories.color}15`,
                              color: transaction.categories.color || undefined
                            }}
                          >
                            <div 
                              className="h-2 w-2 rounded-full" 
                              style={{ backgroundColor: transaction.categories.color || '#6366F1' }}
                            />
                            {transaction.categories.name}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">Sin categoría</span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <span className={`font-semibold ${
                          transaction.type === "income" ? "text-success" : "text-destructive"
                        }`}>
                          {transaction.type === "income" ? "+" : "-"}${Number(transaction.amount).toLocaleString()}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem disabled>
                              <Pencil className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => setDeletingTransaction(transaction)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="p-4 border-t">
              <p className="text-sm text-muted-foreground">
                Mostrando {transactions.length} de {totalCount} transacciones
              </p>
            </div>
          </>
        )}
      </div>

      {/* Add Transaction Modal */}
      <AddTransactionModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSuccess={refetch}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        open={!!deletingTransaction}
        onOpenChange={(open) => !open && setDeletingTransaction(null)}
        title="Eliminar transacción"
        description="¿Estás seguro de eliminar esta transacción? Esta acción no se puede deshacer."
        onConfirm={handleDeleteTransaction}
        loading={isDeleting}
      />
    </div>
  );
}
