import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import PreferencesSelector from "./preferences";
import Presets from "./presets";

export default function OptionSwitch() {
  const [activeTab, setActiveTab] = useState<
    "presets" | "preferences" | "advanced"
  >("presets");

  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);

    // 🔥 CLEAR ALL OTHER STATE
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
