"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext.tsx";
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

  const { popupToast } = useToast();
  const router = useRouter();

  const onSubmit: SubmitHandler<PassWordChangeValue> = async data => {
    try {
      await patchUsersMe(data);
      popupToast({ color: "green", pos: "top", message: "비밀번호가 정상적으로 변경되었습니다.", width: 860 });
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      popupToast({ color: "red", pos: "top", message: "비밀번호 변경에 실패하였습니다.", width: 860 });
    }
  };

  return (
    <form className="mb-[40px] mt-[50px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <div className="grid gap-[10px]">
          <Label htmlFor="currentPassword">비밀번호 변경</Label>
          <Input
            id="currentPassword"
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
          {errors?.currentPassword && <ErrorText>{errors.currentPassword?.message}</ErrorText>}
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
              minLength: {
                value: 8,
                message: "8자 이상 입력해주세요.",
              },
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
