export const flightDetails = {
    id: "AA1234",
    airline: "American Airlines",
    logo: "/airline-logos/American_Airlines.svg",
    arrival: {
        airport: "Dublin Airport (DUB)",
        date: "8 May, Thursday",
        time: "11:15 AM",
        terminal: "Terminal 2",
        day: "+1",
    },
    departure: {
        airport: "John F Kennedy International (JFK)",
        date: "7 May, Wednesday",
        time: "7:30 PM",
        terminal: "Terminal 4",
    },
    duration: "10hr 45min",
    price: {
        current: 60454,
        original: 62753,
        currency: "Tk",
    },
    promo: "SAVEONUSD",
    refundable: false,
    cabinClass: "Economy",
    route: "JFK - DUB",
    seats: 23,
    baggage: "7kg hand baggage",
    stops: {
        airport: "London Heathrow (LHR)",
        count: 1,
        duration: "2hr 5min",
    },
    score: 8.7,
    emissions: "Low CO2 emissions",
    emissionsValue: "13200kg",
};


export const availableCoupons = [
    {
        code: "FLIGHTINT",
        discount: "10% OFF",
        description: "Get 10% off on all online payments",
        eligible: true,
    },
    {
        code: "EMFLYOUT",
        discount: "Up to 12% discount",
        description: "EMI Facility with up to 12% discount",
        eligible: true,
    },
    {
        code: "ZERODMI",
        discount: "Zero 0% EMI",
        description: "Zero 0% EMI upon 6 months",
        eligible: true,
    },
    {
        code: "FLVIPSTAR",
        discount: "Exclusive for VIP",
        description: "Exclusive for VIP+ Customers",
        eligible: false,
    },
    {
        code: "FLYORANGE",
        discount: "Exclusive for Orange Club",
        description: "Exclusive for Orange Club members",
        eligible: false,
    },
    {
        code: "FLYELITE",
        discount: "Exclusive for Elite Tier",
        description: "Exclusive for Elite Tier Customers",
        eligible: false,
    },
];

export const paymentMethods = [
    { id: "visa", name: "Visa", image: "/bank-logos/visa.svg" },
    { id: "mastercard", name: "Mastercard", image: "/bank-logos/mastercard.svg" },
    { id: "amex", name: "American Express", image: "/bank-logos/American_Express.svg" },
    { id: "bkash", name: "bKash", image: "/bank-logos/Bkash.svg" },
    { id: "nagad", name: "Nagad", image: "/bank-logos/Nagad.svg" },
    { id: "rocket", name: "Rocket", image: "/bank-logos/rocket.png" },
    { id: "ucb", name: "UCB", image: "/bank-logos/ucb-bank.png" },
    { id: "dbbl", name: "DBBL", image: "/bank-logos/dutch-bangla-bank.png" },
    { id: "city", name: "City Bank", image: "/bank-logos/city-bank.png" },
    { id: "ebl", name: "EBL", image: "/bank-logos/ebl.png" },
    { id: "ibbl", name: "IBBL", image: "/bank-logos/islami-bank.png" },
    { id: "brac", name: "BRAC Bank", image: "/bank-logos/Brac-Bank.svg" },
    { id: "mtb", name: "MTB", image: "/bank-logos/MTB.svg" },
    { id: "southeast", name: "South East Bank", image: "/bank-logos/southeast.png" },
    { id: "scb", name: "Standard Chatered Bank", image: "/bank-logos/SCB.png" },
    { id: "prime", name: "Prime Bank", image: "/bank-logos/Prime-bank.png" },
    { id: "lanka-bangla", name: "Lanka Bangla Bank", image: "/bank-logos/lanka-bangla.svg" },
    { id: "ab", name: "AB Bank", image: "/bank-logos/ab.png" },

    
];

export const wheelchairOptions = [
    { id: "none", label: "None" },
    {
        id: "cannot-walk-stairs",
        label: "Passenger can not walk short distance up or down stairs",
    },
    {
        id: "cannot-walk-short",
        label: "Passenger can not walk short distance, but not up or down stairs",
    },
    {
        id: "cannot-walk",
        label:
            "Passenger cannot walk any distance and will require the aisle chair to board",
    },
    { id: "aisle-wheelchair", label: "On-board aisle wheelchair requested" },
    {
        id: "manual-wheelchair",
        label: "Passenger is traveling with a manual wheelchair",
    },
    {
        id: "dry-battery",
        label: "Passenger is traveling with a dry cell battery-powered wheelchair",
    },
    {
        id: "wet-battery",
        label: "Passenger is traveling with a wet cell battery-powered wheelchair",
    },
];

export const mealOptions = [
    { id: "none", label: "None" },
    { id: "vegetarian", label: "Asian Vegetarian Meal" },
    { id: "infant", label: "Infant/baby Food" },
    { id: "child", label: "Child Meal" },
    { id: "diabetic", label: "Diabetic Meal" },
    { id: "seafood", label: "Sea Food Meal" },
    { id: "muslim", label: "Muslim Meal" },
];

