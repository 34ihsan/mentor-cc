/**
 * Strips HTML tags from a string and returns plain text.
 * Useful for creating summaries from rich text content.
 */
export function stripHtml(html: string): string {
    if (!html) return "";

    // Remove HTML tags
    const text = html.replace(/<[^>]*>?/gm, ' ');

    // Decode common entities
    return text
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/'/g, "'")
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Creates a truncated summary from HTML content.
 */
export function createSummary(html: string, length: number = 100): string {
    const plainText = stripHtml(html);
    if (plainText.length <= length) return plainText;
    return plainText.substring(0, length).trim() + "...";
}

/**
 * Formats raw blog content into structured HTML for premium display.
 * Strips common data noise (author/date headers, menu fragments).
 */
export function formatPremiumContent(content: string, title?: string): string {
    if (!content) return "";

    // 1. If it already looks like structured HTML, return as is
    if (content.includes("<p>") || content.includes("<h2") || content.includes("<div")) {
        return content;
    }

    let cleaned = content;

    // 2. Identify and strip the semicolon-separated link metadata prefix
    // Pattern: https://www.StarEducation.com/blog/...;blog;Title;
    if (cleaned.startsWith("http") && cleaned.includes(";blog;")) {
        const parts = cleaned.split(";");
        if (parts.length > 3) {
            cleaned = parts.slice(3).join(" ");
        }
    }

    // 3. Strip trailing menu fragments and massive navigation dumps
    const junkSuffixes = [
        "Yurtdışında Dil Okulları Yurtdışında Dil Okulları",
        "Menü MENÜ KATEGORİLER",
        "Genel Yurtdışı Dil Eğitimi Yurtdışı Üniversite Eğitimi Yurtdışı Lise Eğitimi",
        "Yurtdışı Dil Eğitimi Yurtdışı Üniversite Eğitimi Yurtdışı Lise Eğitimi",
        "Yurtdışı Üniversite Eğitimi",
        "Yurtdışı Dil Eğitimi",
        "Yurtdışı Lise Eğitimi",
        "Genel Yurtdışı Dil Eğitimi"
    ];

    for (const suffix of junkSuffixes) {
        const index = cleaned.indexOf(suffix);
        // If we find the massive navigation dump, cut everything after it
        if (index !== -1 && (suffix.length > 30 || index > cleaned.length - 1000)) {
            cleaned = cleaned.substring(0, index).trim();
        }
    }

    // 4. Strip leading metadata pattern (Author Date Title) if title is provided
    if (title) {
        const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Match up to the first occurrence of the title in the first 500 chars
        const titleRegex = new RegExp(`^.*?${escapedTitle}`, 's');
        if (titleRegex.test(cleaned.substring(0, 500))) {
            cleaned = cleaned.replace(titleRegex, "").trim();
        }
    }

    // 5. Final structure: split by double newlines or large whitespace into paragraphs
    return cleaned
        .split(/\n\n+|\s\s\s+/)
        .map(para => para.trim())
        .filter(p => p.length > 5) // Skip empty/trivial lines
        .map(para => `<p>${para.replace(/\n/g, "<br />")}</p>`)
        .join("");
}
