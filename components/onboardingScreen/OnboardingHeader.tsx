import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  isLastSlide: boolean;
  onSkip: () => void;
  onBack: () => void;
};

export default function OnboardingHeader({
  isLastSlide,
  onSkip,
  onBack,
}: Props) {
  if (!isLastSlide) {
    return (
      <View className="flex-row justify-end px-6 pt-4">
        <TouchableOpacity
          onPress={onSkip}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text className="text-[#1A237E] font-bold text-lg">Skip</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-row items-center justify-between px-6 pt-2 pb-2">
      <TouchableOpacity
        onPress={onBack}
        hitSlop={{ top: 10, bottom: 1, left: 10, right: 10 }}
      >
        <MaterialCommunityIcons name="arrow-left" size={28} color="#0D143C" />
      </TouchableOpacity>

      <Text className="text-xl font-bold text-[#0D143C]">Fintrack</Text>

      <View style={{ width: 28 }} />
    </View>
  );
}
