import React, { useEffect, useState } from 'react';
const panels = [{
  title: 'Subscriptions',
  price: '$2',
  period: '/mo',
  description: 'Affordable access to premium features and content',
  footnote: 'Or $20/year (save 16%)',
  icon: '💎',
  bg: 'bg-white',
  text: 'text-black',
  accent: 'border-[#A259FF]'
}, {
  title: 'Ad-Generated Tokens',
  description: 'Earn tokens by viewing ads, use them to tip creators or fund projects',
  icons: ['🪙', '→', '👨‍🎨'],
  bg: 'bg-[#A259FF]',
  text: 'text-white',
  accent: 'border-[#A259FF]'
}, {
  title: 'NFT Marketplace',
  description: 'Commission on sales of digital collectibles and IP licensing',
  rate: '5-10%',
  footnote: 'Industry-low commission rates',
  icon: '🖼️',
  bg: 'bg-white',
  text: 'text-black',
  accent: 'border-[#A259FF]'
}, {
  title: 'Crowdfunded Story Royalties',
  description: 'Small percentage of successfully funded projects supports platform growth',
  rate: '3% platform fee on funded projects',
  icon: '📈',
  bg: 'bg-[#A259FF]',
  text: 'text-white',
  accent: 'border-[#A259FF]'
}, {
  title: 'Merch & Print Sales',
  description: 'Physical products from digital stories',
  rate: 'Print-on-demand with 80% creator revenue share',
  icon: '👕',
  bg: 'bg-white',
  text: 'text-black',
  accent: 'border-[#A259FF]'
}];
export const BusinessModel = () => {
  const [visiblePanels, setVisiblePanels] = useState<number[]>([]);
  useEffect(() => {
    if (visiblePanels.length < panels.length) {
      const timeout = setTimeout(() => {
        setVisiblePanels(v => [...v, v.length]);
      }, 250);
      return () => clearTimeout(timeout);
    }
  }, [visiblePanels]);
  return <section className="relative py-20 min-h-screen overflow-hidden bg-black">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-[#A259FF] via-black to-[#1a103d] opacity-80" />
      {/* Floating emojis */}
      <FloatingEmojis />
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-6xl md:text-8xl font-black uppercase mb-4 leading-none tracking-tighter text-white drop-shadow-lg">
            Business <span className="text-[#A259FF]">Model</span>
          </h2>
          <div className="mx-auto w-24 h-2 bg-[#A259FF] rounded shadow-lg animate-pulse"></div>
        </div>
        {/* Subtitle */}
        <div className="mb-12 text-center">
          <h3 className="text-4xl font-bold uppercase text-white tracking-wide animate-fade-in">
            How We Sustain the Ecosystem
          </h3>
        </div>
        {/* Top row: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {panels.slice(0, 3).map((panel, i) => <BusinessCard key={panel.title} panel={panel} visible={visiblePanels.includes(i)} delay={i * 0.1} />)}
        </div>
        {/* Bottom row: 2 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {panels.slice(3).map((panel, i) => <BusinessCard key={panel.title} panel={panel} visible={visiblePanels.includes(i + 3)} delay={(i + 3) * 0.1} />)}
        </div>
      </div>
    </section>;
};

// Card with 3D hover, bounce icon, and fade-in
function BusinessCard({
  panel,
  visible,
  delay
}: {
  panel: any;
  visible: boolean;
  delay: number;
}) {
  return <div className={`
        relative border-4 rounded-2xl p-8 shadow-2xl transition-all duration-700
        ${panel.bg} ${panel.text} ${panel.accent}
        ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
        group
      `} style={{
    transitionDelay: `${delay}s`,
    boxShadow: visible ? `0 8px 32px 0 #A259FF33, 0 0 0 4px #A259FF22` : undefined
  }}>
      {/* Icon or icons */}
      <div className="absolute top-4 right-4 text-3xl opacity-30 group-hover:animate-wiggle">
        {panel.icon}
        {panel.icons && <div className="flex gap-2">
            {panel.icons.map((ic: string, idx: number) => <span key={ic} className="inline-block group-hover:animate-bounce">{ic}</span>)}
          </div>}
      </div>
      <h4 className="text-2xl font-extrabold mb-3">{panel.title}</h4>
      {panel.price && <div className="text-5xl font-black mb-2">
          {panel.price}
          <span className="text-2xl">{panel.period}</span>
        </div>}
      <p className="mb-4">{panel.description}</p>
      {panel.rate && <div className="text-center text-4xl font-black mb-2">{panel.rate}</div>}
      {panel.footnote && <p className="text-sm text-gray-600">{panel.footnote}</p>}
      {/* Fun underline */}
      <div className="w-2/5 h-1 rounded bg-[#A259FF] mt-4 mx-auto group-hover:w-4/5 transition-all duration-500" />
    </div>;
}

// Floating emojis for fun background
function FloatingEmojis() {
  const emojis = [{
    icon: '🪙',
    left: '10%',
    top: '25%',
    size: '5rem',
    anim: 'animate-float-slow'
  }, {
    icon: '👨‍🎨',
    left: '80%',
    top: '30%',
    size: '4rem',
    anim: 'animate-float'
  }, {
    icon: '💎',
    left: '40%',
    top: '15%',
    size: '4.5rem',
    anim: 'animate-float'
  }, {
    icon: '🖼️',
    left: '60%',
    top: '60%',
    size: '4rem',
    anim: 'animate-float-slow'
  }, {
    icon: '📈',
    left: '20%',
    top: '70%',
    size: '4rem',
    anim: 'animate-float'
  }, {
    icon: '👕',
    left: '70%',
    top: '80%',
    size: '4rem',
    anim: 'animate-float-slow'
  }];
  return <div className="pointer-events-none absolute inset-0 z-0">
      {emojis.map((e, i) => <span key={i} className={`absolute opacity-10 blur-sm ${e.anim}`} style={{
      left: e.left,
      top: e.top,
      fontSize: e.size,
      filter: 'blur(1.5px)'
    }}>
          {e.icon}
        </span>)}
    </div>;
}