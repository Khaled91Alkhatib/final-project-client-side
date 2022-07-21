import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavList from './components/NavList';
import MensCollection from './components/MensCollection';
import WomensCollection from './components/WomensCollection';

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavList />
        <Routes>
          <Route
            path="/MensCollection" element={
              <MensCollection />
            }
          />
          <Route
            path="/WomensCollection" element={
              <WomensCollection />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
