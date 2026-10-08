import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Whatsapp from "../sections/home/Whatsapp";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Car,
  Check,
  ChevronDown,
  Clock,
  Clock3,
  Download,
  Image as ImageIcon,
  MapPin,
  Maximize2,
  Minimize2,
  Mountain,
  Star,
  Sun,
  Users,
  X,
  MessageSquareText,
  ThumbsUp,
  Route as RouteIcon,
} from "lucide-react";

const API_URL = `${import.meta.env.VITE_BASE_API_URL}tripdetail`;

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

/* =========================================================
   ALTITUDE HELPER
========================================================= */

const formatAltitude = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    Number(value) === 0
  ) {
    return "-";
  }

  return `${value} m`;
};

/* =========================================================
   TRIP FACTS
========================================================= */

const TripFacts = ({ trip }) => {
  const duration = trip.duration ?? "N/A";
  const rating = trip.rating ?? "N/A";
  const groupSize = trip.group_size ?? "N/A";
  const altitude = formatAltitude(trip.max_altitude);
  const walkHours = trip.walk_in_hours ?? "N/A";

  const season = trip.best_season || "Spring & Autumn";

  const transportation = trip.transportation || "Private transportation";

  const difficulty =
    Number(trip.grade_id) === 1
      ? "Easy"
      : Number(trip.grade_id) === 2
        ? "Moderate"
        : Number(trip.grade_id) === 3
          ? "Challenging"
          : typeof trip.grade === "object"
            ? trip.grade?.name || "Moderate"
            : trip.grade || "Moderate";

  const regionName =
    trip.regname ||
    trip.region_name ||
    (typeof trip.region === "object"
      ? trip.region?.name || trip.region?.title
      : trip.region) ||
    "";

  const hasRegion = regionName && Number(trip.region_id) !== 0;

  return (
    <section className="mb-8 sm:mb-12">
      <h2 className="mb-4 text-xl font-bold text-[#0b2418] sm:mb-6 sm:text-2xl">
        Trip Facts
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        <TripFact
          icon={<CalendarDays size={22} />}
          label="Duration"
          value={`${duration} days`}
        />

        <TripFact
          icon={<Mountain size={22} />}
          label="Difficulty"
          value={difficulty}
        />

        <TripFact
          icon={<Mountain size={22} />}
          label="Max Altitude"
          value={altitude}
        />

        <TripFact
          icon={<Users size={22} />}
          label="Group Size"
          value={groupSize}
        />

        <TripFact
          icon={<Clock size={22} />}
          label="Walk / Day"
          value={walkHours !== "N/A" ? `${walkHours} hrs` : "N/A"}
        />

        <TripFact icon={<Sun size={22} />} label="Best Season" value={season} />

        <TripFact
          icon={<Car size={22} />}
          label="Transportation"
          value={transportation}
        />

        {hasRegion && (
          <TripFact
            icon={<MapPin size={22} />}
            label="Region"
            value={regionName}
          />
        )}

        <TripFact
          icon={<Star size={22} fill="currentColor" />}
          label="Rating"
          value={rating !== "N/A" ? `${rating} / 5` : "N/A"}
          star
        />
      </div>
    </section>
  );
};

const TripFact = ({ icon, label, value, star = false }) => {
  return (
    <div className="min-w-0 rounded-xl bg-white p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
      <div
        className={`mb-2 sm:mb-3 [&>svg]:h-5 [&>svg]:w-5 sm:[&>svg]:h-[22px] sm:[&>svg]:w-[22px] ${
          star ? "text-[#f5b942]" : "text-[#4f8f3a]"
        }`}
      >
        {icon}
      </div>

      <p className="text-[10px] uppercase tracking-wide text-gray-400 sm:text-xs">
        {label}
      </p>

      <p className="mt-0.5 break-words text-sm font-bold text-[#0b2418] sm:mt-1 sm:text-base">
        {value}
      </p>
    </div>
  );
};

/* =========================================================
   TRIP ROUTE
========================================================= */

const TripRoute = ({ route }) => {
  if (!route || typeof route !== "string") {
    return null;
  }

  const stops = route
    .split(/\s*(?:->|→|–|—|-|,)\s*/)
    .map((stop) => stop.trim())
    .filter(Boolean);

  if (stops.length < 2) {
    return null;
  }

  return (
    <section className="mb-8 rounded-xl bg-white p-4 shadow-sm sm:mb-12 sm:rounded-2xl sm:p-6 md:p-10">
      <div className="mb-4 flex items-center gap-3 sm:mb-6">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eaf6df] text-[#4f8f3a] sm:h-10 sm:w-10">
          <RouteIcon size={18} />
        </div>

        <div>
          <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#4f8f3a] sm:mb-1 sm:text-xs">
            How you'll travel
          </p>

          <h2 className="text-xl font-bold text-[#0b2418] sm:text-2xl">
            Trip Route
          </h2>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2 sm:gap-x-2 sm:gap-y-3">
        {stops.map((stop, index) => (
          <React.Fragment key={`${stop}-${index}`}>
            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold sm:px-4 sm:py-2 sm:text-sm ${
                index === 0 || index === stops.length - 1
                  ? "bg-[#0b2418] text-white"
                  : "bg-[#FBF9F4] text-[#0b2418]"
              }`}
            >
              {stop}
            </span>

            {index < stops.length - 1 && (
              <ArrowRight size={14} className="shrink-0 text-[#4f8f3a]" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

/* =========================================================
   HTML CONTENT
   Smaller text on mobile, normal size from sm and up.
   Images/tables from the API can never overflow the screen.
========================================================= */

const HtmlContent = ({ content, className = "trip-description" }) => {
  if (!content) {
    return null;
  }

  return (
    <div
      className={`${className} break-words text-sm leading-6 sm:text-base sm:leading-7 [&_img]:h-auto [&_img]:max-w-full [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto`}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
};

/* =========================================================
   ITINERARY SUMMARY TABLE
========================================================= */

const ItinerarySummaryTable = ({
  itineraries,
  onViewFull,
  showAltitude = false,
}) => {
  if (!Array.isArray(itineraries) || itineraries.length === 0) {
    return null;
  }

  const hasValue = (v) => v !== null && v !== undefined && v !== "";

  const columns = [
    ...(showAltitude
      ? [
          {
            key: "altitude",
            label: "Altitude",
            get: (d) => formatAltitude(d.altitude),
          },
        ]
      : []),
    {
      key: "accommodation",
      label: "Accommodation",
      get: (d) => d.accomodation || d.accommodation,
    },
    {
      key: "meal",
      label: "Meal",
      get: (d) => d.meal,
    },
    {
      key: "transportation",
      label: "Transport",
      get: (d) => d.transportation,
    },
  ].filter((col) => itineraries.some((d) => hasValue(col.get(d))));

  return (
    <section className="rounded-xl bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6 md:p-10">
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#4f8f3a] sm:mb-2 sm:text-xs">
            At a glance
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#0b2418] sm:text-3xl md:text-4xl">
            Itinerary Summary
          </h2>
        </div>

        <button
          type="button"
          onClick={onViewFull}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#0b2418] px-3 py-2 text-xs font-semibold text-[#0b2418] transition hover:bg-[#0b2418] hover:text-white sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm"
        >
          Full Itinerary
          <ArrowRight size={15} />
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full min-w-[560px] border-collapse text-left text-xs sm:min-w-[640px] sm:text-sm">
          <thead>
            <tr className="bg-[#0b2418] text-white">
              <th className="whitespace-nowrap px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider sm:px-4 sm:py-3 sm:text-xs">
                Day
              </th>

              <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider sm:px-4 sm:py-3 sm:text-xs">
                Activity
              </th>

              {columns.map((col) => (
                <th
                  key={col.key}
                  className="whitespace-nowrap px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider sm:px-4 sm:py-3 sm:text-xs"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {itineraries.map((day, index) => {
              const dayNumber = day.day_no || index + 1;

              const dayTitle =
                day.title ||
                day.name ||
                day.short_description ||
                `Day ${dayNumber}`;

              return (
                <tr
                  key={day.id || `${dayNumber}-${index}`}
                  className={`border-t border-gray-100 align-top ${
                    index % 2 === 0 ? "bg-white" : "bg-[#FBF9F4]"
                  }`}
                >
                  <td className="whitespace-nowrap px-3 py-3 sm:px-4 sm:py-4">
                    <span className="inline-flex h-7 min-w-[1.75rem] items-center justify-center rounded-full bg-[#eaf6df] px-2 text-[11px] font-bold text-[#0b2418] sm:h-8 sm:min-w-[2rem] sm:text-xs">
                      {dayNumber}
                    </span>
                  </td>

                  <td className="px-3 py-3 font-semibold text-[#0b2418] sm:px-4 sm:py-4">
                    {dayTitle}
                  </td>

                  {columns.map((col) => {
                    const value = col.get(day);

                    return (
                      <td
                        key={col.key}
                        className="px-3 py-3 text-gray-600 sm:px-4 sm:py-4"
                      >
                        {hasValue(value) ? value : "—"}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

/* =========================================================
   REVIEWS
========================================================= */

const RATING_ROW_LABELS = [
  {
    key: "trip_info_rating",
    label: "Trip Information",
  },
  {
    key: "accomodation_rating",
    label: "Accommodation",
  },
  {
    key: "meals_rating",
    label: "Meals",
  },
  {
    key: "transportation_rating",
    label: "Transportation",
  },
  {
    key: "staff_rating",
    label: "Guide & Staff",
  },
  {
    key: "value_rating",
    label: "Value for Money",
  },
];

const RatingBar = ({ label, average }) => {
  const value = Number(average) || 0;

  const percent = Math.max(0, Math.min(100, (value / 5) * 100));

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <span className="w-28 shrink-0 text-xs text-gray-500 sm:w-40 sm:text-sm">
        {label}
      </span>

      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100 sm:h-2">
        <div
          className="h-full rounded-full bg-[#4f8f3a]"
          style={{ width: `${percent}%` }}
        />
      </div>

      <span className="w-8 shrink-0 text-right text-xs font-semibold text-[#0b2418] sm:w-16 sm:text-sm">
        {value > 0 ? value.toFixed(1) : "—"}
      </span>
    </div>
  );
};

const ReviewCard = ({ review }) => {
  const name =
    review.name ||
    review.reviewer_name ||
    review.user_name ||
    "Verified Traveller";

  const country = review.country || review.nationality || "";

  const rating = Number(review.rating || review.overall_rating || 0);

  const date = review.published_date || review.created_at || "";

  const message = review.review || review.message || review.comment || "";

  return (
    <div className="rounded-xl border border-gray-100 p-4 sm:rounded-2xl sm:p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eaf6df] text-sm font-bold text-[#0b2418] sm:h-10 sm:w-10">
            {name.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#0b2418]">
              {name}
            </p>

            {country && <p className="text-xs text-gray-400">{country}</p>}
          </div>
        </div>

        {rating > 0 && (
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-[#f5b942]/15 px-2.5 py-1 text-xs font-semibold text-[#0b2418]">
            <Star size={13} fill="currentColor" className="text-[#f5b942]" />
            {rating}
          </div>
        )}
      </div>

      {message && (
        <p className="text-[13px] leading-6 text-gray-600 sm:text-sm">
          {message}
        </p>
      )}

      {date && <p className="mt-3 text-xs text-gray-400">{date}</p>}
    </div>
  );
};

const Reviews = ({ trip }) => {
  const reviews = Array.isArray(trip.reviews) ? trip.reviews : [];

  const rates = trip.rates || {};

  const revCount = trip.revCount || rates?.rating?.count || 0;

  const overallAverage = Number(rates?.rating?.average) || 0;

  return (
    <section className="mt-8 rounded-xl bg-white p-4 shadow-sm sm:mt-10 sm:rounded-2xl sm:p-6 md:p-10">
      <div className="mb-6 flex flex-col gap-4 border-b border-gray-100 pb-6 sm:mb-8 sm:gap-6 sm:pb-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#4f8f3a] sm:mb-2 sm:text-xs">
            Traveller feedback
          </p>

          <h2 className="font-serif text-2xl font-semibold text-[#0b2418] sm:text-3xl md:text-4xl">
            Reviews
          </h2>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-[#FBF9F4] px-4 py-3 sm:gap-4 sm:rounded-2xl sm:px-6 sm:py-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#0b2418] sm:text-3xl">
              {overallAverage > 0 ? overallAverage.toFixed(1) : "—"}
            </p>

            <div className="mt-1 flex items-center justify-center gap-0.5 text-[#f5b942]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  fill={
                    i < Math.round(overallAverage) ? "currentColor" : "none"
                  }
                  className={
                    i < Math.round(overallAverage)
                      ? "text-[#f5b942]"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
          </div>

          <div className="h-10 w-px bg-gray-200" />

          <div className="text-xs text-gray-500 sm:text-sm">
            Based on{" "}
            <span className="font-semibold text-[#0b2418]">{revCount}</span>{" "}
            {revCount === 1 ? "review" : "reviews"}
          </div>
        </div>
      </div>

      {revCount > 0 && (
        <div className="mb-6 space-y-2.5 sm:mb-8 sm:space-y-3">
          {RATING_ROW_LABELS.map(({ key, label }) => (
            <RatingBar
              key={key}
              label={label}
              average={rates?.[key]?.average}
            />
          ))}
        </div>
      )}

      {reviews.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id || index} review={review} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center rounded-xl bg-[#FBF9F4] px-4 py-8 text-center sm:rounded-2xl sm:px-6 sm:py-12">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#4f8f3a] shadow-sm sm:mb-4 sm:h-12 sm:w-12">
            <MessageSquareText size={20} />
          </div>

          <p className="mb-1 text-sm font-semibold text-[#0b2418] sm:text-base">
            No reviews yet
          </p>

          <p className="max-w-sm text-xs text-gray-500 sm:text-sm">
            Be the first to share how this trip went, it helps future trekkers
            plan with confidence.
          </p>

          <button
            type="button"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#4f8f3a] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#3d762e] sm:mt-5 sm:px-5 sm:text-sm"
          >
            <ThumbsUp size={15} />
            Write a Review
          </button>
        </div>
      )}
    </section>
  );
};

/* =========================================================
   BOOKING CARD (featured trip)
   Desktop: slim 300px sticky card in the right column.
   Mobile : compact inline card + a fixed bottom bar with the
            price and the two main actions.
========================================================= */

const BookingCard = ({
  price,
  duration,
  rating,
  hasDiscount,
  discountAmount,
  discountMessage,
}) => {
  const [showWhatsapp, setShowWhatsapp] = useState(false);

  const [persons, setPersons] = useState(1);

  const formatPrice = (value) => {
    if (value === null || value === undefined || value === "") {
      return null;
    }

    return `$${Number(value).toLocaleString()}`;
  };

  const pricePerPerson =
    price !== null && price !== undefined && price !== ""
      ? Number(price)
      : null;

  const totalPrice = pricePerPerson !== null ? pricePerPerson * persons : null;

  const increasePersons = () => {
    setPersons((previous) => previous + 1);
  };

  const decreasePersons = () => {
    setPersons((previous) => Math.max(1, previous - 1));
  };

  return (
    <>
      {/* =================================================
          CARD
      ================================================= */}

      <aside className="lg:sticky lg:top-[104px] lg:h-fit lg:self-start">
        <div className="overflow-hidden rounded-xl border border-black/5 bg-white shadow-md sm:rounded-2xl">
          {/* TOP: PRICE */}

          <div className="flex items-start justify-between gap-3 bg-[#0b2418] px-4 py-3.5 text-white">
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/60">
                {pricePerPerson !== null ? "From" : "Price"}
              </p>

              <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2">
                {pricePerPerson !== null ? (
                  <>
                    <span className="text-2xl font-bold leading-none">
                      {formatPrice(pricePerPerson)}
                    </span>

                    {hasDiscount && discountAmount && (
                      <span className="text-xs text-white/50 line-through">
                        {formatPrice(pricePerPerson)}
                      </span>
                    )}

                    <span className="text-[11px] text-white/60">/ person</span>
                  </>
                ) : (
                  <span className="text-lg font-bold">Contact us</span>
                )}
              </div>
            </div>

            <span className="shrink-0 rounded-full bg-[#9be564] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0b2418]">
              {duration ? `${duration} days` : "Flexible"}
            </span>
          </div>

          <div className="p-4">
            {/* PERSONS: label left, stepper right */}

            {pricePerPerson !== null && (
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-[#0b2418]">
                    Travellers
                  </p>

                  <p className="text-[11px] text-gray-400">All-inclusive</p>
                </div>

                <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-[#FBF9F4] p-1">
                  <button
                    type="button"
                    onClick={decreasePersons}
                    disabled={persons === 1}
                    aria-label="Decrease number of persons"
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-base font-bold transition ${
                      persons === 1
                        ? "cursor-not-allowed text-gray-300"
                        : "bg-white text-[#0b2418] shadow-sm hover:bg-[#0b2418] hover:text-white"
                    }`}
                  >
                    −
                  </button>

                  <span className="w-6 text-center text-sm font-bold text-[#0b2418]">
                    {persons}
                  </span>

                  <button
                    type="button"
                    onClick={increasePersons}
                    aria-label="Increase number of persons"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-base font-bold text-[#0b2418] shadow-sm transition hover:bg-[#0b2418] hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* TOTAL */}

            {totalPrice !== null && (
              <div className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-[#eaf6df] px-3 py-2.5">
                <div>
                  <p className="text-[11px] text-gray-600">
                    {formatPrice(pricePerPerson)} × {persons}
                  </p>

                  <p className="text-[10px] text-gray-500">Estimated total</p>
                </div>

                <span className="text-lg font-bold text-[#0b2418]">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            )}

            {/* OFFER */}

            <p className="mt-3 rounded-lg border border-dashed border-[#4f8f3a]/40 px-3 py-2 text-[11px] leading-4 text-gray-600">
              <span className="font-semibold text-[#0b2418]">
                {discountMessage ? "Special offer: " : "Group discounts: "}
              </span>

              {discountMessage || "contact us for group pricing."}
            </p>

            {/* ACTIONS (desktop only, mobile uses the bottom bar) */}

            <div className="mt-3 hidden gap-2 lg:grid">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#4f8f3a] py-2.5 text-sm font-semibold text-white transition hover:bg-[#3d762e]"
              >
                Check Availability
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => setShowWhatsapp(true)}
                className="w-full rounded-lg border-2 border-[#0b2418] py-2 text-sm font-semibold text-[#0b2418] transition hover:bg-[#0b2418] hover:text-white"
              >
                Make an Inquiry
              </button>
            </div>

            {/* TRUST POINTS */}

            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] text-gray-600">
              {[
                "Instant confirmation",
                "Secure payments",
                "No hidden costs",
              ].map((text) => (
                <span key={text} className="flex items-center gap-1">
                  <Check size={13} className="shrink-0 text-[#4f8f3a]" />
                  {text}
                </span>
              ))}
            </div>

            {/* FOOTER: rating + dates */}

            <div className="mt-3 flex items-center justify-between gap-3 border-t border-gray-100 pt-3">
              {rating > 0 ? (
                <div className="flex items-center gap-1.5 text-xs">
                  <Star
                    size={14}
                    fill="currentColor"
                    className="text-[#f5b942]"
                  />

                  <span className="font-bold text-[#0b2418]">{rating}</span>

                  <span className="text-gray-400">/ 5</span>
                </div>
              ) : (
                <span />
              )}

              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4f8f3a] hover:underline"
              >
                <CalendarDays size={14} />
                View trip dates
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* =================================================
          MOBILE BOTTOM BAR
      ================================================= */}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 px-4 py-2.5 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-wider text-gray-400">
              {totalPrice !== null && persons > 1
                ? `Total · ${persons} travellers`
                : "From"}
            </p>

            <p className="truncate text-lg font-bold leading-tight text-[#0b2418]">
              {totalPrice !== null ? formatPrice(totalPrice) : "Contact us"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowWhatsapp(true)}
            className="shrink-0 rounded-lg border-2 border-[#0b2418] px-3.5 py-2 text-xs font-semibold text-[#0b2418] active:scale-95"
          >
            Inquiry
          </button>

          <button
            type="button"
            className="shrink-0 rounded-lg bg-[#4f8f3a] px-4 py-2.5 text-xs font-semibold text-white active:scale-95"
          >
            Check Availability
          </button>
        </div>
      </div>

      {showWhatsapp && <Whatsapp onClose={() => setShowWhatsapp(false)} />}
    </>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const TripDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("overview");

  const [openItinerary, setOpenItinerary] = useState(0);

  const [openFaq, setOpenFaq] = useState(null);

  const [allItinerariesExpanded, setAllItinerariesExpanded] = useState(false);

  const [allFaqsExpanded, setAllFaqsExpanded] = useState(false);

  /* =====================================================
     FETCH TRIP
  ===================================================== */

  useEffect(() => {
    const fetchTrip = async () => {
      if (!slug) {
        setError("Trip slug is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/${encodeURIComponent(slug)}`, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch trip: ${response.status}`);
        }

        const data = await response.json();

        const tripData =
          data?.package ||
          data?.trip ||
          data?.data?.package ||
          data?.data ||
          data;

        if (!tripData || typeof tripData !== "object") {
          throw new Error("Trip data was not found.");
        }

        tripData.reviews = tripData.reviews || data?.reviews || [];

        tripData.rates = tripData.rates || data?.rates || {};

        tripData.revCount = tripData.revCount ?? data?.revCount ?? 0;

        if (!tripData.regname && !tripData.region_name && !tripData.region) {
          const regionFromTopLevel = data?.region?.name || data?.regname || "";

          if (regionFromTopLevel) {
            tripData.regname = regionFromTopLevel;
          }
        }

        setTrip(tripData);
      } catch (err) {
        console.error("TRIP DETAIL ERROR:", err);

        setError(err.message);
        setTrip(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [slug]);

  /* =====================================================
     SCROLL TOP
  ===================================================== */

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [slug]);

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FBF9F4]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#4f8f3a]" />

          <p className="text-base font-medium text-gray-500 sm:text-lg">
            Loading trip details...
          </p>
        </div>
      </div>
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FBF9F4] px-4 sm:px-6">
        <div className="w-full max-w-lg rounded-2xl bg-white p-6 text-center shadow-lg sm:p-8">
          <h2 className="mb-3 text-xl font-bold text-red-500 sm:text-2xl">
            Unable to load trip
          </h2>

          <p className="mb-3 text-sm text-gray-500 sm:text-base">{error}</p>

          <p className="mb-6 break-all rounded-lg bg-gray-100 px-4 py-3 text-xs text-gray-600 sm:text-sm">
            Slug: <strong>{slug}</strong>
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0b2418] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4f8f3a]"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!trip) {
    return null;
  }

  /* =====================================================
     HELPERS
  ===================================================== */

  const getImageUrl = (imageName) => {
    if (!imageName) {
      return "/images/MOUNT.jpg";
    }

    if (typeof imageName === "string" && imageName.startsWith("http")) {
      return imageName;
    }

    return `${IMAGE_BASE_URL}${imageName}`;
  };

  /* =====================================================
     BASIC DATA
  ===================================================== */

  const title =
    trip.title || trip.name || trip.package_title || "Untitled Trip";

  const tripCode = trip.trip_code || trip.code || "";

  const shortDescription = trip.short_description || "";

  const description = trip.description || trip.overview || "";

  const duration = trip.duration || trip.duration_days || trip.days || "";

  const price = trip.price ?? trip.cost ?? trip.price_per_person ?? null;

  const rating = trip.rating || trip.average_rating || 0;

  const grade =
    typeof trip.grade === "object" ? trip.grade?.name : trip.grade || "";

  const hasDiscount =
    trip.has_discount === true ||
    trip.has_discount === 1 ||
    trip.has_discount === "1";

  const discountAmount = trip.discount_amt ?? trip.discount_amount ?? null;

  const discountMessage = trip.discount_msg || trip.discount_message || "";

  const featuredVideo = trip.featured_video_url || "";

  const showAltitude =
    trip.show_altitude === true ||
    trip.show_altitude === 1 ||
    trip.show_altitude === "1";

  /* =====================================================
     HERO IMAGE
  ===================================================== */

  const heroImage = getImageUrl(
    trip.image || trip.social_image || trip.featured_image || trip.thumbnail,
  );

  /* =====================================================
     ARRAYS
  ===================================================== */

  const itineraries = Array.isArray(trip.itineraries)
    ? [...trip.itineraries].sort(
        (a, b) =>
          Number(a.display_order || a.day_no || 0) -
          Number(b.display_order || b.day_no || 0),
      )
    : [];

  const faqs = Array.isArray(trip.faqs)
    ? trip.faqs
    : Array.isArray(trip.package?.faqs)
      ? trip.package.faqs
      : [];

  const images = Array.isArray(trip.images)
    ? [...trip.images].sort(
        (a, b) => Number(a.display_order || 0) - Number(b.display_order || 0),
      )
    : [];

  const relatedPackages = Array.isArray(trip.related_packages)
    ? trip.related_packages
    : [];

  /* =====================================================
     BREADCRUMBS
  ===================================================== */

  const breadcrumbs =
    trip.breadcrumbs && typeof trip.breadcrumbs === "object"
      ? Object.entries(trip.breadcrumbs)
      : [];

  /* =====================================================
     CONTENT
  ===================================================== */

  const costIncludes = trip.cost_includes || trip.includes || "";

  const costExcludes = trip.cost_excludes || trip.excludes || "";

  const equipmentList = trip.equipment_list || "";

  const complimentary = trip.complimentary || "";

  /* =====================================================
     ITINERARY CONTROLS
  ===================================================== */

  const toggleAllItineraries = () => {
    if (allItinerariesExpanded) {
      setOpenItinerary(null);
      setAllItinerariesExpanded(false);
    } else {
      setOpenItinerary("all");
      setAllItinerariesExpanded(true);
    }
  };

  /* =====================================================
     FAQ CONTROLS
  ===================================================== */

  const toggleAllFaqs = () => {
    if (allFaqsExpanded) {
      setOpenFaq(null);
      setAllFaqsExpanded(false);
    } else {
      setOpenFaq("all");
      setAllFaqsExpanded(true);
    }
  };

  /* =====================================================
     DOWNLOAD ITINERARY PDF
  ===================================================== */

  const downloadItineraryPDF = () => {
    if (!itineraries.length) {
      return;
    }

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert(
        "Please allow pop-ups in your browser to download the itinerary PDF.",
      );

      return;
    }

    const escapeHtml = (value) => {
      if (value === null || value === undefined) {
        return "";
      }

      return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const stripHtml = (html) => {
      if (!html) {
        return "";
      }

      const temp = document.createElement("div");

      temp.innerHTML = html;

      return temp.textContent || temp.innerText || "";
    };

    const itineraryHtml = itineraries
      .map((day, index) => {
        const dayNumber = day.day_no || index + 1;

        const dayTitle =
          day.title || day.name || day.short_description || `Day ${dayNumber}`;

        const description = stripHtml(day.description || "");

        const details = [
          {
            label: "Altitude",
            value: formatAltitude(day.altitude),
          },
          {
            label: "Meal",
            value: day.meal,
          },
          {
            label: "Accommodation",
            value: day.accomodation || day.accommodation,
          },
          {
            label: "Transportation",
            value: day.transportation,
          },
          {
            label: "Distance",
            value: day.distance,
          },
          {
            label: "Time",
            value: day.time,
          },
          {
            label: "Ascent",
            value: day.ascent,
          },
          {
            label: "Descent",
            value: day.descent,
          },
        ].filter(
          (item) =>
            item.value !== null &&
            item.value !== undefined &&
            item.value !== "",
        );

        return `
            <div class="day">
              <div class="day-header">
                <div class="day-number">
                  ${escapeHtml(dayNumber)}
                </div>

                <div>
                  <div class="day-label">
                    DAY ${escapeHtml(dayNumber)}
                  </div>

                  <h2>
                    ${escapeHtml(dayTitle)}
                  </h2>
                </div>
              </div>

              ${
                description
                  ? `
                    <div class="description">
                      ${escapeHtml(description)}
                    </div>
                  `
                  : ""
              }

              ${
                details.length > 0
                  ? `
                    <div class="details">
                      ${details
                        .map(
                          (item) => `
                            <div class="detail">
                              <div class="detail-label">
                                ${escapeHtml(item.label)}
                              </div>

                              <div class="detail-value">
                                ${escapeHtml(item.value)}
                              </div>
                            </div>
                          `,
                        )
                        .join("")}
                    </div>
                  `
                  : ""
              }
            </div>
          `;
      })
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>

      <html>
        <head>
          <title>
            ${escapeHtml(title)} - Itinerary
          </title>

          <style>
            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              padding: 40px;
              font-family: Arial, sans-serif;
              color: #0b2418;
              background: white;
            }

            .header {
              margin-bottom: 35px;
              padding-bottom: 20px;
              border-bottom: 2px solid #eaf6df;
            }

            .brand {
              margin-bottom: 8px;
              color: #4f8f3a;
              font-size: 11px;
              font-weight: bold;
              letter-spacing: 3px;
              text-transform: uppercase;
            }

            .title {
              margin: 0 0 8px;
              font-size: 30px;
              font-weight: bold;
              line-height: 1.2;
            }

            .subtitle {
              color: #666;
              font-size: 14px;
            }

            .trip-info {
              display: flex;
              gap: 20px;
              margin-top: 12px;
              color: #666;
              font-size: 12px;
            }

            .day {
              margin-bottom: 28px;
              padding: 24px;
              border: 1px solid #e5e7eb;
              border-radius: 14px;
              page-break-inside: avoid;
            }

            .day-header {
              display: flex;
              align-items: center;
              gap: 15px;
              margin-bottom: 20px;
            }

            .day-number {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 42px;
              height: 42px;
              min-width: 42px;
              border-radius: 50%;
              background: #0b2418;
              color: white;
              font-size: 15px;
              font-weight: bold;
            }

            .day-label {
              margin-bottom: 5px;
              color: #4f8f3a;
              font-size: 10px;
              font-weight: bold;
              letter-spacing: 1.5px;
            }

            h2 {
              margin: 0;
              font-size: 20px;
              line-height: 1.3;
            }

            .description {
              margin-bottom: 20px;
              color: #555;
              font-size: 13px;
              line-height: 1.7;
              white-space: pre-line;
            }

            .details {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 10px;
            }

            .detail {
              padding: 12px;
              border-radius: 8px;
              background: #fbf9f4;
            }

            .detail-label {
              margin-bottom: 5px;
              color: #999;
              font-size: 9px;
              font-weight: bold;
              letter-spacing: 1px;
              text-transform: uppercase;
            }

            .detail-value {
              color: #0b2418;
              font-size: 12px;
              font-weight: 600;
            }

            .footer {
              margin-top: 30px;
              padding-top: 15px;
              border-top: 1px solid #e5e7eb;
              color: #999;
              font-size: 10px;
              text-align: center;
            }

            @media print {
              body {
                padding: 20px;
              }

              .day {
                break-inside: avoid;
              }
            }
          </style>
        </head>

        <body>
          <div class="header">
            <div class="brand">
              Gateway Treks
            </div>

            <h1 class="title">
              ${escapeHtml(title)}
            </h1>

            <div class="subtitle">
              Trip Itinerary
            </div>

            <div class="trip-info">
              ${
                tripCode
                  ? `<span>Trip Code: ${escapeHtml(tripCode)}</span>`
                  : ""
              }

              ${
                duration
                  ? `<span>Duration: ${escapeHtml(duration)} days</span>`
                  : ""
              }
            </div>
          </div>

          ${itineraryHtml}

          <div class="footer">
            ${escapeHtml(title)}
            · Trip Itinerary
          </div>

          <script>
            window.onload = function () {
              setTimeout(function () {
                window.print();
              }, 500);
            };

            window.onafterprint = function () {
              window.close();
            };
          <\/script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  /* =====================================================
     TABS
  ===================================================== */

  const tabs = [
    {
      id: "overview",
      label: "Overview",
    },
    {
      id: "itinerary",
      label: "Itinerary",
      count: itineraries.length,
    },
    {
      id: "includes",
      label: "Includes / Excludes",
    },
    {
      id: "equipment",
      label: "Equipment",
    },
    {
      id: "faq",
      label: "FAQ",
      count: faqs.length,
    },
  ];

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="min-h-screen overflow-x-clip bg-[#FBF9F4] pb-20 pt-[88px] lg:pb-0">
      {/* =================================================
          BREADCRUMB
      ================================================= */}

      <div className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 text-xs sm:px-6 sm:py-4 sm:text-base md:px-10">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="shrink-0 font-medium text-[#4f8f3a] hover:text-[#0b2418]"
          >
            Home
          </button>

          {breadcrumbs.length > 0 ? (
            breadcrumbs.map(([label, url], index) => (
              <React.Fragment key={`${label}-${index}`}>
                <ArrowRight size={14} className="shrink-0 text-gray-400" />

                {url && typeof url === "string" && url.startsWith("/") ? (
                  <button
                    type="button"
                    onClick={() => navigate(url)}
                    className="shrink-0 whitespace-nowrap font-medium text-gray-500 hover:text-[#0b2418]"
                  >
                    {label}
                  </button>
                ) : (
                  <span className="shrink-0 whitespace-nowrap text-gray-500">
                    {label}
                  </span>
                )}
              </React.Fragment>
            ))
          ) : (
            <>
              <ArrowRight size={14} className="text-gray-400" />

              <span className="whitespace-nowrap font-medium text-gray-500">
                {title}
              </span>
            </>
          )}
        </div>
      </div>

      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative h-[380px] overflow-hidden sm:h-[500px] md:h-[620px]">
        {featuredVideo ? (
          <video
            src={featuredVideo}
            poster={heroImage}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={heroImage}
            alt={title}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/images/MOUNT.jpg";
            }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-2 text-xs font-semibold text-[#0b2418] shadow-lg backdrop-blur transition hover:bg-white sm:left-6 sm:top-6 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm md:left-10"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="absolute bottom-6 left-4 right-4 mx-auto max-w-7xl sm:bottom-10 sm:left-6 sm:right-6">
          <div className="mb-3 flex flex-wrap items-center gap-2 sm:mb-4 sm:gap-3">
            {tripCode && (
              <span className="rounded-full bg-[#9be564] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0b2418] sm:px-4 sm:py-1.5 sm:text-xs">
                {tripCode}
              </span>
            )}

            {grade && (
              <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur sm:px-4 sm:py-1.5 sm:text-xs">
                {grade}
              </span>
            )}

            {rating > 0 && (
              <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur sm:px-4 sm:py-1.5 sm:text-xs">
                <Star size={12} fill="currentColor" />
                {rating}
              </span>
            )}
          </div>

          <h1 className="max-w-5xl break-words font-serif text-2xl font-semibold leading-tight text-white sm:text-4xl md:text-6xl lg:text-7xl">
            {title}
          </h1>

          {shortDescription && (
            <p className="mt-3 line-clamp-3 max-w-3xl text-[13px] leading-5 text-white/80 sm:mt-5 sm:line-clamp-none sm:text-base sm:leading-7 md:text-lg">
              {shortDescription}
            </p>
          )}
        </div>
      </section>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 md:px-10 md:py-14">
        <TripFacts trip={trip} />

        <TripRoute route={trip.trip_routes} />

        <div className="grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8">
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="min-w-0">
            {/* STICKY TABS */}

            <div className="sticky top-[88px] z-30 mb-5 overflow-x-auto rounded-xl bg-white p-1.5 shadow-md ring-1 ring-black/5 [scrollbar-width:none] sm:mb-8 sm:rounded-2xl sm:p-2 [&::-webkit-scrollbar]:hidden">
              <div className="flex min-w-max gap-1 sm:gap-1.5">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition sm:gap-2 sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm ${
                        isActive
                          ? "bg-[#0b2418] text-white shadow-md"
                          : "text-gray-500 hover:bg-[#0b2418]/5 hover:text-[#0b2418]"
                      }`}
                    >
                      <span>{tab.label}</span>

                      {tab.count !== undefined && (
                        <span
                          className={`flex h-4 min-w-[1rem] items-center justify-center rounded-full px-1 text-[10px] font-bold sm:h-5 sm:min-w-[1.25rem] sm:px-1.5 sm:text-xs ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* =================================================
                OVERVIEW
            ================================================= */}

            {activeTab === "overview" && (
              <div className="space-y-6 sm:space-y-8">
                <section className="rounded-xl bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6 md:p-10">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#4f8f3a] sm:mb-2 sm:text-xs">
                    About the trip
                  </p>

                  <h2 className="mb-4 font-serif text-2xl font-semibold text-[#0b2418] sm:mb-6 sm:text-3xl md:text-4xl">
                    Overview
                  </h2>

                  {description ? (
                    <HtmlContent content={description} />
                  ) : (
                    <p className="text-sm text-gray-500 sm:text-base">
                      No description available.
                    </p>
                  )}
                </section>

                <ItinerarySummaryTable
                  itineraries={itineraries}
                  showAltitude={showAltitude}
                  onViewFull={() => setActiveTab("itinerary")}
                />

                {complimentary && (
                  <section className="rounded-xl border border-[#9be564]/40 bg-[#9be564]/10 p-4 sm:rounded-2xl sm:p-6 md:p-8">
                    <div className="mb-3 flex items-center gap-3 sm:mb-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#9be564] text-[#0b2418] sm:h-10 sm:w-10">
                        <Check size={18} />
                      </div>

                      <h2 className="font-serif text-xl font-semibold text-[#0b2418] sm:text-2xl">
                        What's Complimentary
                      </h2>
                    </div>

                    <HtmlContent content={complimentary} />
                  </section>
                )}
              </div>
            )}

            {/* =================================================
                ITINERARY
            ================================================= */}

            {activeTab === "itinerary" && (
              <section className="rounded-xl bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6 md:p-10">
                <div className="mb-5 flex flex-col gap-4 sm:mb-8 sm:gap-5 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#4f8f3a] sm:mb-2 sm:text-xs">
                      Day by day
                    </p>

                    <h2 className="font-serif text-2xl font-semibold text-[#0b2418] sm:text-3xl md:text-4xl">
                      Itinerary
                    </h2>

                    {itineraries.length > 0 && (
                      <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
                        {itineraries.length} day
                        {itineraries.length !== 1 ? "s" : ""} of your journey
                      </p>
                    )}
                  </div>

                  {itineraries.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={toggleAllItineraries}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#0b2418] px-3 py-2 text-xs font-semibold text-[#0b2418] transition hover:bg-[#0b2418] hover:text-white sm:gap-2 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm"
                      >
                        {allItinerariesExpanded ? (
                          <>
                            <Minimize2 size={15} />
                            Collapse All
                          </>
                        ) : (
                          <>
                            <Maximize2 size={15} />
                            Expand All
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={downloadItineraryPDF}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#4f8f3a] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#3d762e] sm:gap-2 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm"
                      >
                        <Download size={15} />
                        Download PDF
                      </button>
                    </div>
                  )}
                </div>

                {itineraries.length > 0 ? (
                  <div className="space-y-3 sm:space-y-4">
                    {itineraries.map((day, index) => {
                      const isOpen =
                        allItinerariesExpanded ||
                        openItinerary === index ||
                        openItinerary === "all";

                      const dayNumber = day.day_no || index + 1;

                      const dayTitle =
                        day.title ||
                        day.name ||
                        day.short_description ||
                        `Day ${dayNumber}`;

                      return (
                        <div
                          key={day.id || `${dayNumber}-${index}`}
                          className="overflow-hidden rounded-xl border border-gray-100 sm:rounded-2xl"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              if (allItinerariesExpanded) {
                                setAllItinerariesExpanded(false);
                                setOpenItinerary(index);
                              } else {
                                setOpenItinerary(isOpen ? null : index);
                              }
                            }}
                            className="flex w-full items-center gap-3 p-3.5 text-left transition hover:bg-gray-50 sm:gap-4 sm:p-5"
                          >
                            <div className="flex h-9 min-w-[2.75rem] shrink-0 items-center justify-center rounded-full bg-[#0b2418] px-2 text-xs font-bold text-white sm:h-11 sm:w-16 sm:text-sm">
                              {dayNumber}
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-[#4f8f3a] sm:mb-1 sm:text-xs">
                                {dayNumber}
                              </p>

                              <h3 className="font-serif text-base font-semibold leading-snug text-[#0b2418] sm:text-xl">
                                {dayTitle}
                              </h3>
                            </div>

                            <ChevronDown
                              size={18}
                              className={`shrink-0 text-gray-500 transition-transform ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {isOpen && (
                            <div className="border-t border-gray-100 px-3.5 pb-4 pt-4 sm:px-5 sm:pb-6 sm:pt-5">
                              {day.description && (
                                <HtmlContent content={day.description} />
                              )}

                              <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-6 sm:gap-3 md:grid-cols-3">
                                {[
                                  {
                                    label: "Altitude",
                                    value: formatAltitude(day.altitude),
                                  },
                                  {
                                    label: "Meal",
                                    value: day.meal,
                                  },
                                  {
                                    label: "Accommodation",
                                    value:
                                      day.accomodation || day.accommodation,
                                  },
                                  {
                                    label: "Transportation",
                                    value: day.transportation,
                                  },
                                  {
                                    label: "Distance",
                                    value: day.distance,
                                  },
                                  {
                                    label: "Time",
                                    value: day.time,
                                  },
                                  {
                                    label: "Ascent",
                                    value: day.ascent,
                                  },
                                  {
                                    label: "Descent",
                                    value: day.descent,
                                  },
                                ]
                                  .filter(
                                    (item) =>
                                      item.value !== null &&
                                      item.value !== undefined &&
                                      item.value !== "",
                                  )
                                  .map((item) => (
                                    <div
                                      key={item.label}
                                      className="min-w-0 rounded-lg bg-[#FBF9F4] p-3 sm:rounded-xl sm:p-4"
                                    >
                                      <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 sm:text-xs">
                                        {item.label}
                                      </p>

                                      <p className="mt-0.5 break-words text-[13px] font-semibold text-[#0b2418] sm:mt-1 sm:text-sm">
                                        {item.value}
                                      </p>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 sm:text-base">
                    Itinerary information is not available for this trip.
                  </p>
                )}
              </section>
            )}

            {/* =================================================
                INCLUDES / EXCLUDES
            ================================================= */}

            {activeTab === "includes" && (
              <section className="rounded-xl bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6 md:p-10">
                <div className="mb-5 sm:mb-8">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#4f8f3a] sm:mb-2 sm:text-xs">
                    What's covered
                  </p>

                  <h2 className="font-serif text-2xl font-semibold text-[#0b2418] sm:text-3xl md:text-4xl">
                    Cost Includes & Excludes
                  </h2>
                </div>

                <div className="grid gap-5 sm:gap-8 md:grid-cols-2">
                  <div className="rounded-xl border border-green-100 bg-green-50/50 p-4 sm:rounded-2xl sm:p-6">
                    <div className="mb-4 flex items-center gap-3 sm:mb-5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#9be564] text-[#0b2418] sm:h-9 sm:w-9">
                        <Check size={16} />
                      </div>

                      <h3 className="font-serif text-xl font-semibold text-[#0b2418] sm:text-2xl">
                        Includes
                      </h3>
                    </div>

                    {costIncludes ? (
                      <HtmlContent
                        content={costIncludes}
                        className="trip-list text-gray-600"
                      />
                    ) : (
                      <p className="text-xs text-gray-500 sm:text-sm">
                        No information available.
                      </p>
                    )}
                  </div>

                  <div className="rounded-xl border border-red-100 bg-red-50/40 p-4 sm:rounded-2xl sm:p-6">
                    <div className="mb-4 flex items-center gap-3 sm:mb-5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 sm:h-9 sm:w-9">
                        <X size={16} />
                      </div>

                      <h3 className="font-serif text-xl font-semibold text-[#0b2418] sm:text-2xl">
                        Excludes
                      </h3>
                    </div>

                    {costExcludes ? (
                      <HtmlContent
                        content={costExcludes}
                        className="trip-list text-gray-600"
                      />
                    ) : (
                      <p className="text-xs text-gray-500 sm:text-sm">
                        No information available.
                      </p>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* =================================================
                EQUIPMENT
            ================================================= */}

            {activeTab === "equipment" && (
              <section className="rounded-xl bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6 md:p-10">
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#4f8f3a] sm:mb-2 sm:text-xs">
                  Prepare for your trip
                </p>

                <h2 className="mb-5 font-serif text-2xl font-semibold text-[#0b2418] sm:mb-8 sm:text-3xl md:text-4xl">
                  Equipment & Packing List
                </h2>

                {equipmentList ? (
                  <HtmlContent
                    content={equipmentList}
                    className="trip-list text-gray-600"
                  />
                ) : (
                  <p className="text-sm text-gray-500 sm:text-base">
                    Equipment information is not available.
                  </p>
                )}
              </section>
            )}

            {/* =================================================
                FAQ
            ================================================= */}

            {activeTab === "faq" && (
              <section className="rounded-xl bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6 md:p-10">
                <div className="mb-5 flex flex-col gap-4 sm:mb-8 sm:gap-5 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#4f8f3a] sm:mb-2 sm:text-xs">
                      Frequently asked
                    </p>

                    <h2 className="font-serif text-2xl font-semibold text-[#0b2418] sm:text-3xl md:text-4xl">
                      Frequently Asked Questions
                    </h2>
                  </div>

                  {faqs.length > 0 && (
                    <button
                      type="button"
                      onClick={toggleAllFaqs}
                      className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-[#0b2418] px-3 py-2 text-xs font-semibold text-[#0b2418] transition hover:bg-[#0b2418] hover:text-white sm:gap-2 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm"
                    >
                      {allFaqsExpanded ? (
                        <>
                          <Minimize2 size={15} />
                          Collapse All
                        </>
                      ) : (
                        <>
                          <Maximize2 size={15} />
                          Expand All
                        </>
                      )}
                    </button>
                  )}
                </div>

                {faqs.length > 0 ? (
                  <div className="space-y-2.5 sm:space-y-3">
                    {faqs.map((faq, index) => {
                      const isOpen =
                        allFaqsExpanded ||
                        openFaq === index ||
                        openFaq === "all";

                      return (
                        <div
                          key={faq.id || index}
                          className="overflow-hidden rounded-lg border border-gray-100 sm:rounded-xl"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              if (allFaqsExpanded) {
                                setAllFaqsExpanded(false);
                                setOpenFaq(index);
                              } else {
                                setOpenFaq(isOpen ? null : index);
                              }
                            }}
                            className="flex w-full items-center justify-between gap-4 p-4 text-left text-sm font-semibold text-[#0b2418] transition hover:bg-gray-50 sm:gap-5 sm:p-5 sm:text-base"
                          >
                            <span>{faq.question}</span>

                            <ChevronDown
                              size={18}
                              className={`shrink-0 transition-transform ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {isOpen && (
                            <div className="border-t border-gray-100 px-4 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4">
                              <HtmlContent content={faq.answer || ""} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 sm:text-base">
                    No frequently asked questions are available.
                  </p>
                )}
              </section>
            )}

            {/* =================================================
                GALLERY
            ================================================= */}

            {images.length > 0 && (
              <section className="mt-8 rounded-xl bg-white p-4 shadow-sm sm:mt-10 sm:rounded-2xl sm:p-6 md:p-10">
                <div className="mb-5 flex items-end justify-between sm:mb-8">
                  <div>
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#4f8f3a] sm:mb-2 sm:text-xs">
                      Explore the journey
                    </p>

                    <h2 className="font-serif text-2xl font-semibold text-[#0b2418] sm:text-3xl">
                      Photo Gallery
                    </h2>
                  </div>

                  <ImageIcon size={22} className="text-[#4f8f3a]" />
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3">
                  {images.map((item, index) => {
                    const imageSrc = getImageUrl(item.image);

                    return (
                      <div
                        key={item.id || index}
                        className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 sm:rounded-2xl"
                      >
                        <img
                          src={imageSrc}
                          alt={item.caption || title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.src = "/images/MOUNT.jpg";
                          }}
                        />

                        {item.caption && (
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2.5 pt-8 sm:p-4 sm:pt-10">
                            <p className="line-clamp-2 text-[11px] font-medium text-white sm:text-sm">
                              {item.caption}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* =================================================
                REVIEWS
            ================================================= */}

            <Reviews trip={trip} />
          </div>

          {/* =================================================
              BOOKING CARD
          ================================================= */}

          <BookingCard
            price={price}
            duration={duration}
            rating={rating}
            hasDiscount={hasDiscount}
            discountAmount={discountAmount}
            discountMessage={discountMessage}
          />
        </div>

        {/* =================================================
            RELATED PACKAGES
        ================================================= */}

        {relatedPackages.length > 0 && (
          <section className="mt-10 sm:mt-16">
            <div className="mb-5 sm:mb-8">
              <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#4f8f3a] sm:mb-2 sm:text-xs">
                You may also like
              </p>

              <h2 className="font-serif text-2xl font-semibold text-[#0b2418] sm:text-3xl md:text-4xl">
                Related Trips
              </h2>
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPackages.map((pkg, index) => {
                const relatedImage = getImageUrl(
                  pkg.image || pkg.social_image || pkg.featured_image,
                );

                const relatedTitle = pkg.title || pkg.name || "Trip";

                return (
                  <article
                    key={pkg.id || index}
                    onClick={() => {
                      if (pkg.slug) {
                        navigate(`/package/${pkg.slug}`);
                      }
                    }}
                    className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:rounded-2xl"
                  >
                    <div className="relative h-44 overflow-hidden sm:h-56">
                      <img
                        src={relatedImage}
                        alt={relatedTitle}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = "/images/MOUNT.jpg";
                        }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {pkg.rating && (
                        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[#0b2418] sm:right-4 sm:top-4 sm:px-3 sm:text-xs">
                          <Star size={12} fill="currentColor" />
                          {pkg.rating}
                        </div>
                      )}
                    </div>

                    <div className="p-4 sm:p-5">
                      <h3 className="font-serif text-lg font-semibold leading-snug text-[#0b2418] sm:text-xl">
                        {relatedTitle}
                      </h3>

                      <div className="mt-2.5 flex items-center justify-between sm:mt-3">
                        {pkg.duration && (
                          <span className="flex items-center gap-1.5 text-xs text-gray-500 sm:text-sm">
                            <Clock3 size={14} />
                            {pkg.duration} Days
                          </span>
                        )}

                        {pkg.price !== undefined &&
                          pkg.price !== null &&
                          pkg.price !== "" && (
                            <span className="text-sm font-semibold text-[#0b2418] sm:text-base">
                              ${pkg.price}
                            </span>
                          )}
                      </div>

                      <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#4f8f3a] sm:mt-4 sm:text-sm">
                        View Trip

                        <ArrowRight
                          size={15}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default TripDetail;