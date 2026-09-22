import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Redirect, useRouter } from "expo-router";
import { useState } from "react";

import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { COLORS } from "../constants/colors";
import { useAddress } from "../context/AddressContext";
import { useAuth } from "../context/AuthContext";

const categories = [
  "PIZZAS",
  "ESFIHAS",
  "PANQUECAS",
  "MASSAS",
  "CALDOS",
  "BEBIDAS",
];

const productsByCategory = {
  PIZZAS: [
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
  ],

  ESFIHAS: [
    {
      name: "Carne",
      description: "Carne temperada, cebola e tomate.",
      price: "R$ 8,90",
    },
    {
      name: "Queijo",
      description: "Mussarela e temperos especiais.",
      price: "R$ 8,90",
    },
    {
      name: "Frango com Catupiry",
      description: "Frango desfiado e catupiry.",
      price: "R$ 9,90",
    },
    {
      name: "Calabresa",
      description: "Calabresa, cebola e mussarela.",
      price: "R$ 9,90",
    },
  ],

  PANQUECAS: [
    {
      name: "Panqueca de Carne",
      description: "Carne moída ao molho de tomate e queijo.",
      price: "R$ 29,90",
    },
    {
      name: "Panqueca de Frango",
      description: "Frango desfiado, queijo e molho especial.",
      price: "R$ 29,90",
    },
    {
      name: "Panqueca de Queijo",
      description: "Mussarela, molho de tomate e parmesão.",
      price: "R$ 27,90",
    },
  ],

  MASSAS: [
    {
      name: "Espaguete à Bolonhesa",
      description: "Espaguete com molho de carne e parmesão.",
      price: "R$ 34,90",
    },
    {
      name: "Fettuccine Alfredo",
      description: "Massa ao molho cremoso e parmesão.",
      price: "R$ 36,90",
    },
    {
      name: "Lasanha à Bolonhesa",
      description: "Massa, carne, molho de tomate e queijo.",
      price: "R$ 39,90",
    },
  ],

  CALDOS: [
    {
      name: "Caldo de Aipim",
      description: "Caldo cremoso de aipim com carne desfiada.",
      price: "R$ 18,90",
    },
    {
      name: "Caldo Verde",
      description: "Batata, couve e temperos especiais.",
      price: "R$ 17,90",
    },
    {
      name: "Caldo de Feijão",
      description: "Feijão preto temperado com ervas.",
      price: "R$ 17,90",
    },
  ],

  BEBIDAS: [
    {
      name: "Coca-Cola",
      description: "Refrigerante Coca-Cola 350 ml.",
      price: "R$ 6,00",
    },
    {
      name: "Guaraná",
      description: "Refrigerante Guaraná 350 ml.",
      price: "R$ 6,00",
    },
    {
      name: "Água Mineral",
      description: "Água mineral sem gás 500 ml.",
      price: "R$ 4,00",
    },
    {
      name: "Suco de Laranja",
      description: "Suco natural de laranja.",
      price: "R$ 9,90",
    },
  ],
};

export default function Index() {
  const router = useRouter();
  const { selectedAddress } = useAddress();
  const { user } = useAuth();

  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof productsByCategory>("PIZZAS");

  const [search, setSearch] = useState("");

  if (!user) {
    return <Redirect href="/login" />;
  }

  const products = productsByCategory[selectedCategory].filter((product) => {
    const searchText = search.toLowerCase();

    return (
      product.name.toLowerCase().includes(searchText) ||
      product.description.toLowerCase().includes(searchText)
    );
  });

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Header onProfilePress={() => router.push("/perfil")} />

        <TouchableOpacity
          style={styles.address}
          onPress={() => router.push("/endereco")}
        >
          <Text style={styles.addressIcon}>📍</Text>

          <View>
            <Text style={styles.addressLabel}>
              ENTREGAR EM
            </Text>

            <Text style={styles.addressText}>
              {selectedAddress
                ? `${selectedAddress.address} - ${selectedAddress.neighborhood}`
                : "Escolha um endereço"}
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
            value={search}
            onChangeText={setSearch}
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
          {categories.map((category) => {
            const selected = selectedCategory === category;

            return (
              <TouchableOpacity
                key={category}
                style={[
                  styles.category,
                  selected && styles.categoryActive,
                ]}
                onPress={() =>
                  setSelectedCategory(
                    category as keyof typeof productsByCategory
                  )
                }
              >
                <Text
                  style={[
                    styles.categoryText,
                    selected && styles.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.sectionTitle}>
          {selectedCategory}
        </Text>

        <View style={styles.products}>
          {products.map((product) => (
            <ProductCard
              key={product.name}
              name={product.name}
              description={product.description}
              price={product.price}
              category={selectedCategory}
              onPress={() =>
                router.push({
                  pathname: "/produto",
                  params: {
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    category: selectedCategory,
                  },
                })
              }
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
  },
});
