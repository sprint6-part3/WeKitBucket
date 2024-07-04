"use client";

import CommonModal from "@/_components/CommonModal";
import { useState } from "react";
import { RequestProfileCode } from "@/apis/profile/getProfilesCode";
import QuizModal from "./Quiz/QuizModal";

export interface userDataProps {
  privateData: RequestProfileCode;
}

function ModalBox({ privateData }: userDataProps) {
  const [active, setActive] = useState(false);
  const { code, securityQuestion } = privateData;

  const handleActive = () => {
    setActive(!active);
  };
  return (
    <div>
      <button
        className="mt-3 rounded-[10px] bg-primary-green-200 px-[20px] py-[11px] text-sm font-semibold leading-[1.7] text-white"
        onClick={handleActive}
      >
        시작하기
      </button>
      <CommonModal active={active} close={handleActive}>
        <QuizModal code={code} securityQuestion={securityQuestion} />
      </CommonModal>
    </div>
  );
}

export default ModalBox;
