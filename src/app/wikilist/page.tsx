"use server";

import getProfiles from "@/apis/profile/getProfiles";
import Input from "./_components/Input";
import ProfileList from "./_components/ProfileList";
import Pagination from "./_components/Pagination";

async function WikiList({ searchParams }: { searchParams: { keyword: string } }) {
  const { keyword } = searchParams;

  const { list, totalCount } = keyword ? await getProfiles({ name: keyword }) : await getProfiles();

  return (
    <div className="mx-auto max-w-[900px] px-5">
      <Input />
      <p className="mb-10 mt-4 text-sm-regular-14 font-medium text-primary-gray-400 md:mb-24 md:text-sm-regular xl:mb-14">
        &quot;동욱&quot;님을 총 7명 찾았습니다.
      </p>
      <ProfileList list={list} />
      <Pagination totalCount={totalCount} />
    </div>
  );
}

export default WikiList;
