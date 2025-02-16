const bungBalGameQuestions = [
  {
    id: 1,
    text: "붕어빵을 먹을 때 나는?",
    options: [
      {
        core: "head_first",
        text: "머리부터 🔝",
        sub: ["crispy"],
        mbti: { J: 0.5 }, // 논리적이고 계획적인 성향
      },
      {
        core: "tail_first",
        text: "꼬리부터 🔚",
        sub: ["soft"],
        mbti: { J: 0.5 }, // 감성적이고 유연한 성향
      },
      {
        core: "random_pick",
        text: "집히는대로 ✋",
        sub: ["balanced"],
        mbti: { P: 0.5 }, // 즉흥적이고 직관적인 성향
      },
    ],
  },
  {
    id: 2,
    text: "붕어빵은 역시?",
    options: [
      {
        core: "red_bean",
        text: "팥 붕어빵이 근본이지! 🫘",
        sub: ["traditional"],
        mbti: { S: 0.1, J: 0.1 }, // 전통과 원칙을 중시하는 성향
      },
      {
        core: "custard",
        text: "슈크림같은 부드러움이 좋아 🍦",
        sub: ["sweet"],
        mbti: { N: 0.1, F: 0.1, P: 0.1 }, // 감각적이고 부드러운 것을 선호하는 성향
      },
    ],
  },
  {
    id: 3,
    text: "붕어빵의 익힘 정도는?",
    options: [
      {
        core: "crispy",
        text: "바삭해야 해! 🍪",
        sub: ["strong_taste"],
        mbti: { T: 0.1, J: 0.1 }, // 강한 질감을 선호하는 논리적 성향
      },
      {
        core: "soft",
        text: "부드러워야 해! 🍞",
        sub: ["gentle"],
        mbti: { F: 0.1, P: 0.1 }, // 부드럽고 따뜻한 감성을 선호하는 성향
      },
    ],
  },

  {
    id: 4,
    text: "붕어빵 가게를 지나가다가 당신은?",
    options: [
      {
        core: "filled",
        text: "오! 여기 붕어빵 가게 있네? 가게 이름이 뭐지? 몇 마리 사갈까? 🧐",
        sub: ["rich"],
        mbti: { S: 1 }, // 감각적이고 풍부한 것을 선호하는 성향
      },
      {
        core: "balanced",
        text: "오! 붕어빵 냄새 난다! 추운 날에 따끈한 붕어빵이라니 딱이야~ 🤩",
        sub: ["moderate"],
        mbti: { N: 1 }, // 균형과 논리를 중시하는 성향
      },
    ],
  },
  {
    id: 5,
    text: "친구가 색다른 붕어빵을 먹고 맛없다고 했을 때 나는?",
    options: [
      {
        core: "validate_feelings",
        text: "헐 진짜?  아쉽다.. 기대했을 텐데 ㅠㅠ🥲",
        sub: ["empathetic"],
        mbti: { F: 1 }, // 친구의 감정을 공감하고 존중하는 성향
      },
      {
        core: "objective_opinion",
        text: "왜? 무슨 맛이길래? 🤔",
        sub: ["analytical"],
        mbti: { T: 1 }, // 논리적으로 원인을 분석하고 피드백하는 성향
      },
    ],
  },
  {
    id: 6,
    text: "붕어빵의 크기에 변화를 준다면?",
    options: [
      {
        core: "mini",
        text: "미니 붕어빵 🐭",
        sub: ["fun"],
        mbti: { P: 0.1, F: 0.1 }, // 귀엽고 가벼운 걸 선호하는 감각적인 성향
      },
      {
        core: "king",
        text: "대왕 붕어빵 🦖",
        sub: ["big"],
        mbti: { T: 0.1, J: 0.1 }, // 크고 확실한 선택을 선호하는 성향
      },
    ],
  },
  {
    id: 7,
    text: "내가 주문한 맛과 다른 붕어빵을 받았다면?",
    options: [
      {
        core: "accept",
        text: "귀찮으니까 그냥 먹는다 🫠",
        sub: ["easygoing"],
        mbti: { I: 0.5, P: 0.8 },
      },
      {
        core: "accept",
        text: "사장님이 난처할 수도 있으니 그냥 먹는다 🥺",
        sub: ["considerate"],
        mbti: { I: 0.5, P: 0.5, F: 1.5 },
      },
      {
        core: "complain",
        text: "내가 주문한 맛이 아니니 가게에 가서 이야기한다 🗣",
        sub: ["assertive"],
        mbti: { E: 0.5, J: 1, T: 0.7 },
      },
    ],
  },
  {
    id: 8,
    text: "팥붕어빵을 사러갔는데.. 맛있어보이는 붕어빵이 새로 출시됐다면?",
    options: [
      {
        core: "try_new",
        text: "새로운거? 궁금한데! 도전한다.",
        sub: ["adventurous"],
        mbti: { N: 0.5, P: 1 }, // 도전적이고 유연한 성향
      },
      {
        core: "stick_to_known",
        text: "생각보다 맛이 없으면 어떡하지? 아는 맛만 먹는다.",
        sub: ["cautious"],
        mbti: { S: 0.5, J: 1 }, // 전통적이고 신중한 성향
      },
    ],
  },
  {
    id: 9,
    text: "붕어빵을 친구와 나눠 먹을 때?",
    options: [
      {
        core: "split_evenly",
        text: "최대한 반으로 똑같이 나눈다 ✂️",
        sub: ["fair"],
        mbti: { J: 0.5 }, // 공평한 규칙을 중시하는 성향
      },
      {
        core: "take_a_bite",
        text: "그냥 적당히 베어 먹고 넘긴다 😋",
        sub: ["spontaneous"],
        mbti: { P: 0.5 }, // 즉흥적이고 유연한 성향
      },
    ],
  },
  {
    id: 10,
    text: "직접 붕어빵을 만들고싶은데 밀가루가 부족하다면?",
    options: [
      {
        core: "traditional",
        text: "정석대로 만들어야지. 부족한 재료를 사온다 🧑‍🏫",
        sub: ["classic"],
        mbti: { J: 1 }, // 기존 방식을 따르는 성향
      },
      {
        core: "creative",
        text: "없으면 어때? 대체할 재료를 찾아본다 🧑‍🍳",
        sub: ["unique"],
        mbti: { P: 1 }, // 창의적이고 실험적인 성향
      },
    ],
  },
  {
    id: 11,
    text: "붕어빵을 먹을 때 나는?",
    options: [
      {
        core: "savor",
        text: "음미하면서 먹기 😌",
        sub: ["patient"],
        mbti: { I: 0.1, J: 0.1 }, // 신중하고 계획적인 성향
      },
      {
        core: "big_bite",
        text: "크게 베어 먹기 😮",
        sub: ["impulsive"],
        mbti: { E: 0.1, P: 0.1 }, // 즉흥적이고 다이나믹한 성향
      },
    ],
  },
  {
    id: 12,
    text: "붕최몇? (한 번에 몇 마리까지?)",
    options: [
      {
        core: "one_only",
        text: "하나만 먹고 만족 😊",
        sub: ["minimalist"],
        mbti: { I: 0.1, J: 0.1 }, // 절제하고 계획적인 성향
      },
      {
        core: "three",
        text: "3개는 먹어야지 😋",
        sub: ["moderate"],
        mbti: { E: 0.1, S: 0.1 }, // 균형 잡힌 선택을 선호하는 성향
      },
      {
        core: "unlimited",
        text: "무한대로 먹을 수 있지 😤",
        sub: ["excessive"],
        mbti: { E: 0.1, P: 0.1 }, // 충동적이고 즉흥적인 성향
      },
    ],
  },
  {
    id: 13,
    text: "동네에 새로 생긴 붕어빵 집을 발견했다.",
    options: [
      {
        core: "street_vendor",
        text: "맛있겠다! 바로 도전해보기 👊",
        sub: ["casual"],
        mbti: { P: 1, N: 0.5 }, // 즉흥적이고 감각적인 성향
      },
      {
        core: "shop",
        text: "맛있을까? 고민해보고 결정하기 🤔",
        sub: ["premium"],
        mbti: { J: 1, S: 0.5 }, // 계획적이고 이성적인 성향
      },
    ],
  },
  {
    id: 14,
    text: "붕어빵 틀에서 넘친 바삭한 부분을 잘라내서 담아주려고 할 때?",
    options: [
      {
        core: "leave_it",
        text: "(앗...) 그대로 둔다 😳",
        sub: ["neat"],
        mbti: { I: 1, P: 0.5, F: 0.5 },
      },
      {
        core: "keep_extra",
        text: "잘라내지 말고 주세요! 😱",
        sub: ["maximalist"],
        mbti: { E: 1, J: 0.5, T: 0.5 },
      },
    ],
  },
  {
    id: 15,
    text: "SNS에서 유명한 붕어빵을 찾아갔는데 줄이 길다면?",
    options: [
      {
        core: "wait",
        text: "유명한 데에는 다 이유가 있겠지. 기다린다 🧘",
        sub: ["patient"],
        mbti: { J: 1, N: 0.5 },
      },
      {
        core: "leave",
        text: "붕어빵이 뭐 거기서 거기지. 다른 곳으로 간다 🏃‍♂️",
        sub: ["efficient"],
        mbti: { P: 1, S: 0.5 },
      },
    ],
  },
];

export default bungBalGameQuestions;
