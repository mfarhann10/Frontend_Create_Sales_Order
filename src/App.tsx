import { BrowserRouter, Route, Routes } from "react-router-dom";
import SalesOrderForm from "./pages/SalesOrderForm";
import { ResultOrder } from "./pages/ResultOrder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SalesOrderForm />} />
        <Route path="/result" element={<ResultOrder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
