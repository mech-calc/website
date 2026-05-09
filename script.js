const translations = {
    de: {
        btn_t1: "Schnittdaten", btn_t2: "Fertigungszeit", btn_t3: "Gewicht", btn_t4: "Kompressoren",
        h_cut: "Schnittdaten berechnen", h_time: "Zeitberechnung", h_weight: "Gewichtsberechnung",
        h_comp: "Kolbenkompressor Rechner", lbl_d: "Durchmesser d (mm)", lbl_vc: "Schnittgeschw. vc (m/min)",
        btn_calc1: "Berechnen", lbl_select_calc: "Berechnung wählen", btn_calc_comp: "Kompressor berechnen",
        opt_A: "Kolbenfläche A", opt_h: "Kolbenhub h", opt_Vh: "Hubvolumen Vh",
        opt_F: "Kolbenbelastung F", opt_sigma: "Flächenpressung σ", opt_Mmax: "Max. Drehmoment Mmax",
        opt_Mmit: "Mittleres Drehmoment Mmit", opt_P: "Antriebsleistung P", opt_Qth: "Theoretische Luftmenge Qth",
        opt_v: "Strömungsgeschwindigkeit v",
        input_d: "Durchmesser d (mm)", input_r: "Kurbelradius r (mm)", input_p: "Druck p (bar)",
        input_n: "Drehzahl n (U/min)", input_F: "Kraft F (N)", input_A: "Fläche A (mm²)",
        input_Vh: "Hubvolumen Vh (cm³)", input_vms: "Geschw. v_m_s (m/s)", input_rmm: "Radius r (mm)",
        res_error: "Bitte alle Felder ausfüllen!"
    },
    en: {
        btn_t1: "Cutting Data", btn_t2: "Machining Time", btn_t3: "Weight", btn_t4: "Compressors",
        h_cut: "Calculate Cutting Data", h_time: "Time Calculation", h_weight: "Weight Calculation",
        h_comp: "Piston Compressor Calculator", lbl_d: "Diameter d (mm)", lbl_vc: "Cutting Speed vc (m/min)",
        btn_calc1: "Calculate", lbl_select_calc: "Select Calculation", btn_calc_comp: "Calculate Compressor",
        opt_A: "Piston Area A", opt_h: "Piston Stroke h", opt_Vh: "Displacement Vh",
        opt_F: "Piston Load F", opt_sigma: "Surface Pressure σ", opt_Mmax: "Max Torque Mmax",
        opt_Mmit: "Mean Torque Mmit", opt_P: "Drive Power P", opt_Qth: "Theoretical Air Flow Qth",
        opt_v: "Flow Velocity v",
        input_d: "Diameter d (mm)", input_r: "Crank Radius r (mm)", input_p: "Pressure p (bar)",
        input_n: "Speed n (rpm)", input_F: "Force F (N)", input_A: "Area A (mm²)",
        input_Vh: "Displacement Vh (cm³)", input_vms: "Velocity v_m_s (m/s)", input_rmm: "Radius r (mm)",
        res_error: "Please fill all fields!"
    },
    it: {
        btn_t1: "Dati di Taglio", btn_t2: "Tempo Produrre", btn_t3: "Peso", btn_t4: "Compressori",
        h_cut: "Calcolo Dati Taglio", h_time: "Calcolo Tempo", h_weight: "Calcolo Peso",
        h_comp: "Calcolatore Compressore a Pistoni", lbl_d: "Diametro d (mm)", lbl_vc: "Velocità vc (m/min)",
        btn_calc1: "Calcolare", lbl_select_calc: "Seleziona Calcolo", btn_calc_comp: "Calcola Compressore",
        opt_A: "Area del pistone A", opt_h: "Corsa del pistone h", opt_Vh: "Cilindrata Vh",
        opt_F: "Carico del pistone F", opt_sigma: "Pressione superficiale σ", opt_Mmax: "Coppia massima Mmax",
        opt_Mmit: "Coppia media Mmit", opt_P: "Potenza motrice P", opt_Qth: "Portata d'aria teorica Qth",
        opt_v: "Velocità del flusso v",
        input_d: "Diametro d (mm)", input_r: "Raggio manovella r (mm)", input_p: "Pressione p (bar)",
        input_n: "Giri n (giri/min)", input_F: "Forza F (N)", input_A: "Area A (mm²)",
        input_Vh: "Cilindrata Vh (cm³)", input_vms: "Velocità v_m_s (m/s)", input_rmm: "Raggio r (mm)",
        res_error: "Per favore compila tutti i campi!"
    }
};

let currentLang = 'de';

function changeLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    for (let key in t) {
        const el = document.getElementById(key.replace(/_/g, '-'));
        if (el) el.innerText = t[key];
    }
    renderCompInputs();
}

function openTab(evt, tabId) {
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    evt.currentTarget.classList.add('active');
}

function renderCompInputs() {
    const type = document.getElementById('comp-selector').value;
    const container = document.getElementById('comp-inputs');
    const t = translations[currentLang];
    container.innerHTML = "";

    const createInput = (id, labelText) => {
        container.innerHTML += `<div class="form-group"><label>${labelText}</label><input type="number" id="in-comp-${id}"></div>`;
    };

    if (type === "A") createInput("d", t.input_d);
    if (type === "h") createInput("r", t.input_r);
    if (type === "Vh") { createInput("d", t.input_d); createInput("r", t.input_r); }
    if (type === "F") { createInput("p", t.input_p); createInput("d", t.input_d); }
    if (type === "sigma") { createInput("F", t.input_F); createInput("A", t.input_A); }
    if (type === "Mmax") { createInput("F", t.input_F); createInput("rmm", t.input_rmm); }
    if (type === "Mmit") { createInput("F", t.input_F); createInput("r", t.input_r); }
    if (type === "P") { createInput("Mmit", "Mmit (Nm)"); createInput("n", t.input_n); }
    if (type === "Qth") { createInput("Vh", t.input_Vh); createInput("n", t.input_n); }
    if (type === "v") { createInput("Vh", t.input_Vh); createInput("vms", t.input_vms); createInput("A", t.input_A); }
}

function calculateCompressor() {
    const type = document.getElementById('comp-selector').value;
    const resDiv = document.getElementById('res-comp');
    const getVal = (id) => parseFloat(document.getElementById('in-comp-' + id).value);
    let result = "";

    try {
        if (type === "A") result = `A = ${((Math.pow(getVal("d"), 2) / 4) * Math.PI).toFixed(2)} mm²`;
        else if (type === "h") result = `h = ${(2 * getVal("r")).toFixed(2)} mm`;
        else if (type === "Vh") result = `Vh = ${(((Math.pow(getVal("d"), 2) / 4) * Math.PI * (2 * getVal("r"))) / 1000).toFixed(2)} cm³`;
        else if (type === "F") result = `F = ${( (getVal("p") / 10) * ((Math.pow(getVal("d"), 2) / 4) * Math.PI) ).toFixed(2)} N`;
        else if (type === "sigma") result = `σ = ${(getVal("F") / getVal("A")).toFixed(2)} N/mm²`;
        else if (type === "Mmax") result = `Mmax = ${(getVal("F") * getVal("rmm") / 1000).toFixed(2)} Nm`;
        else if (type === "Mmit") result = `Mmit = ${( (2 * getVal("F") * (getVal("r")/1000)) / Math.PI ).toFixed(2)} Nm`;
        else if (type === "P") result = `P = ${( (getVal("Mmit") * getVal("n")) / 9550 ).toFixed(2)} kW`;
        else if (type === "Qth") result = `Qth = ${(getVal("Vh") * getVal("n") / 1000).toFixed(2)} l/min`;
        else if (type === "v") result = `v = ${( (getVal("Vh") * 1000 * getVal("vms")) / (getVal("A") * 60) ).toFixed(2)} m/s`;

        resDiv.innerHTML = `<strong>Ergebnis: ${result}</strong>`;
        resDiv.style.display = "block";
    } catch(e) { alert(translations[currentLang].res_error); }
}

window.onload = () => { changeLanguage('de'); renderCompInputs(); };