import { useInitialFetch } from '~/services/auth'

const GlobalNav = () => {
  const {
    auth: { user, isSignedIn },
  } = useInitialFetch()

  return <div>GlobalNav: {user.full_name}</div>
}

export default GlobalNav
