import { useContext } from 'react'
import { StatusContext } from '~/stores/status'

export const useStatusContext = () => useContext(StatusContext)
