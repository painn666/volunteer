import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
// import { useRouter } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/home",
      permanent: false,
    },
  };
}

export default function Home() {
  return null;
}
