import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import { COLORS } from "../constants/colors";
import { useAuth } from "../context/AuthContext";

export default function Perfil() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  if (!user) {
    router.replace("/login");
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Meu perfil</Text>

        <View style={styles.headerSpace} />
      </View>

      <View style={styles.content}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nome</Text>
            <Text style={styles.infoValue}>{user.name}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>E-mail</Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.ordersButton}
          onPress={() => router.push("/pedidos")}
        >
          <View style={styles.ordersContent}>
            <Text style={styles.ordersIcon}>🛍️</Text>

            <View>
              <Text style={styles.ordersTitle}>
                Pedidos feitos
              </Text>

              <Text style={styles.ordersDescription}>
                Consulte seu histórico de pedidos
              </Text>
            </View>
          </View>

          <Text style={styles.ordersArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
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
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 40,
  },

  name: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
  },

  email: {
    marginTop: 6,
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  infoCard: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    marginTop: 40,
    paddingHorizontal: 16,
  },

  infoRow: {
    paddingVertical: 18,
  },

  infoLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 5,
  },

  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },

  ordersButton: {
    width: "100%",
    minHeight: 68,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  ordersContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  ordersIcon: {
    fontSize: 24,
    marginRight: 12,
  },

  ordersTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },

  ordersDescription: {
    marginTop: 3,
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  ordersArrow: {
    fontSize: 28,
    color: COLORS.textSecondary,
  },

  logoutButton: {
    width: "100%",
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },

  logoutText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primary,
  },
});
