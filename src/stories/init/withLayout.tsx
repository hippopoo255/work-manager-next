import { ReactNode, FC } from 'react'

const StorybookLayoutProvider = ({ children }: { children: ReactNode }) => {
  return (
    <div className="l-app">
      <main className="l-app__main">
        <div className="u-position-center">{children}</div>
      </main>
    </div>
  )
}

export const withLayout = (Story: FC) => (
  <StorybookLayoutProvider>
    <Story />
  </StorybookLayoutProvider>
)
