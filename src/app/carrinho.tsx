import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useRouter } from "expo-router";

import Header from "../components/Header";
import { COLORS } from "../constants/colors";
import { useCart } from "../context/CartContext";

export default function Carrinho() {
    const router = useRouter();

    const {
        items,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        subtotal,
    } = useCart();

    const deliveryFee = items.length > 0 ? 5 : 0;
    const total = subtotal + deliveryFee;

    return (
        <View style={styles.container}>
            <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
            >
                <Header />

                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.back}>
                        ‹ Voltar
                    </Text>
                </TouchableOpacity>

                <Text style={styles.title}>
                    Seu carrinho
                </Text>

                <Text style={styles.subtitle}>
                    {items.length === 0
                    ? "Seu carrinho está vazio."
                    : `${items.length} item(ns) no carrinho`}
                </Text>

                {items.map((item) => (
                    <View style={styles.item} key={item.id}>
                        <View style={styles.image}>
                            <Text style={styles.pizza}>
                                🍕
                            </Text>
                        </View>

                        <View style={styles.itemInfo}>
                            <Text style={styles.itemName}>
                                {item.name}
                            </Text>

                            <Text style={styles.itemDetails}>
                                {item.size} • {item.border}
                            </Text>

                            {item.observation ? (
                                <Text style={styles.observation}>
                                    Obs.: {item.observation}
                                </Text>
                            ) : null}

                            <View style={styles.quantityRow}>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => decreaseQuantity(item.id)}
                                >
                                    <Text style={styles.quantityButtonText}>
                                        −
                                    </Text>
                                </TouchableOpacity>

                                <Text style={styles.quantity}>
                                    {item.quantity}
                                </Text>

                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => increaseQuantity(item.id)}
                                >
                                    <Text style={styles.quantityButtonText}>
                                        +
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => removeItem(item.id)}
                                >
                                    <Text style={styles.remove}>
                                        Remover
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={styles.price}>
                            R$ {(item.price * item.quantity)
                            .toFixed(2)
                            .replace(".", ",")}
                        </Text>
                    </View>
                ))}

                {items.length > 0 && (
                    <>
                        <TouchableOpacity
                            style={styles.continueButton}
                            onPress={() => router.push("/")}
                        >
                            <Text style={styles.continueText}>
                                Continuar comprando
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.summary}>
                            <Text style={styles.summaryTitle}>
                                Resumo do pedido
                            </Text>

                            <View style={styles.row}>
                                <Text style={styles.label}>
                                    Subtotal
                                </Text>

                                <Text style={styles.value}>
                                    R$ {subtotal.toFixed(2).replace(".", ",")}
                                </Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.label}>
                                    Taxa de entrega
                                </Text>
                                
                                <Text style={styles.value}>
                                    R$ {deliveryFee.toFixed(2).replace(".", ",")}
                                </Text>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.row}>
                                <Text style={styles.totalLabel}>
                                    Total
                                </Text>
                                
                                <Text style={styles.total}>
                                    R$ {total.toFixed(2).replace(".", ",")}
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.checkoutButton}
                            onPress={() => router.push("/pedido-confirmado")}
                        >
                            <Text style={styles.checkoutText}>
                                Finalizar pedido
                            </Text>
                        </TouchableOpacity>
                    </>
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
        marginTop: 22,
        fontSize: 28,
        fontWeight: "800",
    color: COLORS.text,
    },

    subtitle: {
        marginTop: 6,
        fontSize: 14,
        color: COLORS.textSecondary,
    },

    item: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 14,
        padding: 12,
        marginTop: 20,
    },

    image: {
        width: 75,
        height: 75,
        borderRadius: 12,
        backgroundColor: "#EFE6D9",
        alignItems: "center",
        justifyContent: "center",
    },

    pizza: {
        fontSize: 38,
    },

    itemInfo: {
        flex: 1,
        marginLeft: 12,
    },

    itemName: {
        fontSize: 16,
        fontWeight: "800",
        color: COLORS.text,
    },

    itemDetails: {
        marginTop: 4,
        fontSize: 12,
        color: COLORS.textSecondary,
    },

    observation: {
        marginTop: 3,
        fontSize: 11,
        color: COLORS.textSecondary,
    },

    quantityRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },

    quantityButton: {
        width: 28,
        height: 28,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: "center",
        justifyContent: "center",
    },

    quantityButtonText: {
        fontSize: 18,
        color: COLORS.primary,
    },

    quantity: {
        width: 30,
        textAlign: "center",
        fontWeight: "700",
        color: COLORS.text,
    },

    remove: {
        marginLeft: 10,
        fontSize: 11,
        fontWeight: "600",
        color: COLORS.primary,
    },

    price: {
        fontSize: 14,
        fontWeight: "800",
        color: COLORS.primary,
    },

    continueButton: {
        alignItems: "center",
        paddingVertical: 16,
    },

    continueText: {
        fontSize: 14,
        fontWeight: "700",
        color: COLORS.primary,
    },

    summary: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 14,
        padding: 18,
        marginTop: 10,
    },

    summaryTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: COLORS.text,
        marginBottom: 16,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },

    label: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },

    value: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.text,
    },

    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: 6,
    },

    totalLabel: {
        fontSize: 16,
        fontWeight: "800",
        color: COLORS.text,
    },

    total: {
        fontSize: 18,
        fontWeight: "800",
        color: COLORS.primary,
    },

    checkoutButton: {
        height: 54,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 18,
    },

    checkoutText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "800",
    },
});
