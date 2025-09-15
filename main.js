/* ========= AUTHENTICATION ========= */
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function getCurrentUser() {
  return localStorage.getItem("currentUser");
}

function setCurrentUser(email) {
  localStorage.setItem("currentUser", email);
}

function clearCurrentUser() {
  localStorage.removeItem("currentUser");
}

function toggleForm() {
  const title = document.getElementById("form-title");
  const btn = document.getElementById("auth-btn");
  const toggleLink = document.getElementById("toggle-link");

  if (title.innerText === "Login") {
    title.innerText = "Register";
    btn.innerText = "Register";
    toggleLink.innerText = "Login";
  } else {
    title.innerText = "Login";
    btn.innerText = "Login";
    toggleLink.innerText = "Register";
  }
}

function authenticate() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  const title = document.getElementById("form-title").innerText;
  const message = document.getElementById("message");

  let users = getUsers();

  if (title === "Register") {
    if (users.find(u => u.email === email)) {
      message.innerText = "User already exists!";
      return;
    }
    users.push({ email: email, password: pass });
    saveUsers(users);
    message.innerText = "Registered successfully! Please login.";
    toggleForm();
  } else {
    let user = users.find(u => u.email === email && u.password === pass);
    if (user) {
      setCurrentUser(email);
      window.location.href = "index.html";
    } else {
      message.innerText = "Invalid credentials!";
    }
  }
}

function checkLogin() {
  if (!getCurrentUser()) {
    window.location.href = "login.html";
  }
}

function logout() {
  clearCurrentUser();
  window.location.href = "login.html";
}

/* ========= INVENTORY ========= */
function loadInventory() {
  const list = document.getElementById("inventory-list");
  if (!list) return;

  const items = JSON.parse(localStorage.getItem("inventory")) || [];
  list.innerHTML = "";

  items.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ${item.quantity} 
      <button onclick="deleteItem(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
}

function addItem() {
  const name = document.getElementById("item-name").value;
  const qty = document.getElementById("item-qty").value;
  if (!name || !qty) return;

  let items = JSON.parse(localStorage.getItem("inventory")) || [];
  items.push({ name, quantity: qty });
  localStorage.setItem("inventory", JSON.stringify(items));

  document.getElementById("item-name").value = "";
  document.getElementById("item-qty").value = "";

  loadInventory();
}

function deleteItem(index) {
  let items = JSON.parse(localStorage.getItem("inventory")) || [];
  items.splice(index, 1);
  localStorage.setItem("inventory", JSON.stringify(items));
  loadInventory();
}

/* ========= RECIPES ========= */
function generateRecipe() {
  const items = JSON.parse(localStorage.getItem("inventory")) || [];
  const recipeBox = document.getElementById("recipe-box");
  if (!recipeBox) return;

  if (items.length === 0) {
    recipeBox.innerText = "No ingredients in inventory!";
    return;
  }

  recipeBox.innerText =
    "Try making: " + items.map(i => i.name).join(", ") + " Curry!";
}



/* ========= DONATION ========= */
function findNGO() {
  const ngoList = document.getElementById("ngo-list");
  if (!ngoList) return;

  const ngos = ["Helping Hands NGO", "Food For All", "Zero Hunger Mission"];
  ngoList.innerHTML = "";

  ngos.forEach(n => {
    let li = document.createElement("li");
    li.innerText = n;
    ngoList.appendChild(li);
  });
}

function donateNow() {
  alert("Donation request submitted! An NGO will contact you soon.");
}
