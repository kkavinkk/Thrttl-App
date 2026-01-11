import { GeneratedRoute } from "@/types/route";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";

type Props = {
  route: GeneratedRoute | null;
  isGenerating: boolean;
};

export default function Map({ route, isGenerating }: Props) {
  useEffect(() => {
    if (route) {
      console.log("Route generated:", route.points);
    }
  }, [route]);

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../assets/images/mapPlaceHolder.png")}
        style={{ width: "100%", height: "100%" }}
      />

      {isGenerating && (
        <Text style={{ position: "absolute", top: 50, alignSelf: "center" }}>
          Generating route...
        </Text>
      )}

      {route && (
        <Text style={{ position: "absolute", top: 80, alignSelf: "center" }}>
          Route ready ({route.points.length} points)
        </Text>
      )}
    </View>
  );
}
