import aspida, { HTTPError } from '@aspida/fetch'
import { API_STAGE_URL } from '~/config'
import api from '~/schema/generated/$api'

export const initialConfig = {
  baseURL: API_STAGE_URL,
  throwHttpErrors: true, // throw an error on 4xx/5xx, default is false
}

export const client = api(aspida(fetch, initialConfig))
