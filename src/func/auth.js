import { useAuth } from "../func/authContext";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export function useAuthActions() {
  const { setIsLogged, setUserData } = useAuth(); // Получаем функции из контекста
  const loginWithEmailPassword = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/auth/local`, {
        email: data.email,
        password: data.password,
      });

      const token = response.data.jwt;
      localStorage.setItem("JWTtoken", token);
      localStorage.setItem("isLoggedEver", true);

      setIsLogged(true); // Устанавливаем статус "вошел"
      setUserData(response.data.user);
      console.log(response.data.user);

      // Уведомление об успешном логине
      // showSnackbar("Login successful!", "success");
      return response.data;
      // Перенаправляем на страницу пользователя
    } catch (error) {
      // Проверяем, содержит ли ошибка поле response
      if (error.response) {
        // showModal(
        //   <ModalWithBG isError>{error.response.data.error.message}</ModalWithBG>
        // );
        return error.response.data; // Возвращаем данные ошибки
      } else {
        console.error("Ошибка сети или другая проблема:", error);
        return null;
      }
    }
  };

  const registerWithEmailPassword = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        phone: data.number,
        password: data.password,
        email: data.email,
        firstname: data.firstName,
        surname: data.surname,
        phone: data.phone,
        gender: data.gender,
        birthDate: data.birthDate,
      });

      const token = response.data.jwt;
      localStorage.setItem("JWTtoken", token);
      localStorage.setItem("isLoggedEver", true);

      setIsLogged(true); // Устанавливаем статус "вошел"
      setUserData(response.data.user);
      // Уведомление об успешной регистрации
      // showSnackbar("Registration successful!", "success");
      return response.data;
      // Перенаправляем на страницу пользователя
    } catch (error) {
      // Проверяем, содержит ли ошибка поле response
      if (error.response) {
        console.error(error.response.data);
        // showModal(
        //   <ModalWithBG isError>{error.response.data.error.message}</ModalWithBG>
        // );
        return error.response.data; // Возвращаем данные ошибки
      } else {
        console.error("Ошибка сети или другая проблема:", error);
        return null;
      }
    }
  };
  return { loginWithEmailPassword, registerWithEmailPassword };
}
