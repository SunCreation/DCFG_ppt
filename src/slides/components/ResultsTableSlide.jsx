import React from 'react';

const ResultsTableSlide = ({ content }) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <p className="text-xl text-blue-200">{content.subtitle}</p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 overflow-x-auto">
        <table className="w-full text-lg">
          <thead>
            <tr className="border-b-2 border-white/20">
              {content.table.headers.map((header, idx) => (
                <th key={idx} className="text-left p-4 font-bold text-yellow-300">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {content.table.rows.map((row, idx) => (
              <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="p-4">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gradient-to-r from-green-500/30 to-blue-500/30 backdrop-blur-sm rounded-xl p-6 text-center">
        <h3 className="text-xl font-bold text-green-300 mb-2">🔍 핵심 발견</h3>
        <p className="text-lg">{content.key_finding}</p>
      </div>
    </div>
  );
};

export default ResultsTableSlide;
