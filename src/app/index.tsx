import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>VENETO</Text>

      <Text style={styles.subtitle}>
        Restaurante e Pizzaria
      </Text>

      <View style={styles.divider} />

      <Text style={styles.title}>Olá!</Text>

      <Text style={styles.description}>
        Escolha uma opção para começar
      </Text>

      <View style={styles.menu}>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>🍕 Cardápio</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>🛒 Meu Carrinho</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>👤 Minha Conta</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F4EE",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  logo: {
    fontSize: 38,
    fontWeight: "800",
    letterSpacing: 4,
    color: "#7A1F1F",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#6B625A",
  },

  divider: {
    width: 80,
    height: 2,
    backgroundColor: "#C89B5C",
    marginVertical: 28,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2D2926",
  },

  description: {
    marginTop: 8,
    fontSize: 15,
    color: "#6B625A",
  },

  menu: {
    width: "100%",
    marginTop: 32,
    gap: 12,
  },

  menuItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E5DDD2",
  },

  menuText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#2D2926",
  },
});
