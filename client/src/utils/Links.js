import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats, MdMiscellaneousServices } from 'react-icons/md'
import { FaWpforms, FaNewspaper } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
const links = [
  {
    id: 1,
    text: 'stats',
    path: '/',
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: 'all jobs',
    path: '/all-jobs',
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: 'add job',
    path: '/add-job',
    icon: <FaWpforms />,
  },
  {
    id: 4,
    text: 'news',
    path: '/news',
    icon: <FaNewspaper />,
  },
  {
    id: 5,
    text: 'profile',
    path: '/profile',
    icon: <ImProfile />,
  },
  {
    id: 6,
    text: 'misc',
    path: '/misc',
    icon: <MdMiscellaneousServices />,
  },
]
export default links
