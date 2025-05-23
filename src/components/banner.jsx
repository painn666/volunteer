import CustomButton from "./button";
import LinkTo from "./link";
import Loader from "./loader";
function Banner({ helpNumber }) {
  return (
    <div className="w-full h-full rounded-xl bg-[#FFD04D] flex justify-between overflow-hidden ">
      <div className="flex flex-col  pt-20 pb-10 pl-15 gap-10 w-fit">
        {/* container 1 */}
        <div className="flex flex-col gap-5">
          <div className="h1">
            Платформа <br></br> волонтерської допомоги Україні
          </div>
          <div className="h3">
            Не компанія — просто люди, які хочуть допомагати
          </div>
          <div className="flex flex-col items-center gap-4 w-fit">
            <LinkTo href={"/login"} p={"px-[69px]"} w={"w-full"}>
              Оформити заяву
            </LinkTo>
            <div className="flex flex-col gap-4 items-center w-fit">
              <div className="h4">Допомогли разів </div>
              <div className="h1">
                {helpNumber ? helpNumber : <Loader></Loader>}
              </div>
            </div>
          </div>
        </div>
        {/* container 2 */}
      </div>
      <div className="flex flex-col items-center relative">
        <div className="text-[64px] font-bold text-center pt-8">
          PRAY <br></br> FOR UKRAINE
        </div>
        <img
          className="max-w-[576px]   right-0 bottom-0"
          src="/love-hands.png"
        ></img>
      </div>
    </div>
  );
}

export default Banner;
