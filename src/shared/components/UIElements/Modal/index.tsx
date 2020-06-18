import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "../Backdrop";
import styles from "./style.module.scss";

type ModalOverlayProps = {
  header: string;
  onSubmit?: () => void;
  footer: any;
  footerClass?: string;
};

const ModalOverlay: React.FC<ModalOverlayProps> = ({
  header,
  onSubmit,
  children,
  footer,
  footerClass,
}) => {
  const content = (
    <div className={styles.modal}>
      <header className={styles.modalHeader}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : (event) => event.preventDefault()}>
        <div className={styles.modalContent}>{children}</div>
        <footer className={[styles.modalFooter, footerClass].join(" ")}>
          {footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal")!);
};

interface ModalProps {
  show: boolean;
  onCancel: () => void;
  header: string;
  onSubmit?: () => void;
  footer: any;
  footerClass?: string;
}

const Modal: React.FC<ModalProps> = ({
  show,
  onCancel,
  header,
  onSubmit,
  footer,
  children,
  footerClass,
}) => {
  return (
    <React.Fragment>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition
        in={show}
        timeout={200}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: styles.modalEnter,
          enterActive: styles.modalEnterActive,
          exit: styles.modalExit,
          exitActive: styles.modalExitActive,
        }}
      >
        <ModalOverlay
          header={header}
          footerClass={footerClass}
          onSubmit={onSubmit}
          footer={footer}
        >
          {children}
        </ModalOverlay>
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
