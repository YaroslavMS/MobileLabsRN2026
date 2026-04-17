import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const [mail, setMail] = useState('ipz222_myas@student.ztu.edu.ua');
  const [group, setGroup] = useState('ІПЗ 22-2');
  const [name, setName] = useState('Ярослав');
  const [surname, setSurname] = useState('Можаровський');
  const [phone, setPhone] = useState('+380 68 123 45 67');
  const [bio, setBio] = useState('Студент Житомирської Політехніки');

  const handleSave = () => {
    Alert.alert(
      '✅ Профіль оновлено',
      `Вітаємо, ${surname} ${name}!\n\nВаші дані успішно збережено.`,
      [{ text: 'Дякую', style: 'cancel' }]
    );
  };

  const InfoField = ({ label, value, onChangeText, placeholder, keyboardType = 'default' }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#666"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#0a0a0a', '#1a1a2e', '#16213e']}
        style={styles.headerGradient}
      >
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>ЯМ</Text>
          </View>
        </View>
        <Text style={styles.headerName}>{surname} {name}</Text>
        <Text style={styles.headerGroup}>{group}</Text>
      </LinearGradient>

      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>📋 Особиста інформація</Text>

        <InfoField
          label="Прізвище"
          value={surname}
          onChangeText={setSurname}
          placeholder="Ваше прізвище"
        />

        <InfoField
          label="Ім'я"
          value={name}
          onChangeText={setName}
          placeholder="Ваше ім'я"
        />

        <InfoField
          label="Група"
          value={group}
          onChangeText={setGroup}
          placeholder="Номер групи"
        />

        <InfoField
          label="Email"
          value={mail}
          onChangeText={setMail}
          placeholder="Електронна пошта"
          keyboardType="email-address"
        />

        <InfoField
          label="Телефон"
          value={phone}
          onChangeText={setPhone}
          placeholder="Номер телефону"
          keyboardType="phone-pad"
        />

        <InfoField
          label="Про себе"
          value={bio}
          onChangeText={setBio}
          placeholder="Короткий опис"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <LinearGradient
            colors={['#e94560', '#c73e54']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveButtonGradient}
          >
            <Text style={styles.saveButtonText}>💾 Зберегти зміни</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.footerNote}>
          <Text style={styles.footerNoteText}>Версія 2.0.0 • Dark Theme</Text>
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
  headerGradient: {
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(233, 69, 96, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#e94560',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#e94560',
  },
  headerName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerGroup: {
    fontSize: 14,
    color: '#aaa',
  },
  formContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#aaa',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#2a2a3e',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 15,
    backgroundColor: '#1a1a2e',
    color: '#fff',
  },
  saveButton: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerNote: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  footerNoteText: {
    fontSize: 12,
    color: '#666',
  },
});