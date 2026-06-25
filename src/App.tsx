import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import RequestForm from './pages/RequestForm';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Fleet from './pages/Fleet';
import AuthPage from './pages/AuthPage';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role?: 'admin' | 'customer' }) => {
  const { user, role: userRole, loading } = useAuth();
  
  if (loading) return <div className="h-screen bg-brand-dark flex items-center justify-center text-white"><div className="label-caps animate-pulse">Synchronizing...</div></div>;
  
  if (!user) return <Navigate to="/login" />;
  
  if (role && userRole !== role) return <Navigate to="/" />;
  
  return <>{children}</>;
};
function Layout() {
  const location = useLocation();

  const hidefooter = [
    "/login",
    "/signup"
  ].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-gray bg-brand-dark selection:bg-brand-blue selection:text-white">
      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/how-it-works" element={<Home />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/signup" element={<AuthPage mode="signup" />} />

          {/* Customer Routes */}
          <Route path="/request" element={<RequestForm />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/privacy"
            element={
              <div className="pt-32 pb-24 max-w-4xl mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8 text-white">
                  Privacy Policy
                </h1>
              </div>
            }
          />

          <Route
            path="/terms"
            element={
              <div className="pt-32 pb-24 max-w-4xl mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8 text-white">
                  Terms & Conditions
                </h1>
              </div>
            }
          />
        </Routes>
      </main>

      {!hidefooter && <Footer />}
    </div>
  );
}
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
          <Layout />
      </Router>
    </AuthProvider>
  );
}
