"use client";

import Banner from "@/components/banner";
import Collection from "@/components/collectionMoney";
import SupportSection from "@/components/supportSection";
import Gallery from "@/components/gallery";
import { useEffect, useState } from "react";
import { getGalleryImages } from "@/func/requests";
import {
  getMoneyCollections,
  getQuantityOfAids,
  getMedia,
} from "@/func/requests";
function HomePage() {
  const [aids, setAids] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [images, setImages] = useState([]);
  // async function getImages() {
  //   const data = await getGalleryImages(12);
  //   setImages(data);
  //   console.log(data);
  // }
  // useEffect(() => {
  //   getImages();
  // }, []);
  const getAids = async () => {
    const data = await getMoneyCollections();
    const quantity = await getQuantityOfAids();
    const images = await getMedia();
    setAids(data.data.data);
    setQuantity(quantity.data.data);
    setImages(images.data);
  };
  useEffect(() => {
    getAids();
  }, []);
  return (
    <div className="w-full px-10 gap-[64px] flex flex-col py-[64px] ">
      <Banner helpNumber={quantity}></Banner>
      <SupportSection></SupportSection>
      {/* Support slider */}
      <div className="flex flex-col gap-8">
        <div className="h1">Актуальні збори</div>
        <div className="grid grid-cols-3 gap-8 ">
          {Array.isArray(aids) &&
            aids.slice(0, 3).map((aid) => (
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
      <Gallery
        images={images}
        description={"Дивіться, як ваша підтримка змінює життя"}
      >
        Наша допомога в дії
      </Gallery>
    </div>
  );
}

export default HomePage;
