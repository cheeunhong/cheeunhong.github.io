import { getAwards, getTeaching, getService } from '@/lib/content';
import PageHeader from '@/components/PageHeader';

export const metadata = {
  title: 'Awards & Service',
  description: 'Awards, teaching experience, and academic service of Cheeun Hong.',
};

export default function AwardsServicePage() {
  const awards = getAwards();
  const teaching = getTeaching();
  const service = getService();

  return (
    <div className="awards-page">
      <PageHeader title="Awards & Service" description="Awards and honors, teaching experience, and academic service." />

      {awards.length > 0 && (
        <section className="record-section" aria-labelledby="awards-heading">
          <h2 id="awards-heading" className="section-label">Awards &amp; Honors</h2>
          <div>
            {awards.map(award => (
              <article key={`${award.name}-${award.date}`} className="record-row">
                <p className="text-xs font-bold uppercase tracking-wider text-accent mb-1">{award.date}</p>
                <h3 className="font-outfit font-bold text-lg leading-snug text-text">
                  {award.url ? <a href={award.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">{award.name} <span className="text-xs text-accent" aria-hidden="true">↗</span></a> : award.name}
                </h3>
                {award.entity && <p className="text-sm font-medium text-text-secondary mt-1">{award.entity}</p>}
                {award.descriptionHtml && <p className="text-sm text-text-secondary mt-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: award.descriptionHtml }} />}
              </article>
            ))}
          </div>
        </section>
      )}

      {teaching.length > 0 && (
        <section className="record-section" aria-labelledby="teaching-heading">
          <h2 id="teaching-heading" className="section-label">Teaching</h2>
          <div>
            {teaching.map(course => (
              <div key={course.course} className="record-row flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-text">
                    {course.link ? <a href={course.link} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">{course.course} <span className="text-xs text-accent" aria-hidden="true">↗</span></a> : course.course}
                  </h3>
                  <p className="text-sm text-text-muted mt-1">{[course.role, course.where].filter(Boolean).join(' · ')}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {course.terms.map(term => (
                    <span key={term} className="inline-flex items-center px-2.5 py-1 bg-bg-subtle rounded-lg text-xs font-medium text-accent border border-border/50">{term}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {service.length > 0 && (
        <section className="record-section" aria-labelledby="service-heading">
          <h2 id="service-heading" className="section-label">Academic Service</h2>
          <ul className="service-list">
            {service.map(item => (
              <li key={item.label}>
                <span className="service-label">{item.label}</span>
                <span className="service-text" dangerouslySetInnerHTML={{ __html: item.html }} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
