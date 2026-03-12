import { Image } from "expo-image";
import { Text, View } from "react-native";

type Props = {
  item: any;
  index: number;
};

export default function OnboardingSlide({ item, index }: Props) {
  return (
    <View className="flex-1 items-center justify-center px-4">
      <View
        className={`w-full ${item.imageSize} rounded-[40px] overflow-hidden mb-4 
        ${item.backgroundColor}`}
      >
        <Image
          source={item.image}
          style={{ width: "100%", height: "100%" }}
          contentFit={index === 1 ? "contain" : "cover"}
        />
      </View>

      <View className="items-center">
        <Text className="text-2xl font-lato text-[#0D143C] text-center mb-3 tracking-tight">
          {item.title}
        </Text>

        <Text className="text-lg text-[#64748B] font-lato text-center px-4 leading-relaxed">
          {item.description}
        </Text>
      </View>
    </View>
  );
}
