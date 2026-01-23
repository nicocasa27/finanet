import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useBusiness } from '@/contexts/BusinessContext';
import { toast } from 'sonner';

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
}

interface BusinessSettings {
  id: string;
  name: string;
  type: string | null;
  currency: string | null;
  timezone: string | null;
}

export function useSettingsData() {
  const { user } = useAuth();
  const { activeBusiness, refetchBusinesses } = useBusiness();
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [business, setBusiness] = useState<BusinessSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          throw profileError;
        }
        
        setProfile(profileData || { id: user.id, full_name: null, avatar_url: null });

        // Set business from context
        if (activeBusiness) {
          setBusiness({
            id: activeBusiness.id,
            name: activeBusiness.name,
            type: activeBusiness.type,
            currency: activeBusiness.currency,
            timezone: activeBusiness.timezone,
          });
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, activeBusiness]);

  const updateProfile = async (fullName: string) => {
    if (!user) return false;

    try {
      setSaving(true);
      
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: fullName, updated_at: new Date().toISOString() })
        .eq('id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, full_name: fullName } : null);
      toast.success('Perfil actualizado');
      return true;
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Error al actualizar perfil');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const updateBusiness = async (updates: Partial<BusinessSettings>) => {
    if (!activeBusiness) return false;

    try {
      setSaving(true);
      
      const { error } = await supabase
        .from('businesses')
        .update({
          name: updates.name,
          type: updates.type,
          currency: updates.currency,
          timezone: updates.timezone,
          updated_at: new Date().toISOString(),
        })
        .eq('id', activeBusiness.id);

      if (error) throw error;

      setBusiness(prev => prev ? { ...prev, ...updates } : null);
      await refetchBusinesses();
      toast.success('Negocio actualizado');
      return true;
    } catch (error: any) {
      console.error('Error updating business:', error);
      toast.error(error.message || 'Error al actualizar negocio');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const saveAll = async (profileData: { fullName: string }, businessData: Partial<BusinessSettings>) => {
    setSaving(true);
    let success = true;

    // Update profile
    if (profile?.full_name !== profileData.fullName) {
      const profileResult = await updateProfile(profileData.fullName);
      if (!profileResult) success = false;
    }

    // Update business
    if (business && (
      business.name !== businessData.name ||
      business.type !== businessData.type ||
      business.currency !== businessData.currency ||
      business.timezone !== businessData.timezone
    )) {
      const businessResult = await updateBusiness(businessData);
      if (!businessResult) success = false;
    }

    setSaving(false);
    
    if (success) {
      toast.success('Cambios guardados correctamente');
    }
    
    return success;
  };

  return {
    loading,
    saving,
    profile,
    business,
    updateProfile,
    updateBusiness,
    saveAll,
  };
}
