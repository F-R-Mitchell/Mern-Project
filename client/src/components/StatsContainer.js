import StatsItem from './StatsItem'
import { useAppContext } from '../context/appContext'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'

const StatsContainer = () => {
  const { stats } = useAppContext()
  const defaultStats = [
    {
      title: 'pending applications',
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'interviews scheduled',
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'declined offers',
      count: stats.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ]
  return (
    <Wrapper>
        {defaultStats.map((stat, index) => {
            return <StatsItem key={index} {...stat} />
        })}
    </Wrapper>
  )
}
export default StatsContainer