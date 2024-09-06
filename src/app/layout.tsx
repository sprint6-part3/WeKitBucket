import type { Metadata } from "next";
import { MantineProvider, ColorSchemeScript, createTheme } from "@mantine/core";
import "@/styles/globals.css";
import Toast from "@/components/Toast";
import { ToastProvider } from "@/context/ToastContext";
import { AuthProvider } from "@/context/AuthContext";
import Header from "./_components/Header";
import "@mantine/tiptap/styles.css";
import "@mantine/core/styles.css";

export const metadata: Metadata = {
  title: "WeKitBucket",
  description: "Generated by create next app",
  icons: {
    icon: "/favicon.ico",
  },
};

const theme = createTheme({
  fontFamily: "Pretendard, ui-sans-serif, system-ui",
  fontFamilyMonospace: "Pretendard, ui-sans-serif, system-ui",
  headings: { fontFamily: "Pretendard, ui-sans-serif, system-ui" },
});

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <AuthProvider>
            <ToastProvider>
              <Header />
              <Toast />
              {children}
            </ToastProvider>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

export default RootLayout;
