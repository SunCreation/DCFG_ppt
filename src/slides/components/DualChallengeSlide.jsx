import React from 'react';

const DualChallengeSlide = ({ content }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-8 h-full">
      <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-6 text-red-300">{content.challenge1.title}</h3>
        <p className="text-lg mb-6 leading-relaxed">{content.challenge1.problem}</p>
        <div className="bg-black/30 p-4 rounded">
          <p className="font-mono text-yellow-300">{content.challenge1.example}</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-6 text-orange-300">{content.challenge2.title}</h3>
        <p className="text-lg mb-6 leading-relaxed">{content.challenge2.problem}</p>
        <div className="bg-black/30 p-4 rounded">
          <p className="text-sm">{content.challenge2.comparison}</p>
        </div>
      </div>
    </div>
  );
};

export default DualChallengeSlide;
