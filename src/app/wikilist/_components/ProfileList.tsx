"use server";

import { ProfileData } from "@/types/profiles";
import Profile from "./Profile";

function ProfileList({ list }: ProfileData) {
  return (
    <div>
      {list.map(item => (
        <Profile item={item} key={item.id} />
      ))}
    </div>
  );
}

export default ProfileList;
