import { createMutable } from "solid-js/store";
import { Session } from "~/lib/supabase/auth-service";

export default createMutable<Session>({ isDealer: false });
