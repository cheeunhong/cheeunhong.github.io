import { getAboutContent, getSelectedPapers, getVenueColors, getCoauthors, getProfile, getNews, getExperience, getEducation } from '@/lib/content';
import AboutCopy from '@/components/AboutCopy';
import PaperCard from '@/components/PaperCard';

import icons from '@/components/SocialIcons';

const socialLabels = { github: 'GitHub', linkedin: 'LinkedIn', orcid: 'ORCID', researchgate: 'ResearchGate', scholar: 'Google Scholar' };

function TimelineColumn({ id, label, items }) {
  if (items.length === 0) return null;
  return (
    <div className="timeline-column" aria-labelledby={id}>
      <h2 id={id} className="section-label">{label}</h2>
      <ol className="timeline-list">
        {items.map(item => (
          <li key={`${item.title}-${item.period}`} className="timeline-item">
            <span className="timeline-period">{item.period}</span>
            <div className="min-w-0">
              <h3>{item.title}</h3>
              <p className="timeline-org">
                {item.url ? <a href={item.url} target="_blank" rel="noopener noreferrer">{item.org}</a> : item.org}
                {item.location && <span className="timeline-location"> · {item.location}</span>}
              </p>
              {item.detailHtml && <p className="timeline-detail" dangerouslySetInnerHTML={{ __html: item.detailHtml }} />}
              {item.noteHtml && <p className="timeline-detail timeline-note" dangerouslySetInnerHTML={{ __html: item.noteHtml }} />}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function HomePage() {
  const { data: about, htmlContent } = getAboutContent();
  const selectedPapers = getSelectedPapers();
  const venueColors = getVenueColors();
  const coauthors = getCoauthors();
  const profile = getProfile();
  const news = getNews();
  const experience = getExperience();
  const education = getEducation();
  const social = profile.social || {};
  const keywords = about.keywords || [];

  // Construct JSON-LD structured data for Google Rich Snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.title,
    affiliation: profile.institution?.name,
    url: 'https://cheeunhong.github.io',
    image: 'https://cheeunhong.github.io/prof_pic.jpg',
    sameAs: Object.values(social).filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="home-page">
        <section className="about-hero" aria-labelledby="profile-heading">
          <div className="hero-intro">
            <div className="hero-heading">
              <h1 id="profile-heading">{profile.name}</h1>
              <p className="hero-role">
                {profile.title}
                {profile.institution && <>{' @ '}<a href={profile.institution.url}>
                  <span className="hero-role-short">{profile.institution.short_name || profile.institution.name}</span>
                  <span className="hero-role-long">{profile.institution.name}</span>
                </a></>}
              </p>
            </div>
            <AboutCopy html={htmlContent}>
              {keywords.length > 0 && (
                <p className="about-keywords"><span>Keywords</span> {keywords.join(' · ')}</p>
              )}
            </AboutCopy>
            <div className="hero-actions">
              <a href="/publications" className="primary-link">View publications <span aria-hidden="true">&#8599;</span></a>
              {profile.cv && <a href={profile.cv} target="_blank" rel="noopener noreferrer" className="secondary-link" aria-label="Curriculum vitae"><span className="hidden sm:inline">Curriculum vitae</span><span className="sm:hidden">CV</span> <span aria-hidden="true">&#8599;</span></a>}
            </div>
          </div>
          <div className="profile-aside">
            <img src="/prof_pic.jpg" alt={profile.name || 'Profile'} width="512" height="512" fetchPriority="high" className="profile-photo" />
            <div className="profile-socials" aria-label="Contact and research profiles">
              {profile.email && <a href={`mailto:${profile.email}`} aria-label="Email" title="Email">{icons.email}</a>}
              {Object.entries(social).map(([key, url]) => url && icons[key] && (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={socialLabels[key]} title={socialLabels[key]}>{icons[key]}</a>
              ))}
            </div>
          </div>
        </section>

        {news.length > 0 && (
          <section className="news-section" aria-labelledby="news-heading">
            <h2 id="news-heading" className="section-label">News</h2>
            <div className="news-list">
              {news.map(item => {
                const external = item.url?.startsWith('http');
                return <article key={`${item.date}-${item.title}`} className="news-item">
                  <time>{item.date}</time>
                  <div className="news-content">
                    <h3>{item.title}</h3>
                    <div className="news-detail">
                      {item.descriptionHtml && <p dangerouslySetInnerHTML={{ __html: item.descriptionHtml }} />}
                      {item.url && <a href={item.url} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{item.link_label || 'Read more'} <span aria-hidden="true">&#8599;</span></a>}
                    </div>
                  </div>
                </article>;
              })}
            </div>
          </section>
        )}

        {(experience.length > 0 || education.length > 0) && (
          <section className="timeline-section" aria-label="Work experience and education">
            <TimelineColumn id="experience-heading" label="Work experience" items={experience} />
            <TimelineColumn id="education-heading" label="Education" items={education} />
          </section>
        )}

        {selectedPapers.length > 0 && (
          <section className="selected-section" aria-labelledby="selected-heading">
            <div className="section-heading">
              <h2 id="selected-heading" className="section-label">Selected publications</h2>
              <a href="/publications" className="text-link">All publications <span aria-hidden="true">&#8599;</span></a>
            </div>
            <div className="selected-papers">{selectedPapers.map(paper => <PaperCard key={paper.title} paper={paper} venueColors={venueColors} coauthors={coauthors} selfName={profile.name} />)}</div>
          </section>
        )}
      </div>
    </>
  );
}
