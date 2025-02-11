import Header from "./Header";
import Produkter from "./Produkter";
import OmOss from "./Om-oss";
import KontaktaOss from "./Kontakta-oss";
import Hem from "./Hem";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

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
