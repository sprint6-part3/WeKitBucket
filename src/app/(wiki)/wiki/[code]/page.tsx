/* eslint-disable func-names */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect, useState } from "react";
import LinkImage from "@/assets/icons/link.svg";
import getProfilesCode from "@/apis/profile/getProfilesCode";
// import getProfilesCodePing from "@/apis/profile/getProfilesCodePing";
import patchProfilesCode from "@/apis/profile/patchProfilesCode";
import getUsersMe from "@/apis/user/getUsersMe";
import CommonModal from "@/components/CommonModal";
import { useToast } from "@/context/ToastContext";
import WikitBucketEditor from "./_components/WikitBucketEditor";
import QuizModal from "./_components/QuizModal";
import { WIKI_FULL_DATA, INFO_DATA } from "./_components/defalutValue";
import { InfoType } from "./_components/TypeList";
import Button from "./_components/Button";
import EditInfo from "./_components/EditInfo";
import Info from "./_components/Info";

function Wiki({ params }: { params: { code: string } }) {
  const { code } = params;
  const { popupToast } = useToast();

  const [wikiData, setWikiData] = useState(WIKI_FULL_DATA);
  const [userData, setUserData] = useState<InfoType>(INFO_DATA);
  const [answer, setAnswer] = useState<string>("");
  const [formData, setFormData] = useState({});
  const [opened, closeModal] = useState(false);
  const [myWiki, setMyWiKi] = useState(false);
  const [isToggleActive, setIsToggleActive] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [url, setUrl] = useState<string>("");

  const handleActiveModal = () => {
    closeModal(!opened);
  };

  const handleActiveEdit = () => {
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    const getWikiDataByCode = async () => {
      try {
        const users = await getUsersMe();

        const myWikiPage = code === users.profile.code;
        setMyWiKi(myWikiPage);

        const selectPageCode = code;
        const returnData = await getProfilesCode(selectPageCode);
        setWikiData(returnData);

        const { city, mbti, job, sns, birthday, nickname, bloodType, nationality } = returnData;
        const infoTemplateData: InfoType = {
          city,
          mbti,
          job,
          sns,
          birthday,
          nickname,
          bloodType,
          nationality,
        };
        setUserData(infoTemplateData);

        const pageUrl: string = window.location.href;
        setUrl(pageUrl);

        const FormData = {
          securityAnswer: answer,
          securityQuestion: returnData.securityQuestion,
          nationality: returnData.nationality,
          family: returnData.family,
          bloodType: returnData.bloodType,
          nickname: returnData.nickname,
          birthday: returnData.birthday,
          sns: returnData.sns,
          job: returnData.job,
          mbti: returnData.mbti,
          city: returnData.city,
          image: returnData.image,
          content: returnData.content,
        };
        setFormData(FormData);
      } catch (e) {
        console.error("failed to fetch", e);
      }
    };
    getWikiDataByCode();
  }, [code]);

  const toggleActive = () => {
    setIsToggleActive(!isToggleActive);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleChangeContent = (value: string) => {
  //   setFormData({ ...formData, content: value });
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await patchProfilesCode(code, formData);
    setIsEdit(false);
    setAnswer("");
  };

  const handleUrl = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(url);
    popupToast({ color: "green", pos: "top", message: "위키 링크가 복사되었습니다.", width: 320 });
  };

  // 5분 타임 아웃시 자동 에디터 종료...
  const handleTimeout = () => {
    const TIME_OUT_LIMIT = 5 * 60 * 1000;

    setTimeout(function () {
      popupToast({
        color: "red",
        pos: "top",
        message: "5분 이상 글을 쓰지 않아 수정 권한이 만료되었어요!!",
        width: 500,
      });
      setIsEdit(false);
    }, TIME_OUT_LIMIT);
  };

  return (
    <>
      <main className="mx-auto h-full max-w-[744px] md:max-w-[1200px] xl:max-w-[1520px]">
        <section className="mx-5 mt-8 flex flex-col justify-between gap-3 md:mx-20 md:gap-6">
          <div className="flex flex-col justify-between gap-6 md:gap-8 xl:mr-[450px] xl:max-w-[860px]">
            <div className="px-auto flex h-[43px] justify-between">
              <span className="text-[32px] font-semibold leading-none text-gray-800 md:text-[48px]">
                {wikiData.name}
              </span>
              {wikiData?.content.length === 0 && <Button onClick={handleActiveModal}>위키 참여하기</Button>}
            </div>

            <button
              className="flex h-[34px] max-w-[240px] items-center gap-1 rounded-[10px] bg-green-100 px-[10px] text-green-500 hover:brightness-95"
              onClick={handleUrl}
            >
              <LinkImage width={35} height={35} alt="링크" />
              <div className="truncate text-sm font-normal">{url}</div>
            </button>
          </div>

          {isEdit ? (
            <form
              className="m-3 flex min-h-[1100px] flex-col gap-[15px] md:mx-[60px] md:mt-[47px] md:gap-[10px] xl:mx-auto xl:max-w-[1700px]"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-[15px] md:gap-[10px] xl:fixed xl:left-[70%] xl:top-[120px] xl:flex-col-reverse">
                <div className="flex h-10 items-center justify-between md:mb-[10px]">
                  <span className="text-32 font-semibold leading-none text-gray-800 md:text-[48px] xl:invisible">
                    {wikiData.name}
                  </span>
                  <div className="flex gap-[10px]">
                    <Button onClick={handleActiveEdit}>취소</Button>
                    <Button type="submit">저장</Button>
                  </div>
                </div>

                {myWiki ? (
                  <EditInfo userData={userData} image={wikiData.image} handleChange={handleChange} />
                ) : (
                  <Info
                    userData={userData}
                    image={wikiData.image}
                    toggleActive={toggleActive}
                    isToggleActive={isToggleActive}
                  />
                )}
              </div>
              <div className="flex flex-col gap-4 md:mt-[30px] xl:ml-[100px] xl:mr-[530px] xl:mt-0 xl:min-w-[700px] xl:max-w-[1120px]">
                <WikitBucketEditor
                // initialData={wikiData.content}
                // handleChangeContent={handleChangeContent}
                // title={wikiData.name}
                />
              </div>
            </form>
          ) : (
            <>
              <div className="xl:fixed xl:left-[70%] xl:top-[120px]">
                <Info
                  userData={userData}
                  image={wikiData.image}
                  toggleActive={toggleActive}
                  isToggleActive={isToggleActive}
                />
              </div>
              {wikiData?.content.length > 0 && (
                <div className="mt-8 flex h-auto flex-col items-center justify-center rounded-[10px] bg-gray-100 p-12 xl:mr-[400px] xl:max-w-[860px]">
                  <span className="text-16 text-gray-400">작성된 내용이 없어요!!</span>
                  <span className="text-16 text-gray-400">위키 한번 해보실까요?</span>
                  <Button className="mt-5" onClick={handleActiveModal}>
                    시작하기
                  </Button>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <CommonModal active={opened} close={handleActiveModal}>
        <QuizModal
          code={code}
          securityQuestion={wikiData.securityQuestion}
          handleActiveEdit={handleActiveEdit}
          handleActiveModal={handleActiveModal}
          handleTimeout={handleTimeout}
        />
      </CommonModal>
    </>
  );
}

export default Wiki;
