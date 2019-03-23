import React from "react";
import Modal from 'react-modal';

const defaultModalStyling = {
  content : {
    height                : "200px",
    width                 : "400px",
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const defaultContentStyling = {
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "blue"
}


export default (props) => {
  console.log('props @ errorLogin modal: ', props);

  let modalIsOpen = props.modalIsOpen ? props.modalIsOpen : false;
  let afterOpenModal = props.afterOpenModal ? props.afterOpenModal : null;
  let closeModal = props.closeModal ? props.closeModal : null;
  let modalStyling = props.modalStyling ? props.modalStyling : defaultModalStyling;
  let contentStyling = props.contentStyling ? props.contentStyling : defaultContentStyling;
  let title = props.title ? props.title : 'Attention!';
  let message = props.message ? props.message : '...';
  let buttonOkText = props.buttonOkText ? props.buttonOkText : "OK";
  
  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={modalStyling}
      contentLabel={props.contentLabel}
      // TEMP setting to hide warning - Set appElement to fix the warning
      ariaHideApp={false}
    >
      <div style={contentStyling}>
        <h2 style={{position: "absolute", top: 5}}>{title}</h2>
        <p>{message}</p>
        <button style={{position: "absolute", bottom: 5}} onClick={props.closeModal}>{buttonOkText}</button>
      </div>
    

    </Modal>
  );
}