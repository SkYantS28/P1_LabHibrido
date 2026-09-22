import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useRouter } from "expo-router";

import Header from "../components/Header";
import { COLORS } from "../constants/colors";
import { useAddress } from "../context/AddressContext";

const addresses = [
    {
        id: "1",
        title: "Casa",
        address: "Rua Exemplo, 123",
        neighborhood: "Centro",
    },
    {
        id: "2",
        title: "Trabalho",
        address: "Av. Principal, 456",
        neighborhood: "Centro",
    },
];

export default function Endereco() {
    const router = useRouter();
    const { selectAddress } = useAddress();

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Header />

                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.back}>
                        ‹ Voltar
                    </Text>
                </TouchableOpacity>

                <Text style={styles.title}>
                    Escolha um endereço
                </Text>

                <Text style={styles.subtitle}>
                    Onde você deseja receber seu pedido?
                </Text>

                <View style={styles.addresses}>
                    {addresses.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.addressCard}
                            onPress={async () => {
                                await selectAddress(item);
                                router.back();
                            }}
                        >
                            <Text style={styles.icon}>
                                📍
                            </Text>

                            <View style={styles.addressInfo}>
                                <Text style={styles.addressTitle}>
                                    {item.title}
                                </Text>

                                <Text style={styles.addressText}>
                                    {item.address}
                                </Text>

                                <Text style={styles.neighborhood}>
                                    {item.neighborhood}
                                </Text>
                            </View>

                            <Text style={styles.arrow}>
                                ›
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.newAddress}>
                    <Text style={styles.newAddressText}>
                        + Adicionar novo endereço
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
    },

    content: {
        padding: 24,
    },

    back: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.primary,
    },

    title: {
        marginTop: 28,
        fontSize: 26,
        fontWeight: "800",
        color: COLORS.text,
    },

    subtitle: {
        marginTop: 8,
        fontSize: 14,
        color: COLORS.textSecondary,
    },

    addresses: {
        marginTop: 24,
        gap: 12,
    },

    addressCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 14,
        padding: 16,
    },

    icon: {
        fontSize: 24,
        marginRight: 14,
    },

    addressInfo: {
        flex: 1,
    },

    addressTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: COLORS.text,
    },

    addressText: {
        marginTop: 4,
        fontSize: 14,
        color: COLORS.text,
    },

    neighborhood: {
        marginTop: 2,
        fontSize: 12,
        color: COLORS.textSecondary,
    },

    arrow: {
        fontSize: 26,
        color: COLORS.textSecondary,
    },

    newAddress: {
        marginTop: 20,
        height: 52,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    newAddressText: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.primary,
    },
});
