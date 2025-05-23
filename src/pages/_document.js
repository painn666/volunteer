import { Html, Head, Main, NextScript } from "next/document";
import Header from "@/components/header";
export default function Document() {
  return (
    <Html lang="en">
      <link
        href="https://fonts.googleapis.com/css2?family=Jersey+25&display=swap"
        rel="stylesheet"
      />

      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
