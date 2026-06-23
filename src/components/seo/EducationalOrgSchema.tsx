import React from 'react';

interface EducationalOrgSchemaProps {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  country?: string;
  city?: string;
}

export default function EducationalOrgSchema({
  name,
  url,
  logo,
  description,
  country,
  city,
}: EducationalOrgSchemaProps) {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name,
    url,
  };

  if (logo) schema.logo = logo;
  if (description) schema.description = description;

  if (country || city) {
    schema.address = {
      '@type': 'PostalAddress',
      addressCountry: country,
      addressLocality: city,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
