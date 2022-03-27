import React from 'react'
import lSection from '@/assets/scss/Module/section.module.scss'

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
