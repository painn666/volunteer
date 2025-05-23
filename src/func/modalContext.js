"use client";
import React, { createContext, useContext, useState } from "react";
import Modal from "@/components/modal";
// Создаем контекст для модального окна
const ModalContext = createContext();

// Провайдер, который будет оборачивать приложение и предоставлять функции управления модальным окном
export const ModalProvider = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const showModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal visible={modalVisible} setVisible={hideModal}>
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  );
};

// Хук для использования ModalContext
export const useModal = () => {
  return useContext(ModalContext);
};
