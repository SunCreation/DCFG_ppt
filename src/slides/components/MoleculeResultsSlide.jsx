import React from 'react';

const MoleculeResultsSlide = ({ content }) => {
  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {content.experiments.map((exp, idx) => (
          <div key={idx} className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-8">
            <h3 className="text-xl font-bold mb-4 text-purple-300">{exp.title}</h3>
            <div className="space-y-4">
              <div>
                <span className="font-semibold text-purple-200">방법:</span>
                <p className="mt-1">{exp.method}</p>
              </div>
              <div>
                <span className="font-semibold text-purple-200">결과:</span>
                <p className="mt-1">{exp.result}</p>
              </div>
              <div className="bg-green-500/20 p-3 rounded">
                <p className="text-green-300 text-sm">{exp.comparison || exp.advantage}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-500/30 to-green-500/30 backdrop-blur-sm rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-yellow-300 mb-4">📈 {content.pareto_frontier}</h3>
        <p className="text-lg text-gray-300">{content.validation}</p>
      </div>
    </div>
  );
};

export default MoleculeResultsSlide;
