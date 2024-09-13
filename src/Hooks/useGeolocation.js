// src/Hooks/useGeolocation.js

import { useState } from "react";

export function useGeolocation() {
  const [position, setPosition] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPosition = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      }
    );
  };

  return {
    position,
    isloading,
    getPosition,
    error,
  };
}
