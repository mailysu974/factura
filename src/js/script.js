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

// Convertit "YYYY-MM-DD" → "DD/MM/YYYY"
function isoToFr(dateStr) {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    if (!y || !m || !d) return dateStr; // déjà au bon format
    return `${d}/${m}/${y}`;
}

// ── Toast ─────────────────────────────────────────────────────
function toast(msg, isError = false) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.className = `fixed bottom-6 right-6 text-white text-sm px-4 py-2.5 rounded-lg transition-opacity duration-300 z-50 ${isError ? 'bg-red-500' : 'bg-green-500'}`;
    el.style.opacity = '1';
    setTimeout(() => { el.style.opacity = '0'; }, 3000);
}

// ── Badge statut ──────────────────────────────────────────────
function statutBadge(statut) {
    const map = {
        "Payée":      "bg-green-100 text-green-700",
        "En attente": "bg-yellow-100 text-yellow-700",
        "En retard":  "bg-red-100 text-red-600",
        "Envoyé":     "bg-blue-100 text-blue-700",
        "Brouillon":  "bg-gray-100 text-gray-500",
    };
    const cls = map[statut] || "bg-gray-100 text-gray-500";
    return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}">${esc(statut)}</span>`;
}

// ── Render clients ────────────────────────────────────────────
function renderClients() {
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

// ── Render factures ───────────────────────────────────────────
function renderFactures() {
    const factures     = getFactures();
    const tbodyFacture = document.getElementById('tbodyfacture');
    if (!tbodyFacture) return;

    tbodyFacture.innerHTML = '';
    const n = factures.length;
    document.getElementById('count').textContent = n + ' facture' + (n > 1 ? 's' : '');

    if (n === 0) {
        tbodyFacture.innerHTML = `
            <tr>
                <td colspan="7" class="px-6 py-10 text-center text-sm text-gray-300">
                    Aucune facture pour l'instant.
                </td>
            </tr>`;
        return;
    }

    factures.forEach((f, i) => {
        const tr = document.createElement('tr');
        tr.className = 'border-b border-gray-100 last:border-0 hover:bg-gray-50/60 transition-colors';
        tr.innerHTML = `
            <td class="px-6 py-4 text-sm font-semibold text-gray-800">#${String(i + 1).padStart(3, '0')}</td>
            <td class="px-6 py-4 text-sm text-gray-700">${esc(f.nom)}</td>
            <td class="px-6 py-4 text-sm text-gray-700">${parseFloat(f.montantHT).toFixed(2)} €</td>
            <td class="px-6 py-4 text-sm text-gray-700">${parseFloat(f.montantTTC).toFixed(2)} €</td>
            <td class="px-6 py-4 text-sm text-gray-500">${esc(f.date)}</td>
            <td class="px-6 py-4">${statutBadge(f.statut)}</td>
            <td class="px-6 py-4">
                <button onclick="deleteFacture(${f.id})"
                    class="text-sm font-medium text-red-400 hover:text-red-600 transition-colors">
                    Supprimer
                </button>
            </td>`;
        tbodyFacture.appendChild(tr);
    });
}

// ── Render devis ──────────────────────────────────────────────
function renderDevis() {
    const devis      = getDevis();
    const tbodyDevis = document.getElementById('tbodydevis');
    if (!tbodyDevis) return;

    tbodyDevis.innerHTML = '';
    const n = devis.length;
    document.getElementById('count').textContent = n + ' devis';

    if (n === 0) {
        tbodyDevis.innerHTML = `
            <tr>
                <td colspan="7" class="px-6 py-10 text-center text-sm text-gray-300">
                    Aucun devis pour l'instant.
                </td>
            </tr>`;
        return;
    }

    devis.forEach((d, i) => {
        const tr = document.createElement('tr');
        tr.className = 'border-b border-gray-100 last:border-0 hover:bg-gray-50/60 transition-colors';
        tr.innerHTML = `
            <td class="px-6 py-4 text-sm font-semibold text-gray-800">#${String(i + 1).padStart(3, '0')}</td>
            <td class="px-6 py-4 text-sm text-gray-700">${esc(d.nom)}</td>
            <td class="px-6 py-4 text-sm text-gray-700">${parseFloat(d.montant).toFixed(2)} €</td>
            <td class="px-6 py-4 text-sm text-gray-500">${esc(d.date_emission)}</td>
            <td class="px-6 py-4 text-sm text-gray-500">${esc(d.date_validite)}</td>
            <td class="px-6 py-4">${statutBadge(d.statut)}</td>
            <td class="px-6 py-4">
                <button onclick="deleteDevis(${d.id})"
                    class="text-sm font-medium text-red-400 hover:text-red-600 transition-colors">
                    Supprimer
                </button>
            </td>`;
        tbodyDevis.appendChild(tr);
    });
}

// ── render() auto-détecte la page ─────────────────────────────
function render() {
    if (document.getElementById('tbodydevis')) {
        renderDevis();
    } else if (document.getElementById('tbodyfacture')) {
        renderFactures();
    } else {
        renderClients();
    }
}

// ── Populate select client (partagé factures + devis) ─────────
function populateClientSelect() {
    const select = document.getElementById('fClient');
    if (!select) return;
    const clients = getClients();
    select.innerHTML = '<option value="">-- Choisir un client --</option>';
    clients.forEach(c => {
        const opt = document.createElement('option');
        opt.value = `${c.prenom} ${c.nom}`;
        opt.textContent = `${c.prenom} ${c.nom}`;
        select.appendChild(opt);
    });
}

// ── Clients ───────────────────────────────────────────────────
function deleteClient(id) {
    let clients = getClients();
    clients = clients.filter(c => c.id !== id);
    saveClients(clients);
    render();
    toast('Client supprimé');
}

function addClient() {
    const nom     = document.getElementById('fNom').value.trim();
    const prenom  = document.getElementById('fPrenom').value.trim();
    const email   = document.getElementById('fEmail').value.trim();
    const tel     = document.getElementById('fTel').value.trim();
    const adresse = document.getElementById('fAdresse').value.trim();
    const ville   = document.getElementById('fVille').value.trim();

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
    toast('Client ajouté avec succès');
}

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
        if (!el) return;
        el.value = '';
        el.classList.remove('border-red-300');
    });
}

// ── Factures ──────────────────────────────────────────────────
function deleteFacture(id) {
    let factures = getFactures();
    factures = factures.filter(f => f.id !== id);
    saveFactures(factures);
    render();
    toast('Facture supprimée');
}

function addFacture() {
    const client = document.getElementById('fClient').value.trim();
    const date   = document.getElementById('fDate').value.trim();
    const htRaw  = document.getElementById('fMontantHT').value.trim();
    const statut = document.getElementById('fStatut').value.trim();

    let valid = true;
    ['fClient', 'fDate', 'fMontantHT', 'fStatut'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('border-red-300');
    });

    if (!client)                            { document.getElementById('fClient').classList.add('border-red-300');    valid = false; }
    if (!date)                              { document.getElementById('fDate').classList.add('border-red-300');      valid = false; }
    if (!htRaw || isNaN(parseFloat(htRaw))) { document.getElementById('fMontantHT').classList.add('border-red-300'); valid = false; }
    if (!statut)                            { document.getElementById('fStatut').classList.add('border-red-300');    valid = false; }

    if (!valid) { toast('Veuillez remplir les champs obligatoires.', true); return; }

    const montantHT  = parseFloat(htRaw);
    const montantTTC = +(montantHT * 1.2).toFixed(2);

    const factures = getFactures();
    factures.push({ id: getNextFactureId(), nom: client, montantHT, montantTTC, date: isoToFr(date), statut });
    saveFactures(factures); // ✅ sauvegarde
    render();
    clearFormFacture();
    document.getElementById('formSectionFacture').classList.add('hidden');
    document.body.style.overflow = '';
    toast('Facture ajoutée avec succès');
}

function toggleFormFacture() {
    const fs = document.getElementById('formSectionFacture');
    fs.classList.toggle('hidden');
    if (!fs.classList.contains('hidden')) {
        document.body.style.overflow = 'hidden';
        populateClientSelect();
        document.getElementById('fClient').focus();
    } else {
        document.body.style.overflow = '';
    }
}

function cancelFormFacture() {
    clearFormFacture();
    document.getElementById('formSectionFacture').classList.add('hidden');
    document.body.style.overflow = '';
}

function clearFormFacture() {
    ['fClient', 'fDate', 'fMontantHT', 'fStatut'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.value = '';
        el.classList.remove('border-red-300');
    });
}

// ── Devis ─────────────────────────────────────────────────────
function deleteDevis(id) {
    let devis = getDevis();
    devis = devis.filter(d => d.id !== id);
    saveDevis(devis);
    render();
    toast('Devis supprimé');
}

function addDevis() {
    const client        = document.getElementById('fClient').value.trim();
    const montantRaw    = document.getElementById('fMontant').value.trim();
    const date_emission = document.getElementById('fDate').value.trim();
    const date_validite = document.getElementById('fValidite').value.trim();
    const statut        = document.getElementById('fStatut').value.trim();

    let valid = true;
    ['fClient', 'fMontant', 'fDate', 'fValidite', 'fStatut'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('border-red-300');
    });

    if (!client)                                      { document.getElementById('fClient').classList.add('border-red-300');   valid = false; }
    if (!montantRaw || isNaN(parseFloat(montantRaw))) { document.getElementById('fMontant').classList.add('border-red-300');  valid = false; }
    if (!date_emission)                               { document.getElementById('fDate').classList.add('border-red-300');     valid = false; }
    if (!date_validite)                               { document.getElementById('fValidite').classList.add('border-red-300'); valid = false; }
    if (!statut)                                      { document.getElementById('fStatut').classList.add('border-red-300');   valid = false; }

    if (!valid) { toast('Veuillez remplir les champs obligatoires.', true); return; }

    const montant = parseFloat(montantRaw);

    const devis = getDevis();
    devis.push({ id: getNextDevisId(), nom: client, montant, date_emission: isoToFr(date_emission), date_validite: isoToFr(date_validite), statut });
    saveDevis(devis); // ✅ sauvegarde
    render();
    clearFormDevis();
    document.getElementById('formSectionDevis').classList.add('hidden');
    document.body.style.overflow = '';
    toast('Devis ajouté avec succès');
}

function toggleFormDevis() {
    const fs = document.getElementById('formSectionDevis');
    fs.classList.toggle('hidden');
    if (!fs.classList.contains('hidden')) {
        document.body.style.overflow = 'hidden';
        populateClientSelect();
        document.getElementById('fClient').focus();
    } else {
        document.body.style.overflow = '';
    }
}

function cancelFormDevis() {
    clearFormDevis();
    document.getElementById('formSectionDevis').classList.add('hidden');
    document.body.style.overflow = '';
}

function clearFormDevis() {
    ['fClient', 'fMontant', 'fDate', 'fValidite', 'fStatut'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.value = '';
        el.classList.remove('border-red-300');
    });
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", render);