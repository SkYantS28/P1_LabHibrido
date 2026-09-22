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

export default function Carrinho() {
    const router = useRouter();

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
                    Confira os itens antes de finalizar seu pedido.
                </Text>

                <View style={styles.item}>
                    <View style={styles.image}>
                        <Text style={styles.pizza}>
                            🍕
                        </Text>
                    </View>

                    <View style={styles.itemInfo}>
                        <Text style={styles.itemName}>
                            4 Queijos
                        </Text>

                        <Text style={styles.itemDetails}>
                            35 cm • Sem Borda
                        </Text>

                        <View style={styles.quantityRow}>
                            <TouchableOpacity style={styles.quantityButton}>
                                <Text style={styles.quantityButtonText}>
                                    −
                                </Text>
                            </TouchableOpacity>

                            <Text style={styles.quantity}>
                                1
                            </Text>

                            <TouchableOpacity style={styles.quantityButton}>
                                <Text style={styles.quantityButtonText}>
                                    +
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={styles.price}>
                        R$ 49,90
                    </Text>
                </View>

                <TouchableOpacity style={styles.continueButton} onPress={() => router.push("/")}>
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
                            R$ 49,90
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>
                            Taxa de entrega
                        </Text>

                        <Text style={styles.value}>
                            R$ 5,00
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <Text style={styles.totalLabel}>
                            Total
                        </Text>

                        <Text style={styles.total}>
                            R$ 54,90
                        </Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.checkoutText}>
                        Finalizar pedido
                    </Text>
                </TouchableOpacity>
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
        marginTop: 24,
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