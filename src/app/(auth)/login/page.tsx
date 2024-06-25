// "use client";

// import React from "react";
// import Link from "next/link";
// import { SubmitHandler, useForm } from "react-hook-form";
// import Input from "./components/Input.tsx";
// import Label from "./components/Label.tsx";
// import Button from "./components/Button.tsx";
// import ErrorText from "./components/ErrorText.tsx";
// import axios from "./axios.ts";
// import { useRouter } from "next/navigation";

// interface ISignInValue {
//   email: string;
//   password: string;
// }

// function Login() {
//   const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ISignInValue>({ mode: "onChange" });

//   const onSubmit: SubmitHandler<ISignInValue> = async data => {
//     console.log(data);

//     try {
//       await axios.post("/auth/signIn", data, { withCredentials: true });
//       router.push("/");
//     } catch (error) {
//       console.error("failed to fetch signIn: ", error);
//     }
//   };

//   return (
//     <div className="mx-auto flex h-dvh w-full max-w-[440px] items-center justify-center px-5">
//       <div className="flex-1">
//         <h2 className="text-center text-2xl font-semibold leading-[1.3] text-primary-gray-500">로그인</h2>

//         <form className="mb-[40px] mt-[50px]" onSubmit={handleSubmit(onSubmit)}>
//           <div className="grid gap-6">
//             <div className="grid gap-[10px]">
//               <Label htmlFor="email">이메일</Label>
//               <Input
//                 type="text"
//                 id="email"
//                 placeholder="이메일을 입력해 주세요"
//                 {...register("email", {
//                   required: "이메일 형식으로 작성해 주세요",
//                   pattern: {
//                     value: EMAIL_REGEX,
//                     message: "이메일 형식으로 작성해 주세요",
//                   },
//                 })}
//                 validationCheck={!!errors.email}
//               />
//               {errors.email?.message && <ErrorText>{errors.email?.message}</ErrorText>}
//             </div>
//             <div className="grid gap-[10px]">
//               <Label htmlFor="password">비밀번호</Label>
//               <Input
//                 type="password"
//                 id="password"
//                 placeholder="비밀번호를 입력해 주세요"
//                 {...register("password", {
//                   required: "8자 이상 작성해 주세요",
//                   minLength: {
//                     value: 8,
//                     message: "8자 이상 작성해 주세요",
//                   },
//                 })}
//                 validationCheck={!!errors.password}
//               />
//               {errors.password && <ErrorText>{errors.password?.message}</ErrorText>}
//             </div>
//           </div>
//           <Button type="submit">로그인</Button>
//         </form>

//         <div className="mt-[40px] flex items-center justify-center gap-[10px]">
//           <Link href="/signup" className="text-center text-sm leading-[1.7] text-primary-green-200">
//             회원가입
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
