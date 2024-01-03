import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './screen/login';
import Home from './screen/home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* Tuyến đường mặc định */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
