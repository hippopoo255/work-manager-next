import React, { useState, useEffect, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import 'easymde/dist/easymde.min.css'
import { MarkdownPreview } from '@/components/atoms'
import { options as ops, useEditorStyles } from '@/lib/simplemde'
import SimpleMDE from 'easymde'
import { Button, Typography } from '@material-ui/core'
import clsx from 'clsx'

const SimpleMde = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

interface Props {
  value?: string
  onChange?: (value: string) => void
  options?: SimpleMDE.Options
}

// eslint-disable-next-line react/display-name
const MarkdownEditor = React.memo(({ value, onChange, options }: Props) => {
  const classes = useEditorStyles()
  const [editorValue, setEditorValue] = useState(value || '')
  const [previewHidden, setPreviewHidden] = useState<boolean>(true)
  const handleChange = useCallback((value: string) => {
    setEditorValue(value)
    if (!!onChange) {
      onChange(value)
    }
  }, [])

  useEffect(() => {
    if (value !== undefined) {
      setEditorValue(value)
    }
  }, [value])

  const mergedOption = useMemo(
    () =>
      !!options
        ? {
            ...ops,
            ...options,
          }
        : {
            ...ops,
          },
    []
  )

  const handleToggleClick = () => {
    setPreviewHidden(!previewHidden)
  }

  const toggleText = previewHidden ? 'プレビュー' : '閉じる'

  return (
    <div>
      <div className={classes.mde}>
        <SimpleMde
          className={classes.col}
          value={editorValue}
          onChange={handleChange}
          options={mergedOption}
        />
        <div
          className={clsx(classes.preview, {
            [classes.hidden]: previewHidden,
          })}
        >
          {editorValue ? (
            <MarkdownPreview editorValue={editorValue} />
          ) : (
            <Typography variant={'h5'} className={classes.previewOperator}>
              ここにプレビューが表示されます。
            </Typography>
          )}
        </div>
      </div>
      <Button
        className={classes.toggle}
        variant="outlined"
        color={'secondary'}
        onClick={handleToggleClick}
      >
        {toggleText}
      </Button>
    </div>
  )
})

export default MarkdownEditor
