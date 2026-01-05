import { useState } from "react";

export const useMapInteractions = () => {
    const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

    const handleMoveEnd = (pos) => {
        setPosition(pos);
    };

    const handleResetView = () => {
        setPosition({ coordinates: [0, 0], zoom: 1 });
    };

    return {
        position,
        handleMoveEnd,
        handleResetView,
    };
};