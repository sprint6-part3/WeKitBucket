import PasswordChangeForm from "./_components/PasswordChangeForm.tsx";

function ChangePassWord() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[400px] items-center justify-center px-5 py-5">
      <div className="flex-1">
        <h2 className="text-center text-2xl font-semibold leading-[1.3] text-primary-gray-500">패스워드 변경</h2>
        <PasswordChangeForm />
      </div>
    </div>
  );
}
export default ChangePassWord;
