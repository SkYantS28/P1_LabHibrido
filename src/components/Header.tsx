import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/colors";

type HeaderProps = {
  onProfilePress?: () => void;
  onCartPress?: () => void;
};

export default function Header({
  onProfilePress,
  onCartPress,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.logo}>VENETO</Text>
        <Text style={styles.subtitle}>Restaurante e Pizzaria</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={onCartPress}
          disabled={!onCartPress}
        >
          <Text style={styles.cart}>🛒</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onProfilePress}
          disabled={!onProfilePress}
        >
          <Text style={styles.profile}>👤</Text>
        </TouchableOpacity>
      </View>
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

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  cart: {
    fontSize: 23,
  },

  profile: {
    fontSize: 24,
  },
});
