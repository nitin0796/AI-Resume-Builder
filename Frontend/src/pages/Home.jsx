import Banner from "../components/home/Banner";
import CallToAction from "../components/home/CallToAction";
import Feacture from "../components/home/Feacture";
import Footer from "../components/home/Footer";
import Hero from "../components/home/Hero";
import Testimonial from "../components/home/Testimonial";

const Home = () => {
  return (
    <div>
      <Banner />
      <Hero />
      <Feacture />
      <Testimonial />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
