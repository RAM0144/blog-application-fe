import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

const Header = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.account.authenticated)

  const handleLogout = () => {
    dispatch({ type: "account_logout" })
    localStorage.removeItem("authToken")
    navigate("/login")
  }

  return (
    <nav className="navbar navbar-expand-lg px-4" style={{ backgroundColor: "#4B0082" }}>
      <Link className="navbar-brand text-white fw-bold fs-4" to="/"> BlogApp</Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto d-flex align-items-center gap-3">
          <li className="nav-item">
            <Link to="/blogForm" className="nav-link text-white"> Create Blog</Link>
          </li>
           {!isAuthenticated && <Link to="/login"  className="nav-link text-white">Login</Link>}
           {isAuthenticated &&(
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button> 
            </li>
           )}
        </ul>
      </div>
    </nav>
  )
}

export default Header
