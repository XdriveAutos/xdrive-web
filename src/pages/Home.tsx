import Hero from '@/components/Landing/Hero';
import Features from '@/components/Landing/Features';
import Stats from '@/components/Landing/Stats';
import FAQ from '@/components/Landing/FAQ';
import CallToAction from '@/components/Landing/CallToAction';
import FounderStory from '@/components/Landing/FounderStory';

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <Stats />
      <FounderStory />
      <FAQ />
      <CallToAction />
    </>
  );
};

export default Home;
