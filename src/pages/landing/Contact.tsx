const Contact = () => {
  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-[60vh]">
      <h1 className="text-4xl font-bold text-(--color-primary) mb-8">
        Contact Us
      </h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Address</h3>
            <p className="text-gray-600 leading-relaxed">
              NO 39, KOFO ABAYOMI STREET
              <br />
              APPAPA, LAGOS STATE
              <br />
              NIGERIA
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600">
              <a
                href="tel:08133639975"
                className="hover:text-(--color-primary) transition-colors"
              >
                08133639975
              </a>
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">
              <a
                href="mailto:support@xdrive.com"
                className="hover:text-(--color-primary) transition-colors"
              >
                support@xdrive.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
