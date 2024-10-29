import logo from './logo.svg';
import './App.css';
import NavBar from "./NavBar";
import CrimeMap from "./CrimeMap";
import CrimeListView from "./CrimeListView";

function App() {
  return (
    <div className="container-fluid">
      <NavBar />
      <CrimeMap />
    </div>
  );
}

export default App;

