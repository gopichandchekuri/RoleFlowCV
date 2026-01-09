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
    <div className="h-full overflow-y-auto pr-2">
      <Accordion type="multiple" defaultValue={['personal', 'experience']} className="space-y-3">
        <AccordionItem value="personal" className="bg-slate-800/50 border-slate-700 rounded-xl overflow-hidden">
          <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-slate-700/30 cursor-pointer">
            <span className="flex items-center gap-3 text-white font-medium">
              <User className="w-5 h-5 text-indigo-400" />
              Personal Information
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label className="text-slate-400 text-sm">Full Name</Label>
                <Input
                  value={resume.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
                  className="bg-slate-800/50 border-slate-700 text-white mt-1"
                  data-testid="input-fullname"
                />
              </div>
              <div>
                <Label className="text-slate-400 text-sm">Email</Label>
                <Input
                  type="email"
                  value={resume.personalInfo.email}
                  onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                  className="bg-slate-800/50 border-slate-700 text-white mt-1"
                  data-testid="input-email-form"
                />
              </div>
              <div>
                <Label className="text-slate-400 text-sm">Phone</Label>
                <Input
                  value={resume.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                  className="bg-slate-800/50 border-slate-700 text-white mt-1"
                  data-testid="input-phone"
                />
              </div>
              <div>
                <Label className="text-slate-400 text-sm">Location</Label>
                <Input
                  value={resume.personalInfo.location}
                  onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                  className="bg-slate-800/50 border-slate-700 text-white mt-1"
                  data-testid="input-location"
                />
              </div>
              <div>
                <Label className="text-slate-400 text-sm">LinkedIn</Label>
                <Input
                  value={resume.personalInfo.linkedin || ''}
                  onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
                  className="bg-slate-800/50 border-slate-700 text-white mt-1"
                  placeholder="linkedin.com/in/username"
                  data-testid="input-linkedin"
                />
              </div>
              <div className="col-span-2">
                <Label className="text-slate-400 text-sm">Website</Label>
                <Input
                  value={resume.personalInfo.website || ''}
                  onChange={(e) => updatePersonalInfo({ website: e.target.value })}
                  className="bg-slate-800/50 border-slate-700 text-white mt-1"
                  placeholder="yourwebsite.com"
                  data-testid="input-website"
                />
              </div>
            </div>
            <div>
              <Label className="text-slate-400 text-sm">Professional Summary</Label>
              <Textarea
                value={resume.summary}
                onChange={(e) => updateSummary(e.target.value)}
                className="bg-slate-800/50 border-slate-700 text-white mt-1 min-h-[100px] resize-none"
                placeholder="A brief overview of your professional background..."
                data-testid="textarea-summary"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience" className="bg-slate-800/50 border-slate-700 rounded-xl overflow-hidden">
          <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-slate-700/30 cursor-pointer">
            <span className="flex items-center gap-3 text-white font-medium">
              <Briefcase className="w-5 h-5 text-indigo-400" />
              Experience
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 space-y-4">
            {resume.experience.map((exp, index) => (
              <div key={exp.id} className="p-4 bg-slate-900/50 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <GripVertical className="w-4 h-4" />
                    <span className="text-sm font-medium">Position {index + 1}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeExperience(exp.id)}
                    className="w-8 h-8 text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                    data-testid={`button-remove-exp-${exp.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Label className="text-slate-400 text-sm">Job Title</Label>
                    <Input
                      value={exp.title}
                      onChange={(e) => updateExperienceItem(exp.id, 'title', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white mt-1"
                      data-testid={`input-exp-title-${exp.id}`}
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Company</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperienceItem(exp.id, 'company', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white mt-1"
                      data-testid={`input-exp-company-${exp.id}`}
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Location</Label>
                    <Input
                      value={exp.location}
                      onChange={(e) => updateExperienceItem(exp.id, 'location', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white mt-1"
                      data-testid={`input-exp-location-${exp.id}`}
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Start Date</Label>
                    <Input
                      value={exp.startDate}
                      onChange={(e) => updateExperienceItem(exp.id, 'startDate', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white mt-1"
                      placeholder="Jan 2020"
                      data-testid={`input-exp-start-${exp.id}`}
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">End Date</Label>
                    <Input
                      value={exp.endDate}
                      onChange={(e) => updateExperienceItem(exp.id, 'endDate', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white mt-1"
                      placeholder="Present"
                      data-testid={`input-exp-end-${exp.id}`}
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-slate-400 text-sm mb-2 block">Bullet Points</Label>
                  {exp.bullets.map((bullet, bulletIndex) => (
                    <div key={bulletIndex} className="flex gap-2 mb-2">
                      <Input
                        value={bullet}
                        onChange={(e) => updateBullet(exp.id, bulletIndex, e.target.value)}
                        className="bg-slate-800/50 border-slate-700 text-white flex-1"
                        placeholder="Describe an achievement or responsibility..."
                        data-testid={`input-exp-bullet-${exp.id}-${bulletIndex}`}
                      />
                      {exp.bullets.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeBullet(exp.id, bulletIndex)}
                          className="w-10 h-10 text-slate-400 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="ghost"
                    onClick={() => addBullet(exp.id)}
                    className="text-indigo-400 hover:text-indigo-300 cursor-pointer text-sm"
                    data-testid={`button-add-bullet-${exp.id}`}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Bullet
                  </Button>
                </div>
              </div>
            ))}
            <Button
              onClick={addExperience}
              className="w-full bg-slate-700/50 hover:bg-slate-700 text-slate-300 cursor-pointer"
              data-testid="button-add-experience"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education" className="bg-slate-800/50 border-slate-700 rounded-xl overflow-hidden">
          <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-slate-700/30 cursor-pointer">
            <span className="flex items-center gap-3 text-white font-medium">
              <GraduationCap className="w-5 h-5 text-indigo-400" />
              Education
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 space-y-4">
            {resume.education.map((edu, index) => (
              <div key={edu.id} className="p-4 bg-slate-900/50 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <GripVertical className="w-4 h-4" />
                    <span className="text-sm font-medium">Education {index + 1}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeEducation(edu.id)}
                    className="w-8 h-8 text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                    data-testid={`button-remove-edu-${edu.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Label className="text-slate-400 text-sm">School / University</Label>
                    <Input
                      value={edu.school}
                      onChange={(e) => updateEducationItem(edu.id, 'school', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white mt-1"
                      data-testid={`input-edu-school-${edu.id}`}
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Degree</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducationItem(edu.id, 'degree', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white mt-1"
                      placeholder="Bachelor of Science"
                      data-testid={`input-edu-degree-${edu.id}`}
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Field of Study</Label>
                    <Input
                      value={edu.field}
                      onChange={(e) => updateEducationItem(edu.id, 'field', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white mt-1"
                      placeholder="Computer Science"
                      data-testid={`input-edu-field-${edu.id}`}
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Start Year</Label>
                    <Input
                      value={edu.startDate}
                      onChange={(e) => updateEducationItem(edu.id, 'startDate', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white mt-1"
                      placeholder="2018"
                      data-testid={`input-edu-start-${edu.id}`}
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">End Year</Label>
                    <Input
                      value={edu.endDate}
                      onChange={(e) => updateEducationItem(edu.id, 'endDate', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white mt-1"
                      placeholder="2022"
                      data-testid={`input-edu-end-${edu.id}`}
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">GPA (optional)</Label>
                    <Input
                      value={edu.gpa || ''}
                      onChange={(e) => updateEducationItem(edu.id, 'gpa', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white mt-1"
                      placeholder="3.8"
                      data-testid={`input-edu-gpa-${edu.id}`}
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Location</Label>
                    <Input
                      value={edu.location}
                      onChange={(e) => updateEducationItem(edu.id, 'location', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white mt-1"
                      data-testid={`input-edu-location-${edu.id}`}
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              onClick={addEducation}
              className="w-full bg-slate-700/50 hover:bg-slate-700 text-slate-300 cursor-pointer"
              data-testid="button-add-education"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="certifications" className="bg-slate-800/50 border-slate-700 rounded-xl overflow-hidden">
          <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-slate-700/30 cursor-pointer">
            <span className="flex items-center gap-3 text-white font-medium">
              <Award className="w-5 h-5 text-indigo-400" />
              Certifications
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 space-y-4">
            {resume.certifications.map((cert, index) => (
              <div key={cert.id} className="p-4 bg-slate-900/50 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <GripVertical className="w-4 h-4" />
                    <span className="text-sm font-medium">Certification {index + 1}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCertification(cert.id)}
                    className="w-8 h-8 text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                    data-testid={`button-remove-cert-${cert.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Label className="text-slate-400 text-sm">Certification Name</Label>
                    <Input
                      value={cert.name}
                      onChange={(e) => updateCertificationItem(cert.id, 'name', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white mt-1"
                      data-testid={`input-cert-name-${cert.id}`}
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Issuer</Label>
                    <Input
                      value={cert.issuer}
                      onChange={(e) => updateCertificationItem(cert.id, 'issuer', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white mt-1"
                      data-testid={`input-cert-issuer-${cert.id}`}
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Date</Label>
                    <Input
                      value={cert.date}
                      onChange={(e) => updateCertificationItem(cert.id, 'date', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white mt-1"
                      placeholder="2023"
                      data-testid={`input-cert-date-${cert.id}`}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-slate-400 text-sm">URL (optional)</Label>
                    <Input
                      value={cert.url || ''}
                      onChange={(e) => updateCertificationItem(cert.id, 'url', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white mt-1"
                      placeholder="https://..."
                      data-testid={`input-cert-url-${cert.id}`}
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              onClick={addCertification}
              className="w-full bg-slate-700/50 hover:bg-slate-700 text-slate-300 cursor-pointer"
              data-testid="button-add-certification"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Certification
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skills" className="bg-slate-800/50 border-slate-700 rounded-xl overflow-hidden">
          <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-slate-700/30 cursor-pointer">
            <span className="flex items-center gap-3 text-white font-medium">
              <Wrench className="w-5 h-5 text-indigo-400" />
              Skills
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 space-y-4">
            <div>
              <Label className="text-slate-400 text-sm">Technical Skills</Label>
              <Textarea
                value={resume.skills.technical.join(', ')}
                onChange={(e) => updateSkillCategory('technical', e.target.value)}
                className="bg-slate-800/50 border-slate-700 text-white mt-1 min-h-[80px] resize-none"
                placeholder="JavaScript, TypeScript, React, Node.js..."
                data-testid="textarea-skills-technical"
              />
              <p className="text-xs text-slate-500 mt-1">Separate skills with commas</p>
            </div>
            <div>
              <Label className="text-slate-400 text-sm">Tools & Technologies</Label>
              <Textarea
                value={resume.skills.tools.join(', ')}
                onChange={(e) => updateSkillCategory('tools', e.target.value)}
                className="bg-slate-800/50 border-slate-700 text-white mt-1 min-h-[80px] resize-none"
                placeholder="AWS, Docker, Git, PostgreSQL..."
                data-testid="textarea-skills-tools"
              />
              <p className="text-xs text-slate-500 mt-1">Separate tools with commas</p>
            </div>
            <div>
              <Label className="text-slate-400 text-sm">Soft Skills</Label>
              <Textarea
                value={resume.skills.soft.join(', ')}
                onChange={(e) => updateSkillCategory('soft', e.target.value)}
                className="bg-slate-800/50 border-slate-700 text-white mt-1 min-h-[80px] resize-none"
                placeholder="Leadership, Communication, Problem Solving..."
                data-testid="textarea-skills-soft"
              />
              <p className="text-xs text-slate-500 mt-1">Separate skills with commas</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
