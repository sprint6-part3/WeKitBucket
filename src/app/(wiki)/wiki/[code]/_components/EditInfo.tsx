/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { useState } from "react";
import defalutUserImage from "@/assets/icons/defaultProfile.svg";
import Camera from "@/assets/icons/camera.svg";
import postImage from "@/apis/image/postImage";
import { InfoType } from "./TypeList";
import Input from "./Input";

type ProfileProps = {
  userData: InfoType;
  image: string | null;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const labels: Record<keyof InfoType, string> = {
  city: "거주 도시",
  mbti: "MBTI",
  job: "직업",
  sns: "SNS 계정",
  birthday: "생일",
  nickname: "별명",
  bloodType: "혈액형",
  nationality: "국적",
};

export default function ProfileCardEditor({ userData, image, handleChange }: ProfileProps) {
  const [preview, setPreview] = useState<string | null>(image);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const responseData = await postImage(file);
      if (responseData) {
        setPreview(responseData.url);
        handleChange({
          target: { name: "image", value: responseData.url },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  };

  return (
    <section className="flex h-[511px] flex-col items-center gap-5 rounded-xl border-none px-[34px] py-4 shadow-lg shadow-gray-200 md:h-[388px] xl:h-[670px] xl:max-w-[400px] xl:gap-4">
      <label
        htmlFor="image"
        className="relative block size-[62px] cursor-pointer rounded-full object-cover md:size-[72px] xl:my-3 xl:size-[200px]"
      >
        <Image
          className="size-[62px] rounded-full object-cover brightness-75 md:size-[72px] xl:my-3 xl:size-[200px]"
          src={preview || defalutUserImage}
          alt="프로필"
          layout="fill"
        />
        <input id="image" name="image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        <Camera className="absolute left-1/3 top-1/3 size-[17px] md:size-[20px] xl:size-[36px]" alt="카메라 아이콘" />
      </label>

      <div className="flex flex-col gap-4 md:mt-3 md:grid md:grid-cols-2 md:gap-x-10 xl:flex xl:flex-col">
        {Object.entries(userData).map(([key, value]) => (
          <div key={key} className="flex h-[34px] items-center gap-5 md:h-[45px] xl:h-[34px]">
            <div className="text-12 md:text-14 w-[110px] text-gray-400">{labels[key as keyof InfoType]}</div>
            <Input />
          </div>
        ))}
      </div>
    </section>
  );
}
