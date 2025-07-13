import React from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const ConceptSlide = ({ content }) => {
  return (
    <div className="space-y-12">
      <div className="text-center bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-4 text-blue-300">핵심 아이디어</h3>
        <p className="text-xl mb-6">{content.main_idea}</p>
        <div className="bg-black/30 p-6 rounded-lg">
          <code className="text-lg text-cyan-300">
            <InlineMath math={content.formula} />
          </code>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-yellow-500/20 backdrop-blur-sm rounded-xl p-8">
          <h4 className="text-xl font-bold mb-4 text-yellow-300">🔑 핵심 통찰</h4>
          <p className="text-lg">{content.key_insight}</p>
        </div>
        <div className="bg-green-500/20 backdrop-blur-sm rounded-xl p-8">
          <h4 className="text-xl font-bold mb-4 text-green-300">📋 접근 방법</h4>
          <p className="text-lg">{content.approach}</p>
        </div>
      </div>
    </div>
  );
};

export default ConceptSlide;
