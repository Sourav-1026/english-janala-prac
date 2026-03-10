async function loadLevel() {
  const res = await fetch("https://openapi.programming-hero.com/api/levels/all");
  const data = await res.json();

  const levels = data.data.map((level) => level);

  displayLessons(levels);
}

const loadLevelWord = async (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  const res = await fetch(url);
  const data = await res.json();

  const words = data.data.map((word) => word);
  displayLevelWord(words);
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  for (let word of words) {
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
      <div class="bg-white rounded-md shadow-sm py-6 px-2 text-center space-y-5">
        <h2 class="font-bold text-2xl">${word.word}</h2>
        <p class="font-medium">Meaning /Pronounciation</p>
        <h2 class="font-semibold font-bangla text-2xl">"${word.meaning} / ${word.pronunciation}"</h2>
        <div class="flex justify-between items-center">
          <button class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF]/80"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF]/80"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    `;
    wordContainer.append(wordDiv);
    console.log(word);
  }
};

const displayLessons = (lessons) => {
  const btnContainer = document.getElementById("btn-container");
  btnContainer.innerHTML = "";
  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    // btnDiv = lesson.map(less => less.lessonName);
    btnDiv.innerHTML = `
      <button onclick = "loadLevelWord(${lesson.level_no})" class = "btn btn-outline btn-primary">
      <i class="fa-solid fa-book-open"></i>
        Lesson -${lesson.level_no}</button>
    `;
    btnContainer.append(btnDiv);
  }
  console.log(lessons);
};

loadLevel();
