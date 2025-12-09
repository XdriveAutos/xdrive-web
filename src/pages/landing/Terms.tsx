const Terms = () => {
  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-[60vh]">
      <h1 className="text-4xl font-bold text-(--color-primary) mb-8">
        Terms of Service
      </h1>
      <div className="prose prose-lg text-gray-600 max-w-4xl">
        <p>
          Welcome to XDRIVE. These Terms of Service govern your use of our
          website and services. By accessing or using our services, you agree to
          be bound by these terms.
        </p>
        <h3>1. Acceptance of Terms</h3>
        <p>
          By using our services, you confirm that you are at least 18 years old
          and legally capable of entering into binding contracts.
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
  );
};

export default Terms;
