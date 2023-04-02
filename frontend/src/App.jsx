import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import BootcampProvider from "./context";

function App() {
  return (
    <div>
      <Hero />
      <BootcampProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </BootcampProvider>
      <Footer />
    </div>
  );
}

export default App;
