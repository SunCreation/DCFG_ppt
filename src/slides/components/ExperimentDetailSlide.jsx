import React from 'react';

const ExperimentDetailSlide = ({ content }) => {
  return (
    <div className="space-y-8">
      <div className="text-center bg-blue-500/20 backdrop-blur-sm rounded-xl p-6">
        <h3 className="text-2xl font-bold text-blue-300 mb-4">📊 실험 설정</h3>
        <p className="text-lg mb-2"><strong>실험:</strong> {content.experiment}</p>
        <p className="text-lg"><strong>설정:</strong> {content.setup}</p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
        <table className="w-full text-lg">
          <thead>
            <tr className="border-b-2 border-white/20">
              {content.results.headers.map((header, idx) => (
                <th key={idx} className="text-left p-4 font-bold text-yellow-300">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {content.results.rows.map((row, idx) => (
              <tr key={idx} className="border-b border-white/10">
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="p-4">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-green-500/20 backdrop-blur-sm rounded-xl p-8">
          <h4 className="text-xl font-bold text-green-300 mb-4">💡 핵심 통찰</h4>
          <p className="text-lg">{content.key_insight}</p>
        </div>
        <div className="bg-blue-500/20 backdrop-blur-sm rounded-xl p-8">
          <h4 className="text-xl font-bold text-blue-300 mb-4">⚡ 효율성</h4>
          <p className="text-lg">{content.efficiency}</p>
        </div>
      </div>
    </div>
  );
};

export default ExperimentDetailSlide;
