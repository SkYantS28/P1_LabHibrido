import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/colors";

type HeaderProps = {
  onProfilePress?: () => void;
};

export default function Header({ onProfilePress }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.logo}>VENETO</Text>
        <Text style={styles.subtitle}>Restaurante e Pizzaria</Text>
      </View>

      <TouchableOpacity onPress={onProfilePress} disabled={!onProfilePress}>
        <Text style={styles.profile}>👤</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: 3,
    color: COLORS.primary,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  profile: {
    fontSize: 24,
  },
});