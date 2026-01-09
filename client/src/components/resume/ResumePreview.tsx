import { forwardRef } from 'react';
import { ResumeData } from '@/lib/resumeContext';
import { ExternalLink } from 'lucide-react';

interface ResumePreviewProps {
  resume: ResumeData;
  scale?: number;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ resume, scale = 1 }, ref) => {
    const { personalInfo, summary, education, experience, certifications, skills } = resume;

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
          fontFamily: "'Inter', sans-serif",
        }}
        id="resume-preview"
      >
        <header style={{ marginBottom: '20px' }}>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#1e293b',
              marginBottom: '8px',
              letterSpacing: '-0.01em',
            }}
          >
            {personalInfo.fullName}
          </h1>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              fontSize: '13px',
              color: '#475569',
            }}
          >
            <span>{personalInfo.email}</span>
            <span>•</span>
            <span>{personalInfo.phone}</span>
            <span>•</span>
            <span>{personalInfo.location}</span>
            {personalInfo.linkedin && (
              <>
                <span>•</span>
                <a
                  href={`https://${personalInfo.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#4f46e5', textDecoration: 'none' }}
                >
                  {personalInfo.linkedin}
                </a>
              </>
            )}
            {personalInfo.website && (
              <>
                <span>•</span>
                <a
                  href={`https://${personalInfo.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#4f46e5', textDecoration: 'none' }}
                >
                  {personalInfo.website}
                </a>
              </>
            )}
          </div>
        </header>

        {summary && (
          <section style={{ marginBottom: '20px' }}>
            <h2
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#1e293b',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderBottom: '2px solid #e2e8f0',
                paddingBottom: '4px',
                marginBottom: '8px',
              }}
            >
              Summary
            </h2>
            <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.5 }}>
              {summary}
            </p>
          </section>
        )}

        {experience.length > 0 && (
          <section style={{ marginBottom: '20px' }}>
            <h2
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#1e293b',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderBottom: '2px solid #e2e8f0',
                paddingBottom: '4px',
                marginBottom: '12px',
              }}
            >
              Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '16px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '2px',
                  }}
                >
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>
                    {exp.title}
                  </h3>
                  <span
                    style={{
                      fontSize: '13px',
                      color: '#475569',
                      textAlign: 'right',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '13px',
                    color: '#475569',
                    marginBottom: '6px',
                  }}
                >
                  <span>{exp.company}</span>
                  <span style={{ textAlign: 'right' }}>{exp.location}</span>
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: '18px',
                    fontSize: '13px',
                    color: '#334155',
                    lineHeight: 1.5,
                  }}
                >
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} style={{ marginBottom: '2px' }}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section style={{ marginBottom: '20px' }}>
            <h2
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#1e293b',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderBottom: '2px solid #e2e8f0',
                paddingBottom: '4px',
                marginBottom: '12px',
              }}
            >
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '12px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '2px',
                  }}
                >
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>
                    {edu.school}
                  </h3>
                  <span
                    style={{
                      fontSize: '13px',
                      color: '#475569',
                      textAlign: 'right',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '13px',
                    color: '#475569',
                  }}
                >
                  <span>
                    {edu.degree} in {edu.field}
                  </span>
                  {edu.gpa && (
                    <span style={{ textAlign: 'right' }}>GPA: {edu.gpa}</span>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        {certifications.length > 0 && (
          <section style={{ marginBottom: '20px' }}>
            <h2
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#1e293b',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderBottom: '2px solid #e2e8f0',
                paddingBottom: '4px',
                marginBottom: '12px',
              }}
            >
              Certifications
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px' }}>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ fontSize: '13px' }}>
                  {cert.url ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#4f46e5',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      {cert.name}
                      <ExternalLink style={{ width: '12px', height: '12px' }} />
                    </a>
                  ) : (
                    <span style={{ color: '#1e293b', fontWeight: 500 }}>{cert.name}</span>
                  )}
                  <span style={{ color: '#475569' }}>
                    {' '}
                    – {cert.issuer}, {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {(skills.technical.length > 0 || skills.tools.length > 0 || skills.soft.length > 0) && (
          <section>
            <h2
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#1e293b',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderBottom: '2px solid #e2e8f0',
                paddingBottom: '4px',
                marginBottom: '12px',
              }}
            >
              Skills
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
              }}
            >
              {skills.technical.length > 0 && (
                <div>
                  <h4
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#475569',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '6px',
                    }}
                  >
                    Technical
                  </h4>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: '16px',
                      fontSize: '13px',
                      color: '#334155',
                      lineHeight: 1.6,
                    }}
                  >
                    {skills.technical.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>
              )}
              {skills.tools.length > 0 && (
                <div>
                  <h4
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#475569',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '6px',
                    }}
                  >
                    Tools
                  </h4>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: '16px',
                      fontSize: '13px',
                      color: '#334155',
                      lineHeight: 1.6,
                    }}
                  >
                    {skills.tools.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>
              )}
              {skills.soft.length > 0 && (
                <div>
                  <h4
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#475569',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '6px',
                    }}
                  >
                    Soft Skills
                  </h4>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: '16px',
                      fontSize: '13px',
                      color: '#334155',
                      lineHeight: 1.6,
                    }}
                  >
                    {skills.soft.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    );
  }
);

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;
