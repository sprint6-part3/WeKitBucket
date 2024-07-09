import React, { MouseEventHandler } from "react";
import LinkIcon from "@/assets/icons/link.svg";
import Button from "../Common/Button";

interface TopBoardProps {
  name: string;
  content: string;
  onClick: MouseEventHandler;
  code: string;
}

function TopBoard({ name, content, onClick, code }: TopBoardProps) {
  const copyLinkUrl = `${process.env.MINCEL_URL}/wiki/${code}`;
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
    <div className="grid gap-6">
      <div className="mb-5 flex w-full items-center justify-between">
        <h1 className="text-grayscale-500 text-3_5xl-bold">{name}</h1>
        {content && (
          <Button
            className="center max-w-[400px] rounded-lg bg-primary-green-200 px-5 py-2.5 text-md-semibold2 text-white xl:mr-[385px]"
            onClick={onClick}
          >
            위키 참여하기
          </Button>
        )}
      </div>
      <div className="flex w-fit items-center gap-1 rounded-xl bg-primary-green-100 px-2 py-1">
        <LinkIcon width={16} height={16} />
        <button
          onClick={e => {
            e.preventDefault(); // 버튼 클릭 시 링크 이동을 막음
            handleCopyLink();
          }}
          className="md-regular2 bg-primary-green-100 text-left text-primary-green-200 md:text-sm md:leading-6"
        >
          {truncateText(copyLinkUrl, 34)}
        </button>
      </div>
    </div>
  );
}

export default TopBoard;
