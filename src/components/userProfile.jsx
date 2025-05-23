import { useRouter } from "next/navigation";
import CustomButton from "./button";
import LinkTo from "./link";
import { useModal } from "@/func/modalContext";
import ModalComponent from "./defaultModalComponent";
import DragDropInput from "./dragDropInput";
const API_URL = process.env.NEXT_PUBLIC_URL;
import BecomeVolunteeerComponent from "./bcmVolunteer";
import {
  CheckIcon,
  CheckSquareIcon,
  RefreshIcon,
  DocumentIcon,
  FolderIcon,
  AidIcon,
  BecomeVolunteerIcon,
} from "@/icons/icons";
function UserProfile({ data }) {
  const router = useRouter();
  const { showModal, hideModal } = useModal();
  const handleRedirect = (route) => {
    router.push(`/profile/${route}`);
  };
  console.log(data);

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-2 items-center p-4">
        <img
          src={data.gender === true ? "/male.png" : "female.png"}
          alt=""
          className="w-[160px] h-[160px] rounded-full"
        />
        {/* <div className="w-[160px] h-[160px] bg-[var(--link)] rounded-full"></div> */}
        <div className="flex flex-col gap-2">
          <span className="h1">{data?.surname}</span>
          <span className="h1"> {data?.firstname}</span>
        </div>
      </div>
      <div className="h3">
        {data?.role?.name === "volunteer" ? (
          <div className="flex gap-2 items-center">
            <CheckIcon></CheckIcon> <div>Верифікований як волонтер</div>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <CheckIcon></CheckIcon> <div>Зареєстрован як користувач</div>
          </div>
        )}
        <span className="flex gap-2 items-center">
          <RefreshIcon></RefreshIcon>

          <div>
            Активних заявок:{" "}
            {data?.role?.name === "user"
              ? Array.isArray(data?.aid_requests)
                ? data?.aid_requests.length
                : 0
              : Array.isArray(data?.aid_requests_taken)
              ? data.aid_requests_taken.length
              : 0}
          </div>
        </span>
        {data?.role?.name === "volunteer" && (
          <span className="flex gap-2 items-center">
            <CheckSquareIcon></CheckSquareIcon> Виконано:{" "}
            {data?.aid_requests_taken.filter((item) => {
              return item.completed === true;
            }).length || 0}
          </span>
        )}
      </div>
      <div className="flex flex-col items-center gap-2 w-full">
        {data?.role?.name === "volunteer" ? (
          <LinkTo
            href={"/profile/requests"}
            bgColor={"bg-[var(--secondary)]"}
            p={"py-6 px-8"}
            w={"w-full"}
            text={""}
            callback={() => true}
          >
            <div className="flex gap-2 items-center text-[var(--primary)] h3 justify-center">
              <FolderIcon></FolderIcon>
              <div>Подивитися заяви</div>
            </div>
          </LinkTo>
        ) : (
          <CustomButton
            bgColor={"bg-[var(--secondary)]"}
            p={"py-6 px-8"}
            w={"w-full"}
            text={""}
            callback={() =>
              showModal(
                <BecomeVolunteeerComponent
                  userId={data.id}
                ></BecomeVolunteeerComponent>
              )
            }
          >
            <div className="flex gap-2 items-center text-[var(--primary)] h3 justify-center">
              <BecomeVolunteerIcon></BecomeVolunteerIcon>
              <div>Стати волонетром</div>
            </div>
          </CustomButton>
        )}
        {data?.role?.name === "volunteer" && (
          <LinkTo
            href={"/profile/createCollectionRequest"}
            bgColor={"bg-[var(--secondary)]"}
            p={"py-6 px-8"}
            w={"w-full"}
            text={""}
            callback={() => {
              true;
            }}
          >
            <div className="flex gap-2 items-center text-[var(--primary)] h3 justify-center">
              <AidIcon></AidIcon>
              <div>Оформити збір </div>
            </div>
          </LinkTo>
        )}
        <LinkTo
          href={"/profile/createRequest"}
          bgColor={"bg-[var(--secondary)]"}
          p={"py-6 px-8"}
          w={"w-full"}
          text={""}
          callback={() => handleRedirect("createRequest")}
        >
          <div className="flex gap-2 items-center text-[var(--primary)] h3 justify-center">
            <DocumentIcon></DocumentIcon>
            <div>Оформити заявку</div>
          </div>
        </LinkTo>
      </div>
    </div>
  );
}

export default UserProfile;
