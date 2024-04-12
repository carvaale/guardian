import { Modal } from "react-bootstrap";
import { ModalHookProps } from "../types/ModalHookProps";



export const ModalHook: React.FC<ModalHookProps> = ({ show, onDelete, onCancel }) => {

  const handleDelete = () => {
      onDelete();
  };

  const handleClose = () => {
    console.log("I am in handleClose")
    onCancel();
  };

  return (
    <Modal
      
      show={show}
      centered
      onHide={handleClose}
      className={`
        fixed inset-0  transition-colors !flex !justify-center !items-center
        ${show ? "visible bg-black/20" : "invisible"}
      `}
    >
      <div
        className={`
          bg-white rounded-xl shadow p-6 transition-all text-center w-56
          ${show ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <div className="mx-auto my-4 w-48">
          <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this user?
          </p>
        </div>
        <div className="flex gap-4">
          <button className="btn btn-danger w-full" onClick={handleDelete}>
            Delete
          </button>
          <button className="btn btn-light w-full" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};


