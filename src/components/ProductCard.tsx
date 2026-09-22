import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/colors";

type ProductCardProps = {
    name: string;
    description: string;
    price: string;
    category: string;
    onPress: () => void;
};

export default function ProductCard({
    name,
    description,
    price,
    category,
    onPress,
}: ProductCardProps) {
    const icons: Record<string, string> = {
        PIZZAS: "🍕",
        ESFIHAS: "🥟",
        PANQUECAS: "🥞",
        MASSAS: "🍝",
        CALDOS: "🍲",
        BEBIDAS: "🥤",
    };

    const icon = icons[category] || "🍴";

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.image}>
                <Text style={styles.pizza}>
                    {icon}
                </Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.name}>
                    {name}
                </Text>

                <Text style={styles.description} numberOfLines={2}>
                    {description}
                </Text>

                <Text style={styles.price}>
                    {price}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: COLORS.white,
        borderRadius: 14,
        padding: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    image: {
        width: 95,
        height: 95,
        borderRadius: 12,
        backgroundColor: "#EFE6D9",
        alignItems: "center",
        justifyContent: "center",
    },

    pizza: {
        fontSize: 45,
    },

    info: {
        flex: 1,
        marginLeft: 14,
        justifyContent: "center",
    },

    name: {
        fontSize: 17,
        fontWeight: "800",
        color: COLORS.text,
    },

    description: {
        marginTop: 5,
        fontSize: 12,
        lineHeight: 17,
        color: COLORS.textSecondary,
    },

    price: {
        marginTop: 8,
        fontSize: 15,
        fontWeight: "800",
        color: COLORS.primary,
    },
});
