import { useEffect, useState } from 'react';
import ProductQuickView from '../components/ProductQuickView';
import { useLocation } from 'react-router-dom';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation(); // Get current location

  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const selectedColor = queryParams.get('color');
  const selectedSize = queryParams.get('size');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await fetch('./products.json');
        const res = await data.json();
        setProducts(res);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);
  if (loading) return <div>Loading products...</div>;
  return (
    <>
      <div className="bg-white rounded-4xl">
        {/* Display selected options */}
        {selectedColor || selectedSize ? (
          <div className="mx-auto max-w-2xl px-4 pt-6 sm:px-6">
            <div className="flex gap-4">
              {selectedColor && (
                <div className="text-sm">
                  Selected color:{' '}
                  <span className="font-medium">{selectedColor}</span>
                </div>
              )}
              {selectedSize && (
                <div className="text-sm">
                  Selected size:{' '}
                  <span className="font-medium">{selectedSize}</span>
                </div>
              )}
            </div>
          </div>
        ) : null}
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map(product => (
              <ProductQuickView key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductsPage;
