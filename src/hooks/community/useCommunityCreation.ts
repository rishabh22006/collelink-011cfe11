
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/authStore';

/**
 * Hook for creating communities
 */
export const useCommunityCreation = () => {
  const queryClient = useQueryClient();
  const { profile } = useAuthStore();

  // Create a new community
  const createCommunity = useMutation({
    mutationFn: async (communityData: {
      name: string;
      description?: string;
      logo_url?: string;
      banner_url?: string;
      is_private?: boolean;
    }) => {
      if (!profile?.id) {
        throw new Error('You must be logged in to create a community');
      }

      try {
        const { data, error } = await supabase
          .from('communities')
          .insert({
            name: communityData.name,
            description: communityData.description || null,
            logo_url: communityData.logo_url || null,
            banner_url: communityData.banner_url || null,
            creator_id: profile.id,
            is_private: communityData.is_private || false
          })
          .select()
          .single();

        if (error) {
          throw error;
        }

        // Also add the creator as an admin member
        const { error: memberError } = await supabase
          .from('community_members')
          .insert({
            community_id: data.id,
            member_id: profile.id,
            role: 'admin'
          });

        if (memberError) {
          throw memberError;
        }

        return data;
      } catch (err) {
        console.error('Failed to create community:', err);
        throw err;
      }
    },
    onSuccess: () => {
      toast.success('Community created successfully');
      queryClient.invalidateQueries({ queryKey: ['communities'] });
    },
    onError: (error: Error) => {
      toast.error('Failed to create community', {
        description: error.message,
      });
    },
  });

  return {
    createCommunity,
  };
};
