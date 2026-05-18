import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['tr', 'en'],

  // Used when no locale matches
  defaultLocale: 'tr',

  // Disable automatic locale detection to force Turkish (TR) as the default language for everyone.
  // Users can still manually switch via the language switcher.
  localeDetection: false,

  // Clean URLs: Only the default locale (tr) will be served at the root, 
  // and other locales will use localized slugs without prefixes where possible.
  localePrefix: 'never'
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
const navigation = createNavigation(routing);

export const { usePathname, getPathname } = navigation;
// We cast these to any to avoid strict route typing issues with dynamic segments
export const redirect = navigation.redirect as any;
export const useRouter = navigation.useRouter as any;
export const Link = navigation.Link as any;


