const API_URL = "https://bolao-api-2lej.onrender.com"; 

let currentUser = null;
let adminResults = {};
let allUsersData = [];

// OS 72 JOGOS REAIS
const ALL_GAMES = [
    ["11 DE JUNHO (QUI)", [{ id: 'g01', grp: "A", t1: "México", f1: "mx", t2: "África do Sul", f2: "za" }, { id: 'g02', grp: "A", t1: "Cor. do Sul", f1: "kr", t2: "Rep. Tcheca", f2: "cz" }]],
    ["12 DE JUNHO (SEX)", [{ id: 'g03', grp: "B", t1: "Canadá", f1: "ca", t2: "Bósnia e H.", f2: "ba" }, { id: 'g04', grp: "D", t1: "EUA", f1: "us", t2: "Paraguai", f2: "py" }]],
    ["13 DE JUNHO (SÁB)", [{ id: 'g05', grp: "B", t1: "Catar", f1: "qa", t2: "Suíça", f2: "ch" }, { id: 'g06', grp: "C", t1: "Brasil", f1: "br", t2: "Marrocos", f2: "ma" }, { id: 'g07', grp: "C", t1: "Haiti", f1: "ht", t2: "Escócia", f2: "gb-sct" }, { id: 'g08', grp: "D", t1: "Austrália", f1: "au", t2: "Turquia", f2: "tr" }]],
    ["14 DE JUNHO (DOM)", [{ id: 'g09', grp: "E", t1: "Alemanha", f1: "de", t2: "Curaçao", f2: "cw" }, { id: 'g10', grp: "E", t1: "C. Marfim", f1: "ci", t2: "Equador", f2: "ec" }, { id: 'g11', grp: "F", t1: "Holanda", f1: "nl", t2: "Japão", f2: "jp" }, { id: 'g12', grp: "F", t1: "Suécia", f1: "se", t2: "Tunísia", f2: "tn" }]],
    ["15 DE JUNHO (SEG)", [{ id: 'g13', grp: "G", t1: "Bélgica", f1: "be", t2: "Egito", f2: "eg" }, { id: 'g14', grp: "G", t1: "Irã", f1: "ir", t2: "Nova Zel.", f2: "nz" }, { id: 'g15', grp: "H", t1: "Espanha", f1: "es", t2: "Cabo Verde", f2: "cv" }, { id: 'g16', grp: "H", t1: "Arábia S.", f1: "sa", t2: "Uruguai", f2: "uy" }]],
    ["16 DE JUNHO (TER)", [{ id: 'g17', grp: "I", t1: "França", f1: "fr", t2: "Senegal", f2: "sn" }, { id: 'g18', grp: "I", t1: "Iraque", f1: "iq", t2: "Noruega", f2: "no" }, { id: 'g19', grp: "J", t1: "Argentina", f1: "ar", t2: "Argélia", f2: "dz" }, { id: 'g20', grp: "J", t1: "Áustria", f1: "at", t2: "Jordânia", f2: "jo" }]],
    ["17 DE JUNHO (QUA)", [{ id: 'g21', grp: "K", t1: "Portugal", f1: "pt", t2: "RD Congo", f2: "cd" }, { id: 'g22', grp: "K", t1: "Uzbequistão", f1: "uz", t2: "Colômbia", f2: "co" }, { id: 'g23', grp: "L", t1: "Inglaterra", f1: "gb-eng", t2: "Croácia", f2: "hr" }, { id: 'g24', grp: "L", t1: "Gana", f1: "gh", t2: "Panamá", f2: "pa" }]],
    ["18 DE JUNHO (QUI)", [{ id: 'g25', grp: "A", t1: "México", f1: "mx", t2: "Cor. do Sul", f2: "kr" }, { id: 'g26', grp: "A", t1: "África do Sul", f1: "za", t2: "Rep. Tcheca", f2: "cz" }, { id: 'g27', grp: "B", t1: "Canadá", f1: "ca", t2: "Catar", f2: "qa" }, { id: 'g28', grp: "B", t1: "Bósnia e H.", f1: "ba", t2: "Suíça", f2: "ch" }]],
    ["19 DE JUNHO (SEX)", [{ id: 'g29', grp: "C", t1: "Escócia", f1: "gb-sct", t2: "Marrocos", f2: "ma" }, { id: 'g30', grp: "C", t1: "Brasil", f1: "br", t2: "Haiti", f2: "ht" }, { id: 'g31', grp: "D", t1: "Austrália", f1: "au", t2: "Paraguai", f2: "py" }, { id: 'g32', grp: "D", t1: "EUA", f1: "us", t2: "Turquia", f2: "tr" }]],
    ["20 DE JUNHO (SÁB)", [{ id: 'g33', grp: "E", t1: "Alemanha", f1: "de", t2: "C. Marfim", f2: "ci" }, { id: 'g34', grp: "E", t1: "Curaçao", f1: "cw", t2: "Equador", f2: "ec" }, { id: 'g35', grp: "F", t1: "Holanda", f1: "nl", t2: "Suécia", f2: "se" }, { id: 'g36', grp: "F", t1: "Japão", f1: "jp", t2: "Tunísia", f2: "tn" }]],
    ["21 DE JUNHO (DOM)", [{ id: 'g37', grp: "G", t1: "Bélgica", f1: "be", t2: "Irã", f2: "ir" }, { id: 'g38', grp: "G", t1: "Egito", f1: "eg", t2: "Nova Zel.", f2: "nz" }, { id: 'g39', grp: "H", t1: "Espanha", f1: "es", t2: "Arábia S.", f2: "sa" }, { id: 'g40', grp: "H", t1: "Cabo Verde", f1: "cv", t2: "Uruguai", f2: "uy" }]],
    ["22 DE JUNHO (SEG)", [{ id: 'g41', grp: "I", t1: "França", f1: "fr", t2: "Iraque", f2: "iq" }, { id: 'g42', grp: "I", t1: "Senegal", f1: "sn", t2: "Noruega", f2: "no" }, { id: 'g43', grp: "J", t1: "Argentina", f1: "ar", t2: "Áustria", f2: "at" }, { id: 'g44', grp: "J", t1: "Argélia", f1: "dz", t2: "Jordânia", f2: "jo" }]],
    ["23 DE JUNHO (TER)", [{ id: 'g45', grp: "K", t1: "Portugal", f1: "pt", t2: "Uzbequistão", f2: "uz" }, { id: 'g46', grp: "K", t1: "RD Congo", f1: "cd", t2: "Colômbia", f2: "co" }, { id: 'g47', grp: "L", t1: "Inglaterra", f1: "gb-eng", t2: "Gana", f2: "gh" }, { id: 'g48', grp: "L", t1: "Croácia", f1: "hr", t2: "Panamá", f2: "pa" }]],
    ["24 DE JUNHO (QUA)", [{ id: 'g49', grp: "A", t1: "México", f1: "mx", t2: "Rep. Tcheca", f2: "cz" }, { id: 'g50', grp: "A", t1: "África do Sul", f1: "za", t2: "Cor. do Sul", f2: "kr" }, { id: 'g51', grp: "B", t1: "Canadá", f1: "ca", t2: "Suíça", f2: "ch" }, { id: 'g52', grp: "B", t1: "Bósnia e H.", f1: "ba", t2: "Catar", f2: "qa" }, { id: 'g53', grp: "C", t1: "Escócia", f1: "gb-sct", t2: "Brasil", f2: "br" }, { id: 'g54', grp: "C", t1: "Marrocos", f1: "ma", t2: "Haiti", f2: "ht" }]],
    ["25 DE JUNHO (QUI)", [{ id: 'g55', grp: "D", t1: "Turquia", f1: "tr", t2: "Paraguai", f2: "py" }, { id: 'g56', grp: "D", t1: "EUA", f1: "us", t2: "Austrália", f2: "au" }, { id: 'g57', grp: "E", t1: "Equador", f1: "ec", t2: "Alemanha", f2: "de" }, { id: 'g58', grp: "E", t1: "Curaçao", f1: "cw", t2: "C. Marfim", f2: "ci" }, { id: 'g59', grp: "F", t1: "Japão", f1: "jp", t2: "Suécia", f2: "se" }, { id: 'g60', grp: "F", t1: "Tunísia", f1: "tn", t2: "Holanda", f2: "nl" }]],
    ["26 DE JUNHO (SEX)", [{ id: 'g61', grp: "G", t1: "Nova Zel.", f1: "nz", t2: "Bélgica", f2: "be" }, { id: 'g62', grp: "G", t1: "Egito", f1: "eg", t2: "Irã", f2: "ir" }, { id: 'g63', grp: "H", t1: "Cabo Verde", f1: "cv", t2: "Arábia S.", f2: "sa" }, { id: 'g64', grp: "H", t1: "Uruguai", f1: "uy", t2: "Espanha", f2: "es" }, { id: 'g65', grp: "I", t1: "Senegal", f1: "sn", t2: "Iraque", f2: "iq" }, { id: 'g66', grp: "I", t1: "Noruega", f1: "no", t2: "França", f2: "fr" }]],
    ["27 DE JUNHO (SÁB)", [{ id: 'g67', grp: "J", t1: "Argélia", f1: "dz", t2: "Áustria", f2: "at" }, { id: 'g68', grp: "J", t1: "Jordânia", f1: "jo", t2: "Argentina", f2: "ar" }, { id: 'g69', grp: "K", t1: "RD Congo", f1: "cd", t2: "Uzbequistão", f2: "uz" }, { id: 'g70', grp: "K", t1: "Colômbia", f1: "co", t2: "Portugal", f2: "pt" }, { id: 'g71', grp: "L", t1: "Croácia", f1: "hr", t2: "Gana", f2: "gh" }, { id: 'g72', grp: "L", t1: "Panamá", f1: "pa", t2: "Inglaterra", f2: "gb-eng" }]]
];

window.addEventListener('load', () => {
    const savedSession = localStorage.getItem('bolao_session');
    if (savedSession) {
        currentUser = JSON.parse(savedSession);
        // CORREÇÃO: Esconder a tela de login ao atualizar a página!
        document.getElementById('login-screen').style.display = 'none';
        iniciarApp();
    } else {
        document.getElementById('login-screen').style.display = 'flex';
    }
});

async function realizarLogin() {
    const name = document.getElementById('login-name').value.trim();
    const surname = document.getElementById('login-surname').value.trim();
    
    if(!name || !surname) { 
        mostrarErroLogin("Preencha seu Nome e Sobrenome."); 
        return; 
    }

    let fullName = name + " " + surname;
    if(name.toLowerCase() === "admin" && surname.toLowerCase() === "bolao") {
        fullName = "Admin";
    }

    showLoading(true);
    try {
        const resp = await fetch(`${API_URL}/login`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: fullName })
        }).then(r => r.json());

        if (resp.success) entrar(fullName);
    } catch (e) { 
        mostrarErroLogin("Erro de conexão. A API pode estar iniciando (leva 30s)."); 
    }
    showLoading(false);
}

function mostrarErroLogin(msg) {
    const errEl = document.getElementById('login-error');
    errEl.innerText = msg; errEl.style.display = 'block';
}

function entrar(fullName) {
    currentUser = { name: fullName };
    localStorage.setItem('bolao_session', JSON.stringify(currentUser));
    document.getElementById('login-screen').style.display = 'none';
    iniciarApp();
}

function fazerLogout() { localStorage.removeItem('bolao_session'); location.reload(); }

async function iniciarApp() {
    document.getElementById('display-user-name').innerText = currentUser.name;
    document.getElementById('main-app').style.display = 'block';
    
    renderGames('mobile-slip-container', 'user');

    if (currentUser.name === "Admin") {
        renderGames('admin-slip-container', 'admin');
        document.querySelector('.tab-btn[onclick*="admin"]').style.display = 'inline-block';
    }
    await carregarDadosDaNuvem();
}

function renderGames(containerId, mode) {
    const container = document.getElementById(containerId);
    if(!container) return;
    let html = '';
    ALL_GAMES.forEach(day => {
        html += `<div class="day-container"><div class="day-title-bar">${day[0]}</div>`;
        day[1].forEach(game => {
            const prefix = mode === 'user' ? 'u' : 'a';
            const onInput = mode === 'user' ? 'oninput="updateWinnerBadge(this)"' : '';
            html += `
            <div class="match-entry-row">
                <div class="entry-group-tag">${game.grp}</div>
                <div class="entry-team-box home">${game.t1} <span class="fi fi-${game.f1}"></span></div>
                <div class="entry-inputs-box">
                    <input type="number" inputmode="numeric" class="entry-input ${prefix}-h-${game.id}" data-match="${game.id}" ${onInput}>
                    <span class="entry-vs">x</span>
                    <input type="number" inputmode="numeric" class="entry-input ${prefix}-a-${game.id}" data-match="${game.id}" ${onInput}>
                </div>
                <div class="entry-team-box away"><span class="fi fi-${game.f2}"></span> ${game.t2}</div>
                <div class="entry-ve-box"><span class="entry-ve-badge ve-id-${game.id}">V/E:</span></div>
            </div>`;
        });
        html += `</div>`;
    });
    container.innerHTML = html;
}

async function carregarDadosDaNuvem() {
    showLoading(true);
    try {
        const meusPalpites = await fetch(`${API_URL}/palpites/${currentUser.name}`).then(r => r.json());
        if (meusPalpites && Object.keys(meusPalpites).length > 0) preencherEBloquearPalpites(meusPalpites);

        adminResults = await fetch(`${API_URL}/palpites/Admin`).then(r => r.json());
        if (currentUser.name === "Admin" && adminResults) {
            Object.keys(adminResults).forEach(mId => {
                const h = document.querySelector(`.a-h-${mId}`); const a = document.querySelector(`.a-a-${mId}`);
                if(h && a) { h.value = adminResults[mId].h; a.value = adminResults[mId].a; }
            });
        }
        allUsersData = await fetch(`${API_URL}/users`).then(r => r.json());
        calculateAndRenderRanking();
    } catch(e) { console.error(e); }
    showLoading(false);
}

function preencherEBloquearPalpites(palpitesSalvos) {
    let preencheu = false;
    Object.keys(palpitesSalvos).forEach(mId => {
        const h = document.querySelector(`.u-h-${mId}`); const a = document.querySelector(`.u-a-${mId}`);
        if(h && a) { 
            h.value = palpitesSalvos[mId].h; a.value = palpitesSalvos[mId].a; 
            updateWinnerBadge(h); h.disabled = true; a.disabled = true; preencheu = true;
        }
    });
    if (preencheu) {
        document.getElementById('btn-save-palpites').style.display = 'none';
        document.getElementById('lock-warning').style.display = 'block';
    }
}

async function salvarNoMongo() {
    if(!confirm("Atenção: Após guardar, não poderá alterar os palpites. Confirmar?")) return;
    showLoading(true);
    let palpites = {};
    document.querySelectorAll('.entry-input[class*="u-h-"]').forEach(hInput => {
        const mId = hInput.getAttribute('data-match'); const aInput = document.querySelector(`.u-a-${mId}`);
        if (hInput.value !== "" && aInput.value !== "") palpites[mId] = { h: hInput.value, a: aInput.value };
    });
    await fetch(`${API_URL}/salvar`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: currentUser.name, jogos: palpites }) });
    showToast("Palpites Guardados!");
    await carregarDadosDaNuvem();
    showLoading(false);
}

async function saveAdminResults() {
    showLoading(true);
    let gabarito = {};
    document.querySelectorAll('.entry-input[class*="a-h-"]').forEach(hInput => {
        const mId = hInput.getAttribute('data-match'); const aInput = document.querySelector(`.a-a-${mId}`);
        if (hInput.value !== "" && aInput.value !== "") gabarito[mId] = { h: hInput.value, a: aInput.value };
    });
    await fetch(`${API_URL}/salvar`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: "Admin", jogos: gabarito }) });
    showToast("Gabarito Publicado!");
    await carregarDadosDaNuvem();
    showLoading(false);
}

function calculateAndRenderRanking() {
    const tbody = document.getElementById('ranking-body-app');
    if (!tbody) return;

    // CORREÇÃO: Previne tabela vazia
    if (!allUsersData || allUsersData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" style="padding: 20px; color: #999;">Nenhum participante registrado ainda.</td></tr>`;
        return;
    }

    let ranking = [];
    allUsersData.forEach(u => {
        if (u.name === "Admin") return;
        let p = { name: u.name, pts: 0, v: 0, e: 0, d: 0, j: 0 };
        const palps = u.jogos || {};
        
        // Só soma pontos se houver gabarito
        if (adminResults) {
            Object.keys(adminResults).forEach(mId => {
                if(palps[mId]) {
                    p.j++;
                    const ph = parseInt(palps[mId].h), pa = parseInt(palps[mId].a), rh = parseInt(adminResults[mId].h), ra = parseInt(adminResults[mId].a);
                    if(ph === rh && pa === ra) { p.pts += 8; p.v++; }
                    else if((ph>pa && rh>ra) || (ph<pa && rh<ra) || (ph===pa && rh===ra)) { p.pts += 3; p.e++; }
                    else { p.d++; }
                }
            });
        }
        ranking.push(p);
    });

    ranking.sort((a, b) => b.pts - a.pts || b.v - a.v || b.e - a.e);
    
    tbody.innerHTML = ranking.map((r, i) => {
        const aprov = r.j > 0 ? Math.round((r.pts / (r.j * 8)) * 100) : 0;
        let bolinhas = '';
        for(let k=0; k<5; k++) {
            if (k < r.v) bolinhas += '<span class="form-dot win"></span>';
            else if (k < r.v + r.e) bolinhas += '<span class="form-dot draw"></span>';
            else bolinhas += '<span class="form-dot loss"></span>';
        }
        return `<tr>
            <td class="td-pos" style="color:var(--ge-blue); font-weight: 800; width: 40px;">${i+1}</td>
            <td style="text-align: left; padding-left: 10px; font-weight: 600;">${r.name}</td>
            <td class="td-pts">${r.pts}</td>
            <td style="color: #666;">${r.j}</td><td style="color: #666;">${r.v}</td><td style="color: #666;">${r.e}</td><td style="color: #666;">${r.d}</td>
            <td style="color: #666; font-weight: 700;">${aprov}%</td>
            <td class="recent-form">${bolinhas}</td>
        </tr>`;
    }).join('');
}

function updateWinnerBadge(input) {
    const mId = input.getAttribute('data-match');
    const h = parseInt(document.querySelector(`.u-h-${mId}`).value), a = parseInt(document.querySelector(`.u-a-${mId}`).value);
    const badge = document.querySelector(`#mobile-slip-container .ve-id-${mId}`);
    if(!badge) return;
    badge.className = `entry-ve-badge ve-id-${mId}`; 
    if(isNaN(h) || isNaN(a)) { badge.innerText = "V/E:"; return; }
    if(h > a) { badge.classList.add('win-a'); badge.innerText = "Venc: A"; }
    else if (a > h) { badge.classList.add('win-b'); badge.innerText = "Venc: B"; }
    else { badge.classList.add('draw'); badge.innerText = "Empate"; }
}

function switchTab(tab) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('view-' + tab).classList.add('active');
    document.querySelector(`.tab-btn[onclick*="${tab}"]`).classList.add('active');
    
    if (tab === 'ranking') {
        carregarRankingSilencioso();
    }
}

function showLoading(show) { document.getElementById('loading-spinner').style.display = show ? 'flex' : 'none'; }
function showToast(msg) {
    const t = document.getElementById('toast-notif');
    t.innerText = msg; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 3000);
}

// --- SISTEMA DE ATUALIZAÇÃO EM TEMPO REAL ---
async function carregarRankingSilencioso() {
    try {
        allUsersData = await fetch(`${API_URL}/users`).then(r => r.json());
        adminResults = await fetch(`${API_URL}/palpites/Admin`).then(r => r.json());
        calculateAndRenderRanking();
    } catch(e) {
        console.log("Aguardando conexão com o servidor...");
    }
}

setInterval(() => {
    const viewRanking = document.getElementById('view-ranking');
    if (viewRanking && viewRanking.classList.contains('active')) {
        carregarRankingSilencioso();
    }
}, 10000);