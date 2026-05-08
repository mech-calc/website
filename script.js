const translations = {
    de: {
        home_title: "Wählen Sie einen Rechner",
        nav_drehen_vc: "Schnittdaten Drehen",
        nav_bohren_vc: "Schnittdaten Bohren",
        nav_fraesen_vc: "Schnittdaten Fräsen",
        nav_th: "Hauptnutzungszeit",
        nav_weight: "Gewichtrechner",
        btn_calc: "Berechnen",
        title_results: "Ergebnisse:",
        lbl_d: "Durchmesser D (mm)",
        lbl_vc: "Schnittgeschw. vc (m/min)",
        lbl_f: "Vorschub f (mm/U)",
        lbl_fz: "Zahnvorschub fz (mm)",
        lbl_z: "Zähnezahl z",
        lbl_l: "Schnittlänge L (mm)",
        lbl_i: "Schnitte i",
        lbl_n: "Drehzahl n (U/min)",
        lbl_anschnitt: "Anschnitt (mm)",
        lbl_ueberlauf: "Überlauf (mm)",
        res_n: "Drehzahl n",
        res_vf: "Vorschubgeschw. vf",
        res_th: "Zeit th",
        res_weight: "Gewicht",
        shape: "Form",
        material: "Material"
    },
    en: {
        home_title: "Choose a Calculator",
        nav_drehen_vc: "Turning Data",
        nav_bohren_vc: "Drilling Data",
        nav_fraesen_vc: "Milling Data",
        nav_th: "Machining Time",
        nav_weight: "Weight Calculator",
        btn_calc: "Calculate",
        title_results: "Results:",
        lbl_d: "Diameter D (mm)",
        lbl_vc: "Cutting Speed vc (m/min)",
        lbl_f: "Feed f (mm/rev)",
        lbl_fz: "Feed/Tooth fz (mm)",
        lbl_z: "Teeth z",
        lbl_l: "Length L (mm)",
        lbl_i: "Cuts i",
        lbl_n: "Speed n (RPM)",
        lbl_anschnitt: "Lead-in (mm)",
        lbl_ueberlauf: "Overrun (mm)",
        res_n: "Speed n",
        res_vf: "Feed Velocity vf",
        res_th: "Time th",
        res_weight: "Weight",
        shape: "Shape",
        material: "Material"
    }
};

let currentLang = 'de';
let currentCalc = '';

function openModal(type) {
    currentCalc = type;
    setupFields(type);
    document.getElementById('modal-overlay').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
}

function changeLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.innerText = translations[lang][el.getAttribute('data-i18n')];
    });
    if(currentCalc) setupFields(currentCalc);
}

function setupFields(type) {
    const container = document.getElementById('input-fields');
    const title = document.getElementById('calc-title');
    const t = translations[currentLang];
    container.innerHTML = '';
    document.getElementById('results-display').innerHTML = '';

    if (type === 'calc-drehen' || type === 'calc-bohren') {
        title.innerText = type === 'calc-drehen' ? t.nav_drehen_vc : t.nav_bohren_vc;
        createInput('d', t.lbl_d);
        createInput('vc', t.lbl_vc);
        createInput('f', t.lbl_f);
    } else if (type === 'calc-fraesen') {
        title.innerText = t.nav_fraesen_vc;
        createInput('d', t.lbl_d);
        createInput('vc', t.lbl_vc);
        createInput('fz', t.lbl_fz);
        createInput('z', t.lbl_z);
    } else if (type === 'th-rechner') {
        title.innerText = t.nav_th;
        createInput('l', t.lbl_l);
        createInput('i', t.lbl_i);
        createInput('n', t.lbl_n);
        createInput('f', t.lbl_f);
        createInput('anschnitt', t.lbl_anschnitt);
        createInput('ueberlauf', t.lbl_ueberlauf);
    } else if (type === 'weight-calc') {
        title.innerText = t.nav_weight;
        container.innerHTML = `
            <div class="input-group"><label>${t.shape}</label>
            <select id="inp-shape" onchange="setupFields('weight-calc')">
                <option value="round">Rund</option><option value="square">Vierkant</option><option value="pipe">Rohr</option>
            </select></div>
            <div class="input-group"><label>${t.material}</label>
            <select id="inp-mat">
                <option value="7.85">Stahl</option><option value="2.7">Alu</option><option value="8.4">Messing</option>
            </select></div>`;
        const shape = document.getElementById('inp-shape')?.value || 'round';
        if(shape==='round'){ createInput('dia', 'D (mm)'); createInput('len', 'L (mm)'); }
        if(shape==='square'){ createInput('w', 'B (mm)'); createInput('h', 'H (mm)'); createInput('len', 'L (mm)'); }
        if(shape==='pipe'){ createInput('da', 'D-Außen'); createInput('di', 'D-Innen'); createInput('len', 'L'); }
    }
}

function createInput(id, label) {
    const div = document.createElement('div');
    div.className = 'input-group';
    div.innerHTML = `<label>${label}</label><input type="number" id="inp-${id}" step="any" value="0">`;
    document.getElementById('input-fields').appendChild(div);
}

function calculate() {
    const t = translations[currentLang];
    const getV = (id) => parseFloat(document.getElementById('inp-'+id)?.value) || 0;
    let res = '';

    if (currentCalc.includes('calc')) {
        const n = (1000 * getV('vc')) / (Math.PI * getV('d'));
        let vf = n * (getV('f') || (getV('fz') * getV('z')));
        res = `<div class="res-row"><span>${t.res_n}:</span><span class="res-val">${n.toFixed(0)} U/min</span></div>
               <div class="res-row"><span>${t.res_vf}:</span><span class="res-val">${vf.toFixed(0)} mm/min</span></div>`;
    } else if (currentCalc === 'th-rechner') {
        const totalL = (getV('l') * (getV('i')||1)) + getV('anschnitt') + getV('ueberlauf');
        const th = totalL / (getV('n') * getV('f'));
        res = `<div class="res-row"><span>${t.res_th}:</span><span class="res-val">${th.toFixed(3)} min</span></div>`;
    } else if (currentCalc === 'weight-calc') {
        const shape = document.getElementById('inp-shape').value;
        const dens = parseFloat(document.getElementById('inp-mat').value);
        let vol = 0;
        if(shape==='round') vol = Math.PI * Math.pow(getV('dia')/2, 2) * getV('len');
        if(shape==='square') vol = getV('w') * getV('h') * getV('len');
        if(shape==='pipe') vol = Math.PI * (Math.pow(getV('da')/2, 2) - Math.pow(getV('di')/2, 2)) * getV('len');
        res = `<div class="res-row"><span>${t.res_weight}:</span><span class="res-val">${(vol/1000000 * dens).toFixed(2)} kg</span></div>`;
    }
    document.getElementById('results-display').innerHTML = res;
}