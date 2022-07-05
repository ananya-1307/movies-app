import './App.css';
import NavBar from './Components/NavBar';
import Banner from './Components/Banner';
import Movies from './Components/Movies'
import Favourite from './Components/Favourite';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
function App() {

  return (



    <Router>
      <NavBar />
      <Routes>
        <Route path="/" index element={<Layout />} />
        <Route path="/Favourites" element={<Favourite />} />
      </Routes>

    </Router>
  );
}

export default App;
