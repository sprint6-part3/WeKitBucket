import React from "react";
import getProfilesCode from "@/apis/profile/getProfilesCode";
import LabelBox from "./components/LabelBox";
import UserDataList from "./components/UserDataList";
import ModalBox from "./components/Modal/ModalBox";

async function Wiki({ params }: { params: { code: string } }) {
  const { code } = params;
  const requestData = await getProfilesCode(code);

  return (
    <div className="mx-auto flex min-h-dvh w-full justify-center p-5">
      <div className="flex-1">
        <div className="grid gap-10">
          <div className="grid justify-start gap-4">
            <LabelBox privateData={requestData} />
          </div>
          <div className="rounded-[10px] shadow-lg">
            <UserDataList privateData={requestData} />
          </div>
          <div className="px-23 box-border w-full rounded-[10px] border border-primary-gray-100 bg-primary-gray-100 py-10 text-center">
            <h1 className="text-sm leading-6 text-primary-gray-400">
              아직 작성된 내용이 없네요
              <br /> 위키에 참여해보세요!
            </h1>
            <ModalBox privateData={requestData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wiki;
