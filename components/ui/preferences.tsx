import { Text, TouchableOpacity, View } from "react-native";

type Preference = {
  id: string;
  label: string;
};

const PREFERENCES: Preference[] = [
  { id: "CS", label: "Calm & Scenic" },
  { id: "SI", label: "Sporty & Intense" },
  { id: "CH", label: "Curve-heavy" },
  { id: "FF", label: "Fast & Flowing" },
  { id: "CB", label: "Scenic Backgrounds" },
];

interface PreferencesSelectorProps {
  selected: string[];
  maxSelected?: number;
  onChange: (selected: string[]) => void;
}

export default function PreferencesSelector({
  selected,
  maxSelected = 2,
  onChange,
}: PreferencesSelectorProps) {
  const safeSelected = selected ?? [];

  const handleToggle = (id: string) => {
    if (safeSelected.includes(id)) {
      onChange(safeSelected.filter((item) => item !== id));
    } else if (safeSelected.length < maxSelected) {
      onChange([...safeSelected, id]);
    }
  };

  const isSelected = (id: string) => safeSelected.includes(id);
  const isDisabled = (id: string) =>
    !isSelected(id) && safeSelected.length >= maxSelected;

  return (
    <View>
      <Text className="text-sm text-gray-600 mb-4">
        Select up to {maxSelected} preferences
      </Text>

      <View className="flex-row flex-wrap">
        {PREFERENCES.map((pref) => {
          const isActive = isSelected(pref.id);
          const disabled = isDisabled(pref.id);

          return (
            <View key={pref.id} className="mr-2 mb-2">
              <TouchableOpacity
                onPress={() => handleToggle(pref.id)}
                disabled={disabled}
                className={`px-4 py-2 rounded-full border-2 ${
                  isActive
                    ? "bg-blue-500 border-blue-500"
                    : disabled
                    ? "bg-gray-100 border-gray-300"
                    : "bg-white border-gray-400"
                }`}
              >
                <Text
                  className={`font-medium ${
                    isActive
                      ? "text-white"
                      : disabled
                      ? "text-gray-400"
                      : "text-gray-700"
                  }`}
                >
                  {pref.label}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
}
