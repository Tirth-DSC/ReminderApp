import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Switch, Image } from 'react-native';
import { ArrowLeft, Lock, ChevronRight, Sun, Moon, Monitor, Share2, Trash2, Sparkles, Shield } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../constants/theme';

interface SettingsScreenProps {
  onBack: () => void;
}

export default function SettingsScreen({ onBack }: SettingsScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeft size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.hero}>
          <Text style={styles.configText}>Configuration</Text>
          <Text style={styles.heroTitle}>Your Sanctuary</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Account</Text>
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
          <View style={styles.profileCard}>
            <Image source={{ uri: 'https://picsum.photos/seed/alex/100/100' }} style={styles.avatar} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Alex Rivera</Text>
              <Text style={styles.profileEmail}>alex.rivera@sanctuary.app</Text>
            </View>
            <TouchableOpacity><Text style={styles.editText}>Edit</Text></TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemLeft}>
              <Lock size={20} color={theme.colors.secondary} />
              <Text style={styles.listItemText}>Password & Security</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.outlineVariant} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.card}>
            <View style={styles.toggleRow}>
              <View>
                <Text style={styles.toggleLabel}>Daily Reminders</Text>
                <Text style={styles.toggleDesc}>Receive a morning brief</Text>
              </View>
              <Switch value={true} trackColor={{ true: theme.colors.primary }} />
            </View>
          </View>
        </View>

        <View style={styles.bentoFooter}>
          <LinearGradient colors={[theme.colors.primary, theme.colors.primaryContainer]} style={styles.bentoCard}>
            <Shield size={24} color="white" />
            <Text style={styles.bentoText}>Your data is locally encrypted.</Text>
          </LinearGradient>
          <View style={[styles.bentoCard, { backgroundColor: theme.colors.surfaceContainerHigh }]}>
            <Sparkles size={24} color={theme.colors.tertiary} />
            <Text style={[styles.bentoText, { color: theme.colors.onSurface }]}>Premium features are waiting.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.surface },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, height: 64, backgroundColor: 'white' },
  backButton: { padding: 8, borderRadius: 20, backgroundColor: theme.colors.surfaceContainerLow, marginRight: 16 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.onSurface },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },
  hero: { marginTop: 32, marginBottom: 40 },
  configText: { fontSize: 12, fontWeight: '700', color: theme.colors.secondary, textTransform: 'uppercase', letterSpacing: 2 },
  heroTitle: { fontSize: 40, fontWeight: '900', color: theme.colors.onSurface, letterSpacing: -1 },
  section: { marginBottom: 32 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: theme.colors.onSurface },
  verifiedText: { fontSize: 12, fontWeight: '700', color: theme.colors.tertiary },
  profileCard: { backgroundColor: 'white', padding: 20, borderRadius: 24, flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 64, height: 64, borderRadius: 32 },
  profileInfo: { flex: 1, marginLeft: 16 },
  profileName: { fontSize: 18, fontWeight: '700', color: theme.colors.onSurface },
  profileEmail: { fontSize: 14, color: theme.colors.secondary },
  editText: { color: theme.colors.primary, fontWeight: '700' },
  listItem: { backgroundColor: theme.colors.surfaceContainerLow, padding: 20, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  listItemLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  listItemText: { fontSize: 16, fontWeight: '600', color: theme.colors.onSurface },
  card: { backgroundColor: 'white', padding: 24, borderRadius: 24 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  toggleLabel: { fontSize: 16, fontWeight: '700', color: theme.colors.onSurface },
  toggleDesc: { fontSize: 12, color: theme.colors.secondary },
  bentoFooter: { flexDirection: 'row', gap: 16, marginTop: 16 },
  bentoCard: { flex: 1, padding: 20, borderRadius: 24, minHeight: 140, justifyContent: 'space-between' },
  bentoText: { color: 'white', fontSize: 16, fontWeight: '700', lineHeight: 22 }
});
