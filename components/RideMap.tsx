import React from "react";
import { Image, View } from "react-native";

const Map: React.FC = () => {
  return (
    <View>
      <Image
        source={require("../assets/images/mapPlaceHolder.png")}
        style={{
          width: "100%",
          height: 325,
          borderRadius: 12,
        }}
      />
      {/* route generation and loading
            route={generatedRoute}
            isGenerating={isLoading}
        */}
    </View>
  );
};

export default Map;
