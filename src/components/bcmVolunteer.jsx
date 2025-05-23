import ModalComponent from "./defaultModalComponent";
import CustomButton from "./button";
import DragDropInput from "./dragDropInput";
import { useState } from "react";
import { becomeVolunteer } from "@/func/requests";
import { useRouter } from "next/navigation";
import { useModal } from "@/func/modalContext";
function BecomeVolunteeerComponent({ userId }) {
  const [file, setFile] = useState(null);
  const router = useRouter();
  const { showModal, hideModal } = useModal();
  const sendVolunteerFile = async () => {
    const data = await becomeVolunteer(userId, { file: file });
    if (data?.data?.success) {
      router.refresh();
    } else {
      showModal(
        <ModalComponent>{data?.response?.data?.error?.message}</ModalComponent>
      );
    }
  };
  return (
    <ModalComponent>
      <div className="max-h-screen flex flex-col items-center">
        <div className="h1">Стати волонтером</div>
        <div className="h4Nb">
          Щоб стати волонтером, будь ласка, надайте необхідні документи. Вам
          потрібно завантажити копію волонтерського посвідчення або інший
          документ, який підтверджує вашу кваліфікацію. Це важливий крок, щоб ми
          могли швидко і безпечно розподілити вас для допомоги тим, хто потребує
          підтримки.
        </div>
        <DragDropInput
          file={file}
          setFile={(e) => setFile(e)}
          wIcon={false}
          maxH={"250px"}
        ></DragDropInput>
        <div className="h4Nb text-[var(--link)]">
          Приклади документів: волонтерське посвідчення, сертифікати, інші
          підтвердження.
        </div>
        <div className="h4Nb">
          Всі надані документи будуть перевірені. Після цього ви отримаєте
          підтвердження статусу волонтера. Ви зможете допомагати людям, які
          потребують вашої підтримки.
        </div>
        <CustomButton
          callback={() => sendVolunteerFile()}
          p={"border-2 border-[var(--link)] px-8 py-2"}
          textClass={"h4Nb"}
          isInactive={file === null}
        >
          Відправити
        </CustomButton>
      </div>
    </ModalComponent>
  );
}

export default BecomeVolunteeerComponent;
