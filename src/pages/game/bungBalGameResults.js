const bungBalGameResults = [
  {
    type: "팥 붕어빵",
    mbti: "ISTJ",
    description: "원칙적이고 신뢰할 수 있음",
    image: "/assets/webp/flavorIcons/redbean.webp",
  },
  {
    type: "슈크림 붕어빵",
    mbti: "ESFP",
    description: "활발하고 에너지 넘침",
    image: "/assets/webp/flavorIcons/custard.webp",
  },
  {
    type: "초코 붕어빵",
    mbti: "ENFP",
    description: "즉흥적이고 창의적임",
    image: "/assets/webp/flavorIcons/choco.webp",
  },
  {
    type: "고구마 붕어빵",
    mbti: "INFJ",
    description: "조용하지만 깊이 있는 사고",
    image: "/assets/webp/flavorIcons/guma.webp",
  },
  {
    type: "미니 붕어빵",
    mbti: "ESTP",
    description: "즉흥적이고 유쾌함",
    image: "/assets/webp/flavorIcons/mini.webp",
  },
  {
    type: "김치 붕어빵",
    mbti: "ENTJ",
    description: "강한 리더십과 추진력",
    image: "/assets/webp/flavorIcons/kimchi.webp",
  },
  {
    type: "피자 붕어빵",
    mbti: "ENTP",
    description: "혁신적이고 논쟁을 즐김",
    image: "/assets/webp/flavorIcons/pizza.webp",
  },
  {
    type: "팥 크림치즈 붕어빵",
    mbti: "INFP",
    description: "감성적이고 창의적임",
    image: "/assets/webp/flavorIcons/redbean-cream-cheese.webp",
  },
  {
    type: "치즈 붕어빵",
    mbti: "ISTP",
    description: "실용적이고 분석적",
    image: "/assets/webp/flavorIcons/cheese.webp",
  },
  {
    type: "콘치즈 붕어빵",
    mbti: "ISFP",
    description: "호기심 많고 예술적",
    image: "/assets/webp/flavorIcons/corn-cheese.webp",
  },
  {
    type: "매콤이 붕어빵",
    mbti: "ESTJ",
    description: "체계적이고 실용적",
    image: "/assets/webp/flavorIcons/maecom.webp",
  },
  {
    type: "대왕 붕어빵",
    mbti: "ENTJ",
    description: "야망 있고 목표 지향적",
    image: "/assets/webp/flavorIcons/king.webp",
  },
  {
    type: "타코야끼 붕어빵",
    mbti: "ENTP",
    description: "변화를 즐기고 개방적",
    image: "/assets/webp/flavorIcons/tako.webp",
  },
  {
    type: "뿌링클 붕어빵",
    mbti: "ESFJ",
    description: "다정하고 친절함",
    image: "/assets/webp/flavorIcons/bburing.webp",
  },
  {
    type: "애플시나몬 붕어빵",
    mbti: "ENFJ",
    description: "따뜻한 리더십",
    image: "/assets/webp/flavorIcons/apple-cinnamon.webp",
  },
  {
    type: "흑임자 붕어빵",
    mbti: "INTJ",
    description: "전략적이고 독립적",
    image: "/assets/webp/flavorIcons/black-sesame.webp",
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

  console.log("User MBTI Type:", mbtiType);

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
