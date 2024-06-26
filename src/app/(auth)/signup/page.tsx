"use client";

import React from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserInput } from "@/types/auth";
import Button from "./components/Button.tsx";
import ErrorText from "./components/ErrorText.tsx";
import Input from "./components/Input.tsx";
import Label from "./components/Label.tsx";

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

function SignUp() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<UserInput>({ mode: "onChange" });

  const onSubmit: SubmitHandler<UserInput> = data => {
    console.log(data);
  };

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[400px] items-center justify-center px-5 py-5">
      <div className="flex-1">
        <h2 className="text-center text-2xl font-semibold leading-[1.3] text-primary-gray-500">회원가입</h2>

        <form className="mb-[40px] mt-[50px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            <div className="grid gap-[10px]">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                placeholder="이름을 입력해주세요"
                {...register("name", {
                  required: true,
                  maxLength: {
                    value: 10,
                    message: "열 자 이하로 작성해주세요.",
                  },
                })}
                validationCheck={!!errors.name}
              />
              {errors?.name && <ErrorText>{errors.name?.message}</ErrorText>}
            </div>

            <div className="grid gap-[10px]">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                placeholder="이메일을 입력해주세요"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: EMAIL_REGEX,
                    message: "이메일 형식으로 작성해 주세요.",
                  },
                })}
                validationCheck={!!errors.email}
              />
              {errors?.email && <ErrorText>{errors.email?.message}</ErrorText>}
            </div>

            <div className="grid gap-[10px]">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 8,
                    message: "8자 이상 입력해주세요.",
                  },
                })}
                validationCheck={!!errors.password}
              />
              {errors?.password && <ErrorText>{errors.password?.message}</ErrorText>}
            </div>

            <div className="grid gap-[10px]">
              <Label htmlFor="passwordConfirmation">비밀번호 확인</Label>
              <Input
                id="passwordConfirmation"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                {...register("passwordConfirmation", {
                  required: true,
                  validate: value => (value === watch("password") ? true : "비밀번호가 일치하지 않습니다."),
                })}
                validationCheck={!!errors.passwordConfirmation}
              />
              {errors?.passwordConfirmation && <ErrorText>{errors.passwordConfirmation?.message}</ErrorText>}
            </div>
          </div>

          <Button type="submit" disabled={!isValid || isSubmitting}>
            가입하기
          </Button>
        </form>

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
