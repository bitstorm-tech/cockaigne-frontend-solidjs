import { createResource, mergeProps, Suspense } from "solid-js";
import { menuOpen } from "~/lib/stores/navigation-store";
import storageService from "~/lib/supabase/storage-service";

export default function ProfileImage(props: { id?: string; size?: number; isDealer?: boolean }) {
  props = mergeProps({ size: 6 }, props);
  const style = `width: ${props.size}rem; height: ${props.size}rem`;

  const [profileImageUrl] = createResource(async () => await storageService.getProfileImage(props.id, props.isDealer));

  return (
    <div class="avatar cursor-pointer" classList={{ invisible: menuOpen() }}>
      <Suspense>
        <div class="rounded-full ring-2 ring-[#556368]" style={style}>
          <img loading="lazy" src={profileImageUrl()} alt="Profile" />
        </div>
      </Suspense>
    </div>
  );
}
