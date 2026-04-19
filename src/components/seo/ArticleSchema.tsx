/**
 * ArticleSchema — JSON-LD structured data for blog posts.
 * Implements Article + Person (author) schema for EEAT signals.
 * Critical for Google AI Overview citations and featured snippets.
 */
interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedAt: string; // ISO date string
  modifiedAt?: string; // ISO date string
  authorName?: string;
  category?: string;
}

export default function ArticleSchema({
  title,
  description,
  url,
  image,
  publishedAt,
  modifiedAt,
  authorName = 'StarEducation Editörü',
  category,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    inLanguage: 'tr-TR',
    isPartOf: {
      '@type': 'Blog',
      name: 'StarEducation Blog',
      url: 'https://www.stareducon.co.uk/blog',
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.stareducon.co.uk/#organization',
      name: 'Star Education Consulting',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.stareducon.co.uk/Services/Stareducation.png',
      },
    },
    author: {
      '@type': 'Person',
      name: authorName,
      worksFor: {
        '@id': 'https://www.stareducon.co.uk/#organization',
      },
      jobTitle: 'Yurtdışı Eğitim Danışmanı',
      url: 'https://www.stareducon.co.uk/kurumsal',
    },
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image,
      },
    }),
    ...(category && {
      articleSection: category,
    }),
    about: {
      '@type': 'Thing',
      name: 'Yurtdışı Eğitim',
      description: 'Uluslararası eğitim fırsatları ve danışmanlık hizmetleri',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
