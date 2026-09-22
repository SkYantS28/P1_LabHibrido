import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useRouter } from "expo-router";

import { COLORS } from "../constants/colors";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";

export default function PedidoConfirmado() {
    const router = useRouter();
    const { items, subtotal, clearCart } = useCart();
    const { addOrder } = useOrders();

    const orderNumber = Date.now().toString().slice(-6);

    const handleFinish = () => {
        addOrder({
            items: items.map((item) => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            })),
            total: subtotal,
        });

        clearCart();
        router.replace("/");
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.icon}>
                    ✓
                </Text>

                <Text style={styles.title}>
                    Pedido realizado!
                </Text>

                <Text style={styles.description}>
                    Seu pedido foi recebido pela Veneto e já está sendo
                    preparado.
                </Text>

                <Text style={styles.number}>
                    Pedido #{orderNumber}
                </Text>

                <Text style={styles.time}>
                    Tempo estimado: 80–90 min
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleFinish}
                >
                    <Text style={styles.buttonText}>
                        Voltar para o início
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },

    card: {
        width: "100%",
        backgroundColor: COLORS.white,
        borderRadius: 18,
        padding: 28,
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    icon: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#E8F1E9",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 40,
        fontWeight: "800",
        color: "#4A7C59",
    },

    title: {
        marginTop: 22,
        fontSize: 25,
        fontWeight: "800",
        color: COLORS.text,
        textAlign: "center",
    },

    description: {
        marginTop: 10,
        fontSize: 14,
        lineHeight: 21,
        color: COLORS.textSecondary,
        textAlign: "center",
    },

    number: {
        marginTop: 20,
        fontSize: 17,
        fontWeight: "800",
        color: COLORS.primary,
    },

    time: {
        marginTop: 6,
        fontSize: 13,
        color: COLORS.textSecondary,
    },

    button: {
        width: "100%",
        height: 52,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 24,
    },

    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "800",
    },
});
