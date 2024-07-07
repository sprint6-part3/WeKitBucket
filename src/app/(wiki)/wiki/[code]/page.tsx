/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-debugger */

"use client";

/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
import React, { useCallback, useEffect, useState, useRef } from "react";
import { DetailProfileResponse, ChangeProfilesFormData, PingFormData } from "@/types/apiType";
import throttle from "@/utils/throttle";
import postImage from "@/apis/image/postImage";
import patchProfilesCode from "@/apis/profile/patchProfilesCode";
import postProfilesCodePing from "@/apis/profile/postProfilesCodePing";
import getProfilesCode from "@/apis/profile/getProfilesCode";
import getUsersMe from "@/apis/user/getUsersMe";
import UserProfile from "./components/Profile/UserProfile";
import CommonButton from "./components/Common/CommonButton";
import QuizModalTemplete from "./components/Profile/QuizModalTemplete";
import useBoolean from "./_hook/useBoolean";
import Modal from "./components/Common/Modal";
import { WIKI_BASE_URL } from "./_constants/url";
import { StyledToastContainer } from "./_style/ToastStyle";
import "react-toastify/dist/ReactToastify.css";
import { Editor, EditorMarkdown } from "./components/Profile/Editor";
import { EDITOR_TEXT } from "./_constants/editorBasicText";
import BasicWikiSection from "./components/Profile/BasicWikiSection";
import { FORM_DATA_INIT } from "./_constants/formDataInitialValue";
import ToastSelect from "./components/Common/ToastSelect";
import useIsMobile from "./_hook/useIsMobile";
import MessageModal from "./components/Common/MessageModal";

const noContentClassName = `text-lg-regular2 text-grayscale-400`;

function Wiki({ params }: { params: { code: string } }) {
  const { code } = params;
  const URL = `${WIKI_BASE_URL}${code}`;
  const [isEditing, setIsEditing] = useState(false);

  const { value, handleOff, handleOn } = useBoolean();
  const { value: confirmModal, handleOff: confirmModalOff, handleOn: confirmModalOn } = useBoolean();
  const { value: cancelModal, handleOff: cancelModalOff, handleOn: cancelModalOn } = useBoolean();
  const [userProfile, setUserProfile] = useState<DetailProfileResponse | undefined>();
  const [userData, setUserData] = useState<string | undefined>();

  const getUserData = async () => {
    const userDatas = await getUsersMe();
    const loginUserCode: string | undefined = userDatas?.profile?.code;
    setUserData(loginUserCode);
  };

  getUserData();

  const isMyPage = code === userData;
  const editMyPage = isEditing && isMyPage;

  const [formData, setFormData] = useState<ChangeProfilesFormData>(FORM_DATA_INIT);

  const [md, setMD] = useState<string | undefined>(undefined);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [renewalTime, setRenewalTime] = useState<boolean>(false);

  const contentClassName = `
  w-full xl:absolute
  md:mt-5 xl:right-[440px] xl:w-[856px]
  ${userProfile && userProfile.content ? "xl:top-[150px]" : "xl:top-[150px]"}
  ${isEditing ? "xl:top-[1px]" : ""}
  ${userProfile && userProfile.content && isEditing ? "xl:top-[40px]" : ""}
`.trim();

  const isMobile = useIsMobile();

  const handleChange = useCallback((id: string, value?: string | File | null) => {
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  const getUserProfile = async (code: string) => {
    const res = await getProfilesCode(code);
    setUserProfile(res);
    setEditorInitialValue(res.content);
  };

  const updateEditTime = async () => {
    setRenewalTime(prev => !prev);
    if (answer) {
      const pingFormData = new FormData();
      pingFormData.append("securityAnswer", answer);
      await postProfilesCodePing(code, pingFormData as unknown as PingFormData);
    }
  };

  const setAnswerValue = (value: string) => {
    setAnswer(value);
  };

  const setEditorInitialValue = useCallback((value: string | null) => {
    setMD(value || EDITOR_TEXT);
  }, []);

  const handleWikiButtonClick = () => {
    handleOn();
  };

  const throttlePing = throttle(updateEditTime, 6 * 10000);

  const handleEditorChange = useCallback((value: string | undefined) => {
    setMD(value);
    throttlePing();
    handleChange("content", value);
    if (!value) {
      handleChange("content", null);
    }
  }, []);

  const setEditingMode = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setRenewalTime(!renewalTime);
    cancelModalOff();
    updateFormData();
  };

  const handleSaveClick = async () => {
    confirmModalOff();
    let updatedFormData = { ...formData };

    if (formData.image instanceof File) {
      const res = await postImage(formData.image);
      if (res?.url) {
        updatedFormData = {
          ...formData,
          image: res.url,
        };
        setFormData(updatedFormData);
      }
    }

    const profileUpdateResponse = await patchProfilesCode(userProfile?.code, updatedFormData as ChangeProfilesFormData);

    setUserProfile(profileUpdateResponse);
    setIsEditing(false);
  };

  const updateFormData = useCallback(() => {
    if (userProfile) {
      const { nationality, family, bloodType, nickname, birthday, sns, job, mbti, city, image, content } = userProfile;

      // Create the new object with only the necessary keys
      const newFormData: ChangeProfilesFormData = {
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
  }, [userProfile]);

  useEffect(() => {
    updateFormData();
  }, [updateFormData]);

  useEffect(() => {
    if (code) {
      getUserProfile(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  useEffect(() => {
    if (isEditing || renewalTime) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(
        () => {
          setIsEditing(false);
          ToastSelect({
            type: "notification",
            message: "수정 가능 시간 5분을 초과하였습니다.",
          });
        },
        5 * 6 * 10000,
      );
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [renewalTime]);

  if (!userProfile) {
    return;
  }

  return (
    <div className="m-auto max-w-[1350px] overflow-auto">
      <title>{`WeKitBucket | ${userProfile?.name}`}</title>
    <div className="px-5 py-5">
      <div className="center m-auto grid max-h-[75dvh] w-full max-w-[1350px] flex-col overflow-auto px-5 pt-5 sm:flex-col sm:pt-10 md:max-h-[1130px] md:px-14 xl:relative xl:max-h-[1080px] xl:py-5">
        <StyledToastContainer limit={1} />
        {isEditing || (
          <BasicWikiSection name={userProfile.name} content={userProfile.content} onClick={handleOn} url={URL} />
        )}

        <UserProfile
          {...userProfile}
          isEditing={isEditing}
          isMyPage={isMyPage}
          editMyPage={editMyPage}
          onChange={handleChange}
          value={formData.image}
        />

        <div className={contentClassName}>
          {!userProfile.content && !isEditing && (
            <div className="flex h-[184px] w-full flex-col items-center justify-center rounded-[10px] bg-gray-100 md:mt-5 md:h-[192px]">
              <p className={noContentClassName}>아직 작성된 내용이 없네요.</p>
              <p className={noContentClassName}>위키에 참여해보세요!</p>
              <CommonButton variant="primary" className="mt-4" onClick={handleWikiButtonClick}>
                시작하기
              </CommonButton>
            </div>
          )}
          {isEditing ? (
            <Editor
              preview="live"
              value={md}
              onChange={handleEditorChange}
              height={650}
              hideToolbar={isMobile && true}
              autoFocus
            />
          ) : (
            <EditorMarkdown source={userProfile.content} />
          )}
        </div>

        {isEditing && (
          <div className="ml-auto mt-2 flex gap-3 sm:absolute sm:right-[60px] sm:top-[75px] md:absolute md:right-[90px] md:top-[75px] lg:top-[95px] xl:mt-[640px]">
            <CommonButton variant="secondary" onClick={cancelModalOn} className="bg-white">
              취소
            </CommonButton>
            <CommonButton variant="primary" onClick={confirmModalOn}>
              저장
            </CommonButton>
          </div>
        )}

        <Modal isOpen={value} onClose={handleOff}>
          <QuizModalTemplete
            question={userProfile.securityQuestion}
            onClose={handleOff}
            setEditingMode={setEditingMode}
            code={userProfile.code}
            setAnswer={setAnswerValue}
          />
        </Modal>
        <MessageModal
          title="저장"
          message="저장하나요?"
          isOpen={confirmModal}
          onCancel={confirmModalOff}
          onConfirm={handleSaveClick}
        />
        <MessageModal
          title="취소"
          message="취소하나요?"
          isOpen={cancelModal}
          onCancel={cancelModalOff}
          onConfirm={handleCancelClick}
        />
      </div>
    </div>
  );
}

export default Wiki;
