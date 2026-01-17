import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Settings, Shield, CreditCard, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage({ category }: { category: string }) {
  const [, setLocation] = useLocation();
  const [profile, setProfile] = useState({ name: 'John Anderson', email: 'john@example.com' });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Changes saved successfully!');
    }, 1000);
  };

  const renderContent = () => {
    switch (category) {
      case 'account':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-slate-500 uppercase text-[10px] font-black tracking-widest">Full Name</Label>
              <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="bg-slate-800/50 border-slate-700 text-white h-12 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-500 uppercase text-[10px] font-black tracking-widest">Email Address</Label>
              <Input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="bg-slate-800/50 border-slate-700 text-white h-12 rounded-xl" />
            </div>
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-2xl border border-slate-800">
              <span className="text-white font-bold">Public Profile</span>
              <div className="w-12 h-6 bg-indigo-600 rounded-full flex items-center px-1"><div className="w-4 h-4 bg-white rounded-full ml-auto" /></div>
            </div>
          </div>
        );
      case 'billing':
        return (
          <div className="space-y-6">
            <Card className="p-6 bg-indigo-600/10 border border-indigo-500/30 rounded-2xl">
              <h4 className="text-indigo-400 font-black mb-2 uppercase text-[10px]">Current Plan</h4>
              <p className="text-2xl font-black text-white">Pro Access</p>
              <p className="text-indigo-400/60 text-sm mt-1">$12 / Month • Renews Feb 2026</p>
            </Card>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-slate-900/50 rounded-3xl border border-slate-800 text-indigo-400">
            {category === 'account' ? <Settings /> : category === 'privacy' ? <Shield /> : <CreditCard />}
          </div>
          <div>
            <h1 className="text-3xl font-black text-white capitalize">{category} Settings</h1>
            <p className="text-slate-500">Configure your workspace and global preferences.</p>
          </div>
        </div>
        <Button onClick={() => setLocation('/editor')} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl h-12 px-6 shadow-xl shadow-indigo-600/20">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Editor
        </Button>
      </div>

      <Card className="p-8 bg-slate-900/40 backdrop-blur-2xl border-slate-800 rounded-[2.5rem] relative overflow-hidden">
        <div className="relative z-10 space-y-8">
          {renderContent()}
          <div className="pt-8 border-t border-slate-800 flex justify-end">
            <Button onClick={handleSave} disabled={isSaving} className="bg-white text-slate-950 hover:bg-indigo-50 font-bold rounded-xl h-12 px-8">
              {isSaving ? 'Saving...' : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
