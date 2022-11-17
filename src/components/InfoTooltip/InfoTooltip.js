import { useEffect } from "react";
import "./InfoTooltip.css";

import imgSuccessPath from "../../images/InfoTooltip/tooltip-success.svg";
import imgErrorPath from "../../images/InfoTooltip/tooltip-error.svg";

export default function InfoTooltip({
  onClose,
  isOpen,
  submitStatus,
  isSubmitSuccessful,
}) {
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
    }
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [isOpen]);

  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      onClose();
    }
  }

  function handleCloseByOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`popup ${isOpen && "popup_opened"}`}
      onClick={handleCloseByOverlayClick}>
      <div className='tooltip popup__container'>
        <img
          className='tooltip__image'
          src={isSubmitSuccessful ? imgSuccessPath : imgErrorPath}
          alt={isSubmitSuccessful ? "успешно" : "ошибка"}
        />
        <h2 className='tooltip__text'>{submitStatus}</h2>
        <button
          className='button popup__close-icon'
          type='button'
          onClick={onClose}></button>
      </div>
    </div>
  );
}
