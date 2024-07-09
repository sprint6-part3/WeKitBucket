/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-empty */

"use client";

import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import ToggleIcon from "@/assets/icons/arrowdown.svg";
import DefaultProfile from "@/assets/icons/defaultProfile.svg";
import { RequestProfileCode } from "@/apis/profile/getProfilesCode";
import CameraIcon from "@/assets/icons/camera.svg";
import UserData from "./UserData";

interface userDataListProp extends userDataProps {
  isEdit: boolean;
  myPage: boolean;
  onChange: (name: string, value: string | File | null) => void;
}

export interface userDataProps {
  privateData: RequestProfileCode;
}
function UserDataList({ privateData, isEdit, myPage, onChange }: userDataListProp) {
  const { city, mbti, job, sns, birthday, nickname, bloodType, nationality, image } = privateData;
  const labellist = [
    { name: "거주 도시", value: city },
    { name: "MBTI", value: mbti },
    { name: "직업", value: job },
    { name: "SNS 계정", value: sns },
    { name: "생일", value: birthday },
    { name: "별명", value: nickname },
    { name: "혈액형", value: bloodType },
    { name: "국적", value: nationality },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(image);
  const myEdit = isEdit && myPage;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextImg = e.target.files?.[0];
    if (nextImg) {
      onChange("image", nextImg);
    }
  };

  const handleClear = useCallback(() => {
    setPreview(null);
    onChange("image", null);
  }, [onChange]);

  useEffect(() => {
    if (!image && image?.includes("http")) {
    } else if (image) {
      const blob = typeof image === "string" ? new Blob([image], { type: "text/plain" }) : image;

      const nextPreview = URL.createObjectURL(blob);
      setPreview(nextPreview);

      return () => {
        URL.revokeObjectURL(nextPreview);
      };
    }
  }, [image]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const ToggleHidden = isOpen ? `h-fit` : `h-[100px] md:h-[90px] xl:h-fit`;

  return (
    <section className="rounded-[10px] border bg-white">
      <div className="flex gap-5 px-6 pt-5">
        {myEdit ? (
          <>
            <label
              htmlFor="fileInput"
              className="group relative mx-auto flex size-[71px] cursor-pointer items-center justify-center rounded-full border-2 border-gray-100 hover:bg-black hover:bg-opacity-20 xl:size-[200px]"
            >
              <CameraIcon width={20} height={20} className="z-2 text-white group-hover:brightness-50" />
              {preview && (
                <Image
                  className="rounded-full group-hover:brightness-50"
                  alt="프로필 이미지 미리보기"
                  src={image || preview || "@/assets/icons/defaultProfile.svg"}
                  fill
                  sizes="(max-width: 768px) 62px, (max-width: 1200px) 81px, 200px"
                  style={{ objectFit: "cover" }}
                />
              )}
            </label>

            {preview && myPage && (
              <button
                className="absolute text-white sm:right-0 md:right-0 xl:left-[245px] xl:top-[-25px]"
                onClick={handleClear}
              >
                <span className="rounded-full bg-primary-green-200 px-[6px] py-[2px]">X</span>
              </button>
            )}

            <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />
          </>
        ) : (
          <div className="relative mr-4 size-[71px] rounded-full border-gray-200 md:mr-10 md:size-[81px] xl:mx-auto xl:mb-10 xl:size-[200px]">
            {image ? (
              <Image src={image} alt="프로필 이미지" sizes="(max-width: 768px) 62px, (max-width: 1200px) 81px, 200px" />
            ) : (
              <DefaultProfile width="100%" height="100%" />
            )}
          </div>
        )}

        <div
          className={`${isEdit ? "flex flex-col gap-y-2 text-center lg:grid lg:grid-cols-2 lg:items-center xl:flex xl:flex-col xl:gap-[18px]" : "flex flex-col gap-2"} overflow-hidden xl:gap-4 xl:py-2 ${isEdit ? "h-fit" : ToggleHidden} `}
        >
          {labellist.map(field => (
            <UserData myEdit={myEdit} key={field.name} onChange={onChange} {...field} />
          ))}
        </div>
      </div>

      {isEdit || (
        <div className="flex cursor-pointer justify-center xl:hidden" onClick={handleToggle}>
          <ToggleIcon alt="arrow" height={24} width={24} />
        </div>
      )}
    </section>
  );
}
export default UserDataList;
