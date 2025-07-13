import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Home, FileText, Zap, Target, Settings, BarChart3, Award, Lightbulb, Brain, Cpu, TestTube } from 'lucide-react';

const slides = [
  {
    id: 'title',
    title: '이산 확산 모델을 위한 간단한 가이던스 메커니즘',
    icon: <Home className="w-8 h-8" />,
    content: {
      type: 'title',
      subtitle: 'Simple Guidance Mechanisms for Discrete Diffusion Models',
      authors: 'Yair Schiff, Subham Sekhar Sahoo 외',
      venue: 'ICLR 2025',
      affiliation: 'Cornell University, InstaDeep'
    }
  },
  {
    id: 'overview',
    title: '연구 개요',
    icon: <FileText className="w-8 h-8" />,
    content: {
      type: 'overview',
      problem: '연속 데이터용 가이던스 기법을 이산 데이터에 직접 적용 불가',
      domains: ['텍스트', 'DNA 서열', '분자 구조'],
      contributions: [
        'D-CFG & D-CBG: 이산 데이터용 가이던스 알고리즘',
        'UDLM: 가이던스 최적화된 새로운 확산 모델',
        '연속 시간 ELBO: 수학적 성능 개선'
      ]
    }
  },
  {
    id: 'continuous-vs-discrete',
    title: '연속 vs 이산 확산 모델',
    icon: <Brain className="w-8 h-8" />,
    content: {
      type: 'comparison',
      continuous: {
        title: '🌊 연속 확산 모델',
        data: '이미지, 오디오 (실수값)',
        noise: '가우시안 노이즈 추가/제거',
        guidance: '기울기(gradient) 기반 조정',
        examples: ['Stable Diffusion', 'DDPM']
      },
      discrete: {
        title: '🎲 이산 확산 모델',
        data: '텍스트, DNA, 분자 (토큰 단위)',
        noise: '토큰 마스킹 또는 치환',
        guidance: '확률 분포 직접 조작',
        examples: ['D3PM', 'MDLM']
      }
    }
  },
  {
    id: 'key-difference',
    title: '가이던스 적용의 핵심 차이',
    icon: <Zap className="w-8 h-8" />,
    content: {
      type: 'key-difference',
      continuous: {
        formula: '∇_z log p(y|z)',
        description: '미분 가능한 연속 공간',
        advantage: '부드러운 최적화 가능'
      },
      discrete: {
        formula: 'z = [0,1,0,0]',
        description: '원핫 벡터, 미분 불가능',
        challenge: '불연속적 조정 필요'
      },
      solution: '확률 분포를 직접 조작하는 새로운 접근법'
    }
  },
  {
    id: 'challenges-1',
    title: '문제 1: 미분 불가능성',
    icon: <Zap className="w-8 h-8" />,
    content: {
      type: 'challenge',
      title: '미분 불가능성 (Non-differentiability)',
      problem: '원핫 벡터는 불연속적이어서 기울기 계산 불가',
      examples: {
        continuous: 'z = [0.3, 0.7, 0.1] ← 미분 가능',
        discrete: 'z = [0, 1, 0] ← 미분 불가'
      },
      impact: '연속 데이터의 그래디언트 기반 가이던스 방법 사용 불가'
    }
  },
  {
    id: 'challenges-2',
    title: '문제 2: 조합 폭발 & 정규화 복잡성',
    icon: <Zap className="w-8 h-8" />,
    content: {
      type: 'dual-challenge',
      challenge1: {
        title: '조합 폭발 (Combinatorial Explosion)',
        problem: 'N^L개의 모든 가능한 시퀀스 조합을 고려해야 함',
        example: '어휘 크기 N=1000, 길이 L=10 → 10^30 조합!'
      },
      challenge2: {
        title: '정규화 상수 복잡성',
        problem: '확률 분포 정규화를 위한 계산량이 폭발적으로 증가',
        comparison: '연속: 적분으로 처리 vs 이산: 지수적 합 계산'
      }
    }
  },
  {
    id: 'dcfg-concept',
    title: 'D-CFG: 분류기 없는 가이던스 - 개념',
    icon: <Target className="w-8 h-8" />,
    content: {
      type: 'concept',
      main_idea: '베이즈 규칙을 이산 도메인에 직접 적용',
      formula: 'p^γ(z_s | y, z_t) ∝ p(z_s | y, z_t)^γ × p(z_s | z_t)^(1-γ)',
      key_insight: '기울기 대신 확률 비율을 직접 계산',
      approach: '조건부 모델과 무조건부 모델의 확률을 γ로 가중 조합'
    }
  },
  {
    id: 'dcfg-implementation',
    title: 'D-CFG: 구현 방법',
    icon: <Target className="w-8 h-8" />,
    content: {
      type: 'implementation',
      steps: [
        {
          title: '1단계: 토큰별 분해',
          description: '시퀀스 전체(N^L)가 아닌 토큰별(N개씩) 처리',
          formula: '∏(ℓ=1 to L) p(z_ℓ | y, z_t)',
          benefit: '계산 복잡도를 O(L×N)으로 감소'
        },
        {
          title: '2단계: 확률 계산 및 정규화',
          description: '각 위치에서 조건부/무조건부 확률을 가중 조합',
          pseudocode: `for 각 위치 ℓ:
    for 각 토큰 z':
        p_cond = p_θ(z' | y, z_t)
        p_uncond = p_θ(z' | z_t)
        p_guided = p_cond^γ × p_uncond^(1-γ)
    p_final = p_guided / sum(p_guided)`
        }
      ]
    }
  },
  {
    id: 'dcbg-concept',
    title: 'D-CBG: 분류기 기반 가이던스 - 개념',
    icon: <Settings className="w-8 h-8" />,
    content: {
      type: 'concept',
      main_idea: '한 번에 하나의 토큰만 변경하여 분류기 평가',
      formula: 'p^γ(z_ℓ | z_t, y) ∝ p(y | z_ℓ, z_t)^γ × p(z_ℓ | z_t)',
      key_insight: '부분적 시퀀스 평가로 정규화 문제 해결',
      advantage: '외부 분류기로 복잡한 조건 처리 가능'
    }
  },
  {
    id: 'dcbg-implementation',
    title: 'D-CBG: 구현 및 최적화',
    icon: <Settings className="w-8 h-8" />,
    content: {
      type: 'implementation-optimization',
      basic_method: {
        title: '기본 방법: 위치별 토큰 대체',
        description: '각 위치에서 모든 가능한 토큰으로 대체하여 분류기 평가',
        complexity: 'O(L×N) 분류기 호출',
        code: `for 위치 ℓ:
    for 후보 토큰 z':
        z_temp = [토큰1, ..., z', ..., 토큰L]
        p_cls = p_φ(y | z_temp)`
      },
      optimization: {
        title: '⚡ Taylor 근사 최적화',
        description: '1차 Taylor 전개로 계산량 대폭 감소',
        complexity: 'O(1) + gradient 계산',
        formula: 'p_φ(y | z_new) ≈ exp((z_new - z_old)^T × ∇ + log p_φ(y | z_old))'
      }
    }
  },
  {
    id: 'udlm-problem',
    title: 'UDLM: 기존 마스킹 방식의 한계',
    icon: <Lightbulb className="w-8 h-8" />,
    content: {
      type: 'problem-solution',
      problem: {
        title: '기존 마스킹 방식 (MDLM)의 문제점',
        process: '[A,B,C,D] → [MASK,B,MASK,D] → [A,B,C,D]',
        limitation: '한번 복원된 토큰은 수정 불가',
        impact: '가이던스 신호에 대한 유연한 반응 어려움'
      },
      solution: {
        title: '균등 노이즈 방식 (UDLM)의 해결책',
        process: '[A,B,C,D] → [X,Y,Z,W] → [A,Y,C,W] → [A,B,C,D]',
        advantage: '모든 토큰이 생성 과정 내내 수정 가능',
        benefit: '오류 수정 및 반복적 개선 기회 제공'
      }
    }
  },
  {
    id: 'udlm-math',
    title: 'UDLM: 수학적 개선',
    icon: <Lightbulb className="w-8 h-8" />,
    content: {
      type: 'mathematical',
      problem: '기존 균등 노이즈 모델의 성능 저하 문제',
      solution: '연속 시간 ELBO (Evidence Lower Bound) 도출',
      before: {
        title: '기존 이산 시간 손실',
        formula: 'L = L_recons + L_diffusion + L_prior',
        limitation: '각 항목이 최적화되지 않은 상태'
      },
      after: {
        title: '연속 시간 개선 (T → ∞)',
        improvements: [
          'L_recons → 0 (α_t(0) = 1이므로)',
          'L_prior → 0 (α_t(T) = 0이므로)',
          'L_diffusion만 남아 최적화된 형태'
        ],
        result: 'QM9 데이터셋에서 2.19 → 2.02 perplexity 달성'
      }
    }
  },
  {
    id: 'language-results-overview',
    title: '언어 모델링 성능 - 전체 결과',
    icon: <BarChart3 className="w-8 h-8" />,
    content: {
      type: 'results-table',
      subtitle: 'Perplexity 비교 (낮을수록 좋음)',
      table: {
        headers: ['데이터셋', '어휘크기', 'AR', 'MDLM', 'UDLM'],
        rows: [
          ['Species10', '12', '2.88', '3.17', '3.15 ⭐'],
          ['QM9', '40', '2.19', '2.12', '2.02 🏆'],
          ['CIFAR10', '256', '-', '9.14', '11.21'],
          ['text8', '35', '2.35', '2.62', '2.71'],
          ['Amazon', '30K', '21.67', '24.93', '27.27'],
          ['LM1B', '30K', '22.32', '27.04', '31.28']
        ]
      },
      key_finding: '소규모 어휘에서 UDLM이 강력한 경쟁력 보임'
    }
  },
  {
    id: 'language-results-insights',
    title: '언어 모델링 성능 - 핵심 발견',
    icon: <BarChart3 className="w-8 h-8" />,
    content: {
      type: 'insights',
      findings: [
        {
          title: '🔍 어휘 크기의 영향',
          insight: '소규모 어휘(< 100)에서 UDLM이 경쟁력 있음',
          explanation: '작은 어휘에서는 조합 복잡도가 관리 가능한 수준'
        },
        {
          title: '🔄 균등 노이즈의 재평가',
          insight: '기존 통념과 달리 특정 조건에서 최고 성능 달성',
          explanation: '연속 시간 ELBO와 함께 성능 혁신 달성'
        },
        {
          title: '📈 연속 시간 효과',
          insight: 'T → ∞일 때 성능이 단조적으로 향상',
          explanation: '수학적 엄밀성이 실제 성능으로 이어짐'
        }
      ],
      implication: '분자, DNA 등 과학 도메인에서 확산 모델의 새로운 가능성'
    }
  },
  {
    id: 'guidance-genome',
    title: '가이던스 결과 - 종별 게놈 생성',
    icon: <TestTube className="w-8 h-8" />,
    content: {
      type: 'experiment-detail',
      experiment: '🧬 종별 게놈 생성 (D-CFG)',
      setup: '10개 종의 32,768 bp DNA 서열, 종 라벨을 조건으로 생성',
      results: {
        headers: ['모델', 'γ 변화', 'F1 변화', '안정성'],
        rows: [
          ['AR', '1→3', '0.87→0.74', '❌ 성능 저하'],
          ['MDLM', '1→3', '0.88→0.78', '❌ 성능 저하'],
          ['UDLM', '1→3', '0.91→0.94', '✅ 성능 향상']
        ]
      },
      key_insight: 'UDLM만이 강한 가이던스(높은 γ)에서도 안정적 성능 유지',
      efficiency: '확산 모델이 AR 대비 훨씬 적은 함수 평가로 생성 완료'
    }
  },
  {
    id: 'guidance-molecule',
    title: '가이던스 결과 - 분자 특성 최적화',
    icon: <TestTube className="w-8 h-8" />,
    content: {
      type: 'molecule-results',
      experiments: [
        {
          title: '💊 약물성(QED) 최적화',
          method: 'D-CBG + UDLM',
          result: '유효성과 신규성의 최적 균형 달성',
          comparison: 'AR 모델의 FUDGE 방법 대비 우수한 트레이드오프'
        },
        {
          title: '🔗 분자 고리 수 최적화', 
          method: 'D-CFG + 확산 모델',
          result: 'AR 대비 구조적 특성 제어에서 우수한 성능',
          advantage: 'UDLM이 더 높은 가이던스 강도 수용 가능'
        }
      ],
      pareto_frontier: '기존 방법들보다 우수한 파레토 프론티어 확장',
      validation: '1024개 시퀀스 생성, 유효성/신규성/특성값으로 평가'
    }
  },
  {
    id: 'guidance-image',
    title: '가이던스 결과 - 조건부 이미지 생성',
    icon: <TestTube className="w-8 h-8" />,
    content: {
      type: 'image-results',
      dataset: 'CIFAR10 (이산화된 픽셀 값)',
      method: 'D-CFG를 통한 클래스 조건부 생성',
      results: {
        before: {
          MDLM: 'FID: 33.75, IS: 6.74',
          UDLM: 'FID: 33.65, IS: 6.86'
        },
        after: {
          MDLM: 'FID: 15.56 ⬇️, IS: 9.02 ⬆️',
          UDLM: 'FID: 23.21 ⬇️, IS: 8.66 ⬆️'
        }
      },
      improvement: 'D-CFG 적용시 이미지 품질 대폭 향상',
      efficiency_note: 'UDLM이 빠른 샘플링(적은 T)에서 더 강건함'
    }
  },
  {
    id: 'analysis-efficiency',
    title: '효율성 분석',
    icon: <Cpu className="w-8 h-8" />,
    content: {
      type: 'efficiency-analysis',
      fast_sampling: {
        title: '⚡ 빠른 샘플링에서의 강건함',
        condition: 'T=128 (적은 샘플링 스텝)',
        results: {
          MDLM: 'FID: 64.09 (큰 성능 저하)',
          UDLM: 'FID: 30.48 (안정적 성능)'
        },
        reason: 'UDLM의 토큰 수정 가능성이 빠른 추론에서 장점'
      },
      computational: {
        title: '🔬 계산량 vs 성능 트레이드오프',
        exact: 'O(L×N) 분류기 호출 - 정확하지만 느림',
        approx: 'O(1) + gradient - 빠르고 충분히 효과적',
        practical: 'Taylor 근사가 대부분 상황에서 실용적'
      }
    }
  },
  {
    id: 'analysis-stability',
    title: '가이던스 안정성 분석',
    icon: <Cpu className="w-8 h-8" />,
    content: {
      type: 'stability-analysis',
      gamma_effects: {
        title: '🎛️ 가이던스 강도(γ) 증가에 따른 안정성',
        models: [
          {
            name: 'AR 모델',
            behavior: 'γ ↑ → 성능 ↓',
            status: '❌ 불안정',
            reason: '지역적 토큰 예측의 한계'
          },
          {
            name: 'MDLM',
            behavior: 'γ ↑ → 성능 ↓',
            status: '⚠️ 제한적',
            reason: '고정된 토큰으로 인한 유연성 부족'
          },
          {
            name: 'UDLM',
            behavior: 'γ ↑ → 성능 ↑',
            status: '✅ 안정적',
            reason: '지속적 토큰 수정 가능성'
          }
        ]
      },
      key_insight: '🔑 "수정 가능성"이 가이던스 성능의 핵심 요소'
    }
  },
  {
    id: 'conclusion-achievements',
    title: '주요 성과',
    icon: <Award className="w-8 h-8" />,
    content: {
      type: 'achievements',
      technical: {
        title: '🎯 기술적 성과',
        items: [
          'D-CFG/D-CBG: 이산 가이던스 알고리즘 개발',
          'UDLM: 가이던스 최적화된 모델 설계',
          '연속 시간 ELBO: 수학적 성능 혁신'
        ]
      },
      academic: {
        title: '🌟 학문적 의의',
        items: [
          '통념 전환: 균등 노이즈의 잠재력 재발견',
          '방법론적 통찰: 기울기→확률, 전체→부분',
          '설계 철학: 수정 가능성이 제어의 핵심'
        ]
      },
      practical: {
        title: '🚀 실용적 응용',
        domains: [
          '신약 개발: 분자 특성 최적화',
          '생명정보학: 종별 DNA 서열 설계',
          '재료 과학: 구조-특성 관계 모델링'
        ]
      }
    }
  },
  {
    id: 'conclusion-future',
    title: '향후 연구 방향',
    icon: <Award className="w-8 h-8" />,
    content: {
      type: 'future-directions',
      immediate: {
        title: '🔜 단기 목표',
        items: [
          '대규모 어휘 사이즈로의 확장',
          '다중 조건 가이던스 개발',
          '실시간 제어 생성 구현'
        ]
      },
      longterm: {
        title: '🔮 장기 비전',
        items: [
          '과학 발견 가속화를 위한 AI 도구',
          '개인화된 치료법 설계',
          '지속가능한 소재 개발'
        ]
      },
      impact: {
        title: '🌍 기대 효과',
        description: '이산 확산 모델을 통한 과학 연구의 패러다임 변화',
        fields: ['의학', '화학', '생물학', '재료공학']
      }
    }
  }
];

const PresentationApp = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
        return (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-8">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {slide.title}
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

      case 'overview':
        return (
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-red-500/20 backdrop-blur-sm rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-red-300">🚨 핵심 문제</h3>
                <p className="text-lg leading-relaxed">{content.problem}</p>
              </div>
              
              <div className="bg-blue-500/20 backdrop-blur-sm rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-300">🎯 적용 도메인</h3>
                <div className="flex flex-wrap gap-3">
                  {content.domains.map((domain, idx) => (
                    <span key={idx} className="bg-blue-600/30 px-4 py-2 rounded-lg text-sm font-medium">
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-green-300">🚀 주요 기여</h3>
              <ul className="space-y-4">
                {content.contributions.map((contribution, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-4 mt-1 flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-lg leading-relaxed">{contribution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'comparison':
        return (
          <div className="grid lg:grid-cols-2 gap-8 h-full">
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-3xl font-bold mb-8 text-cyan-300">{content.continuous.title}</h3>
              <div className="space-y-6">
                <div>
                  <span className="text-cyan-200 font-semibold">데이터:</span>
                  <p className="text-lg mt-1">{content.continuous.data}</p>
                </div>
                <div>
                  <span className="text-cyan-200 font-semibold">노이즈:</span>
                  <p className="text-lg mt-1">{content.continuous.noise}</p>
                </div>
                <div>
                  <span className="text-cyan-200 font-semibold">가이던스:</span>
                  <p className="text-lg mt-1">{content.continuous.guidance}</p>
                </div>
                <div>
                  <span className="text-cyan-200 font-semibold">예시:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {content.continuous.examples.map((example, idx) => (
                      <span key={idx} className="bg-cyan-600/30 px-3 py-1 rounded text-sm">{example}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-3xl font-bold mb-8 text-pink-300">{content.discrete.title}</h3>
              <div className="space-y-6">
                <div>
                  <span className="text-pink-200 font-semibold">데이터:</span>
                  <p className="text-lg mt-1">{content.discrete.data}</p>
                </div>
                <div>
                  <span className="text-pink-200 font-semibold">노이즈:</span>
                  <p className="text-lg mt-1">{content.discrete.noise}</p>
                </div>
                <div>
                  <span className="text-pink-200 font-semibold">가이던스:</span>
                  <p className="text-lg mt-1">{content.discrete.guidance}</p>
                </div>
                <div>
                  <span className="text-pink-200 font-semibold">예시:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {content.discrete.examples.map((example, idx) => (
                      <span key={idx} className="bg-pink-600/30 px-3 py-1 rounded text-sm">{example}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'key-difference':
        return (
          <div className="space-y-12">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-green-300">✅ 연속 데이터</h3>
                <div className="space-y-4">
                  <div className="bg-black/30 p-4 rounded font-mono text-lg text-green-200">
                    {content.continuous.formula}
                  </div>
                  <p className="text-lg">{content.continuous.description}</p>
                  <p className="text-sm text-green-200">💡 {content.continuous.advantage}</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-red-300">❌ 이산 데이터</h3>
                <div className="space-y-4">
                  <div className="bg-black/30 p-4 rounded font-mono text-lg text-red-200">
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

      case 'challenge':
        return (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-12">
                <h3 className="text-4xl font-bold mb-8 text-red-300 text-center">{content.title}</h3>
                
                <p className="text-xl leading-relaxed mb-8 text-center">{content.problem}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-500/20 p-6 rounded-lg">
                    <h4 className="font-bold text-green-300 mb-2">연속 데이터</h4>
                    <div className="font-mono text-sm bg-black/30 p-3 rounded">
                      {content.examples.continuous}
                    </div>
                  </div>
                  <div className="bg-red-500/20 p-6 rounded-lg">
                    <h4 className="font-bold text-red-300 mb-2">이산 데이터</h4>
                    <div className="font-mono text-sm bg-black/30 p-3 rounded">
                      {content.examples.discrete}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-yellow-500/20 rounded-lg">
                  <p className="text-lg text-center"><strong>영향:</strong> {content.impact}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'dual-challenge':
        return (
          <div className="grid lg:grid-cols-2 gap-8 h-full">
            <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-red-300">{content.challenge1.title}</h3>
              <p className="text-lg mb-6 leading-relaxed">{content.challenge1.problem}</p>
              <div className="bg-black/30 p-4 rounded">
                <p className="font-mono text-yellow-300">{content.challenge1.example}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-orange-300">{content.challenge2.title}</h3>
              <p className="text-lg mb-6 leading-relaxed">{content.challenge2.problem}</p>
              <div className="bg-black/30 p-4 rounded">
                <p className="text-sm">{content.challenge2.comparison}</p>
              </div>
            </div>
          </div>
        );

      case 'concept':
        return (
          <div className="space-y-12">
            <div className="text-center bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-blue-300">핵심 아이디어</h3>
              <p className="text-xl mb-6">{content.main_idea}</p>
              <div className="bg-black/30 p-6 rounded-lg">
                <code className="text-lg text-cyan-300">{content.formula}</code>
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

      case 'implementation':
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
                      <div className="font-mono text-cyan-300 mb-4">{step.formula}</div>
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

      case 'implementation-optimization':
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
                <code className="text-sm text-cyan-300">{content.optimization.formula}</code>
              </div>
            </div>
          </div>
        );

      case 'problem-solution':
        return (
          <div className="grid lg:grid-cols-2 gap-8 h-full">
            <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-red-300">{content.problem.title}</h3>
              <div className="space-y-6">
                <div className="bg-black/30 p-4 rounded font-mono text-sm">
                  {content.problem.process}
                </div>
                <div className="bg-red-600/20 p-4 rounded">
                  <p className="text-red-200 font-semibold">❌ 문제점: {content.problem.limitation}</p>
                </div>
                <p className="text-lg">{content.problem.impact}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-green-300">{content.solution.title}</h3>
              <div className="space-y-6">
                <div className="bg-black/30 p-4 rounded font-mono text-sm">
                  {content.solution.process}
                </div>
                <div className="bg-green-600/20 p-4 rounded">
                  <p className="text-green-200 font-semibold">✅ 장점: {content.solution.advantage}</p>
                </div>
                <p className="text-lg">{content.solution.benefit}</p>
              </div>
            </div>
          </div>
        );

      case 'mathematical':
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
                  <code className="text-yellow-300">{content.before.formula}</code>
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

      case 'results-table':
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

      case 'insights':
        return (
            <div className="grid lg:grid-cols-3 gap-8">
                {content.findings.map((finding, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-8">
                    <h3 className="text-xl font-bold mb-4 text-cyan-300">{finding.title}</h3>
                    <div className="space-y-4">
                      <div className="bg-yellow-500/20 p-4 rounded-lg">
                        <p className="font-semibold text-yellow-300">💡 발견</p>
                        <p className="text-sm mt-2">{finding.insight}</p>
                      </div>
                      <div className="bg-blue-500/20 p-4 rounded-lg">
                        <p className="font-semibold text-blue-300">📝 설명</p>
                        <p className="text-sm mt-2">{finding.explanation}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="lg:col-span-3 bg-gradient-to-r from-green-500/30 to-emerald-500/30 backdrop-blur-sm rounded-xl p-8 text-center">
                  <h3 className="text-2xl font-bold text-green-300 mb-4">🚀 실용적 의미</h3>
                  <p className="text-xl">{content.implication}</p>
                </div>
            </div>
        );

      case 'experiment-detail':
        return (
          <div className="space-y-8">
            <div className="text-center bg-blue-500/20 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-2xl font-bold text-blue-300 mb-4">{content.experiment}</h3>
              <p className="text-lg">{content.setup}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <table className="w-full text-lg">
                <thead>
                  <tr className="border-b-2 border-white/20">
                    {content.results.headers.map((header, idx) => (
                      <th key={idx} className="text-left p-4 font-bold text-yellow-300">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.results.rows.map((row, idx) => (
                    <tr key={idx} className="border-b border-white/10">
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="p-4">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-green-500/20 backdrop-blur-sm rounded-xl p-8">
                <h4 className="text-xl font-bold text-green-300 mb-4">💡 핵심 통찰</h4>
                <p className="text-lg">{content.key_insight}</p>
              </div>
              <div className="bg-blue-500/20 backdrop-blur-sm rounded-xl p-8">
                <h4 className="text-xl font-bold text-blue-300 mb-4">⚡ 효율성</h4>
                <p className="text-lg">{content.efficiency}</p>
              </div>
            </div>
          </div>
        );

      case 'molecule-results':
        return (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {content.experiments.map((exp, idx) => (
                <div key={idx} className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-8">
                  <h3 className="text-xl font-bold mb-4 text-purple-300">{exp.title}</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="font-semibold text-purple-200">방법:</span>
                      <p className="mt-1">{exp.method}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-purple-200">결과:</span>
                      <p className="mt-1">{exp.result}</p>
                    </div>
                    <div className="bg-green-500/20 p-3 rounded">
                      <p className="text-green-300 text-sm">{exp.comparison || exp.advantage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-500/30 to-green-500/30 backdrop-blur-sm rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-yellow-300 mb-4">📈 {content.pareto_frontier}</h3>
              <p className="text-lg text-gray-300">{content.validation}</p>
            </div>
          </div>
        );

      case 'image-results':
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

      case 'efficiency-analysis':
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

      case 'stability-analysis':
        return (
          <div className="space-y-8">
            <div className="text-center bg-blue-500/20 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-2xl font-bold text-blue-300">{content.gamma_effects.title}</h3>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {content.gamma_effects.models.map((model, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-600/20 to-gray-500/20 backdrop-blur-sm rounded-xl p-8">
                  <h4 className="text-xl font-bold mb-4 text-white">{model.name}</h4>
                  <div className="space-y-4">
                    <div className="bg-black/30 p-3 rounded">
                      <p className="font-mono text-sm">{model.behavior}</p>
                    </div>
                    <div className={`p-3 rounded text-center font-bold ${
                      model.status === '✅ 안정적' ? 'bg-green-500/20 text-green-300' :
                      model.status === '⚠️ 제한적' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {model.status}
                    </div>
                    <div className="bg-blue-500/20 p-3 rounded">
                      <p className="text-sm text-blue-200">{model.reason}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-yellow-500/30 to-orange-500/30 backdrop-blur-sm rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-yellow-300">{content.key_insight}</h3>
            </div>
          </div>
        );

      case 'achievements':
        return (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-cyan-300">{content.technical.title}</h3>
              <ul className="space-y-4">
                {content.technical.items.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="bg-cyan-500 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-4 mt-1 flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-pink-300">{content.academic.title}</h3>
              <ul className="space-y-4">
                {content.academic.items.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="bg-pink-500 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-4 mt-1 flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-emerald-300">{content.practical.title}</h3>
              <ul className="space-y-4">
                {content.practical.domains.map((domain, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="bg-emerald-500 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-4 mt-1 flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{domain}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'future-directions':
        return (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-cyan-300">{content.immediate.title}</h3>
                <ul className="space-y-3">
                  {content.immediate.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-cyan-400 mr-3 mt-1">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-pink-300">{content.longterm.title}</h3>
                <ul className="space-y-3">
                  {content.longterm.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-pink-400 mr-3 mt-1">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-green-300">{content.impact.title}</h3>
              <p className="text-xl mb-6">{content.impact.description}</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {content.impact.fields.map((field, idx) => (
                  <span key={idx} className="bg-green-600/30 px-4 py-2 rounded-lg font-medium">
                    {field}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return <div>슬라이드 내용을 불러올 수 없습니다.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* 네비게이션 바 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-bold">이산 확산 모델 가이던스</h1>
            <span className="text-sm opacity-75">
              {currentSlide + 1} / {slides.length}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto max-w-2xl">
            {slides.map((slide, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`p-2 rounded-lg transition-all flex-shrink-0 ${
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
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              disabled={currentSlide === slides.length - 1}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-sm"
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
      <div className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-md border-t border-white/10 p-4">
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