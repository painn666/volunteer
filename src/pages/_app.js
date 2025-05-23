import "@/styles/globals.css";
import Main from "@/components/main";
import { LayoutProvider } from "@/func/layoutContext";
import { ModalProvider } from "@/func/modalContext";
export default function App({ Component, pageProps }) {
  return (
    <ModalProvider>
      <LayoutProvider>
        <Main Component={Component} pageProps={pageProps}></Main>
      </LayoutProvider>
    </ModalProvider>
  );
}
