"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import Button from "./Button.tsx";
import ErrorText from "./ErrorText.tsx";
import Label from "./Label.tsx";
import Input from "./Input.tsx";

interface WikiCreateValue {
  wikiQuestion: string;
  wikiAnswer: string;
}

function CreateWikiForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<WikiCreateValue>({ mode: "onChange" });

  const onSubmit: SubmitHandler<WikiCreateValue> = async data => {
    console.log(data);
  };

  return (
    <form className="mb-[40px] mt-[50px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-[16px]">
        <div className="grid gap-[10px]">
          <Label htmlFor="wikiQuestion">위키 생성하기</Label>
          <Input
            id="wikiQuestion"
            type="text"
            placeholder="질문을 입력해주세요"
            {...register("wikiQuestion", {
              required: true,
            })}
            validationCheck={!!errors.wikiQuestion}
          />
          {errors?.wikiQuestion && <ErrorText>{errors.wikiQuestion?.message}</ErrorText>}
        </div>

        <div className="grid gap-[10px]">
          <Input
            type="text"
            placeholder="답을 입력해주세요"
            {...register("wikiAnswer", {
              required: true,
            })}
            validationCheck={!!errors.wikiAnswer}
          />
          {errors?.wikiAnswer && <ErrorText>{errors.wikiAnswer?.message}</ErrorText>}
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
