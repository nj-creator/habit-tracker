import { React, useState } from "react";
import Habit from "./Habit"
import Modify from "./Modify";
import Dashboard from "./dashboard";
import { useLocation, Navigate, Link } from "react-router-dom";
export default function Home() {
  const location = useLocation()
  const data = location.state
  const [habit, habitHandle] = useState(false)
  const [modify, modiHandle] = useState(false)
  const [dashboard,dashHandle]= useState(true)
  const habitAddHandle = () => {
    habitHandle(true)
    dashHandle(false)
    modiHandle(false)
  }
  const modifyHabitHandle = () => {
    habitHandle(false)
    dashHandle(false)
    modiHandle(true)
  }
  const handleDashboard=()=>{
    dashHandle(true)
    habitHandle(false)
    modiHandle(false)
  }
  if (!data) {
    return <Navigate to='/login_signup' />
  }
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ width: '100vw', height: '100vh' }}>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <span className="navbar-brand">Habit Tracker</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
            <span><i className="las la-running"></i></span>
          </button>
          <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <button className="nav-link" onClick={handleDashboard}>Dashboard</button>
                </li>
                <li className="nav-item">
                  <button className='nav-link' onClick={habitAddHandle}>Add Habit</button>
                </li>
                <li className="nav-item">
                  <button className='nav-link' onClick={modifyHabitHandle}>Modify Habit</button>
                </li>
                <hr />
                <li className="nav-item">
                  <Link to='/login_signup' className="text-decoration-none text-light">Logout ({data.user.name})</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {
        dashboard ?
        <Dashboard data={data}/>
        :null
      }
      {habit ?
          <Habit data={data}/>
        : null}
        {modify ?
          <Modify data={data}/>
        :null}
    </div>
  )
}