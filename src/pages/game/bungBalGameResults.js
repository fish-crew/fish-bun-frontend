import { postMbtiData } from "../../api/service.js";

const bungBalGameResults = [
  {
    type: "팥 붕어빵",
    mbti: "ISTJ",
    slogan: "근본은 영원하다!",
    bestMatch: "치즈 붕어빵",
    bestMatchImg: "/assets/webp/flavorIcons/cheese.webp",
    worstMatch: "타코야끼 붕어빵",
    worstMatchImg: "/assets/webp/flavorIcons/tako.webp",
    description: [
      "신뢰성과 원칙을 중시하는 성향으로, 붕어빵의 대표격인 팥 붕어빵과 닮았어요.",
      "붕어빵 하면 떠오르는 대표적인 맛, 전통적이고 익숙한 클래식함.",
      "변함없는 맛과 꾸준한 인기로 변덕 없이 한결같아요.",
      "달지 않으면서도 은은한 깊이감, 과하지 않은 만족스러운 균형.",
      "실용적이고 효율적인 성격으로, 팥 붕어빵처럼 기본에 충실한 삶을 살아가요.",
    ],
    image: "/assets/webp/flavorIcons/redbean.webp",
  },
  {
    type: "슈크림 붕어빵",
    mbti: "ESFP",
    slogan: "달콤함이 인생의 묘미!",
    bestMatch: "콘치즈 붕어빵",
    bestMatchImg: "/assets/webp/flavorIcons/corn-cheese.webp",
    worstMatch: "흑임자 붕어빵",
    worstMatchImg: "/assets/webp/flavorIcons/black-sesame.webp",
    description: [
      "사교적이고 에너지가 넘치는 성격, 누구에게나 사랑받는 슈크림 붕어빵과 닮았어요.",
      "한 입 베어 물면 달콤하고 부드러운 매력으로 사람들을 기분 좋게 만들어요.",
      "즉흥적이고 활기찬 스타일로, 어디서든 분위기를 밝히는 존재예요.",
      "트렌드를 따라가는 걸 좋아하고, 변화를 즐기는 성향이에요.",
      "감각적이고 감정을 중요하게 여겨, 주변 사람들과 따뜻한 관계를 유지해요.",
    ],
    image: "/assets/webp/flavorIcons/custard.webp",
  },
  {
    type: "초코 붕어빵",
    mbti: "ENFP",
    slogan: "언제나 새롭고 짜릿하게!",
    bestMatch: "애플시나몬 붕어빵",
    bestMatchImg: "/assets/webp/flavorIcons/apple-cinnamon.webp",
    worstMatch: "매콤이 붕어빵",
    worstMatchImg: "/assets/webp/flavorIcons/maecom.webp",
    description: [
      "창의적이고 자유로운 영혼, 초코 붕어빵처럼 항상 새롭고 흥미로운 걸 찾아다녀요.",
      "남들과 똑같은 건 싫어! 톡톡 튀는 개성과 매력을 가진 타입이에요.",
      "사람들과 어울리는 걸 좋아하고, 아이디어가 많아 끊임없이 무언가를 시도해요.",
      "초코 특유의 달콤함과 짜릿한 맛처럼 감정 표현도 풍부하고 생동감이 넘쳐요.",
      "모험을 즐기고, 삶을 다양한 색깔로 채우고 싶어 해요.",
    ],
    image: "/assets/webp/flavorIcons/choco.webp",
  },
  {
    type: "고구마 붕어빵",
    mbti: "INFJ",
    slogan: "속 깊은 따뜻함!",
    bestMatch: "팥 크림치즈 붕어빵",
    bestMatchImg: "/assets/webp/flavorIcons/redbean-cream-cheese.webp",
    worstMatch: "김치 붕어빵",
    worstMatchImg: "/assets/webp/flavorIcons/kimchi.webp",
    description: [
      "조용하고 따뜻한 성격, 고구마 붕어빵처럼 속이 깊고 부드러워요.",
      "말은 많지 않지만, 한 번 친해지면 진정성 있는 관계를 유지해요.",
      "겉보기엔 평범해 보일 수 있지만, 속은 깊은 단맛처럼 감성적이고 따뜻해요.",
      "사람들에게 공감하는 능력이 뛰어나고, 조용히 돕는 걸 좋아해요.",
      "깊이 있는 대화를 좋아하며, 의미 있는 삶을 추구해요.",
    ],
    image: "/assets/webp/flavorIcons/guma.webp",
  },
  {
    type: "미니 붕어빵",
    mbti: "ISFP",
    slogan: "소소하지만 확실한 행복!",
    bestMatch: "초코 붕어빵",
    bestMatchImg: "/assets/webp/flavorIcons/choco.webp",
    worstMatch: "매콤이 붕어빵",
    worstMatchImg: "/assets/webp/flavorIcons/maecom.webp",
    description: [
      "자유롭고 감각적인 성격, 미니 붕어빵처럼 부담 없고 귀여운 매력이 있어요.",
      "혼자만의 시간을 소중히 여기면서도, 좋아하는 사람들과의 소통을 즐겨요.",
      "작고 단순하지만, 그 안에 깊은 따뜻함이 담겨 있어요.",
      "즉흥적이고 감각적인 경험을 좋아하며, 일상 속에서 작은 행복을 찾는 스타일이에요.",
      "단순하고 소박한 것에서 기쁨을 느끼며, 평화로운 분위기를 선호해요.",
    ],
    image: "/assets/webp/flavorIcons/mini.webp",
  },
  {
    type: "김치 붕어빵",
    mbti: "ESTP",
    slogan: "매력 폭발! 어디서든 주인공",
    bestMatch: "타코야끼 붕어빵",
    bestMatchImg: "/assets/webp/flavorIcons/tako.webp",
    worstMatch: "고구마 붕어빵",
    worstMatchImg: "/assets/webp/flavorIcons/guma.webp",
    description: [
      "즉흥적이고 에너제틱한 성격, 김치 붕어빵처럼 강렬하고 개성이 넘쳐요.",
      "한 번 맛보면 잊을 수 없는 강한 존재감!",
      "새로운 도전을 좋아하고, 빠르게 움직이며 상황을 파악해요.",
      "자극적인 경험을 즐기고, 사람들과의 경쟁에서도 승부욕이 강한 편이에요.",
      "모든 걸 빠르게 결정하고 행동하는 능력이 뛰어나요.",
    ],
    image: "/assets/webp/flavorIcons/kimchi.webp",
  },
  {
    type: "피자 붕어빵",
    mbti: "INTP",
    slogan: "이론과 분석, 그게 나야!",
    bestMatch: "흑임자 붕어빵",
    bestMatchImg: "/assets/webp/flavorIcons/black-sesame.webp",
    worstMatch: "콘치즈 붕어빵",
    worstMatchImg: "/assets/webp/flavorIcons/corn-cheese.webp",
    description: [
      "논리적이고 분석적인 성향으로, 피자 붕어빵처럼 기존의 틀을 깨는 스타일이에요.",
      "새로운 조합을 연구하고, 항상 더 나은 방법을 찾으려 해요.",
      "사람들과의 소통보다는 자신의 관심 분야에 몰입하는 걸 더 좋아해요.",
      "독특한 사고방식으로 남들과 다른 시각을 가질 때가 많아요.",
      "아이디어를 구상하는 걸 좋아하지만, 실행력은 부족할 수도 있어요.",
    ],
    image: "/assets/webp/flavorIcons/pizza.webp",
  },
  {
    type: "팥 크림치즈 붕어빵",
    mbti: "INFP",
    slogan: "감성 충만, 따뜻한 위로!",
    bestMatch: "고구마 붕어빵",
    bestMatchImg: "/assets/webp/flavorIcons/guma.webp",
    worstMatch: "매콤이 붕어빵",
    worstMatchImg: "/assets/webp/flavorIcons/maecom.webp",
    description: [
      "부드러운 감성의 소유자로, 팥 크림치즈 붕어빵처럼 따뜻한 위로를 건네요.",
      "마음이 여리고 공감 능력이 뛰어나 주변 사람들에게 좋은 영향을 줘요.",
      "혼자만의 시간을 소중히 여기며, 깊은 내면을 탐구하는 걸 좋아해요.",
      "이상적인 가치와 의미를 추구하며, 감성적인 순간을 중요하게 생각해요.",
      "섬세한 감정 표현이 뛰어나며, 예술적인 면모가 돋보이기도 해요.",
    ],
    image: "/assets/webp/flavorIcons/redbean-cream-cheese.webp",
  },
  {
    type: "치즈 붕어빵",
    mbti: "ISFJ",
    slogan: "포근함과 안정감의 대명사!",
    bestMatch: "팥 붕어빵",
    bestMatchImg: "/assets/webp/flavorIcons/redbean.webp",
    worstMatch: "타코야끼 붕어빵",
    worstMatchImg: "/assets/webp/flavorIcons/tako.webp",
    description: [
      "따뜻하고 포근한 성격으로, 치즈 붕어빵처럼 사람들에게 편안함을 줘요.",
      "세심하고 배려심이 많아 주변 사람들을 잘 챙겨요.",
      "전통적인 가치와 안정감을 중요하게 생각해요.",
      "다소 조용한 편이지만, 믿을 수 있는 친구가 되어줘요.",
      "사람들에게 헌신적이지만, 가끔은 자기 자신도 돌볼 필요가 있어요.",
    ],
    image: "/assets/webp/flavorIcons/cheese.webp",
  },
  {
    type: "콘치즈 붕어빵",
    mbti: "ESFJ",
    slogan: "함께할 때 더 빛나는!",
    bestMatch: "슈크림 붕어빵",
    bestMatchImg: "/assets/webp/flavorIcons/custard.webp",
    worstMatch: "피자 붕어빵",
    worstMatchImg: "/assets/webp/flavorIcons/pizza.webp",
    description: [
      "사람들과 함께하는 걸 좋아하며, 콘치즈 붕어빵처럼 따뜻한 분위기를 만들어줘요.",
      "친절하고 사교적이며, 주변 사람들에게 신경을 많이 써요.",
      "조화를 중요하게 생각하며, 갈등을 피하려고 노력해요.",
      "분위기를 이끌며, 사람들이 즐거워하는 모습을 보면 뿌듯함을 느껴요.",
      "타인을 돕고 보살피는 데 기쁨을 느끼는 성향이에요.",
    ],
    image: "/assets/webp/flavorIcons/corn-cheese.webp",
  },
  {
    type: "매콤이 붕어빵",
    mbti: "ESTJ",
    slogan: "원칙과 카리스마!",
    bestMatch: "대왕 붕어빵",
    bestMatchImg: "/assets/webp/flavorIcons/king.webp",
    worstMatch: "초코 붕어빵",
    worstMatchImg: "/assets/webp/flavorIcons/choco.webp",
    description: [
      "강한 리더십과 실행력을 가진 매콤이 붕어빵처럼 직설적이고 목표 지향적이에요.",
      "규칙과 원칙을 중요하게 생각하며, 효율성을 중시해요.",
      "결단력이 뛰어나고, 한 번 정한 목표는 끝까지 밀어붙이는 스타일이에요.",
      "때때로 감정보다는 논리와 현실적인 선택을 우선시할 때가 많아요.",
      "리더 역할을 맡을 때 능력을 발휘하며, 조직을 이끄는 데 강점을 보여요.",
    ],
    image: "/assets/webp/flavorIcons/maecom.webp",
  },
  {
    type: "대왕 붕어빵",
    mbti: "ENTJ",
    slogan: "크게 보고, 크게 이끌다!",
    bestMatch: "매콤이 붕어빵",
    bestMatchImg: "/assets/webp/flavorIcons/maecom.webp",
    worstMatch: "팥 크림치즈 붕어빵",
    worstMatchImg: "/assets/webp/flavorIcons/redbean-cream-cheese.webp",
    description: [
      "스케일이 크고, 강한 추진력을 가진 대왕 붕어빵 같은 성격이에요.",
      "야망이 크고, 목표를 향해 체계적으로 나아가요.",
      "사람들을 이끄는 능력이 뛰어나며, 카리스마가 있어요.",
      "도전적인 환경을 좋아하고, 항상 더 높은 곳을 바라봐요.",
      "계획을 세우고 전략적으로 움직이는 걸 즐겨요.",
    ],
    image: "/assets/webp/flavorIcons/king.webp",
  },
  {
    type: "타코야끼 붕어빵",
    mbti: "ENTP",
    slogan: "엉뚱한데 매력적인!",
    bestMatch: "김치 붕어빵",
    bestMatchImg: "/assets/webp/flavorIcons/kimchi.webp",
    worstMatch: "팥 붕어빵",
    worstMatchImg: "/assets/webp/flavorIcons/redbean.webp",
    description: [
      "창의적이고 재치 넘치는 성격으로, 타코야끼 붕어빵처럼 독특한 매력을 가졌어요.",
      "즉흥적인 아이디어가 많고, 사람들과 논쟁하는 걸 즐겨요.",
      "고정관념을 깨는 걸 좋아하고, 새로운 방식으로 접근하는 스타일이에요.",
      "가끔 산만할 수 있지만, 재미있고 유쾌한 성격 덕분에 주변에 사람이 많아요.",
      "모험을 좋아하고, 한 가지에 얽매이기보다는 다양한 시도를 즐겨요.",
    ],
    image: "/assets/webp/flavorIcons/tako.webp",
  },
  {
    type: "뿌링클 붕어빵",
    mbti: "ISTP",
    slogan: "한 입 베어 물면 중독!",
    bestMatch: "흑임자 붕어빵",
    bestMatchImg: "/assets/webp/flavorIcons/black-sesame.webp",
    worstMatch: "콘치즈 붕어빵",
    worstMatchImg: "/assets/webp/flavorIcons/corn-cheese.webp",
    description: [
      "조용하지만 강한 개성을 가진 타입으로, 뿌링클 붕어빵처럼 중독성이 있어요.",
      "관찰력이 뛰어나고, 현실적이면서도 실용적인 선택을 선호해요.",
      "필요한 말만 하고, 감정적인 표현보다는 행동으로 보여주는 스타일이에요.",
      "자기만의 방식대로 살아가며, 남의 간섭을 별로 좋아하지 않아요.",
      "위기에 강하고, 빠르게 문제를 해결하는 능력이 뛰어나요.",
    ],
    image: "/assets/webp/flavorIcons/bburing.webp",
  },
  {
    type: "애플시나몬 붕어빵",
    mbti: "ENFJ",
    slogan: "따뜻한 리더, 달콤한 향기!",
    bestMatch: "초코 붕어빵",
    bestMatchImg: "/assets/webp/flavorIcons/choco.webp",
    worstMatch: "흑임자 붕어빵",
    worstMatchImg: "/assets/webp/flavorIcons/black-sesame.webp",
    description: [
      "따뜻하고 배려심 넘치는 성격으로, 애플시나몬 붕어빵처럼 향기로운 존재예요.",
      "사람들에게 긍정적인 영향을 주고, 조화로운 분위기를 만들어가요.",
      "친절하고 사교적이며, 주변 사람들에게 활력을 불어넣어요.",
      "강한 신념을 가지고 있으며, 옳다고 생각하는 길을 가려고 해요.",
      "모두가 함께 행복할 수 있는 방법을 고민하는 타입이에요.",
    ],
    image: "/assets/webp/flavorIcons/apple-cinnamon.webp",
  },
  {
    type: "흑임자 붕어빵",
    mbti: "INTJ",
    slogan: "고요하지만 강렬하게!",
    bestMatch: "피자 붕어빵",
    bestMatchImg: "/assets/webp/flavorIcons/pizza.webp",
    worstMatch: "슈크림 붕어빵",
    worstMatchImg: "/assets/webp/flavorIcons/custard.webp",
    description: [
      "전략적이고 분석적인 성격으로, 흑임자 붕어빵처럼 고급스럽고 깊이 있는 타입이에요.",
      "독립적이고 자기주장이 강하며, 남의 의견보다 자신의 판단을 더 신뢰해요.",
      "계획적으로 움직이며, 목표를 위해 철저하게 준비하는 스타일이에요.",
      "감정보다는 논리와 효율을 중시하며, 비효율적인 것을 싫어해요.",
      "겉으로는 차가워 보일 수 있지만, 알고 보면 깊이 있는 매력을 가지고 있어요.",
    ],
    image: "/assets/webp/flavorIcons/black-sesame.webp",
  },
];
export function matchBungBalType(userAnswers) {
  let mbtiScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  // 사용자의 MBTI 점수 계산 (비중 반영)
  userAnswers.forEach((answerObj) => {
    if (answerObj.mbti) {
      Object.keys(answerObj.mbti).forEach((trait) => {
        mbtiScores[trait] += answerObj.mbti[trait]; // 가중치 적용
      });
    }
  });

  // 정규화 (값이 너무 커지지 않도록)
  let totalResponses = userAnswers.length || 1;
  Object.keys(mbtiScores).forEach((key) => {
    mbtiScores[key] = Math.round((mbtiScores[key] / totalResponses) * 10);
  });

  // MBTI 유형 결정 (높은 점수 기준으로 판별)
  const mbtiType =
    (mbtiScores.E >= mbtiScores.I ? "E" : "I") +
    (mbtiScores.S >= mbtiScores.N ? "S" : "N") +
    (mbtiScores.T >= mbtiScores.F ? "T" : "F") +
    (mbtiScores.J >= mbtiScores.P ? "J" : "P");

  console.log("User MBTI Type:", mbtiType);
  // 서버로 보내기
  const handleSubmit = async () => {
    // 입력값이 공란인지 확인
    if (!mbtiType.trim()) {
      return;
    }

    // 입력값이 정상인 경우 처리
    // 서버 요청 로직 추가
    try {
      // 서버에 데이터 전송
      const response = await postMbtiData(mbtiType);
    } catch (error) {
      console.error("데이터 전송 실패:", error);
      alert("서버로 데이터를 전송하는 데 실패했습니다.");
    }
  };
  handleSubmit();

  // 1. 정확한 MBTI 유형과 일치하는 붕어빵 찾기
  let bestMatch = bungBalGameResults.find((result) => result.mbti === mbtiType);

  // 2. 완벽한 일치가 없으면, 가장 가까운 MBTI 유형 찾기 (점수 기반 유사도 계산)
  if (!bestMatch) {
    let highestMatchScore = -Infinity;
    let closestMatch = null;

    bungBalGameResults.forEach((result) => {
      let similarityScore = 0;

      for (let i = 0; i < 4; i++) {
        if (result.mbti[i] === mbtiType[i]) {
          similarityScore += 1; // 같은 알파벳이면 +1
        }
      }

      // MBTI 개별 점수를 기반으로 유사도 계산
      let mbtiDiffSum = 0;
      Object.keys(mbtiScores).forEach((key) => {
        mbtiDiffSum += Math.abs(
          mbtiScores[key] - (result.mbtiScores?.[key] || 0)
        );
      });

      let finalMatchScore = similarityScore - mbtiDiffSum * 0.1; // 유사도 점수 - 차이 점수 반영

      if (finalMatchScore > highestMatchScore) {
        highestMatchScore = finalMatchScore;
        closestMatch = result;
      }
    });

    bestMatch = closestMatch;
  }

  return bestMatch;
}

export default bungBalGameResults;
