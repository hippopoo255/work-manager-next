import Head from 'next/head'
import { useRef, useEffect } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Typography, Box } from '@material-ui/core'
import { TestLoginButton } from '@/components/molecules'
import { ProductIntroductionCardList } from '@/components/template'
import { AboutNotification, AboutRealTime } from '@/components/organisms'
import { Layout } from '@/layouts'
import { headerHeight, SITE_TITLE } from '@/lib/util'
import Shakehand from '@/assets/images/shakehand.svg'
import { RoundedIcon } from '@/components/atoms'

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
    },
    introduction: {
      maxWidth: 400,
    },
    title: {
      padding: `${theme.spacing(3)}px 0`,
      [theme.breakpoints.down('xs')]: {
        fontSize: '90%',
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
    make: {
      display: 'inline-block',
      padding: 16,
      // borderRadius: 9999,
      textAlign: 'center',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  })
)

const description = `${SITE_TITLE}は、ビジネスシーンで生じる「スケジュール管理」や「タスク管理」等の業務効率化を目的としたサービスです。\n「会議の議事録作成」や「スケジュール管理」「タスク管理」など、ビジネスシーンで生じる作業を当サービス内で完結できるほか、\n近年普及が進んでいるテレワークなど、メンバー間で物理的な距離のある働き方にも貢献する「チャット機能」を備えております。`
const descriptionOmit = `${SITE_TITLE}は、業務効率化を目的としたサービスです。\n「議事録の作成」「スケジュール管理」「タスク管理」「チャット」といった機能をお試しいただけます。`

const Home = () => {
  const classes = useStyles()
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
                  {SITE_TITLE}とは？
                </Typography>
                <Typography
                  className={classes.description}
                  variant={'subtitle2'}
                  component={'p'}
                >
                  {descriptionOmit}
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
