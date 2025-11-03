import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image } from 'expo-image';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { API_URL } from '@/config';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  imagem_url?: string;
  estoque: number;
  categoria_id?: number;
}

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addToCart, getTotalItems } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [produto, setProduto] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduto();
  }, [id]);

  const fetchProduto = async () => {
    try {
      const response = await fetch(`${API_URL}/produtos/${id}`);
      if (!response.ok) {
        router.back();
        return;
      }
      const data = await response.json();
      setProduto(data);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (produto) {
      addToCart({
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        imagem_url: produto.imagem_url,
      });
      Alert.alert(
        'Produto Adicionado',
        `${produto.nome} foi adicionado ao carrinho!`,
        [{ text: 'OK' }]
      );
    }
  };

  const handleOrderNow = () => {
    Alert.alert(
      'Pedido',
      `Fazer pedido de ${produto?.nome}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => {
            Alert.alert('Sucesso', 'Seu pedido foi enviado!');
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#EF4444" />
        <ThemedText style={styles.loadingText}>Carregando...</ThemedText>
      </View>
    );
  }

  if (!produto) {
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Detalhes</ThemedText>
        <TouchableOpacity style={styles.cartButton} onPress={() => router.push('/cart' as any)}>
          <IconSymbol name="shopping-cart" size={24} color="#000" />
          {getTotalItems() > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{getTotalItems()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Imagem do Produto */}
        <View style={styles.imageContainer}>
          {produto.imagem_url ? (
            <Image
              source={{ uri: produto.imagem_url }}
              style={styles.productImage}
              contentFit="contain"
            />
          ) : (
            <View style={styles.placeholderImage}>
              <IconSymbol name="photo" size={80} color="#CCC" />
            </View>
          )}
        </View>

        {/* Informações do Produto */}
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <ThemedText style={styles.productName}>{produto.nome}</ThemedText>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => produto && toggleFavorite(produto)}
            >
              <IconSymbol
                name={produto && isFavorite(produto.id) ? "heart.fill" : "heart"}
                size={28}
                color={produto && isFavorite(produto.id) ? "#FF69B4" : "#CCC"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>{produto.preco.toFixed(2)} MT</Text>
            <Text style={styles.stock}>Estoque: {produto.estoque}</Text>
          </View>

          <View style={styles.divider} />

          {/* Descrição */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Descrição</ThemedText>
            <ThemedText style={styles.description}>
              {produto.descricao || 'Sem descrição disponível.'}
            </ThemedText>
          </View>

          {/* Botões de Ação */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.button, styles.addToCartButton]}
              onPress={handleAddToCart}
            >
              <IconSymbol name="shopping-cart" size={24} color="#EF4444" />
              <Text style={styles.addToCartText}>Adicionar ao Carrinho</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.orderButton]}
              onPress={handleOrderNow}
            >
              <Text style={styles.orderText}>Fazer Pedido</Text>
              <IconSymbol name="checkmark-circle" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  cartButton: {
    position: 'relative',
    padding: 5,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  productName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  favoriteButton: {
    padding: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  stock: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  actionButtons: {
    gap: 15,
    marginTop: 20,
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 15,
    gap: 10,
  },
  addToCartButton: {
    backgroundColor: '#FEF2F2',
    borderWidth: 2,
    borderColor: '#EF4444',
  },
  addToCartText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#EF4444',
  },
  orderButton: {
    backgroundColor: '#EF4444',
  },
  orderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

