/**
 * OrganizationSchema — JSON-LD structured data for the organization.
 * Helps Google AI Overview, Perplexity, and other AI systems identify
 * StarEducation as an authoritative source in the study abroad niche.
 */
interface OrganizationSchemaProps {
  locale?: string;
}

export default function OrganizationSchema({ locale = 'tr' }: OrganizationSchemaProps) {
  const descriptions: Record<string, string> = {
    tr: 'StarEducation, Türkiye\'den yurtdışı üniversite, dil okulu, lise ve yüksek lisans başvurularında profesyonel danışmanlık hizmetleri sunan premium bir eğitim platformudur.',
    en: 'StarEducation is a premium education platform providing professional consultancy for university, language school, high school and master applications abroad from Turkey.',
  };

  const webSiteNames: Record<string, string> = {
    tr: 'StarEducation — Yurtdışı Eğitim Danışmanlığı',
    en: 'StarEducation — Study Abroad Consultancy',
  };

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.stareducon.co.uk/#organization',
        name: 'StarEducation',
        alternateName: ['Star Education', 'StarEducation Overseas Education'],
        url: 'https://www.stareducon.co.uk',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.stareducon.co.uk/Services/Stareducation.png',
          width: 160,
          height: 52,
        },
        sameAs: [
          'https://www.linkedin.com/company/stareducon',
          'https://www.instagram.com/stareducon',
          'https://www.facebook.com/stareducon',
          'https://twitter.com/stareducon',
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+90-212-123-45-67',
            contactType: 'customer service',
            areaServed: 'TR',
            availableLanguage: ['Turkish', 'English'],
          },
          {
            '@type': 'ContactPoint',
            telephone: '+44-20-1234-5678',
            contactType: 'local support',
            areaServed: 'GB',
            availableLanguage: ['English', 'Turkish'],
          }
        ],
        address: [
          {
            '@type': 'PostalAddress',
            addressCountry: 'TR',
            addressLocality: 'Istanbul',
            streetAddress: 'Merkez Ofis',
          },
          {
            '@type': 'PostalAddress',
            addressCountry: 'GB',
            addressLocality: 'London',
          }
        ],
        description: descriptions[locale] || descriptions.tr,
        knowsAbout: [
          'Study Abroad',
          'University Application',
          'Language School',
          'Student Visa',
          'International Education',
          'Yurtdışı Eğitim',
          'Yüksek Lisans Başvurusu',
          'Almanya Üniversite',
          'UK University Applications',
          'Canada Student Visas'
        ],
        areaServed: [
          { '@type': 'Country', name: 'Turkey' },
          { '@type': 'Country', name: 'United Kingdom' }
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `https://www.stareducon.co.uk/${locale}/#website`,
        url: `https://www.stareducon.co.uk/${locale}`,
        name: webSiteNames[locale] || webSiteNames.tr,
        description: descriptions[locale] || descriptions.tr,
        publisher: {
          '@id': 'https://www.stareducon.co.uk/#organization',
        },
        inLanguage: locale === 'tr' ? 'tr-TR' : 'en-US',
      },
      {
        '@type': 'EducationEvent',
        '@id': 'https://www.stareducon.co.uk/#service',
        name: locale === 'tr' ? 'Yurtdışı Eğitim Danışmanlığı' : 'Study Abroad Consultancy',
        description: descriptions[locale] || descriptions.tr,
        organizer: {
      '@id': 'https://www.stareducon.co.uk/#organization'
        }
      }
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
