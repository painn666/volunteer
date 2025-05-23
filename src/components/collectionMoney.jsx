import CustomButton from "./button";
import LinkTo from "./link";
function Collection({ img, children, totalValue, endDateOfCollection, link }) {
  const API_URL = process.env.NEXT_PUBLIC_URL;
  return (
    <div className="flex flex-col items-center ">
      <img
        className="aspect-square rounded-t-xl w-full"
        src={img ? API_URL + img : "Rectangle.png"}
        alt=""
      />
      <div className="shadow-[0px_4px_4px_rgba(0,0,0,0.25)]   p-2 gap-3 flex flex-col w-full items-center pb-4 rounded-b-xl ">
        <div className="flex flex-col gap-2 w-full pb-4">
          <div className="h-3">{children}</div>
          <div className="flex justify-between">
            <div className="h3Nb">Мета збору, грн.</div>
            <div className="h3">{totalValue ? totalValue : 0}</div>
          </div>
          <div className="border border-[var(--secondary)] w-full border-2 rounded-xl"></div>
          <div className="flex justify-between h4Nb">
            <div>Дата завершення збору</div>
            <div>
              {endDateOfCollection
                ? endDateOfCollection.replaceAll("-", ".")
                : ""}
            </div>
          </div>
        </div>
        <a
          href={link || ""}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-xl w-full px-8 py-[2px] bg-[var(--secondary)] text-[var(--primary)] h3Nb"
        >
          <div className="flex gap-2 items-center justify-center ">
            <img src="ua-flag.png" alt="UA flag" />
            <div>Підтримати</div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Collection;
