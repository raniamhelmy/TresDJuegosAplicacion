const documentHTML = document;
const searchParams = location.search;
const params = new URLSearchParams(searchParams);
const id = params.get("id");

const loading = documentHTML.querySelector(".loading");

const detailsData = documentHTML.getElementById("detailsData");

const menuLink = documentHTML.querySelectorAll(".menu a");

const LogOutBtn = documentHTML.getElementById("LogOutBtn");

const modeBtn = documentHTML.getElementById("mode");

const closeBtn =documentHTML.getElementById('closeBtn');

// let theme = "dark";

/***************************Functions**************************************** */

async function getGameDetails(id) {
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
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    options
  );
  const response = await api.json();
  displayData(response);
  //console.log(response);
  loading.classList.add("d-none");
}

function displayData(data) {
  // let getString=data.description.split('\n',1)[0];
  let answ = data.description.split('\n');
  let newArr= answ.filter(function(obj){
      return obj!== '\r';
});
  // console.log(answ);
  // console.log(getString);
  // console.log(newArr);
  let detailsBox = `
  
    <div class="col-md-4">
    <figure>
       <img src="${data.thumbnail}" class="w-100" alt="details image" />
    </figure>
 </div>
 <div class="col-md-8">
 
    <div class='details_nav'>
       <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
             <li class="breadcrumb-item text-reset fw-bold"><a href="#" onclick='goHome()'>Home</a></li>
             <li class="breadcrumb-item fw-bold" aria-current="page">${data.title}</li>
          </ol>
       </nav>
 
       <h1>${data.title}</h1>
 
       <h3>About ${data.title}</h3>
      
       <p>${data.description.split('\n',1)[0]}</p>

       <a id='showBtn' href='#' onclick='show()'>Read More >></a>
       <p id="hiddenParrafo" style="display:none;">${newArr.splice(1)}</p>
      

       <h3 class='mt-3'>Additional Information</h3>
       <div class="mx-auto details__list ">
          <ul class="list-group list-group-horizontal d-flex justify-content-between align-items-start">
          <li class=" h-100 list-group-item bg-transparent p-0 w-100"><h6 class="mb-0 fw-bold text-capitalize">title</h6>
          <p class="m-0 p-0">${data.title}</p></li>
          <li class="h-100 list-group-item bg-transparent p-0 w-100"><h6 class="mb-0 fw-bold text-capitalize">Developer</h6>
          <p class="m-0 p-0">${data.developer}</p></li>
          <li class="h-100 list-group-item bg-transparent p-0 w-100"><h6 class="mb-0 fw-bold text-capitalize">Publisher</h6>
          <p class="m-0 p-0">${data.publisher}</p></li>
          
        </ul>
          <ul class="list-group list-group-horizontal d-flex justify-content-between align-items-start pt-3 pb-3">
          <li class=" h-100 list-group-item bg-transparent p-0 w-100"><h6 class="mb-0 fw-bold text-capitalize">Relaese Date</h6>
          <p class="m-0 p-0">${data.release_date.split('-').reverse().join('-')}</p></li>
          <li class="h-100 list-group-item bg-transparent p-0 w-100"><h6 class="mb-0 fw-bold text-capitalize">Genre</h6>
          <p class="m-0 p-0">${data.genre}</p></li>
          <li class="h-100 list-group-item bg-transparent p-0 w-100"><h6 class="mb-0 fw-bold text-capitalize">Platform</h6>
          <p class="m-0 p-0">${data.platform}</p></li>
          
        </ul>
       </div>
      

       <h3>Minimum System Requirements (Windows)</h3>
       <div class="mx-auto details__list ">
       <ul class="list-group list-group-horizontal d-flex justify-content-between align-items-start pb-2 pt-2">
       <li class=" h-100 list-group-item bg-transparent p-0 w-100"><h6 class="mb-0 fw-bold text-capitalize">OS</h6>
       <p class="m-0 p-0">${data.minimum_system_requirements?.os?? "--"}</p></li>
       <li class="h-100 list-group-item bg-transparent p-0 w-100"><h6 class="mb-0 fw-bold text-capitalize">Processor</h6>
       <p class="m-0 p-0">${data.minimum_system_requirements?.processor?? "--"}</p></li>
       
       </ul>

       <ul class="list-group list-group-horizontal d-flex justify-content-between align-items-start pb-2">
       <li class=" h-100 list-group-item bg-transparent p-0 w-100"><h6 class="mb-0 fw-bold text-capitalize">Memory</h6>
       <p class="m-0 p-0">${data.minimum_system_requirements?.memory?? "--"}</p></li>
       <li class="h-100 list-group-item bg-transparent p-0 w-100"><h6 class="mb-0 fw-bold text-capitalize">Graphics</h6>
       <p class="m-0 p-0">${data.minimum_system_requirements?.graphics?? "--"}</p></li>
       
       </ul>

       <ul class="list-group list-group-horizontal d-flex justify-content-between align-items-start pb-2">
       <li class=" h-100 list-group-item bg-transparent p-0 w-100"><h6 class="mb-0 fw-bold text-capitalize">Storage</h6>
       <p class="m-0 p-0">${data.minimum_system_requirements?.storage?? "--"}</p></li>
       <li class="h-100 list-group-item bg-transparent p-0 w-100"><h6 class="mb-0 fw-bold text-capitalize">Status</h6>
       <p class="m-0 p-0">${data.status}</p></li>
       
       </ul>
       </div>


       <h3>${data.title} Screenshots</h3>
       <div class="row pt-2">
       <div class="col-md-4">
         <figure>
       <img src="${data.screenshots[0]?.image??'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg'}" class="w-100" alt="details image" />
         </figure>
        </div>
       <div class="col-md-4">
         <figure>
       <img src="${data.screenshots[1]?.image??'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg'}" class="w-100" alt="details image" />
         </figure>
        </div>
       <div class="col-md-4">
         <figure>
       <img src="${data.screenshots[2]?.image??'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg'}" class="w-100" alt="details image" />
         </figure>
        </div>
       </div>

       <button type='submit' class='btn main-btn'><a class="text-decoration-none fw-bold" target='_blank' href='${data.game_url}'>PLAY NOW </a></button>
 
       
    </div>
 </div>
 
    `;

  detailsData.innerHTML = detailsBox;
  documentHTML.body.style.cssText = `background:linear-gradient(
    to bottom,
    rgba(255,255,255, 0.4),
    rgba(255,255,255, 0.8)
  ),url('${data.thumbnail.replace(
    "thumbnail",
    "background"
  )}') center / cover no-repeat `;
}

function show(){
  document.getElementById('hiddenParrafo').style.display = 'block';  
  document.getElementById('showBtn').style.display='none';
}

function goHome(){
  window.location.href='./dashBoard.html'
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
  getGameDetails(id);
  themeConfiguration();
});

modeBtn.addEventListener("click", function (e) {
  themeToggle(e.target);
});

closeBtn.addEventListener("click", function () {
  goHome();
});
