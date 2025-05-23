'use client";';
import Header from "@/components/header";
import { AuthProvider } from "@/func/authContext";
import MyMap from "./requestsMiniMap";
import { useLayout } from "@/func/layoutContext";
import { usePathname } from "next/navigation";
function Main({ Component, pageProps }) {
  const { layoutType } = useLayout();
  const pathname = usePathname();
  const isProfilePage = pathname.includes("/profile");
  return (
    <AuthProvider>
      <div className="flex w-full flex-col items-center justify-center container mx-auto pb-8">
        <Header
          changeLayoutType={
            layoutType === "default" && !isProfilePage ? false : true
          }
        ></Header>
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}

export default Main;
