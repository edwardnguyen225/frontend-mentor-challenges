import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('Index');
  return <h1>{t('title')}</h1>;
}
