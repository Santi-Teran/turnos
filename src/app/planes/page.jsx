import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import Plans from '@/components/Plans';

const PlansPage = () => {
  return (
    <div>
      <NavBar />
      <div className='flex flex-col gap-20 pt-32 pb-10'>
        <Plans />
        <CallToAction />
      </div>
      <Footer />
    </div>
  )
}

export default PlansPage;