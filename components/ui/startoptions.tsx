// Start point, my location or select
// loop or destination

//we want to select a starting point, and decide to go in a loop or not

//Idea -> Loop selector switch, when active only start location shows
//        When deactive that it reveals end location active

import { useRef, useState } from "react";
import { Animated, Pressable, Text, TextInput, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function StartOptions() {
  const [isLoop, setIsLoop] = useState(false);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");

  const animatedValue = useRef(new Animated.Value(0)).current;

  const toggleSwitch = () => {
    const toValue = isLoop ? 0 : 1;

    Animated.spring(animatedValue, {
      toValue,
      friction: 10,
      tension: 100,
      useNativeDriver: true,
    }).start();

    setIsLoop(!isLoop);
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20], // 44px (w-11) - 20px (w-5) - 4px (padding) = 20px travel
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(209, 213, 219)", "rgb(59, 130, 246)"], // gray-300 to blue-500
  });
  return (
    <View
      style={{ backgroundColor: "white", borderRadius: 12, overflow: "hidden" }}
    >
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 16,
          paddingVertical: 12,
          gap: 16,
        }}
      >
        {/* LEFT: Loop label + switch */}
        <View
          style={{ justifyContent: "center", alignItems: "center", width: 50 }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "#6B7280",
              marginBottom: 8,
              fontWeight: "500",
            }}
          >
            Loop
          </Text>

          <Pressable
            onPress={toggleSwitch}
            style={{
              width: 44,
              height: 24,
              borderRadius: 12,
              padding: 2,
              justifyContent: "center",
            }}
          >
            <Animated.View
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 12,
                backgroundColor,
                justifyContent: "center",
              }}
            >
              <Animated.View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: "white",
                  transform: [{ translateX }],
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              />
            </Animated.View>
          </Pressable>
        </View>

        {/* RIGHT: Inputs */}
        <View style={{ flex: 1, gap: 8 }}>
          {/* Start / Location */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F3F4F6",
              borderRadius: 24,
              paddingHorizontal: 16,
              paddingVertical: 12,
              minHeight: 48,
            }}
          >
            <Ionicons name="location-outline" size={18} color="#6B7280" />
            <TextInput
              value={startLocation}
              onChangeText={setStartLocation}
              placeholder={isLoop ? "Location" : "Start location"}
              placeholderTextColor="#9CA3AF"
              style={{ flex: 1, fontSize: 16, color: "#111827" }}
            />
          </View>

          {/* End Location (only if not loop) */}
          {!isLoop && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#F3F4F6",
                borderRadius: 24,
                paddingHorizontal: 16,
                paddingVertical: 12,
                minHeight: 48,
              }}
            >
              <Ionicons name="flag-outline" size={18} color="#6B7280" />
              <TextInput
                value={endLocation}
                onChangeText={setEndLocation}
                placeholder="Destination"
                placeholderTextColor="#9CA3AF"
                style={{ flex: 1, fontSize: 16, color: "#111827" }}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
