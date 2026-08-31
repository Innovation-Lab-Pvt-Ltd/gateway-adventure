import React, { useState } from "react";
import {
  CalendarDays,
  Clock3,
  Gauge,
  Mountain,
  Star,
  Check,
} from "lucide-react";

const Tripofmonth = () => {
  const [selectedTrip, setSelectedTrip] = useState("everest");

  const trips = {
    everest: {
      title: "Everest Climbing",
      image: "/images/MOUNT.jpg",
      discount: "8.33%",
      price: "$1,190",

      details: [
        { icon: Clock3, text: "12 Days" },
        { icon: Gauge, text: "Moderate" },
        { icon: Mountain, text: "Max 8840m" },
        { icon: Star, text: "Rating 4.2" },
      ],

      description:
        "Experience the breathtaking Himalayas and the world's highest mountain. Explore the legendary Everest region and enjoy spectacular mountain views.",

      why: "This is a perfect time to explore the Everest region, with beautiful mountain views and favorable trekking conditions.",
    },

    api: {
      title: "Api Base Camp Trek",
      image: "/images/API.jpg",
      discount: "10%",
      price: "$1,350",

      details: [
        { icon: Clock3, text: "14 Days" },
        { icon: Gauge, text: "Hard" },
        { icon: Mountain, text: "Max 7132m" },
        { icon: Star, text: "Rating 4.5" },
      ],

      description:
        "Discover the remote and beautiful Api region of western Nepal. Experience untouched landscapes, dramatic mountains, and traditional Himalayan culture.",

      why: "Api is ideal for travelers looking for a remote Himalayan adventure away from the more crowded trekking routes.",
    },

    chitwan: {
      title: "Chitwan Jungle Safari",
      image: "/images/CHITWAN.jpg",
      discount: "15%",
      price: "$590",

      details: [
        { icon: Clock3, text: "3 Days" },
        { icon: Gauge, text: "Easy" },
        { icon: Mountain, text: "Terai Region" },
        { icon: Star, text: "Rating 4.6" },
      ],

      description:
        "Explore the beautiful Chitwan National Park and experience wildlife, jungle safaris, canoe rides, and the natural beauty of Nepal's Terai region.",

      why: "Chitwan is perfect this month for wildlife experiences, jungle activities, and exploring Nepal's diverse natural environment.",
    },
  };

  const trip = trips[selectedTrip];

  return (
    <div className="relative grid grid-cols-1 gap-10 bg-[#141714] p-6 text-white sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-16">
      {/* =====================================================
          LEFT COLUMN
      ====================================================== */}
      <div className="flex flex-col justify-center">
        {/* Heading */}
        <h6 className="mb-6 text-sm font-semibold tracking-[0.25em] text-green-300">
          - TRIP OF THE MONTH
        </h6>

        {/* Trip Selector */}
        <div className="mb-8 flex w-fit gap-2 rounded-xl border border-white/10 bg-white/5 p-1">
          <button
            onClick={() => setSelectedTrip("everest")}
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 ${
              selectedTrip === "everest"
                ? "bg-green-500 text-green-950 shadow-lg"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            EVEREST
          </button>

          <button
            onClick={() => setSelectedTrip("api")}
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 ${
              selectedTrip === "api"
                ? "bg-green-300 text-green-950 shadow-lg"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            API
          </button>

          <button
            onClick={() => setSelectedTrip("chitwan")}
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 ${
              selectedTrip === "chitwan"
                ? "bg-green-300 text-green-950 shadow-lg"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            CHITWAN
          </button>
        </div>

        {/* Title */}
        <h1 className="mb-5 text-3xl font-bold sm:text-4xl lg:text-5xl">
          {trip.title}
        </h1>

        {/* Details */}
        <div className="mb-7 flex flex-wrap gap-3">
          {trip.details.map((detail, index) => {
            const Icon = detail.icon;

            return (
              <div
                key={index}
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm backdrop-blur-sm transition hover:border-green-300/50 hover:bg-green-300/10"
              >
                <Icon size={17} strokeWidth={1.8} className="text-green-300" />

                <span className="text-white/90">{detail.text}</span>
              </div>
            );
          })}
        </div>

        {/* Description */}
        <p className="mb-8 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
          {trip.description}
        </p>

        {/* Why This Month */}
        <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-md transition hover:border-green-300/30 sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-300/10">
              <CalendarDays
                size={22}
                strokeWidth={1.8}
                className="text-green-300"
              />
            </div>

            <h2 className="text-xl font-semibold text-green-300">
              Why this month?
            </h2>
          </div>

          <p className="text-sm leading-7 text-white/75 sm:text-base">
            {trip.why}
          </p>
        </div>

        {/* Explore Button */}
        <button className="mt-8 w-fit rounded-full bg-white px-6 py-3 font-bold text-green-950 transition-all duration-300 hover:bg-green-500 hover:shadow-lg hover:shadow-green-300/20">
          Explore This Trek →
        </button>
      </div>

      {/* =====================================================
          RIGHT COLUMN
      ====================================================== */}
      <div className="relative flex flex-col items-center">
        {/* =================================================
            IMAGE
        ================================================== */}
        <div className="relative h-[300px] w-full sm:h-[400px] lg:h-[500px]">
          {/* Image */}
          <div className="h-full w-full overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={trip.image}
              alt={trip.title}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* =================================================
              LARGE ROTATING DISCOUNT CIRCLE
          ================================================== */}
          <div
            className="
              absolute
              -right-8
              -top-8
              z-30
              flex
              h-36
              w-36
              items-center
              justify-center
              rounded-full
              bg-white
              shadow-2xl
              sm:-right-10
              sm:-top-10
              sm:h-44
              sm:w-44
              lg:-right-12
              lg:-top-12
              lg:h-48
              lg:w-48
            "
          >
            {/* Rotating Text */}
            <div className="absolute inset-0 animate-[spin_12s_linear_infinite]">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <defs>
                  <path
                    id="discountCircle"
                    d="
                      M 50,50
                      m -37,0
                      a 37,37 0 1,1 74,0
                      a 37,37 0 1,1 -74,0
                    "
                  />
                </defs>

                <text
                  className="
                    fill-gray-800
                    text-[7px]
                    font-black
                    uppercase
                    tracking-[1.5px]
                  "
                >
                  <textPath href="#discountCircle" startOffset="0%">
                    {trip.discount} OFF • {trip.discount} OFF • {trip.discount}{" "}
                    OFF •
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Center Discount */}
            <div className="relative z-10 flex flex-col items-center">
              <span
                className="
                  font-serif
                  text-3xl
                  font-black
                  italic
                  tracking-tight
                  text-gray-900
                  sm:text-4xl
                  lg:text-4xl
                "
              >
                {trip.discount}
              </span>

              <span
                className="
                  mt-1
                  text-sm
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  text-gray-800
                "
              >
                OFF
              </span>

              <div className="mt-2 h-1 w-8 rounded-full bg-green-400" />
            </div>
          </div>

          {/* =================================================
              PRICE CARD
              90% WIDTH OF IMAGE
          ================================================== */}
          <div
            className="
              absolute
              -bottom-12
              left-1/2
              z-20
              w-[90%]
              -translate-x-1/2
              rounded-2xl
              bg-white
              px-5
              py-5
              shadow-2xl
              sm:-bottom-14
              sm:px-7
              sm:py-6
              lg:-bottom-16
              lg:px-9
              lg:py-7
            "
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* ================= PRICE ================= */}

              <span className="text-sm font-medium text-gray-500 sm:text-base">
                From{" "}
                <span
                  className="
                      text-2xl
                      font-bold
                      
                      text-gray-900
                      sm:text-4xl
                    "
                >
                  {trip.price}
                </span>
                per person
              </span>

              

              {/* ================= DIVIDER ================= */}
              <div className="hidden h-12 w-px bg-gray-200 sm:block" />

              {/* ================= ALL INCLUDED ================= */}
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-green-600">
                  <Check size={15} strokeWidth={3} className="text-green-600" />
                </div>

                <span
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-green-700
                    sm:text-sm
                  "
                >
                  All included
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Space reserved for overlapping price card */}
        <div className="h-12 sm:h-14 lg:h-16" />
      </div>
    </div>
  );
};

export default Tripofmonth;
