"use client"
import React, { ReactNode } from 'react';
import './Modal.css';
// import CancelIcon from '@/components/svgicon/cancel';

type ModalProps = {
  isOpen: boolean;
  xBotton: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children,xBotton}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay bg-[rgba(255,255,255,0.10)] backdrop-blur-[8px] shadow-[0_8px_15px_14px_rgba(24,39,75.16)] flex items-center justify-center  duration-100 animate-fadeinfast z-[10]">
      <div className="modal-content shadow-[0_2px_21px_3px_rgba(0,0,0,0.16)]">
      {xBotton?<button className="close-button" onClick={onClose}>
        <p className='text-black'>X</p>
        </button>:null}
        {children}
      </div>
    </div>
  );
};

export default Modal;

