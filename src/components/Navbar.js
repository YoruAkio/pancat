import { useState, useEffect, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { FiCode, FiBox, FiInfo } from "react-icons/fi";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Refs for GSAP animations
  const navbarRef = useRef(null);
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const brandRef = useRef(null);
  const dividerRef = useRef(null);
  const linksRef = useRef(null);
  const projectsTextRef = useRef(null);
  const aboutTextRef = useRef(null);
  const githubTextRef = useRef(null);
  
  // Store the previous scrolled state
  const prevScrolledRef = useRef(isScrolled);
  
  // Handle scroll events to determine when to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Detect which section is in view
      const sections = ["projects", "about"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          } else if (window.scrollY < 100) {
            setActiveSection("home");
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Initial animation
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(
      navbarRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );
    
    return () => {
      tl.kill();
    };
  }, []);
  
  // Handle animations based on scroll state
  useEffect(() => {
    if (prevScrolledRef.current === isScrolled) return;
    
    // Create GSAP timeline for coordinated animations
    const tl = gsap.timeline({
      defaults: { duration: 0.5, ease: "power2.inOut" }
    });
    
    if (isScrolled) {
      // Animation to compact state
      tl.to(navbarRef.current, { 
        left: "6px", 
        top: "6px",
        width: "auto", 
        duration: 0.4 
      }, 0);
      
      tl.to(containerRef.current, { 
        borderRadius: "9999px", 
        padding: "0.5rem 1.25rem",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)"
      }, 0);
      
      tl.to(logoRef.current, { 
        width: "26px", 
        height: "26px" 
      }, 0);
      
      tl.to(brandRef.current, { 
        fontSize: "0.875rem" 
      }, 0);
      
      // Hide text labels
      tl.to([projectsTextRef.current, aboutTextRef.current, githubTextRef.current], { 
        opacity: 0,
        width: 0,
        marginLeft: 0,
        duration: 0.3
      }, 0);
      
      // Show divider
      tl.fromTo(
        dividerRef.current,
        { opacity: 0, height: 0 },
        { opacity: 1, height: "1rem", duration: 0.3, delay: 0.15 },
        0
      );
      
    } else {
      // Animation to expanded state
      tl.to(navbarRef.current, { 
        left: "0px", 
        top: "0px",
        width: "100%", 
        duration: 0.4 
      }, 0);
      
      tl.to(containerRef.current, { 
        borderRadius: "0px", 
        padding: "1rem 2rem",
        backgroundColor: "rgba(248, 247, 242, 0.95)",
        boxShadow: "none" 
      }, 0);
      
      tl.to(logoRef.current, { 
        width: "32px", 
        height: "32px" 
      }, 0);
      
      tl.to(brandRef.current, { 
        fontSize: "1.125rem" 
      }, 0);
      
      // Show text labels
      tl.to([projectsTextRef.current, aboutTextRef.current, githubTextRef.current], { 
        opacity: 1,
        width: "auto",
        marginLeft: "0.25rem",
        duration: 0.3,
        delay: 0.1
      }, 0);
      
      // Hide divider
      tl.to(dividerRef.current, { 
        opacity: 0, 
        height: 0, 
        duration: 0.2 
      }, 0);
    }
    
    prevScrolledRef.current = isScrolled;
    
    return () => {
      tl.kill();
    };
  }, [isScrolled]);
  
  return (
    <>
      {/* Main Navbar - transforms based on scroll position */}
      <div 
        ref={navbarRef}
        className="fixed z-50 transition-property-[left,top,width] duration-500 ease-in-out"
        style={{ left: "0px", top: "0px", width: "100%" }}
      >
        <div 
          ref={containerRef}
          className="backdrop-blur-md border border-b border-[#e5e2da] bg-[#f8f7f2]/95 px-8 py-4"
        >
          <div className="flex items-center gap-4">
            {/* Logo Group */}
            <div className="flex items-center gap-2">
              {/* Logo Icon */}
              <div 
                ref={logoRef}
                className="bg-gradient-to-r from-[#a78bfa] to-[#8b5cf6] text-white rounded-full flex items-center justify-center cursor-pointer"
                style={{ width: "32px", height: "32px" }}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <FiCode size={16} className="transition-transform duration-300 hover:scale-110 active:scale-95" />
              </div>
              
              {/* Brand Name */}
              <span 
                ref={brandRef}
                className="font-bold bg-gradient-to-r from-[#a78bfa] to-[#8b5cf6] text-transparent bg-clip-text"
                style={{ fontSize: "1.125rem" }}
              >
                pancat
              </span>
            </div>
            
            {/* Divider - Initially hidden */}
            <div 
              ref={dividerRef}
              className="w-px bg-[#e5e2da]"
              style={{ height: "0px", opacity: 0 }}
            ></div>
            
            {/* Navigation Links - Desktop */}
            <div 
              ref={linksRef}
              className="hidden md:flex items-center gap-5"
            >
              <a 
                href="#projects"
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  activeSection === "projects" 
                    ? "text-[#8b5cf6]" 
                    : "text-[#2a2a2a] hover:text-[#8b5cf6]"
                }`}
              >
                <FiBox size={16} className="transition-transform duration-300 hover:scale-110 active:scale-95" />
                <span
                  ref={projectsTextRef}
                  className="transition-opacity"
                  style={{ marginLeft: "0.25rem" }}
                >
                  Projects
                </span>
              </a>
              
              <a 
                href="#about"
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  activeSection === "about" 
                    ? "text-[#8b5cf6]" 
                    : "text-[#2a2a2a] hover:text-[#8b5cf6]"
                }`}
              >
                <FiInfo size={16} className="transition-transform duration-300 hover:scale-110 active:scale-95" />
                <span
                  ref={aboutTextRef}
                  className="transition-opacity"
                  style={{ marginLeft: "0.25rem" }}
                >
                  About
                </span>
              </a>
              
              <a 
                href="https://github.com/pancatdev"
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-[#2a2a2a] hover:text-[#8b5cf6] transition-colors"
              >
                <FaGithub size={16} className="transition-transform duration-300 hover:scale-110 active:scale-95" />
                <span
                  ref={githubTextRef}
                  className="transition-opacity"
                  style={{ marginLeft: "0.25rem" }}
                >
                  GitHub
                </span>
              </a>
            </div>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-[#2a2a2a] ml-auto transition-transform duration-300 active:scale-90"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="12" x2="20" y2="12"></line>
                  <line x1="4" y1="6" x2="20" y2="6"></line>
                  <line x1="4" y1="18" x2="20" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu - Keep using AnimatePresence for this */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md pt-24 px-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-6">
              <a 
                href="#projects"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 py-3 text-lg ${
                  activeSection === "projects" ? "text-[#8b5cf6]" : "text-[#2a2a2a]"
                }`}
              >
                <FiBox size={20} />
                Projects
              </a>
              <a 
                href="#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 py-3 text-lg ${
                  activeSection === "about" ? "text-[#8b5cf6]" : "text-[#2a2a2a]"
                }`}
              >
                <FiInfo size={20} />
                About
              </a>
              <a 
                href="https://github.com/pancatdev"
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 py-3 text-lg text-[#2a2a2a]"
              >
                <FaGithub size={20} />
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}