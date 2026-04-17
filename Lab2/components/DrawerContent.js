import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export default function DrawerContent(props) {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(true);

  const handleVersionPress = () => {
    Alert.alert(
      '📱 Про додаток',
      'StudyHub v2.0.0\n\nРозробник: Ярослав Можаровський\nГрупа: ІПЗ 22-2\n\nЖитомирська Політехніка\n© 2026 Всі права захищено',
      [{ text: 'Закрити', style: 'cancel' }]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Вихід',
      'Ви впевнені, що хочете вийти?',
      [
        { text: 'Скасувати', style: 'cancel' },
        { text: 'Вийти', style: 'destructive', onPress: () => console.log('Вихід') },
      ]
    );
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* Профільна секція */}
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.profileSection}
      >
        <View style={styles.avatarContainer}>
          <LinearGradient
            colors={['#e94560', '#c73e54']}
            style={styles.avatarGradient}
          >
            <Text style={styles.avatarText}>ЯМ</Text>
          </LinearGradient>
          <View style={styles.onlineBadge} />
        </View>
        <Text style={styles.name}>Ярослав Можаровський</Text>
        <Text style={styles.group}>ІПЗ 22-2</Text>
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Студент</Text>
          </View>
          <View style={[styles.badge, styles.badgeOutline]}>
            <Text style={[styles.badgeText, styles.badgeOutlineText]}>Активний</Text>
          </View>
        </View>
        <Text style={styles.email}>yaroslav.m@ztu.edu.ua</Text>
      </LinearGradient>

      {/* Пункти меню */}
      <View style={styles.menuSection}>
        <DrawerItemList {...props} />
      </View>

      {/* Налаштування */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>⚙️ Налаштування</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingIcon}>🔔</Text>
            <Text style={styles.settingText}>Сповіщення</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#2a2a3e', true: '#e94560' }}
            thumbColor={notifications ? '#fff' : '#888'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingIcon}>🌙</Text>
            <Text style={styles.settingText}>Темна тема</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#2a2a3e', true: '#e94560' }}
            thumbColor={darkMode ? '#fff' : '#888'}
          />
        </View>
      </View>

      {/* Додаткова інформація */}
      <View style={styles.infoSection}>
        <TouchableOpacity style={styles.infoItem} onPress={handleVersionPress}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoText}>Про додаток</Text>
          <Text style={styles.infoValue}>v2.0.0</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.infoItem} onPress={() => {}}>
          <Text style={styles.infoIcon}>⭐</Text>
          <Text style={styles.infoText}>Оцінити додаток</Text>
          <Text style={styles.infoArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoItem} onPress={() => {}}>
          <Text style={styles.infoIcon}>💬</Text>
          <Text style={styles.infoText}>Зворотний зв'язок</Text>
          <Text style={styles.infoArrow}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Кнопка виходу */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LinearGradient
          colors={['rgba(233, 69, 96, 0.15)', 'rgba(233, 69, 96, 0.05)']}
          style={styles.logoutGradient}
        >
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Вийти</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Футер */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Житомирська Політехніка</Text>
        <Text style={styles.footerSubtext}>© 2026 StudyHub</Text>
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
    paddingHorizontal: 20,
    marginBottom: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#2ecc71',
    borderWidth: 2,
    borderColor: '#1a1a2e',
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
    marginBottom: 12,
  },
  badge: {
    backgroundColor: 'rgba(233, 69, 96, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    color: '#e94560',
    fontWeight: '600',
  },
  badgeOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  badgeOutlineText: {
    color: '#888',
  },
  email: {
    fontSize: 12,
    color: '#888',
  },
  menuSection: {
    marginTop: 8,
  },
  settingsSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingIcon: {
    fontSize: 18,
  },
  settingText: {
    fontSize: 15,
    color: '#fff',
  },
  infoSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 8,
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
    color: '#e94560',
    fontWeight: '500',
  },
  infoArrow: {
    fontSize: 16,
    color: '#888',
  },
  logoutButton: {
    marginTop: 24,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
  },
  logoutIcon: {
    fontSize: 18,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e94560',
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