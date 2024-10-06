import React from "react";
import Modal from "react-modal";

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  imageUrl: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onRequestClose,
  imageUrl,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      style={{
        overlay: {
          zIndex: 1000, // Set your desired z-index here
        },
        content: {
          zIndex: 1001, // Set your desired z-index here
        },
      }}
    >
      <div className="flex flex-col justify-center items-center h-full">
        <button
          onClick={onRequestClose}
          className="self-end mb-4 p-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
        <img src={imageUrl} alt="Full view" className="max-w-full max-h-full" />
      </div>
    </Modal>
  );
};

export default ImageModal;
