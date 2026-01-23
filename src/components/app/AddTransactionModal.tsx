import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpRight, ArrowDownRight, Loader2, AlertTriangle, Sparkles } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { useTransactions } from "@/hooks/useTransactions";
import { useSubscriptionContext } from "@/contexts/SubscriptionContext";
import { Link } from "react-router-dom";

const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z.string().min(1, "El monto es requerido").refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    "El monto debe ser mayor a 0"
  ),
  category_id: z.string().optional(),
  date: z.string().min(1, "La fecha es requerida"),
  note: z.string().optional(),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface AddTransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function AddTransactionModal({ open, onOpenChange, onSuccess }: AddTransactionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { incomeCategories, expenseCategories } = useCategories();
  const { createTransaction } = useTransactions();
  const { canAddTransaction, usage, limits, plan } = useSubscriptionContext();

  const canAdd = canAddTransaction();
  const isAtLimit = !canAdd;

  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "income",
      amount: "",
      category_id: "",
      date: new Date().toISOString().split('T')[0],
      note: "",
    },
  });

  const selectedType = form.watch("type");
  const categories = selectedType === "income" ? incomeCategories : expenseCategories;

  const onSubmit = async (data: TransactionFormData) => {
    setIsSubmitting(true);
    try {
      const result = await createTransaction({
        type: data.type,
        amount: Number(data.amount),
        category_id: data.category_id || null,
        date: data.date,
        note: data.note || null,
      });

      if (result) {
        form.reset();
        onOpenChange(false);
        onSuccess?.();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTypeChange = (type: "income" | "expense") => {
    form.setValue("type", type);
    form.setValue("category_id", "");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar movimiento</DialogTitle>
        </DialogHeader>

        {isAtLimit ? (
          <div className="py-6 text-center">
            <div className="mx-auto h-14 w-14 rounded-full bg-amber-100 flex items-center justify-center mb-4">
              <AlertTriangle className="h-7 w-7 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Límite alcanzado</h3>
            <p className="text-muted-foreground mb-4">
              Has alcanzado el límite de {limits.maxTransactionsPerMonth} transacciones 
              de tu plan {plan.charAt(0).toUpperCase() + plan.slice(1)}.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Actualiza a Pro para transacciones ilimitadas.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
              >
                Cerrar
              </Button>
              <Button
                variant="hero"
                className="flex-1"
                asChild
              >
                <Link to="/app/suscripcion">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Actualizar plan
                </Link>
              </Button>
            </div>
          </div>
        ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Usage indicator */}
            {limits.maxTransactionsPerMonth && (
              <div className="text-xs text-muted-foreground text-center p-2 bg-muted/50 rounded-lg">
                {usage.transactionsThisMonth} de {limits.maxTransactionsPerMonth} transacciones usadas este mes
              </div>
            )}
            {/* Type selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleTypeChange("income")}
                className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  selectedType === "income"
                    ? "border-success bg-success/10 text-success"
                    : "border-border hover:border-success/50"
                }`}
              >
                <ArrowUpRight className="h-5 w-5" />
                <span className="font-medium">Ingreso</span>
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange("expense")}
                className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  selectedType === "expense"
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : "border-border hover:border-destructive/50"
                }`}
              >
                <ArrowDownRight className="h-5 w-5" />
                <span className="font-medium">Gasto</span>
              </button>
            </div>

            {/* Amount */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monto</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        {...field}
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        className="pl-8 h-12 text-lg rounded-xl"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          <div className="flex items-center gap-2">
                            <div
                              className="h-3 w-3 rounded-full"
                              style={{ backgroundColor: category.color || '#6366F1' }}
                            />
                            {category.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      className="h-12 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Note */}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nota (opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Agrega una descripción..."
                      className="rounded-xl resize-none"
                      rows={2}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12 rounded-xl"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="hero"
                className="flex-1 h-12 rounded-xl"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Guardar"
                )}
              </Button>
            </div>
          </form>
        </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
