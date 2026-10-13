import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteData } from '../data/siteData';

export const SEO = ({
  title = siteData.meta.title,
  description = siteData.meta.description,
  canonicalUrl = siteData.meta.canonicalUrl,
  ogImage = siteData.meta.ogImage,
  ogType = 'website'
}) => {
  const fullOgImage = ogImage.startsWith('http')
    ? ogImage
    : `${siteData.meta.siteUrl}${ogImage}`;

  // Structured Data (Schema.org LocalBusiness: Plumber)
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    name: siteData.meta.businessName,
    description: description,
    url: siteData.meta.siteUrl,
    logo: `${siteData.meta.siteUrl}/favicon.svg`,
    image: fullOgImage,
    telephone: siteData.header.phoneNumber,
    email: siteData.about.contact.email,
    priceRange: '$$',
    areaServed: siteData.meta.areaServed.map((country) => ({
      '@type': 'Country',
      name: country
    })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '00:00',
        closes: '23:59'
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: siteData.meta.ratingValue,
      reviewCount: siteData.meta.reviewCount,
      bestRating: '5',
      worstRating: '1'
    }
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content={siteData.header.brandName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* LocalBusiness JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default SEO;
