import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

// Global custom event name for triggering toasts from anywhere in the app
const TOAST_EVENT = "COFFEE_SHOP_TOAST_EVENT";

// Universal toast dispatch helper
export const toast = {
  show: (options) => {
    window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: options }));
  },
  error: (message, title = "Oh Snap!", actionText = "Try again", onAction) => {
    window.dispatchEvent(
      new CustomEvent(TOAST_EVENT, {
        detail: {
          type: "error",
          title: title || "Oh Snap!",
          message: typeof message === "string" ? message : "Something went wrong",
          actionText: actionText || "Try again",
          onAction,
          duration: 4500,
        },
      })
    );
  },
  success: (message, title = "Success!", actionText = "OK", onAction) => {
    window.dispatchEvent(
      new CustomEvent(TOAST_EVENT, {
        detail: {
          type: "success",
          title: title || "Success!",
          message: typeof message === "string" ? message : "Action completed successfully!",
          actionText: actionText || "OK",
          onAction,
          duration: 4000,
        },
      })
    );
  },
  warning: (message, title = "Heads up!", actionText = "Got it", onAction) => {
    window.dispatchEvent(
      new CustomEvent(TOAST_EVENT, {
        detail: {
          type: "warning",
          title: title || "Heads up!",
          message: typeof message === "string" ? message : "Please review the input.",
          actionText: actionText || "Got it",
          onAction,
          duration: 4000,
        },
      })
    );
  },
  info: (message, title = "Notice", actionText = "OK", onAction) => {
    window.dispatchEvent(
      new CustomEvent(TOAST_EVENT, {
        detail: {
          type: "info",
          title: title || "Notice",
          message: typeof message === "string" ? message : "",
          actionText: actionText || "OK",
          onAction,
          duration: 4000,
        },
      })
    );
  },
};

const ToastItem = ({ item, onRemove }) => {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, item.duration || 4500);

    return () => clearTimeout(timer);
  }, [item.duration]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onRemove(item.id);
    }, 220);
  };

  const handleAction = () => {
    if (item.onAction) {
      item.onAction();
    }
    handleClose();
  };

  return (
    <div
      className={`relative w-[360px] max-w-[92vw] bg-white rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.16)] border border-gray-100 overflow-hidden pointer-events-auto transition-all duration-200 ease-out ${
        closing
          ? "opacity-0 -translate-y-2 scale-95"
          : "opacity-100 translate-y-0 scale-100"
      }`}
      style={{
        animation: !closing ? "customToastSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)" : undefined,
      }}
    >
      <div className="p-4 pr-3.5 flex items-start justify-between gap-3">
        {/* Left Text: Title & Message */}
        <div className="flex-1 min-w-0 pr-1">
          <h4 className="text-[17px] font-bold text-gray-900 tracking-tight leading-snug">
            {item.title}
          </h4>
          <p className="text-[14px] text-[#6b7280] font-normal mt-1 leading-relaxed break-words">
            {item.message}
          </p>
        </div>

        {/* Right Side: Close (X) & Action Button */}
        <div className="flex flex-col items-end gap-3 shrink-0">
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition cursor-pointer p-0.5 rounded-md hover:bg-gray-100"
            title="Close"
          >
            <IoClose className="text-xl" />
          </button>

          {item.actionText && (
            <button
              onClick={handleAction}
              className="bg-[#121d27] hover:bg-black text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow cursor-pointer active:scale-95"
            >
              {item.actionText}
            </button>
          )}
        </div>
      </div>

      {/* Bottom Gradient Progress Bar */}
      <div className="w-full h-[3.5px] bg-gray-100 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#2dd4bf] via-[#818cf8] to-[#f472b6]"
          style={{
            animation: `customToastProgress ${item.duration || 4500}ms linear forwards`,
          }}
        />
      </div>
    </div>
  );
};

export default function ToastNotification() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToastEvent = (e) => {
      const newToast = {
        id: Date.now() + Math.random().toString(36).substr(2, 9),
        ...e.detail,
      };
      setToasts((prev) => [...prev, newToast]);
    };

    window.addEventListener(TOAST_EVENT, handleToastEvent);
    return () => window.removeEventListener(TOAST_EVENT, handleToastEvent);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <>
      <style>{`
        @keyframes customToastProgress {
          from { width: 100%; }
          to { width: 0%; }
        }
        @keyframes customToastSlideIn {
          from {
            opacity: 0;
            transform: translateY(-14px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      {/* Floating container positioned top-right with high z-index */}
      <div className="fixed top-5 right-5 z-[99999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((item) => (
          <ToastItem key={item.id} item={item} onRemove={removeToast} />
        ))}
      </div>
    </>
  );
}
