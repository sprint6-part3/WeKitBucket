"use server";

import { ProfileCatalog } from "@/types/profiles";
import Profile from "./Profile";

function ProfileList({ list }: { list: ProfileCatalog[] }) {
  return (
    <div className="flex flex-col gap-2 md:gap-6">
      {list.map(item => (
        <Profile item={item} key={item.id} />
      ))}
    </div>
  );
}

export default ProfileList;
