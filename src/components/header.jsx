import LinkTo from "./link";
import { useAuth } from "@/func/authContext";
import { BackIcon } from "@/icons/icons";
import { usePathname } from "next/navigation";
import { ExitIcon } from "@/icons/icons";
function Header({ changeLayoutType }) {
  const pathname = usePathname();
  const toProfile = pathname.includes("/profile/");
  return (
    <header className="flex items-center justify-between w-full pt-6">
      {/* Логотип и надпись */}
      <a
        href={toProfile ? "/profile" : "home"}
        className="h3 font-normal flex flex-row gap-2 items-center"
        style={{ fontFamily: "'Jersey 25', cursive" }}
      >
        <div className="w-full h-full">
          {toProfile ? (
            <BackIcon></BackIcon>
          ) : (
            <img className="w-10 h-5" src="ua-flag.png" alt="UA flag" />
          )}
        </div>
        <div className="whitespace-nowrap">help volounteer</div>
      </a>

      {/* Правый блок */}
      {changeLayoutType ? (
        <div className="flex flex-row gap-8 items-center ">
          <LinkTo
            href={"/home"}
            callback={() => {
              localStorage.setItem("JWTtoken", "");
              localStorage.removeItem("JWTtoken");
            }}
          >
            <div className="flex flex-row gap-2 items-center text-[#9B3A3A]">
              <div>Вийти з кабинета</div>
              <ExitIcon></ExitIcon>
            </div>
          </LinkTo>
        </div>
      ) : (
        <div className="flex justify-between w-full items-center">
          <div className="flex flex-row gap-8 px-8">
            <LinkTo href={"/aids"}>Збори</LinkTo>
            <LinkTo href={"/about"}>Як ми працюємо?</LinkTo>
          </div>
          <div className="flex flex-row gap-8">
            <LinkTo href={"/login"}>Увійти до кабінету</LinkTo>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
