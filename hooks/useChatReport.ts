import React, { useState } from 'react'
import { useRestApi } from '@/hooks'
import { ChatReportInputs } from '@/interfaces/form/inputs'
import { ReportCategory, ChatReport } from '@/interfaces/models'
import { requestUri } from '@/api'
import useInitialConnector from './useInitialConnector'

const useChatReport = (id: number) => {
  const [reportCategories, setReportCategories] = useState<ReportCategory[]>([])
  const { postMethod } = useRestApi()

  useInitialConnector<ReportCategory[]>({
    path: requestUri.reportCategories.index,
    onSuccess: (data) => {
      setReportCategories(data)
    },
  })

  const save = async (inputs: ChatReportInputs) => {
    return await postMethod<ChatReport, ChatReportInputs>(
      requestUri.chatMessage.report.replace('{id}', String(id)),
      inputs
    )
  }

  return {
    reportCategories,
    save,
  }
}

export default useChatReport
