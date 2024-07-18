import CallToAction from "@/components/CallToAction";
import Landing from "../components/Landing";
import Proposal from "../components/Proposal";
import Services from "../components/Services";
import Testimonies from "../components/Testimonies";
import Plans from "@/components/Plans";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <Landing />
      <Services />
      <Proposal />
      <CallToAction />
      <Testimonies />
      <Plans />
      <Contact />
      <CallToAction />
    </div>
  );
}