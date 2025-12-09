const Privacy = () => {
  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-[60vh]">
      <h1 className="text-4xl font-bold text-(--color-primary) mb-8">
        Privacy Policy
      </h1>
      <div className="prose prose-lg text-gray-600 max-w-4xl">
        <p>
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your personal information when you use
          XDRIVE.
        </p>
        <h3>1. Information We Collect</h3>
        <p>
          We may collect personal information such as your name, email address,
          phone number, and location when you register or use our services.
        </p>
        <h3>2. How We Use Your Information</h3>
        <p>
          We use your information to provide and improve our services,
          communicate with you, and ensure the security of our platform.
        </p>
        {/* Add more sections as needed */}
      </div>
    </div>
  );
};

export default Privacy;
