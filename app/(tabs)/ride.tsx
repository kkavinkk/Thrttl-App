import { Text, View } from "react-native";

import Map from "@/components/RideMap";

export default function RideTab() {
  return (
    <View>
      <Text>Ride Generator</Text>
      <Map />
      {/* <Ridescreen>
            <RideMap />
            <RideControls />
        </Ridescreen> */}
    </View>
  );
}
