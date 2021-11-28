import React from 'react'
import { makeStyles, Theme, lighten } from '@material-ui/core/styles'
import FullCalendar, {
  EventChangeArg,
  EventClickArg,
  EventDropArg,
} from '@fullcalendar/react'
import { DateClickArg } from '@fullcalendar/interaction'
import { EventSourceInput } from '@fullcalendar/common'
import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import PropTypes from 'prop-types'
import { fullCalendarOptions } from '@/lib/fullCalendar'

export type Props = {
  initialEvents: EventSourceInput
  onEventClick: (e: EventClickArg) => void
  onDateClick: (e: DateClickArg) => void
  onEventChange: (e: EventChangeArg) => void
}

const useStyles = makeStyles((theme: Theme) => ({
  customCalendar: {
    color: theme.palette.text.secondary,
    // タイトル
    '& .fc-toolbar-title': {
      fontSize: theme.typography.h6.fontSize,
      color: theme.palette.primary.main,
    },
    // [theme.breakpoints.between('xs', 'sm')]: {
    //   '& .fc-header-toolbar': {
    //     flexWrap: 'wrap',
    //     '& .fc-toolbar-chunk:nth-of-type(1)': {
    //       order: 2,
    //     },
    //     '& .fc-toolbar-chunk:nth-of-type(2)': {
    //       width: '100%',
    //       order: 1,
    //       marginBottom: theme.spacing(1),
    //     },
    //     '& .fc-toolbar-chunk:nth-of-type(3)': {
    //       order: 3,
    //     },
    //   },
    // },
    // 先頭行の曜日ラベル
    '& .fc .fc-col-header-cell-cushion': {
      padding: '2px 8px',
    },
    // daygrid
    '& .fc-daygrid-day': {
      transition: theme.transitions.duration.standard,
      '&:hover': {
        background: theme.palette.action.hover,
        cursor: 'pointer',
      },
    },
    // イベントのスタイル
    '& .fc-event-main-frame': {
      fontWeight: theme.typography.fontWeightBold,
    },
    '& .fc-event-time': {
      flexShrink: 0,
    },
    '& .fc .fc-popover': {
      zIndex: theme.zIndex.appBar + 1,
    },
  },
}))

const CustomCalendar = ({
  initialEvents,
  onEventClick,
  onDateClick,
  onEventChange,
}: Props) => {
  const classes = useStyles()
  const handleEventClick = (e: EventClickArg) => {
    onEventClick(e)
  }
  const handleDateClick = (e: DateClickArg) => {
    onDateClick(e)
  }
  const handleEventChange = (e: EventChangeArg) => {
    onEventChange(e)
  }
  return (
    <div className={classes.customCalendar}>
      <FullCalendar
        events={initialEvents}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        eventChange={handleEventChange}
        {...fullCalendarOptions}
      />
    </div>
  )
}

CustomCalendar.propTypes = {
  initialEvents: PropTypes.array,
}

CustomCalendar.defaultProps = {
  initialEvents: [
    {
      title: '会議 event',
      start: new Date(),
      end: new Date('2021/08/20 12:00'),
    },
  ],
}

export default CustomCalendar
