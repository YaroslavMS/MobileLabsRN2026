import * as FileSystem from 'expo-file-system/legacy';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const formatBytes = (bytes) => {
  if (!bytes) return '0 MB';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};

export default function App() {
  const rootDir = FileSystem.documentDirectory;
  const [currentPath, setCurrentPath] = useState(rootDir);
  const [files, setFiles] = useState([]);
  const [stats, setStats] = useState({ total: 0, free: 0, used: 0 });
  const [searchQuery, setSearchQuery] = useState('');

  const [createModal, setCreateModal] = useState({ visible: false, type: 'file' });
  const [inputName, setInputName] = useState('');
  const [inputContent, setInputContent] = useState('');

  const [editorModal, setEditorModal] = useState({ visible: false, path: '', content: '', originalName: '' });
  const [infoModal, setInfoModal] = useState({ visible: false, data: null });

  useEffect(() => {
    if (currentPath) {
      loadStats();
      loadDirectory(currentPath);
    }
  }, [currentPath]);

  const loadStats = async () => {
    try {
      const free = await FileSystem.getFreeDiskStorageAsync();
      const total = await FileSystem.getTotalDiskCapacityAsync();
      const used = total - free;
      setStats({ total, free, used });
    } catch (e) {
      console.log('Помилка завантаження статистики', e);
    }
  };

  const loadDirectory = async (path) => {
    if (!path) return;
    try {
      const items = await FileSystem.readDirectoryAsync(path);
      const detailedItems = await Promise.all(
        items.map(async (item) => {
          const itemPath = path + item;
          const info = await FileSystem.getInfoAsync(itemPath);
          return { name: item, ...info };
        })
      );
      const sorted = detailedItems.sort((a, b) => {
        if (a.isDirectory === b.isDirectory) return a.name.localeCompare(b.name);
        return a.isDirectory ? -1 : 1;
      });
      setFiles(sorted);
    } catch (error) {
      Alert.alert("Помилка", "Не вдалося прочитати директорію");
    }
  };

  const handlePress = async (item) => {
    if (item.isDirectory) {
      setCurrentPath(currentPath + item.name + '/');
    } else if (item.name.endsWith('.txt')) {
      const content = await FileSystem.readAsStringAsync(currentPath + item.name);
      setEditorModal({ visible: true, path: currentPath + item.name, content, originalName: item.name });
    } else {
      Alert.alert("Інфо", "Цей тип файлу не підтримується для читання.");
    }
  };

  const goBack = () => {
    if (!currentPath || currentPath === rootDir) return;
    let newPath = currentPath;
    if (newPath.endsWith('/')) newPath = newPath.slice(0, -1);
    const lastSlashIndex = newPath.lastIndexOf('/');
    if (lastSlashIndex !== -1) {
      setCurrentPath(newPath.substring(0, lastSlashIndex + 1));
    } else {
      setCurrentPath(rootDir);
    }
  };

  const getDisplayPath = () => {
    if (!currentPath || !rootDir) return '/';
    return currentPath.replace(rootDir, '/') || '/';
  };

  const createItem = async () => {
    if (!inputName.trim()) {
      Alert.alert("Помилка", "Введіть назву");
      return;
    }
    const path = currentPath + inputName;
    try {
      if (createModal.type === 'folder') {
        await FileSystem.makeDirectoryAsync(path);
      } else {
        const fileName = inputName.endsWith('.txt') ? inputName : inputName + '.txt';
        await FileSystem.writeAsStringAsync(currentPath + fileName, inputContent || '');
      }
      setCreateModal({ visible: false, type: 'file' });
      setInputName('');
      setInputContent('');
      loadDirectory(currentPath);
    } catch (e) {
      Alert.alert("Помилка", "Не вдалося створити елемент");
    }
  };

  const saveFile = async () => {
    try {
      await FileSystem.writeAsStringAsync(editorModal.path, editorModal.content);
      setEditorModal({ visible: false, path: '', content: '', originalName: '' });
      Alert.alert("Успіх", "Файл збережено!");
      loadDirectory(currentPath);
    } catch (e) {
      Alert.alert("Помилка", "Не вдалося зберегти зміни");
    }
  };

  const confirmDelete = (name) => {
    Alert.alert("Підтвердження", `Видалити "${name}"?`, [
      { text: "Скасувати", style: "cancel" },
      { text: "Видалити", style: "destructive", onPress: () => deleteItem(name) }
    ]);
  };

  const deleteItem = async (name) => {
    try {
      await FileSystem.deleteAsync(currentPath + name, { idempotent: true });
      loadDirectory(currentPath);
    } catch (e) {
      Alert.alert("Помилка", "Не вдалося видалити елемент");
    }
  };

  const showInfo = async (name) => {
    try {
      const info = await FileSystem.getInfoAsync(currentPath + name);
      const ext = name.includes('.') ? name.split('.').pop() : 'немає';
      const date = new Date(info.modificationTime * 1000).toLocaleString('uk-UA');
      setInfoModal({
        visible: true,
        data: { 
          name, 
          type: info.isDirectory ? '📁 Папка' : `📄 Файл (.${ext})`, 
          size: formatBytes(info.size), 
          modDate: date,
          path: currentPath + name,
        }
      });
    } catch (e) {
      Alert.alert("Помилка", "Не вдалося отримати атрибути");
    }
  };

  const filteredFiles = files.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFileIcon = (item) => {
    if (item.isDirectory) return '📁';
    if (item.name.endsWith('.txt')) return '📄';
    if (item.name.endsWith('.jpg') || item.name.endsWith('.png')) return '🖼️';
    if (item.name.endsWith('.mp3')) return '🎵';
    if (item.name.endsWith('.mp4')) return '🎬';
    return '📎';
  };

  const usedPercent = (stats.used / stats.total) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0a0a2a', '#1a1a4a']}
        style={styles.header}
      >
        <Text style={styles.headerEmoji}>⚛️</Text>
        <Text style={styles.headerTitle}>QuantumExplorer</Text>
        <Text style={styles.headerSubtitle}>Квантовий файловий менеджер</Text>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Пошук файлів..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsHeader}>
          <Text style={styles.statsTitle}>💾 Сховище</Text>
          <Text style={styles.statsValue}>{formatBytes(stats.used)} / {formatBytes(stats.total)}</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${Math.min(usedPercent, 100)}%` }]} />
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>✅ Вільно: {formatBytes(stats.free)}</Text>
          <Text style={styles.statsLabel}>📦 Зайнято: {formatBytes(stats.used)}</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={[styles.btnCreate, styles.btnFolder]} onPress={() => setCreateModal({ visible: true, type: 'folder' })}>
          <Text style={styles.btnCreateIcon}>📁</Text>
          <Text style={styles.btnCreateText}>Нова папка</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnCreate, styles.btnFile]} onPress={() => setCreateModal({ visible: true, type: 'file' })}>
          <Text style={styles.btnCreateIcon}>📄</Text>
          <Text style={styles.btnCreateText}>Новий файл</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack} disabled={currentPath === rootDir}>
          <Text style={[styles.backBtnText, currentPath === rootDir && styles.backBtnDisabled]}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.breadcrumb} numberOfLines={1}>{getDisplayPath()}</Text>
      </View>
      <FlatList
        data={filteredFiles}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>📭</Text>
            <Text style={styles.emptyTitle}>Порожньо</Text>
            <Text style={styles.emptyText}>Немає файлів у цій папці</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.fileItem}>
            <TouchableOpacity style={styles.itemTouch} onPress={() => handlePress(item)}>
              <Text style={styles.itemIcon}>{getFileIcon(item)}</Text>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                {!item.isDirectory && (
                  <Text style={styles.itemSize}>{formatBytes(item.size)}</Text>
                )}
              </View>
            </TouchableOpacity>
            <View style={styles.itemActions}>
              <TouchableOpacity style={styles.actionBtn} onPress={() => showInfo(item.name)}>
                <Text style={styles.actionIcon}>ℹ️</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} onPress={() => confirmDelete(item.name)}>
                <Text style={styles.actionIcon}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Ярослав Можаровський | ІПЗ 22-2</Text>
      </View>

      <Modal visible={createModal.visible} animationType="fade" transparent>
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <LinearGradient
              colors={['#0a0a2a', '#1a1a4a']}
              style={styles.modalGradient}
            >
              <Text style={styles.modalTitle}>
                {createModal.type === 'folder' ? '📁 Нова папка' : '📄 Новий файл'}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Назва..."
                placeholderTextColor="#888"
                value={inputName}
                onChangeText={setInputName}
              />
              {createModal.type === 'file' && (
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Вміст файлу..."
                  placeholderTextColor="#888"
                  value={inputContent}
                  onChangeText={setInputContent}
                  multiline
                />
              )}
              <View style={styles.modalButtons}>
                <TouchableOpacity style={[styles.modalBtn, styles.modalBtnCancel]} onPress={() => setCreateModal({ visible: false, type: 'file' })}>
                  <Text style={styles.modalBtnCancelText}>Скасувати</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalBtn, styles.modalBtnCreate]} onPress={createItem}>
                  <Text style={styles.modalBtnCreateText}>Створити</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </View>
      </Modal>

      <Modal visible={editorModal.visible} animationType="slide">
        <SafeAreaView style={styles.editorContainer}>
          <LinearGradient
            colors={['#0a0a2a', '#1a1a4a']}
            style={styles.editorHeader}
          >
            <Text style={styles.editorTitle}>✏️ Редагування</Text>
            <Text style={styles.editorFileName}>{editorModal.originalName}</Text>
          </LinearGradient>
          <TextInput
            style={styles.editorInput}
            value={editorModal.content}
            onChangeText={(text) => setEditorModal({ ...editorModal, content: text })}
            multiline
            textAlignVertical="top"
            placeholder="Введіть текст..."
            placeholderTextColor="#888"
          />
          <View style={styles.editorButtons}>
            <TouchableOpacity style={[styles.editorBtn, styles.editorBtnCancel]} onPress={() => setEditorModal({ visible: false, path: '', content: '', originalName: '' })}>
              <Text style={styles.editorBtnCancelText}>Закрити</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.editorBtn, styles.editorBtnSave]} onPress={saveFile}>
              <Text style={styles.editorBtnSaveText}>💾 Зберегти</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      <Modal visible={infoModal.visible} animationType="fade" transparent>
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <LinearGradient
              colors={['#0a0a2a', '#1a1a4a']}
              style={styles.modalGradient}
            >
              <Text style={styles.modalTitle}>ℹ️ Властивості</Text>
              {infoModal.data && (
                <View style={styles.infoBlock}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Назва:</Text>
                    <Text style={styles.infoValue}>{infoModal.data.name}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Тип:</Text>
                    <Text style={styles.infoValue}>{infoModal.data.type}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Розмір:</Text>
                    <Text style={styles.infoValue}>{infoModal.data.size}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Змінено:</Text>
                    <Text style={styles.infoValue}>{infoModal.data.modDate}</Text>
                  </View>
                </View>
              )}
              <TouchableOpacity style={styles.infoBtn} onPress={() => setInfoModal({ visible: false, data: null })}>
                <Text style={styles.infoBtnText}>OK</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0a0a0a' 
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
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
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2a',
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 14,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
    color: '#888',
  },
  searchInput: {
    flex: 1,
    height: 46,
    color: '#fff',
    fontSize: 15,
  },
  clearIcon: {
    fontSize: 18,
    color: '#888',
    padding: 8,
  },
  statsContainer: {
    backgroundColor: '#1a1a2a',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00d4ff',
  },
  statsValue: {
    fontSize: 13,
    color: '#fff',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#2a2a4a',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00d4ff',
    borderRadius: 3,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsLabel: {
    fontSize: 12,
    color: '#888',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  btnCreate: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  btnFolder: {
    backgroundColor: 'rgba(0, 212, 255, 0.15)',
    borderWidth: 1,
    borderColor: '#00d4ff',
  },
  btnFile: {
    backgroundColor: 'rgba(46, 204, 113, 0.15)',
    borderWidth: 1,
    borderColor: '#2ecc71',
  },
  btnCreateIcon: {
    fontSize: 18,
  },
  btnCreateText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1a1a2a',
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  backBtn: {
    paddingRight: 12,
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00d4ff',
  },
  backBtnDisabled: {
    color: '#444',
  },
  breadcrumb: {
    flex: 1,
    fontSize: 12,
    color: '#888',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2a',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
  },
  itemTouch: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    fontSize: 28,
    marginRight: 14,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '500',
  },
  itemSize: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  itemActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    padding: 6,
  },
  actionIcon: {
    fontSize: 20,
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
  footer: {
    paddingVertical: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#2a2a4a',
    backgroundColor: '#0a0a0a',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
  },
  modalBg: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalCard: {
    margin: 20,
    borderRadius: 24,
    overflow: 'hidden',
  },
  modalGradient: {
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00d4ff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#2a2a4a',
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    color: '#fff',
    backgroundColor: '#1a1a2a',
    fontSize: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalBtnCancel: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  modalBtnCancelText: {
    color: '#aaa',
    fontSize: 15,
  },
  modalBtnCreate: {
    backgroundColor: '#00d4ff',
  },
  modalBtnCreateText: {
    color: '#0a0a2a',
    fontSize: 15,
    fontWeight: 'bold',
  },
  editorContainer: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  editorHeader: {
    padding: 20,
    alignItems: 'center',
  },
  editorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: 4,
  },
  editorFileName: {
    fontSize: 13,
    color: '#aaa',
  },
  editorInput: {
    flex: 1,
    backgroundColor: '#1a1a2a',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
  },
  editorButtons: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },
  editorBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  editorBtnCancel: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  editorBtnCancelText: {
    color: '#aaa',
    fontSize: 15,
  },
  editorBtnSave: {
    backgroundColor: '#00d4ff',
  },
  editorBtnSaveText: {
    color: '#0a0a2a',
    fontSize: 15,
    fontWeight: 'bold',
  },
  infoBlock: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a4a',
  },
  infoLabel: {
    width: 80,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00d4ff',
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: '#fff',
  },
  infoBtn: {
    backgroundColor: '#00d4ff',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  infoBtnText: {
    color: '#0a0a2a',
    fontSize: 16,
    fontWeight: 'bold',
  },
});