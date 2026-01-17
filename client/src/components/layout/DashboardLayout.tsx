import { ReactNode, useState } from 'react';
import { useLocation, Link } from 'wouter';
import { useAuth } from '@/lib/authContext';
import { 
  FileText, 
  LayoutTemplate, 
  Sparkles, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  User,
  Settings,
  Shield,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  { label: 'My Resumes', href: '/dashboard', icon: <FileText className="w-5 h-5" /> },
  { label: 'Templates', href: '/dashboard/templates', icon: <LayoutTemplate className="w-5 h-5" /> },
  { label: 'AI Job Match', href: '/dashboard/ai-match', icon: <Sparkles className="w-5 h-5" /> },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setLocation('/');
    toast.info('Logged out successfully');
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return location === '/dashboard' || location === '/dashboard/';
    }
    return location.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex">
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900/40 backdrop-blur-2xl border-r border-slate-800/50 transform transition-transform duration-500 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-8">
            <Link href="/dashboard" className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-600/20 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-black text-white tracking-tight">
                  Resume<span className="text-indigo-400">Forge</span>
                </span>
                <span className="text-[10px] block text-slate-500 font-bold uppercase tracking-[0.2em]">Craft Station</span>
              </div>
            </Link>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-4">Workspace</div>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl cursor-pointer transition-all duration-300 group ${
                  isActive(item.href)
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'text-slate-400 hover:bg-slate-800/40 hover:text-white'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className={`p-2 rounded-xl transition-colors ${isActive(item.href) ? 'bg-white/10' : 'bg-slate-800/50 group-hover:text-indigo-400'}`}>
                  {item.icon}
                </span>
                <span className="font-bold tracking-tight">{item.label}</span>
                {isActive(item.href) && (
                  <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                )}
              </Link>
            ))}
          </nav>

          <div className="p-6">
            <div className="bg-slate-800/30 rounded-[2rem] p-4 border border-slate-800/50">
              <div className="flex items-center gap-4 px-2">
                <Avatar className="w-12 h-12 border-2 border-indigo-500/20">
                  <AvatarFallback className="bg-indigo-600/20 text-indigo-400 font-black text-lg">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-white truncate">{user?.name || 'User'}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase truncate">{user?.email || 'user@example.com'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 lg:ml-72 flex flex-col">
        <header className="sticky top-0 z-30 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50">
          <div className="flex items-center justify-between px-6 lg:px-12 h-20">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-3 bg-slate-900/50 rounded-xl text-slate-400 hover:text-white cursor-pointer"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="flex items-center gap-6 ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-12 w-12 rounded-2xl bg-slate-900/50 border border-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer p-0"
                  >
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-slate-900 border-slate-800 rounded-2xl p-2 shadow-2xl">
                  <DropdownMenuLabel className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-black text-white">{user?.name}</span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{user?.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-800" />
                  <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 rounded-xl focus:bg-slate-800 focus:text-white cursor-pointer text-slate-400">
                    <Settings className="w-4 h-4" />
                    <span className="font-bold text-xs tracking-tight">Account Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 rounded-xl focus:bg-slate-800 focus:text-white cursor-pointer text-slate-400">
                    <Shield className="w-4 h-4" />
                    <span className="font-bold text-xs tracking-tight">Privacy & Security</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 rounded-xl focus:bg-slate-800 focus:text-white cursor-pointer text-slate-400">
                    <CreditCard className="w-4 h-4" />
                    <span className="font-bold text-xs tracking-tight">Billing & Plans</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-800" />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl focus:bg-red-500/10 focus:text-red-400 cursor-pointer text-red-400/80"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-bold text-xs tracking-tight">Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-12">
          {children}
        </main>
      </div>
    </div>
  );
}
