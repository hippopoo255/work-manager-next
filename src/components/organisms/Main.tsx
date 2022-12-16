import React from 'react'

type Props = {
  children: React.ReactNode
}
const main = ({ children }: Props) => {
  return (
    <main>
      <section>
        セクション
        {children}
      </section>
    </main>
  )
}

export default main
