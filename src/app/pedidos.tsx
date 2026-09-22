import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useRouter } from "expo-router";

import { COLORS } from "../constants/colors";
import { useOrders } from "../context/OrdersContext";

export default function Pedidos() {
    const router = useRouter();
    const { orders } = useOrders();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.back}>‹</Text>
                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    Pedidos feitos
                </Text>

                <View style={styles.headerSpace} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {orders.length === 0 ? (
                    <View style={styles.empty}>
                        <Text style={styles.emptyIcon}>🛍️</Text>

                        <Text style={styles.emptyTitle}>
                            Nenhum pedido ainda
                        </Text>

                        <Text style={styles.emptyDescription}>
                            Quando você fizer um pedido, ele aparecerá
                            aqui.
                        </Text>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => router.replace("/")}
                        >
                            <Text style={styles.buttonText}>
                                Ver cardápio
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    orders.map((order) => (
                        <View
                            key={order.id}
                            style={styles.orderCard}
                        >
                            <View style={styles.orderHeader}>
                                <View>
                                    <Text style={styles.orderNumber}>
                                        Pedido #{order.id.slice(-6)}
                                    </Text>

                                    <Text style={styles.orderDate}>
                                        {order.date}
                                    </Text>
                                </View>

                                <Text style={styles.status}>
                                    REALIZADO
                                </Text>
                            </View>

                            <View style={styles.divider} />

                            {order.items.map((item, index) => (
                                <View
                                    key={`${order.id}-${index}`}
                                    style={styles.itemRow}
                                >
                                    <Text style={styles.itemQuantity}>
                                        {item.quantity}x
                                    </Text>

                                    <Text style={styles.itemName}>
                                        {item.name}
                                    </Text>

                                    <Text style={styles.itemPrice}>
                                        R$ {(item.price * item.quantity)
                                            .toFixed(2)
                                            .replace(".", ",")}
                                    </Text>
                                </View>
                            ))}

                            <View style={styles.divider} />

                            <View style={styles.totalRow}>
                                <Text style={styles.totalLabel}>
                                    Total
                                </Text>

                                <Text style={styles.totalValue}>
                                    R$ {order.total
                                        .toFixed(2)
                                        .replace(".", ",")}
                                </Text>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 24,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20,
    },

    back: {
        fontSize: 36,
        color: COLORS.text,
        lineHeight: 36,
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: COLORS.text,
    },

    headerSpace: {
        width: 36,
    },

    content: {
        paddingTop: 30,
        paddingBottom: 40,
    },

    orderCard: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 14,
        padding: 18,
        marginBottom: 14,
    },

    orderHeader: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },

    orderNumber: {
        fontSize: 17,
        fontWeight: "800",
        color: COLORS.text,
    },

    orderDate: {
        marginTop: 4,
        fontSize: 12,
        color: COLORS.textSecondary,
    },

    status: {
        fontSize: 10,
        fontWeight: "800",
        color: "#4A7C59",
    },

    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: 14,
    },

    itemRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },

    itemQuantity: {
        width: 32,
        fontSize: 13,
        fontWeight: "700",
        color: COLORS.primary,
    },

    itemName: {
        flex: 1,
        fontSize: 14,
        color: COLORS.text,
    },

    itemPrice: {
        fontSize: 13,
        fontWeight: "600",
        color: COLORS.text,
    },

    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    totalLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.textSecondary,
    },

    totalValue: {
        fontSize: 17,
        fontWeight: "800",
        color: COLORS.primary,
    },

    empty: {
        alignItems: "center",
        paddingTop: 100,
    },

    emptyIcon: {
        fontSize: 50,
    },

    emptyTitle: {
        marginTop: 20,
        fontSize: 21,
        fontWeight: "800",
        color: COLORS.text,
        textAlign: "center",
    },

    emptyDescription: {
        marginTop: 8,
        fontSize: 14,
        lineHeight: 21,
        color: COLORS.textSecondary,
        textAlign: "center",
        maxWidth: 280,
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
