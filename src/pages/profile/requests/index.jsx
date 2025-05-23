import CustomInput from "@/components/customInput";
import AidRequest from "@/components/aidRequest";
import RequestsMap from "@/components/requestsMiniMap";
import { useAuth } from "@/func/authContext";
import { getAllAidRequests, getSelfData } from "@/func/requests";
import { useState, useEffect } from "react";
import CustomSelect from "@/components/customSelect";
import { useRef } from "react";
function Requests() {
  const { userData, isLogged, setUserData } = useAuth();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const requestRefs = useRef({});
  const [paginationData, setPaginatioData] = useState(null);
  const [mapTarget, setMapTarget] = useState(null);
  const [showTarget, setShowTarget] = useState(null);
  const [region, setRegion] = useState("");
  const [aidRequested, setAidRequested] = useState("");
  const getAidRequests = async () => {
    const response = await getAllAidRequests();
    setRequests(response.data.data);
    setPaginatioData(response.data.meta);
  };
  useEffect(() => {
    getAidRequests();
    return () => {
      setRequests(null);
    };
  }, []);

  const getUser = async () => {
    const data = await getSelfData(userData?.id, [
      "role",
      "aid_requests",
      "aid_requests_taken",
    ]);

    setUserData(data.data.data);
    return data;
  };
  useEffect(() => {
    getUser();
  }, [userData?.id]);

  useEffect(() => {
    const filteredRequests = requests.filter((item) => {
      const regionMatch = item.region === region || region === "";
      const aidRequestedMatch =
        item.directionOfAssistance === aidRequested || aidRequested === "";
      console.log(
        region,
        aidRequested,
        item.directionOfAssistance,
        item.region
      );

      return regionMatch && aidRequestedMatch;
    });
    console.log(filteredRequests);

    setFilteredRequests(filteredRequests);
  }, [region, aidRequested]);

  const showChoosedRequest = (target) => {
    setShowTarget(target);

    const key = `${target.lat}-${target.lng}`;
    const element = requestRefs.current[key];

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  useEffect(() => {
    setRegion("");
    setAidRequested("");
  }, []);
  return (
    <div className="grid grid-cols-5 gap-8 w-full">
      {isLogged && (
        <>
          <div className="col-span-2 flex flex-col items-center">
            {(Array.isArray(filteredRequests) &&
              aidRequested !== "" &&
              region !== "" && (
                <RequestsMap
                  showChoosedRequest={(e) => {
                    showChoosedRequest(e);
                  }}
                  points={filteredRequests
                    .map((item) => item.coordinates)
                    .filter((item) => item && item.lat && item.lng)}
                  target={mapTarget}
                ></RequestsMap>
              )) ||
              (Array.isArray(requests) && (
                <RequestsMap
                  showChoosedRequest={(e) => {
                    showChoosedRequest(e);
                  }}
                  points={requests
                    .map((item) => item.coordinates)
                    .filter((item) => item && item.lat && item.lng)}
                  target={mapTarget}
                ></RequestsMap>
              ))}
            <div className="h4Nb py-4">
              {" "}
              На цій вкладці ви можете побачити всі заявки, подані людьми, яким
              потрібна допомога. Зверху ви знайдете інтерактивну карту, на якій
              позначені точки — це місця, де потрібна допомога. Кожна точка на
              карті відповідає реальній ситуації, де люди очікують підтримки.
              Кожен з нас може внести свою лепту в загальну справу. Приймаючи
              заявки, ви не лише допомагаєте людям, але й стаєте частиною
              великої спільноти, яка прагне до допомоги й взаємопідтримки. Ваша
              відповідальність важлива, адже кожна допомога може змінити чиюсь
              долю. Тому будьте уважні, доброзичливі та готові до справжніх змін
              у житті тих, хто потребує вашої допомоги.
            </div>
          </div>
          <div className="col-span-3 flex flex-col gap-4">
            <div className="flex flex-col items-start">
              <div className="h1">Люди, котрім потрібна допомога:</div>
              <div className="h4">
                Натисни "Взяти в роботу", якщо хочеш допомогти — твоя підтримка
                важлива, і кожен внесок робить світ кращим.
              </div>
              <div className="flex gap-4 items-center w-fit">
                <CustomSelect
                  callback={(e) => {
                    console.log(e);

                    setRegion(e);
                  }}
                  options={[
                    { value: "", label: "Оберіть область" },
                    {
                      value: "Луганьска область",
                      label: "Луганьска область",
                    },
                    { value: "Донецька область", label: "Донецька область" },
                    {
                      value: "Запорізька область",
                      label: "Запорізька область",
                    },
                    {
                      value: "Херсонська область",
                      label: "Херсонська область",
                    },
                    {
                      value: "Харківська область",
                      label: "Харківська область",
                    },
                  ]}
                ></CustomSelect>
                <CustomSelect
                  callback={(e) => {
                    setAidRequested(e);
                  }}
                  options={[
                    { value: "", label: "Напрямок допомоги" },
                    {
                      value: "Гуманітарна допомога",
                      label: "Гуманітарна допомога",
                      img: "/gasoline.png",
                    },
                    {
                      value: "Евакуація та транспорт",
                      label: "Евакуація та транспорт",
                      img: "/delivery.png",
                    },
                    {
                      value: "Фізична допомога на місцях",
                      label: "Фізична допомога на місцях",
                      img: "/ambulance.png",
                    },
                  ]}
                ></CustomSelect>
              </div>
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              {(Array.isArray(filteredRequests) &&
                aidRequested !== "" &&
                region !== "" &&
                filteredRequests.map((item) => {
                  const key = `${item.coordinates.lat}-${item.coordinates.lng}`;

                  return (
                    <div
                      key={item.id}
                      ref={(el) => {
                        if (el) requestRefs.current[key] = el;
                      }}
                    >
                      <AidRequest
                        hasMapPoint={
                          item.coordinates.lat && item.coordinates.lng
                        }
                        data={item}
                        userRole=""
                        setMapTarget={setMapTarget}
                        requestAcceptMode
                        userId={userData?.id}
                        reloadRequests={getAidRequests}
                        neededToShow={
                          showTarget !== null &&
                          showTarget.lat === item.coordinates.lat &&
                          showTarget.lng === item.coordinates.lng
                        }
                      />
                    </div>
                  );
                })) ||
                (Array.isArray(requests) &&
                  requests.map((item) => {
                    const key = `${item.coordinates.lat}-${item.coordinates.lng}`;

                    return (
                      <div
                        key={item.id}
                        ref={(el) => {
                          if (el) requestRefs.current[key] = el;
                        }}
                      >
                        <AidRequest
                          hasMapPoint={
                            item.coordinates.lat && item.coordinates.lng
                          }
                          data={item}
                          userRole=""
                          setMapTarget={setMapTarget}
                          requestAcceptMode
                          userId={userData?.id}
                          reloadRequests={getAidRequests}
                          neededToShow={
                            showTarget !== null &&
                            showTarget.lat === item.coordinates.lat &&
                            showTarget.lng === item.coordinates.lng
                          }
                        />
                      </div>
                    );
                  }))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Requests;
