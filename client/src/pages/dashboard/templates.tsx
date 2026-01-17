import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Sparkles, Layout } from 'lucide-react';
import { useResume } from '@/lib/resumeContext';
import { useLocation } from 'wouter';
import { toast } from 'sonner';

const templates = [
  {
    id: '1',
    name: 'Professional',
    description: 'Modern corporate layout with Indigo accents',
    isPro: false,
    color: 'from-slate-600 to-slate-800',
  },
  {
    id: '2',
    name: 'Creative',
    description: 'Vibrant header with Plus Jakarta Sans',
    isPro: true,
    color: 'from-purple-600 to-indigo-800',
  },
  {
    id: '3',
    name: 'Minimalist',
    description: 'High contrast, clean Slate typography',
    isPro: false,
    color: 'from-slate-700 to-slate-900',
  },
  {
    id: '4',
    name: 'Executive',
    description: 'Sophisticated Serif with Amber details',
    isPro: true,
    color: 'from-amber-700 to-orange-900',
  },
  {
    id: '5',
    name: 'Tech Modern',
    description: 'Monospace font with Cyan highlights',
    isPro: false,
    color: 'from-cyan-700 to-blue-900',
  },
];

export default function TemplatesPage() {
  const { applyTemplate } = useResume();
  const [, setLocation] = useLocation();

  const handleSelectTemplate = (id: string) => {
    applyTemplate(id);
    toast.success('Template applied! Redirecting to editor...');
    setTimeout(() => setLocation('/editor'), 800);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-display font-black text-white mb-3">Template Gallery</h1>
        <p className="text-slate-400 text-lg">Choose a layout that tells your career story perfectly.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template, index) => (
          <Card
            key={template.id}
            className="group bg-slate-900/40 backdrop-blur-md border-slate-800/50 rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`aspect-[4/5] bg-gradient-to-br ${template.color} relative overflow-hidden flex items-center justify-center p-8`}>
              <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-2xl transform group-hover:scale-105 transition-transform duration-700 p-6 flex flex-col gap-4">
                <div className="w-1/2 h-3 bg-white/40 rounded-full" />
                <div className="space-y-2">
                  <div className="w-full h-1.5 bg-white/20 rounded-full" />
                  <div className="w-full h-1.5 bg-white/20 rounded-full" />
                  <div className="w-3/4 h-1.5 bg-white/20 rounded-full" />
                </div>
                <div className="mt-auto space-y-2">
                   <div className="w-full h-2 bg-white/30 rounded-full" />
                   <div className="w-2/3 h-2 bg-white/30 rounded-full" />
                </div>
              </div>
              
              {template.isPro && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-amber-500 text-white font-bold border-none px-3 py-1 shadow-lg">
                    <Crown className="w-3 h-3 mr-1" /> PRO
                  </Badge>
                </div>
              )}

              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <Button
                  onClick={() => handleSelectTemplate(template.id)}
                  className="bg-white text-slate-950 hover:bg-indigo-50 font-bold rounded-2xl px-8 h-12 shadow-xl cursor-pointer transform translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                >
                  <Layout className="w-4 h-4 mr-2" />
                  Apply Layout
                </Button>
              </div>
            </div>
            <div className="p-6 bg-slate-900/80 border-t border-slate-800/50">
              <h3 className="text-xl font-bold text-white mb-1">{template.name}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{template.description}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-10 bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-slate-900/40 backdrop-blur-xl border border-indigo-500/30 rounded-[2.5rem] relative overflow-hidden group">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors duration-1000" />
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-600/40">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-black text-white mb-2 italic">Forge your destiny.</h2>
            <p className="text-slate-400 text-lg max-w-xl">
              Pro members get early access to AI matching and unlimited exports.
            </p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl h-14 px-10 text-lg shadow-xl shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95">
            Go Premium
          </Button>
        </div>
      </Card>
    </div>
  );
}
