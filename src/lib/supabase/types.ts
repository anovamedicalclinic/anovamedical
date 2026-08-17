/**
 * Tipuri pentru schema Supabase (vezi supabase/migrations/0001_init.sql).
 * Scrise manual pentru a tipa fetch-urile fără a depinde de proiectul live.
 * La nevoie pot fi regenerate cu: `supabase gen types typescript`.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

/** Rolurile din panoul de administrare (vezi 0002_admin.sql). */
export type UserRole = "admin" | "editor" | "reception";

/** Starea unei cereri de programare. */
export type AppointmentStatus =
  | "new"
  | "contacted"
  | "scheduled"
  | "cancelled";

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
          status: AppointmentStatus;
          notes: string | null;
          handled_by: string | null;
          handled_at: string | null;
          email_status: "sent" | "failed" | null;
          email_error: string | null;
          client_ip: string | null;
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
          status?: AppointmentStatus;
          notes?: string | null;
          handled_by?: string | null;
          handled_at?: string | null;
          email_status?: "sent" | "failed" | null;
          email_error?: string | null;
          client_ip?: string | null;
          created_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["appointment_requests"]["Insert"]
        >;
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: UserRole;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          role?: UserRole;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      site_content: {
        Row: {
          key: string;
          value: string | null;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          key: string;
          value?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["site_content"]["Insert"]>;
        Relationships: [];
      };
      testimonials: {
        Row: {
          id: string;
          author: string;
          rating: number;
          text: string;
          is_published: boolean;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          author: string;
          rating?: number;
          text: string;
          is_published?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Insert"]>;
        Relationships: [];
      };
      staff: {
        Row: {
          id: string;
          name: string;
          role: string;
          photo_url: string | null;
          is_published: boolean;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          role: string;
          photo_url?: string | null;
          is_published?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["staff"]["Insert"]>;
        Relationships: [];
      };
      app_settings: {
        Row: {
          key: string;
          value: Json;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          key: string;
          value?: Json;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["app_settings"]["Insert"]>;
        Relationships: [];
      };
      audit_log: {
        Row: {
          id: number;
          actor_id: string | null;
          actor_email: string | null;
          action: string;
          entity: string;
          entity_id: string | null;
          details: Json | null;
          created_at: string;
        };
        Insert: {
          actor_id?: string | null;
          actor_email?: string | null;
          action: string;
          entity: string;
          entity_id?: string | null;
          details?: Json | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["audit_log"]["Insert"]>;
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
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];
export type StaffMember = Database["public"]["Tables"]["staff"]["Row"];
