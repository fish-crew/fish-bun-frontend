const bungBalGameQuestions = [
  {
    id: 1,
    text: "붕어빵을 먹을 때 나는?",
    options: [
      {
        core: "head_first",
        text: "머리부터 🔝",
        sub: ["crispy"],
        mbti: { J: 1, S: 1 },
      },
      {
        core: "tail_first",
        text: "꼬리부터 🔚",
        sub: ["soft"],
        mbti: { P: 1, F: 1 },
      },
      {
        core: "random_pick",
        text: "집히는대로 ✋",
        sub: ["balanced"],
        mbti: { N: 1, P: 1 },
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
        mbti: { S: 1, J: 1 },
      },
      {
        core: "custard",
        text: "슈크림같은 부드러움이 좋아 🍦",
        sub: ["sweet"],
        mbti: { N: 1, F: 1 },
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
        mbti: { T: 1, J: 1 },
      },
      {
        core: "soft",
        text: "부드러워야 해! 🍞",
        sub: ["gentle"],
        mbti: { F: 1, P: 1 },
      },
    ],
  },
  {
    id: 4,
    text: "붕최몇? (한 번에 몇 마리까지?)",
    options: [
      {
        core: "one_only",
        text: "하나만 먹고 만족 😊",
        sub: ["minimalist"],
        mbti: { I: 1, J: 1 },
      },
      {
        core: "three",
        text: "3개는 먹어야지 😋",
        sub: ["moderate"],
        mbti: { E: 1, S: 1 },
      },
      {
        core: "unlimited",
        text: "무한대로 먹을 수 있지 😤",
        sub: ["excessive"],
        mbti: { E: 2, P: 1 },
      },
    ],
  },
  {
    id: 5,
    text: "붕어빵과 최고의 조합은?",
    options: [
      {
        core: "milk",
        text: "우유랑 함께 🥛",
        sub: ["smooth"],
        mbti: { S: 1, F: 1 },
      },
      {
        core: "coffee",
        text: "커피와 함께 ☕",
        sub: ["strong"],
        mbti: { T: 1, N: 1 },
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
        mbti: { P: 1, E: 1 },
      },
      {
        core: "king",
        text: "대왕 붕어빵 🦖",
        sub: ["big"],
        mbti: { J: 1, T: 1 },
      },
    ],
  },
  {
    id: 7,
    text: "내가 주문한 맛과 다른 붕어빵을 받았다면?",
    options: [
      {
        core: "accept",
        text: "그냥 먹는다 😅",
        sub: ["easygoing"],
        mbti: { P: 1, F: 1 },
      },
      {
        core: "complain",
        text: "가게에 가서 따진다 💢",
        sub: ["strict"],
        mbti: { J: 1, T: 1 },
      },
    ],
  },
  {
    id: 8,
    text: "색다른 붕어빵에 도전한다면?",
    options: [
      {
        core: "kimchi",
        text: "김치 붕어빵 🌶",
        sub: ["spicy"],
        mbti: { T: 1, E: 1 },
      },
      {
        core: "pizza",
        text: "피자 붕어빵 🍕",
        sub: ["savory"],
        mbti: { N: 1, P: 1 },
      },
    ],
  },
  {
    id: 9,
    text: "붕어빵을 친구와 나눠 먹을 때?",
    options: [
      {
        core: "split_evenly",
        text: "반으로 똑같이 나눈다 ✂️",
        sub: ["fair"],
        mbti: { F: 1, J: 1 },
      },
      {
        core: "take_a_bite",
        text: "그냥 적당히 베어 먹고 넘긴다 😋",
        sub: ["spontaneous"],
        mbti: { P: 1, E: 1 },
      },
    ],
  },
  {
    id: 10,
    text: "내가 직접 붕어빵을 만든다면?",
    options: [
      {
        core: "traditional",
        text: "정석대로 만든다 🧑‍🏫",
        sub: ["classic"],
        mbti: { S: 1, J: 1 },
      },
      {
        core: "creative",
        text: "나만의 특별한 레시피로 만든다 🧑‍🍳",
        sub: ["unique"],
        mbti: { N: 1, P: 1 },
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
        mbti: { I: 1, F: 1 },
      },
      {
        core: "big_bite",
        text: "크게 베어 먹기 😮",
        sub: ["impulsive"],
        mbti: { E: 1, P: 1 },
      },
    ],
  },
  {
    id: 12,
    text: "붕어빵 속의 적당량은?",
    options: [
      {
        core: "filled",
        text: "속이 비칠 정도로 가득 🫘🫘🫘",
        sub: ["rich"],
        mbti: { F: 1, P: 1 },
      },
      {
        core: "balanced",
        text: "반죽과 적당한 비율 🫘",
        sub: ["moderate"],
        mbti: { S: 1, J: 1 },
      },
    ],
  },
  {
    id: 13,
    text: "붕어빵을 사는 곳은?",
    options: [
      {
        core: "street_vendor",
        text: "길거리에서 즉석으로 사먹기 🚶‍♂️",
        sub: ["casual"],
        mbti: { S: 1, P: 1 },
      },
      {
        core: "shop",
        text: "전문점에서 다양한 붕어빵 사먹기 🏬",
        sub: ["premium"],
        mbti: { N: 1, J: 1 },
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
        mbti: { I: 1, J: 1 },
      },
      {
        core: "keep_extra",
        text: "잘라내지 말고 주세요! 😱",
        sub: ["maximalist"],
        mbti: { E: 1, P: 1 },
      },
    ],
  },
  {
    id: 15,
    text: "같은 가격이라면?",
    options: [
      {
        core: "three_normal",
        text: "3마리에 2000원 하는 보통 붕어빵 🐟🐟🐟",
        sub: ["practical"],
        mbti: { S: 1, J: 1 },
      },
      {
        core: "one_large",
        text: "한 마리에 2,000원 하는 큰 붕어빵 🏆🐟",
        sub: ["luxury"],
        mbti: { N: 1, P: 1 },
      },
    ],
  },
];

export default bungBalGameQuestions;
