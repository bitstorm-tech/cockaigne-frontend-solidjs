import { createResource } from "solid-js";
import Select from "~/components/ui/Select";
import { account } from "~/lib/stores/account-store";
import { getCategories } from "~/lib/supabase/category-service";

export default function CategorySelect(props: {
  label?: string;
  onSelect: (value: number) => void;
  value?: number;
  disabled?: boolean;
}) {
  const [categories] = createResource(getCategories, { initialValue: [] });

  return (
    <Select
      label={props.label ?? "Kategorie"}
      options={new Map(categories()?.map((category) => [category.id.toString(), category.name]))}
      selected={props.value?.toString() || account.default_category?.toString()}
      onSelect={(value) => props.onSelect(+value)}
      disabled={props.disabled}
    />
  );
}
