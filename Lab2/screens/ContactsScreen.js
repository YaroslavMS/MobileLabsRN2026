import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const contactsData = [
  {
    title: '👨‍🏫 Викладачі кафедри',
    icon: '📚',
    data: [
      { 
        id: '1', 
        name: 'Проф. Жмишенко Валерій Альбертович', 
        role: 'Завідувач кафедри ІПЗ', 
        phone: '+380 (67) 123-45-67', 
        email: 'ivanenko@ztu.edu.ua',
        cabinet: 'А-318',
        hours: 'Пн, Ср 14:00-16:00',
      },
      { 
        id: '2', 
        name: 'Доц. Петренко Петер Пьотрич', 
        role: 'Лектор з програмування', 
        phone: '+380 (67) 123-45-68', 
        email: 'petrenko@ztu.edu.ua',
        cabinet: 'А-205',
        hours: 'Вт, Чт 13:00-15:00',
      },
      { 
        id: '3', 
        name: 'Ст. викл. Сидоренко Сидора Олегівна', 
        role: 'Практик з Web-технологій', 
        phone: '+380 (67) 123-45-69', 
        email: 'sydorenko@ztu.edu.ua',
        cabinet: 'А-210',
        hours: 'Пн, Ср 12:00-14:00',
      },
      { 
        id: '4', 
        name: 'Доц. Коваленко Коваль Ковальській', 
        role: 'Бази даних та SQL', 
        phone: '+380 (67) 123-45-70', 
        email: 'kovalenko@ztu.edu.ua',
        cabinet: 'А-312',
        hours: 'Вт, Чт 15:00-17:00',
      },
    ],
  },
  {
    title: '🏛️ Адміністрація факультету',
    icon: '📋',
    data: [
      { 
        id: '5', 
        name: 'Коваленко Тетяна Михайлівна', 
        role: 'Декан факультету', 
        phone: '+380 (67) 123-45-71', 
        email: 't.kovalenko@ztu.edu.ua',
        cabinet: 'А-101',
        hours: 'Пн-Пт 10:00-17:00',
      },
      { 
        id: '6', 
        name: 'Шевченко Людмила Володимирівна', 
        role: 'Заступник декана', 
        phone: '+380 (67) 123-45-72', 
        email: 'l.shevchenko@ztu.edu.ua',
        cabinet: 'А-102',
        hours: 'Пн-Ср 09:00-15:00',
      },
    ],
  },
  {
    title: '👥 Студентське самоврядування',
    icon: '🎓',
    data: [
      { 
        id: '7', 
        name: 'Бондар Артем Сергійович', 
        role: 'Голова студентської ради', 
        phone: '+380 (67) 123-45-73', 
        email: 'a.bondar@student.ztu.edu.ua',
        cabinet: 'С-001',
        hours: 'Пн, Ср 11:00-13:00',
      },
      { 
        id: '8', 
        name: 'Мороз Катерина Дмитрівна', 
        role: 'Заступник голови', 
        phone: '+380 (67) 123-45-74', 
        email: 'k.moroz@student.ztu.edu.ua',
        cabinet: 'С-002',
        hours: 'Вт, Чт 12:00-14:00',
      },
      { 
        id: '9', 
        name: 'Лисенко Дмитро Олегович', 
        role: 'Культурно-масовий сектор', 
        phone: '+380 (67) 123-45-75', 
        email: 'd.lysenko@student.ztu.edu.ua',
        cabinet: 'С-003',
        hours: 'Пт 14:00-16:00',
      },
    ],
  },
  {
    title: '🛠️ Служби підтримки',
    icon: '🔧',
    data: [
      { 
        id: '10', 
        name: 'IT-підтримка', 
        role: 'Технічна допомога студентам', 
        phone: '+380 (67) 123-45-76', 
        email: 'support@ztu.edu.ua',
        cabinet: 'Б-001',
        hours: 'Цілодобово',
      },
      { 
        id: '11', 
        name: 'Бібліотека', 
        role: 'Читальний зал та абонемент', 
        phone: '+380 (67) 123-45-77', 
        email: 'library@ztu.edu.ua',
        cabinet: 'Г-101',
        hours: 'Пн-Пт 09:00-19:00',
      },
      { 
        id: '12', 
        name: 'Гуртожиток', 
        role: 'Комендант гуртожитку', 
        phone: '+380 (67) 123-45-78', 
        email: 'dorm@ztu.edu.ua',
        cabinet: 'Гурт. №1',
        hours: 'Пн-Пт 10:00-18:00',
      },
    ],
  },
];

const ContactItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.contactItem} onPress={() => onPress(item)} activeOpacity={0.7}>
      <View style={styles.avatarContainer}>
        <LinearGradient
          colors={['#e94560', '#c73e54']}
          style={styles.avatarGradient}
        >
          <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
        </LinearGradient>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactRole}>{item.role}</Text>
        <View style={styles.contactMeta}>
          <Text style={styles.contactMetaText}>📞 {item.phone}</Text>
          <Text style={styles.contactMetaText}>📧 {item.email}</Text>
        </View>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
};

const SectionHeader = ({ section }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionIcon}>{section.icon}</Text>
    <Text style={styles.sectionHeaderText}>{section.title}</Text>
    <Text style={styles.sectionCount}>{section.data.length}</Text>
  </View>
);

const ItemSeparator = () => <View style={styles.separator} />;

export default function ContactsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(contactsData);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredData(contactsData);
    } else {
      const filtered = contactsData
        .map(section => ({
          ...section,
          data: section.data.filter(item =>
            item.name.toLowerCase().includes(text.toLowerCase()) ||
            item.role.toLowerCase().includes(text.toLowerCase()) ||
            item.email.toLowerCase().includes(text.toLowerCase())
          ),
        }))
        .filter(section => section.data.length > 0);
      setFilteredData(filtered);
    }
  };

  const handleContactPress = (contact) => {
    Alert.alert(
      contact.name,
      `📌 Посада: ${contact.role}\n\n📞 Телефон: ${contact.phone}\n📧 Email: ${contact.email}\n📍 Кабінет: ${contact.cabinet}\n🕒 Прийом: ${contact.hours}`,
      [
        { text: 'Скасувати', style: 'cancel' },
        { 
          text: '📞 Зателефонувати', 
          onPress: () => console.log('Дзвінок:', contact.phone),
        },
        { 
          text: '✉️ Написати', 
          onPress: () => console.log('Email:', contact.email),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e']}
        style={styles.header}
      >
        <Text style={styles.headerEmoji}>📞</Text>
        <Text style={styles.headerTitle}>Контакти</Text>
        <Text style={styles.headerSubtitle}>
          {contactsData.reduce((acc, sec) => acc + sec.data.length, 0)} контактів · Зв'язок з університетом
        </Text>
      </LinearGradient>
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Пошук контактів..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      {filteredData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🔍</Text>
          <Text style={styles.emptyTitle}>Нічого не знайдено</Text>
          <Text style={styles.emptyText}>Спробуйте змінити пошуковий запит</Text>
        </View>
      ) : (
        <SectionList
          sections={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ContactItem item={item} onPress={handleContactPress} />
          )}
          renderSectionHeader={SectionHeader}
          ItemSeparatorComponent={ItemSeparator}
          stickySectionHeadersEnabled={true}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    paddingVertical: 28,
    paddingHorizontal: 20,
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
    color: '#fff',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#aaa',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 14,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
    color: '#888',
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: '#fff',
    fontSize: 15,
  },
  clearIcon: {
    fontSize: 18,
    color: '#888',
    padding: 8,
  },
  listContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213e',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 12,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  sectionIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  sectionHeaderText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionCount: {
    fontSize: 13,
    color: '#e94560',
    fontWeight: '600',
    backgroundColor: 'rgba(233, 69, 96, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  avatarContainer: {
    marginRight: 14,
  },
  avatarGradient: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  contactRole: {
    fontSize: 13,
    color: '#aaa',
    marginBottom: 6,
  },
  contactMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  contactMetaText: {
    fontSize: 11,
    color: '#888',
  },
  arrow: {
    fontSize: 24,
    color: '#e94560',
    marginLeft: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#2a2a3e',
    marginHorizontal: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
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