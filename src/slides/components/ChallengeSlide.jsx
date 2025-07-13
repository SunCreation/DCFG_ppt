import React from 'react';

const ChallengeSlide = ({ content }) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-12">
          <h3 className="text-4xl font-bold mb-8 text-red-300 text-center">{content.title}</h3>
          
          <p className="text-xl leading-relaxed mb-8 text-center">{content.problem}</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-500/20 p-6 rounded-lg">
              <h4 className="font-bold text-green-300 mb-2">연속 데이터</h4>
              <div className="font-mono text-sm bg-black/30 p-3 rounded">
                {content.examples.continuous}
              </div>
            </div>
            <div className="bg-red-500/20 p-6 rounded-lg">
              <h4 className="font-bold text-red-300 mb-2">이산 데이터</h4>
              <div className="font-mono text-sm bg-black/30 p-3 rounded">
                {content.examples.discrete}
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-yellow-500/20 rounded-lg">
            <p className="text-lg text-center"><strong>영향:</strong> {content.impact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeSlide;
