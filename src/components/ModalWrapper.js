import "../styles/ModalWrapper.css";

const ModalWrapper = ({ children, closeCb }) => {
  return (
    <div onClick={closeCb} className="modal-wrapper">
      {children}
    </div>
  );
};

export default ModalWrapper;
