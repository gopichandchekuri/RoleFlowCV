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
  personalInfo: {
    fullName: string;
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
  personalInfo: {
    fullName: 'John Anderson',
    email: 'john.anderson@email.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johnanderson',
    website: 'johnanderson.dev',
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
    {
      id: '2',
      school: 'UC Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '2012',
      endDate: '2016',
      gpa: '3.7',
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
        'Mentored team of 5 junior developers, improving code quality by 25%',
      ],
    },
    {
      id: '2',
      company: 'StartupXYZ',
      title: 'Software Engineer',
      location: 'San Francisco, CA',
      startDate: 'Jun 2018',
      endDate: 'Dec 2020',
      bullets: [
        'Built real-time collaboration features using WebSocket technology',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
        'Developed RESTful APIs consumed by mobile and web applications',
      ],
    },
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      url: 'https://aws.amazon.com/certification/',
    },
    {
      id: '2',
      name: 'Google Cloud Professional',
      issuer: 'Google',
      date: '2022',
      url: 'https://cloud.google.com/certification',
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
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumes, setResumes] = useState<ResumeData[]>([
    defaultResume,
    { ...defaultResume, id: '2', name: 'Technical Resume', personalInfo: { ...defaultResume.personalInfo, fullName: 'John Anderson' } },
    { ...defaultResume, id: '3', name: 'Creative Resume', personalInfo: { ...defaultResume.personalInfo, fullName: 'John Anderson' } },
  ]);
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
