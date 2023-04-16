import { createResource, mergeProps, Show, Suspense } from "solid-js";
import { menuOpen } from "~/lib/stores/navigation-store";
import storageService from "~/lib/supabase/storage-service";

export default function ProfileImage(props: { size?: number }) {
  props = mergeProps({ size: 6 }, props);
  const style = `width: ${props.size}rem; height: ${props.size}rem`;

  const [profileImageUrl] = createResource(async () => await storageService.getProfileImage());

  return (
    <Show when={!menuOpen()}>
      <div class="avatar cursor-pointer">
        <Suspense>
          <div class="rounded-full ring-2 ring-[#556368]" style={style}>
            <img loading="lazy" src={profileImageUrl()} alt="Profile" />
          </div>
        </Suspense>
      </div>
    </Show>
  );
}
