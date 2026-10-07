'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import PaperCard from '@/components/PaperCard';

const DEFAULT_VENUE_COLOR = '#94a3b8';

function FilterToggle({ open, onClick, controls, short, long }) {
    return (
        <button
            aria-expanded={open}
            aria-controls={controls}
            onClick={onClick}
            className={`flex flex-1 items-center justify-center gap-1 rounded-lg px-1.5 py-1 text-[11px] font-medium transition-colors sm:flex-none sm:justify-start sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-sm ${open ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:text-accent hover:bg-black/5'}`}
        >
            <svg className={`h-3.5 w-3.5 transition-transform sm:h-4 sm:w-4 ${open ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="sm:hidden">{short}</span><span className="hidden sm:inline">{long}</span>
        </button>
    );
}

function FilterChips({ id, options, counts, active, onToggle, colorFor }) {
    return (
        <div id={id} data-particle-exclusion className="mb-3 flex max-h-44 flex-wrap gap-1.5 overflow-y-auto rounded-xl border border-border bg-white p-2.5 shadow-sm sm:mb-4 sm:max-h-none sm:gap-2 sm:overflow-visible sm:p-4">
            {options.map(option => {
                const isActive = active.includes(option);
                const count = counts[option] || 0;
                const isDisabled = count === 0 && !isActive;
                const color = colorFor ? colorFor(option) : null;
                return (
                    <button
                        key={option}
                        onClick={() => !isDisabled && onToggle(option)}
                        disabled={isDisabled}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 flex items-center gap-1.5 ${isActive
                            ? `text-white border-transparent shadow-sm ${color ? '' : 'bg-accent'}`
                            : isDisabled
                                ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed opacity-50'
                                : 'bg-bg-subtle text-text-secondary border-border hover:border-accent/40 hover:text-accent'
                            }`}
                        style={isActive && color ? { backgroundColor: color } : {}}
                    >
                        {color && (
                            <span className={`mr-0.5 h-1.5 w-1.5 shrink-0 rounded-full ring-1 ${isActive ? 'ring-white/80' : 'ring-black/10'}`} style={{ backgroundColor: color }} aria-hidden="true" />
                        )}
                        {option} <span className={`text-[10px] ${isActive ? 'text-white/80' : isDisabled ? 'text-gray-400' : 'text-text-muted/60'}`}>({count})</span>
                    </button>
                );
            })}
        </div>
    );
}

export default function PublicationsClient({ initialPapers, venueColors = {}, allVenueTags = [], allTopicTags = [], coauthors = {}, selfName = '' }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedVenues, setSelectedVenues] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [showVenueFilter, setShowVenueFilter] = useState(false);
    const [showTopicFilter, setShowTopicFilter] = useState(false);

    const toggleIn = (setter) => (value) => setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    const toggleVenue = toggleIn(setSelectedVenues);
    const toggleTopic = toggleIn(setSelectedTopics);

    const isTopicMatch = (paper) => selectedTopics.length === 0 || selectedTopics.some(t => paper.topicTags.includes(t));
    const isVenueMatch = (paper) => selectedVenues.length === 0 || selectedVenues.includes(paper.venueTag);
    const isSearchMatch = (paper) => {
        const search = searchTerm.toLowerCase();
        return paper.title.toLowerCase().includes(search) || paper.authors.toLowerCase().includes(search);
    };
    const filteredPapers = initialPapers.filter(paper => isSearchMatch(paper) && isVenueMatch(paper) && isTopicMatch(paper));

    // Each filter's counts reflect every other active filter, so empty options can be disabled.
    const venueCounts = {};
    initialPapers.filter(paper => isSearchMatch(paper) && isTopicMatch(paper))
        .forEach(paper => { if (paper.venueTag) venueCounts[paper.venueTag] = (venueCounts[paper.venueTag] || 0) + 1; });

    const topicCounts = {};
    initialPapers.filter(paper => isSearchMatch(paper) && isVenueMatch(paper))
        .forEach(paper => paper.topicTags.forEach(t => { topicCounts[t] = (topicCounts[t] || 0) + 1; }));

    const groupedPapers = filteredPapers.reduce((acc, paper) => {
        const year = paper.year === 9999 ? 'Pre-print' : paper.year;
        if (!acc[year]) acc[year] = [];
        acc[year].push(paper);
        return acc;
    }, {});

    const sortedYears = Object.keys(groupedPapers).sort((a, b) => {
        if (a === 'Pre-print') return -1;
        if (b === 'Pre-print') return 1;
        return b - a;
    });

    const hasActiveFilters = selectedVenues.length > 0 || selectedTopics.length > 0;
    const searchInput = (className) => (
        <input
            type="text"
            placeholder="Search papers..."
            aria-label="Search publications"
            className={className}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    );

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <PageHeader title="Publications" description="Peer-reviewed research papers and preprints." className="!mb-3 sm:!mb-4" childrenClassName="hidden lg:block">
                <div data-particle-exclusion className="relative">
                    <svg className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" strokeWidth="1.8" />
                        <path strokeLinecap="round" strokeWidth="1.8" d="M16.5 16.5L21 21" />
                    </svg>
                    {searchInput('w-64 rounded-full border border-border bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm transition-colors focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/30')}
                </div>
            </PageHeader>

            <div data-particle-exclusion className="mb-3 rounded-2xl border border-border bg-white/70 shadow-sm sm:mb-4 lg:flex lg:items-center lg:gap-3 lg:p-1.5">
                <div className="flex flex-col gap-2 p-2 sm:gap-3 sm:p-2.5 lg:contents">
                    <div className="w-full lg:hidden">
                        {searchInput('w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 sm:rounded-xl sm:px-4 sm:py-2.5')}
                    </div>
                </div>

                <div className="flex items-center gap-0.5 border-t border-border/50 p-0.5 sm:gap-4 sm:p-2 lg:ml-auto lg:gap-1 lg:border-0 lg:p-0">
                    <FilterToggle open={showVenueFilter} onClick={() => setShowVenueFilter(!showVenueFilter)} controls="venue-filters" short="Venue" long="Filter by Venue" />
                    {allTopicTags.length > 0 && (
                        <FilterToggle open={showTopicFilter} onClick={() => setShowTopicFilter(!showTopicFilter)} controls="topic-filters" short="Topics" long="Filter by Topic" />
                    )}
                </div>
            </div>

            {showVenueFilter && (
                <FilterChips id="venue-filters" options={allVenueTags} counts={venueCounts} active={selectedVenues} onToggle={toggleVenue} colorFor={(venue) => venueColors[venue] || DEFAULT_VENUE_COLOR} />
            )}

            {showTopicFilter && (
                <FilterChips id="topic-filters" options={allTopicTags} counts={topicCounts} active={selectedTopics} onToggle={toggleTopic} />
            )}

            {hasActiveFilters && (
                <div data-particle-exclusion className="mb-3 flex flex-wrap items-center gap-1.5 rounded-xl border border-accent/20 bg-accent/5 p-2 shadow-inner sm:mb-4 sm:gap-2 sm:p-3">
                    <span className="mr-1 text-xs font-bold uppercase tracking-wider text-accent sm:mr-3"><span className="sm:hidden">Active:</span><span className="hidden sm:inline">Active Filters:</span></span>

                    {[...selectedVenues.map(v => ({ value: v, toggle: toggleVenue, color: venueColors[v] || DEFAULT_VENUE_COLOR })),
                      ...selectedTopics.map(t => ({ value: t, toggle: toggleTopic, color: '#374151' }))].map(({ value, toggle, color }) => (
                        <span key={value} className="inline-flex items-center gap-1 pl-2.5 pr-1 py-1 rounded-lg text-xs font-medium text-white shadow-sm" style={{ backgroundColor: color }}>
                            {value}
                            <button aria-label={`Remove ${value} filter`} onClick={() => toggle(value)} className="p-0.5 hover:bg-black/20 rounded-md transition-colors ml-1">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </span>
                    ))}

                    <button
                        onClick={() => { setSelectedVenues([]); setSelectedTopics([]); }}
                        className="text-xs font-bold text-red-500 hover:text-white hover:bg-red-500 rounded-lg px-2 py-1 transition-colors ml-auto flex items-center gap-1 border border-red-500/30"
                    >
                        Clear All
                    </button>
                </div>
            )}

            <div className="space-y-12 mt-6">
                {sortedYears.length === 0 ? (
                    <div className="text-center py-12 text-text-muted bg-white rounded-2xl border border-border border-dashed">
                        No publications matched your search criteria.
                    </div>
                ) : (
                    sortedYears.map(year => (
                        <div key={year} className="space-y-6">
                            <h2 className="flex items-center border-b border-border pb-2 text-2xl font-bold leading-none text-text">
                                <span className="leading-none">{year}</span>
                            </h2>
                            <div className="space-y-5">
                                {groupedPapers[year].map(paper => (
                                    <PaperCard
                                        key={`${paper.title}-${year}`}
                                        paper={paper}
                                        venueColors={venueColors}
                                        coauthors={coauthors}
                                        selfName={selfName}
                                        onVenueClick={toggleVenue}
                                        onTopicSelect={toggleTopic}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
