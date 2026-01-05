import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import PreferencesSelector from "./preferences";
import Presets from "./presets";

type Tab = "presets" | "preferences" | "advanced";

type Props = {
  activeTab: Tab;
  setActiveTab: (t: Tab) => void;
  selectedPreset: string | null;
  setSelectedPreset: (v: string | null) => void;
  selectedPreferences: string[];
  setSelectedPreferences: (v: string[]) => void;
};

export default function OptionSwitch({
  activeTab,
  setActiveTab,
  selectedPreset,
  setSelectedPreset,
  selectedPreferences,
  setSelectedPreferences,
}: Props) {
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);

    // 🔥 clear other state
    if (tab !== "presets") setSelectedPreset(null);
    if (tab !== "preferences") setSelectedPreferences([]);
  };

  return (
    <ScrollView className="flex-1">
      <View className="p-5 max-w-2xl w-full self-center">
        {/* Three-option switch */}
        <View className="flex-row bg-gray-300 rounded-full p-1 mb-6">
          {["presets", "preferences", "advanced"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => handleTabChange(tab as any)}
              className={`flex-1 py-2.5 px-4 rounded-full items-center ${
                activeTab === tab ? "bg-blue-500" : ""
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  activeTab === tab ? "text-white" : "text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content sections */}
        <View className="bg-white rounded-xl p-5 shadow-md">
          {activeTab === "presets" && (
            <Presets
              selected={selectedPreset}
              onSelectPreset={setSelectedPreset}
            />
          )}

          {activeTab === "preferences" && (
            <PreferencesSelector
              selected={selectedPreferences}
              onChange={setSelectedPreferences}
              maxSelected={2}
            />
          )}

          {activeTab === "advanced" && <View />}
        </View>
      </View>
    </ScrollView>
  );
}
