import type { Metadata } from "next";
import "@/styles/globals.css";
import Toast from "@/components/Toast";
import { ToastProvider } from "@/context/ToastContext";
import { AuthProvider } from "../context/AuthContext";
import Header from "./_components/Header";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>
          <ToastProvider>
            <Header />
            <Toast />
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

export default RootLayout;
