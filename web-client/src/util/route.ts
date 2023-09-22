export const getRoute = async (
  /* travelMode: string, */
  origin: string,
  destination: string
) => {
  try {
    const directionsService = new google.maps.DirectionsService();

    const results = await directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    // Calculate estimated time in hours and minutes
    const duration = results.routes[0].legs[0].duration;
    let estimatedTime = "Unknown duration";

    if (duration) {
      if (duration.value < 3600) {
        const minutes = Math.ceil(duration.value / 60);

        if (minutes === 1) {
          estimatedTime = "1 minute";
        } else {
          estimatedTime = `${minutes} minutes`;
        }
      } else {
        const hours = Math.floor(duration.value / 3600);
        const minutes = Math.ceil((duration.value % 3600) / 60);

        if (hours === 1) {
          estimatedTime = "1 hour";
        } else {
          estimatedTime = `${hours} hours`;
        }

        if (minutes > 0) {
          estimatedTime += ` ${minutes} minutes`;
        }
      }
    }

    return {
      distance: results.routes[0].legs[0].distance
        ? results.routes[0].legs[0].distance.text
        : "Unknown distance",
      steps: results.routes[0].legs[0].steps,
      estimatedTime: estimatedTime,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
