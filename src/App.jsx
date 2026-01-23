import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { useUserData } from './context/UserDataContext'
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
  const { uid } = useUserData();

  return (
    <>
      <Navbar />

      {uid && <Sidebar />}

      {/* ✅ Always let router render pages */}
      <Outlet />
    </>
  );
}

export default App;
