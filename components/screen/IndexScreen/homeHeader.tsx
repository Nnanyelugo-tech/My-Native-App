import { View, TouchableOpacity } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { AppText } from "@/components/global/AppText";
import { greet } from "@/utils/greet";


export const HomeHeader = () => {


  return (
    
      <View className="px-5 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="w-11 h-11 rounded-full bg-brand-bg-medium items-center justify-center mr-3">
            <IconSymbol name="person.fill" size={24} color="#3F51B5" />
          </View>

          <View>
            <AppText className="text-gray-500 text-xs font-roboto">
              Welcome back,
            </AppText>
            <AppText className="text-text-primary text-lg" style={{ fontWeight: '800' }}>
              {greet()}, Nego
            </AppText>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.9}
        className="w-11 h-11 rounded-full bg-brand-bg-light items-center justify-center"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2,
        }}
        >
          <IconSymbol name="bell.fill" size={20} color="#1A237E" />
          <View className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </TouchableOpacity>
      </View>
  );
};