/* eslint-disable react/function-component-definition */
/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-empty */
import React, { useState, useCallback, useEffect, ChangeEvent, memo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import ExpandIcon from "@/assets/icons/arrowdown.svg";
import CameraIcon from "@/assets/icons/camera.svg";
import DefaultProfile from "@/assets/icons/defaultProfile.svg";
import useImageLoad from "@/hooks/useImageLoad";
import ProfileInfos from "./ProfileInfos";

export interface UserProfileProps {
  nationality: string;
  bloodType: string;
  nickname: string;
  birthday: string;
  sns: string;
  job: string;
  mbti: string;
  city: string;
  image: string | null;
  isEditing: boolean;
  editMyPage: boolean;
  isMyPage: boolean;
  onChange: (name: string, value: string | File | null) => void;
  value: string | File | null;
}

const UserProfile: React.FC<UserProfileProps> = ({
  image,
  city,
  mbti,
  job,
  sns,
  birthday,
  nickname,
  bloodType,
  nationality,
  isEditing,
  isMyPage,
  editMyPage,
  onChange,
  value,
}) => {
  const profileFields = [
    { label: "거주 도시", value: city, id: "city" },
    { label: "MBTI", value: mbti, id: "mbti" },
    { label: "직업", value: job, id: "job" },
    { label: "SNS 계정", value: sns, id: "sns" },
    { label: "생일", value: birthday, id: "birthday" },
    { label: "별명", value: nickname, id: "nickname" },
    { label: "혈액형", value: bloodType, id: "bloodType" },
    { label: "국적", value: nationality, id: "nationality" },
  ];
  const [isExpanded, setIsExpanded] = useState(false);
  const [preview, setPreview] = useState<string | StaticImport | null>(image);
  const imageError = useImageLoad(image);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextImg = e.target.files?.[0];
    if (nextImg) {
      onChange("image", nextImg);
    }
  };

  const handleClearClick = useCallback(() => {
    setPreview(null);
    onChange("image", null);
  }, [onChange]);

  useEffect(() => {
    if (!value && value?.includes("http")) {
    } else if (value) {
      const blob = typeof value === "string" ? new Blob([value], { type: "text/plain" }) : value;

      const nextPreview = URL.createObjectURL(blob);
      setPreview(nextPreview);

      return () => {
        URL.revokeObjectURL(nextPreview);
      };
    }
  }, [value]);

  const handleProfileExpand = () => {
    setIsExpanded(prev => !prev);
  };

  const profileHeight = isExpanded ? `h-fit` : `h-[70px] md:h-[85px] xl:h-fit`;

  return (
    <AnimatePresence>
      <section
        className={`mb-5 w-full rounded-[10px] border shadow-[0px_4px_20px_-24px_black] ${editMyPage ? "sm:mt-4 lg:h-[354px] xl:flex-col xl:justify-between" : ""} flex-col justify-start bg-white sm:mb-8 xl:relative xl:ml-auto xl:flex xl:h-[671px] xl:w-[320px] xl:p-10 ${isEditing ? "md:mt-[35px]" : "bottom-[130px]"}`}
      >
        <div className={`flex w-full px-3 py-3 ${editMyPage ? "flex-col" : ""} relative gap-5 xl:flex-col`}>
          {isEditing && isMyPage ? (
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
                    style={{ objectFit: "cover" }}
                  />
                )}
              </label>

              {preview && isMyPage && (
                <button
                  className="absolute text-white sm:right-0 md:right-0 xl:left-[245px] xl:top-[-25px]"
                  onClick={handleClearClick}
                >
                  <span className="rounded-full bg-primary-green-200 px-[6px] py-[2px]">X</span>
                </button>
              )}

              <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />
            </>
          ) : (
            <div className="border-grayscale-200 relative mr-4 size-[71px] rounded-full md:mr-10 md:size-[81px] xl:mx-auto xl:mb-10 xl:size-[200px]">
              {imageError === false && image ? (
                <Image
                  src={image || "@/assets/icons/defaultProfile.svg"}
                  sizes="(max-width: 768px) 62px, (max-width: 1200px) 81px, 200px"
                  fill
                  priority
                  className="ml-3 mt-1 rounded-full object-cover sm:ml-0 xl:ml-0 xl:mt-0"
                  alt="위키 페이지 개인 프로필 이미지"
                />
              ) : (
                imageError === true && <DefaultProfile width="100%" height="100%" />
              )}
            </div>
          )}

          <motion.div transition={{ duration: 0.15 }}>
            <div
              className={`${editMyPage ? "flex flex-col gap-y-2 text-center lg:grid lg:grid-cols-2 lg:items-center xl:flex xl:flex-col xl:gap-[18px]" : "flex flex-col gap-2"} overflow-hidden xl:gap-4 xl:py-2 ${editMyPage ? "h-fit" : profileHeight} `}
            >
              {profileFields.map(field => (
                <ProfileInfos editMyPage={editMyPage} key={field.label} onChange={onChange} {...field} />
              ))}
            </div>
          </motion.div>
        </div>

        {editMyPage || (
          <motion.div
            className="flex cursor-pointer justify-center xl:hidden"
            onClick={handleProfileExpand}
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ExpandIcon width={24} height={24} />
          </motion.div>
        )}
      </section>
    </AnimatePresence>
  );
};

export default memo(UserProfile);
