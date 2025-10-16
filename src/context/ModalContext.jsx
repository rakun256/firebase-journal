import { createContext, useContext, useState, useMemo } from "react";
import Modal from "../components/Modal";

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [content, setContent] = useState(null);
  const [ariaLabel, setAriaLabel] = useState(undefined);
  const [disableOutsideClose, setDisableOutsideClose] = useState(false);

  const isOpen = !!content;

  const openModal = (args) => {
    if (typeof args === "object" && args.content) {
      setContent(args.content);
      setAriaLabel(args.ariaLabel);
      setDisableOutsideClose(!!args.disableOutsideClose);
    } else {
      setContent(args);
      setAriaLabel(undefined);
      setDisableOutsideClose(false);
    }
  };

  const closeModal = () => setContent(null);

  const value = useMemo(() => ({ openModal, closeModal, isOpen }), [isOpen]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        ariaLabel={ariaLabel}
        disableOutsideClose={disableOutsideClose}
      >
        {content}
      </Modal>
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within a ModalProvider");
  return ctx;
}