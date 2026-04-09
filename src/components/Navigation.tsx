import { Home, ListChecks, History } from 'lucide-react';
import { motion } from 'motion/react';

type Screen = 'home' | 'tasks' | 'history' | 'settings';

interface NavigationProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

export default function Navigation({ currentScreen, onScreenChange }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'tasks', label: 'Tasks', icon: ListChecks },
    { id: 'history', label: 'History', icon: History },
  ];

  return (
    <nav className="fixed bottom-0 left-0 z-50 flex items-center justify-around w-full px-4 pt-3 pb-8 glass shadow-[0_-4px_30px_rgba(35,44,81,0.06)] rounded-t-3xl">
      {navItems.map((item) => {
        const isActive = currentScreen === item.id;
        const Icon = item.icon;
        
        return (
          <button
            key={item.id}
            onClick={() => onScreenChange(item.id as Screen)}
            className={`flex flex-col items-center justify-center transition-all duration-300 active:scale-90 ${
              isActive 
                ? 'primary-gradient text-white rounded-full px-6 py-2 shadow-lg shadow-primary/20' 
                : 'text-secondary p-2 hover:text-primary'
            }`}
          >
            <Icon className={`w-6 h-6 ${isActive ? 'mb-0.5' : 'mb-1'}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
