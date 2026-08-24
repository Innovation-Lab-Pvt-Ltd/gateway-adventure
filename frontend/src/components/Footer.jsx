import {
  MapPin,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import Whatsapp from "../sections/home/Whatsapp";

const Footer = () => {
  const [showWhatsapp, setShowWhatsapp] = useState(false);
  return (
    <footer className="bg-[#08261b] text-white">

      {/* ================= MAIN FOOTER ================= */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.1fr_1.5fr_0.8fr]">

          {/* ================= COMPANY INFO ================= */}
          <div>

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg font-bold text-[#08261b]">
                G
              </div>

              <h1 className="text-xl font-bold text-white">
                GatewayAdventure
              </h1>
            </div>

            {/* Description */}
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/70">
              A locally owned Nepal trekking company crafting safe,
              personal and responsible Himalayan journeys since 2021.
            </p>

            {/* Social Icons */}
            <div className="mt-5 flex gap-3">

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-[#86efac] transition hover:bg-[#86efac] hover:text-[#08261b]"
              >
                IG
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-[#86efac] transition hover:bg-[#86efac] hover:text-[#08261b]"
              >
                f
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm text-[#86efac] transition hover:bg-[#86efac] hover:text-[#08261b]"
              >
                ▶
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-[#86efac] transition hover:bg-[#86efac] hover:text-[#08261b]"
              >
                X
              </a>

            </div>

            {/* Certifications */}
            <div className="mt-6 grid grid-cols-2 gap-2">

              <div className="rounded-md border border-white/10 bg-white/5 p-2 text-center">
                <p className="text-[11px] font-bold text-white">
                  Govt. Licensed
                </p>
              </div>

              <div className="rounded-md border border-white/10 bg-white/5 p-2 text-center">
                <p className="text-[11px] font-bold text-white">
                  NMA Member
                </p>
              </div>

              <div className="rounded-md border border-white/10 bg-white/5 p-2 text-center">
                <p className="text-[11px] font-bold text-white">
                  TAN Member
                </p>
              </div>

              <div className="rounded-md border border-white/10 bg-white/5 p-2 text-center">
                <p className="text-[11px] font-bold text-white">
                  Tripadvisor 4.9/5
                </p>
              </div>

            </div>

          </div>


          {/* ================= LINKS ================= */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">

            {/* COMPANY */}
            <div>
              <h3 className="mb-5 text-sm font-bold tracking-widest text-white">
                COMPANY
              </h3>

              <ul className="space-y-3 text-sm text-white/70">

                <li>
                  <a href="/" className="transition hover:text-[#86efac]">
                    About Us
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:text-[#86efac]">
                    Our Team
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:text-[#86efac]">
                    Responsible Tourism
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:text-[#86efac]">
                    Contact
                  </a>
                </li>

              </ul>
            </div>


            {/* EXPLORE */}
            <div>
              <h3 className="mb-5 text-sm font-bold tracking-widest text-white">
                EXPLORE
              </h3>

              <ul className="space-y-3 text-sm text-white/70">

                <li>
                  <a href="#" className="transition hover:text-[#86efac]">
                    Everest
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:text-[#86efac]">
                    Annapurna
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:text-[#86efac]">
                    Langtang
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:text-[#86efac]">
                    Mustang
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:text-[#86efac]">
                    Manaslu
                  </a>
                </li>

              </ul>
            </div>


            {/* RESOURCES */}
            <div>
              <h3 className="mb-5 text-sm font-bold tracking-widest text-white">
                RESOURCES
              </h3>

              <ul className="space-y-3 text-sm text-white/70">

                <li>
                  <a href="#" className="transition hover:text-[#86efac]">
                    Trekking Guide
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:text-[#86efac]">
                    Travel Information
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:text-[#86efac]">
                    Blog
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:text-[#86efac]">
                    FAQs
                  </a>
                </li>

              </ul>
            </div>

          </div>


          {/* ================= CONTACT ================= */}
          <div className="md:ml-auto md:w-full md:max-w-[240px]">

            <h3 className="mb-5 text-sm font-bold tracking-widest text-white">
              CONTACT
            </h3>

            <div className="space-y-6">

              {/* Location */}
              <div className="flex items-start gap-3">

                <MapPin
                  size={19}
                  className="mt-1 shrink-0 text-[#86efac]"
                />

                <div>
                  <p className="text-xs font-bold text-white/50">
                    Location
                  </p>

                  <p className="mt-1 text-sm text-white/80">
                    Thamel, Kathmandu, Nepal
                  </p>
                </div>

              </div>


              {/* Email */}
              <div className="flex items-start gap-3">

                <Mail
                  size={19}
                  className="mt-1 shrink-0 text-[#86efac]"
                />

                <div>
                  <p className="text-xs font-bold text-white/50">
                    Email
                  </p>

                  <p className="mt-1 text-sm text-white/80">
                    gateway@gmail.com
                  </p>
                </div>

              </div>


              {/* Phone */}
              <div className="flex items-start gap-3">

                <Phone
                  size={19}
                  className="mt-1 shrink-0 text-[#86efac]"
                />

                <div>
                  <p className="text-xs font-bold text-white/50">
                    Phone
                  </p>

                  <p className="mt-1 text-sm text-white/80">
                    +977 9800000000
                  </p>
                </div>

              </div>

            </div>


            {/* Chat Button */}
            <button className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#86efac] px-5 py-3 text-sm font-bold text-[#08261b] transition hover:bg-white"  onClick={() => setShowWhatsapp(true)}>

              <MessageCircle size={18} />

              Chat With Us

            </button>

          </div>

        </div>

      </div>


      {/* ================= BOTTOM FOOTER ================= */}
      <div className="border-t border-white/10 bg-[#051a12]">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-4 text-xs text-white/60 sm:flex-row lg:px-8">

          <p>
            © 2026 Sagarmatha Treks & Expeditions Pvt. Ltd.
            All rights reserved.
          </p>

          <div className="flex gap-4">

            <a
              href="#"
              className="transition hover:text-white"
            >
              Privacy Policy
            </a>

            <span>|</span>

            <a
              href="#"
              className="transition hover:text-white"
            >
              Terms & Conditions
            </a>

          </div>

        </div>

      </div>
       {showWhatsapp && (
        <Whatsapp
          
          onClose={() => setShowWhatsapp(false)}
        />
      )}

    </footer>
  );
};

export default Footer;