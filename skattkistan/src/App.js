import Header from "./pages/Header";
import Produkter from "./pages/Produkter";
import OmOss from "./pages/Om-oss";
import KontaktaOss from "./pages/Kontakta-oss";
import Hem from "./pages/Hem";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './pages/style/App.css';

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
        </Routes>

      </header>
    </div>
    </Router>
  );
}

export default App;
