import { getTranslations } from 'next-intl/server';
import ContactCTA from '@/components/Home/ContactCTA';
import ReadyMixConcreteSolutions from '@/components/Services/ReadyMixConcreteSolutions';
import CustomConcreteMixtures from '@/components/Services/CustomConcreteMixtures';
import PreCastProducts from '@/components/Services/PreCastProducts';
import QualityCommitments from '@/components/About/QualityCommitments';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'servicesPage' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default function Services() {
  return (
    <>
    <ReadyMixConcreteSolutions />
    <CustomConcreteMixtures />
    <PreCastProducts />
    <QualityCommitments />
    <ContactCTA />
    </>
  );
}