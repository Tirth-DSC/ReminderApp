import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Settings } from 'lucide-react-native';
import { theme } from '../constants/theme';

interface TopBarProps {
  onSettingsClick: () => void;
  showHistoryTitle?: boolean;
}

export default function TopBar({ onSettingsClick, showHistoryTitle }: TopBarProps) {
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <TouchableOpacity style={styles.iconButton} onPress={onSettingsClick}>
          <Settings size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={styles.brandText}>Sanctuary</Text>
      </View>
      
      {showHistoryTitle && <Text style={styles.historyTitle}>History</Text>}

      <View style={styles.profileCircle}>
        <Image 
          source={{ uri: 'https://picsum.photos/seed/sanctuary/100/100' }} 
          style={styles.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16, backgroundColor: theme.colors.surface },
  left: { flexDirection: 'row', alignItems: 'center' },
  brandText: { fontSize: 22, fontWeight: '900', color: theme.colors.primary, letterSpacing: -1.5, marginLeft: 12 },
  historyTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.onSurface },
  profileCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: theme.colors.surfaceContainerHigh, borderWidth: 2, borderColor: 'white', overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
  iconButton: { padding: 8, borderRadius: 20, backgroundColor: theme.colors.surfaceContainerLow }
});
