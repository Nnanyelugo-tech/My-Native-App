import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import { OpaqueColorValue, type StyleProp, type TextStyle, TouchableOpacity } from "react-native";

export type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "person.fill": "person",
  "gearshape.fill": "settings",
  xmark: "close",
  history: "history",
  "bar-chart.fill": "bar-chart",
  "plus.circle.fill": "add",
  "bell.fill": "notifications",
  "arrow.down": "arrow-downward",
  "arrow.up": "arrow-upward",
  "cart.fill": "shopping-cart",
  "cup.and.saucer.fill": "local-cafe",
  "briefcase.fill": "work",
  "dollarsign.circle.fill": "attach-money",
  "car.fill": "directions-car",
  "wifi": "wifi",
  "receipt.fill": "receipt",
  "wallet.pass.fill": "wallet",
  "wallet-outline": "wallet",
  "bag.fill": "shopping-bag",
  "doc.text.fill": "description",
  "gift.fill": "card-giftcard",
  "creditcard.fill": "credit-card",
  "arrow.left": "arrow-back",
  "hand-holding-medical": "local-hospital",
  "line.3.horizontal.decrease": "filter-list",
  magnifyingglass: "search",
  calendar: "event",
  "clock": "access-time",
  "paperclip": "attach-file",
  "chevron.down": "keyboard-arrow-down",
  "arrow.right": "arrow-forward",
  "fork.knife": "restaurant",
  "car": "directions-car",
  "doc.text": "description",
  "cart": "shopping-cart",
  "gamecontroller": "videogame-asset",
  "cross.case": "medical-services",
  "ellipsis": "more-horiz",
  "banknote": "payments",
  "laptopcomputer": "laptop",
  "gift": "card-giftcard",
  "folder": "folder",
} satisfies Record<string, keyof typeof MaterialIcons.glyphMap>;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  onPress,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
  onPress?: () => void;
}) {
  const icon = (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {icon}
      </TouchableOpacity>
    );
  }

  return icon;
}

