// Start point, my location or select
// loop or destination

//we want to select a starting point, and decide to go in a loop or not

//Idea -> Loop selector switch, when active only start location shows
//        When deactive that it reveals end location active

import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function StartOptions() {
  const [isLoop, setIsLoop] = useState(true);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");

  return (
    <View className="flex-1 justify-center bg-gray-100 p-4">
      <View className="bg-white rounded-2xl p-6 shadow">
        <Text className="text-2xl font-bold text-gray-800 mb-6">
          Map Location
        </Text>

        {/* Loop Switch */}
        <View className="flex-row items-center justify-between mb-6 p-4 bg-gray-100 rounded-lg">
          <Text className="text-lg font-medium text-gray-700">Loop</Text>

          <Pressable
            onPress={() => setIsLoop(!isLoop)}
            className={`w-14 h-8 rounded-full justify-center px-1 ${
              isLoop ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <View
              className={`w-6 h-6 bg-white rounded-full ${
                isLoop ? "self-end" : "self-start"
              }`}
            />
          </Pressable>
        </View>

        {/* Start Location */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-2">
            {isLoop ? "Location" : "Start Location"}
          </Text>
          <TextInput
            value={startLocation}
            onChangeText={setStartLocation}
            placeholder="Enter location"
            className="border border-gray-300 rounded-lg px-4 py-3"
          />
        </View>

        {/* End Location (only when not loop) */}
        {!isLoop && (
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              End Location
            </Text>
            <TextInput
              value={endLocation}
              onChangeText={setEndLocation}
              placeholder="Enter end location"
              className="border border-gray-300 rounded-lg px-4 py-3"
            />
          </View>
        )}

        {/* Info */}
        <View className="mt-4 p-4 bg-blue-50 rounded-lg">
          <Text className="text-sm text-blue-800">
            {isLoop
              ? "Loop mode: Route will return to starting location"
              : "One-way mode: Route from start to end location"}
          </Text>
        </View>
      </View>
    </View>
  );
}
