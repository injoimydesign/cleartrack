/**
 * Hand-written placeholder — extended through Phase 2 (reference tables,
 * writers, and the song join tables).
 *
 * Replace this file by running, once the Supabase project is linked:
 *   supabase gen types typescript --linked > src/lib/types/database.ts
 * Do that after every migration — this file is meant to be regenerated,
 * not maintained by hand past the early phases.
 */
type NameEntityRow = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  search_vector: string;
};
type NameEntityInsert = { id?: string; name: string };
type NameEntityUpdate = Partial<NameEntityInsert>;

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
          search_vector: string;
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
          locked?: boolean;
          lock_message?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      artists: {
        Row: NameEntityRow;
        Insert: NameEntityInsert;
        Update: NameEntityUpdate;
        Relationships: [];
      };
      labels: {
        Row: NameEntityRow;
        Insert: NameEntityInsert;
        Update: NameEntityUpdate;
        Relationships: [];
      };
      publishers: {
        Row: NameEntityRow;
        Insert: NameEntityInsert;
        Update: NameEntityUpdate;
        Relationships: [];
      };
      pros: {
        Row: { id: string; name: string; created_at: string };
        Insert: { id?: string; name: string };
        Update: { name?: string };
        Relationships: [];
      };
      writers: {
        Row: {
          id: string;
          name: string;
          publisher_id: string | null;
          created_at: string;
          updated_at: string;
          search_vector: string;
        };
        Insert: { id?: string; name: string; publisher_id?: string | null };
        Update: Partial<Database["public"]["Tables"]["writers"]["Insert"]>;
        Relationships: [];
      };
      writer_pros: {
        Row: { writer_id: string; pro_id: string };
        Insert: { writer_id: string; pro_id: string };
        Update: Partial<{ writer_id: string; pro_id: string }>;
        Relationships: [];
      };
      writer_publisher_pros: {
        Row: { writer_id: string; pro_id: string };
        Insert: { writer_id: string; pro_id: string };
        Update: Partial<{ writer_id: string; pro_id: string }>;
        Relationships: [];
      };
      song_artists: {
        Row: { song_id: string; artist_id: string };
        Insert: { song_id: string; artist_id: string };
        Update: Partial<{ song_id: string; artist_id: string }>;
        Relationships: [];
      };
      song_writers: {
        Row: { song_id: string; writer_id: string; split_percent: number };
        Insert: { song_id: string; writer_id: string; split_percent: number };
        Update: Partial<
          Database["public"]["Tables"]["song_writers"]["Insert"]
        >;
        Relationships: [];
      };
      song_labels: {
        Row: { song_id: string; label_id: string; split_percent: number };
        Insert: { song_id: string; label_id: string; split_percent: number };
        Update: Partial<
          Database["public"]["Tables"]["song_labels"]["Insert"]
        >;
        Relationships: [];
      };
      folders: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: { id?: string; owner_id: string; name: string; description?: string | null };
        Update: Partial<Database["public"]["Tables"]["folders"]["Insert"]>;
        Relationships: [];
      };
      folder_songs: {
        Row: { folder_id: string; song_id: string; added_at: string };
        Insert: { folder_id: string; song_id: string };
        Update: Partial<{ folder_id: string; song_id: string }>;
        Relationships: [];
      };
    };
  };
};
