import { useLocation } from 'wouter';
import { useResume } from '@/lib/resumeContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, FileText, Edit3, Trash2, Copy, MoreVertical, Calendar } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function MyResumesPage() {
  const { resumes, setCurrentResumeId } = useResume();
  const [, setLocation] = useLocation();

  const handleEdit = (id: string) => {
    setCurrentResumeId(id);
    setLocation('/editor');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">My Resumes</h1>
          <p className="text-slate-400">Create and manage your professional resumes</p>
        </div>
        <Button
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl cursor-pointer hover-lift inline-flex items-center gap-2"
          data-testid="button-create-resume"
        >
          <Plus className="w-5 h-5" />
          New Resume
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes.map((resume, index) => (
          <Card
            key={resume.id}
            className={`group bg-slate-900/50 border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover-lift cursor-pointer animate-fade-in-up opacity-0`}
            style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            data-testid={`card-resume-${resume.id}`}
            onClick={() => handleEdit(resume.id)}
          >
            <div className="aspect-[3/4] bg-slate-800/50 relative overflow-hidden">
              <div className="absolute inset-0 p-6 flex flex-col">
                <div className="w-full h-2 bg-slate-700/50 rounded mb-2" />
                <div className="w-3/4 h-2 bg-slate-700/50 rounded mb-4" />
                <div className="flex-1 space-y-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-full h-1.5 bg-slate-700/30 rounded" />
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(resume.id);
                  }}
                  data-testid={`button-edit-resume-${resume.id}`}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Resume
                </Button>
              </div>
            </div>
            <div className="p-4 border-t border-slate-800">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{resume.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>Updated today</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 text-slate-400 hover:text-white cursor-pointer"
                      data-testid={`button-menu-resume-${resume.id}`}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                    <DropdownMenuItem className="text-slate-300 cursor-pointer">
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-400 cursor-pointer">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </Card>
        ))}

        <Card
          className="group bg-slate-900/30 border-slate-800 border-dashed rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 cursor-pointer flex items-center justify-center min-h-[320px]"
          data-testid="card-create-resume"
        >
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-600/20 transition-colors">
              <Plus className="w-8 h-8 text-slate-500 group-hover:text-indigo-400 transition-colors" />
            </div>
            <h3 className="font-semibold text-slate-400 group-hover:text-white transition-colors">
              Create New Resume
            </h3>
            <p className="text-sm text-slate-600 mt-1">Start from scratch</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
