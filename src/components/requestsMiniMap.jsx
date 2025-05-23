import { useEffect } from "react";
import { APIProvider, Map, Marker, useMap } from "@vis.gl/react-google-maps";

const MapController = ({ target }) => {
  const map = useMap();

  // внутри MapController
  useEffect(() => {
    if (map && target?.lat && target?.lng) {
      console.log(target);

      map.panTo({ lat: target.lat, lng: target.lng });
      map.setZoom(12);
    }
  }, [target?.lat, target?.lng, target?.mapUpdateId, map]); // mapUpdateId — новое число при каждом клике

  return null;
};

const RequestsMap = ({ points, target, showChoosedRequest, defaultCenter }) => {
  const handleShowRequest = (t) => {
    console.log(t);

    showChoosedRequest(t);
  };
  return (
    <APIProvider apiKey="AIzaSyDo0-GPwv16f79VTDXW3YrGRwnwdke_Ph8">
      <Map
        className="min-w-[500px]  h-[550px] max-md:min-w-[300px] "
        defaultCenter={
          defaultCenter ? defaultCenter[0] : { lat: 47.9, lng: 37.5 }
        }
        defaultZoom={7}
      >
        <MapController
          key={`${target?.lat}-${target?.lng}-${Date.now()}`}
          target={target}
        />

        {Array.isArray(points)
          ? points.map((point) => (
              <Marker
                onClick={() => {
                  handleShowRequest(point);
                }}
                key={`${point.lat}-${point.lng}`}
                position={{ lat: point.lat, lng: point.lng }}
              />
            ))
          : null}
      </Map>
    </APIProvider>
  );
};

export default RequestsMap;
