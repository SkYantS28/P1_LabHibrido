import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useRouter } from "expo-router";

import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { COLORS } from "../constants/colors";
import { useFavorites } from "../context/FavoritesContext";

export default function Favoritos() {
    const router = useRouter();
    const { favorites } = useFavorites();

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <Header
                    onFavoritesPress={() =>
                        router.push("/favoritos")
                    }
                    onCartPress={() =>
                        router.push("/carrinho")
                    }
                    onProfilePress={() =>
                        router.push("/perfil")
                    }
                />

                <TouchableOpacity
                    onPress={() => router.back()}
                >
                    <Text style={styles.back}>
                        ‹ Voltar
                    </Text>
                </TouchableOpacity>

                <Text style={styles.title}>
                    Meus favoritos
                </Text>

                <Text style={styles.subtitle}>
                    Seus produtos favoritos
                </Text>

                {favorites.length === 0 ? (
                    <View style={styles.empty}>
                        <Text style={styles.emptyIcon}>
                            ♡
                        </Text>

                        <Text style={styles.emptyTitle}>
                            Nenhum favorito ainda
                        </Text>

                        <Text style={styles.emptyText}>
                            Toque no coração de um produto
                            para adicioná-lo aos favoritos.
                        </Text>

                        <TouchableOpacity
                            style={styles.menuButton}
                            onPress={() =>
                                router.replace("/")
                            }
                        >
                            <Text style={styles.menuButtonText}>
                                Ver cardápio
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.products}>
                        {favorites.map((product) => (
                            <ProductCard
                                key={product.id}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                category={product.category}
                                onPress={() =>
                                    router.push({
                                        pathname: "/produto",
                                        params: {
                                            name: product.name,
                                            description:
                                                product.description,
                                            price: product.price,
                                            category:
                                                product.category,
                                        },
                                    })
                                }
                            />
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    content: {
        padding: 24,
        paddingBottom: 40,
    },

    back: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.primary,
    },

    title: {
        marginTop: 28,
        fontSize: 28,
        fontWeight: "800",
        color: COLORS.text,
    },

    subtitle: {
        marginTop: 6,
        fontSize: 14,
        color: COLORS.textSecondary,
    },

    products: {
        marginTop: 24,
        gap: 12,
    },

    empty: {
        alignItems: "center",
        marginTop: 80,
        paddingHorizontal: 20,
    },

    emptyIcon: {
        fontSize: 58,
        color: COLORS.primary,
    },

    emptyTitle: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: "800",
        color: COLORS.text,
        textAlign: "center",
    },

    emptyText: {
        marginTop: 8,
        fontSize: 14,
        lineHeight: 20,
        color: COLORS.textSecondary,
        textAlign: "center",
    },

    menuButton: {
        marginTop: 24,
        height: 50,
        paddingHorizontal: 28,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    menuButtonText: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: "800",
    },
});
