const documentHTML = document;

//Form fields and inputs
const inputs = documentHTML.querySelectorAll("input");
//[FirstName],[LastName],[Email],[UserName],[Password],[Age]

const registerForm = documentHTML.getElementById("registerForm");
const registerBtn = documentHTML.getElementById("registerBtn");

var toggler = documentHTML.getElementById("toggler");

//mode{dark-light} Btn
const modeBtn = document.getElementById("mode");

/*******************************Actions************************************ */
async function setForm() {
  const newUser = {
    first_name: inputs[0].value,
    last_name: inputs[1].value,
    email: inputs[2].value,
    uname: inputs[3].value,
    password: inputs[4].value,
    age: inputs[5].value,
  };

  const response = await registerApi(newUser);

  const msgElement = documentHTML.getElementById("msg");

  if (response.message === "success") {
    location.href = "./index.html";
  } else {
    //The optional chaining (?.) operator accesses an object's property or calls a function. 
    //If the object accessed or function called using this operator is {undefined} or {null}, 
    //the expression short circuits and evaluates to <<<undefined>>> instead of throwing an error.
    msgElement.innerText = response.errors?.email?.message;
  }
}

async function registerApi(user){
    registerBtn.setAttribute("disabled", true);

    //The code in the try block is executed first, 
    //and if it throws an exception, the code in the catch block will be executed
    try {
       const api = await fetch(`https://sticky-note-fe.vercel.app/signup`, {
          method: "POST",
          headers: {
             "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
       });
 
       const response = await api.json();
       registerBtn.removeAttribute("disabled");
       return response; 

    } catch (error) {
       registerBtn.removeAttribute("disabled");
       console.log("error", error);
    }
}

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

if (inputs[4]) {
  toggler.addEventListener("click", function () {
    showHidePassword(inputs[4]);
  });
}

/********************************Validation********************************** */
function nameValidation(input) {
  //regex that supports Arabic and English letters & Characters
  const regex = /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;

  if (regex.test(input.value)) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}

function emailValidation() {
  //Another valid regex to check on E-mails Input
  const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  if (regex.test(inputs[2].value)) {
    inputs[2].classList.remove("is-invalid");
    inputs[2].classList.add("is-valid");
    return true;
  } else {
    inputs[2].classList.add("is-invalid");
    inputs[2].classList.remove("is-valid");
    return false;
  }
}

function unameValidation() {
  var regex = /^(?=.{4,32}$)(?![_.-])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$/;

  if (regex.test(inputs[3].value)) {
    inputs[3].classList.remove("is-invalid");
    inputs[3].classList.add("is-valid");
    return true;
  } else {
    inputs[3].classList.add("is-invalid");
    inputs[3].classList.remove("is-valid");
    return false;
  }
}

function passwordValidation() {
  //Another valid regex to check on Password Input
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (regex.test(inputs[4].value)) {
    inputs[4].classList.remove("is-invalid");
    inputs[4].classList.add("is-valid");
    return true;
  } else {
    inputs[4].classList.add("is-invalid");
    inputs[4].classList.remove("is-valid");
    return false;
  }
}

function ageValidation() {
  //Regex that only supports players from 10-80 years old
  const ageRegex = /^([1-7][0-9]|80)$/;

  if (ageRegex.test(inputs[5].value)) {
    inputs[5].classList.remove("is-invalid");
    inputs[5].classList.add("is-valid");
    return true;
  } else {
    inputs[5].classList.add("is-invalid");
    inputs[5].classList.remove("is-valid");
    return false;
  }
}

//total Validation check
function inputsAreValid() {
  if (
    nameValidation(inputs[0]) &&
    nameValidation(inputs[1]) &&
    emailValidation() &&
    unameValidation() &&
    passwordValidation() &&
    ageValidation()
  ) {
    // alertValid.classList.replace('d-block','d-none')
    registerBtn.removeAttribute("disabled");
    return true;
  } else {
    registerBtn.setAttribute("disabled", true);
    // alertValid.classList.replace('d-none','d-block')
    return false;
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


/*********************************Event Listeners*************************************** */

documentHTML.addEventListener("DOMContentLoaded", function () {
  themeConfiguration();
});

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (inputsAreValid()) {
    setForm();
  }
});

registerForm.addEventListener("input", function () {
  inputsAreValid();
});

 modeBtn.addEventListener("click", function (e) {
    themeToggle(e.target);
 });
