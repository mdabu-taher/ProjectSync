// client/src/App.jsx
import './App.css';
import AssignmentsTable from './components/AssignmentsTable';

function App() {
  return (
    <div className="app-container">
      <h1>ProjectSync Dashboard</h1>
      <AssignmentsTable />
    </div>
  );
}

export default App;
