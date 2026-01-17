import { useResume, Education, Experience, Certification } from '@/lib/resumeContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Plus, Trash2, User, Briefcase, GraduationCap, Award, Wrench, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function ResumeForm() {
  const {
    resume,
    updatePersonalInfo,
    updateSummary,
    updateEducation,
    updateExperience,
    updateCertifications,
    updateSkills,
    atsScore,
  } = useResume();

  const mockOptimize = (expId: string, index: number) => {
    toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
      loading: 'AI is analyzing and optimizing your achievement...',
      success: () => {
        const exp = resume.experience.find(e => e.id === expId);
        if (exp) {
          const newBullets = [...exp.bullets];
          newBullets[index] = `Optimized: ${newBullets[index]} with measurable impact and 25% efficiency increase.`;
          updateExperience(resume.experience.map(e => e.id === expId ? { ...e, bullets: newBullets } : e));
        }
        return 'Achievement optimized for ATS!';
      },
    });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      title: '',
      location: '',
      startDate: '',
      endDate: '',
      bullets: [''],
    };
    updateExperience([...resume.experience, newExp]);
  };

  const updateExperienceItem = (id: string, field: keyof Experience, value: string | string[]) => {
    updateExperience(resume.experience.map((exp) => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  const removeExperience = (id: string) => {
    updateExperience(resume.experience.filter((exp) => exp.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white mb-1">ATS Strength</h3>
          <p className="text-xs text-slate-500">How ready is your resume?</p>
        </div>
        <div className="relative w-16 h-16">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-800" />
            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={175.9} strokeDashoffset={175.9 - (175.9 * atsScore) / 100} className="text-indigo-500 transition-all duration-1000" />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-white">{atsScore}%</span>
        </div>
      </div>

      <Accordion type="single" collapsible defaultValue="personal" className="space-y-4">
        <AccordionItem value="personal" className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-800/30">
            <span className="flex items-center gap-4 text-white font-bold"><User className="w-5 h-5 text-indigo-400" /> Personal Info</span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 pt-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Full Name</Label>
                <Input value={resume.personalInfo.fullName} onChange={(e) => updatePersonalInfo({ fullName: e.target.value })} className="bg-slate-800/50 border-slate-700 text-white h-11 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email</Label>
                <Input value={resume.personalInfo.email} onChange={(e) => updatePersonalInfo({ email: e.target.value })} className="bg-slate-800/50 border-slate-700 text-white h-11 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Phone</Label>
                <Input value={resume.personalInfo.phone} onChange={(e) => updatePersonalInfo({ phone: e.target.value })} className="bg-slate-800/50 border-slate-700 text-white h-11 rounded-xl" />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience" className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-800/30">
            <span className="flex items-center gap-4 text-white font-bold"><Briefcase className="w-5 h-5 text-indigo-400" /> Experience</span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 pt-2 space-y-4">
            {resume.experience.map((exp, expIdx) => (
              <div key={exp.id} className="p-4 bg-slate-800/30 rounded-xl border border-slate-800/50 space-y-4">
                <div className="flex justify-between">
                  <span className="text-[10px] font-black text-indigo-400 uppercase">Position {expIdx + 1}</span>
                  <Button variant="ghost" size="icon" onClick={() => removeExperience(exp.id)} className="text-red-400"><Trash2 className="w-4 h-4" /></Button>
                </div>
                <Input value={exp.title} onChange={(e) => updateExperienceItem(exp.id, 'title', e.target.value)} placeholder="Job Title" className="bg-slate-800/50 border-slate-700 text-white h-11 rounded-xl" />
                <div className="space-y-2">
                  {exp.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex gap-2">
                      <Input value={bullet} onChange={(e) => {
                        const newBullets = [...exp.bullets];
                        newBullets[bIdx] = e.target.value;
                        updateExperienceItem(exp.id, 'bullets', newBullets);
                      }} className="bg-slate-800/50 border-slate-700 text-white h-11 rounded-xl flex-1" />
                      <Button onClick={() => mockOptimize(exp.id, bIdx)} variant="ghost" className="text-indigo-400 px-2 h-11"><Sparkles className="w-4 h-4" /></Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <Button onClick={addExperience} className="w-full bg-slate-800/50 border-dashed text-slate-400 hover:text-white"><Plus className="w-4 h-4 mr-2" /> Add Experience</Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skills" className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-800/30">
            <span className="flex items-center gap-4 text-white font-bold"><Wrench className="w-5 h-5 text-indigo-400" /> Skills</span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 pt-2 space-y-4">
            <Textarea value={resume.skills.technical.join(', ')} onChange={(e) => updateSkills({ ...resume.skills, technical: e.target.value.split(',').map(s => s.trim()) })} placeholder="Technical Skills (comma separated)" className="bg-slate-800/50 border-slate-700 text-white min-h-[80px]" />
            <Textarea value={resume.skills.tools.join(', ')} onChange={(e) => updateSkills({ ...resume.skills, tools: e.target.value.split(',').map(s => s.trim()) })} placeholder="Tools (comma separated)" className="bg-slate-800/50 border-slate-700 text-white min-h-[80px]" />
            <Textarea value={resume.skills.soft.join(', ')} onChange={(e) => updateSkills({ ...resume.skills, soft: e.target.value.split(',').map(s => s.trim()) })} placeholder="Soft Skills (comma separated)" className="bg-slate-800/50 border-slate-700 text-white min-h-[80px]" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
