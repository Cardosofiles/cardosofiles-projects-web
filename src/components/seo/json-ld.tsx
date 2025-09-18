import Script from 'next/script'

interface PersonJsonLdProps {
  name: string
  jobTitle: string
  url: string
  sameAs: string[]
  description: string
}

export function PersonJsonLd({ name, jobTitle, url, sameAs, description }: PersonJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    url,
    sameAs,
    description,
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Prisma',
      'PostgreSQL',
      'Tailwind CSS',
      'Full Stack Development',
      'Frontend Development',
      'Backend Development',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Full Stack Developer',
      occupationLocation: {
        '@type': 'Country',
        name: 'Brazil',
      },
    },
  }

  return (
    <Script
      id="person-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface WebsiteJsonLdProps {
  name: string
  description: string
  url: string
}

export function WebsiteJsonLd({ name, description, url }: WebsiteJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description,
    url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    author: {
      '@type': 'Person',
      name: 'Cardoso Files',
    },
  }

  return (
    <Script
      id="website-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface ProjectJsonLdProps {
  name: string
  description: string
  url: string
  programmingLanguage: string[]
  dateCreated: string
}

export function ProjectJsonLd({
  name,
  description,
  url,
  programmingLanguage,
  dateCreated,
}: ProjectJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    programmingLanguage,
    dateCreated,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web Browser',
    author: {
      '@type': 'Person',
      name: 'Cardoso Files',
    },
  }

  return (
    <Script
      id="project-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
