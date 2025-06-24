import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from './pages/Home';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Profil from './pages/Profil';
import Favoris from './pages/Favoris';

function PrivateRoute({ isLoggedIn, children }: { isLoggedIn: boolean, children: React.ReactNode }) {
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [welcome, setWelcome] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]); // <-- Ajout favoris global

  useEffect(() => {
    if (isLoggedIn) {
      setWelcome("Bienvenue !");
      setTimeout(() => setWelcome(""), 2500);
      // Récupère les favoris à la connexion
      const token = localStorage.getItem("token");
      if (token) {
        fetch("http://localhost:3000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then(res => res.json())
          .then(data => setFavorites(data.favorites || []));
      }
    } else {
      setFavorites([]);
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
              <Home
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                favorites={favorites}
                setFavorites={setFavorites}
              />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profil" element={<Profil />} />
        <Route
          path="/favoris"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Favoris
                favorites={favorites}
                setFavorites={setFavorites}
              />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
