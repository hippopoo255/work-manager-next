import { useRouter } from 'next/router'
import { useState, useContext, useCallback, useEffect } from 'react'
import { useRestApi } from '@/hooks'
import { useForm } from 'react-hook-form'
import { requestUri } from '@/api'
import { AuthContext } from '@/provider/AuthProvider'
import { OrganizationInputs } from '@/interfaces/form/inputs'
import { Organization, Prefecture, User } from '@/interfaces/models'
import { cognitoAdmin } from '@/lib/auth'
import fetchAddressByPostalCode, { Address } from '@/lib/axios-jsonp'
import { CognitoUser } from 'amazon-cognito-identity-js'

const useOrganization = () => {
  const router = useRouter()
  const { auth } = useContext(AuthContext)
  const { getMethod, postMethod, putMethod } = useRestApi()
  const [loading, setLoading] = useState<boolean>(false)
  const [prefectureList, setPrefecturelist] = useState<Prefecture[]>([])
  useEffect(() => {
    if (auth.isLogin) {
      const fetch = async () => {
        await getMethod<Prefecture[]>(requestUri.prefecture.list).then(
          (data) => {
            setPrefecturelist(data)
          }
        )
      }
      fetch()
    }
  }, [auth])

  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<OrganizationInputs>()

  const store = useCallback(
    async (inputs: OrganizationInputs) => {
      const response = await postMethod<User, OrganizationInputs>(
        requestUri.organization.store,
        inputs
      )
        .then((user) => {
          if (user) {
            const signupInputs = {
              email: auth.user.email,
              login_id: user.login_id || '',
              password: inputs.password,
              given_name: auth.user.given_name,
              given_name_kana: auth.user.given_name_kana,
              family_name: auth.user.family_name,
              family_name_kana: auth.user.family_name_kana,
            }
            const admin = cognitoAdmin.signup(signupInputs)
            return admin
          }
          return ''
        })
        .catch((err) => {
          const errBody: { [k: string]: string[] } = err.data.errors
          const errMessages = Object.keys(errBody).map((key: any) => ({
            key,
            message: errBody[key][0],
          }))
          throw errMessages
        })
      return response
    },
    [auth]
  )

  const update = useCallback(
    async (inputs: OrganizationInputs, id: number) =>
      await putMethod<Organization, OrganizationInputs>(
        requestUri.organization.update.replace('{id}', String(id)),
        inputs
      ),
    [auth]
  )

  const save = useCallback(
    async (inputs: OrganizationInputs, id?: number) => {
      setLoading(true)
      if (id === undefined) {
        await store(inputs)
          .then((res: CognitoUser | '') => {
            if (!!res) {
              router.push('/mypage')
            }
          })
          .finally(() => {
            setLoading(false)
          })
      } else {
        await update(inputs, id).finally(() => {
          setLoading(false)
        })
      }
    },
    [auth]
  )

  const handlePostalCode = async () => {
    await fetchAddressByPostalCode(getValues('postal_code')).then(
      (address: Address) => {
        if (prefectureList !== undefined) {
          const target = prefectureList.find((p) => p.name === address.pref)
          if (!!target) {
            setValue('pref_id', target.id)
          } else {
            setValue('pref_id', 0)
          }
        }
        setValue('city', address.city)
        setValue('address', address.town)
        clearErrors(['pref_id', 'city', 'address'])
      }
    )
  }

  return {
    auth,
    control,
    errors,
    handlePostalCode,
    handleSubmit,
    loading,
    router,
    save,
    setError,
    setLoading,
    prefectureList,
    getValues,
  }
}

export default useOrganization
