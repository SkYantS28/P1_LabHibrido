import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/colors";

export default function Header() {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.logo}>
                    VENETO
                </Text>

                <Text style={styles.subtitle}>
                    Restaurante e Pizzaria
                </Text>
            </View>

            <Text style={styles.profile}>👤</Text>
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
