import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'contexts/Localization'
import { DEFAULT_META, getCustomMeta } from 'config/constants/meta'

const PageMeta: React.FC = () => {
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()
  const { pathname } = useRouter()

  const pageMeta = getCustomMeta(pathname, t, locale) || {}
  const { title, description, image } = { ...DEFAULT_META, ...pageMeta }

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  )
}

export default PageMeta
