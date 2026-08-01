import type { ExamConfig } from '../data/exams';

export interface SEOProps {
  title: string;
  description: string;
  exam?: string;
  subject?: string;
  type?: 'article' | 'quiz' | 'website' | 'collection' | 'faq';
  slug?: string;
  date?: Date;
  updatedDate?: Date;
  image?: string;
  keywords?: string[];
  siteUrl?: string;
}

export function buildStructuredData(props: SEOProps & { examConfig?: ExamConfig; siteUrl: string }) {
  const { title, description, examConfig, type = 'article', slug, date, updatedDate, image, siteUrl } = props;

  const canonical = new URL(slug || '', siteUrl).toString();
  const ogImage = image ? new URL(image, siteUrl).toString() : new URL('/og-default.jpg', siteUrl).toString();

  const base = {
    '@context': 'https://schema.org',
    '@type': type === 'quiz' ? 'Quiz' : type === 'collection' ? 'CollectionPage' : type === 'faq' ? 'FAQPage' : 'TechArticle',
    headline: title,
    description,
    url: canonical,
    image: ogImage,
    datePublished: date?.toISOString(),
    dateModified: updatedDate?.toISOString() || date?.toISOString(),
    publisher: {
      '@type': 'Organization',
      name: 'ExamCheatSheets',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: new URL('/favicon.svg', siteUrl).toString(),
      },
    },
    author: {
      '@type': 'Organization',
      name: 'ExamCheatSheets',
    },
    ...(examConfig && {
      about: {
        '@type': 'Thing',
        name: examConfig.fullName,
      },
    }),
  };

  return { canonical, ogImage, structuredData: base };
}

export function buildBreadcrumbSchema(items: { label: string; href: string }[], siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: new URL(item.href, siteUrl).toString(),
    })),
  };
}

export function buildFAQSchema(faq: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildOrganizationSchema(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ExamCheatSheats',
    url: siteUrl,
    sameAs: [
      'https://github.com/bitwiseanand/ccat',
    ],
    description: 'Free, no-login exam cheat sheets for CS exams.',
  };
}
