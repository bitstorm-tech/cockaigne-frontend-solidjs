import { getUserId } from "~/lib/supabase/auth-service";
import type { ReportedDeal } from "./public-types";
import { supabase } from "./supabase-client";

export async function getReport(dealId: string): Promise<ReportedDeal | undefined> {
  const userId = await getUserId();

  if (!userId) return;

  const { data, error } = await supabase.from("reported_deals").select().eq("deal_id", dealId).eq("reporter_id", userId).single();

  if (error) {
    console.log("Can't get report:", error.message);
    return;
  }

  return data;
}

export async function saveReport(dealId: string, reason: string) {
  const id = await getUserId();

  if (!id) {
    return;
  }

  await supabase.from("reported_deals").insert({ deal_id: dealId, reason, reporter_id: id });
}
