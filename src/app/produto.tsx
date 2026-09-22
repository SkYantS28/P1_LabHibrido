import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useRouter } from "expo-router";

import Header from "../components/Header";
import { COLORS } from "../constants/colors";

const sizes = [
    {
        name: "35 cm",
        price: 49.9,
    },
    {
        name: "45 cm",
        price: 59.9,
    },
];

const borders = [
    {
        name: "Sem Borda",
        price: 0,
    },
    {
        name: "Catupiry",
        price: 7,
    },
    {
        name: "Cheddar",
        price: 7,
    },
    {
        name: "Creme Cheese",
        price: 8,
    },
];

export default function Produto() {
    const router = useRouter();

    const [selectedSize, setSelectedSize] = useState("35 cm");
    const [selectedBorder, setSelectedBorder] = useState("Sem Borda");
    const [observation, setObservation] = useState("");
    const [quantity, setQuantity] = useState(1);

    const sizePrice =
        sizes.find((size) => size.name === selectedSize)?.price ?? 0;

    const borderPrice =
        borders.find((border) => border.name === selectedBorder)?.price ?? 0;

    const total = (sizePrice + borderPrice) * quantity;

    const handleAddToCart = () => {
        router.push("/carrinho");
    };

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

                <View style={styles.imageContainer}>
                    <Text style={styles.pizza}>
                        🍕
                    </Text>
                </View>

                <Text style={styles.title}>
                    4 Queijos
                </Text>

                <Text style={styles.description}>
                    Mussarela, provolone, parmesão e catupiry.
                </Text>

                <View style={styles.divider} />

                <Text style={styles.sectionTitle}>
                    Escolha sua preferência
                </Text>

                <Text style={styles.required}>
                    Tamanho *
                </Text>

                <View style={styles.options}>
                    {sizes.map((size) => {
                        const selected = selectedSize === size.name;

                        return (
                            <TouchableOpacity
                                key={size.name}
                                style={[
                                styles.option,
                                selected && styles.optionSelected,
                                ]}
                                onPress={() => setSelectedSize(size.name)}
                            >
                                <View
                                    style={[
                                        styles.radio,
                                        selected && styles.radioSelected,
                                    ]}
                                />

                                <Text style={styles.optionName}>
                                    {size.name}
                                </Text>

                                <Text style={styles.optionPrice}>
                                    R$ {size.price.toFixed(2).replace(".", ",")}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <Text style={styles.required}>
                    Borda
                </Text>

                <View style={styles.options}>
                    {borders.map((border) => {
                        const selected = selectedBorder === border.name;

                        return (
                            <TouchableOpacity
                                key={border.name}
                                style={[
                                styles.option,
                                selected && styles.optionSelected,
                                ]}
                                onPress={() => setSelectedBorder(border.name)}
                            >
                                <View
                                    style={[
                                        styles.radio,
                                        selected && styles.radioSelected,
                                    ]}
                                />

                                <Text style={styles.optionName}>
                                    {border.name}
                                </Text>

                                <Text style={styles.optionPrice}>
                                    {border.price === 0
                                        ? "Grátis"
                                        : `+ R$ ${border.price
                                            .toFixed(2)
                                            .replace(".", ",")}`}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={styles.observationHeader}>
                    <Text style={styles.required}>
                        Observação
                    </Text>

                    <Text style={styles.counter}>
                        {observation.length}/140
                    </Text>
                </View>

                <TextInput
                    style={styles.observation}
                    placeholder="Alguma observação para o seu pedido?"
                    placeholderTextColor={COLORS.textSecondary}
                    multiline
                    maxLength={140}
                    value={observation}
                    onChangeText={setObservation}
                />

                <Text style={styles.required}>
                    Quantidade
                </Text>

                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() =>
                        setQuantity((current) => Math.max(1, current - 1))
                        }
                    >
                        <Text style={styles.quantityButtonText}>
                            −
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.quantity}>
                        {quantity}
                    </Text>

                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => setQuantity((current) => current + 1)}
                    >
                        <Text style={styles.quantityButtonText}>
                            +
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.cartButton}
                    onPress={handleAddToCart}
                >
                    <Text style={styles.cartButtonText}>
                        Adicionar • R$ {total.toFixed(2).replace(".", ",")}
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

    imageContainer: {
        height: 220,
        marginTop: 18,
        borderRadius: 18,
        backgroundColor: "#EFE6D9",
        alignItems: "center",
        justifyContent: "center",
    },

    pizza: {
        fontSize: 100,
    },

    title: {
        marginTop: 20,
        fontSize: 28,
        fontWeight: "800",
        color: COLORS.text,
    },

    description: {
        marginTop: 8,
        fontSize: 15,
        lineHeight: 22,
        color: COLORS.textSecondary,
    },

    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: 24,
    },

    sectionTitle: {
        fontSize: 21,
        fontWeight: "800",
        color: COLORS.text,
        marginBottom: 22,
    },

    required: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.text,
        marginBottom: 10,
    },

    options: {
        gap: 10,
        marginBottom: 22,
    },

    option: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        padding: 15,
    },

    optionSelected: {
        borderColor: COLORS.primary,
        borderWidth: 2,
    },

    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.border,
        marginRight: 12,
    },

    radioSelected: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primary,
    },

    optionName: {
        flex: 1,
        fontSize: 15,
        fontWeight: "600",
        color: COLORS.text,
    },

    optionPrice: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.textSecondary,
    },

    observationHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    counter: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },

    observation: {
        minHeight: 100,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        padding: 14,
        fontSize: 14,
        color: COLORS.text,
        textAlignVertical: "top",
        marginBottom: 22,
    },

    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 10,
        marginBottom: 24,
    },

    quantityButton: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
    },

    quantityButtonText: {
        fontSize: 24,
        color: COLORS.primary,
    },

    quantity: {
        width: 40,
        textAlign: "center",
        fontSize: 17,
        fontWeight: "700",
        color: COLORS.text,
    },

    cartButton: {
        height: 54,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    cartButtonText: {
        color: COLORS.white,
        fontSize: 17,
        fontWeight: "800",
    },
});
