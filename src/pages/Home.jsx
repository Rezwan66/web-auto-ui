const Home = () => {
  return (
    <>
      <div className="flex flex-col">
        {/* Hero section - full width */}
        <div className="w-full">
          <div
            className="hero h-[50vh] object-cover"
            style={{
              backgroundImage:
                'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)',
            }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                <p className="mb-5">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <button className="btn btn-primary">Get Started</button>
              </div>
            </div>
          </div>
        </div>
        {/* Other content - contained */}
        <div className="container mx-auto mt-8 px-4">
          <h2 className="text-3xl font-bold mb-6 text-slate-300">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Add featured products or other content here */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Product 1</h3>
                <p>Description of product 1</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Product 2</h3>
                <p>Description of product 2</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Product 3</h3>
                <p>Description of product 3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
