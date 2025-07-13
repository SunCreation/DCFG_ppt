import React from 'react';

const FutureDirectionsSlide = ({ content }) => {
  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-cyan-300">{content.immediate.title}</h3>
          <ul className="space-y-3">
            {content.immediate.items.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-cyan-400 mr-3 mt-1">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-pink-300">{content.longterm.title}</h3>
          <ul className="space-y-3">
            {content.longterm.items.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-pink-400 mr-3 mt-1">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-4 text-green-300">{content.impact.title}</h3>
        <p className="text-xl mb-6">{content.impact.description}</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {content.impact.fields.map((field, idx) => (
            <span key={idx} className="bg-green-600/30 px-4 py-2 rounded-lg font-medium">
              {field}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FutureDirectionsSlide;
