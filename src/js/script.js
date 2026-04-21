const btnconnexion = document.querySelector(".btn-connexion");

if (btnconnexion) btnconnexion.addEventListener("click", function () {
  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    if (username === storedUsername && password === storedPassword) {
        window.location.href = "./src/pages/dashboard.html";
    } else {
        alert("Identifiant ou mot de passe incorrect.");
    }
});

// ── Utilitaires ───────────────────────────────────────────────
function esc(s) {
    return String(s || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
 
// ── Rendu du tableau ──────────────────────────────────────────
function render() {
    const clients = getClients();
    const tbody   = document.getElementById('tbody');
    if (!tbody) return;
 
    tbody.innerHTML = '';
 
    const n = clients.length;
    document.getElementById('count').textContent = n + ' client' + (n > 1 ? 's' : '');
 
    if (n === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="px-6 py-10 text-center text-sm text-gray-300">
                    Aucun client pour l'instant.
                </td>
            </tr>`;
        return;
    }
 
    clients.forEach(c => {
        const tr = document.createElement('tr');
        tr.className = 'border-b border-gray-100 last:border-0 hover:bg-gray-50/60 transition-colors';
        tr.innerHTML = `
            <td class="px-6 py-4 text-sm font-semibold text-gray-800">${esc(c.nom)}</td>
            <td class="px-6 py-4 text-sm text-gray-700">${esc(c.prenom)}</td>
            <td class="px-6 py-4 text-sm text-gray-500">${esc(c.email)}</td>
            <td class="px-6 py-4 text-sm text-gray-500">${esc(c.tel)}</td>
            <td class="px-6 py-4 text-sm text-gray-700">${esc(c.ville)}</td>
            <td class="px-6 py-4">
                <button onclick="deleteClient(${c.id})"
                    class="text-sm font-medium text-red-400 hover:text-red-600 transition-colors">
                    Supprimer
                </button>
            </td>`;
        tbody.appendChild(tr);
    });
}
 
// ── CRUD clients ──────────────────────────────────────────────
function deleteClient(id) {
    let clients = getClients();
    clients = clients.filter(c => c.id !== id);
    saveClients(clients);
    render();
    toast('Client supprimé', false);
}
 
function addClient() {
    const nom     = document.getElementById('fNom').value.trim();
    const prenom  = document.getElementById('fPrenom').value.trim();
    const email   = document.getElementById('fEmail').value.trim();
    const tel     = document.getElementById('fTel').value.trim();
    const adresse = document.getElementById('fAdresse').value.trim();
    const ville   = document.getElementById('fVille').value.trim();
 
    // Validation
    let valid = true;
    ['fNom', 'fPrenom', 'fEmail'].forEach(id =>
        document.getElementById(id).classList.remove('border-red-300')
    );
    if (!nom)                           { document.getElementById('fNom').classList.add('border-red-300');    valid = false; }
    if (!prenom)                        { document.getElementById('fPrenom').classList.add('border-red-300'); valid = false; }
    if (!email || !email.includes('@')) { document.getElementById('fEmail').classList.add('border-red-300');  valid = false; }
 
    if (!valid) { toast('Veuillez remplir les champs obligatoires', true); return; }
 
    const clients = getClients();
    clients.push({ id: getNextClientId(), nom, prenom, email, tel, adresse, ville });
    saveClients(clients);
    render();
    clearForm();
    document.getElementById('formSection').classList.add('hidden');
    document.body.style.overflow = '';
    toast('Client ajouté avec succès', false);
}
 
// ── Formulaire ────────────────────────────────────────────────
function toggleForm() {
    const fs = document.getElementById('formSection');
    fs.classList.toggle('hidden');
    if (!fs.classList.contains('hidden')) {
        document.body.style.overflow = 'hidden';
        document.getElementById('fNom').focus();
    } else {
        document.body.style.overflow = '';
    }
}
 
function cancelForm() {
    clearForm();
    document.getElementById('formSection').classList.add('hidden');
    document.body.style.overflow = '';
}
 
function clearForm() {
    ['fNom', 'fPrenom', 'fEmail', 'fTel', 'fAdresse', 'fVille'].forEach(id => {
        const el = document.getElementById(id);
        el.value = '';
        el.classList.remove('border-red-300');
    });
}
 
// ── Toast ─────────────────────────────────────────────────────
function toast(msg, isError) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = `fixed bottom-6 right-6 text-white text-sm px-4 py-2.5 rounded-lg pointer-events-none transition-opacity duration-300 z-50 ${isError ? 'bg-red-500' : 'bg-indigo-600'}`;
    t.style.opacity = '1';
    setTimeout(() => { t.style.opacity = '0'; }, 2500);
}
 
// ── Init ──────────────────────────────────────────────────────
if (window.location.hash === '#nouveau') toggleForm();
render();