import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Perfil</ThemedText>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <IconSymbol name="person.fill" size={50} color="#FFFFFF" />
          </View>
          <ThemedText style={styles.userName}>K-Tech User</ThemedText>
          <ThemedText style={styles.userEmail}>user@ktech.com</ThemedText>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <IconSymbol name="pencil" size={24} color="#666" />
            <ThemedText style={styles.menuText}>Editar Perfil</ThemedText>
            <IconSymbol name="chevron.right" size={24} color="#CCC" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <IconSymbol name="shopping-bag" size={24} color="#666" />
            <ThemedText style={styles.menuText}>Meus Pedidos</ThemedText>
            <IconSymbol name="chevron.right" size={24} color="#CCC" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <IconSymbol name="map" size={24} color="#666" />
            <ThemedText style={styles.menuText}>Endereço</ThemedText>
            <IconSymbol name="chevron.right" size={24} color="#CCC" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <IconSymbol name="credit-card" size={24} color="#666" />
            <ThemedText style={styles.menuText}>Métodos de Pagamento</ThemedText>
            <IconSymbol name="chevron.right" size={24} color="#CCC" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <IconSymbol name="settings" size={24} color="#666" />
            <ThemedText style={styles.menuText}>Configurações</ThemedText>
            <IconSymbol name="chevron.right" size={24} color="#CCC" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <IconSymbol name="help" size={24} color="#666" />
            <ThemedText style={styles.menuText}>Ajuda e Suporte</ThemedText>
            <IconSymbol name="chevron.right" size={24} color="#CCC" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <IconSymbol name="info" size={24} color="#666" />
            <ThemedText style={styles.menuText}>Sobre</ThemedText>
            <IconSymbol name="chevron.right" size={24} color="#CCC" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn}>
          <IconSymbol name="logout" size={20} color="#FFFFFF" />
          <ThemedText style={styles.logoutText}>Sair</ThemedText>
        </TouchableOpacity>
      </ScrollView>
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
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  menuSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    gap: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  logoutBtn: {
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 30,
    paddingVertical: 18,
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
