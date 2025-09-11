import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Footer from './sections/Footer.jsx';
import Navbar from './sections/Navbar.jsx';
import Projects from './sections/Projects.jsx';
import WorkExperience from './sections/Experience.jsx';
import Services from './pages/Services.jsx';
import ITServices from "./pages/ITServices";
import Marketing from './pages/MarketingServices.jsx';
// import Investments from "./pages/Investments";
import AIServices from "./pages/AI.jsx";
import Contact from "./pages/contact.jsx";
import RatesWidget from "./sections/RatesWidget.jsx"
import OurServices from "./pages/OurServices.jsx"
import ITProjects from "./pages/ITProjects.jsx";
import TelegramBots from "./pages/TelegramBots.jsx";
import MobileApps from "./pages/MobileApps.jsx";
import AIProjectFaceID from "./sections/Ai.jsx";
import InternalProjects from "./pages/InternalProjects.jsx";
import CrispChat from "./components/CrispChat.jsx";
import Mystic from "./pages/Mystic.jsx";
import CryptoBank from "./pages/crypto.jsx";
import TravelCand from "./pages/travelcand.jsx";


const App = () => {
  return (
    <Router>
      <Navbar />

      {/* Crisp butun sayt bo‘ylab ishlashi uchun shu yerda */}
      <CrispChat />

      <Routes>
        {/* Asosiy sahifa */}
        <Route
          path="/"
          element={
            <main className="max-w-7xl mx-auto relative">
              <Hero />
              <About />
              <Projects />
              <WorkExperience />
             <RatesWidget
  baseFiat="USD"
  fiats={["EUR","RUB"]}
  cryptos={["bitcoin","ethereum","tether","solana"]}
  vs={["usd","eur","rub"]}
  refreshSec={45}
/>
            </main>
          }
        />

        {/* Services sahifalari */}
        <Route path="/services" element={<Services />} />
        <Route path="/services/it" element={<ITServices />} />
        <Route path="/services/marketing" element={<Marketing />} />
        {/* <Route path="/services/investments" element={<Investments />} /> */}
        <Route path="/services/ai" element={<AIServices />} />
        <Route path="/ourservices" element={<OurServices />} />
        <Route path="/itprojects" element={<ITProjects />} />
        <Route path="/telegrambots" element={<TelegramBots />} />
        <Route path="/ai" element={<AIProjectFaceID />} />
        <Route path="/mobile" element={<MobileApps />} />
        <Route path="/mystic" element={<Mystic />} />
        <Route path="/fintech" element={<CryptoBank />} />
        <Route path="/travelcand" element={<TravelCand />} />
        <Route path="/internal" element={<InternalProjects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
