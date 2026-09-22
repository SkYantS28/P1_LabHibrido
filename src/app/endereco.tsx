import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
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
import { useAddress } from "../context/AddressContext";

export default function Endereco() {
    const router = useRouter();

    const {
        addresses,
        selectAddress,
        addAddress,
    } = useAddress();

    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [neighborhood, setNeighborhood] = useState("");

    const handleAddAddress = async () => {
        if (
            !title.trim() ||
            !address.trim() ||
            !neighborhood.trim()
        ) {
            Alert.alert(
                "Erro",
                "Preencha todos os campos."
            );
            return;
        }

        const success = await addAddress(
            title,
            address,
            neighborhood
        );

        if (!success) {
            Alert.alert(
                "Erro",
                "Não foi possível adicionar o endereço."
            );
            return;
        }

        setTitle("");
        setAddress("");
        setNeighborhood("");
        setShowForm(false);

        Alert.alert(
            "Sucesso",
            "Endereço adicionado com sucesso."
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
            >
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

                {!showForm && (
                    <TouchableOpacity
                        style={styles.newAddress}
                        onPress={() => setShowForm(true)}
                    >
                        <Text style={styles.newAddressText}>
                            + Adicionar novo endereço
                        </Text>
                    </TouchableOpacity>
                )}

                {showForm && (
                    <View style={styles.form}>
                        <Text style={styles.formTitle}>
                            Novo endereço
                        </Text>

                        <Text style={styles.label}>
                            Nome do endereço
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Ex.: Casa"
                            placeholderTextColor={
                                COLORS.textSecondary
                            }
                            value={title}
                            onChangeText={setTitle}
                        />

                        <Text style={styles.label}>
                            Endereço
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Ex.: Rua das Flores, 123"
                            placeholderTextColor={
                                COLORS.textSecondary
                            }
                            value={address}
                            onChangeText={setAddress}
                        />

                        <Text style={styles.label}>
                            Bairro
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Ex.: Centro"
                            placeholderTextColor={
                                COLORS.textSecondary
                            }
                            value={neighborhood}
                            onChangeText={setNeighborhood}
                        />

                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleAddAddress}
                        >
                            <Text style={styles.saveButtonText}>
                                Salvar endereço
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => {
                                setShowForm(false);
                                setTitle("");
                                setAddress("");
                                setNeighborhood("");
                            }}
                        >
                            <Text style={styles.cancelButtonText}>
                                Cancelar
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
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

    form: {
        marginTop: 24,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 14,
        padding: 18,
    },

    formTitle: {
        fontSize: 19,
        fontWeight: "800",
        color: COLORS.text,
        marginBottom: 20,
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.text,
        marginBottom: 6,
    },

    input: {
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 10,
        paddingHorizontal: 14,
        fontSize: 15,
        marginBottom: 16,
        backgroundColor: COLORS.background,
        color: COLORS.text,
    },

    saveButton: {
        height: 52,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 4,
    },

    saveButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "800",
    },

    cancelButton: {
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
    },

    cancelButtonText: {
        color: COLORS.primary,
        fontSize: 15,
        fontWeight: "700",
    },
});
