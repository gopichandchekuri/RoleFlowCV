import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage({ category }: { category: string }) {
  const [, setLocation] = useLocation();
  const [isSaving, setIsSaving] = useState(false);
  const [data, setData] = useState({ name: 'John Anderson', email: 'john@example.com', phone: '(555) 123-4567' });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Settings updated successfully!');
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-black text-white capitalize">{category}</h1><p className="text-slate-500 text-sm">Update your personal preferences.</p></div>
        <Button onClick={() => setLocation('/editor')} className="bg-slate-800 text-white rounded-xl"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Editor</Button>
      </div>
      <Card className="p-8 bg-slate-900/50 border-slate-800 rounded-3xl space-y-6">
        {category === 'account' && (
          <div className="space-y-4">
            <div className="space-y-1"><Label className="text-slate-500 uppercase text-[10px] font-bold">Full Name</Label><Input value={data.name} onChange={e => setData({...data, name: e.target.value})} className="bg-slate-800 border-slate-700 text-white h-11" /></div>
            <div className="space-y-1"><Label className="text-slate-500 uppercase text-[10px] font-bold">Email</Label><Input value={data.email} onChange={e => setData({...data, email: e.target.value})} className="bg-slate-800 border-slate-700 text-white h-11" /></div>
            <div className="space-y-1"><Label className="text-slate-500 uppercase text-[10px] font-bold">Phone</Label><Input value={data.phone} onChange={e => setData({...data, phone: e.target.value})} className="bg-slate-800 border-slate-700 text-white h-11" /></div>
          </div>
        )}
        {category === 'privacy' && <div className="p-4 bg-indigo-500/10 rounded-xl text-indigo-400 text-sm font-medium">Privacy mode is currently enabled for your profile.</div>}
        {category === 'billing' && <div className="p-6 border border-slate-800 rounded-2xl"><h4 className="text-white font-bold mb-1">Pro Plan</h4><p className="text-slate-400 text-sm">$12.00 / mo • Active</p></div>}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <Button onClick={handleSave} disabled={isSaving} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl px-8 h-11">
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />} Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );
}
