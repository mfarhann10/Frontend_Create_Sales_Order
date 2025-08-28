import { BrowserRouter, Route, Routes } from "react-router-dom";
import SalesOrderForm from "./pages/SalesOrderForm";
import { Test } from "./pages/Test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SalesOrderForm />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
