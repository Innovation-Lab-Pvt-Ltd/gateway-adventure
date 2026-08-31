
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
  Image as ImageIcon,
  MapPin,
  Mountain,
  Route,
  Star,
  Sun,
  Users,
  Utensils,
  Hotel,
  X,
} from "lucide-react";

const API_URL = "/api/v1/tripdetail";

const IMAGE_BASE_URL =
  "https://gatewaytreks.com/public/uploads/frontend/full/"; 
 
/* ========================================================= 
   TRIP FACTS 
========================================================= */ 
 
const TripFacts = ({ trip }) => { 
  const duration = trip.duration ?? "N/A"; 
  const rating = trip.rating ?? "N/A"; 
  const groupSize = trip.group_size ?? "N/A"; 
  const altitude = trip.max_altitude ?? "N/A"; 
  const walkHours = trip.walk_in_hours ?? "N/A"; 
 
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
          : typeof trip.grade === "object" 
            ? trip.grade?.name || "Moderate" 
            : trip.grade || "Moderate"; 
 
  return ( 
    <section className="mb-12"> 
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
    </section> 
  ); 
}; 
 
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
 
/* ========================================================= 
   HTML CONTENT 
========================================================= */ 
 
const HtmlContent = ({ 
  content, 
  className = "trip-description", 
}) => { 
  if (!content) return null; 
 
  return ( 
    <div 
      className={className} 
      dangerouslySetInnerHTML={{ 
        __html: content, 
      }} 
    /> 
  ); 
}; 
 
/* ========================================================= 
   TRIP ROUTE 
========================================================= */ 
 
const TripRoute = ({ trip }) => { 
  const route = trip.trip_routes; 
 
  if (!route) return null; 
 
  let routeItems = []; 
 
  if (Array.isArray(route)) { 
    routeItems = route; 
  } else if (typeof route === "object") { 
    routeItems = Object.values(route); 
  } else if (typeof route === "string") { 
    routeItems = route 
      .split(/,|→|->|>/) 
      .map((item) => item.trim()) 
      .filter(Boolean); 
  } 
 
  return ( 
    <section className="mb-12"> 
      <h2 className="mb-6 text-2xl font-bold text-[#0b2418]"> 
        Trip Route 
      </h2> 
 
      <div className="rounded-xl bg-white p-6 shadow-sm"> 
        <div className="flex flex-wrap items-center gap-3"> 
          {routeItems.map((item, index) => { 
            const routeName = 
              typeof item === "object" 
                ? item.name || 
                  item.title || 
                  item.location || 
                  item.route || 
                  JSON.stringify(item) 
                : item; 
 
            return ( 
              <React.Fragment key={index}> 
                <div className="flex items-center gap-2 rounded-full bg-[#FBF9F4] px-5 py-3"> 
                  <MapPin 
                    size={16} 
                    className="text-[#4f8f3a]" 
                  /> 
 
                  <span className="text-sm font-semibold text-[#0b2418]"> 
                    {routeName} 
                  </span> 
                </div> 
 
                {index < 
                  routeItems.length - 1 && ( 
                  <ArrowRight 
                    size={17} 
                    className="hidden text-gray-400 md:block" 
                  /> 
                )} 
              </React.Fragment> 
            ); 
          })} 
        </div> 
      </div> 
    </section> 
  ); 
}; 
 
/* ========================================================= 
   BOOKING CARD 
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
  const formatPrice = (value) => { 
    if ( 
      value === null || 
      value === undefined || 
      value === "" 
    ) { 
      return null; 
    } 
 
    return `$${value}`; 
  }; 
 
  return ( 
    /* 
      Sticky starts when the card reaches 90px 
      from the top of the viewport. 
 
      This keeps it below a ~90px navbar. 
    */ 
    <>
    <aside className="lg:sticky lg:top-[90px] lg:self-start"> 
      <div className="overflow-hidden rounded-2xl bg-white shadow-xl"> 
        <div className="bg-[#0b2418] px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white"> 
          Featured Trip 
        </div> 
 
        <div className="p-5"> 
          <p className="text-xs text-gray-500"> 
            Price per person 
          </p> 
 
          <div className="mt-1 flex flex-wrap items-center gap-2"> 
            {hasDiscount && 
              discountAmount && 
              price !== null && ( 
                <span className="text-sm text-gray-400 line-through"> 
                  {formatPrice(price)} 
                </span> 
              )} 
 
            {price !== null ? ( 
              <span className="text-3xl font-bold text-[#0b2418]"> 
                {formatPrice(price)} 
              </span> 
            ) : ( 
              <span className="text-xl font-bold text-[#0b2418]"> 
                Contact us 
              </span> 
            )} 
          </div> 
 
          <p className="mt-1 text-xs text-gray-500"> 
            {duration 
              ? `${duration} days` 
              : "Flexible duration"}{" "} 
            · all-inclusive 
          </p> 
 
          <div className="mt-4 rounded-lg bg-[#eaf6df] p-3"> 
            <p className="text-sm font-semibold text-[#0b2418]"> 
              {discountMessage 
                ? "Special Offer" 
                : "Group discounts"} 
            </p> 
 
            <p className="mt-1 text-xs text-gray-500"> 
              {discountMessage || 
                "Contact us for group pricing."} 
            </p> 
          </div> 
 
          <button 
            type="button" 
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#4f8f3a] py-3 text-sm font-semibold text-white transition hover:bg-[#3d762e]" 
          > 
            Check Availability 
            <ArrowRight size={17} /> 
          </button> 
 
          <button 
            type="button" 
            className="mt-2 w-full rounded-lg border-2 border-[#0b2418] py-3 text-sm font-semibold text-[#0b2418] transition hover:bg-[#0b2418] hover:text-white " onClick={() => setShowWhatsapp(true)}
          > 
            Make an Inquiry 
          </button> 
 
          <div className="mt-5 space-y-3 border-t border-gray-100 pt-4"> 
            {[ 
              "Instant booking confirmed", 
              "Secure payments", 
              "No hidden costs", 
            ].map((text) => ( 
              <div 
                key={text} 
                className="flex items-center gap-2.5" 
              > 
                <Check 
                  size={17} 
                  className="text-[#4f8f3a]" 
                /> 
 
                <span className="text-xs text-gray-600"> 
                  {text} 
                </span> 
              </div> 
            ))} 
          </div> 
 
          {rating > 0 && ( 
            <div className="mt-5 border-t border-gray-100 pt-4"> 
              <div className="flex items-center gap-2"> 
                <Star 
                  size={16} 
                  fill="currentColor" 
                  className="text-[#f5b942]" 
                /> 
 
                <span className="text-sm font-bold text-[#0b2418]"> 
                  {rating} 
                </span> 
 
                <span className="text-xs text-gray-400"> 
                  / 5 rating 
                </span> 
              </div> 
 
              <button 
                type="button" 
                className="mt-1 text-xs font-semibold text-[#4f8f3a] hover:underline" 
              > 
                Read reviews 
              </button> 
            </div> 
          )} 
 
          <button 
            type="button" 
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2.5 text-xs font-semibold text-[#0b2418] transition hover:border-[#4f8f3a] hover:text-[#4f8f3a]" 
          > 
            <CalendarDays size={16} /> 
            View Trip Dates 
          </button> 
 
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500"> 
            <MapPin size={14} /> 
            Need help? Contact us 
          </div> 
        </div> 
      </div> 
      
    </aside> 
    {showWhatsapp && (
        <Whatsapp
          
          onClose={() => setShowWhatsapp(false)}
        />
      )}
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
 
  const [activeTab, setActiveTab] = 
    useState("overview"); 
 
  const [openItinerary, setOpenItinerary] = 
    useState(0); 
 
  const [openFaq, setOpenFaq] = 
    useState(null); 
 
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
 
        const response = await fetch( 
          `${API_URL}/${encodeURIComponent(slug)}`, 
          { 
            headers: { 
              Accept: "application/json", 
            }, 
          } 
        ); 
 
        if (!response.ok) { 
          throw new Error( 
            `Failed to fetch trip: ${response.status}` 
          ); 
        } 
 
        const data = await response.json(); 
 
        const tripData = 
          data?.package || 
          data?.trip || 
          data?.data?.package || 
          data?.data || 
          data; 
 
        if ( 
          !tripData || 
          typeof tripData !== "object" 
        ) { 
          throw new Error( 
            "Trip data was not found." 
          ); 
        } 
 
        setTrip(tripData); 
      } catch (err) { 
        console.error( 
          "TRIP DETAIL ERROR:", 
          err 
        ); 
 
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
 
          <p className="text-lg font-medium text-gray-500"> 
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
      <div className="flex min-h-screen items-center justify-center bg-[#FBF9F4] px-6"> 
        <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg"> 
          <h2 className="mb-3 text-2xl font-bold text-red-500"> 
            Unable to load trip 
          </h2> 
 
          <p className="mb-3 text-gray-500"> 
            {error} 
          </p> 
 
          <p className="mb-6 rounded-lg bg-gray-100 px-4 py-3 text-sm text-gray-600"> 
            Slug: <strong>{slug}</strong> 
          </p> 
 
          <button 
            type="button" 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center gap-2 rounded-xl bg-[#0b2418] px-6 py-3 font-semibold text-white transition hover:bg-[#4f8f3a]" 
          > 
            <ArrowLeft size={18} /> 
            Go Back 
          </button> 
        </div> 
      </div> 
    ); 
  } 
 
  if (!trip) return null; 
 
  /* ===================================================== 
     HELPERS 
  ===================================================== */ 
 
  const getImageUrl = (imageName) => { 
    if (!imageName) { 
      return "/images/MOUNT.jpg"; 
    } 
 
    if ( 
      typeof imageName === "string" && 
      imageName.startsWith("http") 
    ) { 
      return imageName; 
    } 
 
    return `${IMAGE_BASE_URL}${imageName}`; 
  }; 
 
  /* ===================================================== 
     BASIC DATA 
  ===================================================== */ 
 
  const title = 
    trip.title || 
    trip.name || 
    trip.package_title || 
    "Untitled Trip"; 
 
  const tripCode = 
    trip.trip_code || 
    trip.code || 
    ""; 
 
  const shortDescription = 
    trip.short_description || ""; 
 
  const description = 
    trip.description || 
    trip.overview || 
    ""; 
 
  const duration = 
    trip.duration || 
    trip.duration_days || 
    trip.days || 
    ""; 
 
  const price = 
    trip.price ?? 
    trip.cost ?? 
    trip.price_per_person ?? 
    null; 
 
  const rating = 
    trip.rating || 
    trip.average_rating || 
    0; 
 
  const grade = 
    typeof trip.grade === "object" 
      ? trip.grade?.name 
      : trip.grade || ""; 
 
  const hasDiscount = 
    trip.has_discount === true || 
    trip.has_discount === 1 || 
    trip.has_discount === "1"; 
 
  const discountAmount = 
    trip.discount_amt ?? 
    trip.discount_amount ?? 
    null; 
 
  const discountMessage = 
    trip.discount_msg || 
    trip.discount_message || 
    ""; 
 
  const featuredVideo = 
    trip.featured_video_url || ""; 
 
  /* ===================================================== 
     HERO IMAGE 
  ===================================================== */ 
 
  const heroImage = getImageUrl( 
    trip.image || 
      trip.social_image || 
      trip.featured_image || 
      trip.thumbnail 
  ); 
 
  /* ===================================================== 
     ARRAYS 
  ===================================================== */ 
 
  const itineraries = Array.isArray( 
    trip.itineraries 
  ) 
    ? [...trip.itineraries].sort( 
        (a, b) => 
          Number( 
            a.display_order || 
              a.day_no || 
              0 
          ) - 
          Number( 
            b.display_order || 
              b.day_no || 
              0 
          ) 
      ) 
    : []; 
 
  const faqs = Array.isArray(trip.faqs) 
    ? trip.faqs 
    : Array.isArray(trip.package?.faqs) 
      ? trip.package.faqs 
      : []; 
 
  const images = Array.isArray( 
    trip.images 
  ) 
    ? [...trip.images].sort( 
        (a, b) => 
          Number(a.display_order || 0) - 
          Number(b.display_order || 0) 
      ) 
    : []; 
 
  const relatedPackages = Array.isArray( 
    trip.related_packages 
  ) 
    ? trip.related_packages 
    : []; 
 
  /* ===================================================== 
     BREADCRUMBS 
  ===================================================== */ 
 
  const breadcrumbs = 
    trip.breadcrumbs && 
    typeof trip.breadcrumbs === "object" 
      ? Object.entries(trip.breadcrumbs) 
      : []; 
 
  /* ===================================================== 
     CONTENT 
  ===================================================== */ 
 
  const costIncludes = 
    trip.cost_includes || 
    trip.includes || 
    ""; 
 
  const costExcludes = 
    trip.cost_excludes || 
    trip.excludes || 
    ""; 
 
  const equipmentList = 
    trip.equipment_list || ""; 
 
  const complimentary = 
    trip.complimentary || ""; 
 
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
    <div className="min-h-screen bg-[#FBF9F4]"> 
 
      {/* ================================================= 
          BREADCRUMB 
      ================================================= */} 
 
      <div className="border-b border-black/5 bg-white"> 
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-6 py-4 md:px-10"> 
 
          <button 
            type="button" 
            onClick={() => navigate("/")} 
            className="shrink-0 font-medium text-[#4f8f3a] hover:text-[#0b2418]" 
          > 
            Home 
          </button> 
 
          {breadcrumbs.length > 0 ? ( 
            breadcrumbs.map( 
              ([label, url], index) => ( 
                <React.Fragment 
                  key={`${label}-${index}`} 
                > 
                  <ArrowRight 
                    size={15} 
                    className="shrink-0 text-gray-400" 
                  /> 
 
                  {url && 
                  typeof url === "string" && 
                  url.startsWith("/") ? ( 
                    <button 
                      type="button" 
                      onClick={() => 
                        navigate(url) 
                      } 
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
              ) 
            ) 
          ) : ( 
            <> 
              <ArrowRight 
                size={15} 
                className="text-gray-400" 
              /> 
 
              <span className="font-medium text-gray-500"> 
                {title} 
              </span> 
            </> 
          )} 
        </div> 
      </div> 
 
      {/* ================================================= 
          HERO 
      ================================================= */} 
 
      <section className="relative h-[500px] overflow-hidden md:h-[620px]"> 
 
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
              e.currentTarget.src = 
                "/images/MOUNT.jpg"; 
            }} 
          /> 
        )} 
 
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" /> 
 
        <button 
          type="button" 
          onClick={() => navigate(-1)} 
          className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 text-sm font-semibold text-[#0b2418] shadow-lg backdrop-blur transition hover:bg-white md:left-10" 
        > 
          <ArrowLeft size={18} /> 
          Back 
        </button> 
 
        <div className="absolute bottom-10 left-6 right-6 mx-auto max-w-7xl"> 
 
          <div className="mb-4 flex flex-wrap items-center gap-3"> 
 
            {tripCode && ( 
              <span className="rounded-full bg-[#9be564] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0b2418]"> 
                {tripCode} 
              </span> 
            )} 
 
            {grade && ( 
              <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur"> 
                {grade} 
              </span> 
            )} 
 
            {rating > 0 && ( 
              <span className="flex items-center gap-1 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur"> 
                <Star 
                  size={14} 
                  fill="currentColor" 
                /> 
                {rating} 
              </span> 
            )} 
          </div> 
 
          <h1 className="max-w-5xl font-serif text-4xl font-semibold leading-tight text-white md:text-6xl lg:text-7xl"> 
            {title} 
          </h1> 
 
          {shortDescription && ( 
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/80 md:text-lg"> 
              {shortDescription} 
            </p> 
          )} 
        </div> 
      </section> 
 
      {/* ================================================= 
          MAIN CONTENT 
      ================================================= */} 
 
      <main className="mx-auto max-w-7xl px-6 py-14 md:px-10"> 
 
        {/* TRIP FACTS */} 
 
        <TripFacts trip={trip} /> 
 
        {/* TRIP ROUTE */} 
 
        <TripRoute trip={trip} /> 
 
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3"> 
 
          {/* ================================================= 
              LEFT CONTENT 
          ================================================= */} 
 
          <div className="min-w-0 lg:col-span-2"> 
 
            {/* TABS */} 
 
            <div className="mb-8 overflow-x-auto rounded-2xl bg-white p-2 shadow-sm"> 
              <div className="flex min-w-max gap-1"> 
 
                {tabs.map((tab) => { 
                  const isActive = 
                    activeTab === tab.id; 
 
                  return ( 
                    <button 
                      key={tab.id} 
                      type="button" 
                      onClick={() => 
                        setActiveTab(tab.id) 
                      } 
                      className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${ 
                        isActive 
                          ? "bg-[#0b2418] text-white shadow-md" 
                          : "text-gray-500 hover:bg-[#0b2418]/5 hover:text-[#0b2418]" 
                      }`} 
                    > 
                      {tab.label} 
 
                      {tab.count !== 
                        undefined && ( 
                        <span 
                          className={`ml-2 rounded-full px-2 py-0.5 text-xs ${ 
                            isActive 
                              ? "bg-white/15" 
                              : "bg-gray-100" 
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
              <div className="space-y-8"> 
 
                <section className="rounded-2xl bg-white p-6 shadow-sm md:p-10"> 
 
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#4f8f3a]"> 
                    About the trip 
                  </p> 
 
                  <h2 className="mb-6 font-serif text-3xl font-semibold text-[#0b2418] md:text-4xl"> 
                    Overview 
                  </h2> 
 
                  {description ? ( 
                    <HtmlContent 
                      content={description} 
                    /> 
                  ) : ( 
                    <p className="text-gray-500"> 
                      No description available. 
                    </p> 
                  )} 
 
                </section> 
 
                {complimentary && ( 
                  <section className="rounded-2xl border border-[#9be564]/40 bg-[#9be564]/10 p-6 md:p-8"> 
 
                    <div className="mb-4 flex items-center gap-3"> 
 
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#9be564] text-[#0b2418]"> 
                        <Check size={20} /> 
                      </div> 
 
                      <h2 className="font-serif text-2xl font-semibold text-[#0b2418]"> 
                        What's Complimentary 
                      </h2> 
 
                    </div> 
 
                    <HtmlContent 
                      content={complimentary} 
                    /> 
 
                  </section> 
                )} 
 
              </div> 
            )} 
 
            {/* ================================================= 
                ITINERARY 
            ================================================= */} 
 
            {activeTab === "itinerary" && ( 
              <section className="rounded-2xl bg-white p-6 shadow-sm md:p-10"> 
 
                <div className="mb-8"> 
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#4f8f3a]"> 
                    Day by day 
                  </p> 
 
                  <h2 className="font-serif text-3xl font-semibold text-[#0b2418] md:text-4xl"> 
                    Itinerary 
                  </h2> 
                </div> 
 
                {itineraries.length > 0 ? ( 
                  <div className="space-y-4"> 
 
                    {itineraries.map( 
                      (day, index) => { 
                        const isOpen = 
                          openItinerary === 
                          index; 
 
                        const dayNumber = 
                          day.day_no || 
                          index + 1; 
 
                        const dayTitle = 
                          day.title || 
                          day.name || 
                          day.short_description || 
                          `Day ${dayNumber}`; 
 
                        return ( 
                          <div 
                            key={ 
                              day.id || 
                              `${dayNumber}-${index}` 
                            } 
                            className="overflow-hidden rounded-2xl border border-gray-100" 
                          > 
 
                            <button 
                              type="button" 
                              onClick={() => 
                                setOpenItinerary( 
                                  isOpen 
                                    ? null 
                                    : index 
                                ) 
                              } 
                              className="flex w-full items-center gap-4 p-5 text-left transition hover:bg-gray-50" 
                            > 
 
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0b2418] text-sm font-bold text-white"> 
                                {dayNumber} 
                              </div> 
 
                              <div className="min-w-0 flex-1"> 
 
                                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#4f8f3a]"> 
                                  Day {dayNumber} 
                                </p> 
 
                                <h3 className="font-serif text-xl font-semibold text-[#0b2418]"> 
                                  {dayTitle} 
                                </h3> 
 
                              </div> 
 
                              <ChevronDown 
                                size={20} 
                                className={`shrink-0 text-gray-500 transition-transform ${ 
                                  isOpen 
                                    ? "rotate-180" 
                                    : "" 
                                }`} 
                              /> 
 
                            </button> 
 
                            {isOpen && ( 
                              <div className="border-t border-gray-100 px-5 pb-6 pt-5"> 
 
                                {day.description && ( 
                                  <HtmlContent 
                                    content={ 
                                      day.description 
                                    } 
                                  /> 
                                )} 
 
                                <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3"> 
 
                                  {[ 
                                    { 
                                      label: 
                                        "Altitude", 
                                      value: 
                                        day.altitude, 
                                    }, 
                                    { 
                                      label: 
                                        "Meal", 
                                      value: 
                                        day.meal, 
                                    }, 
                                    { 
                                      label: 
                                        "Accommodation", 
                                      value: 
                                        day.accomodation || 
                                        day.accommodation, 
                                    }, 
                                    { 
                                      label: 
                                        "Transportation", 
                                      value: 
                                        day.transportation, 
                                    }, 
                                    { 
                                      label: 
                                        "Distance", 
                                      value: 
                                        day.distance, 
                                    }, 
                                    { 
                                      label: 
                                        "Time", 
                                      value: 
                                        day.time, 
                                    }, 
                                    { 
                                      label: 
                                        "Ascent", 
                                      value: 
                                        day.ascent, 
                                    }, 
                                    { 
                                      label: 
                                        "Descent", 
                                      value: 
                                        day.descent, 
                                    }, 
                                  ] 
                                    .filter( 
                                      (item) => 
                                        item.value 
                                    ) 
                                    .map( 
                                      (item) => ( 
                                        <div 
                                          key={ 
                                            item.label 
                                          } 
                                          className="rounded-xl bg-[#FBF9F4] p-4" 
                                        > 
                                          <p className="text-xs font-medium uppercase tracking-wider text-gray-400"> 
                                            { 
                                              item.label 
                                            } 
                                          </p> 
 
                                          <p className="mt-1 text-sm font-semibold text-[#0b2418]"> 
                                            { 
                                              item.value 
                                            } 
                                          </p> 
                                        </div> 
                                      ) 
                                    )} 
 
                                </div> 
 
                              </div> 
                            )} 
 
                          </div> 
                        ); 
                      } 
                    )} 
 
                  </div> 
                ) : ( 
                  <p className="text-gray-500"> 
                    Itinerary information is not available for this trip. 
                  </p> 
                )} 
 
              </section> 
            )} 
 
            {/* ================================================= 
                INCLUDES / EXCLUDES 
            ================================================= */} 
 
            {activeTab === "includes" && ( 
              <section className="rounded-2xl bg-white p-6 shadow-sm md:p-10"> 
 
                <div className="mb-8"> 
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#4f8f3a]"> 
                    What's covered 
                  </p> 
 
                  <h2 className="font-serif text-3xl font-semibold text-[#0b2418] md:text-4xl"> 
                    Cost Includes & Excludes 
                  </h2> 
                </div> 
 
                <div className="grid gap-8 md:grid-cols-2"> 
 
                  <div className="rounded-2xl border border-green-100 bg-green-50/50 p-6"> 
 
                    <div className="mb-5 flex items-center gap-3"> 
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#9be564] text-[#0b2418]"> 
                        <Check size={18} /> 
                      </div> 
 
                      <h3 className="font-serif text-2xl font-semibold text-[#0b2418]"> 
                        Includes 
                      </h3> 
                    </div> 
 
                    {costIncludes ? ( 
                      <HtmlContent 
                        content={costIncludes} 
                        className="trip-list text-gray-600" 
                      /> 
                    ) : ( 
                      <p className="text-sm text-gray-500"> 
                        No information available. 
                      </p> 
                    )} 
 
                  </div> 
 
                  <div className="rounded-2xl border border-red-100 bg-red-50/40 p-6"> 
 
                    <div className="mb-5 flex items-center gap-3"> 
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-red-600"> 
                        <X size={18} /> 
                      </div> 
 
                      <h3 className="font-serif text-2xl font-semibold text-[#0b2418]"> 
                        Excludes 
                      </h3> 
                    </div> 
 
                    {costExcludes ? ( 
                      <HtmlContent 
                        content={costExcludes} 
                        className="trip-list text-gray-600" 
                      /> 
                    ) : ( 
                      <p className="text-sm text-gray-500"> 
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
              <section className="rounded-2xl bg-white p-6 shadow-sm md:p-10"> 
 
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#4f8f3a]"> 
                  Prepare for your trip 
                </p> 
 
                <h2 className="mb-8 font-serif text-3xl font-semibold text-[#0b2418] md:text-4xl"> 
                  Equipment & Packing List 
                </h2> 
 
                {equipmentList ? ( 
                  <HtmlContent 
                    content={equipmentList} 
                    className="trip-list text-gray-600" 
                  /> 
                ) : ( 
                  <p className="text-gray-500"> 
                    Equipment information is not available. 
                  </p> 
                )} 
 
              </section> 
            )} 
 
            {/* ================================================= 
                FAQ 
            ================================================= */} 
 
            {activeTab === "faq" && ( 
              <section className="rounded-2xl bg-white p-6 shadow-sm md:p-10"> 
 
                <div className="mb-8"> 
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#4f8f3a]"> 
                    Frequently asked 
                  </p> 
 
                  <h2 className="font-serif text-3xl font-semibold text-[#0b2418] md:text-4xl"> 
                    Frequently Asked Questions 
                  </h2> 
                </div> 
 
                {faqs.length > 0 ? ( 
                  <div className="space-y-3"> 
 
                    {faqs.map( 
                      (faq, index) => { 
                        const isOpen = 
                          openFaq === index; 
 
                        return ( 
                          <div 
                            key={ 
                              faq.id || index 
                            } 
                            className="overflow-hidden rounded-xl border border-gray-100" 
                          > 
 
                            <button 
                              type="button" 
                              onClick={() => 
                                setOpenFaq( 
                                  isOpen 
                                    ? null 
                                    : index 
                                ) 
                              } 
                              className="flex w-full items-center justify-between gap-5 p-5 text-left font-semibold text-[#0b2418] transition hover:bg-gray-50" 
                            > 
 
                              <span> 
                                {faq.question} 
                              </span> 
 
                              <ChevronDown 
                                size={19} 
                                className={`shrink-0 transition-transform ${ 
                                  isOpen 
                                    ? "rotate-180" 
                                    : "" 
                                }`} 
                              /> 
 
                            </button> 
 
                            {isOpen && ( 
                              <div className="border-t border-gray-100 px-5 pb-5 pt-4"> 
                                <HtmlContent 
                                  content={ 
                                    faq.answer || 
                                    "" 
                                  } 
                                /> 
                              </div> 
                            )} 
 
                          </div> 
                        ); 
                      } 
                    )} 
 
                  </div> 
                ) : ( 
                  <p className="text-gray-500"> 
                    No frequently asked questions are available. 
                  </p> 
                )} 
 
              </section> 
            )} 
 
            {/* ================================================= 
                GALLERY 
            ================================================= */} 
 
            {images.length > 0 && ( 
              <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm md:p-10"> 
 
                <div className="mb-8 flex items-end justify-between"> 
 
                  <div> 
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#4f8f3a]"> 
                      Explore the journey 
                    </p> 
 
                    <h2 className="font-serif text-3xl font-semibold text-[#0b2418]"> 
                      Photo Gallery 
                    </h2> 
                  </div> 
 
                  <ImageIcon 
                    size={24} 
                    className="text-[#4f8f3a]" 
                  /> 
 
                </div> 
 
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3"> 
 
                  {images.map( 
                    (item, index) => { 
                      const imageSrc = 
                        getImageUrl( 
                          item.image 
                        ); 
 
                      return ( 
                        <div 
                          key={ 
                            item.id || index 
                          } 
                          className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100" 
                        > 
 
                          <img 
                            src={imageSrc} 
                            alt={ 
                              item.caption || 
                              title 
                            } 
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-110" 
                            onError={(e) => { 
                              e.currentTarget.src = 
                                "/images/MOUNT.jpg"; 
                            }} 
                          /> 
 
                          {item.caption && ( 
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10"> 
 
                              <p className="text-sm font-medium text-white"> 
                                {item.caption} 
                              </p> 
 
                            </div> 
                          )} 
 
                        </div> 
                      ); 
                    } 
                  )} 
 
                </div> 
 
              </section> 
            )} 
 
          </div> 
 
          {/* ================================================= 
              STICKY BOOKING CARD 
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
          <section className="mt-16"> 
 
            <div className="mb-8"> 
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#4f8f3a]"> 
                You may also like 
              </p> 
 
              <h2 className="font-serif text-3xl font-semibold text-[#0b2418] md:text-4xl"> 
                Related Trips 
              </h2> 
            </div> 
 
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"> 
 
              {relatedPackages.map( 
                (pkg, index) => { 
                  const relatedImage = 
                    getImageUrl( 
                      pkg.image || 
                        pkg.social_image || 
                        pkg.featured_image 
                    ); 
 
                  const relatedTitle = 
                    pkg.title || 
                    pkg.name || 
                    "Trip"; 
 
                  return ( 
                    <article 
                      key={ 
                        pkg.id || index 
                      } 
                      onClick={() => { 
                        if (pkg.slug) { 
                          navigate( 
                            `/package/${pkg.slug}` 
                          ); 
                        } 
                      }} 
                      className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl" 
                    > 
 
                      <div className="relative h-56 overflow-hidden"> 
 
                        <img 
                          src={relatedImage} 
                          alt={relatedTitle} 
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-110" 
                          onError={(e) => { 
                            e.currentTarget.src = 
                              "/images/MOUNT.jpg"; 
                          }} 
                        /> 
 
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" /> 
 
                        {pkg.rating && ( 
                          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#0b2418]"> 
                            <Star 
                              size={13} 
                              fill="currentColor" 
                            /> 
                            {pkg.rating} 
                          </div> 
                        )} 
 
                      </div> 
 
                      <div className="p-5"> 
 
                        <h3 className="font-serif text-xl font-semibold leading-snug text-[#0b2418]"> 
                          {relatedTitle} 
                        </h3> 
 
                        <div className="mt-3 flex items-center justify-between"> 
 
                          {pkg.duration && ( 
                            <span className="flex items-center gap-1.5 text-sm text-gray-500"> 
                              <Clock3 size={15} /> 
                              {pkg.duration} Days 
                            </span> 
                          )} 
 
                          {pkg.price !== 
                            undefined && 
                            pkg.price !== null && 
                            pkg.price !== "" && ( 
                              <span className="font-semibold text-[#0b2418]"> 
                                ${pkg.price} 
                              </span> 
                            )} 
 
                        </div> 
 
                        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#4f8f3a]"> 
                          View Trip 
                          <ArrowRight 
                            size={16} 
                            className="transition-transform group-hover:translate-x-1" 
                          /> 
                        </div> 
 
                      </div> 
                    </article> 
                  ); 
                } 
              )} 
 
            </div> 
          </section> 
        )} 
 
      </main> 
 
      {/* ===================================================== 
          HTML CONTENT STYLING 
      ===================================================== */} 
 
    
    </div> 
    
  ); 
}; 
 
export default TripDetail; 
 
