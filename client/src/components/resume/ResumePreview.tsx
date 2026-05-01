import { forwardRef } from 'react';
import { ResumeData, ghostData } from '@/lib/resumeContext';

interface ResumePreviewProps {
  resume: ResumeData;
  scale?: number;
}

const formatLink = (url: string) => {
  if (!url) return '';
  const trimmed = url.trim();
  return trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
};

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ resume, scale = 1 }, ref) => {
    const personalInfo = { ...ghostData.personalInfo, ...Object.fromEntries(Object.entries(resume.personalInfo).filter(([_, v]) => v !== '')) };
    const summary = resume.summary || ghostData.summary;
    const education = resume.education.length > 0 ? resume.education : ghostData.education;
    const experience = resume.experience.length > 0 ? resume.experience : ghostData.experience;
    const projects = resume.projects.length > 0 ? resume.projects : ghostData.projects;
    const certifications = resume.certifications.length > 0 ? resume.certifications : ghostData.certifications;
    
    const hasSkills = resume.skills.technical.length > 0 || resume.skills.tools.length > 0 || resume.skills.soft.length > 0;
    const skills = hasSkills ? resume.skills : ghostData.skills;

    // Enhanced ghost style with 0.85 opacity and dark blue-gray text
    const getGhostStyle = (isReal: boolean): React.CSSProperties => ({
      opacity: isReal ? 1 : 0.85,
      color: isReal ? '#000000' : '#475569', 
      transition: 'all 0.2s ease'
    });

    const linkStyle: React.CSSProperties = { 
      color: '#4f46e5', 
      textDecoration: 'none', 
      cursor: 'pointer' 
    };

    const sectionHeadingStyle: React.CSSProperties = {
      fontSize: '13px', fontWeight: 700, color: '#000000', textTransform: 'uppercase',
      letterSpacing: '0.05em', borderBottom: '1px solid #000000', paddingBottom: '4px',
      marginBottom: '10px', marginTop: '14px', width: '100%'
    };

    // Shared list style to ensure bullets show up in PDF and UI
    const bulletListStyle: React.CSSProperties = {
      margin: '4px 0 0 0',
      paddingLeft: '18px',
      fontSize: '10.5px',
      lineHeight: 1.4,
      listStyleType: 'disc' // Forces bullets to appear
    };

    return (
      <div
        ref={ref}
        className="bg-white text-slate-900"
        style={{
          width: '210mm', minHeight: '297mm', padding: '15mm',
          transform: `scale(${scale})`, transformOrigin: 'top left',
          fontFamily: "'Inter', sans-serif", color: '#1e293b',
          boxSizing: 'border-box', backgroundColor: '#ffffff'
        }}
        id="resume-preview"
      >
        <header style={{ marginBottom: '18px', ...getGhostStyle(!!resume.personalInfo.fullName) }}>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#000000', marginBottom: '2px' }}>
            {personalInfo.fullName}
          </h1>
          <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#1e293b' }}>
            {personalInfo.title}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '11px', color: '#334155' }}>
            <span>{personalInfo.email}</span>
            <span>•</span>
            <span>{personalInfo.phone}</span>
            <span>•</span>
            <span>{personalInfo.location}</span>
            {personalInfo.linkedin && (
              <><span>•</span><a href={formatLink(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" style={linkStyle}>LinkedIn</a></>
            )}
            {personalInfo.website && (
              <><span>•</span><a href={formatLink(personalInfo.website)} target="_blank" rel="noopener noreferrer" style={linkStyle}>Portfolio</a></>
            )}
          </div>
        </header>

        <section style={getGhostStyle(!!resume.summary)}>
          <h2 style={sectionHeadingStyle}>Summary</h2>
          <p style={{ fontSize: '11px', lineHeight: 1.5, color: '#1e293b' }}>{summary}</p>
        </section>

        <section style={getGhostStyle(resume.experience.length > 0)}>
          <h2 style={sectionHeadingStyle}>Experience</h2>
          {experience.map((exp: any) => (
            <div key={exp.id} style={{ marginBottom: '12px', pageBreakInside: 'avoid' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#000000' }}>{exp.company}</h3>
                <div style={{ textAlign: 'right', fontSize: '10.5px', fontWeight: 700, color: '#334155' }}>
                  {exp.location} | {exp.startDate} — {exp.endDate}
                </div>
              </div>
              <div style={{ fontSize: '11.5px', color: '#1e293b', fontWeight: 700 }}>{exp.title}</div>
              <ul style={bulletListStyle}>
                {exp.bullets.map((bullet: string, i: number) => bullet.trim() && <li key={i} style={{ marginBottom: '2px' }}>{bullet}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section style={getGhostStyle(resume.projects.length > 0)}>
          <h2 style={sectionHeadingStyle}>Projects</h2>
          {projects.map((project: any) => (
            <div key={project.id} style={{ marginBottom: '12px', pageBreakInside: 'avoid' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  {project.url ? (
                    <a href={formatLink(project.url)} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, fontSize: '12px', fontWeight: 700 }}>{project.name}</a>
                  ) : (<h3 style={{ fontSize: '12px', fontWeight: 700, color: '#000000' }}>{project.name}</h3>)}
                </div>
                <div style={{ textAlign: 'right', fontSize: '10.5px', fontWeight: 700, color: '#334155' }}>{project.location} | {project.date}</div>
              </div>
              <ul style={bulletListStyle}>
                {project.bullets.map((bullet: string, i: number) => bullet.trim() && <li key={i} style={{ marginBottom: '2px' }}>{bullet}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section style={getGhostStyle(resume.education.length > 0)}>
          <h2 style={sectionHeadingStyle}>Education</h2>
          {education.map((edu: any) => (
            <div key={edu.id} style={{ marginBottom: '8px', pageBreakInside: 'avoid' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#000000' }}>{edu.school}</h3>
                <div style={{ textAlign: 'right', fontSize: '10.5px', fontWeight: 700, color: '#334155' }}>
                  {edu.location} | {edu.startDate} — {edu.endDate}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#1e293b', fontWeight: 600 }}>
                <span>{edu.degree} in {edu.field}</span>
                {edu.gpa && <span>GPA: {edu.gpa}</span>}
              </div>
            </div>
          ))}
        </section>

        <section style={getGhostStyle(resume.certifications.length > 0)}>
          <h2 style={sectionHeadingStyle}>Certifications</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px' }}>
            {certifications.map((cert: any) => (
              <div key={cert.id} style={{ fontSize: '10.5px', pageBreakInside: 'avoid' }}>
                {cert.url ? (
                  <a href={formatLink(cert.url)} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, fontWeight: 700 }}>{cert.name}</a>
                ) : (<div style={{ fontWeight: 700, color: '#000000' }}>{cert.name}</div>)}
                <div style={{ color: '#334155', fontSize: '9.5px', fontWeight: 600 }}>{cert.issuer} • {cert.date}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={getGhostStyle(hasSkills)}>
          <h2 style={sectionHeadingStyle}>Skills</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {(['technical', 'tools', 'soft'] as const).map((type) => (
              <div key={type}>
                <h4 style={{ fontSize: '9px', fontWeight: 800, color: '#334155', textTransform: 'uppercase' }}>{type}</h4>
                <ul style={{ ...bulletListStyle, paddingLeft: '14px' }}>
                  {skills[type].map((s: string, i: number) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }
);

ResumePreview.displayName = 'ResumePreview';
export default ResumePreview;