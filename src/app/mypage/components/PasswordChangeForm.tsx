"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import patchUsersMe from "@/apis/user/patchUsersMe.ts";
import Button from "./Button.tsx";
import ErrorText from "./ErrorText.tsx";
import Label from "./Label.tsx";
import Input from "./Input.tsx";

interface PassWordChangeValue {
  passwordConfirmation: string;
  password: string;
  currentPassword: string;
}

function PasswordChangeForm() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<PassWordChangeValue>({ mode: "onChange" });

  const onSubmit: SubmitHandler<PassWordChangeValue> = async data => {
    await patchUsersMe(data);
    console.log(data);
  };

  return (
    <form className="mb-[40px] mt-[50px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <div className="grid gap-[10px]">
          <Label htmlFor="password">비밀번호 변경</Label>
          <Input
            id="password"
            type="password"
            placeholder="기존 비밀번호"
            {...register("currentPassword", {
              required: true,
              minLength: {
                value: 8,
                message: "8자 이상 입력해주세요.",
              },
            })}
            validationCheck={!!errors.currentPassword}
          />
          {errors?.password && <ErrorText>{errors.password?.message}</ErrorText>}
        </div>

        <div className="grid gap-[10px]">
          <Input
            type="password"
            placeholder="새 비밀번호"
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
          <Input
            type="password"
            placeholder="새 비밀번호 확인"
            {...register("passwordConfirmation", {
              required: true,
              validate: value => (value === watch("password") ? true : "비밀번호가 일치하지 않습니다."),
            })}
            validationCheck={!!errors.passwordConfirmation}
          />
          {errors?.passwordConfirmation && <ErrorText>{errors.passwordConfirmation?.message}</ErrorText>}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={!isValid || isSubmitting}>
          변경하기
        </Button>
      </div>
    </form>
  );
}

export default PasswordChangeForm;
