import React from 'react';
import { ComicPanel } from './ComicPanel';
interface BlockchainSectionProps {
  scrollPosition: number;
}
export const BlockchainSection: React.FC<BlockchainSectionProps> = ({
  scrollPosition
}) => {
  return <section className="relative py-20 bg-[#A259FF]">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-6xl md:text-8xl font-black uppercase mb-4 leading-none tracking-tighter">
            Powered by <span className="text-black">Blockchain</span>
          </h2>
          <div className="w-24 h-2 bg-black"></div>
        </div>
        <div className="mb-12 text-center">
          <h3 className="text-4xl font-bold uppercase">
            Decentralized. Transparent. Fair.
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-8">
            <ComicPanel scrollPosition={scrollPosition} delay={100} className="transform rotate-1">
              <h4 className="text-2xl font-bold mb-2">Townsquare Voting</h4>
              <p>
                Readers fund stories with tokens—creators get paid directly for
                their work without middlemen.
              </p>
            </ComicPanel>
            <ComicPanel scrollPosition={scrollPosition} delay={300} className="transform -rotate-2">
              <h4 className="text-2xl font-bold mb-2">Token Economy</h4>
              <p>
                Ad-generated tokens + creator tipping creates a sustainable
                ecosystem for artists.
              </p>
            </ComicPanel>
          </div>
          <div className="space-y-8">
            <ComicPanel scrollPosition={scrollPosition} delay={200} className="transform -rotate-1">
              <h4 className="text-2xl font-bold mb-2">NFT/IP Marketplace</h4>
              <p>
                Own and license digital stories and assets with clear provenance
                and creator attribution.
              </p>
            </ComicPanel>
            <ComicPanel scrollPosition={scrollPosition} delay={400} className="transform rotate-2">
              <h4 className="text-2xl font-bold mb-2">Smart Contracts</h4>
              <p>
                Transparent royalties for artists and collaborators ensure
                everyone gets their fair share.
              </p>
            </ComicPanel>
          </div>
        </div>
        <div className="text-center">
          <div className="inline-block bg-black text-white border-4 border-white p-6 transform rotate-2">
            <p className="text-2xl font-bold">
              "No gatekeepers. Just great stories, voted for by the people."
            </p>
          </div>
        </div>
      </div>
      {/* Diagonal divider */}
      <div className="w-full h-24 bg-black transform -skew-y-3 mt-20"></div>
    </section>;
};