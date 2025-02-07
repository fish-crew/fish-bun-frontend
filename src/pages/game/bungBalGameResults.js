const bungBalGameResults = [
  {
    type: "팥 붕어빵",
    mbti: "ISTJ",
    slogan: "근본은 영원하다!",
    bestMatch: "슈크림 붕어빵",
    bestMatchImg: "/assets/webp/flavorIcons/custard.webp",
    worstMatch: "타코야끼 붕어빵",
    worstMatchImg: "/assets/webp/flavorIcons/tako.webp",
    description: [
      "전통적인 가치를 중요하게 여김.",
      "책임감이 강하고 신뢰할 수 있음.",
      "변화를 좋아하지 않고 안정적인 것을 선호.",
      "오랜 기간 사랑받는 클래식한 스타일.",
    ],
    image: "/assets/webp/flavorIcons/redbean.webp",
  },
  {
    type: "슈크림 붕어빵",
    mbti: "ESFP",
    slogan: "부드럽고 달콤한 게 최고지!",
    bestMatch: "팥 붕어빵",
    bestMatchImg: "/assets/webp/flavorIcons/redbean.webp",
    worstMatch: "흑임자 붕어빵",
    worstMatchImg: "/assets/webp/flavorIcons/black-sesame.webp",
    description: [
      "활발하고 에너지가 넘치는 성격.",
      "새로운 경험을 좋아하고 사람들과 어울리기 좋아함.",
      "즉흥적인 면이 많고 감각적인 삶을 즐김.",
      "밝고 긍정적인 분위기를 만드는 사람.",
    ],
    image: "/assets/webp/flavorIcons/custard.webp",
  },
  {
    type: "초코 붕어빵",
    mbti: "ENFP",
    slogan: "팥만 먹는 건 너무 지루해!",
    bestMatch: "고구마 붕어빵",
    bestMatchImg: "/assets/webp/flavorIcons/guma.webp",
    worstMatch: "김치 붕어빵",
    worstMatchImg: "/assets/webp/flavorIcons/kimchi.webp",
    description: [
      "즉흥적이고 창의적인 성격.",
      "새로운 아이디어를 떠올리는 걸 좋아함.",
      "긍정적이고 활기찬 에너지를 주변에 전파함.",
      "다양한 가능성을 탐색하는 것을 즐김.",
    ],
    image: "/assets/webp/flavorIcons/choco.webp",
  },
  {
    type: "고구마 붕어빵",
    mbti: "INFJ",
    slogan: "자극적이지 않아도 충분히 매력적일 수 있어.",
    bestMatch: "초코 붕어빵",
    bestMatchImg: "/assets/webp/flavorIcons/choco.webp",
    worstMatch: "뿌링클 붕어빵",
    worstMatchImg: "/assets/webp/flavorIcons/bburing.webp",
    description: [
      "조용하지만 깊이 있는 사고를 함.",
      "자기만의 철학과 가치관이 확고함.",
      "타인을 돕는 것에 보람을 느끼는 스타일.",
      "신중하고 계획적인 성향.",
    ],
    image: "/assets/webp/flavorIcons/guma.webp",
  },
  {
    type: "미니 붕어빵",
    mbti: "ESTP",
    slogan: "한 개만 먹는 건 말이 안 되지!",
    bestMatch: "대왕 붕어빵",
    bestMatchImg: "/assets/webp/flavorIcons/king.webp",
    worstMatch: "팥 크림치즈 붕어빵",
    worstMatchImg: "/assets/webp/flavorIcons/redbean-cream-cheese.webp",
    description: [
      "즉흥적이고 유쾌한 성격.",
      "새로운 경험을 즐기고 도전을 두려워하지 않음.",
      "사교성이 뛰어나며 주변 분위기를 띄우는 능력이 있음.",
      "직접 몸으로 부딪히면서 배우는 타입.",
    ],
    image: "/assets/webp/flavorIcons/mini.webp",
  },
  {
    type: "김치 붕어빵",
    mbti: "ENTJ",
    slogan: "팥? 슈크림? 강렬하게 가야지!",
    bestMatch: "피자 붕어빵",
    bestMatchImg: "/assets/webp/flavorIcons/pizza.webp",
    worstMatch: "초코 붕어빵",
    worstMatchImg: "/assets/webp/flavorIcons/choco.webp",
    description: [
      "강한 리더십과 추진력이 있음.",
      "목표를 세우고 이를 달성하기 위해 노력함.",
      "논리적이고 전략적인 사고를 선호.",
      "자신의 신념을 강하게 주장하는 스타일.",
    ],
    image: "/assets/webp/flavorIcons/kimchi.webp",
  },
  {
    type: "피자 붕어빵",
    mbti: "ENTP",
    slogan: "붕어빵도 변화해야지! 늘 똑같으면 재미없잖아!",
    bestMatch: "김치 붕어빵",
    bestMatchImg: "/assets/webp/flavorIcons/kimchi.webp",
    worstMatch: "팥 크림치즈 붕어빵",
    worstMatchImg: "/assets/webp/flavorIcons/redbean-cream-cheese.webp",
    description: [
      "혁신적이고 논쟁을 즐기는 성향.",
      "새로운 시도를 즐기며 정형화된 틀을 깨는 걸 좋아함.",
      "유머 감각이 뛰어나고 재치가 있음.",
      "다양한 분야에서 아이디어를 내는 걸 좋아함.",
    ],
    image: "/assets/webp/flavorIcons/pizza.webp",
  },
  {
    type: "팥 크림치즈 붕어빵",
    mbti: "INFP",
    slogan: "팥만 있는 건 아쉬워… 부드러움도 같이 느끼고 싶어!",
    bestMatch: "흑임자 붕어빵",
    bestMatchImg: "/assets/webp/flavorIcons/black-sesame.webp",
    worstMatch: "미니 붕어빵",
    worstMatchImg: "/assets/webp/flavorIcons/mini.webp",
    description: [
      "감성적이고 창의적인 성향.",
      "자기만의 세계가 확고하며 독창적인 아이디어를 선호함.",
      "이해심이 많고 타인을 배려하는 스타일.",
      "깊이 있는 관계를 중요하게 생각함.",
    ],
    image: "/assets/webp/flavorIcons/redbean-cream-cheese.webp",
  },
];

export function matchBungBalType(userAnswers) {
  let mbtiScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  // 사용자의 MBTI 점수 계산
  userAnswers.forEach((answerObj) => {
    if (answerObj.mbti) {
      Object.keys(answerObj.mbti).forEach((trait) => {
        mbtiScores[trait] += answerObj.mbti[trait];
      });
    }
  });

  // 정규화 (값이 너무 크거나 작아지는 걸 방지)
  let totalResponses = userAnswers.length || 1;
  Object.keys(mbtiScores).forEach((key) => {
    mbtiScores[key] = Math.round((mbtiScores[key] / totalResponses) * 10);
  });

  // MBTI 유형 결정
  const mbtiType =
    (mbtiScores.E >= mbtiScores.I ? "E" : "I") +
    (mbtiScores.S >= mbtiScores.N ? "S" : "N") +
    (mbtiScores.T >= mbtiScores.F ? "T" : "F") +
    (mbtiScores.J >= mbtiScores.P ? "J" : "P");

  // console.log("User MBTI Type:", mbtiType);

  // 1. 사용자의 MBTI와 완벽하게 일치하는 붕어빵 찾기
  let bestMatch = bungBalGameResults.find((result) => result.mbti === mbtiType);

  // 2. 완벽한 일치가 없으면, 가장 가까운 MBTI 유형 찾기
  if (!bestMatch) {
    let highestMatchScore = -Infinity;
    let closestMatch = null;

    bungBalGameResults.forEach((result) => {
      let similarityScore = 0;
      for (let i = 0; i < 4; i++) {
        if (result.mbti[i] === mbtiType[i]) similarityScore++;
      }

      if (similarityScore > highestMatchScore) {
        highestMatchScore = similarityScore;
        closestMatch = result;
      }
    });

    bestMatch = closestMatch;
  }

  return bestMatch;
}

// 🚨 `default export`도 유지
export default bungBalGameResults;
