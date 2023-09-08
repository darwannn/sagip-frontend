import { useState } from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";

import { BiSearchAlt2 } from "react-icons/bi";

/* const defaultCenter = { lat: 14.8448, lng: 120.8103 };
const malolosBounds = {
  north: 14.881784,
  south: 14.795797,
  east: 120.855111,
  west: 120.781636,
};
const restrictions = {
  country: "ph",
};
 */

type TProps = {
  map: google.maps.Map | null;
};
const AssistanceDetails = ({ map }: TProps) => {
  const [searchedPlace, setSearchedPlace] = useState<google.maps.Marker | null>(
    null
  );
  const [searchBox, setSearchBox] =
    useState<google.maps.places.SearchBox | null>(null);
  const onPlacesChanged = () => {
    const places = searchBox?.getPlaces();
    if (!places || places.length === 0) return;

    const firstPlace = places[0];

    if (firstPlace.geometry && firstPlace.geometry.location) {
      const { location } = firstPlace.geometry;
      const lat = location.lat();
      const lng = location.lng();

      console.log("lat:", lat);
      console.log("lng:", lng);

      if (map) {
        const center = new window.google.maps.LatLng(lat, lng);
        map.panTo(center);

        searchedPlace?.setMap(null);

        const newMarker = new window.google.maps.Marker({
          position: center,
          map: map,
          /*  title: "",  */
        });

        newMarker.addListener("click", () => {
          newMarker.setMap(null);
        });

        setSearchedPlace(newMarker);
      }
    }
  };
  const onSBLoad = (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref);
  };
  return (
    <div className="relative flex-1">
      <BiSearchAlt2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <StandaloneSearchBox
        onPlacesChanged={onPlacesChanged}
        onLoad={onSBLoad}
        /* bounds={malolosBounds} */
      >
        <input
          type="text"
          placeholder="Search here"
          className="w-full flex-1 py-3 pl-10 rounded-lg shadow-md outline-none"
        />
      </StandaloneSearchBox>
    </div>
  );
};

export default AssistanceDetails;
