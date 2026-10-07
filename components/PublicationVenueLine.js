'use client';

const DEFAULT_COLOR = '#64748b';

export default function PublicationVenueLine({ paper, venueColors = {}, onVenueClick, className = '' }) {
  const tag = paper.venueTag || paper.venue;
  if (!tag) return null;
  const color = venueColors[paper.venueTag] || DEFAULT_COLOR;

  const activate = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (onVenueClick) onVenueClick(paper.venueTag || paper.venue);
  };

  return (
    <div className={`flex min-w-0 max-w-full items-center text-[11px] font-bold uppercase tracking-wider ${className}`}>
      <button type="button" className="min-w-0 max-w-full whitespace-normal break-words text-left sm:truncate hover:underline underline-offset-2" style={{ color }} onClick={activate} title={paper.venue || tag}>
        {tag}{paper.year && paper.year !== 9999 ? ` · ${paper.year}` : ''}
      </button>
    </div>
  );
}
