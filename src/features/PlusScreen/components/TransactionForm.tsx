import { View } from "react-native";
import { AppText } from "@/src/components/Global/AppText";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { CategoryPicker } from "@/src/features/PlusScreen/components/CategoryPicker";
import { FormInput } from "@/src/components/Forms/FormInput";
import { FieldValues, Path, Controller } from "react-hook-form";
import { TransactionFormProps } from "@/src/features/PlusScreen/types/transactionForm";



export function TransactionForm<T extends FieldValues>({
  activeColor,
  categories,
  control,
  errors,
  date,
  time,
}: TransactionFormProps<T>) {
  return (
    <>
      {/* Title */}
      <FormInput
        control={control}
        name={"title" as Path<T>}
        label="Title"
        placeholder="e.g. Offering"
        error={errors.title?.message as string}
      />

      {/* Category */}
      <Controller
        control={control}
        name={"category" as Path<T>}
        render={({ field: { onChange, value } }: { field: { onChange: (id: string) => void; value: string } }) => (
          <CategoryPicker
            categories={categories}
            selectedId={value}
            activeColor={activeColor}
            onSelect={onChange}
          />
        )}
      />

      {/* Description */}
      <FormInput
        control={control}
        name={"description" as Path<T>}
        label="Description"
        placeholder="What was this for?"
        error={errors.description?.message as string}
      />

      {/* Date & Time */}
      <View className="flex-row justify-between mb-6">
        <View className="flex-1 mr-4">
          <AppText className="text-[11px] font-bold text-gray-700 tracking-widest mb-1 uppercase">
            Date
          </AppText>
          <View className="flex-row items-center border-b border-gray-100 py-3">
            <IconSymbol name="calendar" size={18} color="#6B7280" />
            <AppText className="text-[11px] text-gray-800 ml-2 font-medium">
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
            <AppText className="text-[11px] text-gray-800 ml-2 font-medium">
              {time}
            </AppText>
          </View>
        </View>
      </View>

      {/* Notes */}
      <FormInput
        control={control}
        name={"notes" as Path<T>}
        label="Notes (Optional)"
        placeholder="Add additional details..."
        multiline
        error={errors.notes?.message as string}
        className="bg-gray-50 rounded-2xl px-4 py-4 text-[15px] text-gray-800 min-h-[100px]"
        style={{ textAlignVertical: "top" }}
      />
    </>
  );
}
