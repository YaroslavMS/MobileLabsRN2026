import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GameProvider, GameContext } from './context/GameContext'; 
import GameScreen from './screens/GameScreen';
import TasksScreen from './screens/TasksScreen';
import SettingsScreen from './screens/SettingsScreen';
import DrawerContent from './components/DrawerContent';

const Drawer = createDrawerNavigator();

function MainApp() {
  const { settings } = useContext(GameContext);
  const isDark = settings.darkTheme;
  const headerBgColor = isDark ? '#0a0a0a' : '#0a0a2a';
  const mainBgColor = isDark ? '#0a0a0a' : '#f0f4ff';
  const textColor = isDark ? '#fff' : '#333';

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a2a" />
      
      <LinearGradient
        colors={isDark ? ['#0a0a0a', '#0a0a2a'] : ['#0a0a2a', '#1a1a4a']}
        style={styles.topAppHeader}
      >
        <Text style={styles.appTitleText}>⚛️ QuantumTap</Text>
        <Text style={styles.appSubtitle}>Торкнись квантової енергії</Text>
      </LinearGradient>

      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
          headerStyle: { 
            backgroundColor: headerBgColor, 
            elevation: 0, 
            shadowOpacity: 0,
          },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '600' },
          drawerStyle: { 
            backgroundColor: mainBgColor,
            width: 280,
          },
          drawerActiveTintColor: '#00d4ff',
          drawerInactiveTintColor: '#888',
          drawerLabelStyle: { fontSize: 16 },
        }}
      >
        <Drawer.Screen name="Game" component={GameScreen} options={{ title: '⚛️ Квантовий куб' }} />
        <Drawer.Screen name="Tasks" component={TasksScreen} options={{ title: '📡 Квантові завдання' }} />
        <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: '🔧 Налаштування' }} />
      </Drawer.Navigator>
      
      <View style={[styles.footer, { 
        backgroundColor: mainBgColor, 
        borderTopColor: isDark ? '#2a2a4a' : '#e0e4f0' 
      }]}>
        <Text style={[styles.footerText, { color: isDark ? '#666' : '#999' }]}>
          Ярослав Можаровський | ІПЗ 22-2
        </Text>
      </View>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GameProvider>
      <MainApp />
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  topAppHeader: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  appTitleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00d4ff',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 212, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  appSubtitle: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 4,
  },
  footer: {
    paddingVertical: 12,
    alignItems: 'center',
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
  },
});