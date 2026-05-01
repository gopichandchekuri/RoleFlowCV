import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';

export interface ResumeData {
  personalInfo: {
    fullName: string; title: string; email: string; phone: string;
    location: string; linkedin: string; website: string;
  };
  summary: string;
  education: any[];
  experience: any[];
  projects: any[];
  certifications: any[];
  skills: { technical: string[]; tools: string[]; soft: string[]; };
}

export const ghostData: ResumeData = {
  personalInfo: {
    fullName: "John Doe",
    title: "Senior Software Engineer",
    email: "john.doe@example.com",
    phone: "+1 (555) 000-0000",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/johndoe",
    website: "johndoe.dev"
  },
  summary: "Accomplished Software Engineer with 8+ years of experience in full-stack development. Proven track record of scaling distributed systems and leading cross-functional teams.",
  education: [{ id: 'g1', school: "Tech Institute of Technology", degree: "B.S.", field: "Computer Science", location: "Boston, MA", startDate: "2012", endDate: "2016" }],
  experience: [{ id: 'g1', company: "Global Tech Corp", title: "Lead Developer", location: "Remote", startDate: "2018", endDate: "Present", bullets: ["Modernized legacy architecture using microservices.", "Managed a team of 12 engineers."] }],
  projects: [{ id: 'g1', name: "Open Source AI", url: "github.com/ai", location: "", date: "2023", bullets: ["Built a custom LLM interface."] }],
  certifications: [{ id: 'g1', name: "Google Cloud Architect", issuer: "Google", date: "2022", url: "" }],
  skills: { technical: ["React", "Go", "Kubernetes"], tools: ["Docker", "Terraform"], soft: ["Mentorship", "Public Speaking"] }
};

const emptyResume: ResumeData = {
  personalInfo: { fullName: '', title: '', email: '', phone: '', location: '', linkedin: '', website: '' },
  summary: '', education: [], experience: [], projects: [], certifications: [],
  skills: { technical: [], tools: [], soft: [] }
};

interface ResumeContextType {
  resume: ResumeData;
  resumes: any[];
  setResume: React.Dispatch<React.SetStateAction<ResumeData>>;
  saveResumeToDb: () => Promise<void>;
  isLoading: boolean;
  currentResumeId: string | null;
  setCurrentResumeId: (id: string | null) => void;
  updatePersonalInfo: (data: Partial<ResumeData['personalInfo']>) => void;
  updateSummary: (summary: string) => void;
  updateSection: (section: keyof ResumeData, data: any) => void;
  updateEducation: (data: any[]) => void;
  updateExperience: (data: any[]) => void;
  updateProjects: (data: any[]) => void;
  updateCertifications: (data: any[]) => void;
  updateSkills: (data: Partial<ResumeData['skills']>) => void;
}

export const ResumeContext = createContext<ResumeContextType | null>(null);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const [resume, setResume] = useState<ResumeData>(emptyResume);
  const [resumesList, setResumesList] = useState<any[]>([]);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const updateSection = useCallback((section: keyof ResumeData, data: any) => {
    setResume(prev => ({ ...prev, [section]: data }));
  }, []);

  const updatePersonalInfo = (data: Partial<ResumeData['personalInfo']>) => updateSection('personalInfo', { ...resume.personalInfo, ...data });
  const updateSummary = (summary: string) => updateSection('summary', summary);
  const updateEducation = (data: any[]) => updateSection('education', data);
  const updateExperience = (data: any[]) => updateSection('experience', data);
  const updateProjects = (data: any[]) => updateSection('projects', data);
  const updateCertifications = (data: any[]) => updateSection('certifications', data);
  const updateSkills = (data: Partial<ResumeData['skills']>) => {
    setResume(prev => ({ ...prev, skills: { ...prev.skills, ...data } }));
  };

  useEffect(() => {
    if (isLoaded && user) {
      setIsLoading(true);
      fetch(`/api/resumes?userId=${user.id}`)
        .then(res => res.json())
        .then(data => {
          setResumesList(data);
          if (data && data.length > 0) {
            const active = currentResumeId ? data.find((r: any) => r.id.toString() === currentResumeId) : data[0];
            if (active) setResume(active.content);
          }
        }).finally(() => { setIsLoading(false); setIsInitialLoad(false); });
    }
  }, [user, isLoaded, currentResumeId]);

  const saveResumeToDb = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      await fetch('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, content: resume }),
      });
      const updatedData = await fetch(`/api/resumes?userId=${user.id}`).then(res => res.json());
      setResumesList(updatedData);
    } finally { setIsLoading(false); }
  }, [resume, user]);

  useEffect(() => {
    if (isInitialLoad) return;
    const timer = setTimeout(() => {
      if (user && resume.personalInfo.fullName) saveResumeToDb();
    }, 3000);
    return () => clearTimeout(timer);
  }, [resume, user, isInitialLoad, saveResumeToDb]);

  const formattedResumes = resumesList.length > 0 ? resumesList.map(r => ({ ...r.content, dbId: r.id })) : [resume];

  return (
    <ResumeContext.Provider value={{ 
      resume, resumes: formattedResumes, setResume, saveResumeToDb, isLoading, 
      currentResumeId, setCurrentResumeId, updatePersonalInfo, updateSummary, updateSection,
      updateEducation, updateExperience, updateProjects, updateCertifications, updateSkills
    }}>
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) throw new Error("useResume must be used within a ResumeProvider");
  return context;
};