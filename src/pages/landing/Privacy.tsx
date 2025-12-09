import PageHero from '@/components/Landing/PageHero';

const Privacy = () => {
  return (
    <div className="min-h-[60vh]">
      <PageHero title="Privacy Policy" />
      <div className="container mx-auto px-4 py-16">
        <div className="prose prose-lg text-gray-600 max-w-4xl mx-auto">
          <p>
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, and protect your personal information when you use
            XDRIVE.
          </p>
          <h3>1. Information We Collect</h3>
          <p>
            We may collect personal information such as your name, email
            address, phone number, and location when you register or use our
            services.
          </p>
          <h3>2. How We Use Your Information</h3>
          <p>
            We use your information to provide and improve our services,
            communicate with you, and ensure the security of our platform.
          </p>
          {/* Add more sections as needed */}
        </div>
      </div>
    </div>
  );
};

export default Privacy;
