import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { icons } from "@/constants";
import { GoogleInputProps, MarkerData } from "@/types/type";

const olamapsApiKey = process.env.EXPO_PUBLIC_OLAMAPS_ACCESS_TOKEN_KEY;
const olamapsAutocompleteUrl = "https://api.olamaps.io/places/v1/autocomplete";

import { fetchAPI } from "../lib/fetch";

const OlamapsTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  const [query, setQuery] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<MarkerData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${olamapsAutocompleteUrl}?input=${encodeURIComponent(query)}`;

        const response = await fetchAPI(url, {
          method: "GET",
          headers: { Authorization: `Bearer ${olamapsApiKey}` },
        });

        console.log("response", Array.isArray(response?.predictions));

        if (Array.isArray(response?.predictions)) {
          setSuggestions(
            response.predictions.map((item: any) => ({
              id: item?.place_id,
              latitude: item?.geometry?.location?.lat, // coords: [lng, lat]
              longitude: item?.geometry?.location?.lng,
              title: item.description,
              address: item.description,
            }))
          );
        } else {
          setSuggestions([]);
        }
      } catch(err) {
        setError(`Failed to fetch suggestions. ${err}`);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [query]);

  const onSelectSuggestion = (item: any) => {
    console.log(" +++++++++++++ onSelectSuggestion ++++++++++++ ", item);
    setQuery(item.title);
    setSuggestions([]);
    handlePress({
      latitude: item.latitude,
      longitude: item.longitude,
      address: item.address ?? item.title,
    });
  };

  return (
    <View className={`relative z-50 ${containerStyle}`}>
      <View
        className="flex flex-row items-center justify-center rounded-xl"
        style={{
          backgroundColor: textInputBackgroundColor ?? "white",
          paddingHorizontal: 10,
          borderRadius: 20,
        }}
      >
        <Image
          source={icon ?? icons.search}
          style={{ width: 24, height: 24, tintColor: "gray" }}
          resizeMode="contain"
        />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={initialLocation ?? "Where do you want to go?"}
          placeholderTextColor="gray"
          style={{
            flex: 1,
            height: 40,
            fontSize: 16,
            fontWeight: "600",
            marginLeft: 8,
          }}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setTimeout(() => setInputFocused(false), 200)}
          autoCorrect={false}
        />
      </View>

      {inputFocused && (
        <View
          style={{
            position: "absolute",
            top: 50,
            left: 0,
            right: 0,
            backgroundColor: textInputBackgroundColor ?? "white",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            maxHeight: 200,
          }}
        >
          {loading && (
            <View style={{ padding: 10 }}>
              <ActivityIndicator size="small" color="gray" />
            </View>
          )}
          {error && (
            <View style={{ padding: 10 }}>
              <Text style={{ color: "red" }}>{error}</Text>
            </View>
          )}
          {!loading &&
            !error &&
            suggestions.length === 0 &&
            query.length >= 3 && (
              <View style={{ padding: 10 }}>
                <Text>No results found</Text>
              </View>
            )}
          <FlatList
            keyboardShouldPersistTaps="handled"
            data={suggestions}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }: any) => (
              <TouchableOpacity
                onPress={() => onSelectSuggestion(item)}
                style={{
                  padding: 12,
                  borderBottomWidth: 1,
                  borderColor: "#eee",
                }}
              >
                <Text>{item.title}</Text>
                <Text style={{ fontSize: 12, color: "gray" }}>
                  {item.address}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default OlamapsTextInput;
