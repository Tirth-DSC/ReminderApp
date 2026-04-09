import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../constants/theme';
import { FocusCard, ConsistencyCard } from '../components/BentoCards';
import TaskItem from '../components/TaskItem';
import { Task } from '../types';

interface HomeScreenProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onSeeAll: () => void;
}

export default function HomeScreen({ tasks, onToggleTask, onSeeAll }: HomeScreenProps) {
  const activeTasks = tasks.filter(t => !t.completed);

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.dateText}>Tuesday, October 24</Text>
        <Text style={styles.greetingText}>Good morning, Julian.</Text>
        <View style={styles.statsRow}>
          <Text style={styles.statsNumber}>{activeTasks.length}</Text>
          <View>
            <Text style={styles.statsLabel}>Tasks Remaining</Text>
            <Text style={styles.statsSubtext}>Focus on what matters today.</Text>
          </View>
        </View>
      </View>

      <View style={styles.bentoGrid}>
        <FocusCard />
        <ConsistencyCard />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Today's Overview</Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      
      {activeTasks.slice(0, 3).map(task => (
        <TaskItem key={task.id} task={task} onToggle={onToggleTask} variant="compact" />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 24, paddingBottom: 120 },
  hero: { marginTop: 20, marginBottom: 32 },
  dateText: { fontSize: 12, fontWeight: '700', color: theme.colors.secondary, textTransform: 'uppercase', letterSpacing: 2 },
  greetingText: { fontSize: 36, fontWeight: '800', color: theme.colors.onSurface, marginTop: 4, letterSpacing: -1 },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  statsNumber: { fontSize: 64, fontWeight: '900', color: theme.colors.primary, marginRight: 16 },
  statsLabel: { fontSize: 18, fontWeight: '700', color: theme.colors.onSurface },
  statsSubtext: { fontSize: 14, color: theme.colors.secondary },
  bentoGrid: { gap: 16, marginBottom: 32 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: theme.colors.onSurface },
  seeAllText: { color: theme.colors.primary, fontWeight: '700' }
});
