import React, { useState } from "react";
import { Mountain, Compass, LayoutGrid, ArrowUpRight } from "lucide-react";

const TourCategories = () => {
  const [category, setCategory] = useState("all");

  // =========================
  // TREK DATA
  // =========================
  const treks = [
    {
      title: "Everest Base Camp",
      category: "Trek",
      image: "/images/MOUNT.jpg",
      size: "large",
    },
    {
      title: "Annapurna Base Camp",
      category: "Trek",
      image: "/images/AnnapurnaTour.jpg",
      size: "small",
    },
    {
      title: "Langtang Valley",
      category: "Trek",
      image: "/images/LangtangTour.jpg",
      size: "small",
    },
  ];

  // =========================
  // TOUR DATA
  // =========================
  const tours = [
    {
      title: "City Tour",
      category: "Tour",
      image: "/images/CityTour.jpg",
      size: "small",
    },
    {
      title: "UNESCO World Heritage",
      category: "Tour",
      image: "/images/UNESCO Tour.jpg",
      size: "large",
    },
    {
      title: "Bike Tour",
      category: "Tour",
      image: "/images/BikeTour.jpg",
      size: "small",
    },
    {
      title: "Helicopter Tour",
      category: "Tour",
      image: "/images/HelicopterTour.jpg",
      size: "medium",
    },
    {
      title: "Jeep Tour",
      category: "Tour",
      image: "/images/JeepTour.jpg",
      size: "small",
    },
    {
      title: "Chitwan Safari",
      category: "Tour",
      image: "/images/CHITWAN.jpg",
      size: "medium",
    },
    {
      title: "Kailash Mansarovar Yatra",
      category: "Tour",
      image: "/images/KailashTour.jpg",
      size: "small",
    },
  ];

  const categoryOptions = [
    { key: "all", label: "All", icon: LayoutGrid, count: treks.length + tours.length },
    { key: "trek", label: "Treks", icon: Mountain, count: treks.length },
    { key: "tour", label: "Tours", icon: Compass, count: tours.length },
  ];

  // =========================
  // SHOW CARDS
  // =========================

  let cards = [];

  if (category === "all") {
    cards = [...treks, ...tours];
  } else if (category === "trek") {
    cards = treks;
  } else if (category === "tour") {
    cards = tours;
  }

  // Row-span height reference: base row = 150px, gap = 16px
  // small  -> 1 row  = 150px
  // medium -> 1 row, 2 cols wide = 150px
  // large  -> 2 rows, 2 cols wide = 316px

  return (
    <section className="bg-[#FBF9F4] px-6 py-16 md:px-10 lg:px-16">

      {/* ========================= */}
      {/* HEADING */}
      {/* ========================= */}

      <div className="mx-auto mb-10 max-w-3xl text-center">

        <h3 className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#4f8f3a]">
          <span className="h-px w-6 bg-[#4f8f3a]" />
          Tours &amp; Travel Categories
          <span className="h-px w-6 bg-[#4f8f3a]" />
        </h3>

        <h1 className="mb-4 text-3xl font-bold text-[#0b2418] sm:text-4xl lg:text-5xl">
          Choose Your Destination
        </h1>

        <p className="mx-auto max-w-2xl text-base leading-7 text-gray-500">
          Discover breathtaking treks, cultural experiences, adventure tours,
          and unforgettable journeys across Nepal.
        </p>

      </div>


      {/* ========================= */}
      {/* CATEGORY BUTTONS */}
      {/* ========================= */}

      <div className="mb-12 flex justify-center">

        <div className="inline-flex flex-wrap items-center gap-1.5 rounded-full border border-[#0b2418]/10 bg-white p-1.5 shadow-sm">

          {categoryOptions.map(({ key, label, icon: Icon, count }) => {
            const isActive = category === key;

            return (
              <button
                key={key}
                onClick={() => setCategory(key)}
                className={`
                  flex
                  items-center
                  gap-2
                  rounded-full
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  transition
                  duration-300
                  ${
                    isActive
                      ? "bg-[#0b2418] text-white shadow-md"
                      : "text-[#0b2418]/70 hover:bg-[#0b2418]/5 hover:text-[#0b2418]"
                  }
                `}
              >
                <Icon size={16} strokeWidth={2.25} />
                {label}
                <span
                  className={`
                    rounded-full
                    px-1.5
                    py-0.5
                    text-xs
                    font-bold
                    ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#0b2418]/5 text-[#0b2418]/50"
                    }
                  `}
                >
                  {count}
                </span>
              </button>
            );
          })}

        </div>

      </div>


      {/* ========================= */}
      {/* MOSAIC CARD GRID */}
      {/* ========================= */}

      <div
        className="
          mx-auto
          grid
          max-w-6xl
          auto-rows-[150px]
          grid-cols-2
          gap-4
          [grid-auto-flow:dense]
          sm:auto-rows-[160px]
          md:grid-cols-4
        "
      >

        {cards.map((card, index) => (

          <div
            key={`${card.title}-${index}`}
            className={`
              group
              relative
              overflow-hidden
              rounded-2xl
              bg-gray-200
              shadow-md
              ring-1
              ring-black/5
              transition
              duration-300
              hover:shadow-xl
              ${
                card.size === "large"
                  ? "col-span-2 row-span-2"
                  : card.size === "medium"
                  ? "col-span-2 row-span-1"
                  : "col-span-1 row-span-1"
              }
            `}
          >

            {/* IMAGE */}

            <img
              src={card.image}
              alt={card.title}
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-110
              "
            />


            {/* DARK OVERLAY */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/80
                via-black/10
                to-transparent
                transition
                duration-300
                group-hover:from-black/85
              "
            />


            {/* HOVER ARROW */}

            <div
              className="
                absolute
                right-4
                top-4
                flex
                h-9
                w-9
                translate-y-1
                items-center
                justify-center
                rounded-full
                bg-white/90
                text-[#0b2418]
                opacity-0
                shadow-md
                backdrop-blur
                transition-all
                duration-300
                group-hover:translate-y-0
                group-hover:opacity-100
              "
            >
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </div>


            {/* CONTENT */}

            <div className="absolute bottom-0 left-0 right-0 p-5">

              <span className="mb-2 inline-block rounded-full bg-[#9be564] px-3 py-1 text-xs font-semibold text-[#0b2418]">
                {card.category}
              </span>

              <h3 className="text-xl font-bold leading-snug text-white drop-shadow-sm">
                {card.title}
              </h3>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default TourCategories;