const pairs = [
  {
    id: 1,
    type: "image",
    label: "Lugar",
    src: "img/mayon.jpg",
    text: "Mayon Volcano",
    match: "mayon"
  },
  {
    id: 2,
    type: "text",
    label: "Description",
    text: "Perfect cone volcano located in Albay, Bicol",
    match: "mayon"
  },

  {
    id: 3,
    type: "image",
    label: "Lugar",
    src: "img/chocolate-hills.jpg",
    text: "Chocolate Hills",
    match: "choco"
  },
  {
    id: 4,
    type: "text",
    label: "Description",
    text: "Famous mound-like hills in Bohol",
    match: "choco"
  },

  {
    id: 5,
    type: "image",
    label: "Transport",
    src: "img/jeepney.jpg",
    text: "Jeepney",
    match: "jeepney"
  },
  {
    id: 6,
    type: "text",
    label: "Description",
    text: "Colorful public transport icon of the Philippines",
    match: "jeepney"
  },

  {
    id: 7,
    type: "image",
    label: "Lugar",
    src: "img/vigan.jpg",
    text: "Vigan",
    match: "vigan"
  },
  {
    id: 8,
    type: "text",
    label: "Description",
    text: "Heritage city known for Spanish colonial streets",
    match: "vigan"
  },

  {
    id: 9,
    type: "image",
    label: "Park",
    src: "img/rizal-park.jpg",
    text: "Rizal Park",
    match: "rizal"
  },
  {
    id: 10,
    type: "text",
    label: "Description",
    text: "Historic park in Manila honoring Dr. Jose Rizal",
    match: "rizal"
  },

  {
    id: 11,
    type: "image",
    label: "Symbol",
    src: "img/flag.jpg",
    text: "Philippine Flag",
    match: "flag"
  },
  {
    id: 12,
    type: "text",
    label: "Description",
    text: "National flag with sun and three stars",
    match: "flag"
  }
];

const grid = document.getElementById("gameGrid");
const attemptsEl = document.getElementById("attempts");
const matchesEl = document.getElementById("matches");
const messageEl = document.getElementById("gameMessage");
const resetBtn = document.getElementById("resetGame");

let state = {
  flipped: [],
  attempts: 0,
  matches: 0,
  locked: false
};

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderCards() {
  const shuffled = shuffle(pairs);
  grid.innerHTML = "";
  shuffled.forEach((item) => {
    const card = document.createElement("button");
    card.className = "card";
    card.dataset.id = item.id;
    card.dataset.match = item.match;
    card.dataset.type = item.type;

    let inner = "";

    if (item.type === "image") {
      inner = `
        <div>
          <div class="card-label">${item.label}</div>
          <div class="card-image-wrapper">
            <img src="${item.src}" alt="${item.text}" />
          </div>
          <div class="card-text small">${item.text}</div>
        </div>
      `;
    } else {
      inner = `
        <div>
          <div class="card-label">${item.label}</div>
          <div class="card-text">
            ${item.text}
          </div>
        </div>
      `;
    }

    card.innerHTML = inner;

    card.addEventListener("click", () => handleCardClick(card));
    grid.appendChild(card);
  });
  updateStats();
  messageEl.innerHTML = "";
}

function updateStats() {
  attemptsEl.textContent = state.attempts.toString();
  matchesEl.textContent = state.matches.toString();
}

function handleCardClick(card) {
  if (state.locked) return;
  if (card.classList.contains("correct") || card.classList.contains("selected")) return;

  card.classList.add("selected");
  state.flipped.push(card);

  if (state.flipped.length === 2) {
    state.locked = true;
    state.attempts += 1;
    checkMatch();
  }
}

function checkMatch() {
  const [c1, c2] = state.flipped;
  const isPair =
    c1.dataset.match === c2.dataset.match &&
    c1.dataset.type !== c2.dataset.type;

  if (isPair) {
    c1.classList.remove("selected");
    c2.classList.remove("selected");
    c1.classList.add("correct", "disabled");
    c2.classList.add("correct", "disabled");
    state.matches += 1;
    messageEl.innerHTML =
      `<span>✅ Nice! You matched <strong>${c1.dataset.match}</strong>.</span>`;
  } else {
    messageEl.innerHTML = `<span>❌ Not a match. Try again.</span>`;
    setTimeout(() => {
      c1.classList.remove("selected");
      c2.classList.remove("selected");
    }, 600);
  }

  setTimeout(() => {
    state.flipped = [];
    state.locked = false;
    updateStats();
    if (state.matches === 6) {
      messageEl.innerHTML =
        `<span>🎉 All pairs cleared in <strong>${state.attempts}</strong> attempts!</span>`;
    }
  }, 620);
}

function resetGame() {
  state = { flipped: [], attempts: 0, matches: 0, locked: false };
  renderCards();
}

resetBtn.addEventListener("click", resetGame);
resetGame();
