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
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

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
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return location === '/dashboard' || location === '/dashboard/';
    }
    return location.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900/95 backdrop-blur-xl border-r border-slate-800 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-800">
            <Link href="/dashboard" className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-white">
                Resume<span className="text-indigo-400">Forge</span>
              </span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group ${
                  isActive(item.href)
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
                data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className={isActive(item.href) ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
                {isActive(item.href) && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-800">
            <div className="flex items-center gap-3 px-4 py-3 mb-2">
              <Avatar className="w-10 h-10 border-2 border-slate-700">
                <AvatarFallback className="bg-slate-800 text-indigo-400 font-semibold">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-slate-500 truncate">{user?.email || 'user@example.com'}</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-slate-800 cursor-pointer"
              data-testid="button-logout"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white cursor-pointer"
              data-testid="button-menu"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="flex items-center gap-4 ml-auto">
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full text-slate-400 hover:text-white cursor-pointer"
              >
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
