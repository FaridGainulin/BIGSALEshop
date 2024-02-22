// API подключения
const USERS_API = "http://localhost:8000/users";
const PRODUCTS_API = "http://localhost:8000/products";

// подключения к навбару
const navLogText = document.querySelector("#nav-log-text");
const navInpSearch = document.querySelector("#nav-inp-search");
const navBtnAdd = document.querySelector("#nav-btn-add");
const navBtnReg = document.querySelector("#nav-btn-reg");
const navBtnLog = document.querySelector("#nav-btn-log");
const navBtnOut = document.querySelector("#nav-btn-out");

// подключения к модалке регистрации
const modalReg = document.querySelector("#modal-reg");
const modalRegP = document.querySelector("#modal-reg-p");
const formReg = document.querySelector("#form-reg");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const age = document.querySelector("#age");
const password = document.querySelector("#password");
const passwordConf = document.querySelector("#passwordConf");
const btnReg = document.querySelector("#btn-reg");

const btnCancel = document.querySelector("#cancel");

// подключения к модалке входа
const modalLog = document.querySelector("#modal-log");
const formLog = document.querySelector("#form-log");
const usernameLogin = document.querySelector("#username-login");
const passwordLogin = document.querySelector("#password-login");
const btnLog = document.querySelector("#btn-log");

// подключения к модалке добавления
const modalAdd = document.querySelector("#modal-add");
const formAdd = document.querySelector("#form-add");
const title = document.querySelector("#title");
const category = document.querySelector("#category");
const price = document.querySelector("#price");
const image = document.querySelector("#image");
const btnAdd = document.querySelector("#btn-add");

// подключения к модалке изменения
const modalEdit = document.querySelector("#modal-edit");
const formEdit = document.querySelector("#form-edit");
const titleEdit = document.querySelector("#titleEdit");
const categoryEdit = document.querySelector("#categoryEdit");
const priceEdit = document.querySelector("#priceEdit");
const imageEdit = document.querySelector("#imageEdit");
const btnEdit = document.querySelector("#btn-edit");

//Функция проверки уникальности имени
async function checkUniqueUserName(username) {
  let res = await fetch(USERS_API);
  let users = await res.json();
  return users.some((item) => item.username === username);
}

//Функция скрытия модалки регистрации
function hideModalReg() {
  modalReg.classList.toggle("display-none");
}

//проверка пароля на длину
password.addEventListener("input", () => {
  if (password.value.length < 6) {
    password.style.border = "3px solid red";
    password.style.borderRadius = "3px";
  } else {
    password.style.border = "3px solid green";
    password.style.borderRadius = "3px";
  }
});

//проверка подтверждения пароля
passwordConf.addEventListener("input", () => {
  if (passwordConf.value.length < 6 || password.value !== passwordConf.value) {
    passwordConf.style.border = "3px solid red";
    passwordConf.style.borderRadius = "3px";
  } else {
    passwordConf.style.border = "3px solid green";
    passwordConf.style.borderRadius = "3px";
  }
});

//отбражение модалки регистрации
navBtnReg.addEventListener("click", () => {
  modalReg.classList.toggle("display-none");
});

//Функция проверки регистрации пользователя
async function registerUser(e) {
  e.preventDefault();
  if (
    !username.value.trim() ||
    !email.value.trim() ||
    !age.value.trim() ||
    !password.value.trim() ||
    !passwordConf.value.trim()
  ) {
    modalRegP.innerText = "*Заполните все поля";
    return;
  }

  if (password.value !== passwordConf.value) {
    modalRegP.innerText = " *Пароли не совпадают";
    return;
  }

  if (password.value.length < 6) {
    modalRegP.innerText = " *Пароль должен быть не менее 6 символов";
    return;
  }

  if (await checkUniqueUserName(username.value)) {
    modalRegP.innerText = "*Имя уже занято";
    return;
  }

  const userObj = {
    username: username.value,
    email: email.value,
    age: age.value,
    isAdmin: false,
    password: password.value,
  };

  fetch(USERS_API, {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  username.value = "";
  email.value = "";
  age.value = "";
  password.value = "";
  passwordConf.value = "";
  modalRegP.innerText = "";
  password.style = "none";
  passwordConf.style = "none";

  hideModalReg();
}

formReg.addEventListener("submit", registerUser);
btnCancel.addEventListener("click", hideModalReg);

//Логин
navBtnLog.addEventListener("click", () => {
  modalLog.classList.toggle("display-none");
});
