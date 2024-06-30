/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-alert */

"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import postSignIn from "@/apis/auth/postSignIn";
import { useRouter } from "next/navigation";
import Button from "./Button";
import ErrorText from "./ErrorText";
import Label from "./Label";
import Input from "./Input";

interface ISignInValue {
  email: string;
  password: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

function Form() {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInValue>({ mode: "onChange" });

  const router = useRouter();

  const onSubmit: SubmitHandler<ISignInValue> = async data => {
    try {
      await postSignIn(data);
      router.push("/");
    } catch (error: any) {
      if (error?.message === "비밀번호가 일치하지 않습니다.") {
        setError("password", {
          type: "pw not match",
          message: error?.message,
        });
      } else if (error?.message === "존재하지 않는 이메일입니다.") {
        setError("email", {
          type: "email is void",
          message: error?.message,
        });
      } else {
        alert("로그인에 실패했습니다.");
      }
    }
  };

  return (
    <form className="mb-[40px] mt-[50px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6">
        <div className="grid gap-[10px]">
          <Label htmlFor="email">이메일</Label>
          <Input
            type="text"
            id="email"
            placeholder="이메일을 입력해 주세요"
            {...register("email", {
              required: "이메일 형식으로 작성해 주세요",
              pattern: {
                value: EMAIL_REGEX,
                message: "이메일 형식으로 작성해 주세요",
              },
            })}
            validationCheck={!!errors.email}
          />
          {errors.email?.message && <ErrorText>{errors.email?.message}</ErrorText>}
        </div>
        <div className="grid gap-[10px]">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            id="password"
            placeholder="비밀번호를 입력해 주세요"
            {...register("password", {
              required: "8자 이상 작성해 주세요",
              minLength: {
                value: 8,
                message: "8자 이상 작성해 주세요",
              },
            })}
            validationCheck={!!errors.password}
          />
          {errors.password && <ErrorText>{errors.password?.message}</ErrorText>}
        </div>
      </div>
      <Button type="submit">로그인</Button>
    </form>
  );
}

export default Form;
