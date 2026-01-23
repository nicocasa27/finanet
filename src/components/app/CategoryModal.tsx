import { useState, useEffect } from "react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowUpRight, ArrowDownRight, Loader2 } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

const PRESET_COLORS = [
  "#10B981", "#3B82F6", "#6366F1", "#8B5CF6",
  "#EC4899", "#EF4444", "#F59E0B", "#14B8A6",
  "#F97316", "#0EA5E9", "#84CC16", "#94A3B8",
];

const categorySchema = z.object({
  type: z.enum(["income", "expense"]),
  name: z.string().min(1, "El nombre es requerido").max(50, "Máximo 50 caracteres"),
  color: z.string().min(1, "Selecciona un color"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Tables<'categories'> | null;
  onSave: (data: CategoryFormData) => Promise<void>;
}

export function CategoryModal({ open, onOpenChange, category, onSave }: CategoryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!category;

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      type: "expense",
      name: "",
      color: PRESET_COLORS[0],
    },
  });

  useEffect(() => {
    if (category) {
      form.reset({
        type: category.type,
        name: category.name,
        color: category.color || PRESET_COLORS[0],
      });
    } else {
      form.reset({
        type: "expense",
        name: "",
        color: PRESET_COLORS[0],
      });
    }
  }, [category, open]);

  const selectedType = form.watch("type");
  const selectedColor = form.watch("color");

  const onSubmit = async (data: CategoryFormData) => {
    setIsSubmitting(true);
    try {
      await onSave(data);
      form.reset();
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar categoría" : "Nueva categoría"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Type selector (only for new categories) */}
            {!isEditing && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => form.setValue("type", "income")}
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
                  onClick={() => form.setValue("type", "expense")}
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
            )}

            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la categoría</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="ej. Marketing, Renta, Ventas..."
                      className="h-12 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Color picker */}
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-6 gap-2">
                      {PRESET_COLORS.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => field.onChange(color)}
                          className={`h-10 w-full rounded-xl transition-all ${
                            selectedColor === color
                              ? "ring-2 ring-offset-2 ring-primary"
                              : "hover:scale-110"
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Preview */}
            <div className="p-4 rounded-xl bg-muted/50 border">
              <p className="text-sm text-muted-foreground mb-2">Vista previa</p>
              <div className="flex items-center gap-3">
                <div
                  className="h-5 w-5 rounded-full"
                  style={{ backgroundColor: selectedColor }}
                />
                <span className="font-medium">
                  {form.watch("name") || "Nombre de categoría"}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedType === "income" 
                    ? "bg-success/10 text-success" 
                    : "bg-destructive/10 text-destructive"
                }`}>
                  {selectedType === "income" ? "Ingreso" : "Gasto"}
                </span>
              </div>
            </div>

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
                ) : isEditing ? (
                  "Guardar cambios"
                ) : (
                  "Crear categoría"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
