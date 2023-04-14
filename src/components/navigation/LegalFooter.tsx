import { A } from "solid-start";

export default function LegalFooter() {
  return (
    <section class="flex justify-around gap-2 text-xs">
      <A href="/imprint">Impressum</A>
      <A href="/terms">AGB</A>
      <A href="/privacy">Datenschutz</A>
    </section>
  );
}
