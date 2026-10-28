import React, { useEffect } from "react";
import { MdDeleteOutline, MdClose } from "react-icons/md";

/**
 * Professional Delete Confirmation Modal
 * Replaces browser native window.confirm() dialogs with a
 * polished, branded confirmation modal.
 */
const DeleteConfirmModal = ({
  isOpen,
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  itemName = "",
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onClose,
}) => {
  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !loading) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, loading, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={() => {
        if (!loading) onClose();
      }}
    >
      <div
        className="bg-[#FAF7F2] border border-[#e3d7c5] rounded-3xl shadow-2xl w-full max-w-md p-6 sm:p-7 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-xl hover:bg-gray-200/60 transition cursor-pointer disabled:opacity-40"
          title="Close"
        >
          <MdClose className="text-xl" />
        </button>

        {/* Warning Icon Badge */}
        <div className="w-16 h-16 rounded-2xl bg-red-100/80 border border-red-200/70 flex items-center justify-center text-red-600 text-3xl mx-auto mb-4 shadow-sm">
          <MdDeleteOutline />
        </div>

        {/* Title */}
        <h3 className="text-xl font-serif font-bold text-[#121d27] text-center">
          {title}
        </h3>

        {/* Message */}
        <p className="text-sm text-gray-500 text-center mt-2 leading-relaxed max-w-sm mx-auto">
          {message}
        </p>

        {/* Highlighted item name badge (if provided) */}
        {itemName && (
          <div className="mt-4 px-4 py-2.5 rounded-xl bg-white border border-[#e8dfd3] flex items-center justify-center text-center shadow-xs">
            <span className="text-xs font-semibold text-[#121d27] truncate max-w-xs">
              {itemName}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="w-full py-2.5 rounded-xl text-xs font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition cursor-pointer disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition cursor-pointer shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <MdDeleteOutline className="text-base" />
                <span>{confirmText}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;

