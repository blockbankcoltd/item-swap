import React from "react";
import { Modal } from "react-bootstrap";
const SuccessModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton></Modal.Header>
      <div className="modal-body space-y-20 pd-40">
        <h3 className="text-center">{props.title}</h3>
        <p className="text-center">{props.description}</p>
        <button className="btn btn-primary"> Okay</button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
