import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GameContext } from '../context/GameContext';

const { width } = Dimensions.get('window');

export default function TasksScreen() {
  const { score, stats, settings } = useContext(GameContext);
  const bgColor = settings.darkTheme ? '#0a0a0a' : '#f0f4ff';
  const textColor = settings.darkTheme ? '#fff' : '#333';
  const cardBg = settings.darkTheme ? '#1a1a2a' : '#fff';

  const tasks = [
    { id: '1', title: 'Квантовий новачок', desc: 'Здійснити 10 торкань', goal: 10, current: stats.clicks, icon: '⚛️' },
    { id: '2', title: 'Подвійний резонанс', desc: 'Виконати 5 подвійних квантів', goal: 5, current: stats.doubleClicks, icon: '✨' },
    { id: '3', title: 'Імпульсний удар', desc: 'Виконати 3 квантові імпульси', goal: 3, current: stats.longPresses, icon: '💫' },
    { id: '4', title: 'Розтягнення простору', desc: 'Розтягнути куб 5 разів', goal: 5, current: stats.pinches, icon: '🔮' },
    { id: '5', title: 'Хвильовий зсув', desc: 'Зробити свайп 3 рази', goal: 3, current: stats.swipes, icon: '🌊' },
    { id: '6', title: 'Просвітлення', desc: 'Накопичити 1000 одиниць енергії', goal: 1000, current: score, icon: '⭐' },
  ];

  const getProgressPercent = (current, goal) => {
    return Math.min((current / goal) * 100, 100);
  };

  const completedCount = tasks.filter(t => t.current >= t.goal).length;

  const renderItem = ({ item }) => {
    const isDone = item.current >= item.goal;
    const progress = getProgressPercent(item.current, item.goal);

    return (
      <View style={[styles.card, { backgroundColor: cardBg }, isDone && styles.cardDone]}>
        <View style={styles.cardHeader}>
          <Text style={styles.icon}>{item.icon}</Text>
          <View style={styles.textContainer}>
            <Text style={[styles.taskTitle, { color: textColor }]}>{item.title}</Text>
            <Text style={[styles.taskDesc, { color: textColor }]}>{item.desc}</Text>
          </View>
          <View style={[styles.statusBadge, isDone && styles.statusBadgeDone]}>
            <Text style={styles.statusText}>
              {isDone ? '✅' : `${item.current}/${item.goal}`}
            </Text>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBg}>
            <LinearGradient
              colors={isDone ? ['#2ecc71', '#27ae60'] : ['#00d4ff', '#0099cc']}
              style={[styles.progressFill, { width: `${progress}%` }]}
            />
          </View>
          <Text style={styles.progressText}>{Math.round(progress)}%</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <LinearGradient
        colors={['#0a0a2a', '#1a1a4a']}
        style={styles.header}
      >
        <Text style={styles.headerEmoji}>📡</Text>
        <Text style={styles.headerTitle}>Квантові завдання</Text>
        <Text style={styles.headerSubtitle}>
          Виконано {completedCount} з {tasks.length}
        </Text>
      </LinearGradient>

      <FlatList 
        data={tasks} 
        keyExtractor={(i) => i.id} 
        renderItem={renderItem} 
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
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
  list: { 
    paddingHorizontal: 16, 
    paddingTop: 16,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardDone: { 
    borderLeftWidth: 4,
    borderLeftColor: '#2ecc71',
  },
  cardHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  icon: { 
    fontSize: 32, 
    marginRight: 14 
  },
  textContainer: { 
    flex: 1 
  },
  taskTitle: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  taskDesc: { 
    fontSize: 12, 
    marginTop: 2,
    opacity: 0.7,
  },
  statusBadge: {
    backgroundColor: 'rgba(0, 212, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusBadgeDone: {
    backgroundColor: 'rgba(46, 204, 113, 0.15)',
  },
  statusText: { 
    fontWeight: 'bold', 
    color: '#00d4ff',
    fontSize: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressBg: { 
    flex: 1,
    height: 8, 
    backgroundColor: '#2a2a4a', 
    borderRadius: 4, 
    overflow: 'hidden' 
  },
  progressFill: { 
    height: '100%', 
    borderRadius: 4,
  },
  progressText: {
    fontSize: 11,
    color: '#888',
    minWidth: 40,
    textAlign: 'right',
  },
});