import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Footer from './sections/Footer.jsx';
import Navbar from './sections/Navbar.jsx';
import Contact from './sections/Contact.jsx';
import Clients from './sections/Clients.jsx';
import Projects from './sections/Projects.jsx';
import WorkExperience from './sections/Experience.jsx';
import Services from './pages/Services.jsx'; // ✅ Page sifatida
import ITServices from "./pages/ITServices"; // ⬅️ Yangi sahifa
import Marketing from './pages/MarketingServices.jsx';
import Investments from "./pages/Investments";
import AIServices from "./pages/AI.jsx";



const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Asosiy sahifa */}
        <Route
          path="/"
          element={
            <main className="max-w-7xl mx-auto relative">
              <Hero />
              <About />
              <Projects />
              <Clients />
              <WorkExperience />
              <Contact />
            </main>
          }
        />

        {/* Services sahifasi */}
        <Route path="/services" element={<Services />} />
        <Route path="/services/it" element={<ITServices />} />  {/* ⬅️ shu */}
        <Route path="/services/marketing" element={<Marketing />} />
        <Route path="/services/investments" element={<Investments />} />
        <Route path="/services/ai" element={<AIServices />} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
