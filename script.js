const translations = {
    de: {
        btn_t1: "📊 Schnittdaten", btn_t2: "⏱️ th Zeit", btn_t3: "⚖️ Gewicht", btn_t4: "🌀 Kompressor",
        sbtn_turn: "🔄 Drehen", sbtn_mill: "🚜 Fräsen", sbtn_drill: "🎯 Bohren",
        h_time: "⏱️ Hauptnutzungszeit th", h_weight: "⚖️ Gewichtsberechnung", h_comp: "🌀 Kolbenkompressor Technik",
        lbl_d: "Werkstück-Ø d (mm)", lbl_vc: "Schnittgeschw. vc (m/min)", lbl_f: "Vorschub f (mm/U)",
        lbl_fz: "Vorschub/Zahn fz (mm)", lbl_z: "Zähnezahl z", lbl_l: "Eingriffslänge L (mm)",
        lbl_n: "Drehzahl n (1/min)", lbl_i: "Schnitte i", btn_calc: "🚀 Berechnen",
        opt_Vh: "📏 Hubvolumen Vh", opt_F: "💪 Kolbenbelastung F", opt_Mmit: "⚙️ Drehmoment Mmit",
        opt_P: "🔋 Antriebsleistung P", opt_Qth: "💨 Luftmenge Qth",
        input_r: "Kurbelradius r (mm)", input_p: "Druck p (bar)", input_vh_val: "Hubvolumen Vh (cm³)",
        input_m: "Drehmoment M (Nm)", res_error: "Eingabe prüfen!"
    },
    en: {
        btn_t1: "📊 Cutting Data", btn_t2: "⏱️ th Time", btn_t3: "⚖️ Weight", btn_t4: "🌀 Compressor",
        sbtn_turn: "🔄 Turning", sbtn_mill: "🚜 Milling", sbtn_drill: "🎯 Drilling",
        h_time: "⏱️ Machining Time th", h_weight: "⚖️ Weight Calculation", h_comp: "🌀 Piston Compressor Tech",
        lbl_d: "Workpiece Ø d (mm)", lbl_vc: "Cutting Speed vc (m/min)", lbl_f: "Feed f (mm/rev)",
        lbl_fz: "Feed per tooth fz (mm)", lbl_z: "Number of teeth z", lbl_l: "Length L (mm)",
        lbl_n: "Speed n (RPM)", lbl_i: "Passes i", btn_calc: "🚀 Calculate",
        opt_Vh: "📏 Displacement Vh", opt_F: "💪 Piston Load F", opt_Mmit: "⚙️ Torque Mmit",
        opt_P: "🔋 Power P", opt_Qth: "💨 Air Flow Qth",
        input_r: "Crank radius r (mm)", input_p: "Pressure p (bar)", input_vh_val: "Displacement Vh (cm³)",
        input_m: "Torque M (Nm)", res_error: "Check input!"
    },
    it: {
        btn_t1: "📊 Dati di Taglio", btn_t2: "⏱️ th Tempo", btn_t3: "⚖️ Peso", btn_t4: "🌀 Compressore",
        sbtn_turn: "🔄 Tornitura", sbtn_mill: "🚜 Fresatura", sbtn_drill: "🎯 Foratura",
        h_time: "⏱️ Tempo di lavorazione th", h_weight: "⚖️ Calcolo del Peso", h_comp: "🌀 Tecnica Compressore",
        lbl_d: "Pezzo Ø d (mm)", lbl_vc: "Velocità vc (m/min)", lbl_f: "Avanzamento f (mm/g)",
        lbl_fz: "Avanzamento dente fz (mm)", lbl_z: "Numero denti z", lbl_l: "Lunghezza L (mm)",
        lbl_n: "Giri n (giri/min)", lbl_i: "Passate i", btn_calc: "🚀 Calcolare",
        opt_Vh: "📏 Cilindrata Vh", opt_F: "💪 Carico pistone F", opt_Mmit: "⚙️ Coppia Mmit",
        opt_P: "🔋 Potenza P", opt_Qth: "💨 Quantità aria Qth",
        input_r: "Raggio manovella r (mm)", input_p: "Pressione p (bar)", input_vh_val: "Cilindrata Vh (cm³)",
        input_m: "Coppia M (Nm)", res_error: "Errore input!"
    }
};

let currentLang = 'de';

function changeLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    document.getElementById('btn-t1').innerText = t.btn_t1;
    document.getElementById('btn-t2').innerText = t.btn_t2;
    document.getElementById('btn-t3').innerText = t.btn_t3;
    document.getElementById('btn-t4').innerText = t.btn_t4;
    document.getElementById('sbtn-turn').innerText = t.sbtn_turn;
    document.getElementById('sbtn-mill').innerText = t.sbtn_mill;
    document.getElementById('sbtn-drill').innerText = t.sbtn_drill;
    document.getElementById('h-time').innerText = t.h_time;
    document.getElementById('h-weight').innerText = t.h_weight;
    document.getElementById('h-comp').innerText = t.h_comp;
    renderCompInputs();
}

function openTab(evt, tabId) {
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    evt.currentTarget.classList.add('active');
}

function openSubTab(evt, subId) {
    document.querySelectorAll('.sub-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(subId).classList.add('active');
    evt.currentTarget.classList.add('active');
}

/* ZERSPANUNG */
function calculateCutting() {
    let sub = document.querySelector('.sub-panel.active').id;
    let n, vf;
    if (sub === 'cut-turning') {
        const d = parseFloat(document.getElementById('in-turn-d').value);
        const vc = parseFloat(document.getElementById('in-turn-vc').value);
        const f = parseFloat(document.getElementById('in-turn-f').value);
        n = (vc * 1000) / (Math.PI * d);
        vf = n * f;
    } else if (sub === 'cut-milling') {
        const d = parseFloat(document.getElementById('in-mill-d').value);
        const vc = parseFloat(document.getElementById('in-mill-vc').value);
        const fz = parseFloat(document.getElementById('in-mill-fz').value);
        const z = parseFloat(document.getElementById('in-mill-z').value);
        n = (vc * 1000) / (Math.PI * d);
        vf = n * fz * z;
    } else {
        const d = parseFloat(document.getElementById('in-drill-d').value);
        const vc = parseFloat(document.getElementById('in-drill-vc').value);
        const f = parseFloat(document.getElementById('in-drill-f').value);
        n = (vc * 1000) / (Math.PI * d);
        vf = n * f;
    }
    const res = document.getElementById('res-cut');
    res.innerHTML = `Drehzahl n: ${n.toFixed(0)} 1/min | Vorschub vf: ${vf.toFixed(1)} mm/min`;
    res.style.display = 'block';
}

/* ZEIT */
function calculateTime() {
    const l = parseFloat(document.getElementById('in-time-l').value);
    const n = parseFloat(document.getElementById('in-time-n').value);
    const f = parseFloat(document.getElementById('in-time-f').value);
    const i = parseFloat(document.getElementById('in-time-i').value);
    const th = (l * i) / (n * f);
    const res = document.getElementById('res-time');
    res.innerHTML = `Hauptnutzungszeit th = ${th.toFixed(2)} min`;
    res.style.display = 'block';
}

/* GEWICHT */
function toggleWeightInputs() {
    const form = document.getElementById('in-w-form').value;
    document.getElementById('w-d-div').style.display = form === 'round' ? 'flex' : 'none';
    document.getElementById('w-b-div').style.display = form === 'flat' ? 'flex' : 'none';
    document.getElementById('w-h-div').style.display = form === 'flat' ? 'flex' : 'none';
}

function calculateWeight() {
    const rho = parseFloat(document.getElementById('in-w-rho').value);
    const l = parseFloat(document.getElementById('in-w-l').value);
    const form = document.getElementById('in-w-form').value;
    let vol;
    if (form === 'round') {
        const d = parseFloat(document.getElementById('in-w-d').value);
        vol = (Math.PI * Math.pow(d, 2) / 4) * l;
    } else {
        const b = parseFloat(document.getElementById('in-w-b').value);
        const h = parseFloat(document.getElementById('in-w-h').value);
        vol = b * h * l;
    }
    const kg = (vol * rho) / 1000000;
    const res = document.getElementById('res-weight');
    res.innerHTML = `Gesamtmasse: ${kg.toFixed(3)} kg`;
    res.style.display = 'block';
}

/* KOMPRESSOR */
function renderCompInputs() {
    const type = document.getElementById('comp-selector').value;
    const container = document.getElementById('comp-inputs');
    const t = translations[currentLang];
    container.innerHTML = "";
    const add = (id, lbl) => container.innerHTML += `<div class="form-group"><label>${lbl}</label><input type="number" id="cp-${id}"></div>`;
    
    if (type === "Vh") { add("d", t.lbl_d); add("r", t.input_r); }
    if (type === "F") { add("d", t.lbl_d); add("p", t.input_p); }
    if (type === "Mmit") { add("f", "Kraft F (N)"); add("r", t.input_r); }
    if (type === "P") { add("m", t.input_m); add("n", t.lbl_n); }
    if (type === "Qth") { add("vh", t.input_vh_val); add("n", t.lbl_n); }
}

function calculateCompressor() {
    const type = document.getElementById('comp-selector').value;
    const resDiv = document.getElementById('res-comp');
    const get = (id) => parseFloat(document.getElementById('cp-' + id).value);
    let out = "";
    try {
        if (type === "Vh") out = `Vh = ${( ((Math.pow(get('d'),2)/4)*Math.PI * 2*get('r'))/1000 ).toFixed(2)} cm³`;
        if (type === "F") out = `F = ${( (get('p')/10) * ((Math.pow(get('d'),2)/4)*Math.PI) ).toFixed(2)} N`;
        if (type === "Mmit") out = `Mmit = ${( (2 * get('f') * (get('r')/1000)) / Math.PI ).toFixed(2)} Nm`;
        if (type === "P") out = `P = ${( (get('m') * get('n')) / 9550 ).toFixed(2)} kW`;
        if (type === "Qth") out = `Qth = ${( (get('vh') * get('n')) / 1000 ).toFixed(2)} l/min`;
        resDiv.innerHTML = out;
        resDiv.style.display = "block";
    } catch(e) { alert(translations[currentLang].res_error); }
}

window.onload = () => { changeLanguage('de'); renderCompInputs(); };