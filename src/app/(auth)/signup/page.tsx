import React from "react";
import Link from "next/link";
import SignUpForm from "./components/SignUpForm.tsx";

function SignUp() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<UserInput>({ mode: "onChange" });

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[400px] items-center justify-center px-5 py-5">
      <div className="flex-1">
        <h2 className="text-center text-2xl font-semibold leading-[1.3] text-primary-gray-500">회원가입</h2>

        <SignUpForm />

        <div className="mt-[40px] flex items-center justify-center gap-[10px]">
          <p className="text-center text-sm leading-[1.7] text-primary-gray-600">이미 회원이신가요?</p>
          <Link href="./login" className="text-center text-sm leading-[1.7] text-primary-green-200">
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
