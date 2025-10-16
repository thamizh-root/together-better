import { icons } from "@/constants";
import { useFetch } from "@/lib/fetch";
import {
  calculateDriverTimes,
  calculateRegion,
  generateMarkersFromData,
} from "@/lib/map";
import { useDriverStore, useLocationStore } from "@/store";
import { Driver, MarkerData } from "@/types/type";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const directionsAPI = process.env.EXPO_PUBLIC_OLAMAPS_ACCESS_TOKEN_KEY;


export default function Map() {
  const {
    userLatitude,
    userLongitude,
    userAddress,
    destinationLatitude,
    destinationLongitude,
    destinationAddress,
  } = useLocationStore();

  const { selectedDriver, setDrivers } = useDriverStore();
  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  //  console.log("region, map.tsx", region);

  const [markers, setMarkers] = useState<MarkerData[]>([]);

  const { data: drivers, loading, error } = useFetch<Driver[]>("/(api)/driver");

  // console.log("drivers - map.tsx", drivers?.length);

  useEffect(() => {
    //TODO: remove this, this will affect list of drivers in confirm-ride windows
    // setDrivers(drivers);

    if (Array.isArray(drivers)) {
      //  console.log("!userLatitude || !userLongitude", !userLatitude || !userLongitude, userLatitude, userLongitude);
      if (!userLatitude || !userLongitude) return;

      const newMarkers = generateMarkersFromData({
        data: drivers,
        userLatitude,
        userLongitude,
      });

      // console.log("newMarkers", newMarkers);
      setMarkers(newMarkers);
    }
  }, [drivers, userLatitude, userLongitude]);

  useEffect(() => {
    console.log(
      "Am i gonna calculate driver times?",
      markers.length > 0 &&
        destinationLatitude !== undefined &&
        destinationLongitude !== undefined
    );
    if (
      markers.length > 0 &&
      destinationLatitude !== undefined &&
      destinationLongitude !== undefined
    ) {
      // console.log("markers",markers)

      calculateDriverTimes({
        markers,
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude,
      }).then((drivers) => {
        if (drivers) {
         // console.log("List of confirmed drivers, map.tsx:", drivers);
          setDrivers(drivers as MarkerData[]);
        } else {
          console.log(
            "Expected drivers when calculating driver times. Instead received",
            drivers
          );
        }
      });
    }
  }, [markers, destinationLatitude, destinationLongitude]);

  if (loading || (!userLatitude && !userLongitude)) {
    return (
      <View className="flex justify-between items-center w-full">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex justify-between items-center w-full">
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        tintColor="black"
        showsPointsOfInterest={false}
        initialRegion={region}
        showsUserLocation={true}
        userInterfaceStyle="light"
      >
        {markers.map((marker, index) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            image={
              selectedDriver === +marker.id
                ? icons.selectedMarker
                : icons.marker
            }
          />
        ))}

        {destinationLatitude && destinationLongitude && (
          <>
            <Marker
              key="destination"
              coordinate={{
                latitude: destinationLatitude,
                longitude: destinationLongitude,
              }}
              title="Destination"
              image={icons.pin}
            />
            <MapViewDirections
              origin={{
                latitude: userLatitude!,
                longitude: userLongitude!,
              }}
              destination={{
                latitude: destinationLatitude,
                longitude: destinationLongitude,
              }}
              apikey={directionsAPI!} // we dont have a google map API, so no directions
              strokeColor="#0286FF"
              strokeWidth={3}
            />
          </>
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
