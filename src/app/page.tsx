import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirect to the default locale (English in this case)
  redirect('/en');
}