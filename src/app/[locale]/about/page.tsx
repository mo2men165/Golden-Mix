import AutoScrollWrapper from '@/components/Home/AutoScrollWrapper';
import CompanyHistory from '@/components/About/CompanyHistory';
import ContactCTA from '@/components/Home/ContactCTA';
import { getTranslations } from 'next-intl/server';
import LeadershipTeam from '@/components/About/LeadershipTeam';
import CompanyRegistration from '@/components/About/CompanyRegistration';
import QualityCommitments from '@/components/About/QualityCommitments';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default function About() {
  return (
    <>
        <CompanyHistory />
        <LeadershipTeam />
        <CompanyRegistration />
        <QualityCommitments />
        <ContactCTA />
    </>
  );
}