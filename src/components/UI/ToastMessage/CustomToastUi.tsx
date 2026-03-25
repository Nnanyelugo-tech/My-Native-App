import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface CustomToastUiProps {
  type: "success" | "error" | "info";
  text1: string;
  text2: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

export const CustomToastUi = ({
  type,
  text1,
  text2,
  icon,
  onClose,
}: CustomToastUiProps) => {
  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-100";
      case "error":
        return "bg-red-100";
      case "info":
        return "bg-blue-200";
      default:
        return "bg-yellow-100";
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case "success":
        return "border-green-500";
      case "error":
        return "border-red-500";
      case "info":
        return "border-blue-500";
      default:
        return "border-yellow-500";
    }
  };

  return (
    <View
      style={{
        marginHorizontal: 20,
        borderRadius: 24,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 0.25,
        boxShadow: "0 4px 6px 0 rgba(0, 0, 0, 0.14)",
      }}
      className={`${getBackgroundColor()} ${getBorderColor()} border`}
    >
      <View className="flex-1 ml-3 justify-center relative">
        {icon && (
          <TouchableOpacity
            className="absolute right-0 top-0 p-1 z-20"
            onPress={() => onClose?.()}
          >
            {icon}
          </TouchableOpacity>
        )}
        <View className="flex-row space-x-2 items-start">
          <Text
            className={"text-[14px] font-bold font-lato text-black text-center flex-1"}
          >
            {text1}
          </Text>
        </View>
        <Text className="text-black font-[14px] font-roboto leading-5.25 text-center">
          {text2}
        </Text>
      </View>
    </View>
  );
};
