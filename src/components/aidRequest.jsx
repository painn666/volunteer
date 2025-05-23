import CustomButton from "./button";
import { useModal } from "@/func/modalContext";
import RequestInfo from "./requestInfo";
import {
  takeAidRequest,
  completeAidRequest,
  cancelAidRquest,
} from "@/func/requests";
import ModalComponent from "./defaultModalComponent";
import { useRouter } from "next/navigation";
import RequestModal from "./requestModal";
function AidRequest({
  data,
  userRole = "user",
  hasMapPoint = false,
  setMapTarget,
  requestAcceptMode = false,
  userId,
  reloadRequests,
  neededToShow = false,
}) {
  const { showModal, hideModal } = useModal();
  const surname = data.slp.split(" ")[0];
  const firstname = data.slp.split(" ")[1];
  const router = useRouter();
  const sendAid = async () => {
    const response = await takeAidRequest(userId, data.id);

    if (response?.data?.success) {
      router.push("/profile");
      hideModal();
    } else {
      showModal(
        <ModalComponent>
          {response?.response?.data?.error?.message}
        </ModalComponent>
      );
    }
  };
  const completeAid = async () => {
    const response = await completeAidRequest(userId, data.id);

    if (response?.data?.success) {
      hideModal();
      reloadRequests();
    } else {
      showModal(
        <ModalComponent>
          {response?.response?.data?.error?.message}
        </ModalComponent>
      );
    }
  };
  const cancelAid = async () => {
    const response = await cancelAidRquest(userId, data.id);

    if (response?.data?.success) {
      hideModal();
      reloadRequests();
    } else {
      showModal(
        <ModalComponent>
          {response?.response?.data?.error?.message}
        </ModalComponent>
      );
    }
  };
  return (
    <div
      key={data.id}
      className={` ${
        neededToShow
          ? "border-[var(--misc)] border-4"
          : "border-[var(--link)] border-2"
      } rounded-sm flex flex-col gap-2 px-4 py-4  my-4 `}
    >
      <div className="flex gap-2 items-end overflow-hidden whitespace-nowrap truncate">
        <div className="h3 capitalize">
          {surname + " " + firstname.split("")[0] + "."}
        </div>
        <div className="text-[20px] font-light capitalize">
          {data.region + ", " + data.town}
        </div>
      </div>
      <div className="h4 font-semibold">png {data.directionOfAssistance}</div>
      <div className="h5 font-bold overflow-hidden whitespace-nowrap truncate">
        {data.descriptionOfAid}
      </div>
      <div className="flex gap-6 justify-between">
        {requestAcceptMode ? (
          <CustomButton
            callback={() => {
              showModal(
                <RequestModal
                  onCancel={() => router.refresh()}
                  onConfirm={() => sendAid()}
                  title={"Ви впевнені, що хочете взяти цю заявку в роботу?"}
                  desc={
                    "Після того, як ви погодитеся, заявку не зможе взяти в роботу інша особа. Ви беретете на себе всю відповідальність за її виконання."
                  }
                ></RequestModal>
              );
              //
              // reloadRequests();
            }}
            bgColor={"bg-[var(--success)]"}
            p={"py-2 px-4"}
            text={"text-[var(--primary)]"}
            textClass={"h4"}
            w={"w-full"}
          >
            Взяти в роботу
          </CustomButton>
        ) : userRole === "user" ? (
          data.completed ? (
            ""
          ) : (
            <CustomButton
              callback={() => {
                showModal(
                  <RequestModal
                    bgColor={"bg-[#8D1818]"}
                    onConfirm={() => cancelAid()}
                    onCancel={() => {
                      hideModal();
                    }}
                    title={"Ви впевнені, що хочете скасувати цю заявку?"}
                    desc={"Після цього вона буде видалена з активного списку."}
                  ></RequestModal>
                );
              }}
              bgColor={"bg-[#8D1818]"}
              p={"py-2 px-4"}
              text={"text-[var(--primary)]"}
              textClass={"h4"}
              w={"w-full"}
            >
              Скасувати заявку
            </CustomButton>
          )
        ) : (
          !data.completed && (
            <CustomButton
              callback={() => {
                showModal(
                  <RequestModal
                    onCancel={() => hideModal()}
                    onConfirm={() => completeAid()}
                    title={
                      "Ви впевнені, що хочете позначити цю заявку як виконану?"
                    }
                    desc={
                      "Після цього дії повернути заявку в активний стан буде неможливо."
                    }
                  ></RequestModal>
                );

                reloadRequests();
              }}
              bgColor={"bg-[var(--success)]"}
              p={"py-2 px-4"}
              text={"text-[var(--primary)]"}
              textClass={"h4"}
              w={"w-full"}
            >
              Позначити як виконане
            </CustomButton>
          )
        )}
        <CustomButton
          callback={() => {
            showModal(<RequestInfo data={data}></RequestInfo>);
          }}
          bgColor={"bg-[var(--misc)]"}
          p={"py-2 px-4"}
          text={"text-[var(--primary)] "}
          textClass={"h4"}
          w={"w-full"}
        >
          Детальніше
        </CustomButton>
        {hasMapPoint ? (
          <CustomButton
            p={"py-2 px-4 border-2 border-[var(--link)]"}
            text={"text-[var(--secondary)]"}
            textClass={"h4"}
            w={"w-full"}
            callback={() => {
              setMapTarget({
                lat: data?.coordinates?.lat,
                lng: data?.coordinates?.lng,
                mapUpdateId: new Date(),
              });
            }}
          >
            Показати на карті
          </CustomButton>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default AidRequest;
