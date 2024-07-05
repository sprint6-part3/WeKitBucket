"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";

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

  const getUserProfile = async (newUser: IUser | null) => {
    if (newUser?.profile) {
      const newUserProfile = await getProfilesCode(newUser.profile.code);
      console.log("$$ newUserProfile", newUserProfile);
      setUserProfile(() => {
        if (newUserProfile) return newUserProfile;
        return null;
      });
    } else {
      setUserProfile(() => null);
    }
  };

  const values = useMemo(() => {
    const getUser = async () => {
      const newUser = await getUsersMe();
      setUser(() => {
        if (newUser) {
          (async () => {
            await getUserProfile(newUser);
          })();
          return newUser;
        }
        return null;
      });
    };

    return { user, userProfile, getUser };
  }, [user, userProfile]);

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
