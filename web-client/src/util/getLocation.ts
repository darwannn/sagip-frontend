type coordinates = {
  latitude: number;
  longitude: number;
};

export const getLocation = (): Promise<coordinates> => {
  return new Promise((resolve, reject) => {
    /*  if (window.AndroidInterface?.isLocationEnabled("resident")) { */
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(new Error("Error getting location: " + error.message));
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
    /* } */
    /* else {
      reject(new Error("Location is not enabled."));
    } */
  });
};
