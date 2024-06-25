import React, { useRef } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface IForm {
  name: string;
  email: string;
  pwd: string;
  pwd_confirm: string;
}

function SignUp() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<IForm>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      pwd: "",
    },
  });

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch("pwd");

  return (
    <form>
      <div>회원가입</div>
      <div>
        <label htmlFor="name">이름</label>
        <input
          id="name"
          placeholder="이름을 입력해주세요"
          {...register("pwd", {
            maxLength: {
              value: 10,
              message: "열 자 이하로 작성해주세요.",
            },
          })}
        />
      </div>
      {errors?.email ? <p className="error">{errors.email?.message}</p> : null}
      <div>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          placeholder="이메일을 입력해주세요"
          {...register("email", {
            pattern: {
              value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: "이메일 형식으로 작성해 주세요.",
            },
          })}
        />
        {errors?.email ? <p className="error">{errors.email?.message}</p> : null}
      </div>
      <div>
        <label htmlFor="pwd">비밀번호</label>
        <input
          id="pwd"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          {...register("pwd", {
            minLength: {
              value: 8,
              message: "8자 이상 입력해주세요.",
            },
          })}
        />
        {errors?.pwd ? <p className="error">{errors.pwd?.message}</p> : null}
      </div>
      <div>
        <label htmlFor="pwd_confirm">비밀번호 확인</label>
        <input
          id="pwd_confirm"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          {...register("pwd_confirm", {
            validate: value => (value === watch("pwd") ? true : "비밀번호가 일치하지 않습니다."),
          })}
        />
        {errors?.pwd_confirm ? <p className="error">{errors.pwd_confirm?.message}</p> : null}
      </div>
      <button type="submit">가입하기</button>
      <p>
        이미 회원이신가요?<Link href="./login">로그인하기</Link>
      </p>
    </form>
  );
}

export default SignUp;
