/* ============================================================
   Gateway Treks — Landing Page Data
   All dynamic content lives here so HTML never hardcodes it.
   ============================================================ */

const REGIONS = [
    {
        id: "everest",
        name: "Everest",
        count: 8,
        blurb: "Stand at the foot of the world's highest peak.",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop"
    },
    {
        id: "annapurna",
        name: "Annapurna",
        count: 6,
        blurb: "Terraced villages, rhododendron forests, big skies.",
        image: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=800&h=600&fit=crop"
    },
    {
        id: "langtang",
        name: "Langtang",
        count: 4,
        blurb: "Nepal's closest Himalaya, a quiet valley of yak pasture.",
        image: "https://images.unsplash.com/photo-1626621331169-5f34be280e0b?w=800&h=600&fit=crop"
    },
    {
        id: "mustang",
        name: "Mustang",
        count: 3,
        blurb: "A high desert kingdom of red cliffs and old monasteries.",
        image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=800&h=600&fit=crop"
    },
    {
        id: "manaslu",
        name: "Manaslu",
        count: 3,
        blurb: "A remote circuit around the world's eighth-highest peak.",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop"
    },
    {
        id: "dolpo",
        name: "Dolpo",
        count: 2,
        blurb: "Nepal's most remote trans-Himalayan wilderness.",
        image: "https://images.unsplash.com/photo-1585511543209-abc8fd029486?w=800&h=600&fit=crop"
    }
];

const TREKS = [
    {
        id: "ebc-14",
        title: "Everest Base Camp Trek",
        region: "everest",
        duration: 14,
        difficulty: "challenging",
        maxAltitude: "5,364m",
        price: 1450,
        rating: 4.9,
        reviews: 312,
        bestSeller: true,
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=700&h=520&fit=crop"
    },
    {
        id: "abc-11",
        title: "Annapurna Base Camp Trek",
        region: "annapurna",
        duration: 11,
        difficulty: "moderate",
        maxAltitude: "4,130m",
        price: 980,
        rating: 4.8,
        reviews: 276,
        bestSeller: true,
        image: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=700&h=520&fit=crop"
    },
    {
        id: "gokyo-15",
        title: "Gokyo Lakes & Everest",
        region: "everest",
        duration: 15,
        difficulty: "challenging",
        maxAltitude: "5,357m",
        price: 1520,
        rating: 4.9,
        reviews: 148,
        bestSeller: false,
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=700&h=520&fit=crop"
    },
    {
        id: "langtang-valley-9",
        title: "Langtang Valley Trek",
        region: "langtang",
        duration: 9,
        difficulty: "moderate",
        maxAltitude: "3,870m",
        price: 720,
        rating: 4.7,
        reviews: 94,
        bestSeller: false,
        image: "https://images.unsplash.com/photo-1626621331169-5f34be280e0b?w=700&h=520&fit=crop"
    },
    {
        id: "annapurna-circuit-16",
        title: "Annapurna Circuit Trek",
        region: "annapurna",
        duration: 16,
        difficulty: "challenging",
        maxAltitude: "5,416m",
        price: 1380,
        rating: 4.9,
        reviews: 201,
        bestSeller: true,
        image: "https://images.unsplash.com/photo-1591870655499-eba54fe2c1c1?w=700&h=520&fit=crop"
    },
    {
        id: "upper-mustang-12",
        title: "Upper Mustang Trek",
        region: "mustang",
        duration: 12,
        difficulty: "moderate",
        maxAltitude: "3,840m",
        price: 1690,
        rating: 4.8,
        reviews: 67,
        bestSeller: false,
        image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=700&h=520&fit=crop"
    },
    {
        id: "manaslu-circuit-14",
        title: "Manaslu Circuit Trek",
        region: "manaslu",
        duration: 14,
        difficulty: "challenging",
        maxAltitude: "5,106m",
        price: 1590,
        rating: 4.8,
        reviews: 58,
        bestSeller: false,
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=700&h=520&fit=crop"
    },
    {
        id: "poonhill-6",
        title: "Poon Hill Short Trek",
        region: "annapurna",
        duration: 6,
        difficulty: "easy",
        maxAltitude: "3,210m",
        price: 480,
        rating: 4.6,
        reviews: 189,
        bestSeller: true,
        image: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=700&h=520&fit=crop"
    },
    {
        id: "upper-dolpo-20",
        title: "Upper Dolpo Trek",
        region: "dolpo",
        duration: 20,
        difficulty: "extreme",
        maxAltitude: "5,190m",
        price: 2450,
        rating: 4.9,
        reviews: 21,
        bestSeller: false,
        image: "https://images.unsplash.com/photo-1585511543209-abc8fd029486?w=700&h=520&fit=crop"
    }
];

const TRIP_OF_THE_MONTH = {
    id: "ebc-14",
    label: "Trip of the Month",
    title: "Everest Base Camp Trek",
    description: "Walk the classic trail through Sherpa villages, prayer-flagged passes, and glacier moraine to stand where the world's highest mountain meets the sky.",
    highlights: [
        "Fly into Lukla, the world's most thrilling airstrip",
        "Overnight in Namche Bazaar and Tengboche Monastery",
        "Stand at Everest Base Camp, 5,364m"
    ],
    price: 1450,
    note: "Only 4 departures left before winter — next group leaves in 3 weeks.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&h=1000&fit=crop"
};

const SEASONS = [
    {
        id: "spring",
        icon: "🌸",
        name: "Spring",
        months: "March – May",
        description: "Rhododendrons bloom across the mid-hills and skies are generally clear. A favorite for Everest and Annapurna.",
        temp: "5°C to 15°C",
        featured: false
    },
    {
        id: "summer",
        icon: "🌧️",
        name: "Summer / Monsoon",
        months: "June – August",
        description: "Wet and cloudy in most regions, but the rain-shadow trails of Mustang and Dolpo stay dry and walkable.",
        temp: "15°C to 25°C",
        featured: false
    },
    {
        id: "autumn",
        icon: "🍁",
        name: "Autumn",
        months: "September – November",
        description: "The clearest skies and most stable weather of the year. Peak season for every major trekking region.",
        temp: "0°C to 20°C",
        featured: true
    },
    {
        id: "winter",
        icon: "❄️",
        name: "Winter",
        months: "December – February",
        description: "Cold and quiet at altitude, but low routes like Poon Hill and Langtang stay open with fewer crowds.",
        temp: "-10°C to 10°C",
        featured: false
    }
];

const REVIEWS = [
    {
        name: "Sarah Mitchell",
        country: "United Kingdom",
        rating: 5,
        trek: "Everest Base Camp Trek",
        quote: "Our guide Pasang knew every switchback and every teahouse owner by name. I felt safe and cared for the entire way to base camp."
    },
    {
        name: "Marco Rossi",
        country: "Italy",
        rating: 5,
        trek: "Annapurna Circuit Trek",
        quote: "Sixteen days, one bad blister, zero regrets. Gateway handled the permits and logistics so all we had to do was walk."
    },
    {
        name: "Aiko Tanaka",
        country: "Japan",
        rating: 5,
        trek: "Poon Hill Short Trek",
        quote: "A perfect introduction to the Himalayas for someone who'd never trekked before. The sunrise from Poon Hill is worth the early wake-up."
    },
    {
        name: "David Chen",
        country: "Canada",
        rating: 4,
        trek: "Manaslu Circuit Trek",
        quote: "Remote, quiet, and stunning. Fewer crowds than Everest but just as dramatic. Our guide's altitude knowledge was excellent."
    },
    {
        name: "Emma Johansson",
        country: "Sweden",
        rating: 5,
        trek: "Upper Mustang Trek",
        quote: "Like stepping into old Tibet. The landscapes are otherworldly and our guide's stories about the region made it unforgettable."
    }
];

const DEPARTURES = [
    { trek: "Everest Base Camp Trek", region: "everest", date: "2026-09-14", duration: 14, seatsLeft: 3, seatsTotal: 12, price: 1450 },
    { trek: "Annapurna Base Camp Trek", region: "annapurna", date: "2026-09-20", duration: 11, seatsLeft: 7, seatsTotal: 12, price: 980 },
    { trek: "Poon Hill Short Trek", region: "annapurna", date: "2026-09-25", duration: 6, seatsLeft: 5, seatsTotal: 14, price: 480 },
    { trek: "Langtang Valley Trek", region: "langtang", date: "2026-10-02", duration: 9, seatsLeft: 9, seatsTotal: 12, price: 720 },
    { trek: "Everest Base Camp Trek", region: "everest", date: "2026-10-08", duration: 14, seatsLeft: 2, seatsTotal: 12, price: 1450 },
    { trek: "Annapurna Circuit Trek", region: "annapurna", date: "2026-10-15", duration: 16, seatsLeft: 6, seatsTotal: 12, price: 1380 },
    { trek: "Manaslu Circuit Trek", region: "manaslu", date: "2026-10-20", duration: 14, seatsLeft: 4, seatsTotal: 10, price: 1590 },
    { trek: "Upper Mustang Trek", region: "mustang", date: "2026-11-01", duration: 12, seatsLeft: 8, seatsTotal: 10, price: 1690 }
];
