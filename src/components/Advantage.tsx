import React from 'react';
import { ComicPanel } from './ComicPanel';
interface AdvantageProps {
  scrollPosition: number;
}
export const Advantage: React.FC<AdvantageProps> = ({
  scrollPosition
}) => {
  return <section className="relative py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-6xl md:text-8xl font-black uppercase mb-4 leading-none tracking-tighter">
            Competitive <span className="text-[#A259FF]">Advantage</span>
          </h2>
          <div className="w-24 h-2 bg-[#A259FF]"></div>
        </div>
        <div className="mb-12 text-center">
          <h3 className="text-4xl font-bold uppercase">
            What Makes KronoLabs Different
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <ComicPanel scrollPosition={scrollPosition} delay={100} className="mb-8 transform rotate-1">
              <h4 className="text-2xl font-bold mb-2">
                Social-first for comics & art
              </h4>
              <p>
                Built specifically for visual storytellers, not adapted from
                existing platforms.
              </p>
            </ComicPanel>
            <ComicPanel scrollPosition={scrollPosition} delay={300} className="mb-8 transform -rotate-1">
              <h4 className="text-2xl font-bold mb-2">
                Blockchain-native from day one
              </h4>
              <p>
                Not an afterthought—our entire ecosystem is built on transparent
                creator ownership.
              </p>
            </ComicPanel>
            <ComicPanel scrollPosition={scrollPosition} delay={500} className="transform rotate-2">
              <h4 className="text-2xl font-bold mb-2">
                Focused on underrepresented creators
              </h4>
              <p>
                Prioritizing voices that traditional publishing has overlooked.
              </p>
            </ComicPanel>
          </div>
          <div className="flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-[#A259FF] border-4 border-black p-6 flex flex-col items-center justify-center aspect-square">
                <div className="text-5xl mb-4">🏪</div>
                <h5 className="text-xl font-bold text-center">
                  IP Marketplace
                </h5>
              </div>
              <div className="bg-white text-black border-4 border-black p-6 flex flex-col items-center justify-center aspect-square">
                <div className="text-5xl mb-4">🎓</div>
                <h5 className="text-xl font-bold text-center">
                  Talent Pipeline
                </h5>
              </div>
              <div className="bg-white text-black border-4 border-black p-6 flex flex-col items-center justify-center aspect-square">
                <div className="text-5xl mb-4">📚</div>
                <h5 className="text-xl font-bold text-center">
                  Education Network
                </h5>
              </div>
              <div className="bg-[#A259FF] border-4 border-black p-6 flex flex-col items-center justify-center aspect-square">
                <div className="text-5xl mb-4">🧠</div>
                <h5 className="text-xl font-bold text-center">
                  Studio Resources
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};