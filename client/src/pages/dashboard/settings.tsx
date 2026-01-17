import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Settings, Shield, CreditCard, User } from 'lucide-react';

export default function SettingsPage({ category }: { category: string }) {
  const [, setLocation] = useLocation();

  const getTitle = () => {
    switch (category) {
      case 'account': return 'Account Settings';
      case 'privacy': return 'Privacy & Security';
      case 'billing': return 'Billing & Plans';
      default: return 'Settings';
    }
  };

  const getIcon = () => {
    switch (category) {
      case 'account': return <Settings className="w-8 h-8 text-indigo-400" />;
      case 'privacy': return <Shield className="w-8 h-8 text-emerald-400" />;
      case 'billing': return <CreditCard className="w-8 h-8 text-amber-400" />;
      default: return <Settings className="w-8 h-8 text-indigo-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
            {getIcon()}
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">{getTitle()}</h1>
            <p className="text-slate-500">Manage your {category} preferences and configuration.</p>
          </div>
        </div>
        <Button 
          onClick={() => setLocation('/editor')}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl px-6 h-12 shadow-lg shadow-indigo-600/20 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return to Editor
        </Button>
      </div>

      <Card className="p-8 bg-slate-900/40 backdrop-blur-xl border-slate-800/50 rounded-[2rem] space-y-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Display Name</label>
              <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 text-slate-300">John Anderson</div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
              <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 text-slate-300">john@example.com</div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800/50">
            <h3 className="text-lg font-bold text-white mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-800/20 rounded-2xl border border-slate-800/50">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span className="text-sm font-medium text-slate-300">Email notifications for {i === 1 ? 'updates' : i === 2 ? 'matches' : 'tips'}</span>
                  </div>
                  <div className="w-12 h-6 bg-indigo-600 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
