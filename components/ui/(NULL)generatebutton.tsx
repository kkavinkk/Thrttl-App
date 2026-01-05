import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface GenerateButtonProps {
  disabled?: boolean;
  onPress: () => Promise<void> | void;
}

export default function GenerateButton({
  disabled = false,
  onPress,
}: GenerateButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    if (disabled || loading) return;

    setLoading(true);
    try {
      await onPress();
    } catch (error) {
      console.error("Generate error:", error);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isDisabled}
      className={`py-4 px-6 rounded-xl flex-row items-center justify-center ${
        isDisabled ? "bg-gray-300" : "bg-blue-500 active:bg-blue-600"
      }`}
    >
      {loading ? (
        <>
          <ActivityIndicator color="white" size="small" />
          <Text className="text-white font-semibold text-base ml-2">
            Generating...
          </Text>
        </>
      ) : (
        <Text
          className={`font-semibold text-base ${
            isDisabled ? "text-gray-500" : "text-white"
          }`}
        >
          Generate Route
        </Text>
      )}
    </TouchableOpacity>
  );
}
