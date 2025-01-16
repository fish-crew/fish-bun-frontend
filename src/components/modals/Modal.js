// Modal.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>
          {Array.isArray(children)
            ? children.map((child, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: child }} />
              ))
            : children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  title: PropTypes.string,
};

Modal.defaultProps = {
  children: null,
  title: "",
};

export default Modal;
