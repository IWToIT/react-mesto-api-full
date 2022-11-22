const PopuoWithState = ({resStatus, isOpen, onClose, mestoAuthMessage}) => {
  return (
    <div className={`popup popup_type_edit-state ${isOpen && 'popup_open'}`} onClick={onClose}>
      <div className="popup__container popup__container_type_edit-state" onClick={(e) => {
        e.stopPropagation();
      }}
      >
        <button className="popup__btn-close" aria-label="Закрытие формы" type="button" onClick={onClose}></button>
        <div className={`popup__res-status popup__res-status_type_${resStatus && 'res-ok'}`}></div>
        <p className="popup__message">
          {mestoAuthMessage}
        </p>
      </div>
    </div>
  );
}

export default PopuoWithState;