
// Define concrete types for community data to avoid complex type inference
export type BasicCommunity = {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  banner_url: string | null;
  is_featured?: boolean | null; 
  is_private?: boolean | null;
  is_verified?: boolean | null; 
  created_at: string;
  updated_at: string | null;
  creator_id: string | null;
  max_admins?: number;
};

// Use a concrete type definition for mutations
export type MutationResult = {
  mutateAsync: (params: any) => Promise<any>;
};

// Define the interface with explicit types
export interface UseCommunities {
  // Admin functions
  isCommunityAdmin: (communityId: string) => Promise<boolean>;
  isCommunityCreator: (communityId: string) => Promise<boolean>;
  createCommunity: MutationResult;
  addCommunityAdmin: MutationResult;
  removeCommunityAdmin: MutationResult;
  transferCommunityOwnership: MutationResult;
  getCommunityMembers: (communityId: string) => Promise<any[]>;
  
  // Membership functions
  getCommunityMembershipStatus: (communityId: string) => Promise<{
    isMember: boolean;
    isAdmin: boolean;
    isCreator: boolean;
  }>;
  joinCommunity: MutationResult;
  leaveCommunity: MutationResult;
  
  // Query functions
  getAllCommunities: () => Promise<BasicCommunity[]>;
  getFeaturedCommunities: () => Promise<BasicCommunity[]>;
  getCommunity: (communityId: string) => Promise<CommunityDetails | null>;
}

// Import this from the original file to maintain compatibility
import { CommunityDetails } from '../useClubTypes';
export { CommunityDetails };
