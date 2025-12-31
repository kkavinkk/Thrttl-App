import { useState } from "react";
import { Pressable, View } from "react-native";

import RideControls from "@/components/RideControls";
import Map from "@/components/RideMap";

export default function RideTab() {
  const [expanded, setExpanded] = useState(false);
  return (
    <View className="flex-1 relative">
      {/* Map */}
      <Map />

      {/* Bottom Sheet (Web-safe) */}
      <View
        className={`absolute left-0 right-0 bottom-0 bg-white rounded-t-2xl
        transition-all duration-300 ease-out
        ${expanded ? "h-[60%]" : "h-20"}`}
      >
        {/* Drag Handle */}
        <Pressable
          onPress={() => setExpanded(!expanded)}
          className="items-center py-2"
        >
          <View className="w-10 h-1.5 rounded-full bg-gray-300" />
        </Pressable>

        {/* Content */}
        <View className="px-4">
          <RideControls />
        </View>
      </View>
    </View>
  );
}
