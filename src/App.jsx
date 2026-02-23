import React, { useEffect, useState } from "react";
import AnimatedBackground from "./components/AnimatedBackground";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ProjectModal from "./components/ProjectModal";
import {
  projects,
  skills,
  certifications,
  languages,
  techIcons,
} from "./data/data";

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [formStatus, setFormStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Animate skill bars on scroll
    const handleSkillBars = () => {
      const bars = document.querySelectorAll(".skill-bar");
      bars.forEach((bar) => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          const width = bar.getAttribute("data-width") || "0%";
          bar.style.width = width;
        }
      });
    };

    window.addEventListener("scroll", handleSkillBars);
    handleSkillBars();
    return () => window.removeEventListener("scroll", handleSkillBars);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "auto";
  }, [modalOpen]);

  function openModal(id) {
    setModalData(projects[id]);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    setModalData(null);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");

    try {
      // Using FormData for proper Formspree submission
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("message", formData.message);

      const response = await fetch("https://formspree.io/f/myzlybdj", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
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
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getProficiencyLabel = (level) => {
    if (level >= 90) return "Expert";
    if (level >= 80) return "Advanced";
    if (level >= 70) return "Proficient";
    return "Intermediate";
  };

  return (
    <div>
      <AnimatedBackground />
      <Navigation
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        scrollY={scrollY}
      />
      <main className="pt-20">
        <HeroSection techIcons={techIcons} />
        <AboutSection languages={languages} />
        <SkillsSection
          skills={skills}
          certifications={certifications}
          getProficiencyLabel={getProficiencyLabel}
        />
        <ProjectsSection projects={projects} openModal={openModal} />
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
    </div>
  );
}
