/**
 * FAQSchema — JSON-LD structured data for FAQ pages.
 * This is one of the most powerful ways to appear in Google AI Overview,
 * as AI systems extract FAQ data to answer user queries directly.
 */
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

// Strip HTML tags for schema output (schema.org doesn't support HTML)
function stripHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

export default function FAQSchema({ faqs }: FAQSchemaProps) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq: any) => ({
      '@type': 'Question',
      name: stripHtml(faq.question || faq.q),
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripHtml(faq.answer || faq.a),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
