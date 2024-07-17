import Landing from "../components/Landing";
import Proposal from "../components/Proposal";
import Services from "../components/Services";
import Testimonies from "../components/Testimonies";

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <Landing />
      <Services />
      <Proposal />
      <Testimonies />
    </div>
  );
}