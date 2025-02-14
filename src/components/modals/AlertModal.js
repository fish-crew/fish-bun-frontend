import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

let showAlert = () => {};

const AlertModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [onCloseCallback, setOnCloseCallback] = useState(null);
  const [viewContainer, setViewContainer] = useState(null);

  useEffect(() => {
    let container = document.querySelector(".main-area");
    setViewContainer(container);

    // showAlert를 전역 함수로 등록 (콜백 기능 추가)
    showAlert = (msg, onClose = null) => {
      setMessage(msg);
      setOnCloseCallback(() => onClose); // 콜백 저장
      setIsOpen(true);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (onCloseCallback) {
      onCloseCallback(); // 모달이 닫힌 후 콜백 실행
    }
  };

  if (!isOpen || !viewContainer) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.alertModalContent}>
        <p className="text-sz25 mb-2 text-center break-keep">{message}</p>
        <button
          className="
          mt-4 bg-[#1069b0] hover:bg-white hover:text-[#1069b0] text-white 
          border-4 py-2 px-6 rounded-full text-sz25 tracking-[.25em] w-72 
          flex items-center gap-2 justify-center w-full"
          onClick={handleClose} //
        >
          확인
        </button>
      </div>
    </div>,
    viewContainer
  );
};

export { showAlert };
export default AlertModal;
