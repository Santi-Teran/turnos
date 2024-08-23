import CallToAction from "@/components/CallToAction";
import Landing from "../components/Landing";
import Proposal from "../components/Proposal";
import Services from "../components/Services";
import Testimonies from "../components/Testimonies";
import Plans from "@/components/Plans";
import Contact from "@/components/Contact";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col gap-32">
      <NavBar />
      <Landing />
      <Services />
      <Proposal />
      <CallToAction />
      {/* <Testimonies /> */}
      <Plans />
      <Contact />
      <CallToAction />
      <Footer />
    </div>
  );
}