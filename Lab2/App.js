import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import MainScreen from './screens/MainScreen';
import DetailsScreen from './screens/DetailsScreen';
import ContactsScreen from './screens/ContactsScreen';
import DrawerContent from './components/DrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function NewsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1a1a2e' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="Main" 
        component={MainScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen} 
        options={{ 
          title: 'Деталі',
          headerBackTitle: 'Назад',
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      
      <LinearGradient
        colors={['#0a0a0a', '#1a1a2e']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.topAppHeader}
      >
        <Text style={styles.appTitleText}>🎓 StudyHub</Text>
        <Text style={styles.appSubtitle}>Житомирська Політехніка</Text>
      </LinearGradient>

      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
          headerStyle: { 
            backgroundColor: '#1a1a2e',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '600' },
          drawerStyle: { 
            width: 280,
            backgroundColor: '#1a1a2e',
          },
          drawerActiveTintColor: '#e94560',
          drawerInactiveTintColor: '#888',
          drawerLabelStyle: { fontSize: 16 },
        }}
      >
        <Drawer.Screen 
          name="News" 
          component={NewsStackNavigator} 
          options={{ title: '📰 Новини' }}
        />
        <Drawer.Screen 
          name="Contacts" 
          component={ContactsScreen} 
          options={{ title: '📞 Контакти' }}
        />
      </Drawer.Navigator>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Ярослав Можаровський | ІПЗ 22-2</Text>
      </View>
    </NavigationContainer>
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
    color: '#fff',
    letterSpacing: 1,
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
    borderTopColor: '#2a2a3e',
    backgroundColor: '#0a0a0a',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});