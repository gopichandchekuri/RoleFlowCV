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
import { Plus, Trash2, User, Briefcase, GraduationCap, Award, Wrench } from 'lucide-react';

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

  const addExperience = () => {
    updateExperience([...resume.experience, {
      id: Date.now().toString(), company: '', title: '', location: '', startDate: '', endDate: '', bullets: ['']
    }]);
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

        <AccordionItem value="experience" className="border-slate-800">
          <AccordionTrigger className="hover:no-underline text-white font-bold"><Briefcase className="w-5 h-5 mr-2 text-indigo-400" /> Experience</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {resume.experience.map((exp, i) => (
              <div key={exp.id} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center"><span className="text-indigo-400 font-bold text-xs">Job {i+1}</span><Button variant="ghost" size="icon" onClick={() => updateExperience(resume.experience.filter(e => e.id !== exp.id))}><Trash2 className="w-4 h-4 text-red-400" /></Button></div>
                <Input value={exp.title} onChange={(e) => updateExperience(resume.experience.map(x => x.id === exp.id ? {...x, title: e.target.value} : x))} placeholder="Job Title" className="border-slate-800" />
                <Input value={exp.company} onChange={(e) => updateExperience(resume.experience.map(x => x.id === exp.id ? {...x, company: e.target.value} : x))} placeholder="Company" className="border-slate-800" />
                <div className="grid grid-cols-2 gap-2">
                  <Input value={exp.startDate} onChange={(e) => updateExperience(resume.experience.map(x => x.id === exp.id ? {...x, startDate: e.target.value} : x))} placeholder="Start Date" className="border-slate-800" />
                  <Input value={exp.endDate} onChange={(e) => updateExperience(resume.experience.map(x => x.id === exp.id ? {...x, endDate: e.target.value} : x))} placeholder="End Date" className="border-slate-800" />
                </div>
                <Textarea value={exp.bullets.join('\n')} onChange={(e) => updateExperience(resume.experience.map(x => x.id === exp.id ? {...x, bullets: e.target.value.split('\n')} : x))} placeholder="Achievements (one per line)" className="border-slate-800" />
              </div>
            ))}
            <Button onClick={addExperience} variant="outline" className="w-full border-dashed border-slate-800 text-slate-400"><Plus className="w-4 h-4 mr-2" /> Add Experience</Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education" className="border-slate-800">
          <AccordionTrigger className="hover:no-underline text-white font-bold"><GraduationCap className="w-5 h-5 mr-2 text-indigo-400" /> Education</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {resume.education.map((edu, i) => (
              <div key={edu.id} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
                <Input value={edu.school} onChange={(e) => updateEducation(resume.education.map(x => x.id === edu.id ? {...x, school: e.target.value} : x))} placeholder="School" className="border-slate-800" />
                <Input value={edu.degree} onChange={(e) => updateEducation(resume.education.map(x => x.id === edu.id ? {...x, degree: e.target.value} : x))} placeholder="Degree" className="border-slate-800" />
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

        <AccordionItem value="certifications" className="border-slate-800">
          <AccordionTrigger className="hover:no-underline text-white font-bold"><Award className="w-5 h-5 mr-2 text-indigo-400" /> Certifications</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {resume.certifications.map((cert) => (
              <div key={cert.id} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
                <Input value={cert.name} onChange={(e) => updateCertifications(resume.certifications.map(x => x.id === cert.id ? {...x, name: e.target.value} : x))} placeholder="Certification Name" className="border-slate-800" />
                <Input value={cert.issuer} onChange={(e) => updateCertifications(resume.certifications.map(x => x.id === cert.id ? {...x, issuer: e.target.value} : x))} placeholder="Issuing Organization" className="border-slate-800" />
                <Input value={cert.date} onChange={(e) => updateCertifications(resume.certifications.map(x => x.id === cert.id ? {...x, date: e.target.value} : x))} placeholder="Month/Year" className="border-slate-800" />
                <Input value={cert.url} onChange={(e) => updateCertifications(resume.certifications.map(x => x.id === cert.id ? {...x, url: e.target.value} : x))} placeholder="Credential URL" className="border-slate-800" />
              </div>
            ))}
            <Button onClick={addCertification} variant="outline" className="w-full border-dashed border-slate-800 text-slate-400"><Plus className="w-4 h-4 mr-2" /> Add Certification</Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skills" className="border-slate-800">
          <AccordionTrigger className="hover:no-underline text-white font-bold"><Wrench className="w-5 h-5 mr-2 text-indigo-400" /> Skills</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-slate-400 text-[10px] uppercase font-bold">Technical</Label>
              <Textarea value={resume.skills.technical.join(', ')} onChange={(e) => updateSkills({...resume.skills, technical: e.target.value.split(', ')})} className="bg-slate-900 border-slate-800" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-400 text-[10px] uppercase font-bold">Tools</Label>
              <Textarea value={resume.skills.tools.join(', ')} onChange={(e) => updateSkills({...resume.skills, tools: e.target.value.split(', ')})} className="bg-slate-900 border-slate-800" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-400 text-[10px] uppercase font-bold">Soft</Label>
              <Textarea value={resume.skills.soft.join(', ')} onChange={(e) => updateSkills({...resume.skills, soft: e.target.value.split(', ')})} className="bg-slate-900 border-slate-800" />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
