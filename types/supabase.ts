export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      thoughts: {
        Row: {
          content: string
          created_at: string
          from_owner: boolean
          id: number
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          from_owner?: boolean
          id?: number
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          from_owner?: boolean
          id?: number
          title?: string
        }
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
