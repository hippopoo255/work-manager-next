import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { User, SignUpInputs } from '~/schema/generated/@types'
import {
  schema,
  RegisterOrganizationForm,
} from '~/schema/organization/registerOrganizationValidator'
import { useRegisterAdmin } from '~/services/admin'
import { useAuthContext } from '~/services/auth'
import { useFetch } from '~/services/common'
import { useStatus } from '~/services/status'
import { signInAction } from '~/stores/auth'

const useRegisterOrganization = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { update: updateStatus } = useStatus()
  const { post } = useFetch()
  const { auth, dispatch } = useAuthContext()
  const { register } = useRegisterAdmin()
  const { t } = useTranslation('form')

  const router = useRouter()
  const methods = useForm<RegisterOrganizationForm>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      name_kana: '',
      postal_code: '',
      pref_id: 0,
      city: '',
      address: '',
      tel: '',
      password: '',
    },

    resolver: yupResolver(schema({ t })),
  })

  const onSubmit = async (inputs: RegisterOrganizationForm) => {
    setLoading(true)
    const user: (User & { login_id: string }) | null = await post<
      User & { login_id: string },
      RegisterOrganizationForm
    >('/organization', inputs)
      .then(({ data }) => data)
      .catch(({ data: errData }) => {
        setLoading(false)
        updateStatus({
          message: errData.message,
          statusCode: errData.status,
          category: 'error',
        })
        return null
      })

    if (user && user.organization_id) {
      const signUpInputs: SignUpInputs = {
        email: auth.user.email ?? '',
        user_id: user.login_id ?? '',
        password: inputs.password,
        given_name: auth.user.given_name,
        given_name_kana: auth.user.given_name_kana,
        family_name: auth.user.family_name,
        family_name_kana: auth.user.family_name_kana,
      }

      const admin = await register(signUpInputs)

      if (admin) {
        dispatch(
          signInAction({
            ...auth.user,
            organization_id: user.organization_id,
          })
        )
        updateStatus({
          message: '組織情報の登録が完了しました。',
          statusCode: 201,
          category: 'success',
        })
        router.replace('/mypage')
      } else {
        setLoading(false)
        return admin // null
      }
    }

    return user // null
  }

  return {
    onSubmit,
    FormProvider,
    methods,
    loading,
  }
}

export default useRegisterOrganization
