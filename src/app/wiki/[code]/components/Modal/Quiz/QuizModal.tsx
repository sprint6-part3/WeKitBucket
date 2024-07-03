import Lock from "@/assets/icons/lock.svg";
import { useForm } from "react-hook-form";
import Input from "../Input";
import Label from "../Label";
import ErrorText from "../ErrorText";
import Button from "../Button";

interface QuizInput {
  securityQuestion: string;
  securityAnswer: string;
}

function QuizModal() {
  const {
    register,
    formState: { isSubmitting, errors, isValid },
  } = useForm<QuizInput>({ mode: "onChange" });

  return (
    <div>
      <div className="bg-primary-gray-50 h-[42px] w-[42px]">
        <Lock width="100%" height="100%" />
      </div>
      <div>
        <form>
          <div className="grid gap-6">
            <div className="grid gap-[10px]">
              <Label htmlFor="securityQuestion">특별히 싫어하는 음식은?</Label>
              <Input
                id="securityQuestion"
                placeholder="답안을 입력해 주세요"
                {...register("securityQuestion", {
                  required: true,
                })}
                validationCheck={!!errors.securityQuestion}
              />
              {errors?.securityQuestion && <ErrorText>{errors.securityQuestion?.message}</ErrorText>}
            </div>
          </div>

          <Button type="submit" disabled={!isValid || isSubmitting}>
            가입하기
          </Button>
        </form>
      </div>
    </div>
  );
}

export default QuizModal;
