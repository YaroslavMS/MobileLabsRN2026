import React, { useContext } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GameContext } from '../context/GameContext';

export default function SettingsScreen() {
  const { settings, toggleSetting, resetGame, score } = useContext(GameContext);
  const isDark = settings.darkTheme;

  const handleReset = () => {
    Alert.alert(
      "⚛️ Скидання квантового поля", 
      "Вся накопичена енергія буде втрачена. Продовжити?", 
      [
        { text: "Скасувати", style: "cancel" },
        { text: "Скинути", style: "destructive", onPress: resetGame }
      ]
    );
  };

  const bgColor = isDark ? '#0a0a0a' : '#f0f4ff';
  const cardBg = isDark ? '#1a1a2a' : '#fff';
  const textColor = isDark ? '#fff' : '#333';

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <LinearGradient
        colors={['#0a0a2a', '#1a1a4a']}
        style={styles.header}
      >
        <Text style={styles.headerEmoji}>🔧</Text>
        <Text style={styles.headerTitle}>Налаштування</Text>
        <Text style={styles.headerSubtitle}>Керування квантовим полем</Text>
      </LinearGradient>

      <View style={[styles.section, { backgroundColor: cardBg }]}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>🎮 Взаємодія</Text>
        
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowIcon}>📳</Text>
            <Text style={[styles.rowText, { color: textColor }]}>Квантова вібрація</Text>
          </View>
          <Switch 
            value={settings.vibration} 
            onValueChange={() => toggleSetting('vibration')} 
            trackColor={{ false: '#2a2a4a', true: '#00d4ff' }}
            thumbColor={settings.vibration ? '#fff' : '#888'}
          />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: cardBg }]}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>🎨 Інтерфейс</Text>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowIcon}>🌙</Text>
            <Text style={[styles.rowText, { color: textColor }]}>Темний режим</Text>
          </View>
          <Switch 
            value={settings.darkTheme} 
            onValueChange={() => toggleSetting('darkTheme')} 
            trackColor={{ false: '#2a2a4a', true: '#00d4ff' }}
            thumbColor={settings.darkTheme ? '#fff' : '#888'}
          />
        </View>
      </View>

      <TouchableOpacity style={[styles.resetBtn, { backgroundColor: cardBg }]} onPress={handleReset}>
        <Text style={styles.resetIcon}>⚛️</Text>
        <Text style={styles.resetBtnText}>Скинути квантове поле</Text>
        <Text style={styles.resetScore}>Енергія: {score}</Text>
      </TouchableOpacity>

      <View style={styles.footerInfo}>
        <Text style={styles.version}>QuantumTap v2.0.0</Text>
        <Text style={styles.dev}>Ярослав Можаровський | ІПЗ 22-2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  header: {
    paddingVertical: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#aaa',
  },
  section: {
    marginHorizontal: 16,
    marginTop: 20,
    padding: 18,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 8,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowIcon: {
    fontSize: 20,
  },
  rowText: { 
    fontSize: 15,
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginHorizontal: 16,
    marginTop: 30,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#00d4ff',
  },
  resetIcon: {
    fontSize: 18,
  },
  resetBtnText: { 
    color: '#00d4ff', 
    fontWeight: 'bold',
    fontSize: 15,
  },
  resetScore: {
    color: '#888',
    fontSize: 12,
    marginLeft: 'auto',
  },
  footerInfo: { 
    marginTop: 'auto', 
    alignItems: 'center', 
    paddingVertical: 30,
  },
  version: { 
    color: '#888', 
    fontSize: 12,
  },
  dev: { 
    color: '#666', 
    fontSize: 11, 
    marginTop: 4,
  },
});