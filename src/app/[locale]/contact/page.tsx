import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/Contact/ContactForm';
import OfficeLocation from '@/components/Contact/OfficeLocation';
import PlantLocations from '@/components/Contact/PlantLocations';
import ContactHero from '@/components/Contact/ContactHero';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contactPage' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default function Contact() {
  return (
    <>
      <ContactHero />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 container max-w-7xl mx-auto px-4 py-16">
        <ContactForm />
      </div>
      <OfficeLocation />
      <PlantLocations />
    </>
  );
}