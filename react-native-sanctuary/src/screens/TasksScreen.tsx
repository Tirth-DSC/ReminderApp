import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { theme } from '../constants/theme';
import TaskItem from '../components/TaskItem';
import { Task } from '../types';

interface TasksScreenProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
}

export default function TasksScreen({ tasks, onToggleTask }: TasksScreenProps) {
  const [query, setQuery] = useState('');
  const activeTasks = tasks.filter(t => !t.completed && t.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.dateText}>Your Focus</Text>
        <View style={styles.statsRow}>
          <Text style={styles.statsNumber}>
            {activeTasks.length < 10 ? `0${activeTasks.length}` : activeTasks.length}
          </Text>
          <Text style={styles.statsLabelLarge}>Active Tasks</Text>
        </View>
      </View>

      <View style={styles.searchBar}>
        <Search size={20} color={theme.colors.secondary} />
        <TextInput 
          placeholder="Find a task..." 
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholderTextColor={theme.colors.outlineVariant}
        />
        <SlidersHorizontal size={20} color={theme.colors.secondary} />
      </View>

      {activeTasks.map(task => (
        <TaskItem key={task.id} task={task} onToggle={onToggleTask} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 24, paddingBottom: 120 },
  hero: { marginTop: 20, marginBottom: 32 },
  dateText: { fontSize: 12, fontWeight: '700', color: theme.colors.secondary, textTransform: 'uppercase', letterSpacing: 2 },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  statsNumber: { fontSize: 64, fontWeight: '900', color: theme.colors.primary, marginRight: 16 },
  statsLabelLarge: { fontSize: 28, fontWeight: '800', color: theme.colors.onSurface },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.surfaceContainerLow, paddingHorizontal: 16, borderRadius: 16, marginBottom: 24, height: 56 },
  searchInput: { flex: 1, marginHorizontal: 12, fontWeight: '600', color: theme.colors.onSurface }
});
