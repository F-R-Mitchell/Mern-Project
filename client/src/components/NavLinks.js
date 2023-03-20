import { NavLink } from 'react-router-dom'
import Links from '../utils/Links'

const NavLinks = ({ toggleSidebar }) => {
  return (
    <div className="nav-links">
      {Links.map((Link) => {
        const { text, path, id, icon } = Link
        return (
          <NavLink
            key={id}
            to={path}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            onClick={toggleSidebar}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        )
      })}
    </div>
  )
}
export default NavLinks
