import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { slides } from './slides/slideData';
import TitleSlide from './slides/components/TitleSlide';
import OverviewSlide from './slides/components/OverviewSlide';
import ComparisonSlide from './slides/components/ComparisonSlide';
import KeyDifferenceSlide from './slides/components/KeyDifferenceSlide';
import ChallengeSlide from './slides/components/ChallengeSlide';
import DualChallengeSlide from './slides/components/DualChallengeSlide';
import ConceptSlide from './slides/components/ConceptSlide';
import ImplementationSlide from './slides/components/ImplementationSlide';
import ImplementationOptimizationSlide from './slides/components/ImplementationOptimizationSlide';
import ProblemSolutionSlide from './slides/components/ProblemSolutionSlide';
import MathematicalSlide from './slides/components/MathematicalSlide';
import ResultsTableSlide from './slides/components/ResultsTableSlide';
import InsightsSlide from './slides/components/InsightsSlide';
import ExperimentDetailSlide from './slides/components/ExperimentDetailSlide';
import MoleculeResultsSlide from './slides/components/MoleculeResultsSlide';
import ImageResultsSlide from './slides/components/ImageResultsSlide';
import EfficiencyAnalysisSlide from './slides/components/EfficiencyAnalysisSlide';
import StabilityAnalysisSlide from './slides/components/StabilityAnalysisSlide';
import AchievementsSlide from './slides/components/AchievementsSlide';
import FutureDirectionsSlide from './slides/components/FutureDirectionsSlide';

const PresentationApp = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  console.log('Slides data:', slides);
  console.log('Current slide index:', currentSlide);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const renderSlideContent = (slide) => {
    const content = slide.content;

    switch (content.type) {
      case 'title':
        return <TitleSlide content={content} />;
      case 'overview':
        return <OverviewSlide content={content} />;
      case 'comparison':
        return <ComparisonSlide content={content} />;
      case 'key-difference':
        return <KeyDifferenceSlide content={content} />;
      case 'challenge':
        return <ChallengeSlide content={content} />;
      case 'dual-challenge':
        return <DualChallengeSlide content={content} />;
      case 'concept':
        return <ConceptSlide content={content} />;
      case 'implementation':
        return <ImplementationSlide content={content} />;
      case 'implementation-optimization':
        return <ImplementationOptimizationSlide content={content} />;
      case 'problem-solution':
        return <ProblemSolutionSlide content={content} />;
      case 'mathematical':
        return <MathematicalSlide content={content} />;
      case 'results-table':
        return <ResultsTableSlide content={content} />;
      case 'insights':
        return <InsightsSlide content={content} />;
      case 'experiment-detail':
        return <ExperimentDetailSlide content={content} />;
      case 'molecule-results':
        return <MoleculeResultsSlide content={content} />;
      case 'image-results':
        return <ImageResultsSlide content={content} />;
      case 'efficiency-analysis':
        return <EfficiencyAnalysisSlide content={content} />;
      case 'stability-analysis':
        return <StabilityAnalysisSlide content={content} />;
      case 'achievements':
        return <AchievementsSlide content={content} />;
      case 'future-directions':
        return <FutureDirectionsSlide content={content} />;
      default:
        return <div>슬라이드 내용을 불러올 수 없습니다.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* 네비게이션 바 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-3">
            <h1 className="text-base font-bold">이산 확산 모델 가이던스</h1>
            <span className="text-sm opacity-75">
              {currentSlide + 1} / {slides.length}
            </span>
          </div>
          
          <div className="flex items-center space-x-1 overflow-x-auto">
            {slides.map((slide, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`p-1.5 rounded-lg transition-all flex-shrink-0 ${
                  idx === currentSlide 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
                title={slide.title}
              >
                {slide.icon}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={prevSlide}
              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              disabled={currentSlide === slides.length - 1}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-sm"
            >
              F
            </button>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="pt-20 pb-8 px-8">
        <div className="max-w-7xl mx-auto">
          {/* 슬라이드 헤더 */}
          {slides[currentSlide].content.type !== 'title' && (
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                {slides[currentSlide].icon}
                <h2 className="text-4xl font-bold ml-4">{slides[currentSlide].title}</h2>
              </div>
            </div>
          )}

          {/* 슬라이드 콘텐츠 */}
          <div className="slide-content">
            {renderSlideContent(slides[currentSlide])}
          </div>
        </div>
      </main>

      {/* 하단 컨트롤 */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/20 border-t border-white/10 p-4">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex space-x-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentSlide ? 'bg-blue-500' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center mt-2 text-sm opacity-75">
          키보드: ← → (이전/다음), F (전체화면), Space (다음)
        </div>
      </div>
    </div>
  );
};

export default PresentationApp;