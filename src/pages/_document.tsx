import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'
import React from 'react'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@kaba_farm" />
          <meta property="og:url" content="https://www.work-manager.site" />
          <meta property="og:title" content="Next.js Base Set up" />
          <meta
            property="og:description"
            content="Next.js,TypeScript,ESLint,Prettier,Husky,Stylelint,TailwindCSS"
          />
          <meta
            property="og:image"
            content="https://asset.work-manager.site/assets/no-image.jpg"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
