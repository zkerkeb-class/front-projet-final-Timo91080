import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Home from './pages/Home';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Profil from './pages/Profil';
import Favoris from './pages/Favoris';
import Loader from './components/Loader';
import NotificationContainer from './components/NotificationContainer';
import './i18n';
import './styles/themes.css';
import './styles/animations.css';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, loading } = useAuth();
  
  if (loading) {
    return <Loader text="Chargement..." />;
  }
  
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div style={{ minHeight: '100vh' }}>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Home />
                    <Footer />
                  </>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/profil"
                element={
                  <PrivateRoute>
                    <Profil />
                  </PrivateRoute>
                }
              />
              <Route
                path="/favoris"
                element={
                  <PrivateRoute>
                    <Favoris />
                  </PrivateRoute>
                }
              />
            </Routes>
            
            <NotificationContainer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
