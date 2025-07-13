import React from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const MathematicalSlide = ({ content }) => {
  return (
    <div className="space-y-8">
      <div className="text-center bg-red-500/20 backdrop-blur-sm rounded-xl p-6">
        <h3 className="text-2xl font-bold text-red-300 mb-4">문제</h3>
        <p className="text-lg">{content.problem}</p>
      </div>

      <div className="text-center bg-blue-500/20 backdrop-blur-sm rounded-xl p-6">
        <h3 className="text-2xl font-bold text-blue-300 mb-4">해결책</h3>
        <p className="text-lg">{content.solution}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-gray-600/20 backdrop-blur-sm rounded-xl p-8">
          <h4 className="text-xl font-bold mb-4 text-gray-300">{content.before.title}</h4>
          <div className="bg-black/30 p-4 rounded mb-4">
            <code className="text-yellow-300">
              <InlineMath math={content.before.formula} />
            </code>
          </div>
          <p className="text-sm text-gray-400">{content.before.limitation}</p>
        </div>

        <div className="bg-green-500/20 backdrop-blur-sm rounded-xl p-8">
          <h4 className="text-xl font-bold mb-4 text-green-300">{content.after.title}</h4>
          <ul className="space-y-2 mb-4">
            {content.after.improvements.map((improvement, idx) => (
              <li key={idx} className="text-sm">• {improvement}</li>
            ))}
          </ul>
          <div className="bg-green-600/20 p-3 rounded">
            <p className="font-semibold text-green-200">🏆 {content.after.result}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathematicalSlide;
