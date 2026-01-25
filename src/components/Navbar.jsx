import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useUserData } from "../context/UserDataContext";
import logo from '../../public/logo.png';
import { getAuth, signOut } from "firebase/auth";
import { app } from "../Firebase";

const Navbar = () => {
  const { uid, profile } = useUserData();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const auth = getAuth(app);

  function handleLogout(e) {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        // alert("Logged out!");
        closeBoth();
      })
      .catch((error) => {
        alert(error.message);
        closeBoth();
      });
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setMenuOpen(false); // Close menu when opening sidebar
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setSidebarOpen(false); // Close sidebar when opening menu
  };

  const closeBoth = () => {
    setMenuOpen(false);
    setSidebarOpen(false);
  };

  return (
    <>
      <nav>
        <ul>
          {uid && <li className="mobile-icon" onClick={toggleSidebar}>
            <i className="fa fa-navicon"></i>
          </li>}

          <li className="logo-item">
            <NavLink to="/" className={({ isActive }) => isActive ? "navIsActive" : ""}>
              <img src={logo} alt="📝 TaskFlow" />
            </NavLink>
          </li>

          {uid && <li className="mobile-icon" onClick={toggleMenu}>
            <i className="fa fa-sliders"></i>
          </li>}

          <li className="desktop-only"><NavLink to="/">Home</NavLink></li>
          <li className="desktop-only"><NavLink to="/profile">Profile</NavLink></li>
          <li className="desktop-only"><NavLink to="/about">About</NavLink></li>
          {uid && <li className="desktop-only"><a href="#" className="logout" onClick={handleLogout}>Logout</a></li>}
        </ul>
      </nav>

      {/* Mobile Menu (Right Side) */}
      <div className="nav-mobile mobile-icon" style={{ display: menuOpen ? "block" : "none" }}>
        {uid && <li className="mobile-icon"><span>Hello {profile?.name || "User"}</span></li>}
        <li className="mobile-icon" onClick={closeBoth}><NavLink to="/">Home</NavLink></li>
        <li className="mobile-icon" onClick={closeBoth}><NavLink to="/profile">Profile</NavLink></li>
        <li className="mobile-icon" onClick={closeBoth}><NavLink to="/about">About</NavLink></li>
        {uid && <li className="mobile-icon"><a href="#" className="logout" onClick={handleLogout}>Logout</a></li>}
      </div>

      {/* Sidebar (Left Side) */}
      <div className="sidebar mobile-icon" style={{ display: sidebarOpen ? "block" : "none" }}>
        <li onClick={closeBoth}>
          <NavLink to="/quicklist" className={(e) => { return e.isActive ? "navIsActive" : "" }}>Quick List</NavLink>
        </li>
        <li onClick={closeBoth}>
          <NavLink to="/todos" className={(e) => { return e.isActive ? "navIsActive" : "" }}>Todo List</NavLink></li>
      </div>
    </>
  );
};

export default Navbar;