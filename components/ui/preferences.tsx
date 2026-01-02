import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function OptionSwitch() {
  const [activeTab, setActiveTab] = useState("presets");

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-5 max-w-2xl w-full self-center">
        {/* Three-option switch */}
        <View className="flex-row bg-gray-300 rounded-full p-1 mb-6">
          <TouchableOpacity
            onPress={() => setActiveTab("presets")}
            className={`flex-1 py-2.5 px-4 rounded-full items-center ${
              activeTab === "presets" ? "bg-blue-500" : ""
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                activeTab === "presets" ? "text-white" : "text-gray-700"
              }`}
            >
              Presets
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("preferences")}
            className={`flex-1 py-2.5 px-4 rounded-full items-center ${
              activeTab === "preferences" ? "bg-blue-500" : ""
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                activeTab === "preferences" ? "text-white" : "text-gray-700"
              }`}
            >
              Preferences
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("advanced")}
            className={`flex-1 py-2.5 px-4 rounded-full items-center ${
              activeTab === "advanced" ? "bg-blue-500" : ""
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                activeTab === "advanced" ? "text-white" : "text-gray-700"
              }`}
            >
              Advanced
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content sections */}
        <View className="bg-white rounded-xl p-5 shadow-md">
          {activeTab === "presets" && (
            <View>
              {/* Add your Presets component here */}
              <Image
                source={require("../../assets/images/Kendrick_Lamar_-_Damn.png")}
              />
            </View>
          )}

          {activeTab === "preferences" && (
            <View>{/* Add your Preferences component here */}</View>
          )}

          {activeTab === "advanced" && (
            <View>{/* Add your Advanced component here */}</View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
