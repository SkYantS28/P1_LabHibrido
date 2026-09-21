import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import Header from "../components/Header";
import { COLORS } from "../constants/colors";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header onProfilePress={() => router.push("/login")} />

      <View style={styles.content}>
        <Text style={styles.title}>Olá!</Text>
        <Text style={styles.description}>Escolha uma opção para começar</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.text,
  },
  description: {
    marginTop: 8,
    fontSize: 15,
    color: COLORS.textSecondary,
  },
});