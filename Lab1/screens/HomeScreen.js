import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const newsData = [
  {
    id: '1',
    title: '🔥 Житомирська Політехніка увійшла до ТОП-10 найкращих IT-вишів України',
    description: 'За версією міжнародного рейтингу Webometrics, наш університет посів 8 місце серед закладів вищої освіти України у сфері інформаційних технологій.',
    date: '16 квітня 2026',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
    category: 'Досягнення',
    readTime: '4 хв',
    views: '2.5k',
  },
  {
    id: '2',
    title: '💻 Безкоштовний курс з Python від Google для студентів',
    description: 'Стартує реєстрація на безкоштовний онлайн-курс з програмування на Python. Усі студенти отримають сертифікати після завершення.',
    date: '15 квітня 2026',
    imageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800',
    category: 'Навчання',
    readTime: '3 хв',
    views: '3.1k',
  },
  {
    id: '3',
    title: '🏆 Студентка Політехніки перемогла на Всеукраїнській олімпіаді з математики',
    description: 'Вітаємо Анну Коваленко з І курсу, яка здобула золото на престижній олімпіаді серед 200 учасників з усієї України.',
    date: '14 квітня 2026',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
    category: 'Досягнення',
    readTime: '2 хв',
    views: '1.8k',
  },
  {
    id: '4',
    title: '🚀 Стартап-вікенд: генеруй ідеї та вигравай гранти',
    description: 'Запрошуємо студентів на 48-годинний марафон розробки стартапів. Переможці отримають фінансування своїх проєктів до 50 000 грн.',
    date: '12 квітня 2026',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
    category: 'Події',
    readTime: '5 хв',
    views: '4.2k',
  },
  {
    id: '5',
    title: '🌍 Міжнародне стажування в Польщі: як подати заявку',
    description: 'Відкрито набір студентів на семестрове навчання за обміном у Люблінському університеті. Стипендія покриває проживання та харчування.',
    date: '10 квітня 2026',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800',
    category: 'Можливості',
    readTime: '6 хв',
    views: '5.3k',
  },
  {
    id: '6',
    title: '⚡ Відкриття лабораторії робототехніки за підтримки Tesla',
    description: 'У головному корпусі запрацювала сучасна лабораторія з 3D-принтерами, дронами та промисловими роботами. Запрошуємо всіх бажаючих!',
    date: '8 квітня 2026',
    imageUrl: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800',
    category: 'Інновації',
    readTime: '4 хв',
    views: '6.7k',
  },
  {
    id: '7',
    title: '🎓 День відкритих дверей онлайн: знайомство з факультетами',
    description: '23 квітня о 12:00 відбудеться пряма трансляція для абітурієнтів. Ви зможете поставити питання деканам та викладачам.',
    date: '5 квітня 2026',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
    category: 'Для вступників',
    readTime: '3 хв',
    views: '2.9k',
  },
  {
    id: '8',
    title: '🎮 Кіберспортивний турнір League of Legends серед студентів',
    description: 'Команда Політехніки запрошує гравців до участі у міжвузівському чемпіонаті. Призовий фонд — 30 000 грн.',
    date: '3 квітня 2026',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
    category: 'Спорт',
    readTime: '2 хв',
    views: '2.1k',
  },
  {
    id: '9',
    title: '📚 Нова бібліотека з 24/7 доступом: тепер можна вчитися цілодобово',
    description: 'У навчальному корпусі №3 відкрито сучасний читальний зал з безкоштовним Wi-Fi, кавомашиною та зонами для групової роботи.',
    date: '1 квітня 2026',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800',
    category: 'Інфраструктура',
    readTime: '3 хв',
    views: '3.4k',
  },
  {
    id: '10',
    title: '💡 Грант на власний стартап: історія успіху випускника',
    description: 'Наш випускник Дмитро Шевченко отримав $50 000 на розвиток свого AI-проєкту. Ділимося досвідом та корисними порадами.',
    date: '29 березня 2026',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800',
    category: 'Успіхи',
    readTime: '7 хв',
    views: '8.9k',
  },
];

const getCategoryColor = (category) => {
  const colors = {
    'Досягнення': '#e94560',
    'Навчання': '#4a90e2',
    'Події': '#f39c12',
    'Можливості': '#2ecc71',
    'Інновації': '#9b59b6',
    'Для вступників': '#1abc9c',
    'Спорт': '#e67e22',
    'Інфраструктура': '#3498db',
    'Успіхи': '#e74c3c',
  };
  return colors[category] || '#4a90e2';
};

const formatNumber = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num;
};

const HomeScreen = () => {
  const handleNewsPress = (news) => {
    Alert.alert(
      news.title,
      `${news.description}\n\n📅 ${news.date}\n🏷️ ${news.category}\n⏱️ Читання: ${news.readTime}\n👁️ Переглядів: ${news.views}`,
      [
        { text: 'Закрити', style: 'cancel' },
        { text: 'Читати далі', onPress: () => console.log('Читаємо:', news.title) }
      ]
    );
  };

  const NewsCard = ({ item }) => (
    <TouchableOpacity onPress={() => handleNewsPress(item)} activeOpacity={0.9}>
      <View style={styles.card}>
        <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.imageGradient}
        />
        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) }]}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.cardFooter}>
            <View style={styles.leftFooter}>
              <Text style={styles.dateIcon}>📅</Text>
              <Text style={styles.cardDate}>{item.date}</Text>
            </View>
            <View style={styles.rightFooter}>
              <View style={styles.viewsContainer}>
                <Text style={styles.viewsIcon}>👁️</Text>
                <Text style={styles.viewsText}>{item.views}</Text>
              </View>
              <View style={styles.readTimeContainer}>
                <Text style={styles.readTimeIcon}>⏱️</Text>
                <Text style={styles.readTime}>{item.readTime}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.welcomeHeader}>
        <Text style={styles.welcomeEmoji}>🎓</Text>
        <Text style={styles.welcomeTitle}>Студентські новини</Text>
        <Text style={styles.welcomeSubtitle}>
          Актуальні події, можливості та досягнення Житомирської Політехніки
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>10+</Text>
            <Text style={styles.statLabel}>Новин</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5k+</Text>
            <Text style={styles.statLabel}>Читачів</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24/7</Text>
            <Text style={styles.statLabel}>Оновлення</Text>
          </View>
        </View>
      </View>

      <View style={styles.newsList}>
        {newsData.map(item => (
          <NewsCard key={item.id} item={item} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  welcomeHeader: {
    backgroundColor: '#1a1a2e',
    padding: 25,
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3e',
  },
  welcomeEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#2a2a3e',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e94560',
  },
  statLabel: {
    fontSize: 11,
    color: '#888',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#2a2a3e',
  },
  newsList: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  imageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  categoryBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    lineHeight: 24,
  },
  cardDescription: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  leftFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dateIcon: {
    fontSize: 11,
    marginRight: 4,
  },
  cardDate: {
    fontSize: 11,
    color: '#888',
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewsIcon: {
    fontSize: 11,
    marginRight: 4,
  },
  viewsText: {
    fontSize: 11,
    color: '#888',
  },
  readTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readTimeIcon: {
    fontSize: 11,
    marginRight: 4,
  },
  readTime: {
    fontSize: 11,
    color: '#888',
  },
});

export default HomeScreen;