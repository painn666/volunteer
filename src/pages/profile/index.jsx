import AidRequest from "@/components/aidRequest";
import UserProfile from "@/components/userProfile";
import { useAuth } from "@/func/authContext";
import { useEffect } from "react";
import { useState } from "react";
import { getSelfData } from "@/func/requests";
import Loader from "@/components/loader";
import { useModal } from "@/func/modalContext";
import RequestsMap from "@/components/requestsMiniMap";
import ModalComponent from "@/components/defaultModalComponent";
import { CrossIcon, HistoryIcon } from "@/icons/icons";
function Profile() {
  const { userData, isLogged } = useAuth();
  const [userAidRequests, setUserAidRequests] = useState(null);
  const [mapTarget, setMapTarget] = useState(null);
  const { showModal } = useModal();
  const [showHistory, setShowHistory] = useState(false);
  const getAidRequests = async () => {
    const data = await getSelfData(userData?.id, [
      "role",
      "aid_requests",
      "aid_requests_taken",
    ]);

    setUserAidRequests(data?.data?.data);
    return data;
  };
  useEffect(() => {
    getAidRequests();

    return () => {
      setUserAidRequests([]);
    };
  }, [userData?.id]);
  useEffect(() => {
    if (mapTarget !== null && Array.isArray([mapTarget])) {
      showModal(
        <div className="p-4 bg-[var(--primary)] rounded-xl">
          <RequestsMap
            points={[mapTarget]}
            defaultCenter={[mapTarget]}
          ></RequestsMap>
        </div>
      );
    }
  }, [mapTarget]);

  return (
    <div>
      {isLogged && userData !== null && userAidRequests !== null ? (
        <div className="grid grid-cols-6 gap-8">
          {
            <div className="col-span-2 ">
              <UserProfile data={userAidRequests}></UserProfile>
            </div>
          }
          {userAidRequests?.role?.name === "user" ? (
            showHistory ? (
              <div className="flex flex-col w-full col-span-4 ">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between pr-4">
                    <span className="h1"> Історія заявок</span>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setShowHistory(!showHistory);
                      }}
                    >
                      <CrossIcon></CrossIcon>
                    </div>
                  </div>
                  <span className="h4Nb">
                    Якщо ваша заявка була завершена або змінена, вона з’явиться
                    тут. Ви зможете подивитися деталі ваших минулих заявок та
                    результатів.
                  </span>
                </div>
                {Array.isArray(userAidRequests?.aid_requests) ? (
                  <div className="py-4 max-h-[500px] overflow-y-auto">
                    {userAidRequests?.aid_requests
                      .filter((item) => item.completed === true)
                      .map((item) => {
                        console.log(item);

                        return (
                          <AidRequest
                            userRole={userAidRequests?.role?.name}
                            data={item}
                            reloadRequests={getAidRequests}
                            userId={userData.id}
                            hasMapPoint={item?.coordinates?.lat ? true : false}
                            setMapTarget={setMapTarget}
                          ></AidRequest>
                        );
                      })}
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div className="flex flex-col w-full col-span-4 ">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between pr-4">
                    <span className="h1"> Ваші заявки</span>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setShowHistory(!showHistory);
                      }}
                    >
                      <HistoryIcon></HistoryIcon>
                    </div>
                  </div>
                  <span className="h4Nb">
                    Тут ви бачите всі подані вами заявки. Якщо допомога не
                    потрібна або ситуація змінилася, натискайте «Скасувати
                    заявку», щоб вона більше не була активною.
                  </span>
                </div>
                {Array.isArray(userAidRequests?.aid_requests) ? (
                  <div className="py-4 max-h-[500px] overflow-y-auto">
                    {userAidRequests?.aid_requests
                      .filter((item) => {
                        return !item.completed;
                      })
                      .map((item) => {
                        console.log(item);

                        return (
                          <AidRequest
                            userRole={userAidRequests?.role?.name}
                            data={item}
                            reloadRequests={getAidRequests}
                            userId={userData.id}
                            setMapTarget={setMapTarget}
                            hasMapPoint={item?.coordinates?.lat ? true : false}
                          ></AidRequest>
                        );
                      })}
                  </div>
                ) : (
                  ""
                )}
              </div>
            )
          ) : showHistory ? (
            <div className="flex flex-col w-full col-span-4 ">
              <div className="flex flex-col">
                <div className="flex items-center justify-between pr-4">
                  <span className="h1"> Історія заявок</span>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setShowHistory(!showHistory);
                    }}
                  >
                    <CrossIcon></CrossIcon>
                  </div>
                </div>
                <span className="h4Nb">
                  Якщо ваша заявка була завершена або змінена, вона з’явиться
                  тут. Ви зможете подивитися деталі ваших минулих заявок та
                  результатів.
                </span>
              </div>
              {Array.isArray(userAidRequests?.aid_requests_taken) ? (
                <div className="py-4 max-h-[500px] overflow-y-auto">
                  {userAidRequests?.aid_requests
                    .filter((item) => item.completed === true)
                    .map((item) => {
                      console.log(item);

                      return (
                        <AidRequest
                          userRole={userAidRequests?.role?.name}
                          data={item}
                          hasMapPoint={item?.coordinates?.lat ? true : false}
                          reloadRequests={getAidRequests}
                          userId={userData.id}
                          setMapTarget={setMapTarget}
                        ></AidRequest>
                      );
                    })}
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="flex flex-col w-full col-span-4 ">
              <div className="flex items-center justify-between pr-4">
                <span className="h1"> Ваші заявки</span>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setShowHistory(!showHistory);
                  }}
                >
                  <HistoryIcon></HistoryIcon>
                </div>
              </div>
              <span className="h4Nb">
                Тут відображаються всі заявки, на яких ти зараз працюєш.Якщо ти
                вже завершив роботу по заявці — натисни «Позначити як виконане».
              </span>
              {Array.isArray(userAidRequests?.aid_requests_taken) ? (
                <div className="py-4 max-h-[500px] overflow-y-auto">
                  {userAidRequests?.aid_requests_taken
                    .filter((item) => {
                      return item.completed === false;
                    })
                    .map((item) => {
                      console.log(item);

                      return (
                        <AidRequest
                          userId={userData.id}
                          userRole={userAidRequests?.role?.name}
                          data={item}
                          reloadRequests={getAidRequests}
                          hasMapPoint={item?.coordinates?.lat !== null}
                          setMapTarget={setMapTarget}
                        ></AidRequest>
                      );
                    })}
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      ) : (
        <Loader></Loader>
      )}
    </div>
  );
}

export default Profile;
