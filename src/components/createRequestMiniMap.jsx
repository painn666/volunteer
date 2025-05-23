"use client";

import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import * as turf from "@turf/turf";
import { useModal } from "@/func/modalContext";
import ModalComponent from "./defaultModalComponent";

const RequestMiniMap = ({ selected, setSelected }) => {
  const [geoFeatures, setGeoFeatures] = useState(null);
  const { showModal } = useModal();
  useEffect(() => {
    fetch("/export.geojson")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load geojson");
        return res.json();
      })
      .then((data) => {
        // В geojson ожидается FeatureCollection
        setGeoFeatures(data.features);
      })
      .catch((e) => {
        console.error("Error loading geojson:", e);
      });
  }, []);

  const onMapClick = (e) => {
    if (!geoFeatures) return;

    const clickedPoint = turf.point([e.latLng.lng(), e.latLng.lat()]);

    // Проверяем, попадает ли точка в хотя бы один полигон
    const isInside = geoFeatures.some((feature) =>
      turf.booleanPointInPolygon(clickedPoint, feature)
    );

    if (isInside) {
      setSelected({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    } else {
      showModal(
        <ModalComponent>
          <div className="py-4 h4  w-full text-center">
            Пожалуйста, выберите точку в пределах границ.
          </div>
        </ModalComponent>
      );
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDo0-GPwv16f79VTDXW3YrGRwnwdke_Ph8">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "500px" }}
        center={{ lat: 47.9, lng: 37.5 }}
        zoom={7}
        onClick={onMapClick}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default RequestMiniMap;
