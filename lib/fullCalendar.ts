import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { DayCellContentArg } from '@fullcalendar/common'
import { Info } from '@material-ui/icons'

export const calendarConfig = {
  locale: 'ja',
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  contentHeight: 'auto',
  headerToolbar: {
    // left: 'dayGridMonth,timeGridWeek,timeGridDay',
    left: '',
    center: 'title',
    right: 'prev,today,next',
  },
  // dayGridMonth or timeGridWeek or timeGridDay
  initialView: 'dayGridMonth',
  buttonText: {
    today: '今日',
    month: '月',
    week: '週',
    day: '日',
    list: 'list',
  },
  // イベント形式（ドット表示: 'list-item', ブロック表示: 'block', デフォルト: 'list-item'）
  eventDisplay: 'block',
  // 1日あたりのイベント行数
  dayMaxEventRows: 3,
  // イベントの時間表示: H:ii
  // eventTimeFormat: {
  //   hour: 'numeric',
  //   minute: '2-digit',
  //   omitZeroMinute: false,
  //   meridiem: false,
  // },

  // 月表示の日付を'n日'→'n'に変更
  dayCellContent: function (e: DayCellContentArg) {
    e.dayNumberText = e.dayNumberText.replace('日', '')
  },
  selectable: true,
  businessHours: {
    daysOfWeek: [1, 2, 3, 4, 5],
    startTime: '10:00',
    endTime: '19:00',
  },
  // views: {
  //   timeGridWeek: {
  //     allDaySlot: false,
  //     slotDuration: '0:30',
  //     weekends: true,
  //     slotLabelFormat: {
  //       hour: 'numeric',
  //       minute: '2-digit',
  //       omitZeroMinute: false,
  //       meridiem: false,
  //     },
  //     // 週表示のタイトル
  //     titleFormat: function (date: any) {
  //       const year = date.start.year
  //       const startMonth = date.start.month + 1
  //       const endMonth = date.end.month + 1
  //       if (startMonth === endMonth) {
  //         return year + '年' + startMonth + '月'
  //       } else {
  //         return year + '年' + startMonth + '月～' + endMonth + '月'
  //       }
  //     },
  //     // 週表示の日付
  //     dayHeaderFormat: (date: any) => {
  //       const day = date.date.day
  //       const weekNum = date.date.marker.getDay()
  //       const week = ['(日)', '(月)', '(火)', '(水)', '(木)', '(金)', '(土)'][
  //         weekNum
  //       ]
  //       return day + ' ' + week
  //     },
  //   },
  // },
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
