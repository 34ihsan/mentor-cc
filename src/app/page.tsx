import { redirect } from 'next/navigation';

export default function RootPage() {
  // If we reach this page, it means the middleware didn't handle the root (/) rewrite.
  // We redirect to the default locale (tr).
  redirect('/tr');
}
