import {} from "antd"

import Header from "./components/Header";
import PageContent from "./components/PageContent";
import Footer from "./components/Footer";
import './App.css';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <PageContent/>
      <Footer/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
