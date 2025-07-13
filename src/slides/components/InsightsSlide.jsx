import React from 'react';

const InsightsSlide = ({ content }) => {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {content.findings.map((finding, idx) => (
        <div key={idx} className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-8">
          <h3 className="text-xl font-bold mb-4 text-cyan-300">{finding.title}</h3>
          <div className="space-y-4">
            <div className="bg-yellow-500/20 p-4 rounded-lg">
              <p className="font-semibold text-yellow-300">💡 발견</p>
              <p className="text-sm mt-2">{finding.insight}</p>
            </div>
            <div className="bg-blue-500/20 p-4 rounded-lg">
              <p className="font-semibold text-blue-300">📝 설명</p>
              <p className="text-sm mt-2">{finding.explanation}</p>
            </div>
          </div>
        </div>
      ))}
      
      <div className="lg:col-span-3 bg-gradient-to-r from-green-500/30 to-emerald-500/30 backdrop-blur-sm rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-green-300 mb-4">🚀 실용적 의미</h3>
        <p className="text-xl">{content.implication}</p>
      </div>
    </div>
  );
};

export default InsightsSlide;
