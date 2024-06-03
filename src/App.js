import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { RestaurantPage } from "./Routes.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RestaurantPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
