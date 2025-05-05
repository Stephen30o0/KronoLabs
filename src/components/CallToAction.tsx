import React, { useState } from 'react';
import { InfinityLogo } from './InfinityLogo';
interface CallToActionProps {
  scrollPosition: number;
}
export const CallToAction: React.FC<CallToActionProps> = ({
  scrollPosition
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [logoHover, setLogoHover] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      // In a real app, you would send this to your backend
    }
  };
  return <section className="relative py-20 bg-[#A259FF]">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-6xl md:text-8xl font-black uppercase mb-4 leading-none tracking-tighter text-black">
            Draw the Future <span className="text-white">With Us</span>
          </h2>
        </div>
        <div className="max-w-3xl mx-auto bg-black border-4 border-white p-8 mb-16">
          {!submitted ? <form onSubmit={handleSubmit}>
              <h3 className="text-3xl font-bold mb-6 text-center">
                Join the Waitlist
              </h3>
              <div className="flex flex-col md:flex-row gap-4">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" className="flex-grow px-4 py-3 bg-white text-black border-4 border-black focus:outline-none" required />
                <button type="submit" className="bg-[#A259FF] px-8 py-3 font-bold uppercase border-4 border-black hover:bg-white hover:text-black transition-colors duration-300">
                  Sign Up
                </button>
              </div>
            </form> : <div className="text-center py-8">
              <h3 className="text-3xl font-bold mb-4">Thanks for joining!</h3>
              <p className="text-xl">We'll keep you updated on our launch.</p>
            </div>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <button className="bg-black text-white px-6 py-4 text-xl font-bold uppercase border-4 border-white hover:bg-white hover:text-black transition-colors duration-300">
            Support a Story
          </button>
          <button className="bg-white text-black px-6 py-4 text-xl font-bold uppercase border-4 border-black hover:bg-black hover:text-white transition-colors duration-300">
            Become a Partner
          </button>
          <button className="bg-black text-white px-6 py-4 text-xl font-bold uppercase border-4 border-white hover:bg-white hover:text-black transition-colors duration-300">
            Explore the Feed
          </button>
          <button className="bg-white text-black px-6 py-4 text-xl font-bold uppercase border-4 border-black hover:bg-black hover:text-white transition-colors duration-300">
            Contact Us
          </button>
        </div>
        <div className="flex justify-center">
          <div className="cursor-pointer" onMouseEnter={() => setLogoHover(true)} onMouseLeave={() => setLogoHover(false)}>
            <InfinityLogo size={120} onHover={logoHover} color="black" />
          </div>
        </div>
        <div className="text-center mt-8 text-black">
          <p className="text-lg">&copy; 2025 KronoLabs. All rights reserved.</p>
        </div>
      </div>
    </section>;
};