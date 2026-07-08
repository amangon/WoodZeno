import Choose from "../Components/Choose";
import Design from "../Components/Design";
import Footer from "../Components/Footer";
import NewsletterSection from "../Components/Newsletter";

export default function AboutPage() {
  return (
    <>
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-6">
            About <span className="text-rose-500">WoodZeno</span>
          </h1>
          <p className="text-center text-gray-600 max-w-3xl mx-auto">
            Thoughtfully crafted furniture and interior solutions designed to
            elevate modern living spaces with comfort, durability, and style.
          </p>
        </div>
      </div>

      <Choose />
      <Design />
      <NewsletterSection />
      <Footer />
    </>
  );
}

