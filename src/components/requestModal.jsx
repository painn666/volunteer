import ModalComponent from "./defaultModalComponent";
import CustomButton from "./button";
function RequestModal({ title, desc, onConfirm, onCancel, bgColor }) {
  return (
    <ModalComponent>
      <div className="h3 text-center">{title}</div>
      <div className="h4Nb">{desc}</div>
      <div className="flex items-center justify-between gap-4 ">
        <CustomButton
          callback={() => {
            onCancel();
          }}
          bgColor={"bg-gray-300"}
          p={"px-4 py-2"}
          textClass={"h4Nb"}
        >
          Повернутися назад
        </CustomButton>
        <CustomButton
          callback={() => {
            onConfirm();
          }}
          p={"px-4 py-2"}
          text={"text-[var(--primary)]"}
          bgColor={`${bgColor ? bgColor : "bg-[var(--misc)]"}`}
          textClass={"h4Nb"}
        >
          Підтвердити
        </CustomButton>
      </div>
    </ModalComponent>
  );
}

export default RequestModal;
