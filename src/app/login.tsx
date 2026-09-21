import { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ActivityIndicator, Alert,
} from "react-native";
import { useRouter } from "expo-router";
import Header from "../components/Header";
import { COLORS } from "../constants/colors";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Erro", "Digite um e-mail válido.");
      return;
    }

    setLoading(true);

    // TODO: substituir pela chamada real de autenticação (API, Firebase, etc.)
    setTimeout(() => {
      setLoading(false);
      router.replace("/");
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Header />

      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo(a)!</Text>
        <Text style={styles.description}>Entre para continuar</Text>

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          placeholderTextColor={COLORS.textSecondary}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="••••••••"
            placeholderTextColor={COLORS.textSecondary}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.toggle}>
              {showPassword ? "Ocultar" : "Mostrar"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/cadastro")}>
          <Text style={styles.registerText}>
            Não tem conta? <Text style={styles.registerLink}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
  },

  description: {
    marginTop: 8,
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 32,
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
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: COLORS.white,
    color: COLORS.text,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    paddingHorizontal: 14,
    marginBottom: 24,
  },

  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: COLORS.text,
  },

  toggle: {
    color: COLORS.primary,
    fontWeight: "600",
  },

  button: {
    height: 52,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },

  registerText: {
    textAlign: "center",
    color: COLORS.textSecondary,
    marginTop: 16,
    fontSize: 14,
  },

  registerLink: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});