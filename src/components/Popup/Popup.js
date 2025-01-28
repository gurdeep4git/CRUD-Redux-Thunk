import React from "react";
import ReactDOM from "react-dom";
import './Popup.css'

const Popup = ({closeModal, deleteConfirm}) => {
  
  const onNoClick = () => {
    closeModal()
  }

  const onYesClick = () => {
    deleteConfirm()
  }

  return ReactDOM.createPortal(
    <>
      <div className="ModalShadow" />
      <div className="ModalContainer">
        <div className="ModalBanner bg-info">Delete</div>
        <div className="ModalContent">
          Are you sure?
        </div>
        <div className="ModalFooter">
          <button onClick={onNoClick} type="button" className="btn btn-primary me-3">No</button>
          <button onClick={onYesClick} type="button" className="btn btn-danger">Yes</button>
        </div>
      </div>
    </>,
    document.body
  );
};

export default Popup;
