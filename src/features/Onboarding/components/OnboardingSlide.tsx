import { AppText } from "@/src/components/Global/AppText";
import { Slide } from "@/src/features/Onboarding/types/onboarding";
import { Image } from "expo-image";
import { View } from "react-native";

type Props = {
  item: Slide;
  index: number;
};

export default function OnboardingSlide({ item, index }: Props) {
  return (
    <View className="flex-1 items-center px-6 py-4">
      <View
        className={`w-full aspect-square rounded-[40px] overflow-hidden ${item.backgroundColor} mb-8`}
        style={{ flex: 1, maxHeight: 400 }}
      >
        <Image
          source={item.image}
          style={{ width: "100%", height: "100%" }}
          contentFit={index === 1 ? "contain" : "cover"}
        />
      </View>

      <View className="items-center w-full pb-6">
        <AppText className="text-3xl font-bold text-text-primary text-center mb-3 tracking-tight">
          {item.title}
        </AppText>
        <AppText className="text-lg text-text-secondary text-center px-4 leading-relaxed">
          {item.description}
        </AppText>
      </View>
    </View>
  );
}
