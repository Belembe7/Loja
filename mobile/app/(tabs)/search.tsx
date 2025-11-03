import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image } from 'expo-image';
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

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [resultados, setResultados] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/produtos`);
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setResultados([]);
      return;
    }
    
    setLoading(true);
    // Simular delay para pesquisa
    setTimeout(() => {
      const filtered = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(text.toLowerCase()) ||
        produto.descricao.toLowerCase().includes(text.toLowerCase())
      );
      setResultados(filtered);
      setLoading(false);
    }, 300);
  };

  const renderProduto = ({ item }: { item: Produto }) => (
    <TouchableOpacity
      style={styles.produtoItem}
      onPress={() => router.push(`/product/${item.id}` as any)}
    >
      <View style={styles.produtoImageContainer}>
        {item.imagem_url ? (
          <Image
            source={{ uri: item.imagem_url }}
            style={styles.produtoImage}
            contentFit="contain"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <IconSymbol name="photo" size={40} color="#CCC" />
          </View>
        )}
      </View>
      <View style={styles.produtoInfo}>
        <ThemedText style={styles.produtoNome} numberOfLines={1}>
          {item.nome}
        </ThemedText>
        <Text style={styles.produtoPreco}>{item.preco.toFixed(2)} MT</Text>
      </View>
      <IconSymbol name="chevron.right" size={24} color="#CCC" />
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Buscar</ThemedText>
      </View>

      <View style={styles.searchContainer}>
        <IconSymbol name="magnifyingglass" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar produtos..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={handleSearch}
          autoCapitalize="none"
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => {
            setSearchQuery('');
            setResultados([]);
          }}>
            <IconSymbol name="xmark" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#10B981" />
        </View>
      ) : searchQuery === '' ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Popular Searches */}
            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Buscas Populares</ThemedText>
              <View style={styles.popularList}>
                {produtos.slice(0, 5).map((produto) => (
                  <TouchableOpacity
                    key={produto.id}
                    style={styles.popularItem}
                    onPress={() => router.push(`/product/${produto.id}` as any)}
                  >
                    <IconSymbol name="phone" size={24} color="#666" />
                    <ThemedText style={styles.popularText}>{produto.nome}</ThemedText>
                    <IconSymbol name="chevron.right" size={24} color="#CCC" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      ) : resultados.length > 0 ? (
        <FlatList
          data={resultados}
          renderItem={renderProduto}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.resultsContainer}
        />
      ) : (
        <View style={styles.centerContainer}>
          <IconSymbol name="magnifyingglass" size={60} color="#CCC" />
          <ThemedText style={styles.emptyText}>Nenhum produto encontrado</ThemedText>
          <ThemedText style={styles.emptySubtext}>Tente pesquisar com outras palavras</ThemedText>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  popularList: {
    backgroundColor: '#F9FAFB',
    borderRadius: 15,
    overflow: 'hidden',
  },
  popularItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    gap: 15,
  },
  popularText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  resultsContainer: {
    padding: 20,
  },
  produtoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 15,
    gap: 15,
  },
  produtoImageContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  produtoImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  produtoInfo: {
    flex: 1,
  },
  produtoNome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  produtoPreco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
    textAlign: 'center',
  },
});
