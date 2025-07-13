import React from 'react';

const TitleSlide = ({ content }) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-8">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {content.title}
        </h1>
        <p className="text-2xl text-blue-200 font-light">{content.subtitle}</p>
        <div className="space-y-4 mt-12">
          <p className="text-xl text-gray-300">{content.authors}</p>
          <p className="text-lg text-gray-400">{content.affiliation}</p>
          <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-full">
            <p className="text-white font-semibold">{content.venue}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleSlide;
