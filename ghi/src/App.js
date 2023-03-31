import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import StickyNote from "./components/StickyNote";

function App() {
  return (
    <div className="flex font-Sudo_Var">
      {/* The sidebar takes up x amount of the space */}
      <Sidebar></Sidebar>
      {/* The dashboard represents everything else to the right of the sidebar */}
      <Dashboard></Dashboard>
    </div>
  );
}

export default App;
