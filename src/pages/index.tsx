import type { NextPageWithLayout, GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AiOutlineSearch } from 'react-icons/ai'
import { IconButton } from '~/components/elements'
import { BorderButton, Button } from '~/components/elements/Button'
import { ScrollDown } from '~/components/elements/ScrollDown'
import { ThemeToggle } from '~/components/elements/Toggle'
import { Tooltip } from '~/components/elements/Tooltip'
import Layout from '~/components/layouts/Default'

const Home: NextPageWithLayout = () => {
  const { t, i18n } = useTranslation()
  return (
    <div className="p-page">
      <div className="p-card mx-4">
        <div className="p-card__inner">
          <div className="flex justify-start items-center gap-4">
            <Tooltip text="この操作は無効です">
              <span className="text-disabled">{t('siteTitle')}</span>
            </Tooltip>
            <div className="mx-4">
              <ScrollDown />
            </div>
            <Tooltip text="この操作は無効です">
              <span className="text-disabled self-end">{t('siteTitle')}</span>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="p-card mx-4 mt-4 overflow-x-hidden">
        <div className="p-card__inner">
          <div className="flex justify-start items-center gap-4 flex-wrap">
            <IconButton
              text={'検索する'}
              icon={<AiOutlineSearch />}
              size={'xl'}
            />
            <IconButton
              text={'検索する'}
              icon={<AiOutlineSearch />}
              size={'lg'}
            />
            <IconButton text={'検索する'} icon={<AiOutlineSearch />} />
            <IconButton
              text={'検索する'}
              icon={<AiOutlineSearch />}
              size={'sm'}
            />
            <IconButton
              text={'検索する'}
              icon={<AiOutlineSearch />}
              size={'xs'}
            />
            <IconButton
              text={'検索する'}
              icon={<AiOutlineSearch />}
              size={'xl'}
              round
            />
            <IconButton
              text={'検索する'}
              icon={<AiOutlineSearch />}
              size={'lg'}
              round
            />
            <IconButton text={'検索する'} icon={<AiOutlineSearch />} round />
            <IconButton
              text={'検索する'}
              icon={<AiOutlineSearch />}
              size={'sm'}
              round
            />
            <IconButton
              text={'検索する'}
              icon={<AiOutlineSearch />}
              size={'xs'}
              round
            />
          </div>
        </div>
      </div>
      <div className="p-card mx-4 mt-4">
        <div className="p-card__inner">
          <h3>Button</h3>
          <div className="p-card__grid items-start">
            <div className="text-center">Natural</div>
            <div className="text-center">light</div>
            <div className="text-center">Default</div>
            <div className="text-center">Dark</div>
            <div className="">Primary</div>
            <Button text={t('header.signIn')} className={'--primary-natural'} />
            <Button text={t('header.signIn')} className={'--primary-light'} />
            <Button text={t('header.signIn')} />
            <Button
              text={t('header.signIn')}
              className={'--primary-dark --signin'}
              loading={true}
            />
            <div>Secondary</div>
            <Button
              text={t('header.signIn')}
              className={'--secondary-natural'}
            />
            <Button text={t('header.signIn')} className={'--secondary-light'} />
            <Button text={t('header.signIn')} className={'--secondary'} />
            <Button text={t('header.signIn')} className={'--secondary-dark'} />
            <div>Disabled</div>
            <Button
              text={t('header.signIn')}
              className={'--disabled-natural'}
            />
            <Button text={t('header.signIn')} className={'--disabled-light'} />
            <Button text={t('header.signIn')} className={'--disabled'} />
            <Button text={t('header.signIn')} className={'--disabled-dark'} />
            <div>Success</div>
            <Button text={t('header.signIn')} className={'--success-natural'} />
            <Button text={t('header.signIn')} className={'--success-light'} />
            <Button text={t('header.signIn')} className={'--success'} />
            <Button text={t('header.signIn')} className={'--success-dark'} />
            <div>Warning</div>
            <Button text={t('header.signIn')} className={'--warning-natural'} />
            <Button text={t('header.signIn')} className={'--warning-light'} />
            <Button text={t('header.signIn')} className={'--warning'} />
            <Button text={t('header.signIn')} className={'--warning-dark'} />
            <div>Danger</div>
            <Button text={t('header.signIn')} className={'--danger-natural'} />
            <Button text={t('header.signIn')} className={'--danger-light'} />
            <Button text={t('header.signIn')} className={'--danger'} />
            <Button text={t('header.signIn')} className={'--danger-dark'} />
            <div>Minutes</div>
            <Button text={t('header.signIn')} className={'--minutes-natural'} />
            <Button text={t('header.signIn')} className={'--minutes-light'} />
            <Button text={t('header.signIn')} className={'--minutes'} />
            <Button text={t('header.signIn')} className={'--minutes-dark'} />
            <div>Task</div>
            <Button text={t('header.signIn')} className={'--task-natural'} />
            <Button text={t('header.signIn')} className={'--task-light'} />
            <Button text={t('header.signIn')} className={'--task'} />
            <Button text={t('header.signIn')} className={'--task-dark'} />
            <div>Schedule</div>
            <Button
              text={t('header.signIn')}
              className={'--schedule-natural'}
            />
            <Button text={t('header.signIn')} className={'--schedule-light'} />
            <Button text={t('header.signIn')} className={'--schedule'} />
            <Button text={t('header.signIn')} className={'--schedule-dark'} />
            <div>Chat</div>
            <Button text={t('header.signIn')} className={'--chat-natural'} />
            <Button text={t('header.signIn')} className={'--chat-light'} />
            <Button text={t('header.signIn')} className={'--chat'} />
            <Button text={t('header.signIn')} className={'--chat-dark'} />
            <div>Size</div>
            <Button text="エックスエス" className={'--chat-dark --xs'} />
            <Button text="エスエム" className={'--chat-dark'} size="sm" />
            <Button text="デフォルト" className={'--chat-dark'} />
            <Button text="ラージ" className={'--chat-dark'} size="lg" loading />
            <Button
              text="エックスラージ"
              className={'--chat-dark'}
              size={'xl'}
            />
            <Button
              text="エックスラージ"
              className={'--chat-dark'}
              size={'xl'}
              loading
            />
          </div>
        </div>
      </div>
      <div className="p-card mx-4 mt-4">
        <div className="p-card__inner">
          <div className="flex justify-center">
            <Tooltip text="この操作は無効です">
              <span className="text-disabled">Tooltip</span>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="p-card mx-4 mt-4">
        <div className="p-card__inner">
          <div className="p-card__grid">
            <h3>BorderButton</h3>
            <div className="text-center">Natural</div>
            <div className="text-center">light</div>
            <div className="text-center">Default</div>
            <div className="text-center">Dark</div>
            <div className="">Primary</div>
            <BorderButton
              text={t('header.signIn')}
              className={'--primary-natural'}
            />
            <BorderButton
              text={t('header.signIn')}
              className={'--primary-light'}
            />
            <BorderButton text={t('header.signIn')} />
            <BorderButton
              text={t('header.signIn')}
              className={'--primary-dark'}
            />
            <div>Secondary</div>
            <BorderButton
              text={t('header.signIn')}
              className={'--secondary-natural'}
            />
            <BorderButton
              text={t('header.signIn')}
              className={'--secondary-light'}
            />
            <BorderButton text={t('header.signIn')} className={'--secondary'} />
            <BorderButton
              text={t('header.signIn')}
              className={'--secondary-dark'}
            />
            <div>Disabled</div>
            <BorderButton
              text={t('header.signIn')}
              className={'--disabled-natural'}
            />
            <BorderButton
              text={t('header.signIn')}
              className={'--disabled-light'}
            />
            <BorderButton text={t('header.signIn')} className={'--disabled'} />
            <BorderButton
              text={t('header.signIn')}
              className={'--disabled-dark'}
            />
            <div>Success</div>
            <BorderButton
              text={t('header.signIn')}
              className={'--success-natural'}
            />
            <BorderButton
              text={t('header.signIn')}
              className={'--success-light'}
            />
            <BorderButton text={t('header.signIn')} className={'--success'} />
            <BorderButton
              text={t('header.signIn')}
              className={'--success-dark'}
            />
            <div>Warning</div>
            <BorderButton
              text={t('header.signIn')}
              className={'--warning-natural'}
            />
            <BorderButton
              text={t('header.signIn')}
              className={'--warning-light'}
            />
            <BorderButton text={t('header.signIn')} className={'--warning'} />
            <BorderButton
              text={t('header.signIn')}
              className={'--warning-dark'}
            />
            <div>Danger</div>
            <BorderButton
              text={t('header.signIn')}
              className={'--danger-natural'}
            />
            <BorderButton
              text={t('header.signIn')}
              className={'--danger-light'}
            />
            <BorderButton text={t('header.signIn')} className={'--danger'} />
            <BorderButton
              text={t('header.signIn')}
              className={'--danger-dark'}
            />
            <div>Minutes</div>
            <BorderButton
              text={t('header.signIn')}
              className={'--minutes-natural'}
            />
            <BorderButton
              text={t('header.signIn')}
              className={'--minutes-light'}
            />
            <BorderButton text={t('header.signIn')} className={'--minutes'} />
            <BorderButton
              text={t('header.signIn')}
              className={'--minutes-dark'}
            />
            <div>Task</div>
            <BorderButton
              text={t('header.signIn')}
              className={'--task-natural'}
            />
            <BorderButton
              text={t('header.signIn')}
              className={'--task-light'}
            />
            <BorderButton text={t('header.signIn')} className={'--task'} />
            <BorderButton text={t('header.signIn')} className={'--task-dark'} />
            <div>Schedule</div>
            <BorderButton
              text={t('header.signIn')}
              className={'--schedule-natural'}
            />
            <BorderButton
              text={t('header.signIn')}
              className={'--schedule-light'}
            />
            <BorderButton text={t('header.signIn')} className={'--schedule'} />
            <BorderButton
              text={t('header.signIn')}
              className={'--schedule-dark'}
            />
            <div>Chat</div>
            <BorderButton
              text={t('header.signIn')}
              className={'--chat-natural'}
            />
            <BorderButton
              text={t('header.signIn')}
              className={'--chat-light'}
            />
            <BorderButton text={t('header.signIn')} className={'--chat'} />
            <BorderButton text={t('header.signIn')} className={'--chat-dark'} />
            <BorderButton
              text={t('header.signIn')}
              className={'--chat'}
              loading
            />
          </div>
        </div>
      </div>
      <div className="p-card mx-4 mt-4">
        <div className="p-card__inner">
          <div className="flex align-center flex-wrap gap-2">
            <p className="u-text-gradient-primary text-2xl font-bold">
              Primary
            </p>
            <p className="u-text-gradient-secondary text-2xl font-bold">
              Secondary
            </p>
            <p className="u-text-gradient-danger text-2xl font-bold">Danger</p>
            <p className="u-text-gradient-success text-2xl font-bold">
              Success
            </p>
            <p className="u-text-gradient-warning text-2xl font-bold">
              Warning
            </p>
            <p className="u-text-gradient-minutes text-2xl font-bold">
              Minutes
            </p>
            <p className="u-text-gradient-task text-2xl font-bold">Task</p>
            <p className="u-text-gradient-schedule text-2xl font-bold">
              Schedule
            </p>
            <p className="u-text-gradient-chat text-2xl font-bold">Chat</p>
          </div>
        </div>
      </div>
      <div className="p-card mx-4 mt-4">
        <div className="p-card__inner">
          <div className="flex">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

Home.getLayout = (page) => <Layout>{page}</Layout>

export async function getStaticProps({
  locale,
}: Required<GetStaticPropsContext>) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
