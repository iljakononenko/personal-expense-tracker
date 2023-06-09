import Header from "./components/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import {observer} from "mobx-react-lite";

const App = observer(() => {
  return (
    <BrowserRouter>
        <div className="App h-100">
            <Header />
            <Home />
        </div>
    </BrowserRouter>
  );
})

export default App;
