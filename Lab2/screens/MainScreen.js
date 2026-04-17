import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import NewsCard from '../components/NewsCard';

// Оновлені дані новин
const ALL_NEWS = [
  {
    id: '1',
    title: '🏆 Житомирська Політехніка — лідер IT-освіти 2026',
    description: 'Університет отримав національну премію "IT-вибір року" за підготовку висококваліфікованих фахівців у сфері програмування та штучного інтелекту.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
    category: '🇺🇦 Освіта',
    date: '16 квітня 2026',
    views: '2.8k',
    readTime: '4 хв',
  },
  {
    id: '2',
    title: '🚀 Відкриття Центру космічних технологій',
    description: 'У партнерстві з NASA та Держкосмосом відкрито сучасний центр для дослідження космосу та супутникових технологій.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    category: '🔬 Наука',
    date: '15 квітня 2026',
    views: '4.2k',
    readTime: '5 хв',
  },
  {
    id: '3',
    title: '💰 Стипендія 10 000 грн для кращих студентів',
    description: 'Запущено нову стипендіальну програму від IT-компаній-партнерів. Вимоги: середній бал 90+ та активна участь у наукових проєктах.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    category: '🎓 Стипендії',
    date: '14 квітня 2026',
    views: '5.7k',
    readTime: '3 хв',
  },
  {
    id: '4',
    title: '🎮 Кіберспортивна команда PoliTech перемогла на чемпіонаті',
    description: 'Збірна університету з CS2 та League of Legends здобула золото на Всеукраїнському кіберспортивному турнірі серед вишів.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
    category: '⚽ Спорт',
    date: '13 квітня 2026',
    views: '3.4k',
    readTime: '3 хв',
  },
  {
    id: '5',
    title: '🎨 Фестиваль "Студентська весна" — головна подія року',
    description: 'Талановиті студенти представлять свої номери у 10 жанрах: вокал, хореографія, театр, гумор та оригінальний жанр.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
    category: '🎭 Культура',
    date: '12 квітня 2026',
    views: '6.1k',
    readTime: '4 хв',
  },
  {
    id: '6',
    title: '💻 Хакатон AI Challenge: створи штучний інтелект майбутнього',
    description: 'Призовий фонд 100 000 грн. Запрошуємо розробників, дизайнерів та менеджерів для створення AI-рішень для бізнесу.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
    category: '🚀 Події',
    date: '11 квітня 2026',
    views: '7.8k',
    readTime: '6 хв',
  },
  {
    id: '7',
    title: '💼 Ярмарок кар\'єри 2026: топ-20 компаній',
    description: 'Google, Microsoft, SoftServe, EPAM та інші лідери ринку шукають стажерів та випускників. Приходь з резюме!',
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800',
    category: '💼 Кар\'єра',
    date: '10 квітня 2026',
    views: '9.2k',
    readTime: '5 хв',
  },
  {
    id: '8',
    title: '🤖 Робототехнічна лабораторія: новітнє обладнання',
    description: 'Промислові роботи, 3D-принтери, дрони та VR-шоломи — все це доступно для студентів інженерних спеціальностей.',
    image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800',
    category: '💻 Технології',
    date: '9 квітня 2026',
    views: '3.9k',
    readTime: '4 хв',
  },
  {
    id: '9',
    title: '🌍 Безкоштовне навчання в Європі: програма Erasmus+',
    description: 'Студенти отримають шанс навчатися семестр у Польщі, Німеччині або Чехії з повним покриттям витрат.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800',
    category: '🎓 Освіта',
    date: '8 квітня 2026',
    views: '4.5k',
    readTime: '5 хв',
  },
  {
    id: '10',
    title: '🏅 Випускник Політехніки — у списку Forbes 30 Under 30',
    description: 'Максим Коваленко, засновник AI-стартапу, потрапив до рейтингу найперспективніших молодих підприємців України.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800',
    category: '🚀 Події',
    date: '7 квітня 2026',
    views: '11.3k',
    readTime: '7 хв',
  },
];

const PAGE_SIZE = 5;

export default function MainScreen({ navigation }) {
  const [news, setNews] = useState(ALL_NEWS.slice(0, PAGE_SIZE));
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setNews(ALL_NEWS.slice(0, PAGE_SIZE));
      setPage(1);
      setHasMore(true);
      setRefreshing(false);
    }, 1000);
  }, []);

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const start = nextPage * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const newNews = ALL_NEWS.slice(start, end);
      
      if (newNews.length === 0) {
        setHasMore(false);
      } else {
        setNews(prev => [...prev, ...newNews]);
        setPage(nextPage);
      }
      setLoadingMore(false);
    }, 800);
  }, [loadingMore, hasMore, page]);

  const ListHeader = () => (
    <LinearGradient
      colors={['#1a1a2e', '#16213e']}
      style={styles.header}
    >
      <View style={styles.headerIconContainer}>
        <Text style={styles.headerEmoji}>📰</Text>
      </View>
      <Text style={styles.headerTitle}>Новини університету</Text>
      <Text style={styles.headerSubtitle}>
        {ALL_NEWS.length} актуальних подій · Оновлено сьогодні
      </Text>
      <View style={styles.headerStats}>
        <View style={styles.headerStat}>
          <Text style={styles.headerStatNumber}>10+</Text>
          <Text style={styles.headerStatLabel}>Категорій</Text>
        </View>
        <View style={styles.headerStatDivider} />
        <View style={styles.headerStat}>
          <Text style={styles.headerStatNumber}>15k+</Text>
          <Text style={styles.headerStatLabel}>Читачів</Text>
        </View>
        <View style={styles.headerStatDivider} />
        <View style={styles.headerStat}>
          <Text style={styles.headerStatNumber}>24/7</Text>
          <Text style={styles.headerStatLabel}>Оновлення</Text>
        </View>
      </View>
    </LinearGradient>
  );

  const ListFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#e94560" />
        <Text style={styles.footerText}>Завантаження новин...</Text>
      </View>
    );
  };

  const EmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>📭</Text>
      <Text style={styles.emptyTitle}>Немає новин</Text>
      <Text style={styles.emptyText}>Спробуйте оновити сторінку</Text>
    </View>
  );

  const handleNewsPress = (item) => {
    navigation.navigate('Details', { news: item });
  };

  return (
    <FlatList
      data={news}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <NewsCard item={item} onPress={() => handleNewsPress(item)} />
      )}
      ListHeaderComponent={ListHeader}
      ListFooterComponent={ListFooter}
      ListEmptyComponent={EmptyList}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh}
          tintColor="#e94560"
          colors={['#e94560']}
        />
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
      initialNumToRender={4}
      maxToRenderPerBatch={5}
      windowSize={8}
      removeClippedSubviews={true}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
    backgroundColor: '#0a0a0a',
  },
  header: {
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 8,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerIconContainer: {
    marginBottom: 12,
  },
  headerEmoji: {
    fontSize: 52,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#aaa',
    marginBottom: 20,
    textAlign: 'center',
  },
  headerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#2a2a3e',
  },
  headerStat: {
    alignItems: 'center',
  },
  headerStatNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e94560',
  },
  headerStatLabel: {
    fontSize: 11,
    color: '#888',
    marginTop: 4,
  },
  headerStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#2a2a3e',
  },
  footer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  footerText: {
    marginTop: 10,
    color: '#888',
    fontSize: 13,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#888',
  },
});