import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/colors";
import { useFavorites } from "../context/FavoritesContext";

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
    const { isFavorite, toggleFavorite } = useFavorites();

    const icons: Record<string, string> = {
        PIZZAS: "🍕",
        ESFIHAS: "🥟",
        PANQUECAS: "🥞",
        MASSAS: "🍝",
        CALDOS: "🍲",
        BEBIDAS: "🥤",
    };

    const icon = icons[category] || "🍴";
    const productId = `${name}-${category}`;
    const favorite = isFavorite(productId);

    return (
        <View style={styles.card}>
            <TouchableOpacity
                style={styles.productArea}
                onPress={onPress}
                activeOpacity={0.8}
            >
                <View style={styles.image}>
                    <Text style={styles.pizza}>
                        {icon}
                    </Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.name}>
                        {name}
                    </Text>

                    <Text
                        style={styles.description}
                        numberOfLines={2}
                    >
                        {description}
                    </Text>

                    <Text style={styles.price}>
                        {price}
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() =>
                    toggleFavorite({
                        id: productId,
                        name,
                        description,
                        price,
                        category,
                    })
                }
                activeOpacity={0.7}
            >
                <Text
                    style={[
                        styles.favoriteIcon,
                        !favorite && styles.favoriteIconEmpty,
                    ]}
                >
                    {favorite ? "♥" : "♡"}
                </Text>
            </TouchableOpacity>
        </View>
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
        position: "relative",
    },

    productArea: {
        flex: 1,
        flexDirection: "row",
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
        paddingRight: 35,
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

    favoriteButton: {
        position: "absolute",
        top: 10,
        right: 10,
        width: 30,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },

    favoriteIcon: {
        fontSize: 19,
        color: COLORS.primary,
    },

    favoriteIconEmpty: {
        fontSize: 28,
    },
});
