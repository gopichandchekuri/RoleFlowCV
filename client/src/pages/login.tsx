import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/lib/authContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import loginBg from '@assets/generated_images/glassmorphism_login_background.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login(email, password);
    setIsLoading(false);
    setLocation('/dashboard');
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${loginBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-indigo-950/60 to-slate-900/80" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-fade-in-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass mb-6">
              <FileText className="w-8 h-8 text-indigo-400" />
            </div>
            <h1 className="text-4xl font-display font-bold text-white mb-2">
              Resume<span className="gradient-text">Forge</span>
            </h1>
            <p className="text-slate-400 text-lg">
              Craft your perfect resume with AI
            </p>
          </div>

          <div 
            className="glass rounded-2xl p-8 shadow-2xl animate-fade-in-up opacity-0 stagger-2"
            style={{ animationFillMode: 'forwards' }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300 font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500/20 h-12"
                    data-testid="input-email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500/20 h-12"
                    data-testid="input-password"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
                data-testid="button-login"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <p className="text-center text-slate-400 text-sm">
                Don't have an account?{' '}
                <button 
                  className="text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer transition-colors"
                  data-testid="link-signup"
                >
                  Sign up free
                </button>
              </p>
            </div>
          </div>

          <div 
            className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-sm animate-fade-in-up opacity-0 stagger-3"
            style={{ animationFillMode: 'forwards' }}
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Powered by AI for smarter resumes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
