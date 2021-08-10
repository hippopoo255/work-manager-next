import axios, { AxiosResponse } from 'axios'

export type Config = {
  headers: {
    'X-HTTP-Method-Override': 'PUT'
  }
}

let httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

const putRequest = async <T, U>(
  path: string,
  data: U,
  handleError: ((err: AxiosResponse) => unknown) | null = null
): Promise<T> => {
  let config: Config = {
    headers: {
      'X-HTTP-Method-Override': 'PUT',
    },
  }

  const axiosFunc: () => Promise<AxiosResponse<T>> = () => {
    return httpClient.post(path, data, config)
  }

  const res = await axiosFunc().catch((err) => {
    return err.response
  })

  if (res.status >= 400) {
    handleError ? handleError(res) : console.error(res)
    return res
  } else {
    return res.data
  }
}
export default putRequest
