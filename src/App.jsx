import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import LoginWorkflow from './pages/LoginWorkflow';
import FormFilling from './pages/FormFilling';
import ShoppingCheckout from './pages/ShoppingCheckout';
import ResponsiveValidation from './pages/ResponsiveValidation';
import EdgeCaseTesting from './pages/EdgeCaseTesting';
import NavBar from './components/NavBar';
function App() {
  return (
    <Router>
      <div
        className="container mx-auto min-h-screen"
        style={{ padding: '1rem' }}
      >
        {/* <h1>Web Automation with LLMs</h1> */}
        <nav>
          {/* <Link to="/">Home</Link> | <Link to="/login">Login</Link> |{' '}
          <Link to="/form">Form Fill</Link> |{' '}
          <Link to="/checkout">Checkout</Link> |{' '}
          <Link to="/responsive">Responsive</Link> |{' '}
          <Link to="/edge">Edge Cases</Link> */}
          <NavBar />
        </nav>
        <div className="divider divider-info"></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginWorkflow />} />
          <Route path="/form" element={<FormFilling />} />
          <Route path="/checkout" element={<ShoppingCheckout />} />
          <Route path="/responsive" element={<ResponsiveValidation />} />
          <Route path="/edge" element={<EdgeCaseTesting />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
