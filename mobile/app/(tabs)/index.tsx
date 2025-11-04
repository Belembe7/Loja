import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  TextInput,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image } from 'expo-image';
import { useCart } from '@/context/CartContext';
import { API_URL } from '@/config';

const { width } = Dimensions.get('window');

interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  imagem_url?: string;
  estoque: number;
  rating?: number;
  categoria_id?: number;
}

interface Categoria {
  id: number;
  nome: string;
  imagem_url?: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const { getTotalItems } = useCart();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);
  const [produtoCarouselIndex, setProdutoCarouselIndex] = useState(0);

  const fetchProdutos = async (categoriaId?: number, isRefresh: boolean = false) => {
    try {
      if (!isRefresh) {
        setLoading(true);
      }
      
      const url = categoriaId ? 
        `${API_URL}/categorias/${categoriaId}/produtos` : 
        `${API_URL}/produtos`;
      
      console.log('🔗 Buscando produtos em:', url);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Produtos recebidos:', data.length);
      setProdutos(data);
    } catch (error) {
      console.error('❌ Erro ao buscar produtos:', error);
      console.error('URL tentada:', API_URL);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchCategorias = async () => {
    try {
      console.log('🔗 Buscando categorias em:', `${API_URL}/categorias`);
      const response = await fetch(`${API_URL}/categorias`);
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Categorias recebidas:', data.length);
      setCategorias(data);
    } catch (error) {
      console.error('❌ Erro ao buscar categorias:', error);
      console.error('URL tentada:', API_URL);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchProdutos(categoriaSelecionada || undefined);
  }, [categoriaSelecionada]);

  // Carrossel automático de produtos
  useEffect(() => {
    if (produtos.length > 0) {
      const interval = setInterval(() => {
        setProdutoCarouselIndex((prev) => (prev + 1) % produtos.length);
      }, 5000); // 5 segundos
      return () => clearInterval(interval);
    }
  }, [produtos]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProdutos(categoriaSelecionada || undefined, true);
  };

  const handleCategoryPress = (categoriaId: number | null) => {
    setCategoriaSelecionada(categoriaId);
  };

  const renderProduto = ({ item }: { item: Produto }) => (
    <TouchableOpacity 
      style={styles.produtoCard}
      onPress={() => router.push(`/product/${item.id}` as any)}
    >
      <View style={styles.produtoImageContainer}>
        {item.imagem_url ? (
          <Image
            source={{ uri: item.imagem_url }}
            style={styles.produtoImagem}
            contentFit="contain"
            transition={200}
          />
        ) : (
          <IconSymbol 
            name={"photo" as any} 
            size={60} 
            color="#CCC" 
          />
        )}
      </View>
      <View style={styles.produtoInfo}>
        <ThemedText style={styles.produtoNome} numberOfLines={1}>
          {item.nome}
        </ThemedText>
        <ThemedText style={styles.produtoPreco}>{item.preco.toFixed(2)} MT</ThemedText>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#EF4444" />
        <ThemedText style={styles.loadingText}>Carregando...</ThemedText>
      </View>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <ThemedText style={styles.tituloDiscover}>K-Tech</ThemedText>
          <TouchableOpacity 
            style={styles.carrinhoBtn}
            onPress={() => router.push('/cart' as any)}
          >
            <IconSymbol name={"shopping-cart" as any} size={28} color="#000" />
            {getTotalItems() > 0 && (
              <View style={styles.carrinhoBadge}>
                <Text style={styles.carrinhoBadgeText}>{getTotalItems()}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        
        {/* Barra de Pesquisa */}
        <View style={styles.searchContainer}>
          <IconSymbol name="magnifyingglass" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#EF4444" />
        }
      >
        {/* Carrossel de Produtos em Destaque */}
        {produtos.length > 0 && produtos[produtoCarouselIndex]?.imagem_url && (
          <View style={styles.carouselContainer}>
            <Image
              source={{ uri: produtos[produtoCarouselIndex].imagem_url }}
              style={styles.carouselImage}
              contentFit="cover"
              transition={200}
            />
            <View style={styles.carouselOverlay}>
              <Text style={styles.carouselTitle}>{produtos[produtoCarouselIndex].nome}</Text>
              <Text style={styles.carouselDescription} numberOfLines={2}>
                {produtos[produtoCarouselIndex].descricao || 'Produto de qualidade'}
              </Text>
              <View style={styles.carouselPrice}>
                <Text style={styles.carouselPriceText}>{produtos[produtoCarouselIndex].preco.toFixed(2)} MT</Text>
              </View>
            </View>
            <View style={styles.carouselIndicators}>
              {produtos.slice(0, 5).map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    index === produtoCarouselIndex && styles.indicatorActive,
                  ]}
                />
              ))}
            </View>
          </View>
        )}

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <View style={styles.categoriesHeader}>
            <ThemedText style={styles.sectionTitle}>Categorias</ThemedText>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver tudo</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {/* Botão "All" */}
            <TouchableOpacity
              style={[
                styles.categoryBtn,
                categoriaSelecionada === null && styles.categoryBtnActive,
              ]}
              onPress={() => handleCategoryPress(null)}
            >
              <Text
                style={[
                  styles.categoryBtnText,
                  categoriaSelecionada === null && styles.categoryBtnTextActive,
                ]}
              >
                Todos
              </Text>
            </TouchableOpacity>
            
            {/* Categorias da API */}
            {categorias.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryBtn,
                  categoriaSelecionada === cat.id && styles.categoryBtnActive,
                ]}
                onPress={() => handleCategoryPress(cat.id)}
              >
                <Text
                  style={[
                    styles.categoryBtnText,
                    categoriaSelecionada === cat.id && styles.categoryBtnTextActive,
                  ]}
                >
                  {cat.nome}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Products Grid */}
        <View style={styles.productsSection}>
          <FlatList
            data={produtos}
            renderItem={renderProduto}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.productsGrid}
            columnWrapperStyle={styles.row}
          />
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
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  tituloDiscover: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000',
  },
  carrinhoBtn: {
    position: 'relative',
  },
  carrinhoBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carrinhoBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  carouselContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    height: 220,
    overflow: 'hidden',
    position: 'relative',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  carouselOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  carouselTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  carouselDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 10,
    opacity: 0.9,
  },
  carouselPrice: {
    alignSelf: 'flex-start',
    backgroundColor: '#EF4444',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  carouselPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  carouselIndicators: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    flexDirection: 'row',
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  indicatorActive: {
    backgroundColor: '#FFFFFF',
    width: 20,
  },
  categoriesSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  seeAll: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '600',
  },
  categoriesScroll: {
    marginTop: 10,
  },
  categoryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  categoryBtnActive: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  categoryBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  categoryBtnTextActive: {
    color: '#FFFFFF',
  },
  productsSection: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  productsGrid: {
    gap: 15,
  },
  row: {
    justifyContent: 'space-between',
  },
  produtoCard: {
    width: (width - 50) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 15,
  },
  produtoImageContainer: {
    width: '100%',
    height: 150,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  produtoImagem: {
    width: '100%',
    height: '100%',
  },
  produtoInfo: {
    padding: 12,
  },
  produtoNome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  produtoPreco: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EF4444',
  },
});
