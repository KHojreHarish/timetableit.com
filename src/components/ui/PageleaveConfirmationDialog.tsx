import React from "react";

const Modal = ({ children, onClose }: any) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md px-8 py-6">
          {children}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="text-gray-400 hover:text-red-500 focus:outline-none"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 shadow-sm disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:focus:ring-0"
              onClick={onClose}
            >
              Leave
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
