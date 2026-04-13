import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

import { AppText } from "@/src/components/Global/AppText";

export default function ModalScreen() {
  return (
    <View style={styles.container} className="bg-bgColor">
      <AppText className="text-2xl font-bold text-text-primary">This is a modal</AppText>
      <Link href="/" dismissTo style={styles.link}>
        <AppText className="text-brand-main text-lg font-bold">Go to home screen</AppText>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
