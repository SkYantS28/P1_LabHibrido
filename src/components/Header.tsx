import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/colors";

type HeaderProps = {
    onProfilePress?: () => void;
    onCartPress?: () => void;
    onFavoritesPress?: () => void;
};

export default function Header({
    onProfilePress,
    onCartPress,
    onFavoritesPress,
}: HeaderProps) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.logo}>VENETO</Text>
                <Text style={styles.subtitle}>
                    Restaurante e Pizzaria
                </Text>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity
                    onPress={onFavoritesPress}
                    disabled={!onFavoritesPress}
                >
                    <Text style={styles.favorite}>♡</Text>
                </TouchableOpacity>

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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    logo: {
        fontSize: 22,
        fontWeight: "900",
        color: COLORS.primary,
        letterSpacing: 1,
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

    favorite: {
        fontSize: 27,
        color: COLORS.primary,
    },

    cart: {
        fontSize: 23,
    },

    profile: {
        fontSize: 23,
    },
});
