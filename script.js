const mcTranslations = {
    de: {
        calc_turning: "Schnittdaten Drehen",
        calc_drilling: "Schnittdaten Bohren",
        calc_milling: "Schnittdaten Fräsen",
        calc_time: "Hauptnutzungszeit",
        calc_weight: "Gewichtrechner",
        weight_title: "Gewichtrechner Rohmaterial",
        shape: "Materialform",
        material: "Werkstoff",
        round: "Rundmaterial",
        square: "Vierkant / Platte",
        pipe: "Rohr (Hohl)",
        dia: "Durchmesser (mm)",
        length: "Länge (mm)",
        width: "Breite (mm)",
        height: "Dicke/Höhe (mm)",
        dia_out: "Außen-Ø (mm)",
        dia_in: "Innen-Ø (mm)",
        steel: "Stahl",
        alu: "Aluminium",
        brass: "Messing",
        copper: "Kupfer",
        btn_calculate: "Berechnen",
        result: "Ergebnis",
        error: "Fehler: Werte prüfen"
    },
    en: {
        calc_turning: "Turning Data",
        calc_drilling: "Drilling Data",
        calc_milling: "Milling Data",
        calc_time: "Machining Time",
        calc_weight: "Weight Calculator",
        weight_title: "Material Weight Calculator",
        shape: "Shape",
        material: "Material",
        round: "Round Bar",
        square: "Square / Plate",
        pipe: "Pipe (Hollow)",
        dia: "Diameter (mm)",
        length: "Length (mm)",
        width: "Width (mm)",
        height: "Thickness (mm)",
        dia_out: "Outer Ø (mm)",
        dia_in: "Inner Ø (mm)",
        steel: "Steel",
        alu: "Aluminum",
        brass: "Brass",
        copper: "Copper",
        btn_calculate: "Calculate",
        result: "Result",
        error: "Error: Check values"
    },
    it: {
        calc_turning: "Dati di Taglio Tornitura",
        calc_drilling: "Dati di Taglio Foratura",
        calc_milling: "Dati di Taglio Fresatura",
        calc_time: "Tempo di Lavorazione",
        calc_weight: "Calcolatore Peso",
        weight_title: "Calcolo Peso Materiale",
        shape: "Forma",
        material: "Materiale",
        round: "Tondo",
        square: "Quadro / Piastra",
        pipe: "Tubo",
        dia: "Diametro (mm)",
        length: "Lunghezza (mm)",
        width: "Larghezza (mm)",
        height: "Spessore (mm)",
        dia_out: "Ø Esterno (mm)",
        dia_in: "Ø Interno (mm)",
        steel: "Acciaio",
        alu: "Alluminio",
        brass: "Ottone",
        copper: "Rame",
        btn_calculate: "Calcolare",
        result: "Risultato",
        error: "Errore: Controlla i valori"
    }
};

let mcCurrentLang = 'de';

// Initialisierung
function mcInit() {
    mcRenderMenu();
    mcRenderWeightCalc();
}

function mcChangeLanguage(lang) {
    mcCurrentLang = lang;
    mcInit();
}

// Rendert das Kachelmenü
function mcRenderMenu() {
    const container = document.getElementById('mc-tile-menu-container');
    const t = mcTranslations[mcCurrentLang];
    
    const menuItems = [
        { id: 'turning', icon: '🌀', title: t.calc_turning },
        { id: 'drilling', icon: '⚙️', title: t.calc_drilling },
        { id: 'milling', icon: '✂️', title: t.calc_milling },
        { id: 'time', icon: '⏱️', title: t.calc_time },
        { id: 'weight', icon: '⚖️', title: t.calc_weight }
    ];

    container.innerHTML = menuItems.map(item => `
        <div class="mc-tile" onclick="mcHandleMenuClick('${item.id}')">
            <span class="mc-tile-icon">${item.icon}</span>
            <span class="mc-tile-title">${item.title}</span>
        </div>
    `).join('');
}

// Rendert den Gewichtrechner
function mcRenderWeightCalc() {
    const container = document.getElementById('mc-weight-calculator');
    const t = mcTranslations[mcCurrentLang];
    
    container.innerHTML = `
        <h3>${t.weight_title}</h3>
        <div class="mc-form-group">
            <label>${t.shape}</label>
            <select id="mc-shape-select" onchange="mcUpdateWeightFields()">
                <option value="round">${t.round}</option>
                <option value="square">${t.square}</option>
                <option value="pipe">${t.pipe}</option>
            </select>
        </div>
        <div class="mc-form-group">
            <label>${t.material}</label>
            <select id="mc-mat-select">
                <option value="7.85">${t.steel} (7.85)</option>
                <option value="2.7">${t.alu} (2.70)</option>
                <option value="8.4">${t.brass} (8.40)</option>
                <option value="8.96">${t.copper} (8.96)</option>
            </select>
        </div>
        <div id="mc-dynamic-inputs"></div>
        <button class="mc-calc-btn" onclick="mcDoWeightCalculation()">${t.btn_calculate}</button>
        <div id="mc-weight-result" class="mc-result-display" style="display:none"></div>
    `;
    mcUpdateWeightFields();
}

function mcUpdateWeightFields() {
    const shape = document.getElementById('mc-shape-select').value;
    const div = document.getElementById('mc-dynamic-inputs');
    const t = mcTranslations[mcCurrentLang];
    let html = '';

    if(shape === 'round') {
        html += mcInputHtml('mc-in-dia', t.dia) + mcInputHtml('mc-in-len', t.length);
    } else if(shape === 'square') {
        html += mcInputHtml('mc-in-w', t.width) + mcInputHtml('mc-in-h', t.height) + mcInputHtml('mc-in-len', t.length);
    } else if(shape === 'pipe') {
        html += mcInputHtml('mc-in-da', t.dia_out) + mcInputHtml('mc-in-di', t.dia_in) + mcInputHtml('mc-in-len', t.length);
    }
    div.innerHTML = html;
}

function mcInputHtml(id, label) {
    return `<div class="mc-form-group"><label>${label}</label><input type="number" id="${id}" step="any" value="0"></div>`;
}

function mcDoWeightCalculation() {
    const shape = document.getElementById('mc-shape-select').value;
    const density = parseFloat(document.getElementById('mc-mat-select').value);
    const t = mcTranslations[mcCurrentLang];
    const getVal = (id) => parseFloat(document.getElementById(id)?.value || 0);
    
    let volumeMm3 = 0;

    if(shape === 'round') {
        volumeMm3 = Math.PI * Math.pow(getVal('mc-in-dia')/2, 2) * getV('mc-in-len');
    } else if(shape === 'square') {
        volumeMm3 = getVal('mc-in-w') * getVal('mc-in-h') * getVal('mc-in-len');
    } else if(shape === 'pipe') {
        volumeMm3 = Math.PI * (Math.pow(getVal('mc-in-da')/2, 2) - Math.pow(getVal('mc-in-di')/2, 2)) * getVal('mc-in-len');
    }

    const weightKg = (volumeMm3 / 1000000) * density;
    const resDiv = document.getElementById('mc-weight-result');
    resDiv.style.display = 'block';
    resDiv.innerHTML = `<strong>${t.result}: ${weightKg.toFixed(3)} kg</strong>`;
}

function mcHandleMenuClick(id) {
    console.log("Navigiere zu: " + id);
    // Hier kannst du deine Modals öffnen
    if(id === 'weight') {
        document.getElementById('mc-weight-calculator').scrollIntoView({behavior: "smooth"});
    }
}

// Start
window.onload = mcInit;