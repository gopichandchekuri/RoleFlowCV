import { forwardRef } from 'react';
import { ResumeData } from '@/lib/resumeContext';

interface ResumePreviewProps {
  resume: ResumeData;
  scale?: number;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ resume, scale = 1 }, ref) => {
    const { personalInfo, summary, education, experience, certifications, skills } = resume;

    const sectionHeadingStyle: React.CSSProperties = {
      fontSize: '13px',
      fontWeight: 700,
      color: '#000000',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      borderBottom: '1px solid #000000',
      paddingBottom: '4px',
      marginBottom: '10px',
      marginTop: '16px'
    };

    return (
      <div
        ref={ref}
        className="bg-white text-slate-900 shadow-xl"
        style={{
          width: '8.5in',
          minHeight: '11in',
          padding: '0.5in', // Consistent 10mm+ margin (approx 0.5in)
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          fontFamily: "'Inter', sans-serif",
          color: '#334155',
          boxSizing: 'border-box'
        }}
        id="resume-preview"
      >
        <header style={{ marginBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#000000', marginBottom: '4px', letterSpacing: '-0.02em' }}>
            {personalInfo.fullName}
          </h1>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
            {personalInfo.title}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: '#64748b' }}>
            <span>{personalInfo.email}</span>
            <span>•</span>
            <span>{personalInfo.phone}</span>
            <span>•</span>
            <span>{personalInfo.location}</span>
            {personalInfo.linkedin && (
              <>
                <span>•</span>
                <span style={{ color: '#4f46e5' }}>{personalInfo.linkedin}</span>
              </>
            )}
            {personalInfo.website && (
              <>
                <span>•</span>
                <span style={{ color: '#4f46e5' }}>{personalInfo.website}</span>
              </>
            )}
          </div>
        </header>

        {summary && (
          <section>
            <h2 style={sectionHeadingStyle}>Summary</h2>
            <p style={{ fontSize: '12px', lineHeight: 1.6 }}>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 style={sectionHeadingStyle}>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>{exp.title}</h3>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textAlign: 'right' }}>{exp.startDate} — {exp.endDate}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#475569', marginBottom: '4px' }}>
                  <span>{exp.company}</span>
                  <span style={{ textAlign: 'right' }}>{exp.location}</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '11.5px', lineHeight: 1.5, listStyleType: 'disc' }}>
                  {exp.bullets.filter(b => b.trim() !== '').map((bullet, i) => <li key={i}>{bullet}</li>)}
                </ul>
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 style={sectionHeadingStyle}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>{edu.school}</h3>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textAlign: 'right' }}>{edu.startDate} — {edu.endDate}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#475569' }}>
                  <span>{edu.degree} in {edu.field}</span>
                  {edu.gpa && <span style={{ textAlign: 'right' }}>GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </section>
        )}

        {certifications.length > 0 && (
          <section>
            <h2 style={sectionHeadingStyle}>Certifications</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ fontSize: '11.5px' }}>
                  {cert.url ? (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 600 }}>
                      {cert.name}
                    </a>
                  ) : <span style={{ fontWeight: 600 }}>{cert.name}</span>}
                  <div style={{ color: '#64748b', fontSize: '10.5px' }}>{cert.issuer} • {cert.date}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 style={sectionHeadingStyle}>Skills</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div>
              <h4 style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', borderBottom: '0.5px solid #e2e8f0', paddingBottom: '2px' }}>Technical</h4>
              <ul style={{ margin: 0, paddingLeft: '14px', fontSize: '11px', lineHeight: 1.6, listStyleType: 'disc' }}>
                {skills.technical.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', borderBottom: '0.5px solid #e2e8f0', paddingBottom: '2px' }}>Tools</h4>
              <ul style={{ margin: 0, paddingLeft: '14px', fontSize: '11px', lineHeight: 1.6, listStyleType: 'disc' }}>
                {skills.tools.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', borderBottom: '0.5px solid #e2e8f0', paddingBottom: '2px' }}>Soft</h4>
              <ul style={{ margin: 0, paddingLeft: '14px', fontSize: '11px', lineHeight: 1.6, listStyleType: 'disc' }}>
                {skills.soft.map((s, i) => <li key={i}>{s}</li>)}
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
