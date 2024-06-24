// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Input from "./components/input.tsx";
// import Label from "./components/label.tsx";
// import Button from "./components/button.tsx";
// import ErrorText from "./components/errorText.tsx";

// function Login() {
//   const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

//   const [loginValues, setLoginValues] = useState({
//     email: "",
//     password: "",
//   });
//   const [validationCheck, setValidationCheck] = useState({
//     email: false,
//     password: false,
//   });

//   const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = e => {
//     const { id, value } = e.target;

//     setLoginValues(prev => ({
//       ...prev,
//       [id]: `${value}`,
//     }));
//   };

//   const emailValidationCheck = () => {
//     setValidationCheck(prev => ({
//       ...prev,
//       email: loginValues.email !== "" && !EMAIL_REGEX.test(loginValues.email),
//     }));
//   };

//   const passwordValidationCheck = () => {
//     setValidationCheck(prev => ({
//       ...prev,
//       password: loginValues.password !== "" && loginValues.password.length < 8,
//     }));
//   };

//   const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = e => {
//     e.preventDefault();
//   };

//   useEffect(() => {
//     emailValidationCheck();
//     passwordValidationCheck();
//   }, [loginValues]);

//   return (
//     <div className="mx-auto mb-[204px] mt-[143px] box-content w-full max-w-[400px] px-5">
//       <h2 className="text-center text-2xl font-semibold leading-[1.3] text-primary-gray-500">로그인</h2>

//       <form className="mb-[40px] mt-[50px]" onSubmit={handleSubmitForm}>
//         <div className="grid gap-6">
//           <div className="grid gap-[10px]">
//             <Label htmlFor="email">이메일</Label>
//             <Input
//               type="text"
//               value={loginValues.email}
//               id="email"
//               onChange={handleChangeInput}
//               placeholder="이메일을 입력해 주세요"
//               validationCheck={validationCheck.email}
//             />
//             {validationCheck.email && <ErrorText>이메일 형식으로 작성해 주세요.</ErrorText>}
//           </div>
//           <div className="grid gap-[10px]">
//             <Label htmlFor="password">비밀번호</Label>
//             <Input
//               type="password"
//               value={loginValues.password}
//               id="password"
//               onChange={handleChangeInput}
//               placeholder="비밀번호를 입력해 주세요"
//               validationCheck={validationCheck.password}
//             />
//             {validationCheck.password && <ErrorText>8자 이상 작성해 주세요.</ErrorText>}
//           </div>
//         </div>
//         <Button type="submit">로그인</Button>
//       </form>

//       <div className="mt-[40px] flex items-center justify-center gap-[10px]">
//         <Link href="/signup" className="text-center text-sm leading-[1.7] text-primary-green-200">
//           회원가입
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Login;
