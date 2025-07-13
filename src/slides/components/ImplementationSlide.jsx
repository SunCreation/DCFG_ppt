import React from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const ImplementationSlide = ({ content }) => {
  return (
    <div className="space-y-8">
      {content.steps.map((step, idx) => (
        <div key={idx} className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-blue-300">{step.title}</h3>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-lg leading-relaxed">{step.description}</p>
              {step.benefit && (
                <div className="bg-green-500/20 p-4 rounded-lg">
                  <p className="text-green-300 font-semibold">💡 {step.benefit}</p>
                </div>
              )}
            </div>
            <div className="bg-black/30 p-6 rounded-lg">
              {step.formula && (
                <div className="font-mono text-cyan-300 mb-4">
                  <InlineMath math={step.formula} />
                </div>
              )}
              {step.pseudocode && (
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">{step.pseudocode}</pre>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImplementationSlide;
