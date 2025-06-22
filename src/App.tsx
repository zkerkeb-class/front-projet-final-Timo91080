import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from './pages/Home';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Profil from './pages/Profil';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [welcome, setWelcome] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      setWelcome("Bienvenue !");
      setTimeout(() => setWelcome(""), 2500);
    }
  }, [isLoggedIn]);

  return (
    <Router>
      {welcome && (
        <div style={{
          background: "#ffd600",
          color: "#101549",
          textAlign: "center",
          padding: "1rem",
          fontWeight: "bold",
          fontSize: "1.2rem"
        }}>
          {welcome}
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </Router>
  );
}

export default App;
