"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";

import getUsersMe from "@/apis/user/getUsersMe";
import { IUser } from "@/types/user";

// interface AuthContextType {
//   isLoggedIn: boolean;
//   setIsLoggedIn: (loggedIn: boolean) => void;
// }

// 예하님이 만든 것에서 변경 -> isLoggined --> user 객체 
// 컨텍스트 (반환) -> 제공 데이터 
// user 사용자 정보
// getUser 사용자 정보를 가져오는 역할 (getUserMe) -> 사용자 정보를 가져오는 역할


// getUser를 호출했을 때 사용자 로그인 여부가 바뀜 
// getUser의 역할은
// 쿠키가 존재하면 사용자 정보를 불러오고, 쿠키가 없으면 null을 던져서 로그아웃처럼 보이게 만듦
// 로그인 / 로그아웃할 때 넣으면 호출하게 끔 넣으면 문제 없어요. useEffect를 사용 안 하고 만들 수 있음
// 사용자 임의로 쿠키를 삭제할 때의 케이스 문제에요



interface AuthContextType {
  user: IUser | null;
  getUser: () => void;
}

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AuthContext = createContext<AuthContextType>({
  user: null,
  getUser: () => {},
});

function AuthProvider({ children }: { children: ReactNode }) {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  // const value = useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [isLoggedIn]);
  const getUser = async () => {
    const newUser = await getUsersMe();
    if (newUser) {
      setUser(newUser);
    }
  };

  const values = useMemo(() => ({ user, getUser }), [user]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth는 AuthProvider 안에서 쓰세요");
  }
  return context;
}

export { AuthProvider, useAuth };
