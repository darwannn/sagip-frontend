import React from "react";
import { useState } from "react";
import { getLocation } from "../../../../util/getLocation";
import my_location_icon from "../../../../assets/img/markers/my_location.png";
import { BiCurrentLocation } from "react-icons/bi";

type TProps = {
  map: google.maps.Map | null;
};

const CurrentLocation = ({ map }: TProps) => {
  const [currentLocationMarker, setCurrentLocationMarker] =
    useState<google.maps.Marker | null>(null);

  const getCurrentLocation = async () => {
    const { latitude, longitude } = await getLocation();
    console.log(latitude, longitude, "dsa");
    const currentLocation = { lat: latitude, lng: longitude };
    map?.panTo(currentLocation);

    if (currentLocationMarker) {
      currentLocationMarker.setMap(null);
    }

    const newMarker = new window.google.maps.Marker({
      position: currentLocation,
      map: map,
      icon: {
        url: my_location_icon,
        scaledSize: new window.google.maps.Size(50, 50),
      },
    });

    setCurrentLocationMarker(newMarker);
  };

  return (
    <div
      className="bg-white p-3 rounded-lg shadow-md m-auto"
      onClick={getCurrentLocation}
    >
      <BiCurrentLocation className="text-gray-600 text-2xl" />
    </div>
  );
};

export default CurrentLocation;
