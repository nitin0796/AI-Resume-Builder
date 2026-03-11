import Banner from "../components/home/Banner";
import CallToAction from "../components/home/CallToAction";
import Feature from "../components/home/Feature";
import Footer from "../components/home/Footer";
import Hero from "../components/home/Hero";
import Testimonial from "../components/home/Testimonial";

const Home = () => {
  return (
    <div>
      <Banner />
      <Hero />
      <Feature />
      <Testimonial />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
