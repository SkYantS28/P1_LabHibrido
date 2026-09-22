import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import Header from "../components/Header";
import { COLORS } from "../constants/colors";

export default function Produto() {
    const router = useRouter();

    return (
        <View style={styles.container}>
        <Header />

        <View style={styles.content}>
            <Text style={styles.title}>
                Detalhes do produto
            </Text>

            <Text style={styles.text}>
            Tela da pizza
            </Text>

            <Text style={styles.back} onPress={() => router.back()}>
            Voltar
            </Text>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 24,
    },

    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        fontSize: 26,
        fontWeight: "700",
        color: COLORS.text,
    },

    text: {
        marginTop: 10,
        fontSize: 16,
        color: COLORS.textSecondary,
    },

    back: {
        marginTop: 30,
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.primary,
    },
});