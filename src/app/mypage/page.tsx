import type { Metadata } from "next";
import PasswordChangeForm from "./components/PasswordChangeForm.tsx";
import CreateWikiForm from "./components/CreateWikiForm.tsx";

export const metadata: Metadata = {
  title: "WeKitBucket | 마이페이지",
};

function MyPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[400px] items-center justify-center px-5 py-5">
      <div className="flex-1">
        <h2 className="text-center text-2xl font-semibold leading-[1.3] text-primary-gray-500">계정 설정</h2>
        <div className="border-b border-solid border-b-gray-300">
          <PasswordChangeForm />
        </div>
        <CreateWikiForm />
      </div>
    </div>
  );
}
export default MyPage;
