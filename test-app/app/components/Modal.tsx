
import React from "react";

export default function Modal({ message, onClose }: { message: string, onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="bg-[#2c2c2c] text-[#f0f0f0] p-6 rounded-lg shadow-lg max-w-lg w-full border-[#6f7d59] border-2"
        role="dialog"
        aria-modal="true"
      >
        <p>{message}</p>
        <button
          className="mt-4 bg-[#5c6b48] text-[#f0f0f0] p-2 rounded hover:bg-[#6f7d59] transition-colors"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}