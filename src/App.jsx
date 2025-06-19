import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import Home from './pages/Home';
import LoginWorkflow from './pages/LoginWorkflow';
import FormFilling from './pages/FormFilling';
import ShoppingCheckout from './pages/ShoppingCheckout';
import ResponsiveValidation from './pages/ResponsiveValidation';
import EdgeCaseTesting from './pages/EdgeCaseTesting';
import NavBar from './components/NavBar';
import InstructionForm from './components/InstructionForm';
import { fillAndSubmitForm } from './utils/TestJSAutomation';
import ProductsPage from './pages/ProductsPage';
// Create a layout component that uses the router context
function AppLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <nav>
        <NavBar />
      </nav>
      <div
        className={
          isHomePage ? 'min-h-screen' : 'container mx-auto min-h-screen'
        }
        style={{ padding: isHomePage ? 0 : '1rem' }}
      >
        <InstructionForm />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginWorkflow />} />
          <Route path="/form" element={<FormFilling />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/checkout" element={<ShoppingCheckout />} />
          <Route path="/responsive" element={<ResponsiveValidation />} />
          <Route path="/edge" element={<EdgeCaseTesting />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
