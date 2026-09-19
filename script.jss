"use strict";

/*
=========================================================
GOVIND ACCOUNT SYSTEM
Frontend prototype

IMPORTANT:
This is NOT production-grade authentication.
Real production authentication should use:
- Backend authentication
- Password hashing
- Secure sessions/cookies
- Server-side authorization

Passwords are intentionally NEVER rendered into the UI.
=========================================================
*/


/* =========================================================
   STORAGE
========================================================= */

const ACCOUNTS_KEY = "govind_accounts_v2";
const SESSION_KEY = "govind_session_v2";


/* =========================================================
   BUILT-IN TEST ACCOUNTS
   ---------------------------------------------------------
   These are stored internally for prototype testing.
   They are NEVER displayed on the website.
========================================================= */

const DEFAULT_TEST_ACCOUNTS = [
  {
    id: "test-account-1",
    name: "Test Account 1",
    username: "test01",
    password: "Prototype_Test_01!",
    admin: true,
    testAccount: true
  },

  {
    id: "test-account-2",
    name: "Test Account 2",
    username: "test02",
    password: "Prototype_Test_02!",
    admin: true,
    testAccount: true
  },

  {
    id: "test-account-3",
    name: "Test Account 3",
    username: "test03",
    password: "Prototype_Test_03!",
    admin: true,
    testAccount: true
  },

  {
    id: "test-account-4",
    name: "Test Account 4",
    username: "test04",
    password: "Prototype_Test_04!",
    admin: true,
    testAccount: true
  },

  {
    id: "test-account-5",
    name: "Test Account 5",
    username: "test05",
    password: "Prototype_Test_05!",
    admin: true,
    testAccount: true
  }
];


/* =========================================================
   ELEMENTS
========================================================= */

const accountModal = document.getElementById("accountModal");
const adminModal = document.getElementById("adminModal");
const editModal = document.getElementById("editModal");

const authView = document.getElementById("authView");
const loggedInView = document.getElementById("loggedInView");

const openAccountBtn = document.getElementById("openAccountBtn");
const heroAccountBtn = document.getElementById("heroAccountBtn");

const closeAccountBtn = document.getElementById("closeAccountBtn");
const closeAdminBtn = document.getElementById("closeAdminBtn");
const closeEditBtn = document.getElementById("closeEditBtn");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const loginError = document.getElementById("loginError");
const signupError = document.getElementById("signupError");
const editError = document.getElementById("editError");

const logoutBtn = document.getElementById("logoutBtn");
const openAdminBtn = document.getElementById("openAdminBtn");

const adminAccountList = document.getElementById("adminAccountList");
const adminSearch = document.getElementById("adminSearch");

const toast = document.getElementById("toast");


/* =========================================================
   HELPERS
========================================================= */

function getAccounts() {
  const saved = localStorage.getItem(ACCOUNTS_KEY);

  if (!saved) {
    const initial = structuredClone(DEFAULT_TEST_ACCOUNTS);

    localStorage.setItem(
      ACCOUNTS_KEY,
      JSON.stringify(initial)
    );

    return initial;
  }

  try {
    return JSON.parse(saved);
  } catch {
    const initial = structuredClone(DEFAULT_TEST_ACCOUNTS);

    localStorage.setItem(
      ACCOUNTS_KEY,
      JSON.stringify(initial)
    );

    return initial;
  }
}


function saveAccounts(accounts) {
  localStorage.setItem(
    ACCOUNTS_KEY,
    JSON.stringify(accounts)
  );
}


function getSession() {
  return localStorage.getItem(SESSION_KEY);
}


function setSession(id) {
  localStorage.setItem(SESSION_KEY, id);
}


function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}


function getCurrentAccount() {
  const sessionId = getSession();

  if (!sessionId) {
    return null;
  }

  return getAccounts().find(
    account => account.id === sessionId
  ) || null;
}


function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}


/* =========================================================
   MODALS
========================================================= */

function openModal(modal) {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}


function closeModal(modal) {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");

  if (
    !accountModal.classList.contains("open") &&
    !adminModal.classList.contains("open") &&
    !editModal.classList.contains("open")
  ) {
    document.body.style.overflow = "";
  }
}


function openAccount() {
  updateAccountUI();
  openModal(accountModal);
}


openAccountBtn.addEventListener("click", openAccount);
heroAccountBtn.addEventListener("click", openAccount);

closeAccountBtn.addEventListener(
  "click",
  () => closeModal(accountModal)
);

closeAdminBtn.addEventListener(
  "click",
  () => closeModal(adminModal)
);

closeEditBtn.addEventListener(
  "click",
  () => closeModal(editModal)
);


/* Click outside */

[accountModal, adminModal, editModal].forEach(modal => {

  modal.addEventListener("click", event => {

    if (event.target === modal) {
      closeModal(modal);
    }

  });

});


/* Escape */

document.addEventListener("keydown", event => {

  if (event.key !== "Escape") {
    return;
  }

  closeModal(accountModal);
  closeModal(adminModal);
  closeModal(editModal);

});


/* =========================================================
   AUTH TABS
========================================================= */

document.querySelectorAll(".auth-tab").forEach(tab => {

  tab.addEventListener("click", () => {

    document.querySelectorAll(".auth-tab")
      .forEach(button => {
        button.classList.remove("active");
      });

    tab.classList.add("active");

    const selected = tab.dataset.tab;

    if (selected === "login") {

      loginForm.classList.remove("hidden");
      signupForm.classList.add("hidden");

    } else {

      loginForm.classList.add("hidden");
      signupForm.classList.remove("hidden");

    }

    loginError.textContent = "";
    signupError.textContent = "";

  });

});


/* =========================================================
   PASSWORD SHOW/HIDE
========================================================= */

document.querySelectorAll(".password-toggle")
  .forEach(button => {

    button.addEventListener("click", () => {

      const target = document.getElementById(
        button.dataset.target
      );

      if (target.type === "password") {

        target.type = "text";
        button.textContent = "Hide";

      } else {

        target.type = "password";
        button.textContent = "Show";

      }

    });

  });


/* =========================================================
   LOGIN
========================================================= */

loginForm.addEventListener("submit", event => {

  event.preventDefault();

  loginError.textContent = "";

  const username =
    document.getElementById("loginUsername")
      .value
      .trim()
      .toLowerCase();

  const password =
    document.getElementById("loginPassword")
      .value;

  const account = getAccounts().find(
    item =>
      item.username.toLowerCase() === username
  );

  if (!account || account.password !== password) {

    loginError.textContent =
      "Incorrect username or password.";

    return;
  }

  setSession(account.id);

  loginForm.reset();

  updateAccountUI();

  closeModal(accountModal);

  showToast(`Welcome back, ${account.name}!`);

});


/* =========================================================
   CREATE ACCOUNT
========================================================= */

signupForm.addEventListener("submit", event => {

  event.preventDefault();

  signupError.textContent = "";

  const name =
    document.getElementById("signupName")
      .value
      .trim();

  const username =
    document.getElementById("signupUsername")
      .value
      .trim()
      .toLowerCase();

  const password =
    document.getElementById("signupPassword")
      .value;

  if (name.length < 2) {

    signupError.textContent =
      "Please enter your name.";

    return;
  }

  if (!/^[a-z0-9_.-]+$/i.test(username)) {

    signupError.textContent =
      "Username can contain letters, numbers, dots, dashes and underscores.";

    return;
  }

  if (password.length < 6) {

    signupError.textContent =
      "Password must contain at least 6 characters.";

    return;
  }

  const accounts = getAccounts();

  const alreadyExists = accounts.some(
    account =>
      account.username.toLowerCase() === username
  );

  if (alreadyExists) {

    signupError.textContent =
      "That username is already taken.";

    return;
  }

  const newAccount = {

    id:
      "account-" +
      Date.now() +
      "-" +
      Math.random()
        .toString(36)
        .slice(2),

    name,
    username,
    password,

    admin: false,
    testAccount: false

  };

  accounts.push(newAccount);

  saveAccounts(accounts);

  setSession(newAccount.id);

  signupForm.reset();

  updateAccountUI();

  closeModal(accountModal);

  showToast("Your account has been created.");

});


/* =========================================================
   ACCOUNT UI
========================================================= */

function updateAccountUI() {

  const account = getCurrentAccount();

  const navText =
    document.getElementById("navAccountText");

  const navIcon =
    document.getElementById("navAccountIcon");

  const profileName =
    document.getElementById("profileName");

  const profileUsername =
    document.getElementById("profileUsername");

  const profileAvatar =
    document.getElementById("profileAvatar");

  if (!account) {

    authView.classList.remove("hidden");
    loggedInView.classList.add("hidden");

    navText.textContent = "Account";
    navIcon.textContent = "◉";

    return;
  }

  authView.classList.add("hidden");
  loggedInView.classList.remove("hidden");

  navText.textContent = account.name;
  navIcon.textContent = "●";

  profileName.textContent = account.name;
  profileUsername.textContent =
    "@" + account.username;

  profileAvatar.textContent =
    account.name
      .charAt(0)
      .toUpperCase();

  if (account.admin) {

    openAdminBtn.classList.remove("hidden");

  } else {

    openAdminBtn.classList.add("hidden");

  }

}


/* =========================================================
   LOGOUT
========================================================= */

logoutBtn.addEventListener("click", () => {

  clearSession();

  updateAccountUI();

  closeModal(accountModal);

  showToast("You have been logged out.");

});


/* =========================================================
   ADMIN SECURITY CHECK
========================================================= */

function requireAdmin() {

  const account = getCurrentAccount();

  if (!account || !account.admin) {

    showToast("Admin access required.");

    return false;
  }

  return true;
}


/* =========================================================
   OPEN ADMIN
========================================================= */

openAdminBtn.addEventListener("click", () => {

  if (!requireAdmin()) {
    return;
  }

  renderAdminAccounts();

  closeModal(accountModal);
  openModal(adminModal);

});


/* =========================================================
   ADMIN RENDER
========================================================= */

function renderAdminAccounts() {

  if (!requireAdmin()) {
    return;
  }

  const accounts = getAccounts();

  const search =
    adminSearch.value
      .trim()
      .toLowerCase();

  const filtered = accounts.filter(account => {

    return (
      account.name.toLowerCase().includes(search) ||
      account.username.toLowerCase().includes(search)
    );

  });


  document.getElementById("totalAccounts")
    .textContent = accounts.length;

  document.getElementById("adminAccounts")
    .textContent =
      accounts.filter(account => account.admin).length;


  if (!filtered.length) {

    adminAccountList.innerHTML = `
      <div class="admin-account">
        <span>No accounts found.</span>
      </div>
    `;

    return;
  }


  adminAccountList.innerHTML =
    filtered.map(account => {

      const permissionClass =
        account.admin
          ? "permission-admin"
          : "permission-user";

      const permissionText =
        account.admin
          ? "ADMIN"
          : "USER";


      return `
        <div class="admin-account">

          <div class="admin-account-info">

            <div class="admin-avatar">
              ${escapeHTML(
                account.name
                  .charAt(0)
                  .toUpperCase()
              )}
            </div>

            <div>

              <div class="admin-account-name">
                ${escapeHTML(account.name)}
              </div>

              <div class="admin-account-username">
                @${escapeHTML(account.username)}
              </div>

              <span class="permission-badge ${permissionClass}">
                ${permissionText}
              </span>

            </div>

          </div>


          <div class="admin-account-actions">

            <button
              class="small-btn"
              data-action="edit"
              data-id="${account.id}"
            >
              Edit
            </button>

            <button
              class="small-btn"
              data-action="admin"
              data-id="${account.id}"
            >
              ${account.admin
                ? "Revoke Admin"
                : "Give Admin"}
            </button>

            <button
              class="small-btn delete"
              data-action="delete"
              data-id="${account.id}"
            >
              Delete
            </button>

          </div>

        </div>
      `;

    }).join("");

}


/* Search */

adminSearch.addEventListener(
  "input",
  renderAdminAccounts
);


/* =========================================================
   ADMIN ACTIONS
========================================================= */

adminAccountList.addEventListener("click", event => {

  const button =
    event.target.closest("button[data-action]");

  if (!button) {
    return;
  }

  if (!requireAdmin()) {
    return;
  }

  const id = button.dataset.id;
  const action = button.dataset.action;

  if (action === "edit") {
    openEditAccount(id);
  }

  if (action === "admin") {
    toggleAdmin(id);
  }

  if (action === "delete") {
    deleteAccount(id);
  }

});


/* =========================================================
   EDIT ACCOUNT
========================================================= */

function openEditAccount(id) {

  const account =
    getAccounts().find(item => item.id === id);

  if (!account) {
    return;
  }

  document.getElementById("editAccountId")
    .value = account.id;

  document.getElementById("editName")
    .value = account.name;

  document.getElementById("editUsername")
    .value = account.username;

  document.getElementById("editPassword")
    .value = "";

  editError.textContent = "";

  openModal(editModal);

}


document.getElementById("editAccountForm")
  .addEventListener("submit", event => {

    event.preventDefault();

    if (!requireAdmin()) {
      return;
    }

    editError.textContent = "";

    const id =
      document.getElementById("editAccountId")
        .value;

    const name =
      document.getElementById("editName")
        .value
        .trim();

    const username =
      document.getElementById("editUsername")
        .value
        .trim()
        .toLowerCase();

    const newPassword =
      document.getElementById("editPassword")
        .value;

    if (name.length < 2) {

      editError.textContent =
        "Enter a valid display name.";

      return;
    }

    if (!/^[a-z0-9_.-]+$/i.test(username)) {

      editError.textContent =
        "Invalid username.";

      return;
    }

    if (
      newPassword &&
      newPassword.length < 6
    ) {

      editError.textContent =
        "New password must contain at least 6 characters.";

      return;
    }


    const accounts = getAccounts();

    const usernameTaken =
      accounts.some(account =>
        account.id !== id &&
        account.username.toLowerCase() === username
      );

    if (usernameTaken) {

      editError.textContent =
        "That username is already being used.";

      return;
    }


    const account =
      accounts.find(item => item.id === id);

    if (!account) {
      return;
    }

    account.name = name;
    account.username = username;

    /*
      Only replace the password if the admin
      explicitly entered a new one.

      Existing password is NEVER displayed.
    */

    if (newPassword) {
      account.password = newPassword;
    }

    saveAccounts(accounts);

    closeModal(editModal);

    renderAdminAccounts();

    updateAccountUI();

    showToast("Account updated.");

  });


/* =========================================================
   GIVE / REVOKE ADMIN
========================================================= */

function toggleAdmin(id) {

  const accounts = getAccounts();

  const account =
    accounts.find(item => item.id === id);

  if (!account) {
    return;
  }


  /*
    Prevent accidentally removing the final admin.
  */

  if (account.admin) {

    const adminCount =
      accounts.filter(item => item.admin).length;

    if (adminCount <= 1) {

      showToast(
        "At least one admin account must remain."
      );

      return;
    }

  }


  account.admin = !account.admin;

  saveAccounts(accounts);

  renderAdminAccounts();

  updateAccountUI();

  showToast(
    account.admin
      ? "Admin access granted."
      : "Admin access revoked."
  );

}


/* =========================================================
   DELETE ACCOUNT
========================================================= */

function deleteAccount(id) {

  const accounts = getAccounts();

  const account =
    accounts.find(item => item.id === id);

  if (!account) {
    return;
  }


  if (!confirm(
    `Delete "${account.name}"? This cannot be undone.`
  )) {
    return;
  }


  if (account.admin) {

    const adminCount =
      accounts.filter(item => item.admin).length;

    if (adminCount <= 1) {

      showToast(
        "The final admin account cannot be deleted."
      );

      return;
    }

  }


  const current =
    getCurrentAccount();


  const remaining =
    accounts.filter(item => item.id !== id);

  saveAccounts(remaining);


  /*
    If the current account was deleted,
    immediately sign the user out.
  */

  if (current && current.id === id) {

    clearSession();

    closeModal(adminModal);

    updateAccountUI();

    showToast("Your account was deleted.");

    return;
  }


  renderAdminAccounts();

  updateAccountUI();

  showToast("Account deleted.");

}


/* =========================================================
   RESET THE FIVE BUILT-IN TEST ACCOUNTS
========================================================= */

document.getElementById("resetTestAccountsBtn")
  .addEventListener("click", () => {

    if (!require