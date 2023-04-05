import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import BootcampProvider from "./context";

function App() {
  return (
    <div>
      <Router>
        <BootcampProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BootcampProvider>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
