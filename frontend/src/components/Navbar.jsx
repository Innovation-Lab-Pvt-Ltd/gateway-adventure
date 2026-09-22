import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// =========================================================
// CONFIG
// =========================================================
const API_URL = "/api/v1/allpackages";

// Route that renders TripDetail.jsx (must match your router,
// e.g. <Route path="/package/:slug" element={<TripDetail />} />)
const PACKAGE_ROUTE = "/package";

// Route that renders the activity detail page
// <Route path="/activity/:slug" element={<ActivitiesDetail />} />
const ACTIVITY_ROUTE = "/activity";

// Route that renders the destination detail page
// <Route path="/destination/:slug" element={<DestinationDetail />} />
const DESTINATION_ROUTE = "/destination";

// =========================================================
// DATA LOADING
// ---------------------------------------------------------
// /allpackages is paginated (15 per page), so we:
//   1. fetch page 1  -> gives destinations, activities, last_page
//   2. fetch the remaining pages in parallel
//   3. keep only the light fields the menu needs
// The promise is cached at module level, so the API is
// hit once no matter how many times Navbar re-mounts.
// =========================================================
let menuDataPromise = null;

const fetchPage = async (page) => {
  const res = await fetch(page === 1 ? API_URL : `${API_URL}?page=${page}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
};

const groupBy = (list, key) => {
  const map = new Map();
  list.forEach((item) => {
    const id = item[key];
    if (!map.has(id)) map.set(id, []);
    map.get(id).push(item);
  });
  return map;
};

const loadMenuData = () => {
  if (menuDataPromise) return menuDataPromise;

  menuDataPromise = (async () => {
    const first = await fetchPage(1);
    const lastPage = first.packages?.last_page || 1;

    const otherPages = await Promise.all(
      Array.from({ length: lastPage - 1 }, (_, i) => fetchPage(i + 2))
    );

    const allPackages = [first, ...otherPages]
      .flatMap((json) => json.packages?.data || [])
      .filter((p) => p.is_active === 1 && p.slug)
      .map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        duration: p.duration,
        destination_id: p.destination_id,
        activity_id: p.activity_id,
      }));

    const byDestination = groupBy(allPackages, "destination_id");
    const byActivity = groupBy(allPackages, "activity_id");

    // Only show active items that actually have packages
    const destinations = (first.destinations || [])
      .filter((d) => d.is_active === 1 && byDestination.has(d.id))
      .map((d) => ({ id: d.id, name: d.name, slug: d.slug }));

    const activities = (first.activities || [])
      .filter((a) => a.is_active === 1 && byActivity.has(a.id))
      .sort((a, b) => a.display_order - b.display_order)
      .map((a) => ({ id: a.id, name: a.name, slug: a.slug }));

    return { destinations, activities, byDestination, byActivity };
  })().catch((err) => {
    menuDataPromise = null; // allow retry on next mount
    throw err;
  });

  return menuDataPromise;
};

// =========================================================
// MEGA MENU
// ---------------------------------------------------------
// Level 1: trigger link (Activity / Destinations)
// Level 2: item names   (shown on hover of the trigger)
// Level 3: packages     (shown on hover of an item name)
// =========================================================
const MegaMenu = ({
  label,
  to,
  itemRoute, // optional: when set, each item name becomes a link to `${itemRoute}/${item.slug}`
  items,
  packagesByItem,
  status,
  isOpen,
  onEnter,
  onLeave,
  onNavigate,
  linkClass,
}) => {
  const [activeId, setActiveId] = useState(null);

  // Reset the level-3 panel whenever the menu closes
  useEffect(() => {
    if (!isOpen) setActiveId(null);
  }, [isOpen]);

  const activeItem = items.find((item) => item.id === activeId);
  const packages = activeItem ? packagesByItem.get(activeItem.id) || [] : [];

  return (
    <div
      className="relative flex items-center self-stretch"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <Link to={to} onClick={onNavigate} className={linkClass}>
        {label}
      </Link>

      {/* pt-4 matches the navbar's py-4, so there is no hover gap
          between the link and the panel */}
      <div
        className={`
          absolute
          left-0
          top-full
          pt-4
          transition-all
          duration-300
          ${
            isOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible translate-y-2 opacity-0"
          }
        `}
      >
        <div className="flex border-t-2 border-pink-500 bg-white shadow-xl">
          {/* ---------- LEVEL 2: item names ---------- */}
          <ul className="w-64 py-2">
            {status === "loading" && (
              <li className="px-5 py-3 font-montserrat text-sm text-gray-400">
                Loading…
              </li>
            )}

            {status === "error" && (
              <li className="px-5 py-3 font-montserrat text-sm text-gray-500">
                Couldn&apos;t load {label.toLowerCase()}. Refresh to try again.
              </li>
            )}

            {status === "ready" &&
              items.map((item) => {
                const active = item.id === activeId;

                const rowClass = `
                  flex
                  items-center
                  justify-between
                  px-5
                  py-3
                  font-montserrat
                  text-sm
                  transition-colors
                  duration-200
                  ${
                    active
                      ? "bg-pink-50 text-pink-500"
                      : "text-[#0b2418] hover:bg-gray-50"
                  }
                `;

                const rowContent = (
                  <>
                    <span>{item.name}</span>
                    <span
                      className={`transition-transform duration-200 ${
                        active ? "translate-x-1" : ""
                      }`}
                    >
                      ›
                    </span>
                  </>
                );

                return (
                  <li key={item.id} onMouseEnter={() => setActiveId(item.id)}>
                    {itemRoute ? (
                      // Clickable: goes to the detail page for this item
                      <Link
                        to={`${itemRoute}/${item.slug}`}
                        onClick={onNavigate}
                        className={rowClass}
                      >
                        {rowContent}
                      </Link>
                    ) : (
                      // Hover-only (used by Destinations)
                      <div className={`${rowClass} cursor-default`}>
                        {rowContent}
                      </div>
                    )}
                  </li>
                );
              })}
          </ul>

          {/* ---------- LEVEL 3: packages ---------- */}
          <div
            className={`
              overflow-hidden
              transition-all
              duration-300
              ease-out
              ${activeItem ? "w-80 opacity-100" : "w-0 opacity-0"}
            `}
          >
            {/* key re-triggers the fade when switching between items */}
            <div
              key={activeId}
              className="menu-fade-in max-h-[70vh] w-80 overflow-y-auto border-l border-gray-100 py-2"
            >
              {activeItem && (
                <>
                  <p className="px-5 pb-2 pt-3 font-montserrat text-xs font-semibold tracking-wide text-[#2F6B4F]">
                    {activeItem.name} packages
                  </p>

                  {packages.map((pkg) => (
                    <Link
                      key={pkg.id}
                      to={`${PACKAGE_ROUTE}/${pkg.slug}`}
                      onClick={onNavigate}
                      className="
                        block
                        px-5
                        py-2.5
                        font-montserrat
                        text-sm
                        text-[#0b2418]
                        transition-colors
                        duration-200
                        hover:bg-pink-50
                        hover:text-pink-500
                      "
                    >
                      {pkg.name}
                      {pkg.duration > 1 && (
                        <span className="ml-2 text-xs text-gray-400">
                          {pkg.duration} Days
                        </span>
                      )}
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================
// NAVBAR
// =========================================================
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // "activity" | "destinations" | null
  const [menuData, setMenuData] = useState({
    status: "loading",
    destinations: [],
    activities: [],
    byDestination: new Map(),
    byActivity: new Map(),
  });

  const location = useLocation();
  const closeTimer = useRef(null);

  // =========================================================
  // PAGES WITHOUT A DARK HERO (navbar must always be solid)
  // =========================================================
  const isSolidPage =
    location.pathname.startsWith("/package/") ||
    location.pathname.startsWith("/activity/") ||
    location.pathname.startsWith("/destination/");

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
  // LOAD MENU DATA (once)
  // =========================================================
  useEffect(() => {
    let cancelled = false;

    loadMenuData()
      .then((data) => {
        if (!cancelled) setMenuData({ status: "ready", ...data });
      })
      .catch(() => {
        if (!cancelled) setMenuData((prev) => ({ ...prev, status: "error" }));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // =========================================================
  // MENU OPEN / CLOSE
  // A short close delay stops the menu flickering when the
  // cursor briefly leaves it.
  // =========================================================
  const openMega = (name) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(name);
  };

  const closeMega = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

  const closeNow = () => {
    clearTimeout(closeTimer.current);
    setOpenMenu(null);
  };

  useEffect(() => {
    closeNow();
  }, [location.pathname]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

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
  // Menu open = white (so it blends into the dropdown)
  //
  const navbarSolid = isSolidPage || scrolled || openMenu !== null;

  const linkColor = navbarSolid ? "text-[#0b2418]" : "text-white";

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
        ${navbarSolid ? "bg-white shadow-md" : "bg-transparent"}
      `}
    >
      {/* Keyframes for the package list fade-in */}
      <style>{`
        @keyframes menuFadeIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .menu-fade-in { animation: menuFadeIn 0.25s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .menu-fade-in { animation: none; }
        }
      `}</style>

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

        <Link to="/" className="flex items-center gap-3">
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
                ${navbarSolid ? "text-[#0b2418]" : "text-white"}
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
                ${navbarSolid ? "text-[#2F6B4F]" : "text-white/70"}
              `}
            >
              Explore Nepal
            </p>
          </div>
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
        ===================================================== */}

        <div className="hidden items-center gap-8 self-stretch md:flex">
          {/* HOME */}

          <Link to="/" className={`${navLinkStyle} ${linkColor}`}>
            Home
          </Link>

          {/* ACTIVITY  ->  activity names  ->  packages */}

          <MegaMenu
            label="Activity"
            to="/activity"
            itemRoute={ACTIVITY_ROUTE}
            items={menuData.activities}
            packagesByItem={menuData.byActivity}
            status={menuData.status}
            isOpen={openMenu === "activity"}
            onEnter={() => openMega("activity")}
            onLeave={closeMega}
            onNavigate={closeNow}
            linkClass={`${navLinkStyle} ${linkColor}`}
          />

          {/* DESTINATIONS  ->  destination names  ->  packages */}

          <MegaMenu
            label="Destinations"
            to="/destinations"
            itemRoute={DESTINATION_ROUTE}
            items={menuData.destinations}
            packagesByItem={menuData.byDestination}
            status={menuData.status}
            isOpen={openMenu === "destinations"}
            onEnter={() => openMega("destinations")}
            onLeave={closeMega}
            onNavigate={closeNow}
            linkClass={`${navLinkStyle} ${linkColor}`}
          />

          {/* ABOUT US */}

          <Link to="/AboutUs" className={`${navLinkStyle} ${linkColor}`}>
            About Us
          </Link>

          {/* FAQ */}

          {/* BLOGS */}

          <Link to="/Blogs" className={`${navLinkStyle} ${linkColor}`}>
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