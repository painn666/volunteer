"use client";
import { useState } from "react";
import CustomInput from "@/components/customInput";
import CustomCheckbox from "@/components/customCheckbox";
import CustomButton from "@/components/button";
import { useAuthActions } from "@/func/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "@/func/authContext";
function LoginPage() {
  const { loginWithEmailPassword, registerWithEmailPassword } =
    useAuthActions();
  const [typeOfAuth, setTypeOfAuth] = useState("registration");
  const { userData, setUserData, setIsLogged } = useAuth();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("JWTtoken");
    const isLoggedEver = localStorage.getItem("isLoggedEver");
    if (token) {
      router.push("/profile");
    }
    if (isLoggedEver) {
      setTypeOfAuth("login");
    }
  }, []);
  const login = async () => {
    const data = await loginWithEmailPassword({
      email: email,
      password: password,
    });
    console.log(data);

    if (data.user) {
      router.push("/profile");
      setIsLogged(true);
      setUserData(data.user);
    }
  };
  const register = async () => {
    const data = await registerWithEmailPassword({
      firstName: name,
      surname: surname,
      phone: phone,
      email: email,
      birthDate: birthDate,
      password: password,
      gender: gender,
    });
    if (data.user) {
      router.push("/profile");
      setIsLogged(true);
      setUserData(data.user);
    }
  };

  return (
    <div className="flex flex-col  py-24 w-full h-screen container mx-auto gap-16 px-32">
      <div className="h1 flex gap-16 items-center justify-start">
        <div
          onClick={() => setTypeOfAuth("login")}
          className={`cursor-pointer `}
          style={{
            color: typeOfAuth === "login" ? "var(--misc)" : "var(--secondary)",
          }}
        >
          Вхід
        </div>
        <div
          onClick={() => setTypeOfAuth("registration")}
          className={`cursor-pointer `}
          style={{
            color:
              typeOfAuth === "registration"
                ? "var(--misc)"
                : "var(--secondary)",
          }}
        >
          Реєстрація
        </div>
      </div>
      {typeOfAuth == "registration" ? (
        <div className="flex flex-col gap-6 px-32 items-center">
          <div className="grid grid-cols-2 grid-rows-4 gap-x-28 gap-y-6 text-link">
            <CustomInput
              callback={(e) => {
                setName(e);
              }}
              placeholder="Ім'я"
            />
            <CustomInput
              callback={(e) => {
                setSurname(e);
              }}
              placeholder="Прізвище"
            />
            <CustomInput
              type={"number"}
              callback={(e) => {
                setPhone(e);
              }}
              placeholder="Телефон"
            />
            <CustomInput
              callback={(e) => {
                setEmail(e);
              }}
              placeholder="E-mail"
            />
            <CustomInput
              todayIsMin={false}
              type={"date"}
              callback={(e) => {
                setBirthDate(e);
              }}
              placeholder="Дата народження"
            />
            <div className="flex flex-row gap-3 items-center w-full justify-between max-w-[350px]">
              <div className="text-[var(--link)]">Стать</div>
              <CustomCheckbox
                callback={() => setGender(true)}
                state={gender ? true : false}
                label="Чоловік"
              />
              <CustomCheckbox
                callback={() => setGender(false)}
                label="Жінка"
                state={!gender && gender !== null ? true : false}
              />
            </div>
            <CustomInput
              callback={(e) => setPassword(e)}
              placeholder="Пароль *"
              type={"password"}
            />
            <CustomInput
              callback={(e) => setConfirmPassword(e)}
              placeholder="Повторити пароль *"
              type={"password"}
            />
          </div>
          {/* <div className="flex flex-row gap-2 text-link">
            <input
              className="w-24 bg-[var(--link)] text-[var(--primary)] px-2 text-ellipsis overflow-hidden whitespace-nowrap"
              accept="image/png, image/jpeg"
              type="file"
            ></input>
            <label>Заванатажити посвідчення волонтера</label>
          </div> */}
          <div className="h5 text-[var(--link)]">
            Реєструючись, ви погоджуєтесь з умовами використання та політикою
            обробки персональних даних.
          </div>
          <div className="flex flex-row gap-2 ">
            <CustomButton
              callback={() => {
                register();
              }}
              bgColor={"bg-[var(--secondary)] "}
              text={"text-[var(--primary)]"}
              textClass={"h5"}
              p={"py-2 px-8"}
            >
              ЗАРЕГЕСТРУВАТИСЯ
            </CustomButton>
            <CustomButton
              bgColor={"bg-[var(--primary)] "}
              text={"text-[var(--link)]"}
              textClass={"h5"}
              p={"py-2 px-8"}
            >
              ВІДНОВИТИ ДОСТУП
            </CustomButton>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 w-fit mx-auto">
          <div className="grid grid-cols-1 grid-rows-2 gap-6 text-link">
            <CustomInput
              callback={(e) => {
                setEmail(e);
              }}
              placeholder="E-mail"
            />
            <CustomInput
              callback={(e) => {
                setPassword(e);
              }}
              type="password"
              placeholder="Пароль *"
            />

            <div className="max-w-[500px] h5 text-[var(--link)]">
              Натискаючи “Увійти”, ви погоджуєтесь з умовами використання та
              обробкою персональних даних.
            </div>
          </div>
          <div className="flex flex-col gap-2  items-center">
            <CustomButton
              bgColor={"bg-[var(--secondary)] "}
              text={"text-[var(--primary)]"}
              textClass={"h5"}
              p={"py-2 px-8"}
              w={"w-full"}
              callback={() => {
                login();
              }}
            >
              Увійти
            </CustomButton>
            <CustomButton
              bgColor={"bg-[var(--primary)] "}
              text={"text-[var(--link)]"}
              textClass={"h5"}
              p={"py-2 px-8"}
            >
              ВІДНОВИТИ ДОСТУП
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
