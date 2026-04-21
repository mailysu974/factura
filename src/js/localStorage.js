localStorage.setItem("username", "admin123");
localStorage.setItem("password", "alice456");

// ── Clients ───────────────────────────────────────────────────
const CLIENTS_KEY   = "factura_clients";
const CLIENT_ID_KEY = "factura_next_client_id";

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

// ── Factures ──────────────────────────────────────────────────
const FACTURES_KEY   = "factura_factures";
const FACTURE_ID_KEY = "factura_next_facture_id";

const SAMPLE_FACTURES = [
    { id: 1, nom: "Alice Martin",    montantHT: 1200.00, montantTTC: 1440.00, date: "01/03/2024", statut: "Payée"      },
    { id: 2, nom: "Marc Dupont",     montantHT:  850.00, montantTTC: 1020.00, date: "15/03/2024", statut: "En attente" },
    { id: 3, nom: "Sophie Bernard",  montantHT:  400.00, montantTTC:  480.00, date: "01/04/2024", statut: "En retard"  },
    { id: 4, nom: "Thomas Lefebvre", montantHT: 2400.00, montantTTC: 2880.00, date: "10/04/2024", statut: "Payée"      },
    { id: 5, nom: "Julie Moreau",    montantHT:  600.00, montantTTC:  720.00, date: "20/04/2024", statut: "En attente" },
    { id: 6, nom: "Alice Martin",    montantHT: 1800.00, montantTTC: 2160.00, date: "01/05/2024", statut: "Payée"      },
];

function getFactures() {
    const raw = localStorage.getItem(FACTURES_KEY);
    if (raw) return JSON.parse(raw);
    saveFactures(SAMPLE_FACTURES);
    localStorage.setItem(FACTURE_ID_KEY, "7");
    return SAMPLE_FACTURES;
}

function saveFactures(factures) {
    localStorage.setItem(FACTURES_KEY, JSON.stringify(factures));
}

function getNextFactureId() {
    const id = parseInt(localStorage.getItem(FACTURE_ID_KEY) || "1", 10);
    localStorage.setItem(FACTURE_ID_KEY, String(id + 1));
    return id;
}

// ── Devis ─────────────────────────────────────────────────────
const DEVIS_KEY   = "factura_devis";
const DEVIS_ID_KEY = "factura_next_devis_id";

const SAMPLE_DEVIS = [
    { id: 1, nom: "Alice Martin",    montant: 3200.00, date_emission: "01/05/2024", date_validite: "01/06/2024", statut: "Brouillon"  },
    { id: 2, nom: "Marc Dupont",     montant: 2400.00, date_emission: "20/03/2024", date_validite: "20/04/2024", statut: "Envoyé"     },
    { id: 3, nom: "Sophie Bernard",  montant:  900.00, date_emission: "05/04/2024", date_validite: "05/05/2024", statut: "En attente" },
    { id: 4, nom: "Julie Moreau",    montant: 1500.00, date_emission: "15/04/2024", date_validite: "15/05/2024", statut: "En retard"  },
];
function getDevis() {
    const raw = localStorage.getItem(DEVIS_KEY);
    if (raw) return JSON.parse(raw);
    saveDevis(SAMPLE_DEVIS);
    localStorage.setItem(DEVIS_ID_KEY, "5");
    return SAMPLE_DEVIS;
}

function saveDevis(devis) {
    localStorage.setItem(DEVIS_KEY, JSON.stringify(devis));
}

function getNextDevisId() {
    const id = parseInt(localStorage.getItem(DEVIS_ID_KEY) || "1", 10);
    localStorage.setItem(DEVIS_ID_KEY, String(id + 1));
    return id;
}