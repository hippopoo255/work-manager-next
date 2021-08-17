import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { DayCellContentArg } from '@fullcalendar/common'
export const calendarConfig = {
  locale: 'ja',
  headerToolbar: {
    left: 'dayGridMonth,timeGridWeek,timeGridDay',
    center: 'title',
    right: 'prev,today,next',
  },
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  buttonText: {
    today: '今日',
    month: '月',
    week: '週',
    day: '日',
    list: 'list',
  },
  dayCellContent: function (e: DayCellContentArg) {
    e.dayNumberText = e.dayNumberText.replace('日', '')
  },
  // themeSystem: 'bootstrap',
  selectable: true,
  // editable: true,
  businessHours: {
    daysOfWeek: [1, 2, 3, 4, 5],
    startTime: '0:00',
    endTime: '24:00',
  },
  // contentHeight: 'auto',
}

export const defaultScheduleColor = '#3788d8'

export const scheduleColors = [
  {
    value: defaultScheduleColor,
    label: 'Default',
  },
  {
    value: '#d50101',
    label: 'Red',
  },
  {
    value: '#f6bf25',
    label: 'Yellow',
  },
  {
    value: '#098043',
    label: 'Green',
  },
  {
    value: '#7986cb',
    label: 'Purple',
  },
  {
    value: '#616161',
    label: 'Grey',
  },
]
