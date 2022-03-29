import TopBar from "./app_bar/TopBar";
import NavSwitch from "./pages/NavSwitch";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="app">
      <div className="topBar">
        <TopBar />
      </div>
      <NavSwitch />
    </div>
  );
}

export default App;
