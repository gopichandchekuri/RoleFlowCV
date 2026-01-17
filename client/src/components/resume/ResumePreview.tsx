import { forwardRef } from 'react';
import { ResumeData } from '@/lib/resumeContext';
import { ExternalLink, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface ResumePreviewProps {
  resume: ResumeData;
  scale?: number;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ resume, scale = 1 }, ref) => {
    const { personalInfo, summary, education, experience, certifications, skills, templateId } = resume;

    // Template Styles Mapping
    const getTemplateStyles = () => {
      switch (templateId) {
        case '2': // Creative
          return {
            primaryColor: '#8b5cf6',
            headerBg: '#f5f3ff',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          };
        case '3': // Minimalist
          return {
            primaryColor: '#1e293b',
            headerBg: 'transparent',
            fontFamily: "'Inter', sans-serif",
          };
        case '4': // Executive
          return {
            primaryColor: '#b45309',
            headerBg: '#fffbeb',
            fontFamily: "'Playfair Display', serif",
          };
        case '5': // Tech Modern
          return {
            primaryColor: '#0891b2',
            headerBg: '#ecfeff',
            fontFamily: "'JetBrains Mono', monospace",
          };
        default: // Professional (1)
          return {
            primaryColor: '#4f46e5',
            headerBg: '#f8fafc',
            fontFamily: "'Inter', sans-serif",
          };
      }
    };

    const styles = getTemplateStyles();

    return (
      <div
        ref={ref}
        className="bg-white text-slate-900 shadow-xl"
        style={{
          width: '8.5in',
          minHeight: '11in',
          padding: '0.75in',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          fontFamily: styles.fontFamily,
        }}
        id="resume-preview"
      >
        <header style={{ marginBottom: '24px', textAlign: templateId === '2' ? 'center' : 'left' }}>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 800,
              color: styles.primaryColor,
              marginBottom: '12px',
              letterSpacing: '-0.02em',
              textTransform: templateId === '4' ? 'uppercase' : 'none',
            }}
          >
            {personalInfo.fullName}
          </h1>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: templateId === '2' ? 'center' : 'flex-start',
              gap: '12px',
              fontSize: '12px',
              color: '#475569',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Mail style={{ width: '12px', height: '12px' }} /> {personalInfo.email}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Phone style={{ width: '12px', height: '12px' }} /> {personalInfo.phone}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin style={{ width: '12px', height: '12px' }} /> {personalInfo.location}
            </span>
            {personalInfo.linkedin && (
              <a
                href={`https://${personalInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: styles.primaryColor, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Linkedin style={{ width: '12px', height: '12px' }} /> {personalInfo.linkedin}
              </a>
            )}
          </div>
        </header>

        {summary && (
          <section style={{ marginBottom: '24px' }}>
            <h2
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: styles.primaryColor,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                borderBottom: `1.5px solid ${styles.primaryColor}20`,
                paddingBottom: '4px',
                marginBottom: '10px',
              }}
            >
              Professional Profile
            </h2>
            <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6 }}>
              {summary}
            </p>
          </section>
        )}

        {experience.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <h2
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: styles.primaryColor,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                borderBottom: `1.5px solid ${styles.primaryColor}20`,
                paddingBottom: '4px',
                marginBottom: '12px',
              }}
            >
              Work Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>{exp.title}</h3>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#475569', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600 }}>{exp.company}</span>
                  <span>{exp.location}</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', color: '#334155', lineHeight: 1.6 }}>
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <h2
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: styles.primaryColor,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                borderBottom: `1.5px solid ${styles.primaryColor}20`,
                paddingBottom: '4px',
                marginBottom: '12px',
              }}
            >
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>{edu.school}</h3>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#475569' }}>
                  <span>{edu.degree} in {edu.field}</span>
                  {edu.gpa && <span style={{ fontWeight: 600 }}>GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </section>
        )}

        {certifications.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <h2
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: styles.primaryColor,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                borderBottom: `1.5px solid ${styles.primaryColor}20`,
                paddingBottom: '4px',
                marginBottom: '12px',
              }}
            >
              Certifications
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ fontSize: '12.5px' }}>
                  {cert.url ? (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ color: styles.primaryColor, textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      {cert.name} <ExternalLink style={{ width: '10px', height: '10px' }} />
                    </a>
                  ) : (
                    <span style={{ fontWeight: 600, color: '#1e293b' }}>{cert.name}</span>
                  )}
                  <div style={{ color: '#64748b', fontSize: '11px' }}>{cert.issuer} • {cert.date}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: styles.primaryColor,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              borderBottom: `1.5px solid ${styles.primaryColor}20`,
              paddingBottom: '4px',
              marginBottom: '12px',
            }}
          >
            Skills & Expertise
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <div>
              <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Technical</h4>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#334155', lineHeight: 1.8 }}>
                {skills.technical.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Tools</h4>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#334155', lineHeight: 1.8 }}>
                {skills.tools.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Soft Skills</h4>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#334155', lineHeight: 1.8 }}>
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
