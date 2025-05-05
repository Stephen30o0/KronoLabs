import React from 'react';
interface ExperienceSectionProps {
  scrollPosition: number;
}
export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  scrollPosition
}) => {
  return <section className="relative py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-6xl md:text-8xl font-black uppercase mb-4 leading-none tracking-tighter">
            The <span className="text-[#A259FF]">Experience</span>
          </h2>
          <div className="w-24 h-2 bg-[#A259FF]"></div>
        </div>
        <div className="mb-12 text-center">
          <h3 className="text-4xl font-bold uppercase">
            A New Kind of Social + Creative Experience
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Comic strip panels */}
          <div className="bg-white text-black border-4 border-black p-6 transform hover:translate-y-[-10px] transition-transform duration-300">
            <div className="text-6xl font-bold mb-4">01</div>
            <h4 className="text-2xl font-bold mb-2">READ</h4>
            <p>
              Discover new comics and animations from creators around the world.
            </p>
            <div className="mt-4 w-full h-4 bg-[#A259FF]"></div>
          </div>
          <div className="bg-[#A259FF] border-4 border-black p-6 transform hover:translate-y-[-10px] transition-transform duration-300">
            <div className="text-6xl font-bold mb-4">02</div>
            <h4 className="text-2xl font-bold mb-2">REACT</h4>
            <p>
              Engage with creators through comments, shares, and direct
              feedback.
            </p>
            <div className="mt-4 w-full h-4 bg-black"></div>
          </div>
          <div className="bg-white text-black border-4 border-black p-6 transform hover:translate-y-[-10px] transition-transform duration-300">
            <div className="text-6xl font-bold mb-4">03</div>
            <h4 className="text-2xl font-bold mb-2">FUND</h4>
            <p>
              Support stories you love with tokens and help creators bring them
              to life.
            </p>
            <div className="mt-4 w-full h-4 bg-[#A259FF]"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-[url('/use.png')] bg-cover border-4 border-[#A259FF] h-[400px] flex items-end">
            <div className="bg-black p-6 w-full border-t-4 border-[#A259FF]">
              <h4 className="text-2xl font-bold text-[#A259FF]">
                Interactive Feed
              </h4>
              <p>
                Discover new art and comics with our dynamic recommendation
                system.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-[#A259FF] border-4 border-black p-6">
              <h4 className="text-2xl font-bold">Swipe-based Reading</h4>
              <p>
                Intuitive navigation designed for digital comics and animation.
              </p>
            </div>
            <div className="bg-white text-black border-4 border-black p-6">
              <h4 className="text-2xl font-bold">Voting System</h4>
              <p>
                Use your tokens to vote on which stories get developed next.
              </p>
            </div>
            <div className="bg-[#A259FF] border-4 border-black p-6">
              <h4 className="text-2xl font-bold">Artist Profiles</h4>
              <p>Follow your favorite creators and track their latest work.</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
