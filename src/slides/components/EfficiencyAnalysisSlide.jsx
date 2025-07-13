import React from 'react';

const EfficiencyAnalysisSlide = ({ content }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-8 h-full">
      <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-6 text-blue-300">{content.fast_sampling.title}</h3>
        <div className="space-y-6">
          <div className="bg-blue-600/20 p-4 rounded">
            <p className="font-semibold text-blue-200">실험 조건</p>
            <p className="mt-1">{content.fast_sampling.condition}</p>
          </div>
          <div className="space-y-3">
            <div className="bg-red-500/20 p-3 rounded">
              <strong>MDLM:</strong> {content.fast_sampling.results.MDLM}
            </div>
            <div className="bg-green-500/20 p-3 rounded">
              <strong>UDLM:</strong> {content.fast_sampling.results.UDLM}
            </div>
          </div>
          <div className="bg-yellow-500/20 p-4 rounded">
            <p className="text-yellow-300 font-semibold">💡 이유</p>
            <p className="mt-2">{content.fast_sampling.reason}</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-6 text-purple-300">{content.computational.title}</h3>
        <div className="space-y-6">
          <div className="bg-red-500/20 p-4 rounded">
            <p className="font-semibold text-red-300">정확한 방법</p>
            <p className="mt-1 text-sm">{content.computational.exact}</p>
          </div>
          <div className="bg-green-500/20 p-4 rounded">
            <p className="font-semibold text-green-300">근사 방법</p>
            <p className="mt-1 text-sm">{content.computational.approx}</p>
          </div>
          <div className="bg-blue-500/20 p-4 rounded">
            <p className="font-semibold text-blue-300">실용적 결론</p>
            <p className="mt-1 text-sm">{content.computational.practical}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EfficiencyAnalysisSlide;
