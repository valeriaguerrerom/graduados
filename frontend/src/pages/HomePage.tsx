import React from "react";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import FeaturedSections from "../components/home/FeaturedSections";
import Testimonials from "../components/home/Testimonials";
import Section from "../components/ui/Section";

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <Stats />
      <Section
        title="Servicios para Egresados"
        subtitle="Descubre todas las herramientas y recursos exclusivos disponibles para ti como egresado de la Universidad Mariana."
        titleCenter
        className="bg-surface"
      >
        <FeaturedSections />
      </Section>
      <Testimonials />
    </div>
  );
};

export default HomePage;
