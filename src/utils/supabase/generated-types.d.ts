// IMPORTANT: Remove all " statements from this file

///////////////
// Custom types
///////////////
type TableName = keyof Database["public"]["Tables"];

type ColumnName<T extends TableName> = Extract<
  keyof Database["public"]["Tables"][T]["Row"],
  string
>;

type RowDataStructure<T extends TableName> =
  Database["public"]["Tables"][T]["Row"];

type Datum<
  T extends TableName,
  C extends ColumnName<T>
> = Database["public"]["Tables"][T]["Row"][C];

////////////////////////////////
// Generated types from Supabase
////////////////////////////////
type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      matches: {
        Row: {
          created_at: string;
          match_id: string;
          player1_id: string;
          player2_id: string;
        };
        Insert: {
          created_at?: string;
          match_id?: string;
          player1_id: string;
          player2_id: string;
        };
        Update: {
          created_at?: string;
          match_id?: string;
          player1_id?: string;
          player2_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "matches_player1_id_fkey";
            columns: ["player1_id"];
            isOneToOne: false;
            referencedRelation: "players";
            referencedColumns: ["player_id"];
          },
          {
            foreignKeyName: "matches_player2_id_fkey";
            columns: ["player2_id"];
            isOneToOne: false;
            referencedRelation: "players";
            referencedColumns: ["player_id"];
          }
        ];
      };
      players: {
        Row: {
          mtga_account_id: string;
          player_id: string;
          status: Database["public"]["Enums"]["player_status"];
        };
        Insert: {
          mtga_account_id: string;
          player_id: string;
          status?: Database["public"]["Enums"]["player_status"];
        };
        Update: {
          mtga_account_id?: string;
          player_id?: string;
          status?: Database["public"]["Enums"]["player_status"];
        };
        Relationships: [];
      };
      queue: {
        Row: {
          is_matched: boolean;
          is_ready: boolean;
          joined_at: string;
          matched_at: string | null;
          opponent_id: string | null;
          player_id: string;
        };
        Insert: {
          is_matched?: boolean;
          is_ready?: boolean;
          joined_at?: string;
          matched_at?: string | null;
          opponent_id?: string | null;
          player_id: string;
        };
        Update: {
          is_matched?: boolean;
          is_ready?: boolean;
          joined_at?: string;
          matched_at?: string | null;
          opponent_id?: string | null;
          player_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "queue_opponent_id_fkey";
            columns: ["opponent_id"];
            isOneToOne: false;
            referencedRelation: "players";
            referencedColumns: ["player_id"];
          },
          {
            foreignKeyName: "queue_player_id_fkey";
            columns: ["player_id"];
            isOneToOne: true;
            referencedRelation: "players";
            referencedColumns: ["player_id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      accept_match: {
        Args: {
          current_player_id: string;
        };
        Returns: undefined;
      };
      add_player_to_queue: {
        Args: {
          current_player_id: string;
        };
        Returns: undefined;
      };
      remove_player_from_queue: {
        Args: {
          current_player_id: string;
        };
        Returns: {
          already_matched: boolean;
        }[];
      };
    };
    Enums: {
      player_status: "idle" | "in_queue" | "ready_check" | "in_match";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
