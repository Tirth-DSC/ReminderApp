import { Lightbulb, ShieldCheck } from 'lucide-react';

export function FocusCard() {
  return (
    <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-[0_8px_40px_rgba(35,44,81,0.04)] flex flex-col justify-between min-h-[220px] relative overflow-hidden group">
      <div className="absolute top-0 right-0 transition-transform duration-500 rounded-full w-32 h-32 bg-primary-container/10 -mr-16 -mt-16 group-hover:scale-110" />
      <div>
        <Lightbulb className="w-8 h-8 mb-4 text-tertiary fill-tertiary/20" />
        <h3 className="text-2xl font-bold tracking-tight mb-2 text-on-surface">Deep Focus</h3>
        <p className="leading-relaxed text-on-surface-variant">
          Your creative peak usually hits around 10 AM. Ready for it?
        </p>
      </div>
      <div className="mt-6">
        <button className="px-5 py-2 text-sm font-bold transition-colors rounded-full bg-surface-container-low text-primary hover:bg-surface-container-high">
          View Insights
        </button>
      </div>
    </div>
  );
}

export function ConsistencyCard() {
  const days = ['M', 'T', 'W', 'T', 'F'];
  const activeDayIndex = 3; // Thursday

  return (
    <div className="flex flex-col justify-between p-8 text-white primary-gradient rounded-3xl">
      <div>
        <ShieldCheck className="w-8 h-8 mb-4 fill-white/20" />
        <h3 className="mb-1 text-2xl font-bold tracking-tight">Consistency</h3>
        <p className="text-white/80">You're on a 5-day streak. Keep the momentum!</p>
      </div>
      <div className="flex mt-4 -space-x-2">
        {days.map((day, i) => (
          <div 
            key={i}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-all ${
              i === activeDayIndex 
                ? 'bg-white text-primary border-primary' 
                : i < activeDayIndex 
                  ? 'bg-white/20 border-primary' 
                  : 'bg-white/10 border-primary text-white/40'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
