localStorage.setItem("username", "admin123");
localStorage.setItem("password", "alice456");
// ── Clients ───────────────────────────────────────────────────
const CLIENTS_KEY = "factura_clients";
const CLIENT_ID_KEY = "factura_next_client_id";
 
// Données de démonstration (injectées une seule fois)
const SAMPLE_CLIENTS = [
    { id: 1, nom: "Martin",   prenom: "Alice",  email: "alice.martin@gmail.com", tel: "06 12 34 56 78", adresse: "", ville: "Lyon"     },
    { id: 2, nom: "Dupont",   prenom: "Marc",   email: "marc.dupont@gmail.com",  tel: "06 98 76 54 32", adresse: "", ville: "Paris"    },
    { id: 3, nom: "Bernard",  prenom: "Sophie", email: "sophie.b@outlook.com",   tel: "07 11 22 33 44", adresse: "", ville: "Lyon"     },
    { id: 4, nom: "Lefebvre", prenom: "Thomas", email: "thomas.lef@gmail.com",   tel: "06 55 66 77 88", adresse: "", ville: "Bordeaux" },
    { id: 5, nom: "Moreau",   prenom: "Julie",  email: "julie.moreau@yahoo.fr",  tel: "07 44 55 66 77", adresse: "", ville: "Nantes"   },
];
 
function getClients() {
    const raw = localStorage.getItem(CLIENTS_KEY);
    if (raw) return JSON.parse(raw);
    // Premier lancement : on charge les données de démonstration
    saveClients(SAMPLE_CLIENTS);
    localStorage.setItem(CLIENT_ID_KEY, "6");
    return SAMPLE_CLIENTS;
}
 
function saveClients(clients) {
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
}
 
function getNextClientId() {
    const id = parseInt(localStorage.getItem(CLIENT_ID_KEY) || "1", 10);
    localStorage.setItem(CLIENT_ID_KEY, String(id + 1));
    return id;
}