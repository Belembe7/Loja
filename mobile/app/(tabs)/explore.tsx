import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Image } from 'expo-image';
import { API_URL } from '@/config';

interface Categoria {
  id: number;
  nome: string;
  imagem_url?: string;
}

export default function CategoriasScreen() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCategorias = async () => {
    try {
      const response = await fetch(`${API_URL}/categorias`);
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCategorias();
  };

  // Mapear categorias com cores
  const getCategoriaColor = (nome: string) => {
    const mapping: { [key: string]: string } = {
      'Smartphones': '#EF4444',
      'Laptops': '#3B82F6',
      'Headphones': '#8B5CF6',
      'Smartwatches': '#F59E0B',
    };
    return mapping[nome] || '#6C757D';
  };

  const renderCategoria = ({ item }: { item: Categoria }) => {
    const backgroundColor = getCategoriaColor(item.nome);
    return (
      <TouchableOpacity 
        style={[styles.categoriaCard, { backgroundColor }]}
        activeOpacity={0.8}
      >
        {item.imagem_url ? (
          <View style={styles.categoriaImageContainer}>
            <Image
              source={{ uri: item.imagem_url }}
              style={styles.categoriaImagem}
              contentFit="cover"
              transition={200}
            />
          </View>
        ) : (
          <View style={styles.categoriaPlaceholder}>
            <Text style={styles.categoriaEmoji}>📦</Text>
          </View>
        )}
        <Text style={styles.categoriaNome}>{item.nome}</Text>
        <TouchableOpacity style={styles.categoriaBtn}>
          <Text style={styles.categoriaBtnText}>Ver Produtos ›</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#EF4444" />
        <ThemedText style={styles.loadingText}>Carregando categorias...</ThemedText>
      </View>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>K</Text>
            </View>
            <Text style={styles.logoName}>K-TECH</Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <ThemedText style={styles.sectionTitle}>Categorias</ThemedText>
          <ThemedText style={styles.subtitle}>Explore por categoria</ThemedText>

          <View style={styles.categoriasList}>
            {categorias.map((cat) => (
              <View key={cat.id}>
                {renderCategoria({ item: cat })}
              </View>
            ))}
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
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 2,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
  },
  categoriasList: {
    gap: 15,
  },
  categoriaCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  categoriaImageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  categoriaImagem: {
    width: '100%',
    height: '100%',
  },
  categoriaPlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  categoriaEmoji: {
    fontSize: 80,
  },
  categoriaNome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  categoriaBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  categoriaBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});
