import { useEffect, useState } from 'react';
import OurProductsCard from '../components/OurProductsCard';
import toast from 'react-hot-toast';
import { useBearStore } from '../hooks/Zustand';

const OurProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // Adding to cart
  const addProduct = useBearStore(state => state.addProduct);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await fetch('./products.json');
        const res = await data.json();
        console.log(res);
        setProducts(res);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);
  const handleAddToCart = product => {
    addProduct(product);
    toast.success(`Added to cart: ${product?.name}`);
  };
  if (loading)
    return (
      <div className="mt-20 text-3xl text-center text-purple-100">
        Loading products
        <span className="loading loading-dots loading-xs"></span>
      </div>
    );
  return (
    <>
      <div className="bg-white rounded-4xl">
        {/* products panel */}
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map(product => (
              <OurProductsCard
                key={product.id}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default OurProducts;
