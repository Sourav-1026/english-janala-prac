const showSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
  }
};

async function loadLevel() {
  const res = await fetch("https://openapi.programming-hero.com/api/levels/all");
  const data = await res.json();

  const levels = data.data.map((level) => level);

  displayLessons(levels);
}

const removeActive = () => {
  const lessonButton = document.querySelectorAll(".lesson-btn");
  // console.log(lessonButton);
  lessonButton.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = async (id) => {
  showSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  const res = await fetch(url);
  const data = await res.json();

  removeActive();
  const btnClick = document.getElementById(`lesson-btn-${id}`);
  // console.log(btnClick);
  btnClick.classList.add("active");

  const words = data.data.map((word) => word);
  displayLevelWord(words);
};

const showSynonym = (arr) => {
  const innerSynonym = arr.map((sn) => `<span class = "btn">${sn}</span>`);
  return innerSynonym.join(" ");
};

const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const data = await res.json();

  const wordDetails = data.data;

  displayWordDetails(wordDetails);
};

const displayWordDetails = (wordDetails) => {
  const modalContainer = document.getElementById("details-container");
  modalContainer.innerHTML = "";

  const modalDiv = document.createElement("div");
  modalDiv.innerHTML = `
    <div class="space-y-3 border border-[#EDF7FF] rounded-md p-2">
    <h3 class="font-bangla text-[36px] font-semibold">${wordDetails.word} (<i class="fa-solid fa-microphone-lines"></i> : ${wordDetails.pronunciation})</h3>
      <div>
        <p class="font-semibold text-[24px]">Meaning</p>
        <p class="font-bangla font-medium">${wordDetails.meaning ? wordDetails.meaning : "অর্থ পাওয়া যায়নি"}</p>
      </div>
      <div>
        <p class="font-semibold text-[24px]">Example</p>
        <p class="text-[24px]">${wordDetails.sentence}</p>
      </div>
      <div>
        <p class="font-semibold font-bangla text-[24px]">সমার্থক শব্দ গুলো</p>
        <div>${showSynonym(wordDetails.synonyms) ? showSynonym(wordDetails.synonyms) : "সমার্থক শব্দ পাওয়া যায়নি"}</div>
      </div>
    </div>
  `;
  modalContainer.append(modalDiv);
  my_modal_5.showModal();
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = `
      <div class="text-center col-span-full py-10 font-bangla space-y-3">
        <div class = "flex justify-center mb-3">
          <img src="./assets/alert-error.png" alt="" srcset="">
        </div>
        <p class="text-[#79716B] font-semibold">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h1 class="text-[34px] font-medium">নেক্সট Lesson এ যান</h1>
      </div>
    `;
    showSpinner(false);
    return;
  }

  for (let word of words) {
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
      <div class="bg-white rounded-md shadow-sm py-6 px-2 text-center space-y-5">
        <h2 class="font-bold text-2xl">${word.word}</h2>
        <p class="font-medium">Meaning /Pronounciation</p>
        <h2 class="font-semibold font-bangla text-2xl">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation}"</h2>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF]/80"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF]/80"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    `;
    wordContainer.append(wordDiv);
  }
  showSpinner(false);
};

const displayLessons = (lessons) => {
  const btnContainer = document.getElementById("btn-container");
  btnContainer.innerHTML = "";
  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button id = "lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class = "btn btn-outline btn-primary lesson-btn">
      <i class="fa-solid fa-book-open"></i>
        Lesson -${lesson.level_no}</button>
    `;
    btnContainer.append(btnDiv);
  }
};

loadLevel();

document.getElementById("search-btn").addEventListener("click", () => {
  removeActive();
  const searchInput = document.getElementById("search-input");
  const searchText = searchInput.value.trim().toLowerCase();
  allWord(searchText);
});

async function allWord(searchText) {
  const res = await fetch("https://openapi.programming-hero.com/api/words/all");
  const data = await res.json();
  const d = data.data;
  const filterWords = d.filter((d) => d.word.toLowerCase().includes(searchText));
  displayLevelWord(filterWords);
}
