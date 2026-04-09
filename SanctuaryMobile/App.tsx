import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

import { theme } from './src/constants/theme';
import { Task, Screen } from './src/types';
import TopBar from './src/components/TopBar';
import BottomNav from './src/components/BottomNav';

import HomeScreen from './src/screens/HomeScreen';
import TasksScreen from './src/screens/TasksScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Review quarterly metrics', description: 'Analyze user engagement data.', time: '09:00 AM', category: 'Strategy', completed: false, priority: true },
  { id: '2', title: 'Walk in the garden', description: 'Essential cognitive reset.', time: '04:30 PM', category: 'Wellness', completed: false },
  { id: '3', title: 'Order design prints', description: 'Get high-fidelity layouts.', time: '10:00 AM', category: 'Creative', completed: false },
  { id: '4', title: 'Refactor navigation', category: 'Strategy', completed: true, completedAt: '09:45 AM' },
  { id: '5', title: 'Review brand tokens', category: 'Creative', completed: true, completedAt: '08:20 AM' },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { 
        ...t, 
        completed: !t.completed, 
        completedAt: !t.completed ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined 
      } : t
    ));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen tasks={tasks} onToggleTask={toggleTask} onSeeAll={() => setCurrentScreen('tasks')} />;
      case 'tasks':
        return <TasksScreen tasks={tasks} onToggleTask={toggleTask} />;
      case 'history':
        return <HistoryScreen tasks={tasks} onToggleTask={toggleTask} />;
      case 'settings':
        return <SettingsScreen onBack={() => setCurrentScreen('home')} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {currentScreen !== 'settings' && (
        <TopBar 
          onSettingsClick={() => setCurrentScreen('settings')}
          showHistoryTitle={currentScreen === 'history'}
        />
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        {renderScreen()}
      </ScrollView>

      {currentScreen !== 'settings' && (
        <TouchableOpacity style={styles.fab}>
          <LinearGradient colors={[theme.colors.primary, theme.colors.primaryContainer]} style={styles.fabGradient}>
            <Plus size={32} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      )}

      <BottomNav currentScreen={currentScreen} onScreenChange={setCurrentScreen} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.surface },
  fab: { position: 'absolute', bottom: 110, right: 24, width: 64, height: 64, borderRadius: 20, elevation: 10, shadowColor: theme.colors.primary, shadowOpacity: 0.3, shadowRadius: 15 },
  fabGradient: { width: '100%', height: '100%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }
});
