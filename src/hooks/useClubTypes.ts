
// Do not use Database from Supabase types directly as it doesn't have club tables
// Define our own types for club-related entities

// Shared interfaces and types for club-related functionality
export interface Club {
  id: string;
  name: string;
  description: string | null;
  institution: string | null;
  logo_url: string | null;
  banner_url: string | null;
  is_featured: boolean | null;
  is_verified: boolean | null;
  created_at: string;
  updated_at: string | null;
  creator_id?: string | null;
  max_admins?: number;
}

export interface ClubMember {
  id: string;
  club_id: string;
  user_id: string;
  joined_at: string;
}

export interface ClubAdmin {
  id: string;
  club_id: string;
  user_id: string;
  created_at: string;
}

export interface ClubDetails extends Club {
  // Support both naming conventions for member count
  members_count?: number;
  member_count?: number;
  is_member?: boolean;
  is_admin?: boolean;
  is_creator?: boolean;
  events?: Array<{
    id: string;
    title: string;
    date: string;
    attendees: number;
  }>;
}

export interface ClubMembershipStatus {
  isMember: boolean;
  isAdmin: boolean;
  isCreator: boolean;
}

export interface ClubMemberWithProfile {
  user_id: string;
  joined_at: string;
  is_admin: boolean;
  display_name: string;
  avatar_url: string | null;
}

export interface AdminManagementResult {
  success: boolean;
  error?: string;
  message: string;
}

export interface CommunityDetails {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  banner_url: string | null;
  is_private?: boolean | null;
  is_featured?: boolean | null;
  is_verified?: boolean | null;
  creator_id?: string | null;
  created_at: string;
  updated_at: string | null;
  members_count?: number;
  is_member?: boolean;
  is_admin?: boolean;
  is_creator?: boolean;
  max_admins?: number;
}
