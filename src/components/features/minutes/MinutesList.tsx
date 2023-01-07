import { LoaderIcon } from '~/components/elements/Icon'
import { useMinutesList } from '~/services/minutes'

const MinutesList = () => {
  const { data: minutesList } = useMinutesList()

  return minutesList ? (
    <ul>
      {minutesList &&
        minutesList?.data.map((item) => (
          <li key={`minutes_${item.id}`}>
            <span>{item.title}</span>
          </li>
        ))}
    </ul>
  ) : (
    <LoaderIcon />
  )
}

export default MinutesList
