import { createSignal, mergeProps, onMount, Suspense } from "solid-js";
import { menuOpen } from "~/lib/stores/navigation-store";
import { getProfileImage } from "~/lib/supabase/storage-service";

export default function ProfileImage(props: { id?: string; size?: number; isDealer?: boolean }) {
  props = mergeProps({ size: 6 }, props);
  const style = `width: ${props.size}rem; height: ${props.size}rem`;

  const [profileImageUrl, setProfileImageUrl] = createSignal("");
  onMount(async () => setProfileImageUrl(await getProfileImage({ isDealer: props.isDealer })));
  // const [profileImageUrl] = createResource(async () => await getProfileImage({ isDealer: props.isDealer }));

  return (
    <Suspense>
      <div class="avatar cursor-pointer" classList={{ invisible: menuOpen() }}>
        <div class="rounded-full ring-2 ring-[#556368]" style={style}>
          <img loading="lazy" src={profileImageUrl()} alt="Profile" />
        </div>
      </div>
    </Suspense>
  );
}
