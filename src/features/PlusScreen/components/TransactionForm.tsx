import { View, TextInput } from "react-native";
import { AppText } from "@/src/components/Global/AppText";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { CategoryPicker } from "@/src/features/PlusScreen/components/CategoryPicker";
import type { TransactionFormProps } from "@/src/features/PlusScreen/types/transactionTypes";

export function TransactionForm({
  activeColor,
  categories,
  title,
  onTitleChange,
  selectedCategory,
  onCategorySelect,
  description,
  onDescriptionChange,
  date,
  time,
  notes,
  onNotesChange,
}: TransactionFormProps) {
  return (
    <>
      {/* Title */}
      <View className="mb-6">
        <AppText className="text-[11px] font-bold text-gray-700 tracking-widest mb-3 uppercase">
          Title
        </AppText>
        <TextInput
          value={title}
          onChangeText={onTitleChange}
          placeholder="e.g. Offering"
          placeholderTextColor="#9CA3AF"
          className="border border-gray-200 rounded-2xl px-4 py-3 text-[15px] text-gray-800"
        />
      </View>

      {/* Category */}
      <CategoryPicker
        categories={categories}
        selectedId={selectedCategory}
        activeColor={activeColor}
        onSelect={onCategorySelect}
      />

      {/* Description */}
      <View className="mb-6">
        <AppText className="text-[11px] font-bold text-gray-700 tracking-widest mb-1 uppercase">
          Description
        </AppText>
        <TextInput
          value={description}
          onChangeText={onDescriptionChange}
          placeholder="What was this for?"
          placeholderTextColor="#9CA3AF"
          className="border-b border-gray-100 py-3 text-[15px] text-gray-800"
        />
      </View>

      {/* Date & Time */}
      <View className="flex-row justify-between mb-6">
        <View className="flex-1 mr-4">
          <AppText className="text-[11px] font-bold text-gray-700 tracking-widest mb-1 uppercase">
            Date
          </AppText>
          <View className="flex-row items-center border-b border-gray-100 py-3">
            <IconSymbol name="calendar" size={18} color="#6B7280" />
            <AppText className="text-[15px] text-gray-800 ml-2 font-medium">
              {date}
            </AppText>
          </View>
        </View>
        <View className="flex-1 ml-2">
          <AppText className="text-[11px] font-bold text-gray-700 tracking-widest mb-1 uppercase">
            Time
          </AppText>
          <View className="flex-row items-center border-b border-gray-100 py-3">
            <IconSymbol name="clock" size={18} color="#6B7280" />
            <AppText className="text-[15px] text-gray-800 ml-2 font-medium">
              {time}
            </AppText>
          </View>
        </View>
      </View>

      {/* Notes */}
      <View className="mb-6">
        <AppText className="text-[11px] font-bold text-gray-700 tracking-widest mb-3 uppercase">
          Notes (Optional)
        </AppText>
        <TextInput
          value={notes}
          onChangeText={onNotesChange}
          placeholder="Add additional details..."
          placeholderTextColor="#9CA3AF"
          multiline
          className="bg-gray-50 rounded-2xl px-4 py-4 text-[15px] text-gray-800 min-h-[100px]"
          style={{ textAlignVertical: "top" }}
        />
      </View>
    </>
  );
}
