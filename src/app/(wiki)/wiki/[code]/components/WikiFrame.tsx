/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import CommonModal from "@/components/CommonModal";
import getProfilesCode from "@/apis/profile/getProfilesCode";
import postProfilesCodePing from "@/apis/profile/postProfilesCodePing";
import getUsersMe from "@/apis/user/getUsersMe";
import Button from "./Common/Button";
import { Editor, EditorMarkdown } from "./Profile/Editor";
import UserDataList from "./Profile/UserDataList";
import QuizModal from "./Modal/QuizModal";
import TopBoard from "./Profile/TopBoard";

export type PingFormData = {
  securityAnswer: string;
};

const DEFALUT_FORM_DATA = {
  nationality: "",
  family: "",
  bloodType: "",
  nickname: "",
  birthday: "",
  sns: "",
  job: "",
  mbti: "",
  city: "",
  image: "null",
  content: "",
};

const DEFALUT_USER_DATA = {
  id: 0,
  code: "",
  nationality: "",
  family: "",
  bloodType: "",
  nickname: "",
  birthday: "",
  sns: "",
  job: "",
  mbti: "",
  city: "",
  image: null,
  content: "",
  teamId: "",
  updatedAt: "",
  securityQuestion: "",
  name: "",
};

type UserDataType = {
  id: number;
  code: string;
  image: string | null;
  city: string;
  mbti: string;
  job: string;
  sns: string;
  birthday: string;
  nickname: string;
  bloodType: string;
  family: string;
  nationality: string;
  content: string;
  teamId: string;
  securityQuestion: string;
  updatedAt: string;
  name: string;
};

type FormDataType = {
  nationality: string;
  family: string;
  bloodType: string;
  nickname: string;
  birthday: string;
  sns: string;
  job: string;
  mbti: string;
  city: string;
  image: string | File | null;
  content: string;
};

function WikiFrame({ params }: { params: { code: string } }) {
  const { code } = params;
  const [isEdit, setIsEdit] = useState(false);
  const [isUserData, setIsUserData] = useState<UserDataType>(DEFALUT_USER_DATA);
  const [isEditorData, setIsEditorData] = useState<string | undefined>();
  const [answer, setAnswer] = useState<string | undefined>();
  const [limitTime, setLimitTime] = useState(false);

  const [cancelModal, setCancelModal] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [quizModal, setQuizModal] = useState(false);
  const [timeoutModal, setTimeoutModal] = useState(false);
  const [userData, setUserData] = useState<string>();
  const [formData, setFormData] = useState<FormDataType>(DEFALUT_FORM_DATA);

  // 유저 정보 가져오기
  const getUser = async () => {
    const userDatas = await getUsersMe();
    const loginUserCode: string | undefined = userDatas?.profile?.code;
    setUserData(loginUserCode);
  };

  getUser();

  const myPage = code === userData;

  // 유저 데이터 가져오기 및 가져온 데이터를 각각의 항목에 세팅
  const getUserData = async (code: string) => {
    const responseData = await getProfilesCode(code);
    setIsUserData(responseData);
    setEditorData(responseData.content);
  };

  getUserData(code);

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

  const handleCancelClose = () => {
    setCancelModal(!cancelModal);
  };

  const handleSaveClose = () => {
    setSaveModal(!saveModal);
  };

  const handleQuizClose = () => {
    setQuizModal(!quizModal);
  };

  const handleEdit = () => {
    setQuizModal(true);
  };

  const handleChange = useCallback((id: string, value?: string | File | null) => {
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  const setAnswerValue = (value: string) => {
    setAnswer(value);
  };

  const setEditorData = useCallback((value: string | undefined) => {
    setIsEditorData(value);
  }, []);

  const handleWikiButtonClick = () => {
    setQuizModal(!quizModal);
  };

  const handleEditing = () => {
    setIsEdit(true);
  };

  const handleEditorChange = useCallback((value: string | undefined) => {
    setIsEditorData(value);
    handleChange("content", value);
    if (!value) {
      handleChange("content", null);
    }
  }, []);

  // 5분 리미트 제한..
  const limitEditTime = async () => {
    const returnData = { securityAnswer: answer };
    await postProfilesCodePing(isUserData?.code, returnData);
    setLimitTime(true);

    if (answer) {
      const returnData = new FormData();
      returnData.append("securityAnswer", answer);
      await postProfilesCodePing(code, returnData as unknown as PingFormData);
    }
  };

  const updateUserData = useCallback(() => {
    if (isUserData) {
      const { nationality, family, bloodType, nickname, birthday, sns, job, mbti, city, image, content } = isUserData;

      // Create the new object with only the necessary keys
      const newFormData: FormDataType = {
        nationality,
        family,
        bloodType,
        nickname,
        birthday,
        sns,
        job,
        mbti,
        city,
        image,
        content,
      };
      setFormData(newFormData);
    }
  }, [isUserData]);

  useEffect(() => {
    updateUserData();
  }, [updateUserData]);

  useEffect(() => {
    if (code) {
      getUserData(code);
    }
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
    <div className="grid gap-6">
      {isEdit || (
        <TopBoard name={isUserData.name} content={isUserData.content} onClick={handleEdit} code={isUserData.code} />
      )}

      <UserDataList privateData={isUserData} isEdit={isEdit} myPage={myPage} onChange={handleChange} />

      <div>
        {/* 작성한 데이터가 있는지 or 수정 버튼을 눌렀는지 확인 */}
        {!isUserData.content && !isEdit && (
          <div className="flex h-[184px] w-full flex-col items-center justify-center gap-4 rounded-[10px] bg-gray-100 md:mt-5 md:h-[192px]">
            <h1 className="text-md-regular2 text-primary-gray-400">
              아직 작성된 내용이 없네요
              <br /> 위키에 참여해보세요!
            </h1>
            <Button
              className="center max-w-[400px] rounded-lg bg-primary-green-200 px-5 py-2.5 text-md-semibold2 text-white xl:mr-[385px]"
              onClick={handleWikiButtonClick}
            >
              시작하기
            </Button>
          </div>
        )}

        {isEdit ? (
          <Editor preview="live" value="isEditorData" height={650} onChange={handleEditorChange} />
        ) : (
          <EditorMarkdown source={isUserData.content} />
        )}
      </div>

      {isEdit && (
        <div className="ml-auto flex gap-3 sm:absolute sm:right-[60px] sm:top-[75px] md:absolute md:right-[90px] md:top-[75px] lg:top-[95px] xl:static xl:mt-[30px]">
          <Button onClick={handleCancelClose} className="bg-white">
            취소
          </Button>
          <Button onClick={handleSaveClose} className="bg-green">
            저장
          </Button>
        </div>
      )}

      {/* 수정 버튼 누를떄 나타나는 퀴즈 모달 */}
      <CommonModal active={quizModal} close={handleQuizClose}>
        <QuizModal
          onClose={handleQuizClose}
          code={isUserData.code}
          setEdit={handleEditing}
          securityQuestion={isUserData.securityQuestion}
          setAnswer={setAnswerValue}
        />
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
