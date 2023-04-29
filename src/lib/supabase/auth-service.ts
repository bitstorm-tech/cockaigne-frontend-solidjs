import { jwtVerify } from "jose";
import { isServer } from "solid-js/web";
import { useServerContext } from "solid-start";
import sessionStore from "~/lib/stores/session-store";
import { supabase, translateError } from "~/lib/supabase/supabase-client";

const JWT_KEY = new TextEncoder().encode(import.meta.env.VITE_SUPABASE_JWT_KEY);

export interface Session {
  userId?: string;
  isDealer: boolean;
}

export async function getSession(): Promise<Session> {
  const { error, data } = await supabase.auth.getSession();

  if (error || !data.session) {
    if (error) {
      console.error("Can't get session:", error?.message);
    }

    return {
      isDealer: false
    };
  }

  return {
    userId: data.session.user.id,
    isDealer: data.session.user.user_metadata.isDealer
  };
}

export async function login(email: string, password: string): Promise<string | undefined> {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error("Can't login:", error.message);
    return translateError(error);
  }
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Can't logout:", error.message);
  }
}

export async function getUserId(): Promise<string | undefined> {
  if (!isServer) {
    const session = await getSession();
    return session.userId;
  }

  const ctx = useServerContext();

  if (!ctx.request) {
    return;
  }

  const tokens = await extractTokensFromRequest(ctx.request);

  if (tokens) {
    await setSupabaseTokens(tokens);
  }

  try {
    const { payload } = await jwtVerify(tokens?.accessToken || "", JWT_KEY);
    return payload.sub;
  } catch {
    return;
  }
}

type SupabaseTokens = {
  accessToken: string;
  refreshToken: string;
};

export async function extractTokensFromRequest(request: Request): Promise<SupabaseTokens | undefined> {
  const cookies = request.headers.get("cookie");

  if (!cookies) {
    return;
  }

  const accessTokenString = cookies.split(";").find((value) => value.includes("my-access-token"));
  const refreshTokenString = cookies.split(";").find((value) => value.includes("my-refresh-token"));

  if (!accessTokenString || !refreshTokenString) {
    return;
  }

  const accessToken = accessTokenString.split("=")[1].trim();
  const refreshToken = refreshTokenString.split("=")[1].trim();

  return {
    accessToken,
    refreshToken
  };
}

export async function setSupabaseTokens(tokens: SupabaseTokens) {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error("Can't set supabase session in server:", error.message);
    return;
  }

  const currentSession = data.session;

  if (currentSession && currentSession.access_token && currentSession.refresh_token) {
    return;
  }

  await supabase.auth.setSession({
    access_token: tokens.accessToken,
    refresh_token: tokens.refreshToken
  });
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
