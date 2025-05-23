import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import CustomArea from "@/components/customInputArea";
import CustomButton from "@/components/button";
import { useState, useEffect } from "react";
import CreateRequestMinimap from "@/components/createRequestMiniMap";
import { getCities, createAidRequest, getCityByName } from "@/func/requests";
import { useAuth } from "@/func/authContext";
import { useModal } from "@/func/modalContext";
import Modal from "@/components/modal";
import LinkTo from "@/components/link";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import ModalComponent from "@/components/defaultModalComponent";
import LabelIcon from "@/components/labelIcon";
function CreateRequest() {
  const [allFilled, setAllFilled] = useState(false);
  const { userData, isLogged } = useAuth();
  const router = useRouter();
  const { showModal, hideModal } = useModal();
  const [request, setRequest] = useState({
    slp: "",
    phoneNumber: "",
    region: "",
    town: "",
    directionOfAssistance: "",
    descriptionOfAid: "",
    additionalInformation: "",
    coordinates: "",
  });

  const [selectedCity, setSelectedCity] = useState(null);
  const debounceTimeout = useRef(null);
  // const [cities, setCities] = useState([
  //   { value: "", title: "Оберіть область" },
  // ]);
  async function fetchCities() {
    const data = await getCities();
    const filteredData = data.filter((el) => {
      return (
        Number(el.lng) <= 37.7 &&
        el.adminName1 !== "Zaporizhzhia" &&
        el.adminName1 !== "Mariupol" &&
        (el.adminName1 === "Luhansk" ||
          el.adminName1 === "Donetsk" ||
          el.adminName1 === "Zaporizhzhia")
      );
    });
    const citiesData = filteredData.map((el) => {
      return { value: el.name, title: el.name };
    });
    console.log(filteredData);
    return filteredData;
    // setCities(citiesData);
  }
  const isInCombatZone = (el) => {
    const lat = Number(el.lat);
    const lng = Number(el.lng);
    const region = el.adminName1?.toLowerCase().replace("область", "").trim();
    const cityName = el.name?.toLowerCase();

    const allowedRegions = [
      "донецька",
      "луганська",
      "запорізька",
      "херсонська",
      "харківська",
    ];

    const excludedCities = [
      "маріуполь",
      "луганськ",
      "мелітополь",
      "сімферополь",
      "севастополь",
      "донецк",
    ];

    // const isNearFrontline =
    //   lng >= 34.5 && lng <= 37.7 && lat >= 46.2 && lat <= 50.5;

    return (
      allowedRegions.includes(region) && !excludedCities.includes(cityName)
    );
  };

  useEffect(() => {
    setRequest((prev) => ({
      ...prev,
      coordinates: selectedCity,
    }));
  }, [selectedCity]);
  useEffect(() => {
    if (
      request.slp.length > 3 &&
      request.phoneNumber.length >= 10 &&
      request.town.length > 3 &&
      request.region.length > 10 &&
      request.directionOfAssistance.length > 5 &&
      request.descriptionOfAid.length > 10
    ) {
      setAllFilled(true);
    } else {
      setAllFilled(false);
    }

    return () => {
      setAllFilled(null);
    };
  }, [request]);
  useEffect(() => {
    if (!request?.town) return;

    // Очистка предыдущего таймера
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Новый таймер с задержкой 2 сек
    debounceTimeout.current = setTimeout(async () => {
      const results = await getCityByName(request.town, request.region);
      console.log(results);
      if (results?.totalResultsCount === 0) return;
      const filteredCities = results;
      // .filter(isInCombatZone);
      console.log(filteredCities);

      if (Array.isArray(filteredCities)) {
        setSelectedCity({
          lat: Number(filteredCities[0].lat),
          lng: Number(filteredCities[0].lng),
        });
      }
      console.log(
        request.town,
        "Города по введённому названию:",
        results,
        filteredCities
      );
    }, 2000);

    // Очистка при размонтировании или при новом вводе
    return () => clearTimeout(debounceTimeout.current);
  }, [request?.town]);

  const sendRequest = async () => {
    if (allFilled) {
      const data = await createAidRequest(userData.id, request);
      if (data?.data?.success) {
        showModal(
          <ModalComponent className="flex flex-col items-center p-8 max-w-[400px] text-center gap-4">
            <div className="h3">Ваша заявка була успішно подана!</div>
            <div className="h4Nb ">
              Дякуємо за вашу допомогу! Заявка пройде процес модерації, і після
              цього вона з'явиться в списку активних заявок. Разом ми
              допомагаємо людям і наближаємо перемогу!
            </div>
            <LinkTo
              callback={() => {
                hideModal();
              }}
              p={"px-4 py-2"}
              bgColor={"bg-gray-300"}
              href={"/profile"}
            >
              Повернутися назад
            </LinkTo>
          </ModalComponent>
        );
        setRequest({
          slp: "",
          phoneNumber: "",
          region: "",
          town: "",
          directionOfAssistance: "",
          descriptionOfAid: "",
          additionalInformation: "",
          coordinates: "",
        });
      } else {
        showModal(
          <ModalComponent>
            <div className="py-8">{data?.response?.data?.error?.message}</div>
          </ModalComponent>
        );
      }
    }
  };

  return (
    <div className="grid grid-cols-5 gap-8 w-full h-full p-8">
      {isLogged && (
        <>
          <div className="col-span-3">
            <div className="h1 text-center">Подати запит на допомогу</div>
            <div>
              <form
                id="requestForm"
                onSubmit={(e) => {
                  e.preventDefault();
                  sendRequest();
                }}
              >
                <div className="grid grid-cols-2 grid-rows-4 gap-8 ">
                  <CustomInput
                    callback={(e) => {
                      setRequest((prev) => ({
                        ...prev,
                        slp: e,
                      }));
                    }}
                    required
                    label={"Ваше ПІБ"}
                    placeholder={"Ім'я та Прізвище"}
                  ></CustomInput>
                  <CustomInput
                    callback={(e) => {
                      setRequest((prev) => ({
                        ...prev,
                        phoneNumber: e,
                      }));
                    }}
                    required
                    label={"Введіть ваш телефон"}
                    placeholder={"Телефон"}
                    type={"number"}
                  ></CustomInput>
                  <CustomSelect
                    required
                    callback={(e) => {
                      setRequest((prev) => ({
                        ...prev,
                        region: e,
                      }));
                    }}
                    label={"Оберіть область"}
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
                  <CustomInput
                    callback={(e) => {
                      setRequest((prev) => ({
                        ...prev,
                        town: e,
                      }));
                    }}
                    readonly={request.region === ""}
                    required
                    label={"Введіть ваше місто"}
                    placeholder={"Місто"}
                  ></CustomInput>
                  <CustomSelect
                    required
                    label="Оберіть напрямок допомоги"
                    callback={(e) => {
                      setRequest((prev) => ({
                        ...prev,
                        directionOfAssistance: e,
                      }));
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
                  />
                </div>
                <div>
                  <CustomArea
                    callback={(e) => {
                      setRequest((prev) => ({
                        ...prev,
                        descriptionOfAid: e,
                      }));
                    }}
                    required
                    label={"Опишіть, яка саме допомога потрібна"}
                    placeholder={
                      "Опишіть коротко суть запиту: потрібні продукти, евакуація, перевезення речей, пошук житла тощо."
                    }
                  ></CustomArea>
                  <CustomArea
                    callback={(e) => {
                      setRequest((prev) => ({
                        ...prev,
                        additionalInformation: e,
                      }));
                    }}
                    label={"Додаткова інформація або уточнення"}
                    placeholder={
                      "Напишить сюди деталі, які можуть допомогти волонтерам"
                    }
                  ></CustomArea>
                </div>
              </form>
              <div></div>
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-8 w-full">
            <CreateRequestMinimap
              setSelected={setSelectedCity}
              selected={selectedCity}
            >
              map
            </CreateRequestMinimap>
            <div className="h-4Nb">
              Ви можете уточнити місце розташування на карті вище — просто
              натисніть на потрібну точку.Це допоможе нам краще зрозуміти, куди
              саме потрібна допомога.
            </div>
            <div className="mx-auto w-full">
              <CustomButton
                callback={() => {
                  console.log("all okay");
                }}
                type={"submit"}
                formId={"requestForm"}
                bgColor={"bg-[var(--secondary)]"}
                p={"py-6 px-8"}
                w={"w-full"}
                isInactive={!allFilled}
                text={
                  allFilled
                    ? "text-[var(--primary)]"
                    : "text-[var(--secondary)]"
                }
              >
                Подати заяву
              </CustomButton>
            </div>
            <div className="text-link text-center text-[16px]">
              Надсилаючи заявку, я погоджуюсь на обробку своїх даних для
              організації допомоги.
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CreateRequest;
