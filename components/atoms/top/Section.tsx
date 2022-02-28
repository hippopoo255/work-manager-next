import React from 'react'
import lSection from '@/assets/scss/Layout/l-section.module.scss'

type Props = {
  children: React.ReactNode
  id?: string
}

const Section = ({ children, id }: Props) => {
  return (
    <section className={lSection.root} id={id || ''}>
      {children}
    </section>
  )
}

export default Section
