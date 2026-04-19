/**
 * CourseSchema — JSON-LD structured data for educational programs and courses.
 * Tells AI systems (and Google) that this page is about an educational offering,
 * which improves visibility in educational queries.
 */
interface CourseSchemaProps {
  name: string;
  description: string;
  provider: string;
  url: string;
  country?: string;
  city?: string;
  language?: string;
  educationalLevel?: string;
  courseMode?: 'onsite' | 'online' | 'blended';
}

export default function CourseSchema({
  name,
  description,
  provider,
  url,
  country,
  city,
  language = 'Turkish',
  educationalLevel,
  courseMode = 'onsite',
}: CourseSchemaProps) {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    url,
    inLanguage: language === 'Turkish' ? 'tr-TR' : 'en-US',
    courseMode,
    provider: {
      '@type': 'Organization',
      name: 'Star Education Consulting',
      sameAs: 'https://www.stareducon.co.uk',
    },
    offers: {
      '@type': 'Offer',
      category: 'International Education',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
    },
  };

  if (country || city) {
    schema.locationCreated = {
      '@type': 'Place',
      name: [city, country].filter(Boolean).join(', '),
      address: {
        '@type': 'PostalAddress',
        addressCountry: country,
        addressLocality: city,
      },
    };
  }

  if (educationalLevel) {
    schema.educationalLevel = educationalLevel;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
