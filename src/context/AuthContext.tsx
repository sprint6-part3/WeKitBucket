"use client";

import { createContext, useContext, useState, ReactNode, useMemo, useEffect } from "react";
import getUsersMe from "@/apis/user/getUsersMe";
import getProfilesCode, { RequestProfileCode } from "@/apis/profile/getProfilesCode";
import { IUser } from "@/types/user.type";

interface AuthContextType {
  user: IUser | null;
  userProfile: RequestProfileCode | null;
  getUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  getUser: () => {},
});

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [userProfile, setUserProfile] = useState<RequestProfileCode | null>(null);

  useEffect(() => {
    const getUserProfile = async (newUser: IUser | null) => {
      if (newUser?.profile) {
        const newUserProfile = await getProfilesCode(newUser.profile.code);
        setUserProfile(newUserProfile);
      } else {
        setUserProfile(null);
      }
    };

    const getUser = async () => {
      const newUser = await getUsersMe();
      setUser(newUser);
      if (newUser) {
        await getUserProfile(newUser);
      }
    };

    getUser();
  }, []); // 빈 배열을 두어 컴포넌트가 마운트될 때 한 번만 실행되도록 한다

  const values = useMemo(
    () => ({
      user,
      userProfile,
      getUser: () => {},
    }),
    [user, userProfile],
  );

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
