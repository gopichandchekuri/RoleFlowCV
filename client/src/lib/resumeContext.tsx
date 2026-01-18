import { createContext, useContext, useState, ReactNode } from 'react';

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Skills {
  technical: string[];
  tools: string[];
  soft: string[];
}

export interface ResumeData {
  id: string;
  name: string;
  templateId: string;
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
  };
  summary: string;
  education: Education[];
  experience: Experience[];
  certifications: Certification[];
  skills: Skills;
}

const defaultResume: ResumeData = {
  id: '1',
  name: 'My Resume',
  templateId: '1',
  personalInfo: {
    fullName: 'John Anderson',
    title: 'Senior Software Engineer',
    email: 'john.anderson@email.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johnanderson',
    website: 'github.com/janderson',
  },
  summary: 'Results-driven software engineer with 5+ years of experience building scalable web applications. Passionate about clean code, user experience, and mentoring junior developers.',
  education: [
    {
      id: '1',
      school: 'Stanford University',
      degree: 'Master of Science',
      field: 'Computer Science',
      location: 'Stanford, CA',
      startDate: '2016',
      endDate: '2018',
      gpa: '3.9',
    },
  ],
  experience: [
    {
      id: '1',
      company: 'Tech Corp Inc.',
      title: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: 'Jan 2021',
      endDate: 'Present',
      bullets: [
        'Led development of microservices architecture serving 10M+ daily users',
        'Reduced API response times by 40% through optimization and caching strategies',
      ],
    },
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      date: 'March 2023',
      url: 'https://aws.amazon.com/certification/',
    },
  ],
  skills: {
    technical: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Go'],
    tools: ['AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'Git'],
    soft: ['Leadership', 'Communication', 'Problem Solving', 'Agile', 'Mentoring'],
  },
};

interface ResumeContextType {
  resume: ResumeData;
  setResume: (resume: ResumeData) => void;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  updateSummary: (summary: string) => void;
  updateEducation: (education: Education[]) => void;
  updateExperience: (experience: Experience[]) => void;
  updateCertifications: (certifications: Certification[]) => void;
  updateSkills: (skills: Skills) => void;
  resumes: ResumeData[];
  currentResumeId: string;
  setCurrentResumeId: (id: string) => void;
  applyTemplate: (templateId: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumes, setResumes] = useState<ResumeData[]>([defaultResume]);
  const [currentResumeId, setCurrentResumeId] = useState('1');

  const resume = resumes.find((r) => r.id === currentResumeId) || defaultResume;

  const setResume = (newResume: ResumeData) => {
    setResumes((prev) => prev.map((r) => (r.id === newResume.id ? newResume : r)));
  };

  const updatePersonalInfo = (info: Partial<ResumeData['personalInfo']>) => {
    setResume({ ...resume, personalInfo: { ...resume.personalInfo, ...info } });
  };

  const updateSummary = (summary: string) => {
    setResume({ ...resume, summary });
  };

  const updateEducation = (education: Education[]) => {
    setResume({ ...resume, education });
  };

  const updateExperience = (experience: Experience[]) => {
    setResume({ ...resume, experience });
  };

  const updateCertifications = (certifications: Certification[]) => {
    setResume({ ...resume, certifications });
  };

  const updateSkills = (skills: Skills) => {
    setResume({ ...resume, skills });
  };

  const applyTemplate = (templateId: string) => {
    setResume({ ...resume, templateId });
  };

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setResume,
        updatePersonalInfo,
        updateSummary,
        updateEducation,
        updateExperience,
        updateCertifications,
        updateSkills,
        resumes,
        currentResumeId,
        setCurrentResumeId,
        applyTemplate,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
