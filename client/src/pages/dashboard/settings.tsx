import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useUser } from '@clerk/clerk-react'; 
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage({ category }: { category: string }) {
  const [, setLocation] = useLocation();
  const { user, isLoaded } = useUser(); 
  const [isSaving, setIsSaving] = useState(false);

  // Form state for names
  const [formData, setFormData] = useState({ 
    firstName: '', 
    lastName: '' 
  });

  // Load current Clerk data into form fields
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
      });
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      // Direct update to Clerk profile
      await user.update({
        firstName: formData.firstName,
        lastName: formData.lastName,
      });

      // Trigger success notification
      toast.success('Profile Updated', {
        description: 'Your changes have been saved to RoleFlow CV.',
      });

    } catch (error: any) {
      console.error("Settings Update Error:", error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white capitalize">{category}</h1>
          <p className="text-slate-500 text-sm">Manage your RoleFlow CV account details.</p>
        </div>
        <Button 
          variant="outline"
          onClick={() => setLocation('/dashboard')} 
          className="bg-slate-800 border-slate-700 text-white rounded-xl hover:bg-slate-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Button>
      </div>

      <Card className="p-8 bg-slate-900/50 border-slate-800 rounded-3xl space-y-6 shadow-2xl backdrop-blur-sm">
        {category === 'account' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-slate-500 uppercase text-[10px] font-bold tracking-widest ml-1">First Name</Label>
                <Input 
                  value={formData.firstName} 
                  onChange={e => setFormData({...formData, firstName: e.target.value})} 
                  className="bg-slate-800 border-slate-700 text-white h-12 rounded-xl focus:border-indigo-500 transition-all" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-500 uppercase text-[10px] font-bold tracking-widest ml-1">Last Name</Label>
                <Input 
                  value={formData.lastName} 
                  onChange={e => setFormData({...formData, lastName: e.target.value})} 
                  className="bg-slate-800 border-slate-700 text-white h-12 rounded-xl focus:border-indigo-500 transition-all" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-500 uppercase text-[10px] font-bold tracking-widest ml-1">Email Address</Label>
              <Input 
                value={user?.primaryEmailAddress?.emailAddress || ''} 
                disabled 
                className="bg-slate-950 border-slate-800 text-slate-500 h-12 rounded-xl cursor-not-allowed italic" 
              />
              <p className="text-[10px] text-slate-600 px-1">Email changes are handled via your secure auth provider.</p>
            </div>
          </div>
        )}

        {category === 'privacy' && (
          <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 text-sm">
            Your account is secured with end-to-end encryption. Only you can access your stored resumes.
          </div>
        )}

        {category === 'billing' && (
          <div className="p-6 border border-slate-800 bg-slate-800/20 rounded-2xl flex justify-between items-center">
            <div>
              <h4 className="text-white font-bold mb-1">Free Tier</h4>
              <p className="text-slate-400 text-sm">Unlimited Resumes • AI Analysis</p>
            </div>
            <span className="text-[10px] bg-indigo-600/20 text-indigo-400 border border-indigo-400/30 px-3 py-1 rounded-full font-bold uppercase">Active</span>
          </div>
        )}

        <div className="pt-6 border-t border-slate-800 flex justify-end">
          <Button 
            onClick={handleSave} 
            disabled={isSaving} 
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl px-10 h-12 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );
}