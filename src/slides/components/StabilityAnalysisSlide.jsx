import React from 'react';

const StabilityAnalysisSlide = ({ content }) => {
  return (
    <div className="space-y-8">
      <div className="text-center bg-blue-500/20 backdrop-blur-sm rounded-xl p-6">
        <h3 className="text-2xl font-bold text-blue-300">{content.gamma_effects.title}</h3>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {content.gamma_effects.models.map((model, idx) => (
          <div key={idx} className="bg-gradient-to-br from-gray-600/20 to-gray-500/20 backdrop-blur-sm rounded-xl p-8">
            <h4 className="text-xl font-bold mb-4 text-white">{model.name}</h4>
            <div className="space-y-4">
              <div className="bg-black/30 p-3 rounded">
                <p className="font-mono text-sm">{model.behavior}</p>
              </div>
              <div className={`p-3 rounded text-center font-bold ${
                model.status === '✅ 안정적' ? 'bg-green-500/20 text-green-300' :
                model.status === '⚠️ 제한적' ? 'bg-yellow-500/20 text-yellow-300' :
                'bg-red-500/20 text-red-300'
              }`}>
                {model.status}
              </div>
              <div className="bg-blue-500/20 p-3 rounded">
                <p className="text-sm text-blue-200">{model.reason}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-yellow-500/30 to-orange-500/30 backdrop-blur-sm rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-yellow-300">{content.key_insight}</h3>
      </div>
    </div>
  );
};

export default StabilityAnalysisSlide;
