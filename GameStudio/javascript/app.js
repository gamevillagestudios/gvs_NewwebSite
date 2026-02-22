    //const featuredSlider = document.getElementById("featuredSlider");
    const featuredSlider = document.getElementById("cardsContainer");
    const gamesList = document.getElementById("gamesList");

    /* Load Featured Games */

  db.ref("featured_games").on("value", snapshot => {
  featuredSlider.innerHTML = "";

  const gamesArray = [];

  // First, store all games in array
  snapshot.forEach(child => {
    const game = child.val();
    gamesArray.push({
      name: game.gamename,
      icon: game.iconimage_url, // change if dynamic
      image: game.image_url,
      video : game.utube_url,
      playstore: game.playstore_url
    });
  });

  if (gamesArray.length === 0) return;

  // Render original + duplicate for infinite loop
  gamesArray.forEach(game => featuredSlider.appendChild(createCard(game)));
  gamesArray.forEach(game => featuredSlider.appendChild(createCard(game))); // duplicate

  function createCard(game) {
    const article = document.createElement("article");
    article.innerHTML = `
      <img src="${game.image}" alt="${game.name}" />
      <div class="details">
        <img src="${game.icon}" alt="${game.name}" />
        <div>
          <h3>${game.name}</h3>
          <div class="btns">
            <a title="playstore" target="_blank" href="${game.playstore_url}">
              <img src="assets/img/play-store.png" alt="Play Store" />
            </a>
          </div>
        </div>
      </div>
    `;
    return article;
  }

  // Wait images to load for correct offsetWidth
  setTimeout(() => {
    const firstCard = featuredSlider.querySelector("article");
    const cardWidth = firstCard.offsetWidth + 20; // include gap
    const totalCards = featuredSlider.children.length;

    let position = 0;
    const speed = 0.5; // px per frame

    function slide() {
      position += speed;
      if (position >= (totalCards / 2) * cardWidth) position = 0; // infinite loop
      featuredSlider.style.transform = `translateX(-${position}px)`;
      requestAnimationFrame(slide);
    }

    // Only start sliding if more than 2 cards
    if (gamesArray.length > 2) slide();
    else featuredSlider.style.transform = "translateX(0)";
  }, 100); // small delay for images to render
});

    /* Load All Games */

 db.ref("all_games").on("value", snapshot => {
 const allgamesArray = [];
    gamesList.innerHTML = "";
  snapshot.forEach(child => {
    const game = child.val();
    allgamesArray.push({
      name: game.gamename,
      icon: game.iconimage_url, // change if dynamic
      image: game.image_url,
      video : game.utube_url,
      playstore: game.playstore_url
    });
  if (allgamesArray.length === 0) return;

  // Render original + duplicate for infinite loop
  allgamesArray.forEach(game => gamesList.appendChild(createCard(game)));
    allgamesArray.forEach(game => gamesList.appendChild(createCard(game)));
      allgamesArray.forEach(game => gamesList.appendChild(createCard(game)));

    function createCard(game) {
    const article = document.createElement("article");
    article.innerHTML = `
      <img src="${game.image}" alt="${game.name}" />
      <div class="details">
        <img src="${game.icon}" alt="${game.name}" />
        <div>
          <h3>${game.name}</h3>
          <div class="btns">
            <a title="playstore" target="_blank" href="${game.playstore_url}">
              <img src="assets/img/play-store.png" alt="Play Store" />
            </a>
          </div>
        </div>
      </div>
    `;
    return article;
  }


  });

});

    /* Auto Slider */

    function startAutoSlider() {

    let scrollAmount = 0;

    setInterval(() => {

        scrollAmount += 320;

        if (scrollAmount >= featuredSlider.scrollWidth) {
        scrollAmount = 0;
        }

        featuredSlider.scrollTo({
        left: scrollAmount,
        behavior: "smooth"
        });

    }, 500);
    }