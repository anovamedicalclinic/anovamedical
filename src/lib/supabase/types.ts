/**
 * Tipuri pentru schema Supabase (vezi supabase/migrations/0001_init.sql).
 * Scrise manual pentru a tipa fetch-urile fără a depinde de proiectul live.
 * La nevoie pot fi regenerate cu: `supabase gen types typescript`.
 */

export type Database = {
  public: {
    Tables: {
      specialties: {
        Row: {
          id: string;
          slug: string;
          name: string;
          tagline: string | null;
          summary: string | null;
          description: string | null;
          icon: string | null;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          tagline?: string | null;
          summary?: string | null;
          description?: string | null;
          icon?: string | null;
          order_index?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["specialties"]["Insert"]>;
        Relationships: [];
      };
      doctors: {
        Row: {
          id: string;
          slug: string;
          name: string;
          title: string | null;
          credentials: string | null;
          photo_url: string | null;
          short_bio: string | null;
          full_bio: string | null;
          order_index: number;
          is_founder: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          title?: string | null;
          credentials?: string | null;
          photo_url?: string | null;
          short_bio?: string | null;
          full_bio?: string | null;
          order_index?: number;
          is_founder?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["doctors"]["Insert"]>;
        Relationships: [];
      };
      doctor_specialties: {
        Row: {
          doctor_id: string;
          specialty_id: string;
        };
        Insert: {
          doctor_id: string;
          specialty_id: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["doctor_specialties"]["Insert"]
        >;
        Relationships: [];
      };
      appointment_requests: {
        Row: {
          id: string;
          full_name: string;
          email: string | null;
          phone: string;
          specialty_id: string | null;
          message: string | null;
          preferred_date: string | null;
          status: "new" | "contacted" | "scheduled";
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email?: string | null;
          phone: string;
          specialty_id?: string | null;
          message?: string | null;
          preferred_date?: string | null;
          status?: "new" | "contacted" | "scheduled";
          created_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["appointment_requests"]["Insert"]
        >;
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: Record<never, never>;
  };
};

export type Specialty = Database["public"]["Tables"]["specialties"]["Row"];
export type Doctor = Database["public"]["Tables"]["doctors"]["Row"];
export type AppointmentRequest =
  Database["public"]["Tables"]["appointment_requests"]["Row"];
