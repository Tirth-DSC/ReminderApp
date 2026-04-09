import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Lightbulb, ShieldCheck } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../constants/theme';

export function FocusCard() {
  return (
    <View style={styles.focusCard}>
      <View style={styles.circle} />
      <Lightbulb size={32} color={theme.colors.tertiary} />
      <Text style={styles.cardTitle}>Deep Focus</Text>
      <Text style={styles.cardBody}>Your creative peak usually hits around 10 AM.</Text>
      <TouchableOpacity style={styles.cardButton}>
        <Text style={styles.cardButtonText}>View Insights</Text>
      </TouchableOpacity>
    </View>
  );
}

export function ConsistencyCard() {
  const days = ['M', 'T', 'W', 'T', 'F'];
  const activeDayIndex = 3;

  return (
    <LinearGradient colors={[theme.colors.primary, theme.colors.primaryContainer]} style={styles.consistencyCard}>
      <ShieldCheck size={32} color="rgba(255,255,255,0.3)" />
      <Text style={styles.cardTitleWhite}>Consistency</Text>
      <Text style={styles.cardBodyWhite}>You're on a 5-day streak!</Text>
      <View style={styles.daysRow}>
        {days.map((day, i) => (
          <View 
            key={i}
            style={[
              styles.dayCircle,
              i === activeDayIndex && styles.dayCircleActive,
              i < activeDayIndex && styles.dayCirclePast
            ]}
          >
            <Text style={[styles.dayText, i === activeDayIndex && styles.dayTextActive]}>{day}</Text>
          </View>
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  focusCard: { backgroundColor: 'white', padding: 24, borderRadius: 32, minHeight: 220, justifyContent: 'space-between', overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 20, elevation: 4 },
  circle: { position: 'absolute', top: -40, right: -40, width: 128, height: 128, borderRadius: 64, backgroundColor: 'rgba(108, 159, 255, 0.1)' },
  cardTitle: { fontSize: 24, fontWeight: '800', color: theme.colors.onSurface, marginTop: 12 },
  cardBody: { color: theme.colors.onSurfaceVariant, marginTop: 4, lineHeight: 20 },
  cardButton: { backgroundColor: theme.colors.surfaceContainerLow, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, alignSelf: 'flex-start', marginTop: 16 },
  cardButtonText: { color: theme.colors.primary, fontWeight: '700', fontSize: 12 },
  consistencyCard: { padding: 24, borderRadius: 32, minHeight: 220, justifyContent: 'space-between' },
  cardTitleWhite: { fontSize: 24, fontWeight: '800', color: 'white', marginTop: 12 },
  cardBodyWhite: { color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  daysRow: { flexDirection: 'row', gap: 8, marginTop: 16 },
  dayCircle: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.1)' },
  dayCircleActive: { backgroundColor: 'white', borderColor: 'white' },
  dayCirclePast: { backgroundColor: 'rgba(255,255,255,0.2)' },
  dayText: { fontSize: 10, fontWeight: '700', color: 'rgba(255,255,255,0.4)' },
  dayTextActive: { color: theme.colors.primary }
});
