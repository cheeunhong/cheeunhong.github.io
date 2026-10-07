import { getPapers, getVenueColors, getCoauthors, getProfile } from '@/lib/content';
import PublicationsClient from './PublicationsClient';

export const metadata = {
    title: 'Publications',
    description: 'Research publications by Cheeun Hong on efficient AI, quantization, and pruning.',
};

export default function PublicationsPage() {
    const papers = getPapers();
    const allVenueTags = [...new Set(papers.map(p => p.venueTag).filter(Boolean))].sort();
    const allTopicTags = [...new Set(papers.flatMap(p => p.topicTags))].sort();

    return <PublicationsClient
        initialPapers={papers}
        venueColors={getVenueColors()}
        allVenueTags={allVenueTags}
        allTopicTags={allTopicTags}
        coauthors={getCoauthors()}
        selfName={getProfile().name}
    />;
}
