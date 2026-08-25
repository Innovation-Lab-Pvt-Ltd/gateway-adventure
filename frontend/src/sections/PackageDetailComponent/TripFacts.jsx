import React from "react";
import {
  CalendarDays,
  Mountain,
  Users,
  Clock,
  Sun,
  Car,
  Star,
} from "lucide-react";

const TripFacts = ({ trip }) => {
  const duration = trip.duration ?? "N/A";

  const rating = trip.rating ?? "N/A";

  const groupSize =
    trip.group_size ?? "N/A";

  const altitude =
    trip.max_altitude ?? "N/A";

  const walkHours =
    trip.walk_in_hours ?? "N/A";

  const season =
    trip.best_season || "Spring & Autumn";

  const transportation =
    trip.transportation || "Private transportation";

  const difficulty =
    Number(trip.grade_id) === 1
      ? "Easy"
      : Number(trip.grade_id) === 2
      ? "Moderate"
      : Number(trip.grade_id) === 3
      ? "Challenging"
      : "Moderate";

  return (
    <div className="mb-12">

      <h2 className="mb-6 text-2xl font-bold text-[#0b2418]">
        Trip Facts
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

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
          value={
            walkHours !== "N/A"
              ? `${walkHours} hrs`
              : "N/A"
          }
        />

        <TripFact
          icon={<Sun size={22} />}
          label="Best Season"
          value={season}
        />

        <TripFact
          icon={<Car size={22} />}
          label="Transportation"
          value={transportation}
        />

        <TripFact
          icon={
            <Star
              size={22}
              fill="currentColor"
            />
          }
          label="Rating"
          value={
            rating !== "N/A"
              ? `${rating} / 5`
              : "N/A"
          }
          star
        />

      </div>

    </div>
  );
};


// Small reusable card inside TripFacts
const TripFact = ({
  icon,
  label,
  value,
  star = false,
}) => {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      <div
        className={`mb-3 ${
          star
            ? "text-[#f5b942]"
            : "text-[#4f8f3a]"
        }`}
      >
        {icon}
      </div>

      <p className="text-xs uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 font-bold text-[#0b2418]">
        {value}
      </p>

    </div>
  );
};

export default TripFacts;