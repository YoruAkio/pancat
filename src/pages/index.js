import Image from "next/image";
import { useState, useEffect } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const [activeProject, setActiveProject] = useState(null);
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch("/api/gh/fetch-repo");

        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }

        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error("Error fetching repositories:", error);
        // Fallback to sample projects
        setRepos([
          {
            name: "Akio Portfolio",
            description: "Minimalist portfolio template for developers",
            tags: ["React", "Three.js", "GSAP"],
            image: "/project-previews/akio-preview.png",
            url: "https://github.com/pancatdev/akio-portfolio",
          },
          {
            name: "Terra Chan",
            description: "Interactive chat application with custom animations",
            tags: ["Next.js", "Socket.io", "Framer Motion"],
            image: "/project-previews/terrachan-preview.png",
            url: "https://github.com/pancatdev/terrachan",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRepos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f7f2] to-[#efeee9] text-[#2a2a2a]">
      {/* Decorative elements */}
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-[#d8b4fe] rounded-full opacity-20 blur-3xl"></div>
      <div className="fixed top-1/3 -left-40 w-80 h-80 bg-[#c4b5fd] rounded-full opacity-20 blur-3xl"></div>

      {/* Use the Navbar component */}
      <Navbar />

      {/* Hero Section */}
      <section className="px-8 py-16 md:py-28 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight mb-8 max-w-4xl">
              The art of{" "}
              <span className="font-bold bg-gradient-to-r from-[#a78bfa] to-[#8b5cf6] text-transparent bg-clip-text">
                coding
              </span>{" "}
              meets playful <span className="font-bold">creativity</span>
            </h2>
            <p className="text-base md:text-lg max-w-2xl text-[#5a5a5a] mb-8">
              A collective of curious developers building fun, experimental
              projects. We're all about clean code, creative interfaces, and
              open-source collaboration.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/pancatdev"
                className="inline-flex items-center gap-2 border border-[#2a2a2a] px-5 py-2.5 text-sm tracking-wider hover:bg-[#2a2a2a] hover:text-white rounded-full transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-lg" />
                EXPLORE OUR GITHUB
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#a78bfa] to-[#8b5cf6] text-white px-5 py-2.5 text-sm tracking-wider rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#8b5cf6]/20"
              >
                <HiOutlineExternalLink />
                VIEW PROJECTS
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Section */}
      <section
        id="projects"
        className="px-8 py-16 md:px-16 lg:px-24 border-t border-[#e5e2da]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex justify-between items-end mb-8">
              <h3 className="text-2xl md:text-3xl font-bold">
                Featured Projects
              </h3>
              <a
                href="https://github.com/pancatdev"
                className="text-sm text-[#5a5a5a] hover:text-[#8b5cf6] flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                View all <HiOutlineExternalLink />
              </a>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-[#f0ede5] animate-pulse h-72"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {repos.map((project, index) => {
                  // Pre-determine if we should use a fallback image
                  const fallbackImage = `https://via.placeholder.com/800x400?text=${encodeURIComponent(
                    project.name
                  )}&bg=8b5cf6&fg=ffffff`;
                  const imageSrc =
                    project.image && project.image.startsWith("http")
                      ? project.image
                      : fallbackImage;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      className="rounded-2xl overflow-hidden backdrop-blur-sm bg-white/40 hover:bg-white/60 border border-[#e5e2da] hover:border-[#8b5cf6] transition-all duration-300 shadow-sm hover:shadow-lg group h-full flex flex-col"
                      onMouseEnter={() => setActiveProject(index)}
                      onMouseLeave={() => setActiveProject(null)}
                    >
                      {/* Image Section */}
                      <div className="relative w-full h-44">
                        <div
                          className={`w-full h-full transition-all duration-500 ${
                            activeProject === index ? "scale-105" : "scale-100"
                          }`}
                        >
                          {/* Use next/image for remote images, regular img for fallback */}
                          {imageSrc === fallbackImage ? (
                            <img
                              src={fallbackImage}
                              alt={project.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="relative w-full h-full">
                              <Image
                                src={imageSrc}
                                alt={project.name}
                                fill
                                className="object-cover"
                                onError={() => {
                                  // If image fails to load, use CSS gradient background
                                }}
                                unoptimized={
                                  !project.image.startsWith(
                                    "/project-previews/"
                                  )
                                }
                              />
                            </div>
                          )}
                          {/* Reduced opacity from 30% to 20% and made gradient smaller */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent"></div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-4 flex flex-col flex-grow">
                        <h4 className="text-lg font-bold mb-2 group-hover:text-[#8b5cf6] transition-colors">
                          {project.name}
                        </h4>
                        <p className="text-[#5a5a5a] text-sm mb-3 line-clamp-2 flex-grow">
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.tags &&
                            project.tags.slice(0, 2).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="text-xs px-2 py-0.5 rounded-full bg-[#f0ede5]/80 text-[#5a5a5a] backdrop-blur-sm"
                              >
                                {tag}
                              </span>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#e5e2da]">
                          <a
                            href={project.url}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#a78bfa]/10 to-[#8b5cf6]/10 text-[#8b5cf6] hover:from-[#a78bfa]/20 hover:to-[#8b5cf6]/20 transition-all duration-300 text-xs"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            GitHub <HiOutlineExternalLink className="text-xs" />
                          </a>

                          {project.homepageUrl && (
                            <a
                              href={project.homepageUrl}
                              className="inline-flex items-center gap-1 text-xs text-[#5a5a5a] hover:text-[#8b5cf6]"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Demo <HiOutlineExternalLink className="text-xs" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="px-8 py-20 md:px-16 lg:px-24 border-t border-[#e5e2da] bg-gradient-to-br from-[#f8f7f2] to-[#f0ede5]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="backdrop-blur-md bg-white/40 p-10 rounded-3xl border border-white/60 shadow-xl">
              <h3 className="text-2xl font-bold mb-4">About Pancat</h3>
              <p className="text-base text-[#5a5a5a] mb-4">
                We're a small collective of developers who love to experiment
                and create. Our projects range from useful utilities to creative
                experiments, all with a focus on clean code and delightful user
                experiences.
              </p>
              <p className="text-base text-[#5a5a5a] mb-4">
                Pancat was founded on the belief that coding should be fun and
                accessible. We're passionate about open-source development and
                giving back to the community.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <a
                  href="https://github.com/pancatdev"
                  className="inline-flex items-center gap-2 px-5 py-2 text-sm bg-[#2a2a2a] text-white rounded-full hover:bg-[#000] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub />
                  GitHub
                </a>
                <a
                  href="mailto:hello@pancat.dev"
                  className="inline-flex items-center gap-2 px-5 py-2 text-sm border border-[#2a2a2a] rounded-full hover:bg-[#8b5cf6] hover:border-[#8b5cf6] hover:text-white transition-all"
                >
                  <FiMail />
                  Contact Us
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Use the Footer component */}
      <Footer />
    </div>
  );
}
