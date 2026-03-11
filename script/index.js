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
          <button class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF]/80"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF]/80"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    `;
    wordContainer.append(wordDiv);
    // console.log(word);
  }
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
  // console.log(lessons);
};

loadLevel();
