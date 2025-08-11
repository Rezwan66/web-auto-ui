const OurProductsCard = ({ product, handleAddToCart }) => {
  //   console.log(Object.keys(product));
  const {
    id,
    name,
    href,
    price,
    imageSrc,
    imageAlt,
    rating,
    reviewCount,
    colors,
    sizes,
  } = product || {};

  // Helper to slugify product names
  const slugify = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumerics with hyphens
      .replace(/(^-|-$)/g, ''); // Remove leading/trailing hyphens

  return (
    <>
      <div className="card bg-base-100 shadow-sm max-h-[461px] group">
        <figure>
          <img
            className="h-70 w-full object-cover group-hover:opacity-75"
            src={imageSrc}
            alt={imageAlt}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>Price: {price}</p>
          <p>
            Rating: {rating}{' '}
            <span className="underline text-xs text-blue-500">
              ({reviewCount})
            </span>
          </p>
          <div className="card-actions justify-end">
            <button
              id={`product-${slugify(name)}-${id}-btn`}
              data-product-name={name}
              onClick={() => handleAddToCart(product)}
              className="btn btn-primary"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default OurProductsCard;
