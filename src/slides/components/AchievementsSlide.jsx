import React from 'react';

const AchievementsSlide = ({ content }) => {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-6 text-cyan-300">{content.technical.title}</h3>
        <ul className="space-y-4">
          {content.technical.items.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <span className="bg-cyan-500 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-4 mt-1 flex-shrink-0">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-6 text-pink-300">{content.academic.title}</h3>
        <ul className="space-y-4">
          {content.academic.items.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <span className="bg-pink-500 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-4 mt-1 flex-shrink-0">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-6 text-emerald-300">{content.practical.title}</h3>
        <ul className="space-y-4">
          {content.practical.domains.map((domain, idx) => (
            <li key={idx} className="flex items-start">
              <span className="bg-emerald-500 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-4 mt-1 flex-shrink-0">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{domain}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AchievementsSlide;
