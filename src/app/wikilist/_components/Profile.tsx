"use client";

import React from "react";
import { ProfileCatalog } from "@/types/profiles";
import NoProfilePicture from "@/assets/icons/noProfilePicture.svg";
import useResponsive from "@/hooks/useResponsive";
import LinkIcon from "@/assets/icons/link.svg";

function Profile({ item }: { item: ProfileCatalog }) {
  const { isTablet } = useResponsive();
  const { city, nationality, job, name } = item;
  return (
    <div className="flex w-full gap-5 px-5 py-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] md:gap-8 md:px-9 md:py-6">
      <NoProfilePicture width={isTablet ? 85 : 60} height={isTablet ? 85 : 60} />
      <div className="flex w-full flex-col">
        <h1 className="mb-3 text-md-semibold leading-6 text-primary-gray-500 md:mb-4 md:text-lg-semibold">{name}</h1>
        <p className="mb-1 text-xs font-normal leading-4 text-primary-gray-400 md:text-sm md:leading-6">
          {city}, {nationality}
        </p>
        <div className="flex flex-col justify-normal gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs font-normal leading-4 text-primary-gray-400 md:flex-row md:text-sm md:leading-6">
            {job}
          </p>
          <div className="ml-auto flex w-fit items-center gap-1 rounded-xl bg-primary-green-100 px-2 py-1">
            <LinkIcon width={16} height={16} />
            <p className="bg-primary-green-100 text-xs font-normal leading-4 text-primary-green-200 md:text-sm md:leading-6">
              이 프로필 주소 적어야함
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
