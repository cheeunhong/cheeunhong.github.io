'use client';

import { useState } from 'react';
import AuthorList from '@/components/AuthorList';
import BibTeXModal from '@/components/BibTeXModal';
import PublicationVenueLine from '@/components/PublicationVenueLine';
import NewPublicationBadge from '@/components/NewPublicationBadge';
import PublicationTopics from '@/components/PublicationTopics';
import { getPaperTypography } from '@/lib/paperTypography';

const btnBase = 'inline-flex items-center justify-center px-3 py-1.5 text-xs font-semibold rounded-full transition-colors border';
const btnCls = `${btnBase} bg-white text-text-secondary border-border hover:bg-accent hover:text-white hover:border-accent`;
const summaryBtnCls = `${btnBase} border-accent/30 bg-accent/[0.07] text-accent shadow-sm hover:border-accent hover:bg-accent hover:text-white sm:hidden`;

function Preview({ paper }) {
    const src = paper.preview_url;
    if (!src) return <span className="text-xs text-text-muted py-6">No preview</span>;
    if (/\.(mp4|webm)$/i.test(src)) {
        return (
            <video autoPlay loop muted playsInline preload="metadata" className="w-full h-auto object-contain rounded-xl">
                <source src={src} type={`video/${src.split('.').pop()}`} />
            </video>
        );
    }
    return <img src={src} alt={`Preview for ${paper.title}`} loading="lazy" className="w-full h-auto object-contain rounded-md" />;
}

export default function PaperCard({ paper, venueColors, coauthors, selfName, onVenueClick, onTopicSelect }) {
    const [showBibtex, setShowBibtex] = useState(false);
    const [showSummary, setShowSummary] = useState(false);
    const paperLink = paper.pdf_url || paper.website_url || paper.code_url || '';
    const openPaper = () => { if (paperLink) window.open(paperLink, '_blank'); };

    return (
        <article className="paper-card group overflow-visible relative" style={getPaperTypography(paper)}>
            <NewPublicationBadge year={paper.year} month={paper.month} className="absolute right-3 top-3 z-40 sm:hidden" />
            <div onClick={openPaper} className={`paper-body flex flex-col md:flex-row relative ${paperLink ? 'cursor-pointer' : ''}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"></div>

                <div className="paper-preview w-full shrink-0 bg-bg-subtle rounded-xl flex items-center justify-center overflow-hidden shadow-sm ring-1 ring-black/5 md:hover:shadow-lg md:hover:scale-[1.04] transition-all duration-500 ease-out relative z-20 self-center" onClick={(e) => e.stopPropagation()}>
                    <Preview paper={paper} />
                </div>

                <div className="flex-1 min-w-0 z-30 flex flex-col justify-center">
                    <div className="mb-1 flex min-w-0 items-start justify-between gap-3">
                        <PublicationVenueLine paper={paper} venueColors={venueColors} onVenueClick={onVenueClick} />
                        <NewPublicationBadge year={paper.year} month={paper.month} className="hidden sm:inline-flex" />
                    </div>
                    <h3 className="paper-title font-outfit font-bold text-text group-hover:text-accent transition-colors leading-snug">
                        {paperLink ? <a href={paperLink} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>{paper.title}</a> : paper.title}
                    </h3>
                    <p className="paper-authors text-text-secondary mt-0.5 leading-snug [text-wrap:pretty]" onClick={(e) => e.stopPropagation()}>
                        <AuthorList authors={paper.authors} selfName={selfName} coauthors={coauthors} />
                    </p>

                    {paper.summary && (
                        <>
                            {showSummary && (
                                <div className="mt-2 rounded-r-lg border-l-2 border-accent/30 bg-accent/[0.035] px-3 py-2 sm:hidden" onClick={(e) => e.stopPropagation()}>
                                    <p className="paper-summary leading-relaxed">{paper.summary}</p>
                                </div>
                            )}
                            <div className="mt-2 hidden min-w-0 items-start gap-1.5 sm:flex">
                                <span className="mt-0.5 shrink-0 text-accent/60" title="TL;DR">
                                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeWidth="1.7" d="M5 6h14M5 10h10M5 14h13M5 18h8" />
                                    </svg>
                                    <span className="sr-only">TL;DR</span>
                                </span>
                                <p className="paper-summary min-w-0 leading-relaxed">{paper.summary}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="paper-actions">
                {paper.pdf_url && <a href={paper.pdf_url} target="_blank" rel="noopener noreferrer" className={btnCls}>PDF</a>}
                {paper.code_url && <a href={paper.code_url} target="_blank" rel="noopener noreferrer" className={btnCls}>Code</a>}
                {paper.website_url && <a href={paper.website_url} target="_blank" rel="noopener noreferrer" className={btnCls}>Website</a>}
                {paper.video_ext_url && <a href={paper.video_ext_url} target="_blank" rel="noopener noreferrer" className={btnCls}>Video</a>}
                {paper.bibtex && (
                    <button type="button" className={btnCls} onClick={(e) => { e.stopPropagation(); setShowBibtex(true); }}>BibTeX</button>
                )}
                {paper.summary && (
                    <button type="button" className={summaryBtnCls} aria-expanded={showSummary} onClick={(e) => { e.stopPropagation(); setShowSummary(value => !value); }}>TL;DR</button>
                )}
                <PublicationTopics topics={paper.topicTags} onSelect={onTopicSelect} />
            </div>

            {showBibtex && <BibTeXModal bibtex={paper.bibtex} onClose={() => setShowBibtex(false)} />}
        </article>
    );
}
