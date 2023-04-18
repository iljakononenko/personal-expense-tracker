import Header from "./components/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
        <div className="App h-100">
            <Header />
            <Routes>
                <Route path="/" element={<Home />}></Route>
            </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
