import Link from 'next/link'
import { AuthNav } from './AuthNav'

const Header = () => {
  return (
    <div className="l-header">
      <div>
        <div>
          <Link href={'/'}>Top</Link>
        </div>
      </div>
      <div>
        <AuthNav />
      </div>
    </div>
  )
}

export default Header
