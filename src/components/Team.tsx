import React from 'react';
interface TeamProps {
  scrollPosition: number;
}
export const Team: React.FC<TeamProps> = ({
  scrollPosition
}) => {
  const team = [{
    name: 'Eseosa Kay-Uwagboe',
    role: 'CEO & Blockchain Strategist',
    image: "/eseosa.jpeg",
    bg: 'bg-[#A259FF]'
  }, {
    name: 'Isaiah Essien',
    role: 'CTO & Smart Contract Developer',
    image: "isaiah.jpeg",
    bg: 'bg-white'
  }, {
    name: 'David Tuyishime',
    role: 'COO & Lead Artist',
    image: "/David.jpeg",
    bg: 'bg-[#A259FF]'
  }, {
    name: 'Phionah Ingabire',
    role: 'CMO & Brand Builder',
    image: "/phionah.jpeg",
    bg: 'bg-white'
  }];
  return <section id="team" className="relative py-20 bg-[#A259FF] text-black">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-6xl md:text-8xl font-black uppercase mb-4 leading-none tracking-tighter">
            Meet the <span className="text-white">Team</span>
          </h2>
          <div className="w-24 h-2 bg-black"></div>
        </div>
        <div className="mb-12 text-center">
          <h3 className="text-4xl font-bold uppercase">
            Artists, Techies, and Visionaries
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {team.map((member, index) => <div key={index} className={`border-4 border-black ${member.bg} p-6 transform hover:scale-105 transition-transform duration-300 ${member.bg === 'bg-white' ? 'text-black' : ''}`}>
              <div className="w-full aspect-square mb-4 border-4 border-black overflow-hidden">
                <div className="w-full h-full bg-cover bg-center" style={{
              backgroundImage: `url(${member.image})`,
              filter: 'grayscale(100%)'
            }}></div>
              </div>
              <h4 className="text-2xl font-bold">{member.name}</h4>
              <p className={member.bg === 'bg-white' ? 'text-[#A259FF] font-bold' : 'font-bold'}>
                {member.role}
              </p>
            </div>)}
        </div>
        <div className="text-center">
          <div className="inline-block bg-black text-white border-4 border-white p-6">
            <p className="text-2xl font-bold">
              Met at ALU's open mic. Stayed to rewrite history.
            </p>
          </div>
        </div>
      </div>
    </section>;
};