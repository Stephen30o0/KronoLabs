import React, { useEffect, useState } from 'react';
import { InfinityLogo } from './InfinityLogo';
import { Logo } from './Logo';
export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoHover, setLogoHover] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2 bg-black border-b-2 border-[#A259FF]' : 'py-4 bg-transparent'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onMouseEnter={() => setLogoHover(true)} onMouseLeave={() => setLogoHover(false)}>
            <Logo size={60} color={logoHover ? '#FFFFFF' : '#A259FF'} className="transition-colors duration-300" />
            <span className="ml-2 text-2xl font-bold tracking-tighter uppercase">
              KronoLabs
            </span>
          </div>
          <div className="hidden md:flex space-x-6">
            {['Why', 'Features', 'Creators', 'Roadmap', 'Team'].map(item => <a key={item} href={`#${item.toLowerCase()}`} className="uppercase font-bold hover:text-[#A259FF] transition-colors duration-300 border-b-2 border-transparent hover:border-[#A259FF]">
                {item}
              </a>)}
          </div>
          <button className="hidden md:block bg-[#A259FF] px-6 py-2 font-bold uppercase border-2 border-[#A259FF] hover:bg-black hover:text-[#A259FF] transition-colors duration-300">
            Join Waitlist
          </button>
          <button className="md:hidden text-3xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>
      {isMenuOpen && <div className="fixed inset-0 bg-black z-40 pt-20 px-4">
          <div className="flex flex-col space-y-6 items-center">
            {['Why', 'Features', 'Creators', 'Roadmap', 'Team'].map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-2xl uppercase font-bold hover:text-[#A259FF]">
                {item}
              </a>)}
            <button className="mt-8 bg-[#A259FF] px-8 py-3 text-xl font-bold uppercase border-2 border-[#A259FF]">
              Join Waitlist
            </button>
          </div>
        </div>}
    </>;
};