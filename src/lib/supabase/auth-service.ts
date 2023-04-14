import sessionStore from "~/lib/stores/session-store";
import { supabase, translateError } from "~/lib/supabase/supabase-client";

export interface Session {
  userId?: string;
  isDealer: boolean;
}

async function getSession(): Promise<Session> {
  const { error, data } = await supabase.auth.getSession();

  if (error || !data.session) {
    console.log("Can't get session:", error);
    return {
      isDealer: false
    };
  }

  return {
    userId: data.session.user.id,
    isDealer: data.session.user.user_metadata.isDealer
  };
}

async function login(email: string, password: string): Promise<string | undefined> {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.log("Can't login:", error);
    return translateError(error);
  }
}

async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("Can't logout:", error);
  }
}

async function getUserId(): Promise<string | undefined> {
  const session = await getSession();
  return session.userId;
}

supabase.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_OUT") {
    const expires = new Date(0).toUTCString();
    document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
    document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
    sessionStore.userId = undefined;
  } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
    const maxAge = 5 * 24 * 60 * 60; // 5 days
    document.cookie = `my-access-token=${session?.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
    document.cookie = `my-refresh-token=${session?.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
    sessionStore.userId = session?.user.id;
    sessionStore.isDealer = session?.user.user_metadata.isDealer;
  }
});

export default {
  getSession,
  getUserId,
  logout,
  login
};
