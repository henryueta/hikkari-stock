import { Link } from "react-router-dom"
import nav_list from "../../objects/nav"

const NavBar = () => {
  return (
    <nav className="">
      <ul>
        {
          nav_list.map((nav_item,nav_index)=>
            <li key={nav_index}>
              <Link to={nav_item.redirectTo}>
                {nav_item.label}
              </Link>
            </li>
          )
        }
      </ul>
    </nav>
  )
}

export default NavBar
