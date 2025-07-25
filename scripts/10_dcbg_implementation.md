# 슬라이드 10: D-CBG: 구현 및 최적화

**(슬라이드 전환 후 잠시 멈춤)**

---

### **슬라이드 소개 및 구현의 필요성 (0:00 ~ 0:30)**

"D-CBG는 외부 분류기를 활용하여 유연한 가이던스를 제공하지만, 이를 효율적으로 구현하는 것이 중요합니다. 이 슬라이드에서는 D-CBG의 기본적인 구현 방식과, 계산 비용을 획기적으로 줄이는 최적화 기법에 대해 알아보겠습니다."

---

### **기본 방법: 위치별 토큰 대체 (0:30 ~ 1:15)**

"D-CBG의 기본적인 구현 방법은 슬라이드 왼쪽에 설명되어 있습니다. 확산 과정의 각 스텝에서, 우리는 시퀀스의 각 위치(ℓ)를 순회합니다. 그리고 해당 위치의 원래 토큰을 어휘에 있는 '모든 가능한 후보 토큰(z')'으로 하나씩 대체해 봅니다.

각 후보 토큰으로 대체된 임시 시퀀스(z_temp)에 대해, 우리는 외부 분류기 모델을 호출하여 이 시퀀스가 우리가 원하는 조건(y)에 얼마나 잘 맞는지를 평가합니다. 즉, p_φ(y | z_temp) 값을 계산하는 것이죠. 이 과정을 모든 위치와 모든 후보 토큰에 대해 반복합니다.

이 방법의 계산 복잡도는 어떻게 될까요? 시퀀스 길이 L에 대해 각 위치마다 어휘 크기 N만큼의 후보 토큰을 평가해야 하므로, 한 확산 스텝에서 총 L × N번의 분류기 호출이 필요합니다. 어휘 크기가 크면 이 계산량은 여전히 상당한 부담이 될 수 있습니다."

---

### **최적화: Taylor 근사 활용 (1:15 ~ 1:50)**

"이러한 계산 부담을 줄이기 위해 연구진은 영리한 최적화 기법을 도입했습니다. 바로 '1차 Taylor 근사'를 활용하는 것입니다. 슬라이드 오른쪽에 있는 수식이 이를 보여줍니다.

아이디어는 이렇습니다. 각 위치에서 토큰을 변경했을 때 분류기 확률이 어떻게 변할지를 정확히 계산하는 대신, 원래 토큰에서의 분류기 확률과 해당 위치에서의 '기울기' 정보를 사용하여 변화량을 근사하는 것입니다. 연속 공간의 Taylor 근사 아이디어를 이산적인 토큰 변화에 적용한 것이죠.

이 방법을 사용하면 각 위치에서 모든 후보 토큰에 대해 분류기를 일일이 호출할 필요 없이, 원래 시퀀스에 대한 분류기 평가와 한 번의 기울기 계산만으로도 각 후보 토큰에 대한 분류기 확률을 근사할 수 있습니다. 이 덕분에 계산 복잡도가 O(L×N)에서 O(1) + 기울기 계산 비용으로 대폭 감소합니다. 대부분의 실제 상황에서 이 Taylor 근사는 충분히 효과적이면서 훨씬 빠릅니다."

---

### **마무리 및 다음 슬라이드 예고 (1:50 ~ 2:00)**

"D-CBG는 분류기의 힘을 빌려 유연한 가이던스를 제공하며, Taylor 근사를 통해 효율성까지 확보했습니다. 하지만 기존의 이산 확산 모델 자체에도 가이던스를 어렵게 하는 구조적인 문제가 있었습니다. 다음 장에서는 UDLM이라는 새로운 모델이 기존 모델의 어떤 한계를 극복했는지 알아보겠습니다."
