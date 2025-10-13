import { MarkerData } from "@/types/type";

const directionsAPI = process.env.EXPO_PUBLIC_DIRECTIONS_API_KEY;

export const generateMarkersFromData = ({
  data,
  userLatitude,
  userLongitude,
}: {
  data: any[];
  userLatitude: number;
  userLongitude: number;
}): any => {
  return data.map((driver) => {
    const latOffset = (Math.random() - 0.5) * 0.01; // Random offset between -0.005 and 0.005
    const lngOffset = (Math.random() - 0.5) * 0.01; // Random offset between -0.005 and 0.005

    return {
      latitude: userLatitude + latOffset,
      longitude: userLongitude + lngOffset,
      title: `${driver.first_name} ${driver.last_name}`,
      ...driver,
    };
  });
};

export const calculateRegion = ({
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude?: number | null;
  destinationLongitude?: number | null;
}) => {
  if (!userLatitude || !userLongitude) {
    return {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  if (!destinationLatitude || !destinationLongitude) {
    return {
      latitude: userLatitude,
      longitude: userLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  const minLat = Math.min(userLatitude, destinationLatitude);
  const maxLat = Math.max(userLatitude, destinationLatitude);
  const minLng = Math.min(userLongitude, destinationLongitude);
  const maxLng = Math.max(userLongitude, destinationLongitude);

  const latitudeDelta = (maxLat - minLat) * 1.3; // Adding some padding
  const longitudeDelta = (maxLng - minLng) * 1.3; // Adding some padding

  const latitude = (userLatitude + destinationLatitude) / 2;
  const longitude = (userLongitude + destinationLongitude) / 2;

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  };
};

export const calculateDriverTimes = async ({
  markers,
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  markers: MarkerData[];
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
}) => {
  if (
    !userLatitude ||
    !userLongitude ||
    !destinationLatitude ||
    !destinationLongitude
  )
    return;

  try {
    //   curl 'https://api.olamaps.io/routing/v1/directions?origin=28.638555%2C76.965502&destination=28.539669%2C77.051907&api_key=YOUR_SECRET_TOKEN' \
    // --request POST

    const timesPromises = markers.map(async (marker) => {
      const responseToUser = await fetch(
        `https://api.olamaps.io/routing/v1/directions?origin=${marker.latitude},${marker.longitude}&destination=${userLatitude},${userLongitude}&key=${directionsAPI}`
      );
      // console.log(" -------------------- responseToUser -------------------- ", responseToUser);
      const dataToUser = await responseToUser.json();
      console.log(
        " -------------------- dataToUser -------------------- ",
        dataToUser
      );

      // if (!dataToUser?.routes?.length || !dataToUser.routes[0]?.legs?.length) {
      //   console.warn("⚠️ No valid route data found:", dataToUser);
      //   return null; // or continue to next driver
      // }

      const timeToUser = dataToUser?.routes[0]?.legs[0].duration || null; // Time in seconds

      console.log(`https://api.olamaps.io/routing/v1/directions?origin=${userLatitude},${userLongitude}&destination=${destinationLatitude},${destinationLongitude}&key=${directionsAPI}`)

      const responseToDestination = await fetch(
        `https://api.olamaps.io/routing/v1/directions?origin=${userLatitude},${userLongitude}&destination=${destinationLatitude},${destinationLongitude}&key=${directionsAPI}`
      );
      // console.log(" -------------------- responseToDestination -------------------- ", responseToDestination);

      const dataToDestination = await responseToDestination.json();
      console.log(
        " -------------------- dataToDestination -------------------- ",
        dataToDestination
      );

      const timeToDestination = dataToDestination.routes[0].legs[0].duration; // Time in seconds

      const totalTime = (timeToUser + timeToDestination) / 60; // Total time in minutes
      const price = (totalTime * 0.5).toFixed(2); // Calculate price based on time

      return { ...marker, time: totalTime, price };
    });

    return await Promise.all(timesPromises);
  } catch (error) {
    console.error("Error calculating driver times:", error);
  }
};
