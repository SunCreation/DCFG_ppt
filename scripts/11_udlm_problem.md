# 슬라이드 11: UDLM: 기존 마스킹 방식의 한계

**(슬라이드 전환 후 잠시 멈춤)**

---

### **슬라이드 소개 및 문제 정의 (0:00 ~ 0:40)**

"앞서 D-CFG와 D-CBG라는 이산 가이던스 기법을 살펴보았습니다. 이러한 가이던스 기법의 효과를 극대화하기 위해서는 확산 모델 자체의 구조도 중요합니다. 이 슬라이드에서는 기존 이산 확산 모델, 특히 MDLM(Masked Diffusion Language Model)과 같은 모델이 가졌던 구조적인 한계와, 이를 UDLM(Uniform Diffusion Language Model)이 어떻게 해결했는지 설명합니다."

---

### **기존 마스킹 방식의 문제점 (0:40 ~ 1:30)**

"기존의 마스킹 기반 이산 확산 모델은 생성 과정에서 토큰을 마스킹하고 이를 복원하는 방식을 사용합니다. 슬라이드 왼쪽에 예시가 있습니다. [A, B, C, D]라는 시퀀스에서 일부 토큰이 마스킹([MASK], B, [MASK], D)되고, 모델은 마스킹된 토큰을 예측하여 복원합니다. 예를 들어 A와 C를 복원하면 다시 [A, B, C, D]가 됩니다.

문제는 '한번 복원된 토큰은 수정 불가'하다는 점입니다. 즉, 모델이 A를 예측하여 복원했다면, 이후 확산 과정에서 이 A는 고정되어 더 이상 다른 토큰으로 변경될 수 없습니다. 이는 가이던스 신호가 들어왔을 때, 이미 복원된 토큰이 가이던스 방향과 맞지 않더라도 이를 수정할 수 없다는 치명적인 한계를 만듭니다. 결과적으로 가이던스 신호에 대해 유연하게 반응하고 생성 방향을 정교하게 조정하기 어렵게 됩니다."

---

### **UDLM의 해결책: 균등 노이즈 방식 (1:30 ~ 1:50)**

"UDLM은 이러한 한계를 극복하기 위해 '균등 노이즈 방식'을 도입합니다. 슬라이드 오른쪽에 예시가 있습니다. UDLM은 마스킹 대신, 데이터의 각 토큰을 무작위의 '균등 분포 토큰'으로 치환하여 노이즈를 추가합니다. [A, B, C, D]가 [X, Y, Z, W]처럼 완전히 무작위 토큰으로 변할 수 있습니다.

그리고 역 과정에서는 이 무작위 토큰들을 원래 데이터의 토큰으로 점진적으로 복원합니다. 여기서 중요한 점은 '모든 토큰이 생성 과정 내내 수정 가능'하다는 것입니다. 한번 복원된 토큰이라도 이후 확산 스텝에서 다시 무작위 토큰으로 변했다가 다른 토큰으로 복원될 수 있습니다."

---

### **장점 및 다음 슬라이드 예고 (1:50 ~ 2:00)**

"이러한 유연성은 가이던스 신호에 따라 생성 과정을 반복적으로 개선하고 오류를 수정할 수 있는 기회를 제공합니다. 다음 장에서는 이 UDLM의 수학적인 개선점과 이것이 성능에 어떤 영향을 미치는지 알아보겠습니다."
