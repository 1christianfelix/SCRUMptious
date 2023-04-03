import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import StickyNote from "./components/StickyNote";
import React, {useEffect, useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import StickyBoardCreateForm from './components/StickyBoardCreateForm';


function App() {

  const[users, setUsers] = useState([])
  const getUserData = async () => {
  const userUrl = 'http://localhost:8000/user/';
  const userResponse = await fetch(userUrl);
  if (userResponse.ok) {
    const data = await userResponse.json();
    console.log(data)
    setUsers(data.users)
  }
}
useEffect(() => {getUserData()}, []);


  return (
    <div className="flex font-Sudo_Var">
      {/* The sidebar takes up x amount of the space */}
      <Sidebar>
        <Routes>
          <Route path="stickyboard">
            <Route path="new" element={<StickyBoardCreateForm users={users} />} />
          </Route>
        </Routes>
      </Sidebar>
      {/* The dashboard represents everything else to the right of the sidebar */}
      <Dashboard>

      </Dashboard>
    </div>
  );
}

export default App;
