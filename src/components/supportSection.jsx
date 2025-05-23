import CustomButton from "@/components/button";
import Tile from "@/components/tile";

import LinkTo from "./link";
function SupportSection() {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="flex flex-col items-center pt-8 col-span-1 gap-6 text-center">
        <div className="h4 ">
          Підтримайте благодійні організації, волонтерські групи та лікарні в
          Україні
        </div>
        <LinkTo
          href={"/aids"}
          bgColor={"bg-[var(--attention)]"}
          text={"text-[var(--primary)]"}
          textClass={"h4"}
          p={"px-8 py-4"}
        >
          Задонатити
        </LinkTo>
      </div>
      <div className="grid grid-cols-2 gap-16 col-span-2">
        <Tile
          img={"/family.png"}
          description={
            "Надаємо гуманітарну допомогу: найнеобхідніше для виживання — вода, їжа, одяг, ліки — сім'ям, дітям, людям похилого віку, біженцям та всім, хто опинився у скруті."
          }
        >
          Сім'ї та біженці
        </Tile>
        <Tile
          img={"/doctor.png"}
          description={
            "Співпрацюємо з лікарнями та медичними організаціями України, щоб забезпечити лікуванням цивільних та військових, постраждалих від війни."
          }
        >
          Медична допомога
        </Tile>
        <Tile
          img={"/home.png"}
          description={
            "Допомагаємо відбудовувати Україну: підтримуємо проекти, які створюють стабільне життя для громадян."
          }
        >
          Економічне відновлення
        </Tile>
        <Tile
          img={"/military.png"}
          description={
            "Надаємо життєво важливе спорядження для захисників: аптечки, джгути, шоломи, бронежилети та інші засоби захисту."
          }
        >
          Армія та тероборона
        </Tile>
      </div>
    </div>
  );
}

export default SupportSection;
