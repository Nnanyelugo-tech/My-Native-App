import { useGetBooks } from "@/base/hooks/api/useGetBooks";
import { IbookItem } from "@/base/interface/IBook";
import ScreenWrapper from "@/components/global/ScreenWrapper";
import { LegendList } from "@legendapp/list";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { BackHandler, Image, Text, View } from "react-native";

export default function IndexScreen() {
  const { data, isLoading, error } = useGetBooks();

  // block Android hardware back button
  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        () => true,
      );
      return () => subscription.remove();
    }, []),
  );

  const renderBook = useCallback((item: IbookItem) => {
    const info = item.volumeInfo;
    const thumbnail = info?.imageLinks?.thumbnail?.replace(
      "http://",
      "https://",
    );

    return (
      <View className="pb-4 border-b border-gray-200 dark:border-gray-800 flex-row">
        {thumbnail && (
          <Image
            source={{ uri: thumbnail }}
            style={{ width: 64, height: 96, borderRadius: 4 }}
          />
        )}

        <View className="ml-3 flex-1">
          <Text className="text-lg font-roboto font-bold text-black dark:text-blue-600">
            {info?.title}
          </Text>

          <Text className="text-lg font-lato font-bold text-black dark:text-red-600">
            {info?.publishedDate}
          </Text>
           
          {info?.authors && (
            <Text className="text-sm text-gray-500 font-roboto dark:text-gray-700">
              {info.authors.join(", ")}
            </Text>
          )}
        </View>
      </View>
    );
  }, []);

  return (
    <ScreenWrapper>
      <View className="flex-1 px-4 pt-2">
        <Text className="text-2xl font-bold text-black dark:text-black text-center">
        Books List 
        </Text>

        {!isLoading && !!data?.items?.length && (
          <LegendList
            data={data.items}
            renderItem={({ item }) => renderBook(item)}
            keyExtractor={(item) => item.id}
            estimatedItemSize={100}
            showsVerticalScrollIndicator={false}
            className="flex-1 w-full mt-3"
          />
        )}

        {isLoading && (
          <Text className="text-center text-gray-500 dark:text-black mt-4">
            Loading books...
          </Text>
        )}

        {error && (
          <Text className="text-center text-red-500 dark:text-red-800 mt-4">
            Error loading books
          </Text>
        )}

        {!isLoading && !data?.items?.length && (
          <Text className="text-center text-gray-500 dark:text-gray-700 mt-4">
            No books found
          </Text>
        )}
      </View>
    </ScreenWrapper>
  );
}
