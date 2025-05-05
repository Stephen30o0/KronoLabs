import React, { useState } from 'react';
import { ComicPanel } from './ComicPanel';
interface BuildingSectionProps {
  scrollPosition: number;
}
export const BuildingSection: React.FC<BuildingSectionProps> = ({
  scrollPosition
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [{
    name: 'Creator Feed',
    desc: 'Post your art, comics, and updates.',
    icon: '📱'
  }, {
    name: 'Comic Reader',
    desc: 'Scrollable webcomics with feedback tools.',
    icon: '📚'
  }, {
    name: 'TownSquare',
    desc: 'Pitch your story, get votes, get funded.',
    icon: '🏙️'
  }, {
    name: 'Community Spaces',
    desc: 'Artists, writers, and fans engage and grow together.',
    icon: '👥'
  }, {
    name: 'Token Wallets',
    desc: 'Track earnings and support your favorite creators.',
    icon: '💰'
  }];
  return <section id="features" className="relative py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-6xl md:text-8xl font-black uppercase mb-4 leading-none tracking-tighter">
            What We're <span className="text-[#A259FF]">Building</span>
          </h2>
          <div className="w-24 h-2 bg-[#A259FF]"></div>
        </div>
        <div className="mb-12 text-center">
          <h3 className="text-4xl font-bold uppercase">
            Not Just a Platform.{' '}
            <span className="text-[#A259FF]">A Movement.</span>
          </h3>
        </div>
        {/* Tabs navigation */}
        <div className="flex flex-wrap justify-center mb-12">
          {tabs.map((tab, index) => <button key={index} className={`
                px-6 py-3 mx-2 mb-4 text-lg font-bold uppercase border-4 
                transition-colors duration-300
                ${activeTab === index ? 'bg-[#A259FF] border-black text-white' : 'bg-transparent border-[#A259FF] text-[#A259FF]'}
              `} onClick={() => setActiveTab(index)}>
              {tab.name}
            </button>)}
        </div>
        {/* Tab content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <ComicPanel scrollPosition={scrollPosition} className="h-[400px] transform rotate-1">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-8xl mb-4">{tabs[activeTab].icon}</div>
                <h4 className="text-3xl font-bold mb-2">
                  {tabs[activeTab].name}
                </h4>
                <p className="text-xl">{tabs[activeTab].desc}</p>
              </div>
            </ComicPanel>
          </div>
          <div className="space-y-6">
            {activeTab === 0 && <div className="space-y-4">
                <h4 className="text-3xl font-bold text-[#A259FF]">
                  Creator Feed
                </h4>
                <p className="text-xl">
                  Share your creative journey with fans and fellow artists. Post
                  sketches, finished pages, or updates on your latest project.
                </p>
                <p className="text-xl">
                  Get instant feedback and build an audience that's invested in
                  your work.
                </p>
                <div className="w-full h-4 bg-[#A259FF]"></div>
                <p className="text-xl font-bold">
                  Features: Post scheduling, analytics, engagement tools
                </p>
              </div>}
            {activeTab === 1 && <div className="space-y-4">
                <h4 className="text-3xl font-bold text-[#A259FF]">
                  Comic Reader
                </h4>
                <p className="text-xl">
                  A seamless reading experience designed specifically for
                  webcomics and digital art.
                </p>
                <p className="text-xl">
                  Vertical scrolling optimized for mobile with interactive
                  elements and animation support.
                </p>
                <div className="w-full h-4 bg-[#A259FF]"></div>
                <p className="text-xl font-bold">
                  Features: Offline reading, panel transitions, reader comments
                </p>
              </div>}
            {activeTab === 2 && <div className="space-y-4">
                <h4 className="text-3xl font-bold text-[#A259FF]">
                  TownSquare
                </h4>
                <p className="text-xl">
                  The heart of KronoLabs' community governance. Pitch your story
                  ideas and let the community vote on what gets funded.
                </p>
                <p className="text-xl">
                  Democratic storytelling where great ideas rise to the top,
                  regardless of who created them.
                </p>
                <div className="w-full h-4 bg-[#A259FF]"></div>
                <p className="text-xl font-bold">
                  Features: Token-based voting, pitch templates, funding
                  milestones
                </p>
              </div>}
            {activeTab === 3 && <div className="space-y-4">
                <h4 className="text-3xl font-bold text-[#A259FF]">
                  Community Spaces
                </h4>
                <p className="text-xl">
                  Find your tribe. Connect with writers, artists, colorists, and
                  fans who share your passion.
                </p>
                <p className="text-xl">
                  Form collaborations, get mentorship, or simply geek out about
                  your favorite comics.
                </p>
                <div className="w-full h-4 bg-[#A259FF]"></div>
                <p className="text-xl font-bold">
                  Features: Interest groups, collaboration tools, events
                  calendar
                </p>
              </div>}
            {activeTab === 4 && <div className="space-y-4">
                <h4 className="text-3xl font-bold text-[#A259FF]">
                  Token Wallets
                </h4>
                <p className="text-xl">
                  Manage your earnings and support other creators with our
                  integrated token system.
                </p>
                <p className="text-xl">
                  Track royalties, tips, and funding in real-time with complete
                  transparency.
                </p>
                <div className="w-full h-4 bg-[#A259FF]"></div>
                <p className="text-xl font-bold">
                  Features: Easy tipping, royalty tracking, token exchange
                </p>
              </div>}
          </div>
        </div>
      </div>
    </section>;
};