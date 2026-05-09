const mcLangData = {
    de: {
        tab_cutting: "Schnittdaten",
        tab_time: "Hauptnutzungszeit",
        tab_weight: "Gewichtsrechner",
        sub_turn: "Drehen",
        sub_drill: "Bohren",
        sub_mill: "Fräsen",
        time_title: "Berechnung Hauptnutzungszeit",
        placeholder_turning: "Hier erscheinen die Eingabefelder für Drehen...",
        placeholder_drilling: "Hier erscheinen die Eingabefelder für Bohren...",
        placeholder_milling: "Hier erscheinen die Eingabefelder für Fräsen...",
        placeholder_time: "Konfiguration der Zeitberechnung folgt hier...",
        weight_title: "Gewichtrechner Rohmaterial",
        label_shape: "Form",
        opt_round: "Rundmaterial",
        opt_square: "Vierkant/Platte",
        btn_calc: "Berechnen"
    },
    en: {
        tab_cutting: "Cutting Data",
        tab_time: "Machining Time",
        tab_weight: "Weight Calculator",
        sub_turn: "Turning",
        sub_drill: "Drilling",
        sub_mill: "Milling",
        time_title: "Machining Time Calculation",
        placeholder_turning: "Turning input fields will appear here...",
        placeholder_drilling: "Drilling input fields will appear here...",
        placeholder_milling: "Milling input fields will appear here...",
        placeholder_time: "Time calculation settings follow here...",
        weight_title: "Material Weight Calculator",
        label_shape: "Shape",
        opt_round: "Round Bar",
        opt_square: "Square/Plate",
        btn_calc: "Calculate"
    },
    it: {
        tab_cutting: "Dati di taglio",
        tab_time: "Tempo di lavorazione",
        tab_weight: "Calcolo peso",
        sub_turn: "Tornitura",
        sub_drill: "Foratura",
        sub_mill: "Fresatura",
        time_title: "Calcolo del tempo di utilizzo principale",
        placeholder_turning: "I campi di inserimento per la tornitura appaiono qui...",
        placeholder_drilling: "I campi per la foratura appaiono qui...",
        placeholder_milling: "I campi per la fresatura appaiono qui...",
        placeholder_time: "La configurazione segue qui...",
        weight_title: "Calcolo peso materiale",
        label_shape: "Forma",
        opt_round: "Tondo",
        opt_square: "Quadro/Piastra",
        btn_calc: "Calcolare"
    }
};

let mcActiveLang = 'de';

// Hauptfunktion zum Umschalten der Tabs
function mcShowTab(sectionId, btnElement) {
    // Alle Panels verstecken
    document.querySelectorAll('.mc-tab-panel').forEach(p => p.classList.remove('mc-visible'));
    // Aktives Panel zeigen
    document.getElementById(sectionId).classList.add('mc-visible');
    
    // Tab-Buttons Styling
    document.querySelectorAll('.mc-tab-btn').forEach(b => b.classList.remove('mc-active'));
    btnElement.classList.add('mc-active');
}

// Unterbereiche (Sub-Tabs) umschalten
function mcShowSub(subId) {
    document.querySelectorAll('.mc-sub-panel').forEach(p => p.classList.remove('mc-visible'));
    document.getElementById(subId).classList.add('mc-visible');
}

// Sprache aktualisieren
function mcUpdateUI() {
    const t = mcLangData[mcActiveLang];
    
    // Buttons & Navigation
    document.getElementById('mc-btn-cutting').innerText = t.tab_cutting;
    document.getElementById('mc-btn-time').innerText = t.tab_time;
    document.getElementById('mc-btn-weight').innerText = t.tab_weight;
    
    document.getElementById('mc-btn-turn').innerText = t.sub_turn;
    document.getElementById('mc-btn-drill').innerText = t.sub_drill;
    document.getElementById('mc-btn-mill').innerText = t.sub_mill;
    
    // Texte & Titel
    document.getElementById('mc-txt-time-title').innerText = t.time_title;
    
    // Platzhalter
    document.getElementById('mc-txt-turning-placeholder').innerText = t.placeholder_turning;
    document.getElementById('mc-txt-drilling-placeholder').innerText = t.placeholder_drilling;
    document.getElementById('mc-txt-milling-placeholder').innerText = t.placeholder_milling;
    document.getElementById('mc-txt-time-placeholder').innerText = t.placeholder_time;
    
    // Hier würde die Funktion aufgerufen, die den Gewichtrechner neu rendert
    mcRenderWeightCalc(); 
}

function mcChangeLanguage(lang) {
    mcActiveLang = lang;
    mcUpdateUI();
}

// Beispielhafter Aufruf für den Gewichtrechner-Block
function mcRenderWeightCalc() {
    const container = document.getElementById('mc-weight-calc-container');
    const t = mcLangData[mcActiveLang];
    
    // Hier wird das HTML des Gewichtrechners dynamisch eingesetzt
    container.innerHTML = `
        <div class="mc-weight-box">
            <h3>${t.weight_title}</h3>
            <p>${t.label_shape}: 
                <select>
                    <option>${t.opt_round}</option>
                    <option>${t.opt_square}</option>
                </select>
            </p>
            <button class="mc-calc-btn" style="background:var(--mc-accent); border:none; color:white; padding:10px 20px; border-radius:8px; cursor:pointer;">
                ${t.btn_calc}
            </button>
        </div>
    `;
}

// Initialisierung beim Laden
window.addEventListener('DOMContentLoaded', () => {
    mcUpdateUI();
});