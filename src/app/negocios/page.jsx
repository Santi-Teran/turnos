"use client";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { getUsers } from "../api/api";

const NegociosPage = () => {
  const [business, setBusiness] = useState([]);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const response = await getUsers();
        const info = response.data;
        setBusiness(info);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBusiness();
  }, []);

  console.log(business);
  return (
    <div>
      <NavBar />
      <div className="flex flex-col gap-20 pt-32 pb-10">
        a
        <CallToAction />
      </div>
      <Footer />
    </div>
  );
};

export default NegociosPage;
