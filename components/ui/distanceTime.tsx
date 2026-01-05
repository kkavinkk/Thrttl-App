// Create a distance input -> this input isnt going to be exact but the program will
// get as close as possible to it

// TIME IS ONLY SHOWN AFTER GENERATION to give context to the ride
// distance is intent time is calculation
import { Text, TextInput, View } from "react-native";

type Props = {
  distance: string;
  setDistance: (v: string) => void;
};

export default function DistanceInput({ distance, setDistance }: Props) {
  const handleDistanceChange = (text: string) => {
    // Allow numbers and one decimal point
    const numericValue = text.replace(/[^0-9.]/g, "");

    // Prevent multiple decimal points
    const decimalCount = (numericValue.match(/\./g) || []).length;
    if (decimalCount > 1) return;

    // Limit to reasonable distance values (0-9999.99)
    const num = parseFloat(numericValue);
    if (numericValue === "" || (num >= 0 && num <= 9999.99)) {
      setDistance(numericValue);
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#ffffffff",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 14,
          color: "#6B7280",
          marginBottom: 8,
          marginLeft: 16,
          fontWeight: "500",
        }}
      >
        Distance
      </Text>

      {/* Distance Input */}
      <View style={{ marginBottom: 24, marginHorizontal: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F3F4F6",
            borderRadius: 24,
            paddingHorizontal: 20,
            paddingVertical: 12,
            minHeight: 48,
          }}
        >
          <TextInput
            value={distance}
            onChangeText={handleDistanceChange}
            placeholder="0"
            placeholderTextColor="#9CA3AF"
            keyboardType="decimal-pad"
            style={{ flex: 1, fontSize: 16, color: "#111827" }}
          />
          <Text
            style={{
              fontSize: 14,
              color: "#6B7280",
              marginBottom: 8,
              marginLeft: 16,
              fontWeight: "500",
            }}
          >
            km
          </Text>
        </View>
      </View>
    </View>
  );
}
