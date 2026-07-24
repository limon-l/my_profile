import React, { useEffect, useState, useCallback } from "react";
import AnimatedBackground from "./components/AnimatedBackground";
import CustomCursor from "./components/CustomCursor";
import LoadingScreen from "./components/LoadingScreen";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import PhilosophySection from "./components/PhilosophySection";
import DeveloperTerminal from "./components/DeveloperTerminal";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ProjectModal from "./components/ProjectModal";
import CommandPalette from "./components/CommandPalette";
import {
  projects,
  skills,
  certifications,
  languages,
  techIcons,
  testimonials,
  journey,
  philosophy,
  stats,
} from "./data/data";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [formStatus, setFormStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    budget: "",
    projectType: "",
    timeline: "",
    message: "",
    website: "",
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  const openModal = useCallback((id) => {
    setModalData(projects[id]);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setTimeout(() => setModalData(null), 400);
  }, []);

  const handleFormChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setFormStatus("sending");

      try {
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("message", formData.message);
        formDataToSend.append("company", formData.company);
        formDataToSend.append("country", formData.country);
        formDataToSend.append("budget", formData.budget);
        formDataToSend.append("projectType", formData.projectType);
        formDataToSend.append("timeline", formData.timeline);

        if (formData.website) {
          return;
        }

        const response = await fetch("https://formspree.io/f/myzlybdj", {
          method: "POST",
          body: formDataToSend,
        });

        if (response.ok) {
          setFormStatus("success");
          setFormData({
            name: "",
            email: "",
            company: "",
            country: "",
            budget: "",
            projectType: "",
            timeline: "",
            message: "",
            website: "",
          });
          setTimeout(() => setFormStatus(""), 5000);
        } else {
          setFormStatus("error");
          setTimeout(() => setFormStatus(""), 5000);
        }
      } catch (err) {
        console.error("Form submission error:", err);
        setFormStatus("error");
        setTimeout(() => setFormStatus(""), 5000);
      }
    },
    [formData]
  );

  const getProficiencyLabel = useCallback((level) => {
    if (level >= 90) return "Expert";
    if (level >= 80) return "Advanced";
    if (level >= 70) return "Proficient";
    return "Intermediate";
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <LoadingScreen onComplete={handleLoadingComplete} />
      <CustomCursor />
      <AnimatedBackground />
      <CommandPalette />

      {!loading && (
        <>
          <Navigation scrollY={scrollY} />
          <main className="pt-0">
            <HeroSection techIcons={techIcons} stats={stats} />
            <AboutSection languages={languages} journey={journey} />
            <SkillsSection
              skills={skills}
              certifications={certifications}
              getProficiencyLabel={getProficiencyLabel}
            />
            <ProjectsSection projects={projects} openModal={openModal} />
            <TestimonialsSection testimonials={testimonials} />
            <PhilosophySection philosophy={philosophy} />
            <DeveloperTerminal />
            <ContactSection
              formData={formData}
              formStatus={formStatus}
              handleFormChange={handleFormChange}
              handleFormSubmit={handleFormSubmit}
            />
            <Footer />
          </main>
          <ProjectModal
            modalOpen={modalOpen}
            modalData={modalData}
            closeModal={closeModal}
          />
        </>
      )}
    </>
  );
}
