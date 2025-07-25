# 슬라이드 6: 문제 2: 조합 폭발 & 정규화 복잡성

**(슬라이드 전환 후 잠시 멈춤)**

---

### **슬라이드 소개 및 두 번째 문제 정의 (0:00 ~ 0:30)**

"이어서 이산 확산 모델에서 가이던스를 적용하기 어려운 두 번째 주요 문제점들을 살펴보겠습니다. 이 슬라이드는 두 가지 상호 연관된 어려움을 보여줍니다. 바로 '조합 폭발'과 이로 인한 '정규화 상수의 복잡성'입니다."

---

### **조합 폭발 문제 설명 (0:30 ~ 1:15)**

"먼저 왼쪽을 보시면 '조합 폭발' 문제입니다. 이산 데이터는 토큰의 시퀀스로 이루어져 있습니다. 예를 들어, 어휘 크기가 N이고 시퀀스 길이가 L이라면, 가능한 전체 시퀀스의 수는 N의 L제곱이 됩니다. 가이던스를 적용하려면 우리가 원하는 조건(y) 하에서 특정 시퀀스(z)가 나타날 확률 p(z|y)를 계산해야 하는데, 이론적으로는 가능한 모든 시퀀스 조합을 고려해야 합니다.

슬라이드의 예시처럼, 어휘 크기가 1000이고 길이가 10인 시퀀스만 해도 가능한 조합은 1000의 10제곱, 즉 10의 30제곱이라는 천문학적인 숫자가 됩니다. 실제 언어 모델이나 DNA 서열처럼 어휘 크기와 길이가 훨씬 큰 경우에는 이 숫자는 상상조차 하기 어렵게 커집니다. 이렇게 가능한 모든 조합을 일일이 계산하는 것은 현실적으로 불가능합니다."

---

### **정규화 상수 복잡성 문제 설명 (1:15 ~ 1:50)**

"이 조합 폭발 문제는 곧바로 '정규화 상수의 복잡성'으로 이어집니다. 확률 분포를 다룰 때는 모든 가능한 경우의 확률을 합하면 1이 되어야 한다는 정규화 조건이 매우 중요합니다. 연속 데이터에서는 이 정규화가 적분을 통해 비교적 효율적으로 처리될 수 있습니다.

하지만 이산 데이터에서는 가능한 모든 경우의 확률을 '합하는' 방식으로 정규화를 수행해야 합니다. 조합 폭발 때문에 이 합산 과정의 계산량이 기하급수적으로 증가하게 됩니다. 이는 이산 확산 모델에서 정확한 확률 계산과 그에 기반한 가이던스를 매우 어렵게 만듭니다."

---

### **문제 요약 및 다음 슬라이드 예고 (1:50 ~ 2:00)**

"결론적으로, 이산 데이터의 미분 불가능성과 조합 폭발 문제는 기존 가이던스 기법을 무력화시키는 주요 원인입니다. 다음 장에서는 이러한 난관을 극복하기 위해 이 연구가 제안하는 첫 번째 해결책, 분류기 없는 가이던스인 D-CFG의 개념에 대해 알아보겠습니다."
