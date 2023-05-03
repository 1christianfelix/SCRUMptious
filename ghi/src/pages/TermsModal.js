import React, { useState, useRef, useEffect } from "react";

const TermsModal = ({ isOpen, closeModal, onAccept, onDecline }) => {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const contentRef = useRef();

  const handleAccept = () => {
    closeModal();
    onAccept();
  };

  const handleDecline = () => {
    closeModal();
    setTermsAccepted(false);
    onDecline();
  };

  useEffect(() => {
    const contentEl = contentRef.current;
    if (contentEl) {
      const { scrollTop, scrollHeight, clientHeight } = contentEl;
      const bottomReached = scrollTop + clientHeight >= scrollHeight;
      setIsScrolledToBottom(bottomReached);
    }
  }, [isOpen]);

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    const bottomReached = scrollTop + clientHeight >= scrollHeight;
    setIsScrolledToBottom(bottomReached);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className={`${
          isScrolledToBottom ? "bg-gray-300" : "bg-white"
        } p-8 rounded-lg w-96 relative transition-colors duration-300`}
      >
        <button
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-xl transition-transform duration-200 hover:scale-110"
          onClick={closeModal}
        >
          &times;
        </button>
        <div class="text-center">
          <h2 class="text-2xl mb-4">Terms &amp; Conditions</h2>
        </div>
        <div
          className="mb-4"
          style={{ maxHeight: "200px", overflowY: "scroll" }}
          onScroll={handleScroll}
          ref={contentRef}
        >
          <div className="modal-content">
            <p>
              Please read and accept our Terms & Conditions before signing up.
            </p>
            <br></br>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <br></br>
            <p>I solemnly swear that I am to no good.</p>
            <p>I solemnly swear that I am to no good.</p>
            <p>I solemnly swear that I am to no good.</p>
            <br></br>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className={`${
                isScrolledToBottom
                  ? "bg-blue-700 hover:bg-blue-800"
                  : "bg-blue-300 hover:bg-blue-400"
              } transition-colors duration-300 px-4 py-2 rounded-md text-white mr-2`}
              onClick={handleAccept}
              disabled={!isScrolledToBottom}
              style={{ fontWeight: "bold" }}
            >
              Accept
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 transition-colors duration-300 px-4 py-2 rounded-md text-white ml-2"
              onClick={handleDecline}
              style={{ fontWeight: "bold" }}
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
