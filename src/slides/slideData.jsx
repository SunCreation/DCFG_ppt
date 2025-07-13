import React from 'react';
import { Home, FileText, Zap, Target, Settings, BarChart3, Award, Lightbulb, Brain, Cpu, TestTube } from 'lucide-react';

export const slides = [
  {
    id: 'title',
    title: '이산 확산 모델을 위한 간단한 가이던스 메커니즘',
    icon: <Home className="w-5 h-5" />,
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
    icon: <FileText className="w-5 h-5" />,
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
    icon: <Brain className="w-5 h-5" />,
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
    icon: <Zap className="w-5 h-5" />,
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
    icon: <Zap className="w-5 h-5" />,
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
    icon: <Zap className="w-5 h-5" />,
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
    icon: <Target className="w-5 h-5" />,
    content: {
      type: 'concept',
      main_idea: '베이즈 규칙을 이산 도메인에 직접 적용',
      formula: 'p^\\gamma(z_s | y, z_t) \\propto p(z_s | y, z_t)^\\gamma \\times p(z_s | z_t)^(1-\\gamma)',
      key_insight: '기울기 대신 확률 비율을 직접 계산',
      approach: '조건부 모델과 무조건부 모델의 확률을 γ로 가중 조합'
    }
  },
  {
    id: 'dcfg-implementation',
    title: 'D-CFG: 구현 방법',
    icon: <Target className="w-5 h-5" />,
    content: {
      type: 'implementation',
      steps: [
        {
          title: '1단계: 토큰별 분해',
          description: '시퀀스 전체(N^L)가 아닌 토큰별(N개씩) 처리',
          formula: '\\prod_{\\ell=1}^L p(z_\\ell | y, z_t)',
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
    icon: <Settings className="w-5 h-5" />,
    content: {
      type: 'concept',
      main_idea: '한 번에 하나의 토큰만 변경하여 분류기 평가',
      formula: 'p^\\gamma(z_\\ell | z_t, y) \\propto p(y | z_\\ell, z_t)^\\gamma \\times p(z_\\ell | z_t)',
      key_insight: '부분적 시퀀스 평가로 정규화 문제 해결',
      advantage: '외부 분류기로 복잡한 조건 처리 가능'
    }
  },
  {
    id: 'dcbg-implementation',
    title: 'D-CBG: 구현 및 최적화',
    icon: <Settings className="w-5 h-5" />,
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
        formula: 'p_\\phi(y | z_{new}) \\approx \\exp((z_{new} - z_{old})^T \\times \\nabla + \\log p_\\phi(y | z_{old}))'
      }
    }
  },
  {
    id: 'udlm-problem',
    title: 'UDLM: 기존 마스킹 방식의 한계',
    icon: <Lightbulb className="w-5 h-5" />,
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
    icon: <Lightbulb className="w-5 h-5" />,
    content: {
      type: 'mathematical',
      problem: '기존 균등 노이즈 모델의 성능 저하 문제',
      solution: '연속 시간 ELBO (Evidence Lower Bound) 도출',
      before: {
        title: '기존 이산 시간 손실',
        formula: 'L = L_{recons} + L_{diffusion} + L_{prior}',
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
    icon: <BarChart3 className="w-5 h-5" />,
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
    icon: <BarChart3 className="w-5 h-5" />,
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
    icon: <TestTube className="w-5 h-5" />,
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
    icon: <TestTube className="w-5 h-5" />,
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
    icon: <TestTube className="w-5 h-5" />,
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
    icon: <Cpu className="w-5 h-5" />,
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
    icon: <Cpu className="w-5 h-5" />,
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
    icon: <Award className="w-5 h-5" />,
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
    icon: <Award className="w-5 h-5" />,
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
