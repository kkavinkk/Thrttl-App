import React from "react";
import { Image, Text, View } from "react-native";

type Route = {
  distance: string;
  isLoop: boolean;
};

type MapProps = {
  route: Route | null;
  isGenerating: boolean;
};

const Map: React.FC<MapProps> = ({ route, isGenerating }) => {
  return (
    <View style={{ position: "relative" }}>
      <Image
        source={require("../assets/images/mapPlaceHolder.png")}
        style={{
          width: "100%",
          height: 325,
          borderRadius: 12,
        }}
      />

      {isGenerating && (
        <View
          style={{
            position: "absolute",
            inset: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.6)",
          }}
        >
          <Text>Generating route…</Text>
        </View>
      )}

      {route && (
        <View
          style={{
            position: "absolute",
            bottom: 12,
            left: 12,
            right: 12,
            backgroundColor: "white",
            padding: 8,
            borderRadius: 8,
          }}
        >
          <Text style={{ fontSize: 12 }}>
            {route.isLoop ? "Loop ride" : "Point-to-point"} · {route.distance}{" "}
            km
          </Text>
        </View>
      )}
    </View>
  );
};

export default Map;
