import type { ReportedDeal } from "./public-types";
import { getUserId, supabase } from "./supabase-client";

async function getReport(dealId: string): Promise<ReportedDeal | null> {
  const { data } = await supabase.from("reported_deals").select().single();
  return data;
}

async function saveReport(dealId: string, reason: string) {
  const id = await getUserId();

  if (!id) {
    return;
  }

  await supabase.from("reported_deals").insert({ deal_id: dealId, reason, reporter_id: id });
}

export default {
  getReport,
  saveReport
};
