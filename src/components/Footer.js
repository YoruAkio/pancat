import { FaGithub, FaTwitter } from "react-icons/fa";
import { FiMail, FiHeart, FiCode, FiCoffee } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative overflow-hidden border-t border-[#e5e2da]">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#d8b4fe] rounded-full opacity-5 blur-3xl -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#c4b5fd] rounded-full opacity-5 blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-8 pt-16 pb-8 md:px-16 lg:px-24">
        {/* Footer Content */}
        <div className="flex flex-col md:flex-row gap-10 mb-16">
          {/* Left column */}
          <div className="flex-1">
            <div className="mb-4 flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#a78bfa] to-[#8b5cf6] text-transparent bg-clip-text mr-2">pancat</span>
              <HiOutlineSparkles className="text-[#8b5cf6]" />
            </div>
            <p className="text-sm text-[#5a5a5a] mb-6 max-w-sm">
              Building playful digital experiences with clean code and creative design.
              Open-source projects crafted with attention to detail.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#5a5a5a]">
              <FiCoffee className="text-[#8b5cf6]" />
              <span>Coded with care by YoruAkio</span>
            </div>
          </div>
          
          {/* Right column */}
          <div className="flex flex-col sm:flex-row gap-10 md:gap-16">
            {/* Links column */}
            <div>
              <h4 className="text-sm font-semibold mb-4">Links</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/#projects" className="text-[#5a5a5a] hover:text-[#8b5cf6] transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="text-[#5a5a5a] hover:text-[#8b5cf6] transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Connect column */}
            <div>
              <h4 className="text-sm font-semibold mb-4">Connect</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="https://github.com/pancatdev" 
                     className="text-[#5a5a5a] hover:text-[#8b5cf6] flex items-center gap-2 transition-colors"
                     target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                    pancatdev
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/yoruakio" 
                     className="text-[#5a5a5a] hover:text-[#8b5cf6] flex items-center gap-2 transition-colors"
                     target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                    @yoruakio
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@akio.lol" 
                     className="text-[#5a5a5a] hover:text-[#8b5cf6] flex items-center gap-2 transition-colors">
                    <FiMail />
                    hello@akio.lol
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#e5e2da] flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-[#5a5a5a] mb-4 sm:mb-0">
            © {currentYear} YoruAkio • Made with <FiHeart className="inline text-[#8b5cf6] mx-1" /> and <FiCode className="inline mx-1" />
          </p>
          <div className="flex items-center">
            <a 
              href="https://github.com/pancatdev/pancat" 
              className="text-xs text-[#5a5a5a] hover:text-[#8b5cf6] transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
            >
              View source
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}