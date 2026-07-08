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
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Eligibility from "./pages/Eligibility";
import NotEligible from "./pages/NotEligible";
import NeedMoreInfo from "./pages/NeedMoreInfo";
import FleetCategory from "./pages/FleetCategory";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  const location = useLocation();

  const hidefooter = [
    "/login",
    "/signup"
  ].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-gray bg-brand-dark selection:bg-brand-blue selection:text-white">
      <Header />

      <main className="flex-grow pt-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/how-it-works" element={<Home />} />
          <Route path="/fleet" element={<Fleet />} />
                    <Route path="/eligibility" element={<Eligibility />} />
          <Route
            path="/eligibility/not-eligible"
            element={<NotEligible />}
          />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/eligibility/more-info"
            element={<NeedMoreInfo />}
          />
          {/* Customer Routes */}
          <Route path="/request" element={<RequestForm />} />

          {/* <Route path="/fleet/:id" element={<FleetCategory />} /> */}

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
      <Router>
        <ScrollToTop />
          <Layout />
      </Router>
  );
}
