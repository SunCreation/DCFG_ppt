# 슬라이드 16: 가이던스 결과 - 분자 특성 최적화

**(슬라이드 전환 후 잠시 멈춤)**

---

### **슬라이드 소개 및 분자 데이터의 중요성 (0:00 ~ 0:30)**

"생물 정보학의 DNA 서열에 이어, 신약 개발과 재료 과학에서 매우 중요한 이산 데이터인 '분자 구조'에 대한 가이던스 실험 결과를 살펴보겠습니다. 분자 구조는 원자와 결합이라는 이산적인 요소들로 이루어져 있으며, 특정 물리화학적 특성을 갖는 분자를 생성하는 것은 매우 어려운 문제입니다."

---

### **실험 1: 약물성(QED) 최적화 (0:30 ~ 1:10)**

"첫 번째 실험은 분자의 '약물성(QED: Quantitative Estimation of Drug-likeness)'을 최적화하는 것입니다. QED는 분자가 약물로서 얼마나 적합한지를 나타내는 지표로, 높을수록 좋습니다. 이 실험에서는 D-CBG 가이던스 기법과 UDLM 모델을 사용했습니다.

결과는 UDLM과 D-CBG 조합이 생성된 분자의 '유효성(Validity)'과 '신규성(Novelty)' 사이에서 최적의 균형을 달성했다는 것을 보여줍니다. 단순히 높은 QED 값을 갖는 분자를 생성하는 것을 넘어, 실제로 유효하고 기존에 없던 새로운 분자를 잘 생성해냈습니다. 이는 AR 모델의 FUDGE 방법과 비교했을 때 우수한 트레이드오프 성능을 보였습니다."

---

### **실험 2: 분자 고리 수 최적화 (1:10 ~ 1:45)**

"두 번째 실험은 분자의 '고리 수'를 제어하는 것입니다. 분자의 고리 수는 안정성 등 다양한 특성에 영향을 미칩니다. 이 실험에서는 D-CFG 가이던스 기법과 확산 모델을 사용했습니다.

결과에 따르면, 확산 모델과 D-CFG 조합은 AR 모델 대비 분자의 고리 수와 같은 '구조적 특성 제어'에서 우수한 성능을 보였습니다. 특히 UDLM 모델은 더 높은 가이던스 강도(γ)에서도 안정적으로 원하는 고리 수를 가진 분자를 잘 생성해내는 강점을 보였습니다."

---

### **종합 결과 및 검증 (1:45 ~ 1:55)**

"이러한 분자 실험 결과들은 이 연구의 방법론이 기존 방법들보다 우수한 '파레토 프론티어'를 확장했음을 보여줍니다. 즉, 여러 상반된 목표(예: 유효성과 신규성)를 동시에 최적화하는 능력에서 뛰어남을 입증했습니다.

이 결과들은 1024개의 생성된 시퀀스에 대해 유효성, 신규성, 그리고 목표 특성값(QED 또는 고리 수)을 정량적으로 평가하여 얻어졌습니다."

---

### **마무리 및 다음 슬라이드 예고 (1:55 ~ 2:00)**

"분자 특성 최적화 결과는 이산 확산 모델이 과학 발견 분야에서 강력한 도구가 될 잠재력을 보여줍니다. 이산 데이터는 아니지만, 이 연구의 가이던스 기법이 이미지와 같은 연속 데이터에도 적용될 수 있음을 보여주는 실험도 있습니다. 다음 장에서는 조건부 이미지 생성 결과를 살펴보겠습니다."
