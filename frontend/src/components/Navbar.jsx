import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // =========================================================
  // PACKAGE DETAIL PAGE
  // =========================================================
  const isPackageDetail =
    location.pathname.startsWith("/package/");

  // =========================================================
  // SCROLL DETECTION
  // =========================================================
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =========================================================
  // NAVBAR STATE
  // =========================================================
  //
  // Package Detail:
  // Always white
  //
  // Other pages:
  // Top = transparent
  // Scroll = white
  //
  const navbarSolid = isPackageDetail || scrolled;

  // =========================================================
  // NAVIGATION LINK STYLE
  // =========================================================
  const navLinkStyle = `
    relative
    font-montserrat
    text-sm
    font-medium
    tracking-wide
    transition-colors
    duration-300

    after:absolute
    after:-bottom-1
    after:left-0
    after:h-[1px]
    after:w-full
    after:origin-left
    after:scale-x-0
    after:bg-pink-500
    after:transition-transform
    after:duration-300
    hover:after:scale-x-100
  `;

  return (
    <nav
      className={`
        fixed
        left-0
        top-0
        z-50
        w-full
        transition-all
        duration-300
        ${
          navbarSolid
            ? "bg-white shadow-md"
            : "bg-transparent"
        }
      `}
    >
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-6
          py-4
          lg:px-8
        "
      >

        {/* =====================================================
            LOGO
        ===================================================== */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          {/* Logo Image */}

          <img
            src="/TrekLogo.png"
            alt="Gateway Adventure"
            className="h-10 w-10 object-contain"
          />

          {/* Logo Text */}

          <div>
            <h1
              className={`
                font-montserrat
                text-xl
                font-semibold
                leading-none
                transition-colors
                duration-300
                ${
                  navbarSolid
                    ? "text-[#0b2418]"
                    : "text-white"
                }
              `}
            >
              GatewayAdventure
            </h1>

            <p
              className={`
                mt-1
                font-montserrat
                text-[9px]
                uppercase
                tracking-[0.2em]
                transition-colors
                duration-300
                ${
                  navbarSolid
                    ? "text-[#2F6B4F]"
                    : "text-white/70"
                }
              `}
            >
              Explore Nepal
            </p>
          </div>
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
        ===================================================== */}

        <div className="hidden items-center gap-8 md:flex">

          {/* HOME */}

          <Link
            to="/"
            className={`
              ${navLinkStyle}
              ${
                navbarSolid
                  ? "text-[#0b2418]"
                  : "text-white"
              }
            `}
          >
            Home
          </Link>

          {/* ACTIVITY */}

          <Link
            to="/activity"
            className={`
              ${navLinkStyle}
              ${
                navbarSolid
                  ? "text-[#0b2418]"
                  : "text-white"
              }
            `}
          >
            Activity
          </Link>

          {/* DESTINATIONS */}

          <Link
            to="/destinations"
            className={`
              ${navLinkStyle}
              ${
                navbarSolid
                  ? "text-[#0b2418]"
                  : "text-white"
              }
            `}
          >
            Destinations
          </Link>

          {/* ABOUT US */}

          <Link
            to="/AboutUs"
            className={`
              ${navLinkStyle}
              ${
                navbarSolid
                  ? "text-[#0b2418]"
                  : "text-white"
              }
            `}
          >
            About Us
          </Link>

          {/* FAQ */}

          <Link
            to="/faq"
            className={`
              ${navLinkStyle}
              ${
                navbarSolid
                  ? "text-[#0b2418]"
                  : "text-white"
              }
            `}
          >
            FAQ's
          </Link>

          {/* BLOGS */}

          <Link
            to="/Blogs"
            className={`
              ${navLinkStyle}
              ${
                navbarSolid
                  ? "text-[#0b2418]"
                  : "text-white"
              }
            `}
          >
            Blogs
          </Link>

        </div>

        {/* =====================================================
            RIGHT SIDE
        ===================================================== */}

        <div className="flex items-center gap-3">

          {/* CONTACT / ENQUIRE */}

          <Link
            to="/ContactUs"
            className={`
              hidden
              px-5
              py-2.5
              font-montserrat
              text-sm
              font-semibold
              transition
              duration-300
              sm:block

              ${
                navbarSolid
                  ? `
                    bg-[#0b2418]
                    text-white
                    hover:bg-pink-500
                  `
                  : `
                    bg-pink-500
                    text-white
                    hover:bg-white
                    hover:text-pink-500
                  `
              }
            `}
          >
            Enquire Now
          </Link>

          {/* =================================================
              MOBILE BUTTON
          ================================================= */}

          <button
            className={`
              flex
              h-10
              w-10
              items-center
              justify-center
              md:hidden
              transition
              duration-300
              ${
                navbarSolid
                  ? "bg-gray-100 text-[#0b2418]"
                  : "bg-black/20 text-white"
              }
            `}
          >
            ☰
          </button>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;