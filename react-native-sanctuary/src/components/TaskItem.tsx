import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Check, ChevronRight, MoreVertical, Clock, Tag } from 'lucide-react-native';
import { theme } from '../constants/theme';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  variant?: 'default' | 'history' | 'compact';
}

export default function TaskItem({ task, onToggle, variant = 'default' }: TaskItemProps) {
  if (variant === 'history') {
    return (
      <View style={styles.historyCard}>
        <View style={styles.historyLeft}>
          <View style={styles.checkCircle}>
            <Check size={20} color={theme.colors.primary} strokeWidth={3} />
          </View>
          <View>
            <Text style={styles.historyTitle}>{task.title}</Text>
            <Text style={styles.historyMeta}>
              Completed {task.completedAt}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  if (variant === 'compact') {
    return (
      <TouchableOpacity 
        style={styles.compactCard}
        onPress={() => onToggle(task.id)}
      >
        <View style={styles.checkbox} />
        <View style={styles.compactContent}>
          <View style={styles.row}>
            <Text style={styles.taskTitle}>{task.title}</Text>
            {task.priority && <View style={styles.priorityDot} />}
          </View>
          <Text style={styles.taskMeta}>{task.time} • {task.category}</Text>
        </View>
        <ChevronRight size={20} color={theme.colors.outlineVariant} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.card, task.completed && styles.completedCard]}>
      {task.priority && <View style={styles.priorityBar} />}
      <TouchableOpacity 
        style={[styles.checkbox, task.completed && styles.checkboxActive]}
        onPress={() => onToggle(task.id)}
      >
        {task.completed && <Check size={14} color="white" strokeWidth={4} />}
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.taskTitle, task.completed && styles.lineThrough]}>{task.title}</Text>
          <MoreVertical size={20} color={theme.colors.outlineVariant} />
        </View>
        {task.description && <Text style={styles.description}>{task.description}</Text>}
        <View style={styles.footer}>
          <View style={styles.meta}>
            <Clock size={12} color={task.priority ? theme.colors.tertiary : theme.colors.primary} />
            <Text style={[styles.metaText, task.priority && styles.tertiaryText]}>{task.time} {task.date || 'Today'}</Text>
          </View>
          <View style={styles.meta}>
            <Tag size={12} color={theme.colors.secondary} />
            <Text style={styles.metaText}>{task.category}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: 'white', padding: 20, borderRadius: 24, flexDirection: 'row', marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 10, elevation: 2 },
  completedCard: { opacity: 0.6 },
  priorityBar: { position: 'absolute', left: 0, top: 20, bottom: 20, width: 4, backgroundColor: theme.colors.tertiary, borderTopRightRadius: 4, borderBottomRightRadius: 4 },
  checkbox: { width: 24, height: 24, borderRadius: 8, borderWidth: 2, borderColor: theme.colors.outlineVariant, marginRight: 16, marginTop: 2, alignItems: 'center', justifyContent: 'center' },
  checkboxActive: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  content: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  taskTitle: { fontSize: 17, fontWeight: '700', color: theme.colors.onSurface },
  lineThrough: { textDecorationLine: 'line-through' },
  description: { fontSize: 14, color: theme.colors.secondary, marginTop: 4, lineHeight: 20 },
  footer: { flexDirection: 'row', marginTop: 12, gap: 16 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 11, fontWeight: '700', color: theme.colors.secondary, textTransform: 'uppercase' },
  tertiaryText: { color: theme.colors.tertiary },
  compactCard: { backgroundColor: 'white', padding: 16, borderRadius: 24, flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  compactContent: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  priorityDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: theme.colors.tertiary },
  historyCard: { backgroundColor: 'white', padding: 20, borderRadius: 20, marginBottom: 12 },
  historyLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  checkCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: theme.colors.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  historyTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.onSurface, opacity: 0.4, textDecorationLine: 'line-through' },
  historyMeta: { fontSize: 11, fontWeight: '700', color: theme.colors.secondary, textTransform: 'uppercase', marginTop: 4 }
});
