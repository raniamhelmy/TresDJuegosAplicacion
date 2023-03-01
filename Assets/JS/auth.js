var documentHTML = document;

function checkOnUserLogIn(){
  const token = localStorage.getItem("uToken");
  if (!token) {
     location.href = "./index.html";
  }
}

// Check if the user is already logged In to show his Home Page
documentHTML.addEventListener("DOMContentLoaded", function () {
  checkOnUserLogIn();
});

if(localStorage.getItem("uToken")){
  documentHTML.removeEventListener("DOMContentLoaded", function () {
  checkOnUserLogIn();
});
}