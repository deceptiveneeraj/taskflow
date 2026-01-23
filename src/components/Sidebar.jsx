import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside className="desktop-only">
      <ul>
        <li><NavLink to="/quicklist" className={(e) => { return e.isActive ? "navIsActive" : "" }}>Quick List</NavLink></li>
        <li><NavLink to="/todos" className={(e) => { return e.isActive ? "navIsActive" : "" }}>Todo List</NavLink></li>
      </ul>
    </aside>
  )
}

export default Sidebar
