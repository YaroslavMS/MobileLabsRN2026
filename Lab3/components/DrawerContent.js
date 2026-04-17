import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export default function DrawerContent(props) {
  const handleVersionPress = () => {
    Alert.alert(
      '⚛️ QuantumTap',
      'Версія 2.0.0\n\nРозробник: Ярослав Можаровський\nГрупа: ІПЗ 22-2\n\n"Торкнись квантової енергії"\n\nЖитомирська Політехніка\n© 2026',
      [{ text: 'Закрити', style: 'cancel' }]
    );
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <LinearGradient
        colors={['#0a0a2a', '#1a1a4a', '#2a2a6a']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.profileSection}
      >
        <View style={styles.avatarContainer}>
          <LinearGradient
            colors={['#00d4ff', '#0099cc']}
            style={styles.avatarGradient}
          >
            <Text style={styles.avatarText}>⚛️</Text>
          </LinearGradient>
        </View>
        <Text style={styles.name}>Ярослав Можаровський</Text>
        <Text style={styles.group}>ІПЗ 22-2</Text>
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Квантовий гравець</Text>
          </View>
          <View style={[styles.badge, styles.badgeOutline]}>
            <Text style={[styles.badgeText, styles.badgeOutlineText]}>⚡ Активний</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.menuSection}>
        <DrawerItemList {...props} />
      </View>

      <View style={styles.infoSection}>
        <TouchableOpacity style={styles.infoItem} onPress={handleVersionPress}>
          <Text style={styles.infoIcon}>⚛️</Text>
          <Text style={styles.infoText}>Про QuantumTap</Text>
          <Text style={styles.infoValue}>v2.0.0</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Житомирська Політехніка</Text>
        <Text style={styles.footerSubtext}>© 2026 QuantumTap</Text>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    marginBottom: 16,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatarGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#00d4ff',
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  avatarText: {
    fontSize: 48,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  group: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 12,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    backgroundColor: 'rgba(0, 212, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    color: '#00d4ff',
    fontWeight: '600',
  },
  badgeOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  badgeOutlineText: {
    color: '#888',
  },
  menuSection: {
    marginTop: 8,
  },
  infoSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2a',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
  },
  infoIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 15,
    color: '#fff',
  },
  infoValue: {
    fontSize: 13,
    color: '#00d4ff',
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    marginTop: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
  },
  footerSubtext: {
    fontSize: 11,
    color: '#555',
    marginTop: 4,
  },
});