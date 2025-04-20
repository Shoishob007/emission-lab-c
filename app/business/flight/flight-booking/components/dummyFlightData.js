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
    emissionsValue: "132kg",
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
    { id: "visa", name: "Visa", image: "/payment/visa.png" },
    { id: "mastercard", name: "Mastercard", image: "/payment/mastercard.png" },
    { id: "amex", name: "American Express", image: "/payment/amex.png" },
    { id: "bkash", name: "bKash", image: "/payment/bkash.png" },
    { id: "nagad", name: "Nagad", image: "/payment/nagad.png" },
    { id: "rocket", name: "Rocket", image: "/payment/rocket.png" },
    { id: "ucb", name: "UCB", image: "/payment/ucb.png" },
    { id: "dbbl", name: "DBBL", image: "/payment/dbbl.png" },
    { id: "city", name: "City Bank", image: "/payment/city.png" },
    { id: "ebl", name: "EBL", image: "/payment/ebl.png" },
    { id: "ibbl", name: "IBBL", image: "/payment/ibbl.png" },
    { id: "brac", name: "BRAC Bank", image: "/payment/brac.png" },
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

