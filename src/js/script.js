const btnconnexion = document.querySelector(".btn-connexion");

btnconnexion.addEventListener("click", function () {
  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    if (username === storedUsername && password === storedPassword) {
        alert("Connexion réussie !");

    } else {
        alert("Identifiant ou mot de passe incorrect.");
    }
});