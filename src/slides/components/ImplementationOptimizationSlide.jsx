import React from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const ImplementationOptimizationSlide = ({ content }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-8 h-full">
      <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-6 text-blue-300">{content.basic_method.title}</h3>
        <p className="text-lg mb-4">{content.basic_method.description}</p>
        <div className="bg-red-500/20 p-3 rounded mb-4">
          <p className="text-red-300 font-semibold">계산 복잡도: {content.basic_method.complexity}</p>
        </div>
        <div className="bg-black/30 p-4 rounded">
          <pre className="text-sm text-gray-300 whitespace-pre-wrap">{content.basic_method.code}</pre>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-6 text-green-300">{content.optimization.title}</h3>
        <p className="text-lg mb-4">{content.optimization.description}</p>
        <div className="bg-green-500/20 p-3 rounded mb-4">
          <p className="text-green-300 font-semibold">개선된 복잡도: {content.optimization.complexity}</p>
        </div>
        <div className="bg-black/30 p-4 rounded">
          <code className="text-sm text-cyan-300">
            <InlineMath math={content.optimization.formula} />
          </code>
        </div>
      </div>
    </div>
  );
};

export default ImplementationOptimizationSlide;
