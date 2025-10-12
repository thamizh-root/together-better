

import CustomButton from "@/components/CustomButton";
import OlamapsTextInput from "@/components/GoogleTextInput";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";
import { router } from "expo-router";
import { Text, View } from "react-native";

const FindRide = () => {
  const {
    userLatitude,
    userLongitude,
    userAddress,
    destinationLatitude,
    destinationLongitude,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  return (
    <>
      <RideLayout snapPoints={["65%"]} title="Ride">
        {/* <Text className="text-2xl">You are here: {userAddress}</Text>
        <Text className="text-2xl">You are going to: {destinationAddress}</Text> */}

        <View className="my-3">
          <Text className="text-lg font-JakartaSemiBold mb-3">From</Text>
          <OlamapsTextInput
            icon={icons.search}
            initialLocation={userAddress!}
            containerStyle="bg-neutral-100"
            textInputBackgroundColor="#f5f5f5"
            handlePress={(location) => setUserLocation(location)}
          />
        </View>

                <View className="my-3">
          <Text className="text-lg font-JakartaSemiBold mb-3">To</Text>
          <OlamapsTextInput
            icon={icons.map}
            initialLocation={destinationAddress!}
            containerStyle="bg-neutral-100"
            textInputBackgroundColor="#f5f5f5"
            handlePress={(location) => setDestinationLocation(location)}
          />
        </View>

        <CustomButton className="mt-5" title="Find Now" onPress={() => { router.push("/(root)/confirm-ride") }}/>


      </RideLayout>
    </>
  );
};

export default FindRide;

