import RideControls from "@/components/RideControls";
import Map from "@/components/RideMap";
import { Text, View } from "react-native";

export default function RideTab() {
  return (
    <View>
      <Text>Ride Generator</Text>
      <Map />
      <RideControls />
      {/* <Ridescreen>
            <RideMap />
            <RideControls />
        </Ridescreen> */}
    </View>
  );
}
