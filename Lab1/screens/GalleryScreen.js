import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const images = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    title: 'Гірський пейзаж',
    author: 'Олександр К.',
    likes: 234,
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800',
    title: 'Собака на прогулянці',
    author: 'Марія С.',
    likes: 189,
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800',
    title: 'Червоні троянди',
    author: 'Анна В.',
    likes: 345,
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800',
    title: 'Сучасний робочий простір',
    author: 'Денис М.',
    likes: 156,
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800',
    title: 'Нічне місто',
    author: 'Журнал "Місто"',
    likes: 278,
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800',
    title: 'Музичний інструмент',
    author: 'Віталій П.',
    likes: 192,
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800',
    title: 'Ігрова консоль',
    author: 'TechReview',
    likes: 567,
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800',
    title: 'Захід сонця над морем',
    author: 'Максим Л.',
    likes: 423,
  },
  {
    id: '9',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
    title: 'Лісовий пейзаж',
    author: 'Ірина К.',
    likes: 312,
  },
  {
    id: '10',
    url: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800',
    title: 'Креативна студія',
    author: 'ArtSpace',
    likes: 198,
  },
];

export default function GalleryScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImagePress = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const ImageCard = ({ image }) => (
    <TouchableOpacity 
      style={styles.imageCard} 
      onPress={() => handleImagePress(image)}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: image.url }}
        style={styles.cardImage}
        contentFit="cover"
        transition={300}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.cardGradient}
      />
      <View style={styles.imageInfo}>
        <Text style={styles.imageTitle}>{image.title}</Text>
        <View style={styles.imageStats}>
          <Text style={styles.imageLikes}>❤️ {image.likes}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>📸</Text>
          <Text style={styles.title}>Фотогалерея</Text>
          <Text style={styles.subtitle}>{images.length} фото · Миттєвості життя</Text>
        </View>

        <View style={styles.gallery}>
          {images.map(image => (
            <ImageCard key={image.id} image={image} />
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity 
            style={styles.modalClose}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalCloseText}>✕</Text>
          </TouchableOpacity>
          
          {selectedImage && (
            <>
              <Image
                source={{ uri: selectedImage.url }}
                style={styles.modalImage}
                contentFit="contain"
              />
              <View style={styles.modalInfo}>
                <Text style={styles.modalTitle}>{selectedImage.title}</Text>
                <Text style={styles.modalAuthor}>📷 {selectedImage.author}</Text>
                <Text style={styles.modalLikes}>❤️ {selectedImage.likes} вподобань</Text>
              </View>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#1a1a2e',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3e',
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 13,
    color: '#888',
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 12,
  },
  imageCard: {
    width: (width - 36) / 2,
    height: 200,
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  imageInfo: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  imageTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  imageStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageLikes: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 11,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalClose: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalImage: {
    width: width - 40,
    height: height * 0.6,
    borderRadius: 12,
  },
  modalInfo: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalAuthor: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginBottom: 4,
  },
  modalLikes: {
    color: '#e94560',
    fontSize: 14,
  },
});