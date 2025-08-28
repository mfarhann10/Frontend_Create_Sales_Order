import { BrowserRouter, Route, Routes } from "react-router-dom";
import SalesOrderForm from "./pages/SalesOrderForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SalesOrderForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
