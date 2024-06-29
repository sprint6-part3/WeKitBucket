"use client";

import postRefreshToken from "@/apis/auth/postRefreshToken";
import postSignIn from "@/apis/auth/postSignIn";
import { UserInput } from "@/types/auth";

import React from "react";

function Button() {
  const user: UserInput = {
    email: "nape1203@gmail.com",
    password: "12341234",
  };

  const handleClick = async () => {
    await postSignIn(user);
    await postRefreshToken();
  };
  return <button onClick={handleClick}> !CLICK! </button>;
}

export default Button;
