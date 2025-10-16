import { useAuth } from "@clerk/clerk-expo";
import { useStripe } from "@stripe/stripe-react-native";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useLocationStore } from "@/store";
import { PaymentProps } from "@/types/type";

const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const {
    userAddress,
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationAddress,
    destinationLongitude,
  } = useLocationStore();

  const { userId } = useAuth();
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const initializePaymentSheet = async () => {
    try {
      const { paymentIntent, customer } = await fetchAPI(
        "/(api)/(stripe)/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: fullName || email.split("@")[0],
            email: email,
            amount: amount,
          }),
        }
      );

      console.log("{ paymentIntent, customer }", paymentIntent?.client_secret);
      setClientSecret(paymentIntent?.client_secret);

      const { error } = await initPaymentSheet({
        merchantDisplayName: "Together Better, Inc.",
        paymentIntentClientSecret: paymentIntent?.client_secret,
        allowsDelayedPaymentMethods: true,
      });

      if (!error) {
        setLoading(true);
      } else {
        console.error("Init Payment Sheet error:", error);
      }
    } catch (e) {
      console.error("Error initializing payment sheet:", e);
    }
  };

  const openPaymentSheet = async () => {
    console.log("!loading", !loading);
    if (!loading) return;

    const paymentDetails: any = await presentPaymentSheet();
    // TO-DO: above method is not returning payment details
    // so we cannot double-check the payments

    console.log("paymentDetails", paymentDetails);

    const rideCreateResponse = await fetchAPI("/(api)/ride/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        origin_address: userAddress,
        destination_address: destinationAddress,
        origin_latitude: userLatitude,
        origin_longitude: userLongitude,
        destination_latitude: destinationLatitude,
        destination_longitude: destinationLongitude,
        ride_time: rideTime.toFixed(0),
        fare_price: parseInt(amount) * 100,
        payment_status: "paid",
        driver_id: driverId,
        user_id: userId,
      }),
    });
    console.log("Ride creation response:", rideCreateResponse);

   // Alert.alert("Success", "Your payment is confirmed!");
   setSuccess(true);

  };

  return (
    <>
      <CustomButton
        title="Confirm Ride"
        className="my-10"
        onPress={openPaymentSheet}
      />

      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          <Image source={images.check} className="w-28 h-28 mt-5" />

          <Text className="text-2xl text-center font-JakartaBold mt-5">
            Booking placed successfully
          </Text>

          <Text className="text-md text-general-200 font-JakartaRegular text-center mt-3">
            Thank you for your booking. Your reservation has been successfully
            placed. Please proceed with your trip.
          </Text>

          <CustomButton
            title="Back Home"
            onPress={() => {
              setSuccess(false);
              router.push("/(root)/(tabs)/home");
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </>
  );
};

export default Payment;
