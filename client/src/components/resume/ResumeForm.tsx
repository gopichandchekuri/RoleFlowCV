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
import { Plus, Trash2, GripVertical, User, Briefcase, GraduationCap, Award, Wrench } from 'lucide-react';

export default function ResumeForm() {
  const {
    resume,
    updatePersonalInfo,
    updateSummary,
    updateEducation,
    updateExperience,
    updateCertifications,
    updateSkills,
  } = useResume();

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
    };
    updateEducation([...resume.education, newEdu]);
  };

  const updateEducationItem = (id: string, field: keyof Education, value: string) => {
    updateEducation(
      resume.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const removeEducation = (id: string) => {
    updateEducation(resume.education.filter((edu) => edu.id !== id));
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
    updateExperience(
      resume.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const removeExperience = (id: string) => {
    updateExperience(resume.experience.filter((exp) => exp.id !== id));
  };

  const addBullet = (expId: string) => {
    const exp = resume.experience.find((e) => e.id === expId);
    if (exp) {
      updateExperienceItem(expId, 'bullets', [...exp.bullets, '']);
    }
  };

  const updateBullet = (expId: string, bulletIndex: number, value: string) => {
    const exp = resume.experience.find((e) => e.id === expId);
    if (exp) {
      const newBullets = [...exp.bullets];
      newBullets[bulletIndex] = value;
      updateExperienceItem(expId, 'bullets', newBullets);
    }
  };

  const removeBullet = (expId: string, bulletIndex: number) => {
    const exp = resume.experience.find((e) => e.id === expId);
    if (exp && exp.bullets.length > 1) {
      updateExperienceItem(expId, 'bullets', exp.bullets.filter((_, i) => i !== bulletIndex));
    }
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      url: '',
    };
    updateCertifications([...resume.certifications, newCert]);
  };

  const updateCertificationItem = (id: string, field: keyof Certification, value: string) => {
    updateCertifications(
      resume.certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    );
  };

  const removeCertification = (id: string) => {
    updateCertifications(resume.certifications.filter((cert) => cert.id !== id));
  };

  const updateSkillCategory = (category: 'technical' | 'tools' | 'soft', value: string) => {
    updateSkills({
      ...resume.skills,
      [category]: value.split(',').map((s) => s.trim()).filter(Boolean),
    });
  };

  return (
    <div className="h-full pr-2">
      <Accordion type="single" collapsible defaultValue="personal" className="space-y-4">
        <AccordionItem value="personal" className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 data-[state=open]:border-indigo-500/50 data-[state=open]:shadow-lg data-[state=open]:shadow-indigo-500/5">
          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-800/30 transition-colors group cursor-pointer">
            <span className="flex items-center gap-4 text-white font-bold tracking-tight">
              <div className="p-2 bg-indigo-500/10 rounded-xl group-data-[state=open]:bg-indigo-500 group-data-[state=open]:text-white transition-colors">
                <User className="w-5 h-5" />
              </div>
              Personal Information
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 pt-2 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2 space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Full Name</Label>
                <Input
                  value={resume.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
                  className="bg-slate-800/50 border-slate-700 text-white h-12 rounded-xl focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email</Label>
                <Input
                  type="email"
                  value={resume.personalInfo.email}
                  onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                  className="bg-slate-800/50 border-slate-700 text-white h-12 rounded-xl focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Phone</Label>
                <Input
                  value={resume.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                  className="bg-slate-800/50 border-slate-700 text-white h-12 rounded-xl focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Professional Summary</Label>
                <Textarea
                  value={resume.summary}
                  onChange={(e) => updateSummary(e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-white min-h-[120px] rounded-xl focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none p-4"
                  placeholder="Tell your professional story..."
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience" className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 data-[state=open]:border-indigo-500/50 data-[state=open]:shadow-lg data-[state=open]:shadow-indigo-500/5">
          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-800/30 transition-colors group cursor-pointer">
            <span className="flex items-center gap-4 text-white font-bold tracking-tight">
              <div className="p-2 bg-indigo-500/10 rounded-xl group-data-[state=open]:bg-indigo-500 group-data-[state=open]:text-white transition-colors">
                <Briefcase className="w-5 h-5" />
              </div>
              Work Experience
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 pt-2 space-y-4">
            {resume.experience.map((exp, index) => (
              <div key={exp.id} className="p-6 bg-slate-800/30 rounded-2xl border border-slate-800/50 space-y-4 group/item">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Position {index + 1}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeExperience(exp.id)}
                    className="w-8 h-8 text-red-400/50 hover:text-red-400 hover:bg-red-400/10 rounded-lg cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Job Title</Label>
                    <Input
                      value={exp.title}
                      onChange={(e) => updateExperienceItem(exp.id, 'title', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white h-11 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Company</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperienceItem(exp.id, 'company', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white h-11 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Location</Label>
                    <Input
                      value={exp.location}
                      onChange={(e) => updateExperienceItem(exp.id, 'location', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white h-11 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Start Date</Label>
                    <Input
                      value={exp.startDate}
                      onChange={(e) => updateExperienceItem(exp.id, 'startDate', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white h-11 rounded-xl"
                      placeholder="Jan 2020"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">End Date</Label>
                    <Input
                      value={exp.endDate}
                      onChange={(e) => updateExperienceItem(exp.id, 'endDate', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white h-11 rounded-xl"
                      placeholder="Present"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              onClick={addExperience}
              className="w-full h-12 bg-slate-800/50 border border-slate-700 border-dashed text-slate-400 hover:text-white hover:bg-slate-800 rounded-2xl cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education" className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 data-[state=open]:border-indigo-500/50 data-[state=open]:shadow-lg data-[state=open]:shadow-indigo-500/5">
          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-800/30 transition-colors group cursor-pointer">
            <span className="flex items-center gap-4 text-white font-bold tracking-tight">
              <div className="p-2 bg-indigo-500/10 rounded-xl group-data-[state=open]:bg-indigo-500 group-data-[state=open]:text-white transition-colors">
                <GraduationCap className="w-5 h-5" />
              </div>
              Education
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 pt-2 space-y-4">
            {resume.education.map((edu, index) => (
              <div key={edu.id} className="p-6 bg-slate-800/30 rounded-2xl border border-slate-800/50 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Academic {index + 1}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeEducation(edu.id)}
                    className="w-8 h-8 text-red-400/50 hover:text-red-400 hover:bg-red-400/10 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">School</Label>
                    <Input
                      value={edu.school}
                      onChange={(e) => updateEducationItem(edu.id, 'school', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white h-11 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Degree</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducationItem(edu.id, 'degree', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white h-11 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">GPA</Label>
                    <Input
                      value={edu.gpa || ''}
                      onChange={(e) => updateEducationItem(edu.id, 'gpa', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white h-11 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              onClick={addEducation}
              className="w-full h-12 bg-slate-800/50 border border-slate-700 border-dashed text-slate-400 hover:text-white hover:bg-slate-800 rounded-2xl cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skills" className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 data-[state=open]:border-indigo-500/50 data-[state=open]:shadow-lg data-[state=open]:shadow-indigo-500/5">
          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-800/30 transition-colors group cursor-pointer">
            <span className="flex items-center gap-4 text-white font-bold tracking-tight">
              <div className="p-2 bg-indigo-500/10 rounded-xl group-data-[state=open]:bg-indigo-500 group-data-[state=open]:text-white transition-colors">
                <Wrench className="w-5 h-5" />
              </div>
              Skills & Expertise
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 pt-2 space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Technical</Label>
              <Textarea
                value={resume.skills.technical.join(', ')}
                onChange={(e) => updateSkillCategory('technical', e.target.value)}
                className="bg-slate-800/50 border-slate-700 text-white min-h-[80px] rounded-xl focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                placeholder="JavaScript, React, Node.js..."
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tools</Label>
              <Textarea
                value={resume.skills.tools.join(', ')}
                onChange={(e) => updateSkillCategory('tools', e.target.value)}
                className="bg-slate-800/50 border-slate-700 text-white min-h-[80px] rounded-xl focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                placeholder="Git, AWS, Docker..."
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
