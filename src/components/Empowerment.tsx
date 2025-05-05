import React from 'react';
interface EmpowermentProps {
  scrollPosition: number;
}
export const Empowerment: React.FC<EmpowermentProps> = ({
  scrollPosition
}) => {
  return <section className="relative py-20 bg-[#A259FF] text-black">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-6xl md:text-8xl font-black uppercase mb-4 leading-none tracking-tighter">
            Empowering the <span className="text-white">Next Generation</span>
          </h2>
          <div className="w-24 h-2 bg-black"></div>
        </div>
        <div className="mb-12 text-center">
          <h3 className="text-4xl font-bold uppercase">
            Art Schools. Digital Libraries. Career Pipelines.
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white border-4 border-black p-8">
            <div className="text-6xl font-bold mb-6">01</div>
            <h4 className="text-3xl font-bold mb-4">Digital Access</h4>
            <p className="text-xl mb-4">
              Libraries and schools equipped with tablets and animation tools to
              bring digital creation to underserved communities.
            </p>
            <ul className="space-y-2 text-lg">
              <li className="flex items-start">
                <span className="text-[#A259FF] text-2xl mr-2">✓</span>
                <span>Tablet donation programs in 50+ schools</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A259FF] text-2xl mr-2">✓</span>
                <span>Software licenses for animation and comic creation</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A259FF] text-2xl mr-2">✓</span>
                <span>Internet connectivity for remote areas</span>
              </li>
            </ul>
          </div>
          <div className="bg-white border-4 border-black p-8">
            <div className="text-6xl font-bold mb-6">02</div>
            <h4 className="text-3xl font-bold mb-4">Education & Mentorship</h4>
            <p className="text-xl mb-4">
              Workshops and mentorships funded by platform revenue to develop
              the next generation of storytellers.
            </p>
            <ul className="space-y-2 text-lg">
              <li className="flex items-start">
                <span className="text-[#A259FF] text-2xl mr-2">✓</span>
                <span>Virtual workshops with industry professionals</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A259FF] text-2xl mr-2">✓</span>
                <span>1-on-1 mentorship for promising creators</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A259FF] text-2xl mr-2">✓</span>
                <span>Curriculum development for schools</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center">
          <div className="inline-block bg-black text-white border-4 border-white p-6 transform -rotate-1">
            <p className="text-2xl font-bold">
              "We don't just host stories—we help make them happen."
            </p>
          </div>
        </div>
      </div>
      {/* Diagonal divider */}
      <div className="w-full h-24 bg-black transform skew-y-3 mt-20"></div>
    </section>;
};