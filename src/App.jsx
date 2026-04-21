import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import NavBar from "./components/NavBar";
import AuthProvider from "./context/AuthContext";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return ( 
    <AuthProvider>
      <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/auth" element={<Auth />}/>
        <Route path="/checkout" element={<Checkout />}/>
        <Route path="/products/:id" element={<ProductDetail />}/>

      </Routes>
    </div>
    </AuthProvider>
   );
}

export default App;