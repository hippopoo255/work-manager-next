import Head from 'next/head'
import { useRef, useEffect } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Typography, Box } from '@material-ui/core'
import { TestLoginButton } from '@/components/molecules'
import { ProductIntroductionCardList } from '@/components/template'
import { AboutNotification, AboutRealTime } from '@/components/organisms'
import { Layout } from '@/layouts'
import { headerHeight, API_STAGE_URL } from '@/lib/util'
import Shakehand from '@/assets/images/shakehand.svg'
import { RoundedIcon } from '@/components/atoms'
import { useLocale } from '@/hooks'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    head: {
      width: '100%',
      maxWidth: 1024,
      margin: '0 auto',
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px `,
      color: theme.palette.common.white,
    },
    fill: {
      background: theme.palette.primary.main,
      paddingBottom: theme.spacing(8),
      [theme.breakpoints.down('sm')]: {
        paddingBottom: theme.spacing(6),
      },
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing(4),
      [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap',
      },
      [theme.breakpoints.down('xs')]: {
        gap: theme.spacing(2),
      },
    },
    introduction: {
      maxWidth: 400,
    },
    title: {
      padding: `${theme.spacing(3)}px 0`,
      [theme.breakpoints.down('xs')]: {
        fontSize: '2rem',
      },
    },
    description: {
      lineHeight: 1.75,
      whiteSpace: 'pre-wrap',
    },
    section: {
      '&:nth-of-type(odd)': {
        background: theme.palette.grey[100],
      },
    },
  })
)

const Home = () => {
  const classes = useStyles()
  const { t } = useLocale()
  const description = t.main.description.replace(':site_title', t.siteTitle)
  let fillRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const resize = () => {
      const fullHeight = window.innerHeight - headerHeight
      if (!!fillRef) {
        fillRef!.current!.style.minHeight = `${fullHeight}px`
      }
    }
    resize()
  }, [])

  return (
    <Layout noShadow>
      <Head>
        <meta name="description" content={description} />
      </Head>
      <div>
        <section ref={fillRef} className={classes.fill}>
          <div className={classes.head}>
            <Box className={classes.flex}>
              <RoundedIcon Icon={Shakehand} />
              <div className={classes.introduction}>
                <Typography
                  className={classes.title}
                  variant={'h1'}
                  component={'h2'}
                >
                  {t.main.title.replace(':site_title', t.siteTitle)}
                </Typography>
                <Typography
                  className={classes.description}
                  variant={'subtitle2'}
                  component={'p'}
                >
                  {t.main.descriptionOmit.replace(':site_title', t.siteTitle)}
                </Typography>
                <Box textAlign={'center'} mt={3}>
                  <TestLoginButton
                    options={{
                      variant: 'outlined',
                      color: 'inherit',
                      fullWidth: true,
                    }}
                  />
                </Box>
              </div>
            </Box>
          </div>
          <div>
            <ProductIntroductionCardList />
          </div>
        </section>
        <section className={classes.section}>
          <AboutNotification />
        </section>
        <section className={classes.section}>
          <AboutRealTime />
        </section>
      </div>
    </Layout>
  )
}

export default Home
