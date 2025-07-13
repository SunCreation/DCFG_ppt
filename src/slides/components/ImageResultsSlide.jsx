import React from 'react';

const ImageResultsSlide = ({ content }) => {
  return (
    <div className="space-y-8">
      <div className="text-center bg-blue-500/20 backdrop-blur-sm rounded-xl p-6">
        <h3 className="text-2xl font-bold text-blue-300 mb-4">📊 실험 설정</h3>
        <p className="text-lg mb-2"><strong>데이터셋:</strong> {content.dataset}</p>
        <p className="text-lg"><strong>방법:</strong> {content.method}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-red-500/20 backdrop-blur-sm rounded-xl p-8">
          <h4 className="text-xl font-bold text-red-300 mb-6">가이던스 적용 전</h4>
          <div className="space-y-3">
            <div className="bg-black/30 p-3 rounded">
              <strong>MDLM:</strong> {content.results.before.MDLM}
            </div>
            <div className="bg-black/30 p-3 rounded">
              <strong>UDLM:</strong> {content.results.before.UDLM}
            </div>
          </div>
        </div>

        <div className="bg-green-500/20 backdrop-blur-sm rounded-xl p-8">
          <h4 className="text-xl font-bold text-green-300 mb-6">가이던스 적용 후</h4>
          <div className="space-y-3">
            <div className="bg-black/30 p-3 rounded">
              <strong>MDLM:</strong> {content.results.after.MDLM}
            </div>
            <div className="bg-black/30 p-3 rounded">
              <strong>UDLM:</strong> {content.results.after.UDLM}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-yellow-500/20 backdrop-blur-sm rounded-xl p-6 text-center">
          <h4 className="text-lg font-bold text-yellow-300">🎯 개선 효과</h4>
          <p className="mt-2">{content.improvement}</p>
        </div>
        <div className="bg-purple-500/20 backdrop-blur-sm rounded-xl p-6 text-center">
          <h4 className="text-lg font-bold text-purple-300">⚡ 추가 발견</h4>
          <p className="mt-2">{content.efficiency_note}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageResultsSlide;
