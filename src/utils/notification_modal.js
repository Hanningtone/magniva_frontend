import { Modal } from "react-bootstrap";

const CustomModalPaneNotify = (props) => {
    return (
        <Modal  show={props.show} className={"modal fade"} id={props?.target} tabIndex="-1" role="dialog" aria-labelledby="default-modal-pane" aria-hidden="true">
          <div className={`modal-dialog-centered ${props.class_name || "" }`}  role="document">
            <div className="modal-content">
              <Modal.Header className="modal-header">
                <h5 className="modal-title" id="default-modal-pane">{props?.title}</h5>
                <button type="button" className="btn btn-outline-danger" data-dismiss="modal" aria-label="Close" onClick={props.hideThisModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </Modal.Header>
              <Modal.Body className="">
                 {props?.children}
              </Modal.Body>
            </div>
          </div>
        </Modal>
    )
}

export default CustomModalPaneNotify;