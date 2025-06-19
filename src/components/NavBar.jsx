import { Link } from 'react-router-dom';
import { useBearStore } from '../hooks/Zustand';
import { FaCartShopping } from 'react-icons/fa6';

const NavBar = () => {
  const productNumber = useBearStore(state => state.bears);
  const handleLogin = () => {
    // Add your login logic here
    console.log('Login button clicked');
  };
  const navItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/form">Form Fill</Link>
      </li>
      <li>
        <Link to="/products">Our Products</Link>
      </li>
      <li>
        <Link to="/checkout">Checkout</Link>
      </li>
      <li>
        <Link to="/responsive">Responsive</Link>
      </li>
      <li>
        <Link to="/edge">Edge Cases</Link>
      </li>
    </>
  );
  return (
    <div className="navbar bg-red-400 opacity-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {' '}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{' '}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl rounded-full">
          Web Automation with LLMs
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        <div className="relative">
          <Link to="/cart">
            <FaCartShopping className="w-8 h-8" />
            <span className="w-4 h-4 rounded-full bg-black absolute -top-3.5 -right-2.5 text-red-400 text-xs text-center">
              {productNumber}
            </span>
          </Link>
        </div>
        <button onClick={handleLogin} className="btn rounded-full ml-10">
          <Link to="/login">Login</Link>
        </button>
      </div>
    </div>
  );
};
export default NavBar;
