import { Settings } from 'lucide-react';

interface TopBarProps {
  title: string;
  onSettingsClick?: () => void;
  showHistoryTitle?: boolean;
}

export default function TopBar({ title, onSettingsClick, showHistoryTitle }: TopBarProps) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <button 
          onClick={onSettingsClick}
          className="p-2 transition-colors rounded-full hover:bg-surface-container-low active:scale-95"
        >
          <Settings className="w-6 h-6 text-primary" />
        </button>
        <h1 className="text-xl font-black tracking-tighter text-primary">
          Sanctuary
        </h1>
      </div>
      
      {showHistoryTitle && (
        <h2 className="text-lg font-bold tracking-tight text-on-surface">History</h2>
      )}

      <div className="w-10 h-10 overflow-hidden border-2 rounded-full border-surface-container">
        <img 
          src="https://picsum.photos/seed/sanctuary-user/100/100" 
          alt="User Profile" 
          referrerPolicy="no-referrer"
          className="object-cover w-full h-full"
        />
      </div>
    </header>
  );
}
