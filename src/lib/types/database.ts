/**
 * Hand-written placeholder covering the Phase 1 tables only.
 *
 * Replace this file by running, once the Supabase project is linked:
 *   supabase gen types typescript --linked > src/lib/types/database.ts
 * Do that after every migration — this file is meant to be regenerated,
 * not maintained by hand past Phase 1.
 */
export type Database = {
  public: {
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
    Tables: {
      songs: {
        Row: {
          id: string;
          title: string;
          cover_art_url: string | null;
          notes: string | null;
          spotify_track_id: string | null;
          publisher_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          cover_art_url?: string | null;
          notes?: string | null;
          spotify_track_id?: string | null;
          publisher_id?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["songs"]["Insert"]>;
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          role: "admin" | "member";
          display_name: string | null;
          company: string | null;
          business_address: string | null;
          phone: string | null;
          locked: boolean;
          lock_message: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role?: "admin" | "member";
          display_name?: string | null;
          company?: string | null;
          business_address?: string | null;
          phone?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
    };
  };
};
