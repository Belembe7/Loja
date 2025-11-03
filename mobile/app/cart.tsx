import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image as RNImage,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useCart } from '@/context/CartContext';
import { Image } from 'expo-image';

export default function CartScreen() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Carrinho Vazio', 'Adicione produtos ao carrinho primeiro');
      return;
    }

    Alert.alert(
      'Confirmar Pedido',
      `Total: ${getTotalPrice().toFixed(2)} MT\n\nDeseja fazer este pedido?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => {
            clearCart();
            Alert.alert('Sucesso', 'Seu pedido foi enviado!');
            router.back();
          },
        },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Carrinho</ThemedText>
        {cart.length > 0 && (
          <TouchableOpacity onPress={() => clearCart()} style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        )}
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <IconSymbol name="shopping-cart" size={80} color="#CCC" />
          <ThemedText style={styles.emptyText}>Seu carrinho está vazio</ThemedText>
          <TouchableOpacity
            style={styles.continueShoppingBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.continueShoppingText}>Continuar Comprando</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {cart.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.itemImageContainer}>
                  {item.imagem_url ? (
                    <Image
                      source={{ uri: item.imagem_url }}
                      style={styles.itemImage}
                      contentFit="contain"
                    />
                  ) : (
                    <View style={styles.placeholderImage}>
                      <IconSymbol name="photo" size={40} color="#CCC" />
                    </View>
                  )}
                </View>

                <View style={styles.itemInfo}>
                  <ThemedText style={styles.itemName}>{item.nome}</ThemedText>
                  <Text style={styles.itemPrice}>{item.preco.toFixed(2)} MT</Text>

                  <View style={styles.quantityControls}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.id, item.quantidade - 1)}
                    >
                      <IconSymbol name="minus" size={20} color="#666" />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantidade}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.id, item.quantidade + 1)}
                    >
                      <IconSymbol name="plus" size={20} color="#666" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.itemActions}>
                  <Text style={styles.itemTotal}>
                    {(item.preco * item.quantidade).toFixed(2)} MT
                  </Text>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeFromCart(item.id)}
                  >
                    <IconSymbol name="trash" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Total e Checkout */}
          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalPrice}>{getTotalPrice().toFixed(2)} MT</Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutText}>Fazer Pedido</Text>
              <IconSymbol name="checkmark-circle" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
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
  clearButton: {
    padding: 5,
  },
  clearText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
  continueShoppingBtn: {
    backgroundColor: '#EF4444',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  continueShoppingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  itemImageContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    minWidth: 30,
    textAlign: 'center',
  },
  itemActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  removeButton: {
    padding: 5,
  },
  footer: {
    padding: 20,
    borderTopWidth: 2,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  checkoutButton: {
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 15,
    gap: 10,
  },
  checkoutText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

