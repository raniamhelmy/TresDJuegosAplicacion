var documentHTML = document;

//Form fields and inputs
const inputs = documentHTML.querySelectorAll("input");
//[Email],[Password]
const loginForm = documentHTML.getElementById("loginForm");
const loginBtn = documentHTML.getElementById("loginBtn");

//mode{dark-light} Btn
const modeBtn = documentHTML.getElementById("mode");

/************************************Hide/Show Password**************************************** */

function showHidePassword(password) {
  if (password.type == "password") {
    password.setAttribute("type", "text");
    toggler.classList.replace("fa-eye-slash", "fa-eye");
  } else {
    toggler.classList.replace("fa-eye", "fa-eye-slash");
    password.setAttribute("type", "password");
  }
}

if (inputs[1]) {
  toggler.addEventListener("click", function () {
    showHidePassword(password);
  });
}



/*******************************Actions************************************ */
async function setForm() {
  const newUser = {
    email: inputs[0].value,
    password: inputs[1].value,
  };

  const response = await loginApi(newUser);

  const msgElement = documentHTML.getElementById("msg");

  if (response.message === "success") {
    //put the token inside the local storage 
    localStorage.setItem("uToken", response.token);
    window.location.href = "./dashBoard.html";
  } else {
    //The optional chaining (?.) operator accesses an object's property or calls a function. 
    //If the object accessed or function called using this operator is {undefined} or {null}, 
    //the expression short circuits and evaluates to <<<undefined>>> instead of throwing an error.
    msgElement.innerText = response?.message;
  }
}

async function loginApi(user){
    loginBtn.setAttribute("disabled", true);

    //The code in the try block is executed first, 
    //and if it throws an exception, the code in the catch block will be executed
    try {
       const api = await fetch(`https://sticky-note-fe.vercel.app/signin`, {
          method: "POST",
          headers: {
             "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
       });
 
       const response = await api.json();
       loginBtn.removeAttribute("disabled");
       return response; 

    } catch (error) {
       loginBtn.removeAttribute("disabled");
       console.log("error", error);
    }
}


//press enter to logIn
function keyBoardLogIn(e) {
  if (e.keyCode === 13) {
    inputsAreValid();
  }
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


/*******************************Validation********************************* */

function emailValidation() {
  //Another valid regex to check on E-mails Input
  const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  if (regex.test(inputs[0].value)) {
    inputs[0].classList.remove("is-invalid");
    inputs[0].classList.add("is-valid");
    return true;
  } else {
    inputs[0].classList.add("is-invalid");
    inputs[0].classList.remove("is-valid");
    return false;
  }
}

function passwordValidation() {
  //Another valid regex to check on Password Input
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (regex.test(inputs[1].value)) {
    inputs[1].classList.remove("is-invalid");
    inputs[1].classList.add("is-valid");
    return true;
  } else {
    inputs[1].classList.add("is-invalid");
    inputs[1].classList.remove("is-valid");
    return false;
  }
}

//total Validation check
function inputsAreValid() {
  if (
    emailValidation() &&
    passwordValidation() 
  ) {
    // alertValid.classList.replace('d-block','d-none')
    loginBtn.removeAttribute("disabled");
    return true;
  } else {
    loginBtn.setAttribute("disabled", true);
    // alertValid.classList.replace('d-none','d-block')
    return false;
  }
}


/****************************Event Listeners******************************* */
documentHTML.addEventListener("DOMContentLoaded", function () {
  themeConfiguration();
  //documentHTML.documentElement.dataset.theme = localStorage.getItem("theme");
});

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (inputsAreValid()) {
    setForm();
  }
});

loginForm.addEventListener("input", function () {
  inputsAreValid();
});

//fire the keyBoardLogIn function when a specific key is Pressed Down
documentHTML.addEventListener("keydown", keyBoardLogIn);

 modeBtn.addEventListener("click", function (e) {
    themeToggle(e.target);
 });