import { createResource } from "solid-js";
import Select from "~/components/ui/Select";
import { getDefaultCategory } from "~/lib/supabase/account-service";
import { getCategories } from "~/lib/supabase/category-service";

export default function CategorySelect(props: {
  label?: string;
  onSelect: (value: number) => void;
  value?: number;
  disabled?: boolean;
}) {
  const [categories] = createResource(getCategories, { initialValue: [] });
  const [defaultCategory] = createResource(getDefaultCategory, { initialValue: 0 });

  return (
    <Select
      label={props.label ?? "Kategorie"}
      options={new Map(categories()?.map((category) => [category.id.toString(), category.name]))}
      selected={props.value?.toString() || defaultCategory().toString()}
      onSelect={(value) => props.onSelect(+value)}
      disabled={props.disabled}
    />
  );
}
