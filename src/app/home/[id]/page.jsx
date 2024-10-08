'use client';
import { useEffect, useState } from 'react';
import Footer from "@/components/Footer";
import About from "@/components/landing negocio/About";
import Contact from "@/components/landing negocio/Contact";
import Landing from "@/components/landing negocio/Landing";
import NavBar from "@/components/landing negocio/NavBar";
import { getConfigurationInfo, getServices } from '@/app/api/api';
import Services from '@/components/landing negocio/Services';
import Loading from '@/components/Loading';

const HomePage = ({ params }) => {
  const [config, setConfig] = useState(null);
  const [services, setServices] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id;
    if (id) {
      fetchBusinessInfo(id);
    } else {
      setLoading(false);
    }
  }, []);
  const fetchBusinessInfo = async (id) => {
    try {
      
      const config = await getConfigurationInfo(id);
      const services = await getServices(id);
      if (config.success) {
        setConfig(config.data);
        setServices(services.data);
      } else {
        console.error('Error fetching business config:', config.message);
      }
    } catch (error) {
      console.error('Error fetching business config:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-20 home">
      <NavBar config={config} />
      <Landing config={config} />
      <Services services={services} config={config} />
      <About config={config} />
      <Contact config={config} />
      <Footer />
    </div>
  );
};

export default HomePage;