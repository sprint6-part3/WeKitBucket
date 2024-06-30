"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import postProfiles from "@/apis/profile/postProfiles.ts";
import Button from "./Button.tsx";
import ErrorText from "./ErrorText.tsx";
import Label from "./Label.tsx";
import Input from "./Input.tsx";

interface WikiCreateValue {
  securityAnswer: string;
  securityQuestion: string;
}

function CreateWikiForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<WikiCreateValue>({ mode: "onChange" });

  const onSubmit: SubmitHandler<WikiCreateValue> = async data => {
    await postProfiles(data);
    console.log(data);
  };

  return (
    <form className="mb-[40px] mt-[50px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <div className="grid gap-[10px]">
          <Label htmlFor="securityQuestion">위키 생성하기</Label>
          <Input
            id="securityQuestion"
            type="text"
            placeholder="질문을 입력해주세요"
            {...register("securityQuestion", {
              required: "질문을 입력해주세요",
            })}
            validationCheck={!!errors.securityQuestion}
          />
          {errors?.securityQuestion && <ErrorText>{errors.securityQuestion?.message}</ErrorText>}
        </div>

        <div className="grid gap-[10px]">
          <Input
            type="text"
            placeholder="답을 입력해주세요"
            {...register("securityAnswer", {
              required: "답을 입력해주세요",
            })}
            validationCheck={!!errors.securityAnswer}
          />
          {errors?.securityAnswer && <ErrorText>{errors.securityAnswer?.message}</ErrorText>}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={!isValid || isSubmitting}>
          생성하기
        </Button>
      </div>
    </form>
  );
}

export default CreateWikiForm;
