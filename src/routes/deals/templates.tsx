import { createResource } from "solid-js";
import DealerDealList from "~/components/dealer/DealerDealList";
import { getTemplatesByDealer } from "~/lib/supabase/deal-service";
import { ActiveDeal } from "~/lib/supabase/public-types";

export default function templates() {
  const [templates] = createResource(
    async () => {
      return (await getTemplatesByDealer()).map((template) => {
        const newTemplate: ActiveDeal = {
          ...template,
          likes: 0,
          username: "",
          location: undefined,
          start_time: ""
        };
        return newTemplate;
      });
    },
    { initialValue: [] }
  );

  return <DealerDealList deals={templates()} />;
}
