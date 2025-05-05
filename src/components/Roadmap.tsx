import React from 'react';
import { ComicPanel } from './ComicPanel';
interface RoadmapProps {
  scrollPosition: number;
}
export const Roadmap: React.FC<RoadmapProps> = ({
  scrollPosition
}) => {
  return <section id="roadmap" className="relative py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-6xl md:text-8xl font-black uppercase mb-4 leading-none tracking-tighter">
            Road<span className="text-[#A259FF]">map</span>
          </h2>
          <div className="w-24 h-2 bg-[#A259FF]"></div>
        </div>
        <div className="mb-12 text-center">
          <h3 className="text-4xl font-bold uppercase">
            Milestones to a Creative Revolution
          </h3>
        </div>
        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-2 bg-[#A259FF] h-full"></div>
          {/* Q2 2025 */}
          <div className="relative mb-24">
            <div className="flex justify-center mb-8">
              <div className="bg-[#A259FF] text-black text-2xl font-bold py-2 px-6 border-4 border-black">
                Q2 2025
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:text-right">
                <ComicPanel scrollPosition={scrollPosition} delay={100} className="transform rotate-1">
                  <h4 className="text-2xl font-bold mb-2">MVP Launch</h4>
                  <p>Initial platform release with core features</p>
                </ComicPanel>
              </div>
              <div>
                <ComicPanel scrollPosition={scrollPosition} delay={200} className="transform -rotate-1">
                  <h4 className="text-2xl font-bold mb-2">
                    Creator Onboarding
                  </h4>
                  <p>First 100 artists and writers join the platform</p>
                </ComicPanel>
              </div>
            </div>
          </div>
          {/* Q3 2025 */}
          <div className="relative mb-24">
            <div className="flex justify-center mb-8">
              <div className="bg-[#A259FF] text-black text-2xl font-bold py-2 px-6 border-4 border-black">
                Q3 2025
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:text-right">
                <ComicPanel scrollPosition={scrollPosition} delay={300} className="transform -rotate-2">
                  <h4 className="text-2xl font-bold mb-2">TownSquare Beta</h4>
                  <p>Community voting system goes live</p>
                </ComicPanel>
              </div>
              <div>
                <ComicPanel scrollPosition={scrollPosition} delay={400} className="transform rotate-2">
                  <h4 className="text-2xl font-bold mb-2">Token Wallet Beta</h4>
                  <p>Digital wallet integration for creators and readers</p>
                </ComicPanel>
              </div>
            </div>
          </div>
          {/* Q4 2025 */}
          <div className="relative mb-24">
            <div className="flex justify-center mb-8">
              <div className="bg-[#A259FF] text-black text-2xl font-bold py-2 px-6 border-4 border-black">
                Q4 2025
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:text-right">
                <ComicPanel scrollPosition={scrollPosition} delay={500} className="transform rotate-1">
                  <h4 className="text-2xl font-bold mb-2">Library Program</h4>
                  <p>First 10 digital libraries launched in Africa</p>
                </ComicPanel>
              </div>
              <div>
                <ComicPanel scrollPosition={scrollPosition} delay={600} className="transform -rotate-1">
                  <h4 className="text-2xl font-bold mb-2">NFT Stories</h4>
                  <p>First collection of NFT comics and digital art</p>
                </ComicPanel>
              </div>
            </div>
          </div>
          {/* 2026 */}
          <div className="relative">
            <div className="flex justify-center mb-8">
              <div className="bg-[#A259FF] text-black text-2xl font-bold py-2 px-6 border-4 border-black">
                2026
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:text-right">
                <ComicPanel scrollPosition={scrollPosition} delay={700} className="transform -rotate-2">
                  <h4 className="text-2xl font-bold mb-2">100k+ Users</h4>
                  <p>Platform growth milestone</p>
                </ComicPanel>
              </div>
              <div>
                <ComicPanel scrollPosition={scrollPosition} delay={800} className="transform rotate-2">
                  <h4 className="text-2xl font-bold mb-2">
                    IP Licensing Launch
                  </h4>
                  <p>Marketplace for story rights and adaptations</p>
                </ComicPanel>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Diagonal divider */}
      <div className="w-full h-24 bg-[#A259FF] transform -skew-y-3 mt-20"></div>
    </section>;
};