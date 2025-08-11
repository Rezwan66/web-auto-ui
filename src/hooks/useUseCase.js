import { useLocation } from 'react-router-dom';

const useUseCase = () => {
  const { pathname } = useLocation();

  const getUseCase = () => {
    const path = pathname.toLowerCase();

    // Define your path-to-useCase mappings
    const useCaseMap = {
      '/form': 'Form Filling',
      '/products': 'Add to Cart',
      '/dashboard': 'Data Analysis',
      '/settings': 'Configuration',
      '/checkout': 'Checkout',
      '/responsive': 'Responsive Validation',
      '/edge': 'Edge Case Testing',
      // Add more mappings as needed
    };

    // Find the first matching path
    const matchedPath = Object.keys(useCaseMap).find(key => path.includes(key));

    // Return the matched use case or a default
    return matchedPath ? useCaseMap[matchedPath] : 'General Assistance';
  };

  return getUseCase();
};

export default useUseCase;
