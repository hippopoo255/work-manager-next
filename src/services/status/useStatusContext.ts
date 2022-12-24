import { useContext } from 'react'
import { StatusContext } from '~/stores/status'

const useStatusContext = () => useContext(StatusContext)

export default useStatusContext
