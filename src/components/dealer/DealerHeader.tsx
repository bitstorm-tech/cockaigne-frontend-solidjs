import { createResource, JSXElement, Suspense } from "solid-js";
import ProfileImage from "~/components/user/ProfileImage";
import { getDealer } from "~/lib/supabase/dealer-service";

export default function DealerHeader(props: { id: string; children: JSXElement }) {
  const [dealer] = createResource(async () => await getDealer(props.id));

  return (
    <div class="flex flex-col">
      <div class="flex justify-around">
        <div class="flex flex-col pt-2">
          <Suspense>
            <span class="text-2xl">{dealer()?.username}</span>
            <span>{`${dealer()?.street} ${dealer()?.house_number}`}</span>
            <span>{`${dealer()?.zip} ${dealer()?.city}`}</span>
          </Suspense>
        </div>
        <div class="-mt-6 mr-8 flex flex-col items-center">
          <div class="z-10">
            <ProfileImage id={props.id} isDealer={true} />
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
}
