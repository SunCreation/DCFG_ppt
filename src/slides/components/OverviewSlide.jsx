import React from 'react';

const OverviewSlide = ({ content }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <div className="bg-red-500/20 backdrop-blur-sm rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-red-300">🚨 핵심 문제</h3>
          <p className="text-lg leading-relaxed">{content.problem}</p>
        </div>
        
        <div className="bg-blue-500/20 backdrop-blur-sm rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-blue-300">🎯 적용 도메인</h3>
          <div className="flex flex-wrap gap-3">
            {content.domains.map((domain, idx) => (
              <span key={idx} className="bg-blue-600/30 px-4 py-2 rounded-lg text-sm font-medium">
                {domain}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-6 text-green-300">🚀 주요 기여</h3>
        <ul className="space-y-4">
          {content.contributions.map((contribution, idx) => (
            <li key={idx} className="flex items-start">
              <span className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-4 mt-1 flex-shrink-0">
                {idx + 1}
              </span>
              <span className="text-lg leading-relaxed">{contribution}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OverviewSlide;
