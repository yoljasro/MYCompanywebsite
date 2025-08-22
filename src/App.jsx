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
      </Routes>
              <Footer />
    </Router>
  );
};

export default App;
