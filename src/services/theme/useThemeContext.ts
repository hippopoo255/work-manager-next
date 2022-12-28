import { useContext } from 'react'
import { ThemeContext } from '~/stores/theme'

const useThemeContext = () => useContext(ThemeContext)

export default useThemeContext
