import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useTheme } from '~/services/theme'

export default function Layout({
  children,
  title,
  className,
}: {
  children: React.ReactNode
  title?: string
  className?: string
}) {
  const { t } = useTranslation()

  const { init, theme } = useTheme()
  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <Head>
        <title>
          {!!title ? `${title} | ${t('siteTitle')}` : t('siteTitle')}
        </title>
      </Head>
      <div className={`l-app${className ?? ''}`} data-mode={theme.mode}>
        {children}
      </div>
    </>
  )
}
