import React, { useState } from "react";
import {
  CalendarDays,
  Mountain,
  Star,
  Gauge,
  MapPin,
  MessageCircle,
  X,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Whatsapp from "./Whatsapp";

const PopularPackage = ({ packageData, onClose }) => {
  const [showWhatsapp, setShowWhatsapp] = useState(false);

  const navigate = useNavigate();

  // =====================================================
  // NO PACKAGE SELECTED
  // =====================================================

  if (!packageData) {
    return null;
  }

  // =====================================================
  // PACKAGE DATA
  // =====================================================

  const title =
    packageData.title ||
    packageData.name ||
    "Untitled Package";

  const region =
    packageData.destslug ||
    "Nepal";

  const days = packageData.duration
    ? `${packageData.duration} days`
    : "N/A";

  const altitude =
    packageData.max_altitude ||
    "N/A";

  const rating =
    packageData.rating ?? "N/A";

  const price =
    packageData.price ?? null;

  // =====================================================
  // DIFFICULTY
  // =====================================================

  const difficulty =
    Number(packageData.grade_id) === 1
      ? "Easy"
      : Number(packageData.grade_id) === 2
      ? "Moderate"
      : Number(packageData.grade_id) === 3
      ? "Challenging"
      : "Moderate";

  // =====================================================
  // IMAGE
  // =====================================================

  const image = packageData.image
    ? `https://gatewaytreks.com/public/uploads/frontend/full/${packageData.image}`
    : "/images/MOUNT.jpg";

  // =====================================================
  // SHORT DESCRIPTION
  // =====================================================

  const shortDescription =
    packageData.short_description ||
    packageData.shortDescription ||
    packageData.description ||
    "Experience an unforgettable journey through the beautiful landscapes of Nepal.";

  // =====================================================
  // TRIP HIGHLIGHTS
  // =====================================================

  let highlights = [];

  if (Array.isArray(packageData.trip_highlights)) {
    highlights = packageData.trip_highlights;
  } else if (Array.isArray(packageData.highlights)) {
    highlights = packageData.highlights;
  } else if (Array.isArray(packageData.tripHighlights)) {
    highlights = packageData.tripHighlights;
  }

  // Fallback highlights

  if (highlights.length === 0) {
    highlights = [
      "Beautiful Himalayan landscapes",
      "Experienced trekking guides",
      "Authentic Nepalese culture",
      "Memorable trekking experience",
    ];
  }

  // =====================================================
  // VIEW FULL TRIP
  // =====================================================

  const handleViewFullTrip = () => {
    onClose();

    navigate(`/packages/${packageData.id}`, {
      state: {
        trip: packageData,
      },
    });
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      {/* =================================================
          POPULAR PACKAGE MODAL
      ================================================= */}

      <div
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
        onClick={onClose}
      >
        {/* =================================================
            MODAL CONTAINER
        ================================================= */}

        <div
          className="relative max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* =================================================
              CLOSE BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg backdrop-blur-sm transition duration-300 hover:scale-110 hover:bg-red-500 hover:text-white"
          >
            <X size={20} />
          </button>

          {/* =================================================
              SCROLLABLE CONTENT
          ================================================= */}

          <div className="max-h-[92vh] overflow-y-auto">
            {/* =================================================
                IMAGE + TITLE
            ================================================= */}

            <div className="group relative h-[280px] w-full overflow-hidden sm:h-[360px] md:h-[430px]">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/MOUNT.jpg";
                }}
              />

              {/* DARK GRADIENT */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* REGION */}

              <div className="absolute bottom-24 left-5 flex items-center gap-2 text-white sm:left-8">
                <MapPin
                  size={17}
                  className="text-[#9be564]"
                />

                <span className="text-sm font-semibold uppercase tracking-wider">
                  {region}
                </span>
              </div>

              {/* TITLE */}

              <div className="absolute bottom-7 left-5 right-5 sm:left-8 sm:right-8">
                <h1 className="max-w-3xl text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                  {title}
                </h1>
              </div>
            </div>

            {/* =================================================
                INFORMATION
            ================================================= */}

            <div className="px-5 py-6 sm:px-8 md:px-10">

              {/* =================================================
                  DETAILS GRID
              ================================================= */}

              <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">

                {/* DURATION */}

                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <CalendarDays
                      size={18}
                      className="text-[#4f8f3a]"
                    />

                    <span className="text-xs font-medium text-gray-500">
                      Duration
                    </span>
                  </div>

                  <p className="text-sm font-bold text-[#0b2418] sm:text-base">
                    {days}
                  </p>
                </div>

                {/* RATING */}

                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Star
                      size={18}
                      className="text-[#f5b942]"
                      fill="currentColor"
                    />

                    <span className="text-xs font-medium text-gray-500">
                      Rating
                    </span>
                  </div>

                  <p className="text-sm font-bold text-[#0b2418] sm:text-base">
                    {rating}
                  </p>
                </div>

                {/* ALTITUDE */}

                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Mountain
                      size={18}
                      className="text-[#4f8f3a]"
                    />

                    <span className="text-xs font-medium text-gray-500">
                      Altitude
                    </span>
                  </div>

                  <p className="text-sm font-bold text-[#0b2418] sm:text-base">
                    {altitude}
                  </p>
                </div>

                {/* DIFFICULTY */}

                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Gauge
                      size={18}
                      className="text-[#4f8f3a]"
                    />

                    <span className="text-xs font-medium text-gray-500">
                      Difficulty
                    </span>
                  </div>

                  <p className="text-sm font-bold text-[#0b2418] sm:text-base">
                    {difficulty}
                  </p>
                </div>
              </div>

              {/* =================================================
                  SHORT DESCRIPTION
              ================================================= */}

              <div className="mb-8">
                <h2 className="mb-3 text-xl font-bold text-[#0b2418] sm:text-2xl">
                  About This Trek
                </h2>

                <p className="text-sm leading-7 text-gray-600 sm:text-base">
                  {shortDescription}
                </p>
              </div>

              {/* =================================================
                  TRIP HIGHLIGHTS
              ================================================= */}

              <div className="mb-8">
                <h2 className="mb-4 text-xl font-bold text-[#0b2418] sm:text-2xl">
                  Trip Highlights
                </h2>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                  {highlights.map((highlight, index) => {
                    const highlightText =
                      typeof highlight === "string"
                        ? highlight
                        : highlight?.title ||
                          highlight?.name ||
                          highlight?.description ||
                          "Amazing trekking experience";

                    return (
                      <div
                        key={index}
                        className="flex items-start gap-3 rounded-xl bg-[#f2faec] p-3.5"
                      >
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#9be564]">
                          <Check
                            size={13}
                            className="text-[#0b2418]"
                          />
                        </div>

                        <p className="text-sm leading-6 text-gray-700">
                          {highlightText}
                        </p>
                      </div>
                    );
                  })}

                </div>
              </div>

              {/* =================================================
                  PRICE + REQUEST TREK
              ================================================= */}

              <div className="mt-8 flex flex-col gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">

                {/* PRICE */}

                <div className="flex items-center gap-1 text-sm">
                  <span className="font-medium text-gray-500">
                    Starting from
                  </span>

                  <span className="font-bold text-[#0b2418]">
                    {price !== null
                      ? `$${price}`
                      : "Contact us"}
                  </span>

                  {price !== null && (
                    <span className="font-medium text-gray-500">
                      / person
                    </span>
                  )}
                </div>

                {/* REQUEST THIS TREK */}

                <button
                  type="button"
                  onClick={() => setShowWhatsapp(true)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#4f8f3a] px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-300 hover:bg-[#0b2418] hover:shadow-md"
                >
                  <MessageCircle size={18} />

                  Request This Trek
                </button>
              </div>

              {/* =================================================
                  VIEW COMPLETE TRIP
              ================================================= */}

              <button
                type="button"
                onClick={handleViewFullTrip}
                className="mt-5 w-full text-center text-sm font-semibold text-[#4f8f3a] transition hover:text-[#0b2418]"
              >
                View Complete Trip Details →
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          WHATSAPP COMPONENT
      ================================================= */}

      {showWhatsapp && (
        <Whatsapp
          
          onClose={() => setShowWhatsapp(false)}
        />
      )}
    </>
  );
};

export default PopularPackage;