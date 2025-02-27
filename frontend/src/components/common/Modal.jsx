import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = "max-w-lg",
  className = "",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white rounded-lg shadow-lg ${width} w-full mx-4 ${className}`}
      >
        {/* 標題區域 */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            ✕
          </button>
        </div>

        {/* 內容區域 */}
        <div className="p-4">{children}</div>

        {/* 底部區域 */}
        {footer && (
          <div className="flex justify-end p-4 border-t">{footer}</div>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  width: PropTypes.string,
  className: PropTypes.string,
};

Modal.defaultProps = {
  title: "Modal",
  width: "max-w-lg",
};

// 可選：封裝一個簡單的預設底部按鈕
Modal.DefaultFooter = ({ onConfirm, onCancel }) => (
  <>
    <Button variant="secondary" onClick={onCancel} className="mr-2">
      取消
    </Button>
    <Button variant="primary" onClick={onConfirm}>
      確認
    </Button>
  </>
);

export default Modal;
