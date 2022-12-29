import Head from 'next/head'
import { useEffect } from 'react'
import { useLocale } from '~/services/locale'
import { useTheme } from '~/services/theme'

export default function Layout({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) {
  const { t } = useLocale()

  const { init, theme } = useTheme()
  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <Head>
        <title>{!!title ? `${title} | ${t.siteTitle}` : t.siteTitle}</title>
      </Head>
      <div className="l-app" data-mode={theme.mode}>
        {children}
      </div>
    </>
  )
}
