import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { Pagination } from "react-native-reanimated-carousel";

type Props = {
  progress: any;
  data: any[];
  isLastSlide: boolean;
  onNext: () => void;
  onRegister: () => void;
  onLogin: () => void;
};

export default function OnboardingFooter({
  progress,
  data,
  isLastSlide,
  onNext,
  onRegister,
  onLogin,
}: Props) {
  return (
    <View className="pb-12 px-8 items-center w-full">
      <View className="mb-10">
        <Pagination.Basic
          progress={progress}
          data={data}
          dotStyle={{ backgroundColor: "#E2E8F0", borderRadius: 100 }}
          activeDotStyle={{ backgroundColor: "#1A237E", borderRadius: 100 }}
          containerStyle={{ gap: 10 }}
        />
      </View>

      {!isLastSlide ? (
        <TouchableOpacity
         activeOpacity={1}
          onPress={onNext}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          className="bg-[#1A237E] w-full py-5 rounded-[24px] flex-row justify-center"
        >
          <Text className="text-white text-xl font-bold mr-2">Next</Text>
          <MaterialCommunityIcons name="arrow-right" size={24} color="white" />
        </TouchableOpacity>
      ) : (
        <View className="w-full">
          <TouchableOpacity
            onPress={onRegister}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            className="bg-[#1A237E] w-full py-4 rounded-[24px] flex-row justify-center mb-4"
          >
            <Text className="text-white text-xl font-bold">Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onLogin}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            className="w-full py-4 rounded-[24px] border items-center"
          >
            <Text className="text-[#1A237E] text-xl font-bold">Log In</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
