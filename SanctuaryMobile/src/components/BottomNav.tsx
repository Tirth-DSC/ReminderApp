import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Home, ListChecks, History } from 'lucide-react-native';
import { theme } from '../constants/theme';
import { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

export default function BottomNav({ currentScreen, onScreenChange }: BottomNavProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'tasks', label: 'Tasks', icon: ListChecks },
    { id: 'history', label: 'History', icon: History },
  ];

  return (
    <View style={styles.navBar}>
      {navItems.map((item) => {
        const isActive = currentScreen === item.id;
        const Icon = item.icon;
        
        return (
          <TouchableOpacity 
            key={item.id}
            onPress={() => onScreenChange(item.id as Screen)} 
            style={isActive ? styles.navActive : styles.navInactive}
          >
            <Icon size={24} color={isActive ? 'white' : theme.colors.secondary} />
            {isActive && <Text style={styles.navTextActive}>{item.label}</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: { position: 'absolute', bottom: 0, width: '100%', height: 100, backgroundColor: 'white', borderTopLeftRadius: 32, borderTopRightRadius: 32, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 25, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 20 },
  navInactive: { padding: 12 },
  navActive: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.primary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 30 },
  navTextActive: { color: 'white', fontWeight: '800', fontSize: 12, marginLeft: 8, textTransform: 'uppercase' }
});
