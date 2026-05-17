/**
 * OrganizationSchema — JSON-LD structured data for the organization.
 * Helps Google AI Overview, Perplexity, and other AI systems identify
 * Mentor Career Consulting as an authoritative source in the study abroad niche.
 */
interface OrganizationSchemaProps {
  locale?: string;
}

export default function OrganizationSchema({ locale = 'tr' }: OrganizationSchemaProps) {
  const descriptions: Record<string, string> = {
    tr: 'Mentor Career Consulting, Türkiye\'den yurtdışı üniversite, dil okulu, lise ve yüksek lisans başvurularında profesyonel danışmanlık hizmetleri sunan premium bir eğitim platformudur.',
    en: 'Mentor Career Consulting is a premium education platform providing professional consultancy for university, language school, high school and master applications abroad from Turkey.',
    de: 'Mentor Career Consulting ist eine hochwertige Bildungsplattform, die professionelle Beratung für Universitäts-, Sprachschul-, Highschool- und Masterbewerbungen im Ausland anbietet.',
  };

  const webSiteNames: Record<string, string> = {
    tr: 'Mentor Career Consulting — Yurtdışı Eğitim Danışmanlığı',
    en: 'Mentor Career Consulting — Study Abroad Consultancy',
    de: 'Mentor Career Consulting — Auslandsstudienberatung',
  };

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.mentor-cc.com/#organization',
        name: 'Mentor Career Consulting',
        alternateName: ['Mentor Career Consulting', 'Mentor Career Consulting Overseas Education'],
        url: 'https://www.mentor-cc.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.mentor-cc.com/images/MentorCareer.png',
          width: 512,
          height: 512,
        },
        sameAs: [
          'https://www.facebook.com/mentorcareer',
          'https://www.instagram.com/mentorcareer',
          'https://www.linkedin.com/company/mentorcareer',
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+447501412151',
            contactType: 'customer service',
            areaServed: 'GB',
            availableLanguage: ['English', 'Turkish'],
          },
          {
            '@type': 'ContactPoint',
            telephone: '+447501412151',
            contactType: 'customer service',
            areaServed: 'TR',
            availableLanguage: ['Turkish', 'English'],
          },
          {
            '@type': 'ContactPoint',
            telephone: '+447501412151',
            contactType: 'customer service',
            areaServed: 'DE',
            availableLanguage: ['German', 'Turkish', 'English'],
          }
        ],
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'GB',
          addressLocality: 'London',
          streetAddress: 'London / UK',
        },
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
          { '@type': 'Country', name: 'Germany' },
          { '@type': 'Country', name: 'United Kingdom' }
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `https://www.mentor-cc.com/${locale}/#website`,
        url: `https://www.mentor-cc.com/${locale}`,
        name: webSiteNames[locale] || webSiteNames.tr,
        description: descriptions[locale] || descriptions.tr,
        publisher: {
          '@id': 'https://www.mentor-cc.com/#organization',
        },
        inLanguage: locale === 'tr' ? 'tr-TR' : locale === 'de' ? 'de-DE' : 'en-US',
      },
      {
        '@type': 'EducationEvent',
        '@id': 'https://www.mentor-cc.com/#service',
        name: locale === 'tr' ? 'Mentor Career Consulting' : 'Mentor Career Consulting',
        description: descriptions[locale] || descriptions.tr,
        organizer: {
          '@id': 'https://www.mentor-cc.com/#organization'
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

