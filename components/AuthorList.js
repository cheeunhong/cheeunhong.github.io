// Renders a comma-separated author string: bolds `selfName`, links known co-authors.
// A trailing "*" (equal contribution) is kept in the output but ignored for matching.
export default function AuthorList({ authors, selfName = '', coauthors = {} }) {
    if (!authors) return null;
    const parts = authors.split(',').map(a => a.trim());
    const self = selfName.toLowerCase();

    return parts.map((author, i) => {
        const prefix = i > 0 ? ' ' : '';
        const sep = i < parts.length - 1 ? ',' : '';
        const name = author.replace(/\*+$/, '');

        if (self && name.toLowerCase() === self) {
            return <span key={i}>{prefix}<strong className="text-text">{author}</strong>{sep}</span>;
        }

        const nameParts = name.split(' ');
        const coauthor = coauthors[nameParts[nameParts.length - 1].toLowerCase()];
        if (coauthor?.url) {
            const firstName = nameParts.slice(0, -1).join(' ').toLowerCase();
            const matches = (coauthor.firstname || []).some(fn => firstName.startsWith(fn.toLowerCase().replace('.', '')));
            if (matches) {
                return (
                    <span key={i}>{prefix}
                        <a href={coauthor.url} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline" onClick={(e) => e.stopPropagation()}>{author}</a>{sep}
                    </span>
                );
            }
        }

        return <span key={i}>{prefix}{author}{sep}</span>;
    });
}
