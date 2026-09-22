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
import ProductCard from "../components/ProductCard";
import { COLORS } from "../constants/colors";

const categories = [
  "PIZZAS",
  "ESFIHAS",
  "PANQUECAS",
  "MASSAS",
  "CALDOS",
  "BEBIDAS",
];

const products = [
  {
    name: "4 Queijos",
    description: "Mussarela, provolone, parmesão e catupiry.",
    price: "R$ 49,90",
  },
  {
    name: "Alho",
    description: "Mussarela, alho e temperos especiais.",
    price: "R$ 42,90",
  },
  {
    name: "Atum",
    description: "Mussarela, atum, cebola e tomate.",
    price: "R$ 47,90",
  },
  {
    name: "Bacon",
    description: "Mussarela, bacon e tomate.",
    price: "R$ 46,90",
  },
  {
    name: "Calabresa",
    description: "Mussarela, calabresa e cebola.",
    price: "R$ 44,90",
  },
  {
    name: "Calabresa com Ovos",
    description: "Calabresa, ovos, cebola e mussarela.",
    price: "R$ 48,90",
  },
];

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Header onProfilePress={() => router.push("/login")} />

        <TouchableOpacity style={styles.address}>
          <Text style={styles.addressIcon}>📍</Text>

          <View>
            <Text style={styles.addressLabel}>
              ENTREGAR EM
            </Text>

            <Text style={styles.addressText}>
              Escolha um endereço
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>⌕</Text>

          <TextInput
            style={styles.search}
            placeholder="Buscar no cardápio"
            placeholderTextColor={COLORS.textSecondary}
          />
        </View>

        <View style={styles.restaurantInfo}>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>
              80–90 min
            </Text>

            <Text style={styles.infoLabel}>
              Entrega
            </Text>
          </View>

          <View style={styles.infoDivider} />

          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>
              ⭐ 4.8
            </Text>

            <Text style={styles.infoLabel}>
              20 avaliações
            </Text>
          </View>

          <View style={styles.infoDivider} />

          <View style={styles.infoItem}>
            <Text style={styles.openText}>
              ABERTO
            </Text>

            <Text style={styles.infoLabel}>
              18h–23h
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Cardápio
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.category,
                index === 0 && styles.categoryActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  index === 0 && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>
          Pizzas
        </Text>

        <View style={styles.products}>
          {products.map((product) => (
            <ProductCard
              key={product.name}
              name={product.name}
              description={product.description}
              price={product.price}
              onPress={() => router.push("/produto")}
            />
          ))}
        </View>
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

  address: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 14,
    marginTop: 24,
  },

  addressIcon: {
    fontSize: 22,
    marginRight: 10,
  },

  addressLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.textSecondary,
  },

  addressText: {
    marginTop: 3,
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
  },

  arrow: {
    marginLeft: "auto",
    fontSize: 28,
    color: COLORS.textSecondary,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    marginTop: 14,
    paddingHorizontal: 14,
  },

  searchIcon: {
    fontSize: 24,
    color: COLORS.textSecondary,
    marginRight: 8,
  },

  search: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
  },

  restaurantInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginTop: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  infoItem: {
    alignItems: "center",
    flex: 1,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },

  infoLabel: {
    marginTop: 3,
    fontSize: 11,
    color: COLORS.textSecondary,
  },

  openText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#4A7C59",
  },

  infoDivider: {
    width: 1,
    height: 32,
    backgroundColor: COLORS.border,
  },

  sectionTitle: {
    marginTop: 28,
    marginBottom: 14,
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.text,
  },

  categories: {
    paddingRight: 20,
  },

  category: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    marginRight: 8,
  },

  categoryActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  categoryText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.text,
  },

  categoryTextActive: {
    color: COLORS.white,
  },

  products: {
    gap: 12,
  }
});
