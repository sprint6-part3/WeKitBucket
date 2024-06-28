import PasswordChangeForm from "./components/PasswordChangeForm.tsx";
import CreateWikiForm from "./components/CreateWikiForm.tsx";

function MyPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[400px] items-center justify-center px-5 py-5">
      <div className="flex-1">
        <h2 className="text-center text-2xl font-semibold leading-[1.3] text-primary-gray-500">계정 설정</h2>

        <PasswordChangeForm />
        <CreateWikiForm />
      </div>
    </div>
  );
}
export default MyPage;
