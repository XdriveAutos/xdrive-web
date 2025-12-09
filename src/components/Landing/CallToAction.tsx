import AppStoreImg from '@/assets/store/app-store.png';
import PlayStoreImg from '@/assets/store/play-store.png';

const CallToAction = () => {
  return (
    <section id="download" className="py-20 bg-blue-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#0A2647] mb-8">
          Get the APP Now
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href="#"
            className="transition-transform hover:scale-105 active:scale-95 shadow-lg rounded-xl overflow-hidden"
          >
            <img
              src={PlayStoreImg}
              alt="Get it on Google Play"
              className="h-16 w-auto"
            />
          </a>
          <a
            href="#"
            className="transition-transform hover:scale-105 active:scale-95 shadow-lg rounded-xl overflow-hidden"
          >
            <img
              src={AppStoreImg}
              alt="Download on the App Store"
              className="h-16 w-auto"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
