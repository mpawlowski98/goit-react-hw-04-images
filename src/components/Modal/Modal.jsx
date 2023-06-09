import React from 'react';
import { useRef, useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, imageUrl }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleBehindClick = e => {
      if (!modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleBehindClick);
    } else {
      document.removeEventListener('mousedown', handleBehindClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleBehindClick);
    };
  }, [isOpen, onClose]);

  const handleImageClick = () => {
    onClose();
  };

  return isOpen ? (
    <div className={css.Overlay}>
      <div className={css.Modal} ref={modalRef}>
        <img src={imageUrl} alt={imageUrl} onClick={handleImageClick} />
      </div>
    </div>
  ) : null;
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  imageUrl: PropTypes.string,
};

export default Modal;
