import { withSSRContext } from 'aws-amplify'
import { GetServerSideProps } from 'next'
import { useEffect } from 'react'
import React from 'react'
import { cognitoUser } from '~/libs/auth'
import { User } from '~/schema/@types'
import { useAuthContext } from '~/services/auth'
import { currentUserAction } from '~/stores/auth'

type Props = {
  user: User & { jwt: string }
}

const MyPage = ({ user }: Props) => {
  const { auth, dispatch } = useAuthContext()
  useEffect(() => {
    dispatch(currentUserAction(user))
  }, [])
  return <div>{auth.user.full_name}さん、こんにちは</div>
}

export default MyPage

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { Auth } = withSSRContext({ req })
  const user = await cognitoUser.currentUser(Auth)

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    }
  }

  return {
    props: {
      user,
    },
  }
}
