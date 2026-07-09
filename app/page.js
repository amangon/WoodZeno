import Choose from "./Components/Choose";
import Design from "./Components/Design";
import Footer from "./Components/Footer";
import NewsletterSection from "./Components/Newsletter";
import Poster from "./Components/Poster";
import Products from "./Components/Products";
import Testimonial from "./Components/Testimonial";

export default function Home() {
  return (
  <>
    <Poster />
    <Products />
    <Choose />
    <Design />
    <Testimonial />
    <NewsletterSection />
    <Footer />
  </>
  );
}
