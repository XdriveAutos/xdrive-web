import PageHero from '@/components/Landing/PageHero';

const Terms = () => {
  return (
    <div className="min-h-[60vh]">
      <PageHero title="Terms of Service" />
      <div className="container mx-auto px-4 py-16">
        <div className="prose prose-lg text-gray-600 max-w-4xl mx-auto">
          <p>
            Welcome to XDRIVE. These Terms of Service govern your use of our
            website and services. By accessing or using our services, you agree
            to be bound by these terms.
          </p>
          <h3>1. Acceptance of Terms</h3>
          <p>
            By using our services, you confirm that you are at least 18 years
            old and legally capable of entering into binding contracts.
          </p>
          <h3>2. Use of Services</h3>
          <p>
            You agree to use our platform only for lawful purposes and in
            accordance with these Terms. You are prohibited from violating any
            applicable laws or regulations.
          </p>
          {/* Add more sections as needed */}
        </div>
      </div>
    </div>
  );
};

export default Terms;
