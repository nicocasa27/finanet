import { useState } from "react";
import { useBusiness } from "@/contexts/BusinessContext";
import { ChevronDown, Check, Plus, Building2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface BusinessSelectorProps {
  collapsed?: boolean;
}

export function BusinessSelector({ collapsed = false }: BusinessSelectorProps) {
  const { businesses, activeBusiness, setActiveBusiness, loading } = useBusiness();

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/50 border border-border/50 animate-pulse">
        <div className="h-6 w-6 rounded-lg bg-muted" />
        {!collapsed && <div className="h-4 w-24 rounded bg-muted" />}
      </div>
    );
  }

  if (!activeBusiness) {
    return null;
  }

  const initials = activeBusiness.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (collapsed) {
    return (
      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
        <span className="text-xs font-medium">{initials}</span>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/50 border border-border/50 hover:bg-muted"
        >
          <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <span className="text-xs font-medium">{initials}</span>
          </div>
          <span className="font-medium text-sm">{activeBusiness.name}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {businesses.map((business) => (
          <DropdownMenuItem
            key={business.id}
            onClick={() => setActiveBusiness(business)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span>{business.name}</span>
            </div>
            {business.id === activeBusiness.id && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-muted-foreground" disabled>
          <Plus className="h-4 w-4 mr-2" />
          Agregar negocio (próximamente)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
