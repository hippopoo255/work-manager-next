import { User } from '@/interfaces/models'
import React from 'react'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import { Avatar, Tooltip } from '@material-ui/core'
import { STORAGE_URL } from '@/lib/util'
import { makeStyles, Theme } from '@material-ui/core/styles'

type Props = {
  members: User[]
}

const useStyles = makeStyles((theme: Theme) => ({
  colorDefault: {
    backgroundColor: theme.palette.primary.main,
  },
}))

const MembersAvatar = ({ members }: Props) => {
  const classes = useStyles()
  return (
    <AvatarGroup max={4}>
      {members.length &&
        members.map((member) => (
          <Tooltip title={member.full_name} key={`member_${member.id}`}>
            <Avatar
              alt={member.family_name}
              src={member.file_path ? `${STORAGE_URL}/${member.file_path}` : ''}
              classes={{
                colorDefault: classes.colorDefault,
              }}
            >
              {member.family_name ? member.family_name.slice(0, 1) : ''}
            </Avatar>
          </Tooltip>
        ))}
    </AvatarGroup>
  )
}

export default MembersAvatar
