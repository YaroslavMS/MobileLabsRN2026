import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import HomeScreen from './screens/HomeScreen';
import GalleryScreen from './screens/GalleryScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#0a0a0a', '#1a1a2e', '#16213e']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>🌙 ZhytomyrApp</Text>
            <Text style={styles.headerSubtitle}>Житомирська Політехніка</Text>
          </View>
        </LinearGradient>

        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarLabelStyle: { 
                fontSize: 13, 
                fontWeight: '600',
                letterSpacing: 0.5,
              },
              tabBarIndicatorStyle: { 
                backgroundColor: '#e94560', 
                height: 3,
                borderRadius: 3,
              },
              tabBarActiveTintColor: '#e94560',
              tabBarInactiveTintColor: '#666',
              tabBarStyle: { 
                backgroundColor: '#1a1a2e', 
                elevation: 0, 
                shadowOpacity: 0,
                borderBottomWidth: 1,
                borderBottomColor: '#2a2a3e',
              },
            }}
          >
            <Tab.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ title: '🏠 Новини' }}
            />
            <Tab.Screen 
              name="Gallery" 
              component={GalleryScreen} 
              options={{ title: '🖼️ Галерея' }}
            />
            <Tab.Screen 
              name="Profile" 
              component={ProfileScreen} 
              options={{ title: '👤 Профіль' }}
            />
          </Tab.Navigator>
        </NavigationContainer>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Ярослав Можаровський | ІПЗ 22-2</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  headerGradient: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerContent: {
    paddingTop: 55,
    paddingBottom: 25,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 5,
    textAlign: 'left',
  },
  footer: {
    paddingVertical: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#2a2a3e',
    backgroundColor: '#1a1a2e',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});