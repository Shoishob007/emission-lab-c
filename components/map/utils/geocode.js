export const getCoordsFromLocation = async (location) => {
    if (!location) return null;

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        location
    )}&format=json&limit=1`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data && data.length > 0) {
            return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        }
    } catch (err) {
        console.error("Geocoding error:", err);
    }

    return null;
};
