import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { AppText } from "@/components/global/AppText";

export const BalanceCard = () => {
  return (
    <View className="mx-5 mt-6 pb-6">
      <LinearGradient
        colors={["#1A237E", "#283593", "#0D1B5E"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: 24, padding: 24, overflow: "hidden" }}
      >
        <View
          style={{
            position: "absolute",
            top: 16,
            right: 17,
            bottom: -2,
            opacity: 0.1,
          }}
        >
          <IconSymbol name="wallet-outline" size={90} color="#FFFFFF" />
        </View>
        <AppText className="text-gray-300 text-sm">Total Balance</AppText>

        <AppText
          className="text-white mt-1 text-[30px]"
          style={{ fontWeight: "800" }}
        >
          ₦245,000.00
        </AppText>

        <View className="flex-row mt-6">
          <Box label="Income" val="₦300,000" up={false} />
          <View className="w-4" />
          <Box label="Expenses" val="₦55,000" up />
        </View>
      </LinearGradient>
    </View>
  );
};

const Box = ({ label, val, up }: any) => {
  const textColor = up ? "#FF1744" : "#00E676";
  return (
    <View
      className="flex-1 flex-row items-center px-4 py-3.5 rounded-2xl"
      style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
    >
      <View className="mr-2">
        <IconSymbol
          name={up ? "arrow.up" : "arrow.down"}
          size={16}
          color={textColor}
        />
      </View>

      <View>
        <AppText
          className="text-[12px] mb-0.5 font-lato-regular"
          style={{ color: textColor }}
        >
          {label}
        </AppText>
        <AppText
          className="text-white text-[15px]"
          style={{ fontWeight: "800" }}
        >
          {val}
        </AppText>
      </View>
    </View>
  );
};
