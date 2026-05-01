import { useState } from 'react';
import { useResume, Project } from '@/lib/resumeContext';
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
import { Plus, Trash2, User, Briefcase, GraduationCap, Award, Wrench, FolderGit2, X } from 'lucide-react';

export default function ResumeForm() {
  const {
    resume,
    updatePersonalInfo,
    updateSummary,
    updateEducation,
    updateExperience,
    updateProjects,
    updateCertifications,
    updateSkills,
  } = useResume();

  // Local state for the "Add Skill" input fields
  const [skillInputs, setSkillInputs] = useState({
    technical: '',
    tools: '',
    soft: ''
  });

  const handleAddSkill = (type: 'technical' | 'tools' | 'soft') => {
    const value = skillInputs[type].trim();
    if (!value) return;

    // Add to resume context
    updateSkills({
      ...resume.skills,
      [type]: [...resume.skills[type], value]
    });

    // Clear local input
    setSkillInputs({ ...skillInputs, [type]: '' });
  };

  const removeSkill = (type: 'technical' | 'tools' | 'soft', index: number) => {
    updateSkills({
      ...resume.skills,
      [type]: resume.skills[type].filter((_, i) => i !== index)
    });
  };

  const addExperience = () => {
    updateExperience([...resume.experience, {
      id: Date.now().toString(), company: '', title: '', location: '', startDate: '', endDate: '', bullets: ['']
    }]);
  };

  const addAchievement = (expId: string) => {
    updateExperience(resume.experience.map(exp => 
      exp.id === expId ? { ...exp, bullets: [...exp.bullets, ''] } : exp
    ));
  };

  const updateAchievement = (expId: string, bulletIndex: number, value: string) => {
    updateExperience(resume.experience.map(exp => {
      if (exp.id === expId) {
        const newBullets = [...exp.bullets];
        newBullets[bulletIndex] = value;
        return { ...exp, bullets: newBullets };
      }
      return exp;
    }));
  };

  const removeAchievement = (expId: string, bulletIndex: number) => {
    updateExperience(resume.experience.map(exp => {
      if (exp.id === expId) {
        return { ...exp, bullets: exp.bullets.filter((_, i) => i !== bulletIndex) };
      }
      return exp;
    }));
  };

  const addProject = () => {
    updateProjects([...(resume.projects || []), {
      id: Date.now().toString(), name: '', url: '', location: '', date: '', bullets: ['']
    }]);
  };

  const addProjectBullet = (projectId: string) => {
    updateProjects(resume.projects.map(p => 
      p.id === projectId ? { ...p, bullets: [...p.bullets, ''] } : p
    ));
  };

  const updateProjectBullet = (projectId: string, bulletIndex: number, value: string) => {
    updateProjects(resume.projects.map(p => {
      if (p.id === projectId) {
        const newBullets = [...p.bullets];
        newBullets[bulletIndex] = value;
        return { ...p, bullets: newBullets };
      }
      return p;
    }));
  };

  const removeProjectBullet = (projectId: string, bulletIndex: number) => {
    updateProjects(resume.projects.map(p => {
      if (p.id === projectId) {
        return { ...p, bullets: p.bullets.filter((_, i) => i !== bulletIndex) };
      }
      return p;
    }));
  };

  const addEducation = () => {
    updateEducation([...resume.education, {
      id: Date.now().toString(), school: '', degree: '', field: '', location: '', startDate: '', endDate: '', gpa: ''
    }]);
  };

  const addCertification = () => {
    updateCertifications([...resume.certifications, {
      id: Date.now().toString(), name: '', issuer: '', date: '', url: ''
    }]);
  };

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible defaultValue="personal" className="w-full">
        {/* Personal Info Section */}
        <AccordionItem value="personal" className="border-slate-800">
          <AccordionTrigger className="hover:no-underline text-white font-bold"><User className="w-5 h-5 mr-2 text-indigo-400" /> Personal Info</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-1">
                <Label className="text-slate-400 text-[10px] uppercase font-bold">Full Name</Label>
                <Input value={resume.personalInfo.fullName} onChange={(e) => updatePersonalInfo({ fullName: e.target.value })} className="bg-slate-900 border-slate-800" />
              </div>
              <div className="col-span-2 space-y-1">
                <Label className="text-slate-400 text-[10px] uppercase font-bold">Professional Title</Label>
                <Input value={resume.personalInfo.title} onChange={(e) => updatePersonalInfo({ title: e.target.value })} className="bg-slate-900 border-slate-800" />
              </div>
              <div className="space-y-1">
                <Label className="text-slate-400 text-[10px] uppercase font-bold">Email</Label>
                <Input value={resume.personalInfo.email} onChange={(e) => updatePersonalInfo({ email: e.target.value })} className="bg-slate-900 border-slate-800" />
              </div>
              <div className="space-y-1">
                <Label className="text-slate-400 text-[10px] uppercase font-bold">Phone</Label>
                <Input value={resume.personalInfo.phone} onChange={(e) => updatePersonalInfo({ phone: e.target.value })} className="bg-slate-900 border-slate-800" />
              </div>
              <div className="space-y-1">
                <Label className="text-slate-400 text-[10px] uppercase font-bold">LinkedIn</Label>
                <Input value={resume.personalInfo.linkedin} onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })} className="bg-slate-900 border-slate-800" />
              </div>
              <div className="space-y-1">
                <Label className="text-slate-400 text-[10px] uppercase font-bold">GitHub/Portfolio</Label>
                <Input value={resume.personalInfo.website} onChange={(e) => updatePersonalInfo({ website: e.target.value })} className="bg-slate-900 border-slate-800" />
              </div>
              <div className="col-span-2 space-y-1">
                <Label className="text-slate-400 text-[10px] uppercase font-bold">Location</Label>
                <Input value={resume.personalInfo.location} onChange={(e) => updatePersonalInfo({ location: e.target.value })} className="bg-slate-900 border-slate-800" />
              </div>
              <div className="col-span-2 space-y-1">
                <Label className="text-slate-400 text-[10px] uppercase font-bold">Summary</Label>
                <Textarea value={resume.summary} onChange={(e) => updateSummary(e.target.value)} className="bg-slate-900 border-slate-800 min-h-[100px]" />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Experience Section */}
        <AccordionItem value="experience" className="border-slate-800">
          <AccordionTrigger className="hover:no-underline text-white font-bold"><Briefcase className="w-5 h-5 mr-2 text-indigo-400" /> Experience</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {resume.experience.map((exp, i) => (
              <div key={exp.id} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center"><span className="text-indigo-400 font-bold text-xs">Job {i+1}</span><Button variant="ghost" size="icon" onClick={() => updateExperience(resume.experience.filter(e => e.id !== exp.id))}><Trash2 className="w-4 h-4 text-red-400" /></Button></div>
                <Input value={exp.company} onChange={(e) => updateExperience(resume.experience.map(x => x.id === exp.id ? {...x, company: e.target.value} : x))} placeholder="Company" className="border-slate-800" />
                <Input value={exp.title} onChange={(e) => updateExperience(resume.experience.map(x => x.id === exp.id ? {...x, title: e.target.value} : x))} placeholder="Job Title" className="border-slate-800" />
                <Input value={exp.location} onChange={(e) => updateExperience(resume.experience.map(x => x.id === exp.id ? {...x, location: e.target.value} : x))} placeholder="Location (City, State)" className="border-slate-800" />
                <div className="grid grid-cols-2 gap-2">
                  <Input value={exp.startDate} onChange={(e) => updateExperience(resume.experience.map(x => x.id === exp.id ? {...x, startDate: e.target.value} : x))} placeholder="Start Date" className="border-slate-800" />
                  <Input value={exp.endDate} onChange={(e) => updateExperience(resume.experience.map(x => x.id === exp.id ? {...x, endDate: e.target.value} : x))} placeholder="End Date" className="border-slate-800" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-400 text-[10px] uppercase font-bold">Achievements</Label>
                  {exp.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex gap-2">
                      <Input value={bullet} onChange={(e) => updateAchievement(exp.id, bIdx, e.target.value)} placeholder={`Achievement ${bIdx + 1}`} className="border-slate-800 flex-1" />
                      <Button variant="ghost" size="icon" onClick={() => removeAchievement(exp.id, bIdx)} disabled={exp.bullets.length === 1} className="text-red-400"><Trash2 className="w-3 h-3" /></Button>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" onClick={() => addAchievement(exp.id)} className="text-indigo-400 text-[10px] h-6"><Plus className="w-3 h-3 mr-1" /> Add Achievement</Button>
                </div>
              </div>
            ))}
            <Button onClick={addExperience} variant="outline" className="w-full border-dashed border-slate-800 text-slate-400"><Plus className="w-4 h-4 mr-2" /> Add Experience</Button>
          </AccordionContent>
        </AccordionItem>

        {/* Projects Section */}
        <AccordionItem value="projects" className="border-slate-800">
          <AccordionTrigger className="hover:no-underline text-white font-bold"><FolderGit2 className="w-5 h-5 mr-2 text-indigo-400" /> Projects</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {(resume.projects || []).map((project, i) => (
              <div key={project.id} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center"><span className="text-indigo-400 font-bold text-xs">Project {i+1}</span><Button variant="ghost" size="icon" onClick={() => updateProjects(resume.projects.filter(p => p.id !== project.id))}><Trash2 className="w-4 h-4 text-red-400" /></Button></div>
                <Input value={project.name} onChange={(e) => updateProjects(resume.projects.map(p => p.id === project.id ? {...p, name: e.target.value} : p))} placeholder="Project Name" className="border-slate-800" />
                <Input value={project.url} onChange={(e) => updateProjects(resume.projects.map(p => p.id === project.id ? {...p, url: e.target.value} : p))} placeholder="Project URL" className="border-slate-800" />
                <Input value={project.location} onChange={(e) => updateProjects(resume.projects.map(p => p.id === project.id ? {...p, location: e.target.value} : p))} placeholder="Location (e.g. Remote)" className="border-slate-800" />
                <Input value={project.date} onChange={(e) => updateProjects(resume.projects.map(p => p.id === project.id ? {...p, date: e.target.value} : p))} placeholder="Date (e.g. Jan 2023 - Mar 2023)" className="border-slate-800" />
                <div className="space-y-2">
                  <Label className="text-slate-400 text-[10px] uppercase font-bold">Details</Label>
                  {project.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex gap-2">
                      <Input value={bullet} onChange={(e) => updateProjectBullet(project.id, bIdx, e.target.value)} placeholder={`Detail ${bIdx + 1}`} className="border-slate-800 flex-1" />
                      <Button variant="ghost" size="icon" onClick={() => removeProjectBullet(project.id, bIdx)} disabled={project.bullets.length === 1} className="text-red-400"><Trash2 className="w-3 h-3" /></Button>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" onClick={() => addProjectBullet(project.id)} className="text-indigo-400 text-[10px] h-6"><Plus className="w-3 h-3 mr-1" /> Add Detail</Button>
                </div>
              </div>
            ))}
            <Button onClick={addProject} variant="outline" className="w-full border-dashed border-slate-800 text-slate-400"><Plus className="w-4 h-4 mr-2" /> Add Project</Button>
          </AccordionContent>
        </AccordionItem>

        {/* Education Section */}
        <AccordionItem value="education" className="border-slate-800">
          <AccordionTrigger className="hover:no-underline text-white font-bold"><GraduationCap className="w-5 h-5 mr-2 text-indigo-400" /> Education</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {resume.education.map((edu, i) => (
              <div key={edu.id} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center"><span className="text-indigo-400 font-bold text-xs">School {i+1}</span><Button variant="ghost" size="icon" onClick={() => updateEducation(resume.education.filter(e => e.id !== edu.id))}><Trash2 className="w-4 h-4 text-red-400" /></Button></div>
                <Input value={edu.school} onChange={(e) => updateEducation(resume.education.map(x => x.id === edu.id ? {...x, school: e.target.value} : x))} placeholder="School/University" className="border-slate-800" />
                <Input value={edu.degree} onChange={(e) => updateEducation(resume.education.map(x => x.id === edu.id ? {...x, degree: e.target.value} : x))} placeholder="Degree" className="border-slate-800" />
                <Input value={edu.field} onChange={(e) => updateEducation(resume.education.map(x => x.id === edu.id ? {...x, field: e.target.value} : x))} placeholder="Field of Study" className="border-slate-800" />
                <Input value={edu.location} onChange={(e) => updateEducation(resume.education.map(x => x.id === edu.id ? {...x, location: e.target.value} : x))} placeholder="Location (City, State)" className="border-slate-800" />
                <div className="grid grid-cols-2 gap-2">
                  <Input value={edu.startDate} onChange={(e) => updateEducation(resume.education.map(x => x.id === edu.id ? {...x, startDate: e.target.value} : x))} placeholder="Start Date" className="border-slate-800" />
                  <Input value={edu.endDate} onChange={(e) => updateEducation(resume.education.map(x => x.id === edu.id ? {...x, endDate: e.target.value} : x))} placeholder="End Date" className="border-slate-800" />
                </div>
                <Input value={edu.gpa} onChange={(e) => updateEducation(resume.education.map(x => x.id === edu.id ? {...x, gpa: e.target.value} : x))} placeholder="GPA" className="border-slate-800" />
              </div>
            ))}
            <Button onClick={addEducation} variant="outline" className="w-full border-dashed border-slate-800 text-slate-400"><Plus className="w-4 h-4 mr-2" /> Add Education</Button>
          </AccordionContent>
        </AccordionItem>

        {/* Certifications Section */}
        <AccordionItem value="certifications" className="border-slate-800">
          <AccordionTrigger className="hover:no-underline text-white font-bold"><Award className="w-5 h-5 mr-2 text-indigo-400" /> Certifications</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {resume.certifications.map((cert) => (
              <div key={cert.id} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center"><span className="text-indigo-400 font-bold text-xs">Certification</span><Button variant="ghost" size="icon" onClick={() => updateCertifications(resume.certifications.filter(c => c.id !== cert.id))}><Trash2 className="w-4 h-4 text-red-400" /></Button></div>
                <Input value={cert.name} onChange={(e) => updateCertifications(resume.certifications.map(x => x.id === cert.id ? {...x, name: e.target.value} : x))} placeholder="Certification Name" className="border-slate-800" />
                <Input value={cert.issuer} onChange={(e) => updateCertifications(resume.certifications.map(x => x.id === cert.id ? {...x, issuer: e.target.value} : x))} placeholder="Issuing Organization" className="border-slate-800" />
                <Input value={cert.date} onChange={(e) => updateCertifications(resume.certifications.map(x => x.id === cert.id ? {...x, date: e.target.value} : x))} placeholder="Month/Year" className="border-slate-800" />
                <Input value={cert.url} onChange={(e) => updateCertifications(resume.certifications.map(x => x.id === cert.id ? {...x, url: e.target.value} : x))} placeholder="Credential URL" className="border-slate-800" />
              </div>
            ))}
            <Button onClick={addCertification} variant="outline" className="w-full border-dashed border-slate-800 text-slate-400"><Plus className="w-4 h-4 mr-2" /> Add Certification</Button>
          </AccordionContent>
        </AccordionItem>

        {/* Updated Skills Section */}
        <AccordionItem value="skills" className="border-slate-800">
          <AccordionTrigger className="hover:no-underline text-white font-bold">
            <Wrench className="w-5 h-5 mr-2 text-indigo-400" /> Skills
          </AccordionTrigger>
          <AccordionContent className="space-y-6 pt-4">
            {(['technical', 'tools', 'soft'] as const).map((type) => (
              <div key={type} className="space-y-3">
                <Label className="text-slate-400 text-[10px] uppercase font-bold capitalize">{type} Skills</Label>

                <div className="flex gap-2">
                  <Input 
                    placeholder={`Add ${type} skill...`}
                    value={skillInputs[type]}
                    onChange={(e) => setSkillInputs({ ...skillInputs, [type]: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill(type))}
                    className="bg-slate-900 border-slate-800 h-9 text-sm"
                  />
                  <Button 
                    type="button" 
                    onClick={() => handleAddSkill(type)}
                    className="bg-indigo-600 hover:bg-indigo-700 h-9 px-3"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {resume.skills[type].map((skill, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-indigo-300 px-2.5 py-1 rounded-md text-xs group transition-colors hover:border-indigo-500"
                    >
                      {skill}
                      <button 
                        onClick={() => removeSkill(type, index)}
                        className="text-slate-500 hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {resume.skills[type].length === 0 && (
                    <p className="text-[10px] text-slate-600 italic">No skills added yet.</p>
                  )}
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}