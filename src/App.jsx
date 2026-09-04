import React, { useEffect, useState, useCallback } from "react";
import AnimatedBackground from "./components/AnimatedBackground";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import TestimonialsSection from "./components/TestimonialsSection";
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
  stats,
} from "./data/data";

export default function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });
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
    if (window.location.hash) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

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
      if (formData.website) {
        setFormStatus("");
        return;
      }
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

  return (
    <>
      <AnimatedBackground />
      <CommandPalette />

      <>
          <Navigation
            scrollY={scrollY}
            theme={theme}
            onThemeToggle={() => setTheme((current) => current === "dark" ? "light" : "dark")}
          />
          <main className="pt-0">
            <HeroSection techIcons={techIcons} stats={stats} />
            <AboutSection languages={languages} />
            <ExperienceSection journey={journey} />
            <SkillsSection
              skills={skills}
              certifications={certifications}
            />
            <ProjectsSection projects={projects} openModal={openModal} />
            <TestimonialsSection testimonials={testimonials} />
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
    </>
  );
}
