import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image } from 'expo-image';
import { useFavorites } from '@/context/FavoritesContext';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites } = useFavorites();

  const renderProduto = ({ item }: any) => (
    <TouchableOpacity
      style={styles.produtoCard}
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
            <IconSymbol name="photo" size={60} color="#CCC" />
          </View>
        )}
      </View>
      <View style={styles.produtoInfo}>
        <ThemedText style={styles.produtoNome} numberOfLines={2}>
          {item.nome}
        </ThemedText>
        <ThemedText style={styles.produtoPreco}>{item.preco.toFixed(2)} MT</ThemedText>
      </View>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={(e) => {
          e.stopPropagation();
        }}
      >
        <IconSymbol name="heart.fill" size={24} color="#FF69B4" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Favoritos</ThemedText>
      </View>

      {favorites.length === 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.emptyState}>
              <IconSymbol name="heart.fill" size={100} color="#FF69B4" />
              <ThemedText style={styles.emptyTitle}>Ainda sem favoritos</ThemedText>
              <ThemedText style={styles.emptySubtitle}>
                Comece a adicionar produtos aos seus favoritos e eles aparecerão aqui
              </ThemedText>
              <TouchableOpacity
                style={styles.browseBtn}
                onPress={() => router.push('/(tabs)/' as any)}
              >
                <Text style={styles.browseBtnText}>Procurar Produtos</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderProduto}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productsGrid}
          columnWrapperStyle={styles.row}
        />
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
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  browseBtn: {
    backgroundColor: '#EF4444',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  browseBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productsGrid: {
    padding: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  produtoCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 15,
    position: 'relative',
  },
  produtoImageContainer: {
    width: '100%',
    height: 150,
    backgroundColor: '#F9FAFB',
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
    padding: 12,
  },
  produtoNome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  produtoPreco: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
  },
});
