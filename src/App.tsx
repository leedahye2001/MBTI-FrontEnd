import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./index";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
