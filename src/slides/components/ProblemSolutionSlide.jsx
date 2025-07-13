import React from 'react';

const ProblemSolutionSlide = ({ content }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-8 h-full">
      <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-6 text-red-300">{content.problem.title}</h3>
        <div className="space-y-6">
          <div className="bg-black/30 p-4 rounded font-mono text-sm">
            {content.problem.process}
          </div>
          <div className="bg-red-600/20 p-4 rounded">
            <p className="text-red-200 font-semibold">❌ 문제점: {content.problem.limitation}</p>
          </div>
          <p className="text-lg">{content.problem.impact}</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-6 text-green-300">{content.solution.title}</h3>
        <div className="space-y-6">
          <div className="bg-black/30 p-4 rounded font-mono text-sm">
            {content.solution.process}
          </div>
          <div className="bg-green-600/20 p-4 rounded">
            <p className="text-green-200 font-semibold">✅ 장점: {content.solution.advantage}</p>
          </div>
          <p className="text-lg">{content.solution.benefit}</p>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolutionSlide;
