import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../constants/theme';
import TaskItem from '../components/TaskItem';
import { Task } from '../types';

interface HistoryScreenProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export default function HistoryScreen({ tasks, onToggleTask }: HistoryScreenProps) {
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.statsRow}>
          <Text style={styles.statsNumber}>{completedTasks.length}</Text>
          <Text style={styles.statsLabel}>Tasks Achieved</Text>
        </View>
        <Text style={styles.subtext}>
          Your cognitive sanctuary is growing. Review your past focus and momentum.
        </Text>
      </View>

      <View style={styles.chipsRow}>
        <TouchableOpacity style={styles.chipActive}><Text style={styles.chipTextActive}>All Time</Text></TouchableOpacity>
        <TouchableOpacity style={styles.chip}><Text style={styles.chipText}>This Week</Text></TouchableOpacity>
        <TouchableOpacity style={styles.chip}><Text style={styles.chipText}>Personal</Text></TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Today — Oct 24</Text>
        <View style={styles.line} />
      </View>

      {completedTasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggle={onToggleTask} 
          onDelete={onDeleteTask}
          variant="history" 
        />
      ))}

      <View style={styles.finishContainer}>
        <Text style={styles.finishText}>FINISH</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 24, paddingBottom: 120 },
  hero: { marginTop: 20, marginBottom: 32 },
  statsRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  statsNumber: { fontSize: 64, fontWeight: '900', color: theme.colors.primary },
  statsLabel: { fontSize: 14, fontWeight: '700', color: theme.colors.secondary, textTransform: 'uppercase', letterSpacing: 2 },
  subtext: { fontSize: 16, fontWeight: '500', color: theme.colors.onSurfaceVariant, marginTop: 8, maxWidth: '80%' },
  chipsRow: { flexDirection: 'row', gap: 12, marginBottom: 32 },
  chip: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: theme.colors.surfaceContainerHigh },
  chipActive: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: theme.colors.primary },
  chipText: { fontSize: 14, fontWeight: '700', color: theme.colors.onSurfaceVariant },
  chipTextActive: { fontSize: 14, fontWeight: '700', color: 'white' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 },
  sectionTitle: { fontSize: 12, fontWeight: '900', color: 'rgba(73, 95, 105, 0.6)', textTransform: 'uppercase', letterSpacing: 2 },
  line: { flex: 1, height: 1, backgroundColor: theme.colors.surfaceContainerLow },
  finishContainer: { marginTop: 64, alignItems: 'center', opacity: 0.1 },
  finishText: { fontSize: 80, fontWeight: '900', fontStyle: 'italic', letterSpacing: -4 }
});
