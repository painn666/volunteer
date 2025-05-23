import Collection from "@/components/collectionMoney";
import { useState, useEffect } from "react";
import { getMoneyCollections } from "@/func/requests";
function aids() {
  const [aids, setAids] = useState([]);
  const getAids = async () => {
    const data = await getMoneyCollections();
    setAids(data.data.data);
  };
  useEffect(() => {
    getAids();
  }, []);
  return (
    <div className="w-full">
      <div className="flex flex-col items-start gap-4">
        <div className="h1">Усі збори</div>
        <div className="h3">Підтримай реальні потреби. Донатимо разом!</div>
      </div>
      <div className="grid grid-cols-4 gap-6 mt-8">
        {Array.isArray(aids) &&
          aids.map((aid) => (
            <Collection
              img={aid.titlePicture.url}
              key={aid.id}
              aid={aid}
              totalValue={aid.moneyNeeded}
              endDateOfCollection={aid.collectionEndDate}
              link={aid.donationLink}
            >
              {aid.title}
            </Collection>
          ))}
      </div>
    </div>
  );
}

export default aids;
