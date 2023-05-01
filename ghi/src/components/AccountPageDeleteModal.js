import React, { useState, useEffect } from "react";

const DeleteConfirmationModal = ({
  show,
  onConfirm,
  onCancel,
  cancelButtonClassName,
  confirmButtonClassName,
}) => {
  const [showBarTimer, setShowBarTimer] = useState(false);
  const [timerWidth, setTimerWidth] = useState(0);
  const [clickedConfirm, setClickedConfirm] = useState(false);

  useEffect(() => {
    if (clickedConfirm) {
      setShowBarTimer(true);
      const timerInterval = setInterval(() => {
        setTimerWidth((prev) => (prev >= 100 ? 100 : prev + 1));
      }, 10);
      const timeout = setTimeout(() => {
        setShowBarTimer(false);
        setTimerWidth(0);
        onConfirm();
      }, 1500);
      return () => {
        clearInterval(timerInterval);
        clearTimeout(timeout);
      };
    }
  }, [clickedConfirm, onConfirm]);

  if (!show) return null;

  return (
    <div className="delete-modal">
      <div className="delete-modal-content">
        {showBarTimer ? (
          <div
            className="bar-timer w-full bg-gray-300 py-1 mb-4 rounded"
            style={{ height: "3rem" }}
          >
            <div
              className="bg-green-500 text-white text-center h-full rounded transition-all duration-500"
              style={{ width: `${timerWidth}%` }}
            >
              Deleting User
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-center">Confirm Deletion</h2>
            <div className="buttons mt-4 text-right">
              <button
                className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4 ${confirmButtonClassName}`}
                onClick={() => setClickedConfirm(true)}
                style={{ float: "right" }}
              >
                Confirm
              </button>
              <button
                className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${cancelButtonClassName}`}
                onClick={onCancel}
                style={{ float: "right" }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
