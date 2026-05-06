const translations = {
    de: {
        home_title: "Wählen Sie einen Rechner",
        nav_bohren_vc: "Schnittdaten Bohren",
        nav_drehen_vc: "Schnittdaten Drehen",
        nav_fraesen_vc: "Schnittdaten Fräsen",
        nav_bohren_th: "Hauptnutzungszeit Bohren",
        nav_drehen_th: "Hauptnutzungszeit Drehen",
        btn_calc: "Berechnen",
        title_results: "Ergebnisse:",
        lbl_d: "Werkzeug-Ø D (mm)",
        lbl_d_work: "Werkstück-Ø D (mm)",
        lbl_vc: "Schnittgeschw. vc (m/min)",
        lbl_f: "Vorschub f (mm/U)",
        lbl_fz: "Zahnvorschub fz (mm)",
        lbl_z: "Zähnezahl z",
        lbl_anschnitt: "Anschnitt (mm)",
        lbl_ueberlauf: "Überlauf (mm)",
        lbl_l: "Schnittlänge/Tiefe L (mm)",
        lbl_i: "Anzahl Schnitte i",
        lbl_n: "Drehzahl n (U/min)",
        res_n: "Drehzahl n",
        res_vf: "Vorschubgeschw. vf",
        res_th: "Hauptnutzungszeit th",
        unit_min: "min",
        unit_mmpm: "mm/min",
        unit_upm: "U/min"
    },
    en: {
        home_title: "Choose a Calculator",
        nav_bohren_vc: "Drilling Data",
        nav_drehen_vc: "Turning Data",
        nav_fraesen_vc: "Milling Data",
        nav_bohren_th: "Machining Time Drilling",
        nav_drehen_th: "Machining Time Turning",
        btn_calc: "Calculate",
        title_results: "Results:",
        lbl_d: "Tool Dia. D (mm)",
        lbl_d_work: "Workpiece Dia. D (mm)",
        lbl_vc: "Cutting Speed vc (m/min)",
        lbl_f: "Feed f (mm/rev)",
        lbl_fz: "Feed/Tooth fz (mm)",
        lbl_z: "Teeth z",
        lbl_anschnitt: "Lead-in (mm)",
        lbl_ueberlauf: "Overrun (mm)",
        lbl_l: "Length L (mm)",
        lbl_i: "Cuts i",
        lbl_n: "Speed n (RPM)",
        res_n: "Speed n",
        res_vf: "Feed Rate vf",
        res_th: "Machining Time th",
        unit_min: "min",
        unit_mmpm: "mm/min",
        unit_upm: "RPM"
    }
    // Italienisch hier bei Bedarf ergänzen...
};

let currentLang = 'de';
let currentCalc = '';

// MODAL FUNKTIONEN
function openModal(type) {
    currentCalc = type;
    setupCalculator(type);
    document.getElementById('modal-overlay').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Verhindert Scrollen im Hintergrund
}

function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Schließen wenn man auf das Overlay klickt
window.onclick = function(event) {
    const modal = document.getElementById('modal-overlay');
    if (event.target == modal) {
        closeModal();
    }
}

function changeLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.innerText = translations[lang][el.getAttribute('data-i18n')];
    });
    if (currentCalc) setupCalculator(currentCalc);
}

function setupCalculator(type) {
    const container = document.getElementById('input-fields');
    const title = document.getElementById('calc-title');
    container.innerHTML = '';
    const t = translations[currentLang];

    let fields = [];
    if (type === 'calc-bohren' || type === 'calc-drehen') {
        title.innerText = type === 'calc-bohren' ? t.nav_bohren_vc : t.nav_drehen_vc;
        fields = [{ id: 'd', label: type === 'calc-bohren' ? t.lbl_d : t.lbl_d_work }, { id: 'vc', label: t.lbl_vc }, { id: 'f', label: t.lbl_f }];
    } else if (type === 'calc-fraesen') {
        title.innerText = t.nav_fraesen_vc;
        fields = [{ id: 'd', label: t.lbl_d }, { id: 'vc', label: t.lbl_vc }, { id: 'fz', label: t.lbl_fz }, { id: 'z', label: t.lbl_z }];
    } else if (type === 'th-bohren' || type === 'th-drehen') {
        title.innerText = type === 'th-bohren' ? t.nav_bohren_th : t.nav_drehen_th;
        fields = [
            { id: 'l', label: t.lbl_l }, { id: 'i', label: t.lbl_i }, 
            { id: 'f', label: t.lbl_f }, { id: 'n', label: t.lbl_n }, 
            { id: 'anschnitt', label: t.lbl_anschnitt }, { id: 'ueberlauf', label: t.lbl_ueberlauf }
        ];
    }

    fields.forEach(f => {
        container.innerHTML += `<div class="input-group"><label>${f.label}</label><input type="number" id="inp-${f.id}" step="any" value="0"></div>`;
    });
    document.getElementById('results-display').innerHTML = '';
}

function calculate() {
    const getVal = (id) => parseFloat(document.getElementById(`inp-${id}`)?.value) || 0;
    const t = translations[currentLang];
    let results = '';

    if (currentCalc === 'calc-bohren' || currentCalc === 'calc-drehen') {
        const n = getVal('d') !== 0 ? (1000 * getVal('vc')) / (Math.PI * getVal('d')) : 0;
        results = renderRes(t.res_n, n.toFixed(0), t.unit_upm) + renderRes(t.res_vf, (n * getVal('f')).toFixed(0), t.unit_mmpm);
    } else if (currentCalc === 'calc-fraesen') {
        const n = getVal('d') !== 0 ? (1000 * getVal('vc')) / (Math.PI * getVal('d')) : 0;
        results = renderRes(t.res_n, n.toFixed(0), t.unit_upm) + renderRes(t.res_vf, (n * getVal('fz') * getVal('z')).toFixed(0), t.unit_mmpm);
    } else if (currentCalc === 'th-bohren' || currentCalc === 'th-drehen') {
        const l_ges = (getVal('l') * (getVal('i') || 1)) + getVal('anschnitt') + getVal('ueberlauf');
        const divisor = getVal('f') * getVal('n');
        const th = divisor !== 0 ? l_ges / divisor : 0;
        results = renderRes(t.res_th, th.toFixed(3), t.unit_min);
    }
    document.getElementById('results-display').innerHTML = results;
}

function renderRes(label, val, unit) {
    return `<div class="res-row"><span>${label}:</span> <span class="res-val">${val} ${unit}</span></div>`;
}

window.onload = () => changeLanguage('de');