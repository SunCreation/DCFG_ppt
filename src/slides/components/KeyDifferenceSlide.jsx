import React from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const KeyDifferenceSlide = ({ content }) => {
  return (
    <div className="space-y-12">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-green-300">✅ 연속 데이터</h3>
          <div className="space-y-4">
            <div className="bg-black/30 p-4 rounded font-mono text-lg text-green-200">
              <InlineMath math={content.continuous.formula} />
            </div>
            <p className="text-lg">{content.continuous.description}</p>
            <p className="text-sm text-green-200">💡 {content.continuous.advantage}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-red-300">❌ 이산 데이터</h3>
          <div className="space-y-4">
            <div className="bg-black/30 p-4 rounded font-mono text-lg text-red-200">
              {/* Discrete data representation, not a standard LaTeX formula */}
              {content.discrete.formula}
            </div>
            <p className="text-lg">{content.discrete.description}</p>
            <p className="text-sm text-red-200">⚠️ {content.discrete.challenge}</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500/30 to-purple-500/30 backdrop-blur-sm rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4 text-yellow-300">💡 해결 방향</h3>
        <p className="text-xl">{content.solution}</p>
      </div>
    </div>
  );
};

export default KeyDifferenceSlide;
