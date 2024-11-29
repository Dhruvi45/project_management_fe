// components/ConfirmationDialog.tsx
import { FaExclamationCircle, FaTrashAlt } from "react-icons/fa";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  title: string;
}

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  title,
}:ConfirmationDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-md transform transition-transform duration-300 scale-95 hover:scale-100">
        {/* Title and Icon */}
        <div className="flex items-center mb-4">
          <FaExclamationCircle className="text-yellow-500 mr-3 text-3xl" />
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>

        {/* Message */}
        <p className="text-gray-700 mb-6">{message}</p>

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <button
            className="flex-1 py-2 px-4 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none transition duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex-1 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none transition duration-200"
            onClick={onConfirm}
          >
            <FaTrashAlt className="mr-2 inline-block" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
