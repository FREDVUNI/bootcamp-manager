import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import BootcampProvider from "./context";

function App() {
  return (
    <div>
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
