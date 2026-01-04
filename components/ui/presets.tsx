import { Text, TouchableOpacity, View } from "react-native";

type Preset = {
  id: string;
  label: string;
  preferences: string[];
};

const PRESETS = [
  {
    id: "track-day-warmup",
    label: "Track Day Warmup",
    preferences: ["sporty", "fast"],
  },
  {
    id: "sunday-cruise",
    label: "Sunday Cruise",
    preferences: ["calm", "scenic"],
  },
  {
    id: "city-commute",
    label: "City Commute",
    preferences: ["efficient", "quick"],
  },
  {
    id: "road-trip",
    label: "Road Trip",
    preferences: ["comfortable", "scenic"],
  },
];

interface PresetsProps {
  selected: string | null;
  onSelectPreset: (id: string) => void;
}

export default function Presets({ selected, onSelectPreset }: PresetsProps) {
  return (
    <View>
      <Text className="text-sm text-gray-600 mb-4">
        Choose a preset configuration
      </Text>

      <View className="space-y-3">
        {PRESETS.map((preset) => {
          const isSelected = selected === preset.id;

          return (
            <TouchableOpacity
              key={preset.id}
              onPress={() => onSelectPreset(preset.id)}
              activeOpacity={0.85}
              className={`border-2 rounded-lg p-4 ${
                isSelected
                  ? "bg-blue-50 border-blue-500"
                  : "bg-white border-gray-300"
              }`}
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1 pr-2">
                  <Text
                    className={`text-base font-semibold mb-1 ${
                      isSelected ? "text-blue-700" : "text-gray-800"
                    }`}
                  >
                    {preset.label}
                  </Text>

                  <Text
                    className={`text-sm ${
                      isSelected ? "text-blue-600" : "text-gray-500"
                    }`}
                  >
                    {preset.preferences.join(" • ")}
                  </Text>
                </View>

                {isSelected && (
                  <View className="w-6 h-6 rounded-full bg-blue-500 items-center justify-center">
                    <Text className="text-white font-bold text-sm">✓</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
