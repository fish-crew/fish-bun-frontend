import React from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className="title text-sz35 font-semibold text-[#1069b0]">
            {title}
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 stroke-[1.5px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className={styles.modalBody}>
          {typeof children === "string" ? (
            <div dangerouslySetInnerHTML={{ __html: children }} />
          ) : Array.isArray(children) ? (
            children.map((child, index) =>
              typeof child === "string" ? (
                <div key={index} dangerouslySetInnerHTML={{ __html: child }} />
              ) : (
                <div key={index}>{child}</div>
              )
            )
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  title: PropTypes.string,
};

Modal.defaultProps = {
  children: null,
  title: "",
};

export default Modal;
