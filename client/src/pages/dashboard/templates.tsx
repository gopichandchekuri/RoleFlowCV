import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Sparkles } from 'lucide-react';

const templates = [
  {
    id: '1',
    name: 'Professional',
    description: 'Clean and modern design for corporate roles',
    isPro: false,
    color: 'from-slate-600 to-slate-800',
  },
  {
    id: '2',
    name: 'Creative',
    description: 'Stand out with unique layouts and styling',
    isPro: true,
    color: 'from-purple-600 to-indigo-800',
  },
  {
    id: '3',
    name: 'Minimalist',
    description: 'Simple and elegant for all industries',
    isPro: false,
    color: 'from-slate-500 to-slate-700',
  },
  {
    id: '4',
    name: 'Executive',
    description: 'Premium design for senior positions',
    isPro: true,
    color: 'from-amber-600 to-orange-800',
  },
  {
    id: '5',
    name: 'Tech Modern',
    description: 'Perfect for developers and tech roles',
    isPro: false,
    color: 'from-cyan-600 to-blue-800',
  },
  {
    id: '6',
    name: 'Academic',
    description: 'Ideal for research and academic positions',
    isPro: true,
    color: 'from-emerald-600 to-teal-800',
  },
];

export default function TemplatesPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Templates</h1>
        <p className="text-slate-400">Choose a professionally designed template to get started</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, index) => (
          <Card
            key={template.id}
            className={`group bg-slate-900/50 border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover-lift cursor-pointer animate-fade-in-up opacity-0`}
            style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            data-testid={`card-template-${template.id}`}
          >
            <div className={`aspect-[3/4] bg-gradient-to-br ${template.color} relative overflow-hidden`}>
              <div className="absolute inset-0 p-6 flex flex-col">
                <div className="w-full h-3 bg-white/20 rounded mb-2" />
                <div className="w-3/4 h-2 bg-white/15 rounded mb-4" />
                <div className="flex-1 space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-full h-1.5 bg-white/10 rounded" />
                  ))}
                </div>
              </div>
              {template.isPro && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-amber-500/90 text-white border-none px-2 py-1 flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    PRO
                  </Badge>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl cursor-pointer"
                  data-testid={`button-use-template-${template.id}`}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Use Template
                </Button>
              </div>
            </div>
            <div className="p-4 border-t border-slate-800">
              <h3 className="font-semibold text-white">{template.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{template.description}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-8 p-6 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-indigo-700/50 rounded-2xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-display font-bold text-white mb-1">
              Unlock All Pro Templates
            </h3>
            <p className="text-slate-400">
              Get access to premium templates, AI suggestions, and unlimited exports
            </p>
          </div>
          <Button
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl cursor-pointer px-8"
            data-testid="button-upgrade"
          >
            Upgrade to Pro
          </Button>
        </div>
      </Card>
    </div>
  );
}
