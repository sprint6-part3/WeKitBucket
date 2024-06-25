// import React from "react";
// import Link from "next/link";
// import { cookies } from "next/headers";
// import { UserInput } from "@/types/auth.js";
// import postSignIn from "@/apis/Auth/postSignIn.ts";
// import LoginForm from "./components/LoginForm.tsx";

// function Login() {
//   const allCookies = cookies();
//   console.log(allCookies);

//   const onSubmit = async (data: any) => {
//     console.log(data);

//     try {
//       const res = await postSignIn(data);
//       console.log(res);
//     } catch (error) {
//       console.error("failed to fetch signIn: ", error);
//     }
//   };

//   return (
//     <div className="mx-auto flex h-dvh w-full max-w-[440px] items-center justify-center px-5">
//       <div className="flex-1">
//         <h2 className="text-center text-2xl font-semibold leading-[1.3] text-primary-gray-500">로그인</h2>
//         <LoginForm onSubmit={onSubmit} />
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
