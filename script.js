const API_URL = "https://bolao-api-2lej.onrender.com"; 

let currentUser = null;
let adminResults = {};
let allUsersData = [];

// OS 72 JOGOS REAIS COM HORÁRIOS EXTRAÍDOS/MAPEADOS DO PDF
const ALL_GAMES = [
    ["11 DE JUNHO (QUI)", [{ id: 'g01', time: '17:00', grp: "A", t1: "México", f1: "mx", t2: "África do Sul", f2: "za" }, { id: 'g02', time: '21:00', grp: "A", t1: "Cor. do Sul", f1: "kr", t2: "Rep. Tcheca", f2: "cz" }]],
    ["12 DE JUNHO (SEX)", [{ id: 'g03', time: '18:00', grp: "B", t1: "Canadá", f1: "ca", t2: "Bósnia e H.", f2: "ba" }, { id: 'g04', time: '21:00', grp: "D", t1: "EUA", f1: "us", t2: "Paraguai", f2: "py" }]],
    ["13 DE JUNHO (SÁB)", [{ id: 'g05', time: '13:00', grp: "B", t1: "Catar", f1: "qa", t2: "Suíça", f2: "ch" }, { id: 'g06', time: '16:00', grp: "C", t1: "Brasil", f1: "br", t2: "Marrocos", f2: "ma" }, { id: 'g07', time: '19:00', grp: "C", t1: "Haiti", f1: "ht", t2: "Escócia", f2: "gb-sct" }, { id: 'g08', time: '22:00', grp: "D", t1: "Austrália", f1: "au", t2: "Turquia", f2: "tr" }]],
    ["14 DE JUNHO (DOM)", [{ id: 'g09', time: '13:00', grp: "E", t1: "Alemanha", f1: "de", t2: "Curaçao", f2: "cw" }, { id: 'g10', time: '16:00', grp: "E", t1: "C. Marfim", f1: "ci", t2: "Equador", f2: "ec" }, { id: 'g11', time: '19:00', grp: "F", t1: "Holanda", f1: "nl", t2: "Japão", f2: "jp" }, { id: 'g12', time: '22:00', grp: "F", t1: "Suécia", f1: "se", t2: "Tunísia", f2: "tn" }]],
    ["15 DE JUNHO (SEG)", [{ id: 'g13', time: '13:00', grp: "G", t1: "Bélgica", f1: "be", t2: "Egito", f2: "eg" }, { id: 'g14', time: '16:00', grp: "G", t1: "Irã", f1: "ir", t2: "Nova Zel.", f2: "nz" }, { id: 'g15', time: '19:00', grp: "H", t1: "Espanha", f1: "es", t2: "Cabo Verde", f2: "cv" }, { id: 'g16', time: '22:00', grp: "H", t1: "Arábia S.", f1: "sa", t2: "Uruguai", f2: "uy" }]],
    ["16 DE JUNHO (TER)", [{ id: 'g17', time: '13:00', grp: "I", t1: "França", f1: "fr", t2: "Senegal", f2: "sn" }, { id: 'g18', time: '16:00', grp: "I", t1: "Iraque", f1: "iq", t2: "Noruega", f2: "no" }, { id: 'g19', time: '19:00', grp: "J", t1: "Argentina", f1: "ar", t2: "Argélia", f2: "dz" }, { id: 'g20', time: '22:00', grp: "J", t1: "Áustria", f1: "at", t2: "Jordânia", f2: "jo" }]],
    ["17 DE JUNHO (QUA)", [{ id: 'g21', time: '13:00', grp: "K", t1: "Portugal", f1: "pt", t2: "RD Congo", f2: "cd" }, { id: 'g22', time: '16:00', grp: "K", t1: "Uzbequistão", f1: "uz", t2: "Colômbia", f2: "co" }, { id: 'g23', time: '19:00', grp: "L", t1: "Inglaterra", f1: "gb-eng", t2: "Croácia", f2: "hr" }, { id: 'g24', time: '22:00', grp: "L", t1: "Gana", f1: "gh", t2: "Panamá", f2: "pa" }]],
    ["18 DE JUNHO (QUI)", [{ id: 'g25', time: '13:00', grp: "A", t1: "México", f1: "mx", t2: "Cor. do Sul", f2: "kr" }, { id: 'g26', time: '16:00', grp: "A", t1: "África do Sul", f1: "za", t2: "Rep. Tcheca", f2: "cz" }, { id: 'g27', time: '19:00', grp: "B", t1: "Canadá", f1: "ca", t2: "Catar", f2: "qa" }, { id: 'g28', time: '22:00', grp: "B", t1: "Bósnia e H.", f1: "ba", t2: "Suíça", f2: "ch" }]],
    ["19 DE JUNHO (SEX)", [{ id: 'g29', time: '13:00', grp: "C", t1: "Escócia", f1: "gb-sct", t2: "Marrocos", f2: "ma" }, { id: 'g30', time: '16:00', grp: "C", t1: "Brasil", f1: "br", t2: "Haiti", f2: "ht" }, { id: 'g31', time: '19:00', grp: "D", t1: "Austrália", f1: "au", t2: "Paraguai", f2: "py" }, { id: 'g32', time: '22:00', grp: "D", t1: "EUA", f1: "us", t2: "Turquia", f2: "tr" }]],
    ["20 DE JUNHO (SÁB)", [{ id: 'g33', time: '13:00', grp: "E", t1: "Alemanha", f1: "de", t2: "C. Marfim", f2: "ci" }, { id: 'g34', time: '16:00', grp: "E", t1: "Curaçao", f1: "cw", t2: "Equador", f2: "ec" }, { id: 'g35', time: '19:00', grp: "F", t1: "Holanda", f1: "nl", t2: "Suécia", f2: "se" }, { id: 'g36', time: '22:00', grp: "F", t1: "Japão", f1: "jp", t2: "Tunísia", f2: "tn" }]],
    ["21 DE JUNHO (DOM)", [{ id: 'g37', time: '13:00', grp: "G", t1: "Bélgica", f1: "be", t2: "Irã", f2: "ir" }, { id: 'g38', time: '16:00', grp: "G", t1: "Egito", f1: "eg", t2: "Nova Zel.", f2: "nz" }, { id: 'g39', time: '19:00', grp: "H", t1: "Espanha", f1: "es", t2: "Arábia S.", f2: "sa" }, { id: 'g40', time: '22:00', grp: "H", t1: "Cabo Verde", f1: "cv", t2: "Uruguai", f2: "uy" }]],
    ["22 DE JUNHO (SEG)", [{ id: 'g41', time: '13:00', grp: "I", t1: "França", f1: "fr", t2: "Iraque", f2: "iq" }, { id: 'g42', time: '16:00', grp: "I", t1: "Senegal", f1: "sn", t2: "Noruega", f2: "no" }, { id: 'g43', time: '19:00', grp: "J", t1: "Argentina", f1: "ar", t2: "Áustria", f2: "at" }, { id: 'g44', time: '22:00', grp: "J", t1: "Argélia", f1: "dz", t2: "Jordânia", f2: "jo" }]],
    ["23 DE JUNHO (TER)", [{ id: 'g45', time: '13:00', grp: "K", t1: "Portugal", f1: "pt", t2: "Uzbequistão", f2: "uz" }, { id: 'g46', time: '16:00', grp: "K", t1: "RD Congo", f1: "cd", t2: "Colômbia", f2: "co" }, { id: 'g47', time: '19:00', grp: "L", t1: "Inglaterra", f1: "gb-eng", t2: "Gana", f2: "gh" }, { id: 'g48', time: '22:00', grp: "L", t1: "Croácia", f1: "hr", t2: "Panamá", f2: "pa" }]],
    ["24 DE JUNHO (QUA)", [{ id: 'g49', time: '13:00', grp: "A", t1: "México", f1: "mx", t2: "Rep. Tcheca", f2: "cz" }, { id: 'g50', time: '13:00', grp: "A", t1: "África do Sul", f1: "za", t2: "Cor. do Sul", f2: "kr" }, { id: 'g51', time: '17:00', grp: "B", t1: "Canadá", f1: "ca", t2: "Suíça", f2: "ch" }, { id: 'g52', time: '17:00', grp: "B", t1: "Bósnia e H.", f1: "ba", t2: "Catar", f2: "qa" }, { id: 'g53', time: '21:00', grp: "C", t1: "Escócia", f1: "gb-sct", t2: "Brasil", f2: "br" }, { id: 'g54', time: '21:00', grp: "C", t1: "Marrocos", f1: "ma", t2: "Haiti", f2: "ht" }]],
    ["25 DE JUNHO (QUI)", [{ id: 'g55', time: '13:00', grp: "D", t1: "Turquia", f1: "tr", t2: "Paraguai", f2: "py" }, { id: 'g56', time: '13:00', grp: "D", t1: "EUA", f1: "us", t2: "Austrália", f2: "au" }, { id: 'g57', time: '17:00', grp: "E", t1: "Equador", f1: "ec", t2: "Alemanha", f2: "de" }, { id: 'g58', time: '17:00', grp: "E", t1: "Curaçao", f1: "cw", t2: "C. Marfim", f2: "ci" }, { id: 'g59', time: '21:00', grp: "F", t1: "Japão", f1: "jp", t2: "Suécia", f2: "se" }, { id: 'g60', time: '21:00', grp: "F", t1: "Tunísia", f1: "tn", t2: "Holanda", f2: "nl" }]],
    ["26 DE JUNHO (SEX)", [{ id: 'g61', time: '13:00', grp: "G", t1: "Nova Zel.", f1: "nz", t2: "Bélgica", f2: "be" }, { id: 'g62', time: '13:00', grp: "G", t1: "Egito", f1: "eg", t2: "Irã", f2: "ir" }, { id: 'g63', time: '17:00', grp: "H", t1: "Cabo Verde", f1: "cv", t2: "Arábia S.", f2: "sa" }, { id: 'g64', time: '17:00', grp: "H", t1: "Uruguai", f1: "uy", t2: "Espanha", f2: "es" }, { id: 'g65', time: '21:00', grp: "I", t1: "Senegal", f1: "sn", t2: "Iraque", f2: "iq" }, { id: 'g66', time: '21:00', grp: "I", t1: "Noruega", f1: "no", t2: "França", f2: "fr" }]],
    ["27 DE JUNHO (SÁB)", [{ id: 'g67', time: '13:00', grp: "J", t1: "Argélia", f1: "dz", t2: "Áustria", f2: "at" }, { id: 'g68', time: '13:00', grp: "J", t1: "Jordânia", f1: "jo", t2: "Argentina", f2: "ar" }, { id: 'g69', time: '17:00', grp: "K", t1: "RD Congo", f1: "cd", t2: "Uzbequistão", f2: "uz" }, { id: 'g70', time: '17:00', grp: "K", t1: "Colômbia", f1: "co", t2: "Portugal", f2: "pt" }, { id: 'g71', time: '21:00', grp: "L", t1: "Croácia", f1: "hr", t2: "Gana", f2: "gh" }, { id: 'g72', time: '21:00', grp: "L", t1: "Panamá", f1: "pa", t2: "Inglaterra", f2: "gb-eng" }]]
];

window.addEventListener('load', () => {
    const savedSession = localStorage.getItem('bolao_session');
    
    if (savedSession) {
        currentUser = JSON.parse(savedSession);
        document.getElementById('login-screen').style.display = 'none';
        iniciarApp();
    } else {
        const lastUserStr = localStorage.getItem('bolao_last_user');
        document.getElementById('login-screen').style.display = 'flex';
        
        if (lastUserStr) {
            const lastUser = JSON.parse(lastUserStr);
            document.getElementById('return-user-name').innerText = lastUser.name;
            document.getElementById('login-card-return').style.display = 'block';
            document.getElementById('login-card-default').style.display = 'none';
        } else {
            document.getElementById('login-card-return').style.display = 'none';
            document.getElementById('login-card-default').style.display = 'block';
        }
    }
});

function showDefaultLogin() {
    document.getElementById('login-card-return').style.display = 'none';
    document.getElementById('login-card-default').style.display = 'block';
}

async function loginAsLastUser() {
    const lastUserStr = localStorage.getItem('bolao_last_user');
    if(lastUserStr) {
        const lastUser = JSON.parse(lastUserStr);
        showLoading(true);
        try {
            const resp = await fetch(`${API_URL}/login`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: lastUser.name })
            }).then(r => r.json());

            if (resp.success) entrar(lastUser.name);
        } catch (e) {
            alert("Erro de conexão.");
        }
        showLoading(false);
    }
}

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

function fazerLogout() { 
    if(currentUser) {
        localStorage.setItem('bolao_last_user', JSON.stringify(currentUser));
    }
    localStorage.removeItem('bolao_session'); 
    location.reload(); 
}

async function iniciarApp() {
    document.getElementById('display-user-name').innerText = currentUser.name;
    document.getElementById('main-app').style.display = 'block';
    
    if (currentUser.name === "Admin") {
        renderGames('admin-slip-container', 'admin');
        const btnPalpites = document.querySelector('.tab-btn[onclick*="palpites"]');
        if (btnPalpites) btnPalpites.style.display = 'none';
        
        const btnAdmin = document.querySelector('.tab-btn[onclick*="admin"]');
        if (btnAdmin) btnAdmin.style.display = 'inline-block';
        
        switchTab('admin');
    } else {
        renderGames('mobile-slip-container', 'user');
        
        let savedTab = localStorage.getItem('bolao_active_tab') || 'palpites';
        if (savedTab === 'admin') savedTab = 'palpites'; 
        switchTab(savedTab);
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
            
            // Alteração na Etiqueta do Grupo para incluir o Horário
            html += `
            <div class="match-entry-row">
                <div class="entry-group-tag" style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
                    <span>${game.grp}</span>
                    <span style="font-size: 0.6rem; color: #555; background: #EAEAEA; padding: 3px 5px; border-radius: 4px; line-height: 1;">${game.time}</span>
                </div>
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
        if (currentUser.name !== "Admin") {
            const meusPalpites = await fetch(`${API_URL}/palpites/${currentUser.name}`).then(r => r.json());
            if (meusPalpites && Object.keys(meusPalpites).length > 0) preencherEBloquearPalpites(meusPalpites);
        }

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

    if (!allUsersData || allUsersData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="padding: 20px; color: #999;">Nenhum participante registrado ainda.</td></tr>`;
        return;
    }

    let ranking = [];
    const safeAdminResults = adminResults || {};

    allUsersData.forEach(u => {
        if (u.name === "Admin") return;
        
        let p = { name: u.name, pts: 0, acertos: 0 };
        const palps = u.jogos || {};
        
        Object.keys(safeAdminResults).forEach(mId => {
            if(palps[mId]) {
                const ph = parseInt(palps[mId].h), pa = parseInt(palps[mId].a);
                const rh = parseInt(safeAdminResults[mId].h), ra = parseInt(safeAdminResults[mId].a);
                
                if(ph === rh && pa === ra) { 
                    p.pts += 8; 
                    p.acertos++; 
                }
                else if((ph>pa && rh>ra) || (ph<pa && rh<ra) || (ph===pa && rh===ra)) { 
                    p.pts += 3; 
                    p.acertos++; 
                }
            }
        });
        ranking.push(p);
    });

    ranking.sort((a, b) => b.pts - a.pts || b.acertos - a.acertos);
    
    tbody.innerHTML = ranking.map((r, i) => {
        return `<tr>
            <td class="td-pos" style="color:var(--ge-blue); font-weight: 800;">${i+1}</td>
            <td style="text-align: left; padding-left: 15px; font-weight: 600;">${r.name}</td>
            <td class="td-pts" style="color:var(--text-dark); font-weight: 800; font-size: 1.1rem; background: #F9F9F9;">${r.pts}</td>
            <td style="color: #06AA48; font-weight: 700;">${r.acertos}</td>
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
    
    const targetView = document.getElementById('view-' + tab);
    if(targetView) targetView.classList.add('active');
    
    const activeBtn = document.querySelector(`.tab-btn[onclick*="${tab}"]`);
    if(activeBtn) activeBtn.classList.add('active');
    
    localStorage.setItem('bolao_active_tab', tab);
    
    if (tab === 'ranking') {
        carregarRankingSilencioso();
    }
}

function showLoading(show) { document.getElementById('loading-spinner').style.display = show ? 'flex' : 'none'; }
function showToast(msg) {
    const t = document.getElementById('toast-notif');
    t.innerText = msg; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 3000);
}

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