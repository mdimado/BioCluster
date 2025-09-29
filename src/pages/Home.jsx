import Hero from "@/components/Hero";
import About from "../components/About";
import Mentors from "../components/Mentors";
import ProbStatements from "../components/ProbStatements"; 
import PrepSection from "../preptemberComponents/PrepSection";
import Timeline from "../components/timeline";
import Faq from "../components/Faq";
import Contact from "../components/Contact";

const Home = () => {
  return (
    <>
      <div
      className="min-h-screen w-full"
      style={{
        background:
          "linear-gradient(135deg, #1D0B3D 0%, #191A39 50%, #24254C 100%)",
      }}
      >
        <Hero />
        <About />
        <PrepSection />
        <Mentors />
        <Faq />
        <Contact />
      </div>
    </>
  );
};

export default Home;