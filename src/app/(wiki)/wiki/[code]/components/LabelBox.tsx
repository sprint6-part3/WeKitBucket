"use client";

import LinkIcon from "@/assets/icons/link.svg";
import { RequestProfileCode } from "@/apis/profile/getProfilesCode";

export interface userDataProps {
  privateData: RequestProfileCode;
}

function LabelBox({ privateData }: userDataProps) {
  const { code, name } = privateData;
  const copyLinkUrl = `${process.env.VERCEL_URL}/wiki/${code}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(copyLinkUrl);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength)}...`;
    }
    return text;
  };
  return (
    <>
      <h1 className="text-xl-bold-32 text-primary-gray-500">{name}</h1>
      <div className="ml-auto flex gap-1 rounded-xl bg-primary-green-100 px-[10px] py-[5px]">
        <LinkIcon width={16} height={16} />
        <button
          onClick={e => {
            e.preventDefault();
            handleCopyLink();
          }}
          className="bg-primary-green-100 text-left text-sm-regular-14 font-normal text-primary-green-200 md:text-sm md:leading-6"
        >
          {truncateText(copyLinkUrl, 34)}
        </button>
      </div>
    </>
  );
}

export default LabelBox;
