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
      accounts: {
        Row: {
          age: number | null
          city: string | null
          dealer: boolean
          default_category: number | null
          email: string
          gender: string | null
          house_number: string | null
          id: string
          location: unknown | null
          phone: string | null
          search_radius: number
          street: string | null
          tax_id: string | null
          use_current_location: boolean
          username: string
          zip: number | null
        }
        Insert: {
          age?: number | null
          city?: string | null
          dealer?: boolean
          default_category?: number | null
          email: string
          gender?: string | null
          house_number?: string | null
          id?: string
          location?: unknown | null
          phone?: string | null
          search_radius?: number
          street?: string | null
          tax_id?: string | null
          use_current_location?: boolean
          username: string
          zip?: number | null
        }
        Update: {
          age?: number | null
          city?: string | null
          dealer?: boolean
          default_category?: number | null
          email?: string
          gender?: string | null
          house_number?: string | null
          id?: string
          location?: unknown | null
          phone?: string | null
          search_radius?: number
          street?: string | null
          tax_id?: string | null
          use_current_location?: boolean
          username?: string
          zip?: number | null
        }
      }
      categories: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
      }
      dealer_ratings: {
        Row: {
          created: string
          dealer_id: string
          rating_text: string | null
          stars: number
          user_id: string
        }
        Insert: {
          created?: string
          dealer_id: string
          rating_text?: string | null
          stars: number
          user_id: string
        }
        Update: {
          created?: string
          dealer_id?: string
          rating_text?: string | null
          stars?: number
          user_id?: string
        }
      }
      deals: {
        Row: {
          category_id: number
          created: string
          dealer_id: string
          description: string
          duration: number
          id: string
          start: string
          template: boolean
          title: string
        }
        Insert: {
          category_id: number
          created?: string
          dealer_id: string
          description: string
          duration: number
          id?: string
          start: string
          template?: boolean
          title: string
        }
        Update: {
          category_id?: number
          created?: string
          dealer_id?: string
          description?: string
          duration?: number
          id?: string
          start?: string
          template?: boolean
          title?: string
        }
      }
      favorite_dealers: {
        Row: {
          created: string
          dealer_id: string
          user_id: string
        }
        Insert: {
          created?: string
          dealer_id: string
          user_id: string
        }
        Update: {
          created?: string
          dealer_id?: string
          user_id?: string
        }
      }
      hot_deals: {
        Row: {
          created: string
          deal_id: string
          user_id: string
        }
        Insert: {
          created?: string
          deal_id: string
          user_id: string
        }
        Update: {
          created?: string
          deal_id?: string
          user_id?: string
        }
      }
      likes: {
        Row: {
          created: string
          deal_id: string
          user_id: string
        }
        Insert: {
          created?: string
          deal_id: string
          user_id: string
        }
        Update: {
          created?: string
          deal_id?: string
          user_id?: string
        }
      }
      reported_deals: {
        Row: {
          created: string
          deal_id: string
          reason: string
          reporter_id: string
        }
        Insert: {
          created?: string
          deal_id: string
          reason: string
          reporter_id: string
        }
        Update: {
          created?: string
          deal_id?: string
          reason?: string
          reporter_id?: string
        }
      }
      selected_categories: {
        Row: {
          category_id: number
          created: string
          user_id: string
        }
        Insert: {
          category_id: number
          created?: string
          user_id: string
        }
        Update: {
          category_id?: number
          created?: string
          user_id?: string
        }
      }
    }
    Views: {
      active_deals_view: {
        Row: {
          category_id: number | null
          dealer_id: string | null
          description: string | null
          duration: number | null
          id: string | null
          likes: number | null
          location: unknown | null
          start: string | null
          start_time: string | null
          title: string | null
          username: string | null
        }
      }
      dealer_ratings_view: {
        Row: {
          dealer_id: string | null
          rating_text: string | null
          stars: number | null
          user_id: string | null
          username: string | null
        }
      }
      dealer_view: {
        Row: {
          city: string | null
          house_number: string | null
          id: string | null
          street: string | null
          username: string | null
          zip: number | null
        }
        Insert: {
          city?: string | null
          house_number?: string | null
          id?: string | null
          street?: string | null
          username?: string | null
          zip?: number | null
        }
        Update: {
          city?: string | null
          house_number?: string | null
          id?: string | null
          street?: string | null
          username?: string | null
          zip?: number | null
        }
      }
      favorite_dealers_view: {
        Row: {
          dealer_id: string | null
          user_id: string | null
          username: string | null
        }
      }
      future_deals_view: {
        Row: {
          category_id: number | null
          dealer_id: string | null
          description: string | null
          duration: number | null
          id: string | null
          likes: number | null
          location: unknown | null
          start: string | null
          start_time: string | null
          title: string | null
          username: string | null
        }
      }
      like_counts_view: {
        Row: {
          deal_id: string | null
          likecount: number | null
        }
      }
      past_deals_view: {
        Row: {
          category_id: number | null
          dealer_id: string | null
          description: string | null
          duration: number | null
          id: string | null
          likes: number | null
          location: unknown | null
          start: string | null
          start_time: string | null
          title: string | null
          username: string | null
        }
      }
    }
    Functions: {
      get_active_deals_within_extent: {
        Args: {
          p_location?: number[]
          p_radius?: number
          p_extent?: number[]
        }
        Returns: {
          category_id: number | null
          dealer_id: string | null
          description: string | null
          duration: number | null
          id: string | null
          likes: number | null
          location: unknown | null
          start: string | null
          start_time: string | null
          title: string | null
          username: string | null
        }[]
      }
      get_favorite_dealer_deals: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>[]
      }
      get_favorite_dealers: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

