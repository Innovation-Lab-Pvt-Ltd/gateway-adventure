import React from "react";
import { MessageCircle, X } from "lucide-react";

const Whatsapp = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="relative w-full max-w-sm min-h-[600px] rounded-2xl bg-white px-7 py-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Chat Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2F6B4F]/10 text-[#2F6B4F]">
            <MessageCircle size={34} strokeWidth={2} />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Talk to a local expert
        </h2>

        {/* Description */}
        <p className="mt-3 text-center text-sm leading-6 text-gray-500">
          Leave your details and we'll open WhatsApp for you — a real
          Himalayan guide replies within 2 hours.
        </p>

        {/* Form */}
        <div className="mt-8 space-y-5">
          {/* Name */}
          <div>
            <label className="mb-2 block text-xs font-semibold tracking-wide text-gray-700">
              NAME
            </label>

            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3.5 text-sm outline-none transition focus:border-[#2F6B4F] focus:ring-2 focus:ring-[#2F6B4F]/20"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-xs font-semibold tracking-wide text-gray-700">
              EMAIL
            </label>

            <input
              type="email"
              placeholder="youremail@example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-3.5 text-sm outline-none transition focus:border-[#2F6B4F] focus:ring-2 focus:ring-[#2F6B4F]/20"
            />
          </div>

          {/* Continue Button */}
          <button
            className="flex w-full items-center justify-center rounded-lg bg-[#2F6B4F] px-4 py-3.5 font-semibold text-white transition hover:bg-[#285b43] active:scale-[0.98]"
          >
            <MessageCircle size={20} className="mr-2" />
            Continue to WhatsApp
          </button>

          {/* Direct WhatsApp */}
          <button className="w-full text-center text-sm font-medium text-gray-500 transition hover:text-[#2F6B4F]">
            Skip — open WhatsApp directly
          </button>

          {/* Note */}
          <p className="pt-3 text-center text-xs leading-5 text-gray-400">
            No spam — just one reply from our Kathmandu office.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Whatsapp;