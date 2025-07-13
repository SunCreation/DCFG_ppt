import React from 'react';

const ComparisonSlide = ({ content }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-8 h-full">
      <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-3xl font-bold mb-8 text-cyan-300">{content.continuous.title}</h3>
        <div className="space-y-6">
          <div>
            <span className="text-cyan-200 font-semibold">데이터:</span>
            <p className="text-lg mt-1">{content.continuous.data}</p>
          </div>
          <div>
            <span className="text-cyan-200 font-semibold">노이즈:</span>
            <p className="text-lg mt-1">{content.continuous.noise}</p>
          </div>
          <div>
            <span className="text-cyan-200 font-semibold">가이던스:</span>
            <p className="text-lg mt-1">{content.continuous.guidance}</p>
          </div>
          <div>
            <span className="text-cyan-200 font-semibold">예시:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {content.continuous.examples.map((example, idx) => (
                <span key={idx} className="bg-cyan-600/30 px-3 py-1 rounded text-sm">{example}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-3xl font-bold mb-8 text-pink-300">{content.discrete.title}</h3>
        <div className="space-y-6">
          <div>
            <span className="text-pink-200 font-semibold">데이터:</span>
            <p className="text-lg mt-1">{content.discrete.data}</p>
          </div>
          <div>
            <span className="text-pink-200 font-semibold">노이즈:</span>
            <p className="text-lg mt-1">{content.discrete.noise}</p>
          </div>
          <div>
            <span className="text-pink-200 font-semibold">가이던스:</span>
            <p className="text-lg mt-1">{content.discrete.guidance}</p>
          </div>
          <div>
            <span className="text-pink-200 font-semibold">예시:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {content.discrete.examples.map((example, idx) => (
                <span key={idx} className="bg-pink-600/30 px-3 py-1 rounded text-sm">{example}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSlide;
