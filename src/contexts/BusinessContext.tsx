import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { Tables } from '@/integrations/supabase/types';

type Business = Tables<'businesses'>;

interface BusinessContextType {
  businesses: Business[];
  activeBusiness: Business | null;
  setActiveBusiness: (business: Business) => void;
  loading: boolean;
  refetchBusinesses: () => Promise<void>;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

const DEFAULT_CATEGORIES = {
  income: [
    { name: 'Ventas', color: '#10B981' },
    { name: 'Servicios', color: '#3B82F6' },
    { name: 'Comisiones', color: '#6366F1' },
    { name: 'Otros ingresos', color: '#8B5CF6' },
  ],
  expense: [
    { name: 'Materia Prima', color: '#EF4444' },
    { name: 'Renta', color: '#F59E0B' },
    { name: 'Nómina', color: '#8B5CF6' },
    { name: 'Marketing', color: '#EC4899' },
    { name: 'Servicios', color: '#14B8A6' },
    { name: 'Transporte', color: '#F97316' },
    { name: 'Equipamiento', color: '#0EA5E9' },
    { name: 'Otros gastos', color: '#94A3B8' },
  ],
};

export function BusinessProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [activeBusiness, setActiveBusinessState] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBusinesses = async () => {
    if (!user) {
      setBusinesses([]);
      setActiveBusinessState(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        setBusinesses(data);
        // If no active business or current one doesn't exist, set first one
        const savedBusinessId = localStorage.getItem('activeBusinessId');
        const savedBusiness = savedBusinessId ? data.find(b => b.id === savedBusinessId) : null;
        setActiveBusinessState(savedBusiness || data[0]);
      } else {
        // No businesses exist, create a default one
        await createDefaultBusiness();
      }
    } catch (error) {
      console.error('Error fetching businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  const createDefaultBusiness = async () => {
    if (!user) return;

    try {
      // Create default business
      const { data: newBusiness, error: businessError } = await supabase
        .from('businesses')
        .insert({
          user_id: user.id,
          name: 'Mi Negocio',
          type: 'general',
          currency: 'MXN',
          timezone: 'America/Mexico_City',
        })
        .select()
        .single();

      if (businessError) throw businessError;

      if (newBusiness) {
        // Create default categories
        const incomeCategories = DEFAULT_CATEGORIES.income.map(cat => ({
          business_id: newBusiness.id,
          type: 'income' as const,
          name: cat.name,
          color: cat.color,
        }));

        const expenseCategories = DEFAULT_CATEGORIES.expense.map(cat => ({
          business_id: newBusiness.id,
          type: 'expense' as const,
          name: cat.name,
          color: cat.color,
        }));

        const { error: categoriesError } = await supabase
          .from('categories')
          .insert([...incomeCategories, ...expenseCategories]);

        if (categoriesError) {
          console.error('Error creating default categories:', categoriesError);
        }

        setBusinesses([newBusiness]);
        setActiveBusinessState(newBusiness);
      }
    } catch (error) {
      console.error('Error creating default business:', error);
    }
  };

  const setActiveBusiness = (business: Business) => {
    setActiveBusinessState(business);
    localStorage.setItem('activeBusinessId', business.id);
  };

  useEffect(() => {
    fetchBusinesses();
  }, [user]);

  return (
    <BusinessContext.Provider 
      value={{ 
        businesses, 
        activeBusiness, 
        setActiveBusiness, 
        loading,
        refetchBusinesses: fetchBusinesses,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
}
