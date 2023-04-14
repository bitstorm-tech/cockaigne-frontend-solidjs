import sessionStore from "~/lib/stores/session-store";

export default function MemberStatus() {
  return <span class="badge badge-xs bg-primary p-3 text-xs text-[#dde3e4]">{sessionStore.userId ? "PRO" : "BASIC"}</span>;
}
