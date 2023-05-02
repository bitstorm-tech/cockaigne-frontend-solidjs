import { AuthError, createClient } from "@supabase/supabase-js";
import type { Database } from "./generated-types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, { auth: { persistSession: true } });

export function translateError(error: AuthError): string {
  switch (error.status) {
    case 400:
      return "E-Mail und/oder Passwort falsch oder dein Account ist noch nicht aktiviert";
    case 401:
      return "Der Aktivierungscode ist falsch";
    case 404:
      return "Es scheint so, als wärst du noch nicht registriert";
    case 422:
      return error.message.toLowerCase().includes("password")
        ? "Das Passwort muss mindestens aus 6 Zeichen bestehen"
        : "Format der E-Mail ist ungültig";
    default:
      return `${error.message} (${error.status})`;
  }
}
