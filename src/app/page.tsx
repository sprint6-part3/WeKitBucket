import "@/styles/globals.css";
import Image from "next/image";
import RedirectButton from "@/components/RedirectButton";
import {
  landingKeyboard,
  topSectionItem1,
  landingWrite,
  middleSectionItem1,
  bottomSectionItem1,
  bottomSectionItem2,
  bottomSectionItem3,
  backgroundImage,
} from "@/assets/index";

function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="relative flex h-[1276px] flex-col items-center md:h-[1903px] xl:h-[2205px]">
        <Image
          className="xl: absolute bottom-0 left-0 h-[714px] w-full md:h-[1059px] xl:h-[1412px]"
          src={backgroundImage}
          style={{ zIndex: -1 }}
          alt="backgroundImage"
        />
        <p className="text-lg-light md:text-3xl-light mt-[160px] text-center text-primary-gray-500 md:mt-[180px] xl:mt-[200px]">
          남들이 만드는
        </p>
        <p className="text-3xl-bold md:text-5xl-bold mt-[15px] text-center text-primary-gray-500">나만의 위키</p>
        <RedirectButton text="위키 만들기" variant="primary" />
        <Image
          className="mt-[44px] w-[336px] md:mt-[54px] md:w-[498px]"
          src={topSectionItem1}
          alt="Top Section Item 1"
        />
        <div className="mt-[100px] flex w-full justify-center gap-[10px] md:mt-[153px] md:gap-[20px] xl:gap-[40px]">
          <div className="flex h-[250px] flex-col justify-between md:h-[479px] xl:h-[681px]">
            <div className="flex flex-col gap-[10px]">
              <p className="text-xs-bold-10 md:text-lg-semibold xl:text-xl-bold-32 text-primary-green-200">WRITE</p>
              <p className="xl:2xl-regular-50 text-sm-regular md:text-xl-regular-32 xl:text-2xl-regular-50 text-white">
                친구의 위키, <br />
                직접 작성해 봐요
              </p>
            </div>
            <Image className="w-[133px] md:w-[262px] xl:w-[364px]" src={landingKeyboard} alt="test" />
          </div>
          <Image className="w-[192px] md:w-[365px] xl:w-[520px]" src={landingWrite} alt="test" />
        </div>
      </section>

      <section className="flex h-[374px] w-full flex-col justify-center md:h-[676px] xl:h-[1051px]">
        <div className="mx-auto flex w-[336px] flex-col items-end md:w-[648px] xl:w-[924px]">
          <p className="text-xs-bold-10 md:text-lg-semibold xl:text-xl-bold-32 text-primary-green-200">SHARE</p>
          <p className="item-end xl:2xl-regular-50 text-sm-regular md:text-xl-regular-32 xl:text-2xl-regular-50 mt-[10px] flex flex-col text-primary-gray-500">
            내 위키 만들고
          </p>
          <p className="xl:2xl-regular-50 text-sm-regular md:text-xl-regular-32 xl:text-2xl-regular-50 text-primary-gray-500">
            친구에게 공유해요
          </p>
        </div>
        <Image className="mt-[40px] h-auto w-full md:mt-[80px]" src={middleSectionItem1} alt="test" />
      </section>
      <section className="mx-auto flex h-[512px] w-full flex-col justify-center bg-[#ECF0FA] md:h-[933px] xl:h-[1291px]">
        <div className="mx-auto w-[336px] md:w-[648px] xl:w-[924px]">
          <p className="text-xs-bold-10 md:text-lg-semibold xl:text-xl-bold-32 text-primary-green-200">VIEW</p>
          <p className="item-end xl:2xl-regular-50 text-sm-regular md:text-xl-regular-32 xl:text-2xl-regular-50 mt-[10px] flex flex-col text-primary-gray-500">
            친구들이 달아준
          </p>
          <p className="xl:2xl-regular-50 text-sm-regular md:text-xl-regular-32 xl:text-2xl-regular-50 text-primary-gray-500">
            내용을 확인해 봐요
          </p>
        </div>

        <div className="mx-auto mt-[40px] flex flex-col gap-[10px] md:mt-[80px] md:gap-[22px] xl:gap-[40px]">
          <Image className="w-[335px] md:w-[648px] xl:w-[924px]" src={bottomSectionItem1} alt="test" />
          <div className="flex gap-[10px] md:gap-[22px] xl:gap-[40px]">
            <Image className="w-[102px] md:w-[198px] xl:w-[280px]" src={bottomSectionItem2} alt="test" />
            <Image className="w-[223px] md:w-[428px] xl:w-[604px]" src={bottomSectionItem3} alt="test" />
          </div>
        </div>
      </section>
      <section className="flex h-[329px] flex-col items-center justify-center gap-[40px] bg-primary-gray-500 md:h-[488px] xl:h-[568px]">
        <p className="text-xl-bold-32 md:text-3xl-bold text-white">나만의 위키 만들어보기</p>
        <RedirectButton text="지금 시작하기" variant="secondary" />
      </section>
      <footer className="radius-[15px] flex h-[152px] items-center bg-primary-gray-600 pl-[20px] text-center text-white md:h-[230px] xl:h-[270px]">
        <div className="ml-[48px] flex w-full flex-col items-start xl:w-[1280px]">
          <p className="text-xs-bold md:text-sm-bold mb-[10px]">Copyright ⓒ Wikied. All Rights Reserved</p>
          <p className="text-xs-regular md:text-sm-regular">
            사업자등록번호 000-00-00000 | 통신판매신고 제2020-서울-00000호 | 대표 : 이기주
          </p>
          <p className="text-xs-regular md:text-sm-regular mb-[20px]">서울특별시 중구 청계천로 123, 위키드빌딩</p>
          <div className="flex gap-[15px]">
            <p className="text-xs-regular md:text-sm-regular-14">서비스 이용약관</p>
            <p className="text-xs-regular md:text-sm-regular-14">개인정보 취급방침</p>
            <p className="text-xs-regular md:text-sm-regular-14">전자금융거래 기본약관</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
