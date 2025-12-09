import Header from '@/components/Landing/Header';
import Hero from '@/components/Landing/Hero';
import Features from '@/components/Landing/Features';
import Stats from '@/components/Landing/Stats';
import FAQ from '@/components/Landing/FAQ';
import Footer from '@/components/Landing/Footer';
import CallToAction from '@/components/Landing/CallToAction';
import FounderStory from '@/components/Landing/FounderStory';
import ScrollToTopButton from '@/components/Landing/ScrollToTopButton';

const Home = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Header />
      <Hero />
      <Features />
      <Stats />
      <FounderStory />
      <FAQ />
      <CallToAction />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Home;
