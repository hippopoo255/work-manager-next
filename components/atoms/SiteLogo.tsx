import React from 'react'
import Logo from '@/assets/images/site_logo.svg'
import Link from 'next/link'
import clsx from 'clsx'
import headerStyle from '@/assets/scss/Module/header.module.scss'

type Props = {
  white?: boolean
}

const SiteLogo = ({ white }: Props) => {
  return (
    <div className={headerStyle['site-logo']}>
      <Link href="/" passHref>
        <Logo
          className={clsx('c-site-logo', headerStyle['site-logo__svg'], {
            [headerStyle.white]: white,
          })}
        />
      </Link>
      {/* <Typography
          className={classes.overline}
          variant={'overline'}
          color={'inherit'}
          component={'p'}
        >
          JYOBU SAPO
        </Typography> */}
    </div>
  )
}

export default SiteLogo
