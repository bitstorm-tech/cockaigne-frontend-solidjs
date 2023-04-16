import { createResource, mergeProps, Suspense } from "solid-js";
import storageService from "~/lib/supabase/storage-service";

export default function ProfileImage(props: { size?: number }) {
  props = mergeProps({ size: 6 }, props);
  const style = `width: ${props.size}rem; height: ${props.size}rem`;

  const [profileImageUrl] = createResource(async () => await storageService.getProfileImage());

  return (
    <div class="avatar cursor-pointer">
      <div class="rounded-full bg-gray-500 ring-2 ring-[#556368]" style={style}>
        <Suspense>
          <img loading="lazy" src={profileImageUrl()} alt="Profile" />
        </Suspense>
      </div>
    </div>
  );
}
