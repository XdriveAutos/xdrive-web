const Partners = () => {
  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-[60vh]">
      <h1 className="text-4xl font-bold text-(--color-primary) mb-8">
        Our Partners
      </h1>
      <p className="text-gray-600 leading-relaxed max-w-3xl mb-8">
        We collaborate with industry leaders to bring you the best automotive
        services. Together, we drive innovation and excellence.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Placeholder for partners grid */}
        <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
          Partner 1
        </div>
        <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
          Partner 2
        </div>
        <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
          Partner 3
        </div>
        <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
          Partner 4
        </div>
      </div>
    </div>
  );
};

export default Partners;
