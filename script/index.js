async function loadLevel() {
  const res = await fetch("https://openapi.programming-hero.com/api/levels/all");
  const data = await res.json();

  const levels = data.data.map((level) => level);

  console.log(levels);
}

loadLevel();
