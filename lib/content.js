import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import yaml from 'js-yaml';

const contentDirectory = path.join(process.cwd(), 'content');

function readYaml(fileName, fallback) {
    const fullPath = path.join(contentDirectory, fileName);
    if (!fs.existsSync(fullPath)) return fallback;
    try {
        return yaml.load(fs.readFileSync(fullPath, 'utf8')) || fallback;
    } catch (e) {
        return fallback;
    }
}

// Inline markdown (links, bold, italics) for short one-line fields.
const inline = (text) => (text ? marked.parseInline(String(text).trim()) : '');

export function getAboutContent() {
    const fullPath = path.join(contentDirectory, 'about.md');
    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const htmlContent = marked(content);
        return { data, htmlContent };
    } catch (e) {
        return { data: {}, htmlContent: '<div>Content not found.</div>' };
    }
}

export function getProfile() {
    return readYaml('profile.yml', { name: 'Your Name', title: 'Your Title', email: '', social: {} });
}

export function getCoauthors() {
    return readYaml('coauthors.yml', {});
}

const monthOrder = { january: 1, february: 2, march: 3, april: 4, may: 5, june: 6, july: 7, august: 8, september: 9, october: 10, november: 11, december: 12 };
const getMonthNum = (m) => monthOrder[(m || '').toLowerCase()] || 0;

export function getPapers() {
    const entries = readYaml('publications.yml', []);
    if (!Array.isArray(entries)) return [];

    const papers = entries.map(entry => ({
        title: String(entry.title || '').trim(),
        authors: String(entry.authors || '').trim(),
        summary: String(entry.summary || '').trim(),
        venue: String(entry.venue || '').trim(),
        venueTag: String(entry.venue_tag || '').trim(),
        topicTags: Array.isArray(entry.topics) ? entry.topics.map(t => String(t).trim()).filter(Boolean) : [],
        year: parseInt(entry.year) || 9999,
        month: String(entry.month || '').trim(),
        selected: entry.selected === true,
        preview_url: entry.preview ? `/previews/${entry.preview}` : '',
        pdf_url: String(entry.pdf || '').trim(),
        code_url: String(entry.code || '').trim(),
        website_url: String(entry.website || '').trim(),
        video_ext_url: String(entry.video || '').trim(),
        bibtex: String(entry.bibtex || '').trim(),
    }));

    // Sort by year descending, then month descending
    papers.sort((a, b) => {
        if (b.year !== a.year) return b.year - a.year;
        return getMonthNum(b.month) - getMonthNum(a.month);
    });

    return papers;
}

export function getSelectedPapers() {
    return getPapers().filter(paper => paper.selected);
}

export function getVenueColors() {
    const fullPath = path.join(contentDirectory, 'venue_colors.txt');
    const colors = {};
    if (!fs.existsSync(fullPath)) return colors;
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    fileContents.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) return;
        const eqIdx = trimmed.indexOf('=');
        const tag = trimmed.substring(0, eqIdx).trim();
        const color = trimmed.substring(eqIdx + 1).trim();
        if (tag && color) colors[tag] = color;
    });
    return colors;
}

export function getNews(limit = 5) {
    const items = readYaml('news.yml', []);
    if (!Array.isArray(items)) return [];
    return items
        .map(item => ({ ...item, descriptionHtml: inline(item.description), timestamp: Date.parse(item.date || '') || 0 }))
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, limit);
}

// Work experience and education share one shape: rendered top to bottom in file order.
function getTimeline(fileName) {
    const items = readYaml(fileName, []);
    if (!Array.isArray(items)) return [];
    return items.map(item => ({
        title: String(item.title || '').trim(),
        org: String(item.org || '').trim(),
        url: String(item.url || '').trim(),
        location: String(item.location || '').trim(),
        period: String(item.period || '').trim(),
        detailHtml: inline(item.detail),
        noteHtml: inline(item.note),
    }));
}

export function getExperience() {
    return getTimeline('experience.yml');
}

export function getEducation() {
    return getTimeline('education.yml');
}

export function getAwards() {
    const items = readYaml('awards.yml', []);
    if (!Array.isArray(items)) return [];
    return items.map(item => ({
        name: String(item.name || '').trim(),
        entity: String(item.entity || '').trim(),
        date: String(item.date || '').trim(),
        descriptionHtml: inline(item.description),
        url: String(item.url || '').trim(),
    }));
}

export function getTeaching() {
    const items = readYaml('teaching.yml', []);
    if (!Array.isArray(items)) return [];

    // Group repeated offerings of the same course into one row with several term chips.
    const grouped = [];
    items.forEach(item => {
        const course = String(item.course || '').trim();
        let row = grouped.find(r => r.course === course);
        if (!row) {
            row = {
                course,
                role: String(item.role || '').trim(),
                where: String(item.where || '').trim(),
                link: String(item.link || '').trim(),
                terms: [],
            };
            grouped.push(row);
        }
        if (item.term) row.terms.push(String(item.term).trim());
    });
    return grouped;
}

export function getService() {
    const items = readYaml('service.yml', []);
    if (!Array.isArray(items)) return [];
    return items.map(item => ({
        label: String(item.label || '').trim(),
        html: inline(item.text),
    }));
}
