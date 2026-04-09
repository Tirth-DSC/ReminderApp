import { useState, useMemo } from 'react';
import { Plus, Search, SlidersHorizontal, ArrowLeft, Lock, ChevronRight, Sun, Moon, Monitor, Share2, Trash2, Sparkles, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import TopBar from './components/TopBar';
import Navigation from './components/Navigation';
import TaskItem from './components/TaskItem';
import { FocusCard, ConsistencyCard } from './components/BentoCards';
import { Task, Screen } from './types';

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Review quarterly sanctuary metrics',
    description: 'Analyze user engagement data for the last 3 months and prepare the focus report.',
    time: '09:00 AM',
    date: 'Today',
    category: 'Strategy',
    completed: false,
    priority: true,
  },
  {
    id: '2',
    title: 'Walk in the botanical garden',
    description: 'Essential cognitive reset. No devices allowed during the 30-minute walk.',
    time: '04:30 PM',
    category: 'Wellness',
    completed: false,
  },
  {
    id: '3',
    title: 'Order design system prints',
    description: 'Get the high-fidelity editorial layouts printed for the gallery wall.',
    time: '10:00 AM',
    date: 'Tomorrow',
    category: 'Creative',
    completed: false,
  },
  {
    id: '4',
    title: 'Pick up supplies for studio',
    time: '04:30 PM',
    category: 'Personal',
    completed: false,
  },
  {
    id: '5',
    title: 'Weekly Meditation Session',
    time: '06:00 PM',
    category: 'Wellness',
    completed: false,
  },
  {
    id: '6',
    title: 'Email retrospective notes',
    description: 'Send the summary of the team alignment meeting to all stakeholders.',
    category: 'Work',
    completed: false,
  },
  {
    id: '7',
    title: 'Refactor sanctuary navigation',
    category: 'Strategy',
    completed: true,
    completedAt: '09:45 AM',
  },
  {
    id: '8',
    title: 'Review editorial brand tokens',
    category: 'Creative',
    completed: true,
    completedAt: '08:20 AM',
  }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [searchQuery, setSearchQuery] = useState('');

  const activeTasks = useMemo(() => tasks.filter(t => !t.completed), [tasks]);
  const completedTasks = useMemo(() => tasks.filter(t => t.completed), [tasks]);
  
  const filteredActiveTasks = useMemo(() => 
    activeTasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [activeTasks, searchQuery]
  );

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, completed: !t.completed, completedAt: !t.completed ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined } : t
    ));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <motion.div 
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-3xl px-6 pt-8 pb-32 mx-auto"
          >
            <section className="mb-12">
              <p className="mb-1 text-xs font-medium tracking-wide uppercase text-secondary">Tuesday, October 24</p>
              <h2 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl text-on-surface">Good morning, Julian.</h2>
              <div className="flex items-baseline gap-3">
                <span className="font-black leading-none text-6xl text-primary">{activeTasks.length}</span>
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight text-on-surface">Tasks Remaining</span>
                  <span className="text-sm text-secondary">Focus on what matters today.</span>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 gap-4 mb-10 md:grid-cols-2">
              <FocusCard />
              <ConsistencyCard />
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold tracking-tight">Today's Overview</h3>
                <button 
                  onClick={() => setCurrentScreen('tasks')}
                  className="text-sm font-bold text-primary hover:underline"
                >
                  See all
                </button>
              </div>
              <div className="space-y-4">
                {activeTasks.slice(0, 3).map(task => (
                  <TaskItem key={task.id} task={task} onToggle={toggleTask} variant="compact" />
                ))}
              </div>
            </section>
          </motion.div>
        );

      case 'tasks':
        return (
          <motion.div 
            key="tasks"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl px-6 pb-32 mx-auto mt-8"
          >
            <section className="mb-12">
              <div className="flex flex-col gap-1">
                <span className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Your Focus</span>
                <div className="flex items-baseline gap-4">
                  <span className="font-headline text-7xl font-extrabold tracking-tighter text-primary">
                    {activeTasks.length < 10 ? `0${activeTasks.length}` : activeTasks.length}
                  </span>
                  <h2 className="text-3xl font-bold font-headline text-on-surface">Active Tasks</h2>
                </div>
              </div>
            </section>

            <div className="mb-10">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-surface-container-low">
                <Search className="w-5 h-5 text-outline" />
                <input 
                  type="text"
                  placeholder="Find a task..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full font-medium border-none bg-transparent focus:ring-0 text-on-surface placeholder-outline-variant"
                />
                <SlidersHorizontal className="w-5 h-5 text-outline" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {filteredActiveTasks.map(task => (
                <TaskItem key={task.id} task={task} onToggle={toggleTask} />
              ))}
            </div>
          </motion.div>
        );

      case 'history':
        return (
          <motion.div 
            key="history"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl px-6 pb-32 mx-auto mt-8"
          >
            <section className="mb-12">
              <div className="flex items-baseline gap-2">
                <span className="font-extrabold tracking-tighter text-7xl text-primary">{completedTasks.length}</span>
                <span className="font-bold tracking-widest uppercase text-secondary">Tasks Achieved</span>
              </div>
              <p className="mt-2 font-medium text-on-surface-variant max-w-xs">
                Your cognitive sanctuary is growing. Review your past focus and momentum.
              </p>
            </section>

            <div className="flex gap-3 mb-10 overflow-x-auto pb-2 no-scrollbar">
              <button className="px-6 py-2 text-sm font-bold shadow-lg bg-primary text-on-primary rounded-full shadow-primary/20">All Time</button>
              <button className="px-6 py-2 text-sm font-bold transition-colors rounded-full bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest">This Week</button>
              <button className="px-6 py-2 text-sm font-bold transition-colors rounded-full bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest">Personal</button>
              <button className="px-6 py-2 text-sm font-bold transition-colors rounded-full bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest">Creative</button>
            </div>

            <div className="space-y-4">
              <h3 className="flex items-center gap-3 mb-6 text-xs font-black uppercase tracking-[0.2em] text-secondary/60">
                <span>Today — Oct 24</span>
                <div className="flex-1 h-px bg-surface-container-low" />
              </h3>
              {completedTasks.map(task => (
                <TaskItem key={task.id} task={task} onToggle={toggleTask} variant="history" />
              ))}
            </div>

            <div className="mt-20 text-center opacity-10">
              <span className="italic font-black text-8xl tracking-tighter">FINISH</span>
            </div>
          </motion.div>
        );

      case 'settings':
        return (
          <motion.div 
            key="settings"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl px-6 pb-32 mx-auto mt-8 space-y-12"
          >
            <section className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Configuration</p>
              <h2 className="text-4xl font-extrabold tracking-tighter text-on-surface">Your Sanctuary</h2>
            </section>

            <section className="space-y-6">
              <div className="flex items-end justify-between">
                <h3 className="text-xl font-bold tracking-tight text-on-surface">Account</h3>
                <span className="text-xs font-medium text-tertiary">Verified</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-6 shadow-sm bg-surface-container-lowest rounded-xl">
                  <div className="relative">
                    <img 
                      src="https://picsum.photos/seed/alex/100/100" 
                      alt="Profile" 
                      className="object-cover w-16 h-16 rounded-full"
                    />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-2 rounded-full bg-primary border-surface-container-lowest" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-on-surface">Alex Rivera</p>
                    <p className="text-secondary">alex.rivera@sanctuary.app</p>
                  </div>
                  <button className="text-sm font-bold transition-opacity text-primary hover:opacity-80">Edit</button>
                </div>
                <div className="overflow-hidden rounded-xl bg-surface-container-low">
                  <div className="flex items-center justify-between p-5 transition-colors cursor-pointer group hover:bg-surface-container-lowest">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 transition-colors text-secondary group-hover:text-primary" />
                      <span className="font-medium">Password & Security</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-outline-variant" />
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-xl font-bold tracking-tight text-on-surface">Notifications</h3>
              <div className="p-6 space-y-6 shadow-sm bg-surface-container-lowest rounded-xl">
                {[
                  { label: 'Daily Reminders', desc: 'Receive a morning brief of your tasks', checked: true },
                  { label: 'Sound Settings', desc: 'Play soft tones for focus milestones', checked: false },
                  { label: 'Quiet Hours', desc: 'Mute all alerts after 10:00 PM', checked: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-bold text-on-surface">{item.label}</p>
                      <p className="text-xs text-secondary">{item.desc}</p>
                    </div>
                    <div className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${item.checked ? 'primary-gradient' : 'bg-surface-container-high'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${item.checked ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-xl font-bold tracking-tight text-on-surface">Appearance</h3>
              <div className="p-6 space-y-8 shadow-sm bg-surface-container-lowest rounded-xl">
                <div className="space-y-4">
                  <p className="text-sm font-bold text-on-surface">Theme</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'light', label: 'Light', icon: Sun, active: true },
                      { id: 'dark', label: 'Dark', icon: Moon },
                      { id: 'system', label: 'System', icon: Monitor },
                    ].map(theme => (
                      <button 
                        key={theme.id}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all active:scale-95 ${
                          theme.active ? 'bg-primary text-white' : 'bg-surface-container-high text-secondary hover:bg-surface-container-highest'
                        }`}
                      >
                        <theme.icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{theme.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-on-surface">Font Size</p>
                    <span className="text-xs font-medium text-secondary">Standard</span>
                  </div>
                  <input type="range" className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-surface-container-high accent-primary" />
                  <div className="flex justify-between px-1">
                    <span className="text-[10px] text-outline">A</span>
                    <span className="text-lg text-outline">A</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-bold text-on-surface">Accent Color</p>
                  <div className="flex justify-between">
                    {['#0058bb', '#883c93', '#232c51', '#e11d48', '#10b981', '#f59e0b'].map((color, i) => (
                      <div 
                        key={i} 
                        className={`w-8 h-8 rounded-full cursor-pointer transition-transform hover:scale-110 ${i === 0 ? 'ring-4 ring-primary/20 ring-offset-2' : ''}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-xl font-bold tracking-tight text-on-surface">Privacy</h3>
              <div className="overflow-hidden rounded-xl bg-surface-container-low">
                <div className="flex items-center justify-between p-5 transition-colors cursor-pointer hover:bg-surface-container-lowest">
                  <div className="flex items-center gap-3">
                    <Share2 className="w-5 h-5 text-secondary" />
                    <span className="font-medium">Data Sharing</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-outline-variant" />
                </div>
                <div className="flex items-center justify-between p-5 transition-colors cursor-pointer hover:bg-red-50/50">
                  <div className="flex items-center gap-3">
                    <Trash2 className="w-5 h-5 text-error" />
                    <span className="font-medium text-error">Delete Account</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-error/30" />
                </div>
              </div>
            </section>

            <section className="grid grid-cols-2 gap-4 pb-12">
              <div className="p-6 text-white primary-gradient rounded-3xl space-y-4">
                <Shield className="w-6 h-6" />
                <p className="text-lg font-bold leading-tight">Your data is locally encrypted.</p>
              </div>
              <div className="p-6 rounded-3xl bg-tertiary-container text-on-tertiary-container space-y-4">
                <Sparkles className="w-6 h-6" />
                <p className="text-sm font-medium">Enjoying Sanctuary? Premium features are waiting.</p>
              </div>
            </section>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      {currentScreen !== 'settings' && (
        <TopBar 
          title="Sanctuary" 
          onSettingsClick={() => setCurrentScreen('settings')}
          showHistoryTitle={currentScreen === 'history'}
        />
      )}
      
      {currentScreen === 'settings' && (
        <header className="sticky top-0 z-50 flex items-center h-16 px-6 glass">
          <div className="flex items-center w-full gap-4">
            <button 
              onClick={() => setCurrentScreen('home')}
              className="p-2 transition-colors rounded-full hover:bg-surface-container-low active:scale-95"
            >
              <ArrowLeft className="w-6 h-6 text-primary" />
            </button>
            <h1 className="text-lg font-bold tracking-tight text-on-surface">Settings</h1>
          </div>
        </header>
      )}

      <main>
        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>
      </main>

      <button className="fixed z-50 flex items-center justify-center w-16 h-16 text-white shadow-2xl right-8 bottom-24 rounded-2xl primary-gradient active:scale-90 transition-transform">
        <Plus className="w-8 h-8" />
      </button>

      <Navigation currentScreen={currentScreen} onScreenChange={setCurrentScreen} />
    </div>
  );
}
