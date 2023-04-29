import { createSignal, Show } from "solid-js";
import Button from "~/components/ui/Button";
import LoadingSpinner from "~/components/ui/icons/LoadingSpinner";
import Modal from "~/components/ui/Modal";
import Textarea from "~/components/ui/Textarea";
import { ActiveDeal } from "~/lib/supabase/public-types";
import { getReport, saveReport } from "~/lib/supabase/report-service";

export const [showReportDealModal, setShowReportDealModal] = createSignal(false);

export default function ReportDealModal(props: { deal: ActiveDeal }) {
  const [loading, setLoading] = createSignal(true);
  const [reason, setReason] = createSignal("");
  const [alreadyReported, setAlreadyReported] = createSignal(false);

  async function open() {
    const report = await getReport(props.deal.id);
    if (report) {
      setReason(report.reason);
      setAlreadyReported(true);
    }
    setLoading(false);
  }

  async function save() {
    saveReport(props.deal.id, reason()).then();
    setShowReportDealModal(false);
  }

  return (
    <Modal show={showReportDealModal()} onShow={open} onClose={() => setShowReportDealModal(false)}>
      <h2 class="break-words">
        Du willst den Deal <i>{props.deal.title}</i> melden?
      </h2>
      <Show when={loading()}>
        <div class="flex justify-around py-4">
          <LoadingSpinner size={3} />
        </div>
      </Show>
      <Show when={!loading() && alreadyReported()}>
        <div class="flex flex-col gap-3">
          <span class="text-xs">Du hast den Deal bereits mit folgender Nachricht gemeldet:</span>
          <span>{reason()}</span>
        </div>
      </Show>
      <Show when={!loading() && !alreadyReported()}>
        <Textarea label="Sag uns, was an dem Deal nicht passt" onChange={setReason} />
      </Show>
      <div class="modal-action">
        <Button disabled={reason().length === 0 || alreadyReported()} onClick={save}>
          Melden
        </Button>
      </div>
    </Modal>
  );
}
