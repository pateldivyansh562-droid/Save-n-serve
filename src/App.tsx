import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { RegistrationPage } from './pages/RegistrationPage';
import { LoginPage } from './pages/LoginPage';
import { FoodPostingPage } from './pages/FoodPostingPage';
import { NGOMatcherPage } from './pages/NGOMatcherPage';
import { DashboardPage } from './pages/DashboardPage';
import { ContactPage } from './pages/ContactPage';
import { Toaster } from './components/ui/sonner';
import { User, FoodPosting } from './types';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentFoodPosting, setCurrentFoodPosting] = useState<FoodPosting | null>(null);

  const handleRegister = (newUser: { type: 'college' | 'ngo'; name: string; email: string }) => {
    setUser({
      id: Date.now().toString(),
      ...newUser,
    });
  };

  const handleLogin = (loggedInUser: { type: 'college' | 'ngo'; name: string; email: string }) => {
    setUser({
      id: Date.now().toString(),
      ...loggedInUser,
    });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentFoodPosting(null);
  };

  const handleFoodSubmit = (posting: Omit<FoodPosting, 'id' | 'timestamp'>) => {
    const newPosting: FoodPosting = {
      ...posting,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setCurrentFoodPosting(newPosting);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navigation user={user} onLogout={handleLogout} />
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <Navigate to={user.type === 'college' ? '/post-food' : '/dashboard'} />
                ) : (
                  <RegistrationPage onRegister={handleRegister} />
                )
              }
            />
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to={user.type === 'college' ? '/post-food' : '/dashboard'} />
                ) : (
                  <LoginPage onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/post-food"
              element={
                user && user.type === 'college' ? (
                  <FoodPostingPage user={user} onSubmit={handleFoodSubmit} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/matcher"
              element={
                user && user.type === 'college' ? (
                  <NGOMatcherPage foodPosting={currentFoodPosting} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/dashboard"
              element={user ? <DashboardPage user={user} /> : <Navigate to="/" />}
            />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </BrowserRouter>
  );
}
