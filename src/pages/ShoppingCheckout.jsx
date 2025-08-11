import { useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useBearStore } from '../hooks/Zustand';
import { Link } from 'react-router-dom';

// const products = [
//   {
//     id: 1,
//     name: 'Throwback Hip Bag',
//     href: '#',
//     color: 'Salmon',
//     price: '$90.00',
//     quantity: 1,
//     imageSrc:
//       'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
//     imageAlt:
//       'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
//   },
//   {
//     id: 2,
//     name: 'Medium Stuff Satchel',
//     href: '#',
//     color: 'Blue',
//     price: '$32.00',
//     quantity: 5,
//     imageSrc:
//       'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
//     imageAlt:
//       'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
//   },
// ];

export default function ShoppingCheckout() {
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  // Get products and actions from Zustand
  const products = useBearStore(state => state.products);
  const removeProduct = useBearStore(state => state.removeProduct);
  const clearProducts = useBearStore(state => state.clearProducts);

  // Group products by id and count quantity
  const groupedProducts = Object.values(
    products.reduce((acc, product) => {
      if (acc[product.id]) {
        acc[product.id].quantity += 1;
      } else {
        acc[product.id] = { ...product, quantity: 1 };
      }
      return acc;
    }, {})
  );

  // Calculate subtotal from products array
  const subtotal = groupedProducts?.reduce(
    (sum, product) =>
      sum + parseFloat(product.price.replace('$', '')) * product.quantity,
    0
  );

  const shipping = products.length ? 5.99 : 0.0;
  const tax = products.length ? 8.54 : 0.0;
  const total = subtotal + shipping + tax - discount;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'SAVE10') {
      setDiscount(10);
    } else {
      setDiscount(0);
      toast.error('Invalid coupon code');
    }
  };

  const handleCheckout = () => {
    Swal.fire({
      icon: 'success',
      title: 'Checkout Complete!',
      text: 'Thank you for your purchase.',
      confirmButtonText: 'OK',
    }).then(() => {
      clearProducts();
      setCoupon('');
      setDiscount(0);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-200">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Product List */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Your Items</h2>

          {products.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              No products in cart.
            </div>
          ) : (
            <>
              <ul className="divide-y divide-gray-200">
                {groupedProducts.map(product => (
                  <li key={product.id} className="py-6 flex">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={product.href}>{product.name}</a>
                          </h3>
                          <p className="ml-4">{product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.color}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {product.quantity}</p>
                        <button
                          type="button"
                          className="font-medium text-red-600 hover:text-red-500 cursor-pointer"
                          onClick={() => removeProduct(product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                onClick={clearProducts}
              >
                Clear All
              </button>
            </>
          )}
        </div>

        {/* Right Column - Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Order Summary
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <dt className="text-gray-600">Subtotal</dt>
              <dd className="font-medium text-gray-900">
                ${subtotal.toFixed(2)}
              </dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-gray-600">Shipping</dt>
              <dd className="font-medium text-gray-900">
                ${shipping.toFixed(2)}
              </dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-gray-600">Tax</dt>
              <dd className="font-medium text-gray-900">${tax.toFixed(2)}</dd>
            </div>

            {discount > 0 && (
              <div className="mt-3 flex justify-between text-green-600">
                <dt>Discount</dt>
                <dd>- ${discount.toFixed(2)}</dd>
              </div>
            )}

            <div className="flex justify-between border-t border-gray-200 pt-4">
              <dt className="text-base font-medium">Total</dt>
              <dd className="text-base font-medium text-gray-900">
                ${total.toFixed(2)}
              </dd>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Promo Code
            </h3>
            <div className="flex space-x-2">
              <input
                type="text"
                name="enterCouponText"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                placeholder="Enter coupon code"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                onClick={applyCoupon}
                id="applyCoupon"
                className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
              >
                Apply
              </button>
            </div>
            {discount > 0 && (
              <div className="mt-3 flex justify-between text-green-600">
                <dt>Discount Applied</dt>
                <dd>${discount.toFixed(2)}</dd>
              </div>
            )}
          </div>

          <div className="mt-8">
            <button
              id="checkoutAndPay"
              className="w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>

          <div className="mt-6 text-center text-sm">
            <Link
              // href="#"
              to="/products"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
