import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function DetailsScreen({ route, navigation }) {
  const { news } = route.params;
  const [isSaved, setIsSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(parseInt(news.views) || 128);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: news.title.length > 25 ? news.title.slice(0, 25) + '...' : news.title,
      headerBackTitle: 'Назад',
      headerStyle: {
        backgroundColor: '#1a1a2e',
      },
      headerTintColor: '#fff',
    });
  }, [navigation, news]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `📰 ${news.title}\n\n${news.description}\n\nДжерело: StudyHub - Житомирська Політехніка`,
        title: news.title,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
      setLiked(false);
    } else {
      setLikesCount(likesCount + 1);
      setLiked(true);
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    Alert.alert(
      isSaved ? '❌ Видалено зі збережених' : '✅ Збережено',
      isSaved 
        ? 'Новину видалено з вашого списку' 
        : 'Новину додано до збережених',
      [{ text: 'OK', style: 'cancel' }]
    );
  };

  const getCategoryColor = (category) => {
    const colors = {
      '🇺🇦 Освіта': '#4a90e2',
      '💻 Технології': '#e94560',
      '🔬 Наука': '#9b59b6',
      '⚽ Спорт': '#f39c12',
      '🎭 Культура': '#1abc9c',
      '🎓 Стипендії': '#2ecc71',
      '🚀 Події': '#e67e22',
      '💼 Кар\'єра': '#3498db',
    };
    return colors[category] || '#4a90e2';
  };

  const categoryColor = getCategoryColor(news.category);

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      bounces={true}
    >
      {/* Hero Image з градієнтом */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: news.image }} style={styles.image} />
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.85)']}
          style={styles.imageOverlay}
        />
        
        {/* Кнопки дій поверх зображення */}
        <View style={styles.imageActions}>
          <TouchableOpacity style={styles.imageActionBtn} onPress={handleShare}>
            <Text style={styles.imageActionIcon}>📤</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageActionBtn} onPress={handleSave}>
            <Text style={styles.imageActionIcon}>{isSaved ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>

        {/* Категорія та дата на зображенні */}
        <View style={styles.imageInfo}>
          <View style={[styles.categoryBadge, { backgroundColor: categoryColor }]}>
            <Text style={styles.categoryText}>{news.category}</Text>
          </View>
          <Text style={styles.imageDate}>📅 {news.date}</Text>
        </View>
      </View>

      {/* Контент */}
      <View style={styles.content}>
        <Text style={styles.title}>{news.title}</Text>

        {/* Статистика */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>👁️</Text>
            <Text style={styles.statText}>{likesCount} переглядів</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>⏱️</Text>
            <Text style={styles.statText}>{news.readTime || '3 хв'} читання</Text>
          </View>
          <View style={styles.statDivider} />
          <TouchableOpacity style={styles.statItem} onPress={handleLike}>
            <Text style={styles.statIcon}>{liked ? '❤️' : '🤍'}</Text>
            <Text style={[styles.statText, liked && styles.likedText]}>
              {liked ? 'Сподобалося' : 'Подобається'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Текст новини */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>📝 Опис</Text>
          <Text style={styles.description}>{news.description}</Text>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>📖 Детальніше</Text>
          <Text style={styles.description}>
            {news.description} 
            {'\n\n'}
            Додаткова інформація: За детальною інформацією звертайтеся до 
            навчального відділу або слідкуйте за оновленнями на офіційному 
            сайті університету. Слідкуйте за нашими соціальними мережами, 
            щоб не пропустити важливі анонси та події.
            {'\n\n'}
            Залишайте свої коментарі та запитання — ми завжди раді зворотному 
            зв'язку від студентів!
          </Text>
        </View>

        {/* Додаткова інформація */}
        <View style={styles.extraInfo}>
          <View style={styles.extraInfoItem}>
            <Text style={styles.extraInfoIcon}>🏷️</Text>
            <View>
              <Text style={styles.extraInfoLabel}>Категорія</Text>
              <Text style={styles.extraInfoValue}>{news.category}</Text>
            </View>
          </View>
          <View style={styles.extraInfoItem}>
            <Text style={styles.extraInfoIcon}>📅</Text>
            <View>
              <Text style={styles.extraInfoLabel}>Дата публікації</Text>
              <Text style={styles.extraInfoValue}>{news.date}</Text>
            </View>
          </View>
          <View style={styles.extraInfoItem}>
            <Text style={styles.extraInfoIcon}>👤</Text>
            <View>
              <Text style={styles.extraInfoLabel}>Джерело</Text>
              <Text style={styles.extraInfoValue}>StudyHub • Житомирська Політехніка</Text>
            </View>
          </View>
        </View>

        {/* Кнопки дій */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.actionButton, styles.shareButton]} onPress={handleShare}>
            <Text style={styles.actionButtonIcon}>📤</Text>
            <Text style={styles.actionButtonText}>Поділитися</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.saveButton]} onPress={handleSave}>
            <Text style={styles.actionButtonIcon}>{isSaved ? '❤️' : '🤍'}</Text>
            <Text style={styles.actionButtonText}>{isSaved ? 'Збережено' : 'Зберегти'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  imageContainer: {
    position: 'relative',
    height: 320,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imageActions: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    gap: 12,
  },
  imageActionBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  imageActionIcon: {
    fontSize: 22,
  },
  imageInfo: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 25,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  imageDate: {
    color: '#fff',
    fontSize: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    overflow: 'hidden',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 32,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a2e',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statIcon: {
    fontSize: 14,
  },
  statText: {
    fontSize: 12,
    color: '#aaa',
  },
  likedText: {
    color: '#e94560',
  },
  statDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#2a2a3e',
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#bbb',
    lineHeight: 24,
  },
  extraInfo: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    gap: 16,
  },
  extraInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  extraInfoIcon: {
    fontSize: 22,
  },
  extraInfoLabel: {
    fontSize: 11,
    color: '#888',
    marginBottom: 2,
  },
  extraInfoValue: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 40,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 30,
  },
  shareButton: {
    backgroundColor: '#1a1a2e',
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  saveButton: {
    backgroundColor: '#e94560',
  },
  actionButtonIcon: {
    fontSize: 18,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
});