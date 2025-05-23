import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import CustomArea from "@/components/customInputArea";
import CustomButton from "@/components/button";
import { useState, useEffect } from "react";
import CreateRequestMinimap from "@/components/createRequestMiniMap";
import { createMoneyCollection } from "@/func/requests";
import { useAuth } from "@/func/authContext";
import DragDropInput from "@/components/dragDropInput";
import { useRouter } from "next/navigation";
function CreateCollectionRequest() {
  const [allFilled, setAllFilled] = useState(false);
  const { userData, isLogged } = useAuth();
  const router = useRouter();
  const [request, setRequest] = useState({
    slp: "",
    title: "",
    donationLink: "",
    moneyNeeded: null,
    collectionEndDate: null,
    file: null,
  });
  useEffect(() => {
    if (
      request.slp.length > 8 &&
      request.title.length > 5 &&
      request.donationLink.length > 10 &&
      request.moneyNeeded !== null &&
      request.collectionEndDate !== null &&
      request.moneyNeeded.length > 3
    ) {
      setAllFilled(true);
    } else {
      setAllFilled(false);
    }

    return () => {
      setAllFilled(null);
    };
  }, [request]);
  const sendRequest = async () => {
    if (allFilled) {
      const data = await createMoneyCollection(userData.id, request);
      if (data?.data?.success) {
        showModal(
          <ModalComponent className="flex flex-col items-center p-8 max-w-[400px] text-center gap-4">
            <div className="h3">Збір успішно подано!</div>
            <div className="h4Nb ">
              Дякуємо за вашу ініціативу! Після модерації ваш збір буде активним
              і відображений у списку. Ми цінуємо вашу допомогу в нашій спільній
              справі!
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
          title: "",
          donationLink: "",
          moneyNeeded: null,
          collectionEndDate: null,
          file: null,
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
                <div className="grid grid-cols-2 grid-rows-4 gap-4 ">
                  <div className="col-span-2 w-full">
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
                    <div className="h6">
                      Будь ласка, вкажіть своє ім'я та прізвище, щоб ми могли
                      правильно ідентифікувати вас як організатора збору.
                    </div>
                  </div>
                  <div className="col-span-2 w-full">
                    <CustomInput
                      callback={(e) => {
                        setRequest((prev) => ({
                          ...prev,
                          title: e,
                        }));
                      }}
                      required
                      label={"Назва збору"}
                      placeholder={"Назва збору"}
                    ></CustomInput>
                    <div className="h6">
                      Опишіть, на що саме буде направлена зібрана сума. Будьте
                      чіткими і зрозумілими, це важливо для вашої аудиторії.
                    </div>
                  </div>
                  <div className="col-span-2 w-full">
                    <CustomInput
                      callback={(e) => {
                        setRequest((prev) => ({
                          ...prev,
                          donationLink: e,
                        }));
                      }}
                      required
                      label={"Посилання на банку Monobank"}
                      placeholder={"Посилання на банку Monobank"}
                    ></CustomInput>
                    <div className="h6">
                      Для вашого збору необхідно прикріпити посилання на
                      Monobank для зручності переказу коштів.Наприклад: Приклад
                      посилання
                    </div>
                  </div>
                  <div className="w-fit">
                    <CustomInput
                      callback={(e) => {
                        setRequest((prev) => ({
                          ...prev,
                          moneyNeeded: e,
                        }));
                      }}
                      required
                      type={"number"}
                      label={"Мета збору"}
                      placeholder={"Мета збору"}
                    ></CustomInput>
                    <div className="h6">
                      Вкажіть суму, яку ви плануєте зібрати для досягнення мети.
                    </div>
                  </div>
                  <div>
                    <CustomInput
                      type={"date"}
                      callback={(e) => {
                        setRequest((prev) => ({
                          ...prev,
                          collectionEndDate: new Date(e),
                        }));
                      }}
                      required
                      label={"Дата завершення збору"}
                      placeholder={"Дата завершення збору"}
                    ></CustomInput>
                    <div className="h6">
                      Встановіть дату, до якої плануєте завершити збір коштів.
                    </div>
                  </div>
                </div>
                <div className="w-fit mx-auto pt-8">
                  <CustomButton
                    callback={() => {
                      console.log("all okay");
                    }}
                    type={"submit"}
                    formId={"requestForm"}
                    bgColor={"bg-[var(--secondary)]"}
                    p={"py-6 px-16"}
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
              </form>
              <div></div>
            </div>
          </div>
          <div className="col-span-2 flex flex-col w-full">
            <DragDropInput
              setFile={(e) =>
                setRequest((prev) => ({
                  ...prev,
                  file: e,
                }))
              }
              file={request.file}
            ></DragDropInput>

            <div className="h4">Завантажте картинку для обкладинки збору</div>
            <div className="h5">
              Завантажте зображення, яке буде використовуватись як обкладинка
              для вашого збору.
            </div>
            <ul className="h-5 list-disc pl-4">
              <li>
                Зображення повинно бути чітким, високої якості та відповідати
                темі збору.
              </li>
              <li>Перед публікацією зображення пройде модерацію.</li>
              <li>Враховуйте, що неправильний контент може бути відхилений.</li>
            </ul>
            <div className="mx-auto w-full"></div>
          </div>
        </>
      )}
    </div>
  );
}

export default CreateCollectionRequest;
