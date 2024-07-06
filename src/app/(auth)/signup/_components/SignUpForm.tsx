"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserInput } from "@/types/auth.type.ts";
import { useToast } from "@/context/ToastContext";
import postSignUp from "@/apis/auth/postSignUp.ts";
import Button from "./Button.tsx";
import ErrorText from "./ErrorText.tsx";
import Input from "./Input.tsx";
import Label from "./Label.tsx";

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

function SignUpForm() {
  const router = useRouter();
  const { popupToast } = useToast();
  const {
    register,
    setError,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<UserInput>({ mode: "onChange" });

  const onSubmit: SubmitHandler<UserInput> = async data => {
    try {
      await postSignUp(data);
      popupToast({ color: "green", pos: "top", message: "회원가입이 완료되었습니다! 환영합니다.", width: 320 });
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        if (error?.message === "이미 사용중인 이메일입니다.") {
          setError("email", {
            type: "email already in use",
            message: error?.message,
          });
        } else {
          popupToast({ color: "red", pos: "top", message: "회원가입에 실패했습니다.", width: 320 });
        }
      }
    }
  };

  return (
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
  );
}

export default SignUpForm;
