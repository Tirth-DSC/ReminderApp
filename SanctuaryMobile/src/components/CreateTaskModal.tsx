import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import { X, Calendar, Clock, Tag, Flag } from 'lucide-react-native';
import { theme } from '../constants/theme';
import { Category, Task } from '../types';

interface CreateTaskModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id' | 'completed'>) => void;
}

const CATEGORIES: Category[] = ['Strategy', 'Personal', 'Wellness', 'Creative', 'Work'];

export default function CreateTaskModal({ isVisible, onClose, onSave }: CreateTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('Work');
  const [priority, setPriority] = useState(false);
  const [time, setTime] = useState('09:00 AM');

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({
      title,
      description,
      category,
      priority,
      time,
      date: 'Today',
    });
    reset();
    onClose();
  };

  const reset = () => {
    setTitle('');
    setDescription('');
    setCategory('Work');
    setPriority(false);
    setTime('09:00 AM');
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
      avoidKeyboard
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.title}>New Intent</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={theme.colors.onSurface} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <TextInput
            placeholder="What is your focus?"
            style={styles.inputTitle}
            value={title}
            onChangeText={setTitle}
            placeholderTextColor={theme.colors.outlineVariant}
            autoFocus
          />

          <TextInput
            placeholder="Add some context (optional)..."
            style={styles.inputDesc}
            value={description}
            onChangeText={setDescription}
            placeholderTextColor={theme.colors.outlineVariant}
            multiline
          />

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setCategory(cat)}
                  style={[styles.chip, category === cat && styles.chipActive]}
                >
                  <Text style={[styles.chipText, category === cat && styles.chipTextActive]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.optionsRow}>
            <TouchableOpacity 
              style={[styles.option, priority && styles.optionActive]} 
              onPress={() => setPriority(!priority)}
            >
              <Flag size={20} color={priority ? 'white' : theme.colors.secondary} />
              <Text style={[styles.optionText, priority && styles.optionTextActive]}>High Priority</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
              <Clock size={20} color={theme.colors.secondary} />
              <Text style={styles.optionText}>{time}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Create Task</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: { justifyContent: 'flex-end', margin: 0 },
  container: { backgroundColor: 'white', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, minHeight: '60%' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 24, fontWeight: '900', color: theme.colors.onSurface, letterSpacing: -1 },
  closeButton: { padding: 8, borderRadius: 20, backgroundColor: theme.colors.surfaceContainerLow },
  inputTitle: { fontSize: 28, fontWeight: '800', color: theme.colors.onSurface, marginBottom: 12 },
  inputDesc: { fontSize: 16, color: theme.colors.onSurfaceVariant, marginBottom: 32, minHeight: 60, textAlignVertical: 'top' },
  section: { marginBottom: 24 },
  sectionLabel: { fontSize: 12, fontWeight: '700', color: theme.colors.secondary, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 },
  chipRow: { gap: 12 },
  chip: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: theme.colors.surfaceContainerLow },
  chipActive: { backgroundColor: theme.colors.primary },
  chipText: { fontSize: 14, fontWeight: '700', color: theme.colors.onSurfaceVariant },
  chipTextActive: { color: 'white' },
  optionsRow: { flexDirection: 'row', gap: 12, marginBottom: 32 },
  option: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, padding: 16, borderRadius: 20, backgroundColor: theme.colors.surfaceContainerLow },
  optionActive: { backgroundColor: theme.colors.tertiary },
  optionText: { fontSize: 14, fontWeight: '700', color: theme.colors.onSurfaceVariant },
  optionTextActive: { color: 'white' },
  saveButton: { backgroundColor: theme.colors.primary, height: 64, borderRadius: 24, alignItems: 'center', justifyContent: 'center', shadowColor: theme.colors.primary, shadowOpacity: 0.3, shadowRadius: 15, elevation: 8 },
  saveButtonText: { color: 'white', fontSize: 18, fontWeight: '800' }
});
