import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  Pressable,
  View,
} from "react-native";

//components
import Map from "@/components/RideMap";
import GenerateButton from "@/components/ui/(NULL)generatebutton";
import DistanceInput from "@/components/ui/distanceTime";
import StartOptions from "@/components/ui/StartOptions";
import OptionSwitch from "@/components/ui/threePieceSwitch";

//services
import { generateMockRoute } from "@/SERVICES/mockRoute";
import { GeneratedRoute } from "@/types/route";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const MIN_SHEET_HEIGHT = SCREEN_HEIGHT * 0.03;
const MAX_SHEET_HEIGHT = SCREEN_HEIGHT * 0.8;
const SNAP_THRESHOLD = 50; // Distance to snap to next position

export default function RideTab() {
  //App use states
  const [activeTab, setActiveTab] = useState<
    "presets" | "preferences" | "advanced"
  >("presets");
  const [isLoop, setIsLoop] = useState(false);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [distance, setDistance] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<GeneratedRoute | null>(null);

  function handleGenerate() {
    setIsGenerating(true);

    setTimeout(() => {
      const newRoute = generateMockRoute();
      setCurrentRoute(newRoute);
      setIsGenerating(false);
    }, 800);
  }

  //bottom sheet use states
  const [sheetHeight, setSheetHeight] = useState(MIN_SHEET_HEIGHT);
  const animatedHeight = useRef(new Animated.Value(MIN_SHEET_HEIGHT)).current;
  const lastHeight = useRef(MIN_SHEET_HEIGHT);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to vertical drags
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        lastHeight.current = sheetHeight;
      },
      onPanResponderMove: (_, gestureState) => {
        // Calculate new height (subtract dy because dragging up should increase height)
        const newHeight = Math.max(
          MIN_SHEET_HEIGHT,
          Math.min(MAX_SHEET_HEIGHT, lastHeight.current - gestureState.dy)
        );
        animatedHeight.setValue(newHeight);
      },
      onPanResponderRelease: (_, gestureState) => {
        const newHeight = lastHeight.current - gestureState.dy;
        const velocity = -gestureState.vy; // Negative because up is positive velocity

        // Determine snap position based on gesture
        let targetHeight;

        if (velocity > 0.5) {
          // Fast upward swipe - expand
          targetHeight = MAX_SHEET_HEIGHT;
        } else if (velocity < -0.5) {
          // Fast downward swipe - collapse
          targetHeight = MIN_SHEET_HEIGHT;
        } else {
          // Slow drag - snap to nearest
          const midPoint = (MIN_SHEET_HEIGHT + MAX_SHEET_HEIGHT) / 2;
          targetHeight =
            newHeight > midPoint ? MAX_SHEET_HEIGHT : MIN_SHEET_HEIGHT;
        }

        // Animate to target height
        Animated.spring(animatedHeight, {
          toValue: targetHeight,
          velocity: velocity,
          tension: 50,
          friction: 8,
          useNativeDriver: false,
        }).start();

        setSheetHeight(targetHeight);
      },
    })
  ).current;

  const handleToggle = () => {
    const targetHeight =
      sheetHeight === MIN_SHEET_HEIGHT ? MAX_SHEET_HEIGHT : MIN_SHEET_HEIGHT;

    Animated.spring(animatedHeight, {
      toValue: targetHeight,
      tension: 50,
      friction: 8,
      useNativeDriver: false,
    }).start();

    setSheetHeight(targetHeight);
  };
  // ✅ MUST BE HERE
  const canGenerate =
    distance !== "" &&
    startLocation !== "" &&
    (isLoop || endLocation !== "") &&
    (selectedPreset !== null || selectedPreferences.length > 0);

  return (
    <View style={{ flex: 1, position: "relative" }}>
      {/* Map */}
      <Map route={currentRoute} isGenerating={isGenerating} />

      {/* Bottom Sheet */}
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: animatedHeight,
          backgroundColor: "white",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          elevation: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        }}
      >
        {/* Drag Handle */}
        <View {...panResponder.panHandlers}>
          <Pressable
            onPress={handleToggle}
            style={{
              alignItems: "center",
              paddingVertical: 12,
              paddingHorizontal: 16,
            }}
          >
            <View
              style={{
                width: 40,
                height: 4,
                borderRadius: 2,
                backgroundColor: "#D1D5DB",
              }}
            />
          </Pressable>
        </View>

        {/* Content */}
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          <StartOptions
            isLoop={isLoop}
            setIsLoop={setIsLoop}
            startLocation={startLocation}
            setStartLocation={setStartLocation}
            endLocation={endLocation}
            setEndLocation={setEndLocation}
          />
          <DistanceInput distance={distance} setDistance={setDistance} />
          <OptionSwitch
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedPreset={selectedPreset}
            setSelectedPreset={setSelectedPreset}
            selectedPreferences={selectedPreferences}
            setSelectedPreferences={setSelectedPreferences}
          />
          <GenerateButton disabled={!canGenerate} onPress={handleGenerate} />
        </View>
      </Animated.View>
    </View>
  );
}
