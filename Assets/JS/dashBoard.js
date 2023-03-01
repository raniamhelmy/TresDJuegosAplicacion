//const documentHTML = document;
const modeBtn = documentHTML.getElementById("mode");
const loading = documentHTML.querySelector(".loading");
const gameData = documentHTML.getElementById("gameData");

const menuLink = documentHTML.querySelectorAll(".menu a")

const LogOutBtn =documentHTML.getElementById('LogOutBtn');

// let theme = 'dark';

/**************************Functions****************************************** */

async function getGamesData(category) {
  loading.classList.remove("d-none");
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "4a01d7fbb2mshdd13832058c05e4p16eaacjsna4633aabdf1e",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
    options
  );
  const response = await api.json();
  console.log(response);
  displayData(response);
  loading.classList.add("d-none");
}

function displayData(data) {
  let gamesBox = ``;
  for (let i = 0; i < data.length; i++) {
    let videPath =
      data[i].thumbnail.slice(0, data[i].thumbnail.lastIndexOf("/")) +
      "/videoplayback.webm";
    let videPath2 =
      data[i].thumbnail.slice(0, data[i].thumbnail.lastIndexOf("/")) +
      "/videoplayback.mp4";

    gamesBox += `
     <div class="col">
     <div onmouseleave="stopVideo(event)" onmouseenter="startVideo(event)" class="card h-100 bg-transparent" role="button" onclick="showDetails(${
       data[i].id
     })">
        <div class="card-body">
           <figure class="position-relative">
              <img class="card-img-top object-fit-cover h-100" src="${
                data[i].thumbnail
              }" />
            <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
             <source src="${videPath ?? videPath2}">
             </video>
           </figure>

           <figcaption>

              <div class="hstack justify-content-between">
                 <h3 class="h6 small">${data[i].title}</h3>
                 <span class="badge text-bg-primary p-2">Free</span>
              </div>

              <p class="card-text small text-center opacity-50">
                 ${data[i].short_description.split(" ", 8)}
              </p>

           </figcaption>
        </div>

        <footer class="card-footer small hstack justify-content-between">

           <span class="badge badge-color">${data[i].genre}</span>
           <span class="badge badge-color">${data[i].platform}</span>

        </footer>
     </div>
  </div>
     `;
  }

  gameData.innerHTML = gamesBox;
}

function startVideo(event) {
  const videoEl = event.currentTarget.querySelector("video");
  videoEl.muted = true;
  videoEl.play().then(function () {
    videoEl.classList.remove("d-none");
  });
}

function stopVideo(event) {
  const videoEl = event.currentTarget.querySelector("video");
  videoEl.muted = true;
  videoEl.pause();
  videoEl.classList.add("d-none");
}


function showDetails(id) {
  location.href = `./details.html?id=${id}`;
}

function scrollFixNav(){
  const theme = localStorage.getItem("theme");
  if (scrollY > 40) {
    documentHTML.querySelector("nav").classList.add("fixed-top");
    if(theme === 'light'){
      documentHTML.querySelector("nav").style.backgroundColor='#d1d1d1'
    }
    else{
      documentHTML.querySelector("nav").style.backgroundColor='#783d11'
    }

 } else {
    documentHTML.querySelector("nav").classList.remove("fixed-top");
    documentHTML.querySelector("nav").style.backgroundColor='transparent'
 }
}

function logout() {
  localStorage.removeItem("uToken");
  window.location.href = "./index.html";
}


/*****************************Local Storage******************************** */

//theme color configurations
function themeConfiguration() {
  if (localStorage.getItem("theme")) {
     const theme = localStorage.getItem("theme");
     console.log(theme);
     document.documentElement.dataset.theme = localStorage.getItem("theme");
     if (theme === "light") {
        modeBtn.classList.replace("fa-sun", "fa-moon");
     } else {
        modeBtn.classList.replace("fa-moon", "fa-sun");
     }
  }
  else{
   localStorage.setItem('theme','dark');
   modeBtn.classList.replace("fa-moon", "fa-sun");
  }
}


/*****************************Toggle Theme********************************* */

function themeToggle(element) {
 const rootElement = documentHTML.documentElement; //will always be an <html> element.
 if (element.classList.contains("fa-sun")) {
   element.classList.replace("fa-sun", "fa-moon");
   rootElement.dataset.theme = "light";
   localStorage.setItem("theme", "light");
 } else {
   element.classList?.replace("fa-moon", "fa-sun");
   rootElement.dataset.theme = "dark";
   localStorage.setItem("theme", "dark");
 }
}


/****************************Event Listeners******************************* */
documentHTML.addEventListener("DOMContentLoaded", function () {
  getGamesData("mmorpg");
  themeConfiguration() ;
});


LogOutBtn.addEventListener('click',function(){
  logout();
});


menuLink.forEach(function (link) {
  link.addEventListener("click", function (e) {
     document.querySelector(".menu .active").classList.remove("active");
     e.target.classList.add("active");
     getGamesData(e.target.dataset.category);
  });
});

window.addEventListener("scroll", function () {
  scrollFixNav();
});


modeBtn.addEventListener("click", function (e) {
  themeToggle(e.target);
  scrollFixNav();
});
