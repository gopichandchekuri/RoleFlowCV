import { forwardRef } from 'react';
import { ResumeData } from '@/lib/resumeContext';

interface ResumePreviewProps {
  resume: ResumeData;
  scale?: number;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ resume, scale = 1 }, ref) => {
    const { personalInfo, summary, education, experience, projects, certifications, skills } = resume;

    const sectionHeadingStyle: React.CSSProperties = {
      fontSize: '13px',
      fontWeight: 700,
      color: '#000000',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      borderBottom: '1px solid #000000',
      paddingBottom: '4px', // Prevents overlap with divider line
      marginBottom: '10px',
      marginTop: '14px',
      width: '100%'
    };

    return (
      <div
        ref={ref}
        className="bg-white text-slate-900"
        style={{
          width: '210mm',
          minHeight: '297mm',
          padding: '15mm',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          fontFamily: "'Inter', sans-serif",
          color: '#334155',
          boxSizing: 'border-box',
          position: 'relative',
          backgroundColor: '#ffffff'
        }}
        id="resume-preview"
      >
        <header style={{ marginBottom: '18px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#000000', marginBottom: '2px', letterSpacing: '-0.02em' }}>
            {personalInfo.fullName}
          </h1>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
            {personalInfo.title}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '11px', color: '#64748b' }}>
            <span>{personalInfo.email}</span>
            <span>•</span>
            <span>{personalInfo.phone}</span>
            <span>•</span>
            <span>{personalInfo.location}</span>
            {personalInfo.linkedin && (
              <>
                <span>•</span>
                <a href={`https://${personalInfo.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: '#4f46e5', textDecoration: 'none' }}>{personalInfo.linkedin}</a>
              </>
            )}
            {personalInfo.website && (
              <>
                <span>•</span>
                <a href={`https://${personalInfo.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: '#4f46e5', textDecoration: 'none' }}>{personalInfo.website}</a>
              </>
            )}
          </div>
        </header>

        {summary && (
          <section style={{ width: '100%' }}>
            <h2 style={sectionHeadingStyle}>Summary</h2>
            <p style={{ fontSize: '11px', lineHeight: 1.5 }}>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section style={{ width: '100%' }}>
            <h2 style={sectionHeadingStyle}>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '12px', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', width: '100%' }}>
                  <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>{exp.company}</h3>
                  <div style={{ textAlign: 'right', fontSize: '10.5px', fontWeight: 600, color: '#64748b' }}>
                    {exp.location && <span>{exp.location} | </span>}
                    <span>{exp.startDate} — {exp.endDate}</span>
                  </div>
                </div>
                <div style={{ fontSize: '11.5px', color: '#475569', fontWeight: 600, marginBottom: '4px' }}>
                  {exp.title}
                </div>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '10.5px', lineHeight: 1.4, listStyleType: 'disc' }}>
                  {exp.bullets.filter(b => b.trim() !== '').map((bullet, i) => <li key={i}>{bullet}</li>)}
                </ul>
              </div>
            ))}
          </section>
        )}

        {projects && projects.length > 0 && (
          <section style={{ width: '100%' }}>
            <h2 style={sectionHeadingStyle}>Projects</h2>
            {projects.map((project) => (
              <div key={project.id} style={{ marginBottom: '12px', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', width: '100%' }}>
                  <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>
                    {project.url ? (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ color: '#4f46e5', textDecoration: 'none' }}>
                        {project.name}
                      </a>
                    ) : project.name}
                  </h3>
                  <div style={{ textAlign: 'right', fontSize: '10.5px', fontWeight: 600, color: '#64748b' }}>
                    {project.location && <span>{project.location} | </span>}
                    <span>{project.date}</span>
                  </div>
                </div>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '10.5px', lineHeight: 1.4, listStyleType: 'disc', marginTop: '4px' }}>
                  {project.bullets.filter(b => b.trim() !== '').map((bullet, i) => <li key={i}>{bullet}</li>)}
                </ul>
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section style={{ width: '100%' }}>
            <h2 style={sectionHeadingStyle}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '8px', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', width: '100%' }}>
                  <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>{edu.school}</h3>
                  <div style={{ textAlign: 'right', fontSize: '10.5px', fontWeight: 600, color: '#64748b' }}>
                    {edu.location && <span>{edu.location} | </span>}
                    <span>{edu.startDate} — {edu.endDate}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#475569', width: '100%' }}>
                  <span>{edu.degree} in {edu.field}</span>
                  {edu.gpa && <span style={{ textAlign: 'right' }}>GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </section>
        )}

        {certifications.length > 0 && (
          <section style={{ width: '100%' }}>
            <h2 style={sectionHeadingStyle}>Certifications</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px', width: '100%' }}>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ fontSize: '10.5px' }}>
                  {cert.url ? (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 600 }}>
                      {cert.name}
                    </a>
                  ) : <span style={{ fontWeight: 600 }}>{cert.name}</span>}
                  <div style={{ color: '#64748b', fontSize: '9.5px' }}>{cert.issuer} • {cert.date}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section style={{ width: '100%' }}>
          <h2 style={sectionHeadingStyle}>Skills</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', width: '100%' }}>
            <div>
              <h4 style={{ fontSize: '9px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Technical</h4>
              <ul style={{ margin: 0, paddingLeft: '12px', fontSize: '10px', lineHeight: 1.5, listStyleType: 'disc' }}>
                {skills.technical.map((s, i) => <li key={i}>{s.replace(/^\*/, '').trim()}</li>)}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '9px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Tools</h4>
              <ul style={{ margin: 0, paddingLeft: '12px', fontSize: '10px', lineHeight: 1.5, listStyleType: 'disc' }}>
                {skills.tools.map((s, i) => <li key={i}>{s.replace(/^\*/, '').trim()}</li>)}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '9px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Soft</h4>
              <ul style={{ margin: 0, paddingLeft: '12px', fontSize: '10px', lineHeight: 1.5, listStyleType: 'disc' }}>
                {skills.soft.map((s, i) => <li key={i}>{s.replace(/^\*/, '').trim()}</li>)}
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }
);

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;
