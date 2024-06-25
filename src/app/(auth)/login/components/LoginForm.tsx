"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserInput } from "@/types/auth";
import Button from "./Button";
import ErrorText from "./ErrorText";
import Input from "./Input";
import Label from "./Label";

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

interface LoginFormProps {
  onSubmit: SubmitHandler<UserInput>;
}

function LoginForm({ onSubmit }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInput>({ mode: "onChange" });

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

export default LoginForm;
