import React, { MouseEventHandler } from "react";
import CommonButton from "../Common/CommonButton";
import CopyLinkButton from "../Common/CopyLinkButton";

interface BasicWikiSectionProps {
  name: string;
  content: string;
  onClick: MouseEventHandler;
  url: string;
}

function BasicWikiSection({ name, content, onClick, url }: BasicWikiSectionProps) {
  return (
    <>
      <div className="mb-5 flex w-full items-center justify-between">
        <h1 className="text-3_5xl-bold text-grayscale-500">{name}</h1>
        {content && (
          <CommonButton variant="primary" className="xl:mr-[385px]" onClick={onClick}>
            위키 참여하기
          </CommonButton>
        )}
      </div>
      <div className="mb-5 flex w-full justify-start">
        <CopyLinkButton url={url} />
      </div>
    </>
  );
}

export default BasicWikiSection;
