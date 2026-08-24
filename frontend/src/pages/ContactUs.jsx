import React, { useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  AlertTriangle,
  Send,
  Footprints,
  Car,
  Landmark,
  Building2,
  MessageCircle,
  PhoneCall,
  ChevronDown,
  Navigation,
} from "lucide-react";

const ContactUs = () => {
  // =========================
  // FAQ DATA
  // =========================
  const faqs = [
    {
      question: "Can I visit office before booking?",
      answer:
        "Absolutely! We welcome walk-ins at our Thamel office. Feel free to stop by anytime during office hours to discuss your trek, meet our guides, and get all your questions answered before you commit to booking.",
    },
    {
      question: "What about altitude sickness?",
      answer:
        "Safety is our top priority. All our itineraries include proper acclimatization days, and our guides are trained in altitude sickness prevention and emergency response. We also carry oxygen and communication devices on high-altitude treks.",
    },
    {
      question: "How far in advance should I book?",
      answer:
        "We recommend booking at least 4-6 weeks in advance, especially during peak seasons (March-May and September-November), to secure permits, guides, and accommodation along the trail.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept bank transfers, major credit/debit cards, and popular payment platforms like PayPal and Wise. A deposit is required to confirm booking, with the balance payable before departure.",
    },
  ];

  // =========================
  // FAQ STATE
  // =========================
  const [openFaqs, setOpenFaqs] = useState(() =>
    faqs.reduce((acc, _, index) => {
      acc[index] = false;
      return acc;
    }, {})
  );

  const allExpanded = Object.values(openFaqs).every(Boolean);

  const toggleFaq = (index) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const expandAll = () => {
    setOpenFaqs(
      faqs.reduce((acc, _, index) => {
        acc[index] = true;
        return acc;
      }, {})
    );
  };

  const collapseAll = () => {
    setOpenFaqs(
      faqs.reduce((acc, _, index) => {
        acc[index] = false;
        return acc;
      }, {})
    );
  };

  return (
    <div className=" bg-[#FBF9F4]">

      {/* ============================================= */}
      {/* HERO / TOP BANNER */}
      {/* ============================================= */}

      <div className="relative overflow-hidden">

        <img
          src="/images/API.jpg"
          alt="Sagarmatha Treks office in Thamel"
          className="h-[420px] w-full object-cover sm:h-[480px]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0b2418]/90 via-[#0b2418]/60 to-[#0b2418]/30" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">

          <span className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#9be564]">
            - Get In Touch
          </span>

          <h2 className="mb-4 max-w-2xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Visit Us in Thamel, Kathmandu
          </h2>

          <p className="mb-8 max-w-xl text-sm leading-6 text-white/85 sm:text-base sm:leading-7">
            We're here to help plan your perfect Himalayan adventure. Stop by
            our office or send us a message.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">

            <span className="flex cursor-pointer items-center gap-2 rounded-full bg-[#9be564] px-6 py-3 text-sm font-semibold text-[#0b2418] shadow-lg transition duration-300 hover:bg-[#88d24f]">
              <PhoneCall size={17} />
              Call Now
            </span>

            <span className="flex cursor-pointer items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition duration-300 hover:bg-white/20">
              <Navigation size={16} />
              Get Directions
            </span>

          </div>

        </div>

      </div>


      {/* ============================================= */}
      {/* CONTACT INFO + FORM */}
      {/* ============================================= */}

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-16 md:px-10 lg:grid-cols-2 lg:px-16">

        {/* ================================= */}
        {/* LEFT - CONTACT INFO */}
        {/* ================================= */}

        <div>

          <h2 className="mb-3 text-2xl font-bold text-[#0b2418] sm:text-3xl">
            Let's Start Your Adventure
          </h2>

          <p className="mb-8 text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
            Have questions about a trek? Ready to book? Or just want to chat
            about the Himalayas? We'd love to hear from you. Our team
            typically responds within 2 hours during business hours.
          </p>

          <div className="space-y-5">

            {/* OFFICE ADDRESS */}
            <div className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eaf6df] text-[#4f8f3a]">
                <MapPin size={20} />
              </span>
              <div>
                <p className="font-bold text-[#0b2418]">Office Address</p>
                <p className="text-sm text-gray-500">Saat Ghumti Chowk, Thamel</p>
                <p className="text-sm text-gray-500">Kathmandu, Nepal</p>
                <p className="text-sm text-gray-500">Post Box: 21576</p>
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eaf6df] text-[#4f8f3a]">
                <Mail size={20} />
              </span>
              <div>
                <p className="font-bold text-[#0b2418]">Email Us</p>
                <p className="text-sm font-semibold text-green-600">
                  info@sagarmathatreks.com
                </p>
              </div>
            </div>

            {/* PHONE */}
            <div className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eaf6df] text-[#4f8f3a]">
                <Phone size={20} />
              </span>
              <div>
                <p className="font-bold text-[#0b2418]">Phone</p>
                <p className="text-sm font-semibold text-green-600">
                  +977 9851054140
                </p>
                <p className="text-sm text-gray-500">
                  Landline: +977 15352366
                </p>
              </div>
            </div>

            {/* OFFICE HOURS */}
            <div className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eaf6df] text-[#4f8f3a]">
                <Clock size={20} />
              </span>
              <div>
                <p className="font-bold text-[#0b2418]">Office Hours</p>
                <p className="text-sm text-gray-500">
                  Sunday - Friday: 9:00 AM - 6:00 PM
                </p>
                <p className="text-sm text-gray-500">
                  Saturday: 10:00 AM - 4:00 PM
                </p>
                <p className="text-sm text-gray-500">
                  (Nepal Time: GMT+5:45)
                </p>
              </div>
            </div>

            {/* EMERGENCY SOS */}
            <div className="flex gap-4 rounded-2xl border border-red-200 bg-red-50 p-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                <AlertTriangle size={20} />
              </span>
              <div>
                <p className="font-bold text-[#0b2418]">
                  24/7 Emergency SOS
                </p>
                <p className="text-sm text-gray-500">
                  For trekkers currently on expedition:
                </p>
                <p className="text-sm font-bold text-red-700">
                  +977 9851054140
                </p>
              </div>
            </div>

          </div>

        </div>


        {/* ================================= */}
        {/* RIGHT - CONTACT FORM */}
        {/* ================================= */}

        <div className="h-fit rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

          <h2 className="mb-2 text-2xl font-bold text-[#0b2418] sm:text-3xl">
            Any Queries? Let Us Know.
          </h2>

          <p className="mb-6 text-sm leading-6 text-gray-500">
            Fill out the form below and we'll get back to you within 2 hours.
          </p>

          <form className="space-y-4">

            <div>
              <label className="mb-1.5 block text-sm font-bold text-[#0b2418]">
                Your Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#0b2418] outline-none transition focus:border-[#4f8f3a] focus:ring-2 focus:ring-[#4f8f3a]/20"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-bold text-[#0b2418]">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#0b2418] outline-none transition focus:border-[#4f8f3a] focus:ring-2 focus:ring-[#4f8f3a]/20"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div>
                <label className="mb-1.5 block text-sm font-bold text-[#0b2418]">
                  Country
                </label>
                <select
                  defaultValue=""
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-[#0b2418] outline-none transition focus:border-[#4f8f3a] focus:ring-2 focus:ring-[#4f8f3a]/20"
                >
                  <option value="" disabled>
                    Select your country
                  </option>
                  <option value="nepal">Nepal</option>
                  <option value="usa">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="india">India</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-[#0b2418]">
                  Phone No.
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#0b2418] outline-none transition focus:border-[#4f8f3a] focus:ring-2 focus:ring-[#4f8f3a]/20"
                />
              </div>

            </div>

            <div>
              <label className="mb-1.5 block text-sm font-bold text-[#0b2418]">
                Subject
              </label>
              <input
                type="text"
                placeholder="What is this regarding?"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#0b2418] outline-none transition focus:border-[#4f8f3a] focus:ring-2 focus:ring-[#4f8f3a]/20"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-bold text-[#0b2418]">
                Your Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your trekking dreams, questions or any details you'd like to share..."
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#0b2418] outline-none transition focus:border-[#4f8f3a] focus:ring-2 focus:ring-[#4f8f3a]/20"
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#9be564] px-6 py-3 text-sm font-bold text-[#0b2418] shadow-md transition duration-300 hover:bg-[#88d24f]"
            >
              <Send size={17} />
              Send Message
            </button>

            <p className="text-center text-xs text-gray-400">
              We respect your privacy. No spam, ever.
            </p>

          </form>

        </div>

      </div>


      {/* ============================================= */}
      {/* FIND US / MAP SECTION */}
      {/* ============================================= */}

      <div className="bg-white px-6 py-16 md:px-10 lg:px-16">

        <div className="mx-auto max-w-6xl">

          <div className="mb-10 text-center">

            <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#4f8f3a]">
              - Find Us
            </h4>

            <h1 className="mb-3 text-3xl font-bold text-[#0b2418] sm:text-4xl">
              Our Location in Thamel
            </h1>

            <p className="mx-auto max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
              Located in the heart of Kathmandu's tourist district, we're
              easy to find.
            </p>

          </div>

          {/* MAP PLACEHOLDER */}
          <div className="mb-10 flex h-[320px] w-full items-center justify-center rounded-3xl border border-gray-200 bg-[#eaf6df] sm:h-[380px]">
            <div className="flex flex-col items-center gap-2 text-[#4f8f3a]">
              <MapPin size={32} />
              <p className="text-sm font-semibold">Interactive map goes here</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl border border-gray-200 bg-[#FBF9F4] p-5">
              <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#eaf6df] text-[#4f8f3a]">
                <Footprints size={20} />
              </span>
              <p className="mb-1 font-bold text-[#0b2418]">
                Walking Distance
              </p>
              <p className="text-sm text-gray-500">
                10 min from Thamel Main Street
              </p>
              <p className="text-sm text-gray-500">
                15 min from Kathmandu Durbar Square
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-[#FBF9F4] p-5">
              <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#eaf6df] text-[#4f8f3a]">
                <Car size={20} />
              </span>
              <p className="mb-1 font-bold text-[#0b2418]">From Airport</p>
              <p className="text-sm text-gray-500">20 min by taxi (~$10)</p>
              <p className="text-sm text-gray-500">35 min by local bus</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-[#FBF9F4] p-5">
              <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#eaf6df] text-[#4f8f3a]">
                <Landmark size={20} />
              </span>
              <p className="mb-1 font-bold text-[#0b2418]">
                Nearby Landmarks
              </p>
              <p className="text-sm text-gray-500">Near Garden of Dreams</p>
              <p className="text-sm text-gray-500">
                Close to Kathmandu Guest House
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-[#FBF9F4] p-5">
              <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#eaf6df] text-[#4f8f3a]">
                <Building2 size={20} />
              </span>
              <p className="mb-1 font-bold text-[#0b2418]">
                Office Location
              </p>
              <p className="text-sm text-gray-500">
                2nd Floor, Building near Clock Tower
              </p>
              <p className="text-sm text-gray-500">Opposite Thamel Park</p>
            </div>

          </div>

        </div>

      </div>


      {/* ============================================= */}
      {/* FAQ SECTION */}
      {/* ============================================= */}

      <div className="px-6 py-16 md:px-10 lg:px-16">

        <div className="mx-auto max-w-3xl">

          <div className="mb-8 text-center">

            <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#4f8f3a]">
              - Common Questions
            </h4>

            <h1 className="text-3xl font-bold text-[#0b2418] sm:text-4xl">
              Contact &amp; Booking FAQs
            </h1>

          </div>

          <div className="mb-5 flex justify-end gap-2">

            <button
              onClick={expandAll}
              disabled={allExpanded}
              className="rounded-full border border-[#0b2418]/15 bg-white px-4 py-2 text-xs font-semibold text-[#0b2418] transition duration-200 hover:bg-[#0b2418] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#0b2418]"
            >
              Expand All
            </button>

            <button
              onClick={collapseAll}
              disabled={!Object.values(openFaqs).some(Boolean)}
              className="rounded-full border border-[#0b2418]/15 bg-white px-4 py-2 text-xs font-semibold text-[#0b2418] transition duration-200 hover:bg-[#0b2418] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#0b2418]"
            >
              Collapse All
            </button>

          </div>

          <div className="space-y-3">

            {faqs.map((faq, index) => {
              const isOpen = openFaqs[index];

              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >

                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-semibold text-[#0b2418] sm:text-base">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-[#4f8f3a] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-gray-100 px-5 pb-4 pt-3 text-sm leading-6 text-gray-500">
                        {faq.answer}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>


      {/* ============================================= */}
      {/* BOTTOM CTA */}
      {/* ============================================= */}

      <div className="relative mx-6 mb-16 overflow-hidden rounded-3xl md:mx-10 lg:mx-16">

        <img
          src="/images/MOUNT.jpg"
          alt="Trekking guides ready to help"
          className="h-[280px] w-full object-cover sm:h-[320px]"
        />

        <div className="absolute inset-0 bg-[#0b2418]/80" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">

          <h1 className="mb-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Still Have Questions?
          </h1>

          <p className="mb-7 max-w-lg text-sm leading-6 text-white/85 sm:text-base">
            Chat with our trekking experts on WhatsApp. We're here 24/7 to
            help.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">

            <span className="flex cursor-pointer items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-lg transition duration-300 hover:bg-[#1fb855]">
              <MessageCircle size={18} />
              Chat on WhatsApp
            </span>

            <span className="flex cursor-pointer items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition duration-300 hover:bg-white/20">
              <PhoneCall size={17} />
              Call Us Now
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ContactUs;