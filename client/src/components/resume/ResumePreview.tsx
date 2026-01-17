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

    const getTemplateStyles = () => {
      switch (templateId) {
        case '2': // Creative
          return { primaryColor: '#8b5cf6', fontFamily: "'Plus Jakarta Sans', sans-serif" };
        case '3': // Minimalist
          return { primaryColor: '#000000', fontFamily: "'Inter', sans-serif" };
        case '4': // Executive
          return { primaryColor: '#b45309', fontFamily: "'Playfair Display', serif" };
        case '5': // Tech Modern
          return { primaryColor: '#0891b2', fontFamily: "'JetBrains Mono', monospace" };
        default: // Professional
          return { primaryColor: '#4f46e5', fontFamily: "'Inter', sans-serif" };
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
        <header style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#000000', marginBottom: '8px', letterSpacing: '-0.02em' }}>
            {personalInfo.fullName}
          </h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: '#475569' }}>
            <span>{personalInfo.email}</span>
            <span>{personalInfo.phone}</span>
            <span>{personalInfo.location}</span>
          </div>
        </header>

        {summary && (
          <section style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#000000', textTransform: 'uppercase', borderBottom: '1px solid #000000', paddingBottom: '4px', marginBottom: '10px' }}>
              Summary
            </h2>
            <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6 }}>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#000000', textTransform: 'uppercase', borderBottom: '1px solid #000000', paddingBottom: '4px', marginBottom: '12px' }}>
              Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '14px', color: '#000000' }}>
                  <span>{exp.title}</span>
                  <span>{exp.startDate} — {exp.endDate}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#475569', marginBottom: '6px' }}>
                  <span>{exp.company}</span>
                  <span>{exp.location}</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', color: '#334155', lineHeight: 1.6 }}>
                  {exp.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}
                </ul>
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#000000', textTransform: 'uppercase', borderBottom: '1px solid #000000', paddingBottom: '4px', marginBottom: '12px' }}>
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '14px', color: '#000000' }}>
                  <span>{edu.school}</span>
                  <span>{edu.startDate} — {edu.endDate}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#475569' }}>
                  <span>{edu.degree} in {edu.field}</span>
                  {edu.gpa && <span>GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </section>
        )}

        {certifications.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#000000', textTransform: 'uppercase', borderBottom: '1px solid #000000', paddingBottom: '4px', marginBottom: '12px' }}>
              Certifications
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ fontSize: '12.5px' }}>
                  {cert.url ? (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ color: styles.primaryColor, fontWeight: 600 }}>
                      {cert.name}
                    </a>
                  ) : <span style={{ fontWeight: 600 }}>{cert.name}</span>}
                  <div style={{ color: '#64748b' }}>{cert.issuer} • {cert.date}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#000000', textTransform: 'uppercase', borderBottom: '1px solid #000000', paddingBottom: '4px', marginBottom: '12px' }}>
            Skills
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <div>
              <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>Technical</h4>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#334155', lineHeight: 1.8 }}>
                {skills.technical.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>Tools</h4>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#334155', lineHeight: 1.8 }}>
                {skills.tools.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>Soft Skills</h4>
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
