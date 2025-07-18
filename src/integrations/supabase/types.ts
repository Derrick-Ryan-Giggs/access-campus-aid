export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          created_at: string
          description: string | null
          id: string
          metadata: Json | null
          status: string
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          status: string
          title: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          status?: string
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          created_at: string | null
          grocery_item_id: string
          id: string
          quantity: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          grocery_item_id: string
          id?: string
          quantity?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          grocery_item_id?: string
          id?: string
          quantity?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_grocery_item_id_fkey"
            columns: ["grocery_item_id"]
            isOneToOne: false
            referencedRelation: "grocery_items"
            referencedColumns: ["id"]
          },
        ]
      }
      event_participants: {
        Row: {
          event_id: string
          id: string
          joined_at: string | null
          user_id: string
        }
        Insert: {
          event_id: string
          id?: string
          joined_at?: string | null
          user_id: string
        }
        Update: {
          event_id?: string
          id?: string
          joined_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_participants_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "virtual_events"
            referencedColumns: ["id"]
          },
        ]
      }
      grocery_items: {
        Row: {
          available: boolean | null
          category: string
          created_at: string | null
          description: string | null
          id: string
          image: string | null
          name: string
          price: number
          updated_at: string | null
        }
        Insert: {
          available?: boolean | null
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          name: string
          price: number
          updated_at?: string | null
        }
        Update: {
          available?: boolean | null
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          name?: string
          price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      health_checks: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          provider: string
          scheduled_date: string
          scheduled_time: string
          status: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          provider: string
          scheduled_date: string
          scheduled_time: string
          status?: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          provider?: string
          scheduled_date?: string
          scheduled_time?: string
          status?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      legal_consultations: {
        Row: {
          created_at: string
          description: string
          id: string
          lawyer_assigned: string | null
          priority: string | null
          scheduled_date: string | null
          scheduled_time: string | null
          status: string
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          lawyer_assigned?: string | null
          priority?: string | null
          scheduled_date?: string | null
          scheduled_time?: string | null
          status?: string
          title: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          lawyer_assigned?: string | null
          priority?: string | null
          scheduled_date?: string | null
          scheduled_time?: string | null
          status?: string
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notes: {
        Row: {
          category: string | null
          content: string | null
          created_at: string | null
          id: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          message: string
          read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          message: string
          read?: boolean
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          message?: string
          read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string | null
          grocery_item_id: string
          id: string
          order_id: string
          price: number
          quantity: number
        }
        Insert: {
          created_at?: string | null
          grocery_item_id: string
          id?: string
          order_id: string
          price: number
          quantity: number
        }
        Update: {
          created_at?: string | null
          grocery_item_id?: string
          id?: string
          order_id?: string
          price?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_grocery_item_id_fkey"
            columns: ["grocery_item_id"]
            isOneToOne: false
            referencedRelation: "grocery_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          actual_delivery_date: string | null
          created_at: string | null
          delivery_address: string | null
          estimated_delivery: string | null
          id: string
          notes: string | null
          status: string | null
          total_amount: number
          tracking_number: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          actual_delivery_date?: string | null
          created_at?: string | null
          delivery_address?: string | null
          estimated_delivery?: string | null
          id?: string
          notes?: string | null
          status?: string | null
          total_amount: number
          tracking_number?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          actual_delivery_date?: string | null
          created_at?: string | null
          delivery_address?: string | null
          estimated_delivery?: string | null
          id?: string
          notes?: string | null
          status?: string | null
          total_amount?: number
          tracking_number?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string | null
          phone: string | null
          program: string | null
          student_id: string | null
          updated_at: string | null
          year: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id: string
          name?: string | null
          phone?: string | null
          program?: string | null
          student_id?: string | null
          updated_at?: string | null
          year?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          program?: string | null
          student_id?: string | null
          updated_at?: string | null
          year?: string | null
        }
        Relationships: []
      }
      reminders: {
        Row: {
          completed: boolean | null
          created_at: string | null
          date: string
          description: string | null
          id: string
          time: string
          title: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          date: string
          description?: string | null
          id?: string
          time: string
          title: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          date?: string
          description?: string | null
          id?: string
          time?: string
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          accommodations: string | null
          completed: boolean | null
          created_at: string | null
          deadline: string | null
          description: string | null
          energy_level: string | null
          id: string
          priority: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          accommodations?: string | null
          completed?: boolean | null
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          energy_level?: string | null
          id?: string
          priority?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          accommodations?: string | null
          completed?: boolean | null
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          energy_level?: string | null
          id?: string
          priority?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      tutor_requests: {
        Row: {
          created_at: string | null
          id: string
          message: string
          preferred_time: string | null
          status: string | null
          subject: string
          tutor_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          preferred_time?: string | null
          status?: string | null
          subject: string
          tutor_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          preferred_time?: string | null
          status?: string | null
          subject?: string
          tutor_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tutor_requests_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutors"
            referencedColumns: ["id"]
          },
        ]
      }
      tutors: {
        Row: {
          availability: string | null
          bio: string | null
          created_at: string | null
          email: string
          id: string
          image: string | null
          name: string
          phone: string | null
          rating: number | null
          subjects: string[]
          updated_at: string | null
        }
        Insert: {
          availability?: string | null
          bio?: string | null
          created_at?: string | null
          email: string
          id?: string
          image?: string | null
          name: string
          phone?: string | null
          rating?: number | null
          subjects: string[]
          updated_at?: string | null
        }
        Update: {
          availability?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string
          id?: string
          image?: string | null
          name?: string
          phone?: string | null
          rating?: number | null
          subjects?: string[]
          updated_at?: string | null
        }
        Relationships: []
      }
      virtual_events: {
        Row: {
          accessibility_features: string[] | null
          created_at: string | null
          creator_id: string
          date: string
          description: string | null
          duration: number | null
          id: string
          max_participants: number | null
          time: string
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          accessibility_features?: string[] | null
          created_at?: string | null
          creator_id: string
          date: string
          description?: string | null
          duration?: number | null
          id?: string
          max_participants?: number | null
          time: string
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          accessibility_features?: string[] | null
          created_at?: string | null
          creator_id?: string
          date?: string
          description?: string | null
          duration?: number | null
          id?: string
          max_participants?: number | null
          time?: string
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
