import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image } from 'expo-image';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { API_URL } from '@/config';

const { width } = Dimensions.get('window');

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
  
  // Animações
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.9);
  const imageOpacity = new Animated.Value(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    fetchProduto();
  }, [id]);

  useEffect(() => {
    if (produto) {
      // Animar entrada
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [produto]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    Animated.timing(imageOpacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const fetchProduto = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 90000);

      const response = await fetch(`${API_URL}/produtos/${id}`, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        Alert.alert('Erro', 'Produto não encontrado');
        router.back();
        return;
      }
      const data = await response.json();
      setProduto(data);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      Alert.alert('Erro', 'Erro ao carregar produto');
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

  const handleToggleFavorite = () => {
    if (produto) {
      toggleFavorite({
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        imagem_url: produto.imagem_url,
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#EF4444" />
        <ThemedText style={styles.loadingText}>Carregando produto...</ThemedText>
      </View>
    );
  }

  if (!produto) {
    return null;
  }

  const favorite = isFavorite(produto.id);

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="arrow.left" size={24} color="#000" />
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
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Imagem do Produto com Animação */}
          <View style={styles.imageContainer}>
            {produto.imagem_url ? (
              <>
                {!imageLoaded && (
                  <View style={styles.imageLoader}>
                    <ActivityIndicator size="large" color="#EF4444" />
                  </View>
                )}
                <Animated.View
                  style={[
                    styles.imageWrapper,
                    {
                      opacity: imageOpacity,
                    },
                  ]}
                >
                  <Image
                    source={{ uri: produto.imagem_url }}
                    style={styles.productImage}
                    contentFit="contain"
                    transition={300}
                    onLoad={handleImageLoad}
                  />
                  {/* Efeito de brilho sutil */}
                  <View style={styles.imageGlow} />
                </Animated.View>
              </>
            ) : (
              <View style={styles.placeholderImage}>
                <IconSymbol name="photo" size={80} color="#CCC" />
              </View>
            )}
            {/* Botão de favorito sobre a imagem */}
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={handleToggleFavorite}
            >
              <IconSymbol
                name={favorite ? "heart.fill" : "heart"}
                size={28}
                color={favorite ? "#EF4444" : "#FFF"}
              />
            </TouchableOpacity>
          </View>

          {/* Informações do Produto */}
          <View style={styles.infoContainer}>
            {/* Nome e Preço */}
            <View style={styles.titleRow}>
              <View style={styles.titleContainer}>
                <ThemedText style={styles.productName}>{produto.nome}</ThemedText>
                <View style={styles.priceContainer}>
                  <ThemedText style={styles.price}>{produto.preco.toFixed(2)} MT</ThemedText>
                  {produto.estoque > 0 ? (
                    <View style={styles.stockBadge}>
                      <Text style={styles.stockBadgeText}>Em estoque</Text>
                    </View>
                  ) : (
                    <View style={[styles.stockBadge, styles.stockBadgeOut]}>
                      <Text style={styles.stockBadgeTextOut}>Fora de estoque</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Descrição Destaque */}
            <View style={styles.descriptionSection}>
              <View style={styles.descriptionHeader}>
                <IconSymbol name="info.circle.fill" size={24} color="#EF4444" />
                <ThemedText style={styles.descriptionTitle}>Descrição do Produto</ThemedText>
              </View>
              <View style={styles.descriptionBox}>
                <ThemedText style={styles.descriptionText}>
                  {produto.descricao || 'Este produto não possui descrição detalhada.'}
                </ThemedText>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Informações Adicionais */}
            <View style={styles.infoSection}>
              <View style={styles.infoItem}>
                <IconSymbol name="cube.box.fill" size={20} color="#666" />
                <ThemedText style={styles.infoLabel}>Estoque disponível:</ThemedText>
                <ThemedText style={styles.infoValue}>{produto.estoque} unidades</ThemedText>
              </View>
              <View style={styles.infoItem}>
                <IconSymbol name="checkmark.shield.fill" size={20} color="#666" />
                <ThemedText style={styles.infoLabel}>Garantia:</ThemedText>
                <ThemedText style={styles.infoValue}>Incluída</ThemedText>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Footer com Botões */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          disabled={produto.estoque === 0}
        >
          <IconSymbol name="cart.badge.plus" size={24} color="#FFF" />
          <Text style={styles.addToCartText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buyNowButton,
            produto.estoque === 0 && styles.buyNowButtonDisabled,
          ]}
          disabled={produto.estoque === 0}
        >
          <IconSymbol name="creditcard.fill" size={24} color="#FFF" />
          <Text style={styles.buyNowText}>Comprar Agora</Text>
        </TouchableOpacity>
      </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
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
  content: {
    paddingBottom: 100,
  },
  imageContainer: {
    width: '100%',
    height: 350,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  imageLoader: {
    position: 'absolute',
    zIndex: 1,
  },
  imageGlow: {
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
    borderRadius: 20,
    zIndex: -1,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  titleRow: {
    marginBottom: 20,
  },
  titleContainer: {
    marginBottom: 10,
  },
  productName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  stockBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  stockBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  stockBadgeOut: {
    backgroundColor: '#EF4444',
  },
  stockBadgeTextOut: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 20,
  },
  descriptionSection: {
    marginBottom: 20,
  },
  descriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  descriptionBox: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  infoSection: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#EF4444',
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  addToCartText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buyNowButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buyNowButtonDisabled: {
    backgroundColor: '#CCC',
  },
  buyNowText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

