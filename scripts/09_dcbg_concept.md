# 슬라이드 9: D-CBG: 분류기 기반 가이던스 - 개념

**(슬라이드 전환 후 잠시 멈춤)**

---

### **슬라이드 소개 및 D-CBG 개요 (0:00 ~ 0:40)**

"이번에는 이 연구가 제안하는 또 다른 이산 가이던스 방법인 'D-CBG', 즉 '이산 분류기 기반 가이던스(Discrete Classifier-Based Guidance)'의 개념을 살펴보겠습니다. D-CFG가 확산 모델 자체를 사용했다면, D-CBG는 이름처럼 별도의 '분류기(Classifier)' 모델을 활용하여 가이던스를 수행합니다."

---

### **핵심 아이디어: 토큰 변경 및 분류기 평가 (0:40 ~ 1:30)**

"D-CBG의 핵심 아이디어는 생성 과정 중에 '한 번에 하나의 토큰만 변경'해보고, 그 변경이 우리가 원하는 조건(y)에 얼마나 잘 맞는지를 외부 분류기 모델을 통해 평가하는 것입니다. 그리고 이 평가 결과를 바탕으로 다음 확산 스텝에서 어떤 토큰을 선택할지 결정합니다.

슬라이드 중앙의 수식을 봐주세요. 이 수식은 가이던스가 적용된 특정 위치 ℓ의 토큰 확률 p^γ(z_ℓ | z_t, y)이 분류기 확률 p(y | z_ℓ, z_t)와 무조건부 확산 모델 확률 p(z_ℓ | z_t)를 가이던스 강도 γ로 가중 조합하여 얻어진다는 것을 보여줍니다. 여기서 p(y | z_ℓ, z_t)는 현재 상태 z_t에서 위치 ℓ의 토큰을 z_ℓ로 변경했을 때, 전체 시퀀스가 조건 y에 해당할 확률을 분류기가 예측한 값입니다."

---

### **핵심 통찰 및 장점 (1:30 ~ 1:50)**

"이 방법의 핵심 통찰은 '부분적 시퀀스 평가로 정규화 문제를 해결한다'는 것입니다. D-CFG처럼 전체 시퀀스 조합을 고려하는 대신, 각 위치에서 가능한 토큰 변경에 대해서만 분류기를 평가합니다. 이렇게 하면 전체 시퀀스에 대한 복잡한 정규화 상수 계산 없이도 가이던스 효과를 얻을 수 있습니다.

D-CBG의 주요 장점은 '외부 분류기로 복잡한 조건 처리 가능'하다는 점입니다. 확산 모델 학습과는 독립적으로 학습된 강력한 분류기를 활용하여, 텍스트의 복잡한 의미나 분자의 특정 물리적 특성과 같은 다양한 조건을 가이던스에 반영할 수 있습니다."

---

### **다음 슬라이드 예고 (1:50 ~ 2:00)**

"D-CBG는 분류기를 활용하여 유연한 가이던스를 제공하지만, 각 위치마다 분류기를 여러 번 호출해야 하는 비효율성이 있습니다. 다음 장에서는 이 D-CBG의 구현 방법과 효율성을 개선하기 위한 최적화 기법에 대해 자세히 알아보겠습니다."
