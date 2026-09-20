import React, { useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";
import Whatsapp from "../sections/home/Whatsapp";

const Footer = () => {
  const [showWhatsapp, setShowWhatsapp] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-[#2F2F2F] text-[#ADADAD]">

      {/* =====================================================
          DARK OVERLAY
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[#2F2F2F]/75" />

      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">

        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">

          {/* =================================================
              BRAND
          ================================================== */}
          <div className="lg:col-span-4">

            {/* Logo + Brand */}
            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#ADADAD]/30">

                <img
                  src="/TrekLogo.png"
                  alt="Gateway Adventure"
                  className="h-10 w-10 object-contain"
                />

              </div>

              <div>

                <h2 className="font-playfair text-2xl tracking-wide text-white">
                  Gateway Adventure
                </h2>

                <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[#ADADAD]">
                  Explore Beyond
                </p>

              </div>

            </div>


            {/* Description */}
            <p className="mt-7 max-w-md text-sm leading-7 text-[#ADADAD]">
              Discover Nepal through unforgettable journeys, breathtaking
              landscapes, rich culture, and experiences designed to stay with
              you forever.
            </p>


            {/* Social Links */}
            <div className="mt-8 flex items-center gap-3">

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full
                  border border-[#ADADAD]/30
                  text-xs font-semibold text-[#ADADAD]
                  transition-all duration-300
                  hover:border-white
                  hover:bg-white
                  hover:text-[#2F2F2F]
                "
              >
                IG
              </a>


              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full
                  border border-[#ADADAD]/30
                  text-sm font-semibold text-[#ADADAD]
                  transition-all duration-300
                  hover:border-white
                  hover:bg-white
                  hover:text-[#2F2F2F]
                "
              >
                f
              </a>


              {/* YouTube */}
              <a
                href="#"
                aria-label="YouTube"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full
                  border border-[#ADADAD]/30
                  text-xs font-semibold text-[#ADADAD]
                  transition-all duration-300
                  hover:border-white
                  hover:bg-white
                  hover:text-[#2F2F2F]
                "
              >
                YT
              </a>


              {/* X */}
              <a
                href="#"
                aria-label="X"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full
                  border border-[#ADADAD]/30
                  text-sm font-semibold text-[#ADADAD]
                  transition-all duration-300
                  hover:border-white
                  hover:bg-white
                  hover:text-[#2F2F2F]
                "
              >
                X
              </a>

            </div>

          </div>


          {/* =================================================
              COMPANY
          ================================================== */}
          <div className="lg:col-span-2">

            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Company
            </h3>

            <ul className="space-y-4 text-sm">

              <li>
                <a
                  href="/"
                  className="transition-colors duration-300 hover:text-white"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/about-us"
                  className="transition-colors duration-300 hover:text-white"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="/blog"
                  className="transition-colors duration-300 hover:text-white"
                >
                  Our Blog
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-white"
                >
                  Contact
                </a>
              </li>

            </ul>

          </div>


          {/* =================================================
              EXPLORE
          ================================================== */}
          <div className="lg:col-span-2">

            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Explore
            </h3>

            <ul className="space-y-4 text-sm">

              <li>
                <a
                  href="/packages"
                  className="transition-colors duration-300 hover:text-white"
                >
                  Our Trips
                </a>
              </li>

              <li>
                <a
                  href="/destinations"
                  className="transition-colors duration-300 hover:text-white"
                >
                  Destinations
                </a>
              </li>

              <li>
                <a
                  href="/activities"
                  className="transition-colors duration-300 hover:text-white"
                >
                  Activities
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-white"
                >
                  Trekking
                </a>
              </li>

            </ul>

          </div>


          {/* =================================================
              RESOURCES
          ================================================== */}
          <div className="lg:col-span-2">

            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Resources
            </h3>

            <ul className="space-y-4 text-sm">

              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-white"
                >
                  Travel Guide
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-white"
                >
                  FAQ
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-white"
                >
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-white"
                >
                  Privacy Policy
                </a>
              </li>

            </ul>

          </div>


          {/* =================================================
              CONTACT
          ================================================== */}
          <div className="lg:col-span-2">

            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Contact
            </h3>

            <div className="space-y-5">

              {/* Location */}
              <div className="flex items-start gap-3">

                <MapPin
                  size={18}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-[#ADADAD]"
                />

                <p className="text-sm leading-6">
                  Kathmandu,
                  <br />
                  Nepal
                </p>

              </div>


              {/* Email */}
              <a
                href="mailto:gateway@gmail.com"
                className="
                  flex items-center gap-3
                  text-sm
                  transition-colors duration-300
                  hover:text-white
                "
              >

                <Mail
                  size={18}
                  strokeWidth={1.5}
                  className="shrink-0"
                />

                <span>
                  gateway@gmail.com
                </span>

              </a>


              {/* Phone */}
              <a
                href="tel:+9779800000000"
                className="
                  flex items-center gap-3
                  text-sm
                  transition-colors duration-300
                  hover:text-white
                "
              >

                <Phone
                  size={18}
                  strokeWidth={1.5}
                  className="shrink-0"
                />

                <span>
                  +977 9800000000
                </span>

              </a>

            </div>


            {/* =================================================
                CHAT WITH US
            ================================================== */}
            <button
              type="button"
              onClick={() => setShowWhatsapp(true)}
              className="
                mt-7
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-[#ADADAD]/30
                bg-transparent
                px-5
                py-3
                text-sm
                font-medium
                text-[#ADADAD]
                transition-all
                duration-300
                hover:border-white
                hover:bg-white
                hover:text-[#2F2F2F]
              "
            >

              <MessageCircle size={18} />

              Chat With Us

            </button>

          </div>

        </div>


        {/* =====================================================
            DIVIDER
        ====================================================== */}
        <div className="my-14 h-px w-full bg-[#ADADAD]/15" />


        {/* =====================================================
            FOOTER STATEMENT
        ====================================================== */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">

          <div>

            <p className="font-playfair text-3xl leading-tight text-white sm:text-4xl">
              Explore more.
            </p>

            <p className="font-playfair text-3xl italic leading-tight text-[#ADADAD] sm:text-4xl">
              Experience more.
            </p>

          </div>


          <p className="max-w-sm text-left text-xs leading-6 text-[#ADADAD] md:text-right">
            Crafted for travelers who seek meaningful experiences,
            unforgettable adventures, and the beauty of Nepal.
          </p>

        </div>

      </div>


      {/* =====================================================
          BOTTOM BAR
      ====================================================== */}
      <div className="relative z-10 border-t border-[#ADADAD]/10">

        <div className="
          mx-auto
          flex
          max-w-7xl
          flex-col
          items-center
          justify-between
          gap-3
          px-6
          py-5
          text-xs
          text-[#ADADAD]
          sm:px-8
          md:flex-row
          lg:px-10
        ">

          <p>
            © {new Date().getFullYear()} Gateway Adventure.
            All rights reserved.
          </p>

          <p className="tracking-wide">
            Made for the journey.
          </p>

        </div>

      </div>


      {/* =====================================================
          WHATSAPP MODAL
      ====================================================== */}
      {showWhatsapp && (
        <Whatsapp
          onClose={() => setShowWhatsapp(false)}
        />
      )}

    </footer>
  );
};

export default Footer;