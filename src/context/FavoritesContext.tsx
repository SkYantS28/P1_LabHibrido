import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type FavoriteProduct = {
    id: string;
    name: string;
    description: string;
    price: string;
    category: string;
};

type FavoritesContextData = {
    favorites: FavoriteProduct[];
    isFavorite: (id: string) => boolean;
    toggleFavorite: (product: FavoriteProduct) => Promise<void>;
};

const FavoritesContext = createContext<
    FavoritesContextData | undefined
>(undefined);

const FAVORITES_STORAGE_KEY = "@veneto_favorites";

export function FavoritesProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const storedFavorites =
                    await AsyncStorage.getItem(
                        FAVORITES_STORAGE_KEY
                    );

                if (storedFavorites) {
                    const parsedFavorites = JSON.parse(storedFavorites);

                    if (
                        Array.isArray(parsedFavorites) &&
                        parsedFavorites.every(
                            (item) =>
                                item &&
                                typeof item === "object" &&
                                typeof item.id === "string"
                        )
                    ) {
                        setFavorites(parsedFavorites);
                    } else {
                        await AsyncStorage.removeItem(
                            FAVORITES_STORAGE_KEY
                        );
                    }
                }

            } catch (error) {
                console.log(
                    "Erro ao carregar favoritos:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();
    }, []);

    const isFavorite = (id: string) => {
        return favorites.some(
            (favorite) => favorite.id === id
        );
    };

    const toggleFavorite = async (
        product: FavoriteProduct
    ) => {
        const updatedFavorites = isFavorite(product.id)
            ? favorites.filter(
                (favorite) => favorite.id !== product.id
            )
            : [...favorites, product];

        try {
            await AsyncStorage.setItem(
                FAVORITES_STORAGE_KEY,
                JSON.stringify(updatedFavorites)
            );

            setFavorites(updatedFavorites);
        } catch (error) {
            console.log(
                "Erro ao salvar favorito:",
                error
            );
        }
    };

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                isFavorite,
                toggleFavorite,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error(
            "useFavorites deve ser usado dentro de FavoritesProvider"
        );
    }

    return context;
}
