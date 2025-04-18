import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Produkter from "./pages/Produkter";
import OmOss from "./pages/Om-oss";
import KontaktaOss from "./pages/Kontakta-oss";
import Hem from "./pages/Hem";
import Varukorg from "./pages/Varukorg";
import Favoriter from "./pages/Favoriter";
import Kassa from "./pages/Kassa";
import Bekraftelse from "./pages/bekraftelse"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
    <Header/>

      <Routes>
      <Route path="/" element={<Hem />} />
            <Route path="/produkter" element={<Produkter />} />
            <Route path="/om-oss" element={<OmOss />} />
            <Route path="/kontakta-oss" element={<KontaktaOss />} />
            <Route path="/varukorg" element={<Varukorg />} />
            <Route path="/favoriter" element={<Favoriter />} />
            <Route path="/kassa" element={<Kassa />} />
            <Route path="/bekraftelse" element={<Bekraftelse />} />
        </Routes>
        <Footer />
      </header>


    </div>
    </Router>
  );
}

export default App;
