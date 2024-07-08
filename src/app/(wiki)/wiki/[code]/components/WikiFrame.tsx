/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import CommonModal from "@/components/CommonModal";
import getProfilesCode, { RequestProfileCode } from "@/apis/profile/getProfilesCode";
import postProfilesCodePing from "@/apis/profile/postProfilesCodePing";
import Button from "./Common/Button";
import { Editor, EditorMarkdown } from "./Profile/Editor";
import UserDataList from "./Profile/UserDataList";
import QuizModal from "./Modal/QuizModal";

const DEFALUT_USER_DATA = {
  id: 0,
  code: "",
  image: null,
  city: "",
  mbti: "",
  job: "",
  sns: "",
  birthday: "",
  nickname: "",
  bloodType: "",
  family: "",
  nationality: "",
  content: "",
  teamId: "",
  securityQuestion: "",
  updatedAt: "",
  name: "",
};

function WikiFrame({ params }: { params: { code: string } }) {
  const { code } = params;
  const [isEdit, setIsEdit] = useState(false);
  const [isUserData, setIsUserData] = useState<RequestProfileCode>(DEFALUT_USER_DATA);
  const [isEditorData, setIsEditorData] = useState<string>();
  const [answer, setAnswer] = useState<string | undefined>();
  const [limitTime, setLimitTime] = useState(false);

  const [cancelModal, setCancelModal] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [quizModal, setQuizModal] = useState(false);
  const [timeoutModal, setTimeoutModal] = useState(false);

  // 유저 데이터 가져오기 및 가져온 데이터를 각각의 항목에 세팅
  const getUserData = async (code: string) => {
    const responseData = await getProfilesCode(code);
    setIsUserData(responseData);
    setEditorData(responseData.content);
  };

  // 취소 버튼시 수정 화면 비 로딩 처리
  const handleCancel = () => {
    setIsEdit(!isEdit);
    setCancelModal(!cancelModal);
  };

  // 저장 버튼시 수정 화면 비 로딩 처리
  const handleSave = () => {
    setIsEdit(!isEdit);
    setSaveModal(!saveModal);
  };

  // 타임 아웃시 수정 화면 비 로딩 처리
  const handleTimeout = () => {
    setIsEdit(!isEdit);
    setTimeoutModal(!timeoutModal);
  };

  // 저장 버튼시 수정 화면 비 로딩 처리
  const handleQuiz = () => {
    setQuizModal(false);
  };

  const handleCancelClose = () => {
    setCancelModal(!cancelModal);
  };

  const handleSaveClose = () => {
    setSaveModal(!saveModal);
  };

  const handleQuizClose = () => {
    setQuizModal(!saveModal);
  };

  // 너무 잦은 호출로 인해 콜백함수로 부담 줄이기..
  const setEditorData = useCallback((value: string) => {
    setIsEditorData(value);
  }, []);

  // 5분 리미트 제한..
  const limitEditTime = async () => {
    const returnData = { securityAnswer: answer };
    await postProfilesCodePing(isUserData?.code, returnData);
    setLimitTime(true);
  };

  useEffect(() => {
    if (code) {
      getUserData(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  useEffect(() => {
    if (isEdit || limitTime) {
      const timer = useRef<NodeJS.Timeout>();
      const [time, setTime] = useState(5);

      timer.current = setTimeout(() => {
        setTime(0);
        setIsEdit(false);
      }, 5 * 60000);

      if (time === 0) clearTimeout(timer.current);
    }
  }, [limitTime]);

  return (
    <div className="flex-1">
      <UserDataList privateData={isUserData} />

      <div>
        {/* 작성한 데이터가 있는지 or 수정 버튼을 눌렀는지 확인 */}
        {!isUserData.content && !isEdit && (
          <div className="flex h-[184px] w-full flex-col items-center justify-center rounded-[10px] bg-gray-100 md:mt-5 md:h-[192px]">
            <h1 className="text-md-regular2 text-primary-gray-400">
              아직 작성된 내용이 없네요
              <br /> 위키에 참여해보세요!
            </h1>
            <Button className="mb-4" onClick={handleQuiz}>
              시작하기
            </Button>
          </div>
        )}

        {isEdit ? (
          <Editor preview="live" value={isEditorData} onChange={handleEditorChange} />
        ) : (
          <EditorMarkdown source={isUserData.content} />
        )}
      </div>

      {isEdit && (
        <div className="ml-auto flex gap-3 sm:absolute sm:right-[60px] sm:top-[75px] md:absolute md:right-[90px] md:top-[75px] lg:top-[95px] xl:static xl:mt-[30px]">
          <Button onClick={handleCancel} className="bg-white">
            취소
          </Button>
          <Button onClick={handleSave} className="bg-green">
            저장
          </Button>
        </div>
      )}

      {/* 수정 버튼 누를떄 나타나는 퀴즈 모달 */}
      <CommonModal active={quizModal} close={handleQuizClose}>
        <QuizModal code={isUserData.code} securityQuestion={isUserData.securityQuestion} />
      </CommonModal>

      {/* 저장 2차 검증 */}
      <CommonModal active={saveModal} close={handleSaveClose}>
        <div className="grid gap-5">
          <h3 className="text-center text-lg font-semibold leading-[1.4] text-primary-gray-500">저장 하시겠습니까?</h3>

          <Button
            type="button"
            onClick={handleSave}
            className={`ml-auto h-10 w-[90px] rounded-[10px] ${"cursor-pointer bg-primary-green-200 hover:bg-primary-green-300"} text-sm font-semibold leading-[1.7] text-white`}
          >
            확인
          </Button>
        </div>
      </CommonModal>

      {/* 취소 2차 검증 */}
      <CommonModal active={cancelModal} close={handleCancelClose}>
        <div className="grid gap-5">
          <h3 className="text-center text-lg font-semibold leading-[1.4] text-primary-gray-500">취소하나요?</h3>

          <Button
            type="button"
            onClick={handleCancel}
            className={`ml-auto h-10 w-[90px] rounded-[10px] ${"cursor-pointer bg-primary-green-200 hover:bg-primary-green-300"} text-sm font-semibold leading-[1.7] text-white`}
          >
            확인
          </Button>
        </div>
      </CommonModal>

      {/* 수정 시간 초과 모달 */}
      <CommonModal active={timeoutModal} close={handleTimeout}>
        <div className="grid gap-5">
          <h3 className="text-center text-lg font-semibold leading-[1.4] text-primary-gray-500">취소하나요?</h3>

          <Button
            type="button"
            onClick={handleTimeout}
            className={`ml-auto h-10 w-[90px] rounded-[10px] ${"cursor-pointer bg-primary-green-200 hover:bg-primary-green-300"} text-sm font-semibold leading-[1.7] text-white`}
          >
            확인
          </Button>
        </div>
      </CommonModal>
    </div>
  );
}

export default WikiFrame;
