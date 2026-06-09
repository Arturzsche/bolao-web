const API_URL = "https://bolao-api-2lej.onrender.com"; 

let currentUser = null;
let adminResults = {};
let allUsersData = [];

const ALL_GAMES = [
    ["11 DE JUNHO (QUI)", [{ id: 'g01', grp: "A", t1: "México", f1: "mx", t2: "África do Sul", f2: "za" }, { id: 'g02', grp: "A", t1: "Cor. do Sul", f1: "kr", t2: "Rep. Tcheca", f2: "cz" }]],
    ["12 DE JUNHO (SEX)", [{ id: 'g03', grp: "B", t1: "Canadá", f1: "ca", t2: "Bósnia e H.", f2: "ba" }, { id: 'g04', grp: "D", t1: "EUA", f1: "us", t2: "Paraguai", f2: "py" }]],
    ["13 DE JUNHO (SÁB)", [{ id: 'g05', grp: "B", t1: "Catar", f1: "qa", t2: "Suíça", f2: "ch" }, { id: 'g06', grp: "C", t1: "Brasil", f1: "br", t2: "Marrocos", f2: "ma" }, { id: 'g07', grp: "C", t1: "Haiti", f1: "ht", t2: "Escócia", f2: "gb-sct" }, { id: 'g08', grp: "D", t1: "Austrália", f1: "au", t2: "Turquia", f2: "tr" }]]
    // (Nota: Para não encher o chat, mantive apenas os 3 primeiros dias aqui. Cole a sua lista gigante de 72 jogos no lugar deste array ALL_GAMES)
];

window.addEventListener('load', () => {
    const savedSession = localStorage.getItem('bolao_session');
    if (savedSession) {
        currentUser = JSON.parse(savedSession);
        iniciarApp();
    } else {
        document.getElementById('login-screen').style.display = 'flex';
    }
});

async function realizarLogin() {
    const name = document.getElementById('login-name').value.trim();
    const pin = document.getElementById('login-pin').value.trim();
    
    if(!name || pin.length !== 4) { mostrarErroLogin("Preencha o nome e um PIN de 4 dígitos."); return; }
    showLoading(true);

    try {
        const resp = await fetch(`${API_URL}/login`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, pin })
        }).then(r => r.json());

        if (resp.success) entrar(name, pin);
        else mostrarErroLogin(resp.message);
    } catch (e) { mostrarErroLogin("Erro de conexão. A API pode estar iniciando (leva 30s)."); }
    showLoading(false);
}

function mostrarErroLogin(msg) {
    const errEl = document.getElementById('login-error');
    errEl.innerText = msg; errEl.style.display = 'block';
}

function entrar(name, pin) {
    currentUser = { name, pin };
    localStorage.setItem('bolao_session', JSON.stringify(currentUser));
    document.getElementById('login-screen').style.display = 'none';
    iniciarApp();
}

function fazerLogout() { localStorage.removeItem('bolao_session'); location.reload(); }

async function iniciarApp() {
    document.getElementById('display-user-name').innerText = currentUser.name;
    document.getElementById('main-app').style.display = 'block';
    
    renderGames('mobile-slip-container', 'user');

    if (currentUser.name.toLowerCase() === "admin") {
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
        if (currentUser.name.toLowerCase() === "admin" && adminResults) {
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
    if(!allUsersData) return;
    let ranking = [];
    allUsersData.forEach(u => {
        if (u.name.toLowerCase() === "admin") return;
        let p = { name: u.name, pts: 0, v: 0, e: 0, d: 0, j: 0 };
        const palps = u.jogos || {};
        Object.keys(adminResults).forEach(mId => {
            if(palps[mId]) {
                p.j++;
                const ph = parseInt(palps[mId].h), pa = parseInt(palps[mId].a), rh = parseInt(adminResults[mId].h), ra = parseInt(adminResults[mId].a);
                if(ph === rh && pa === ra) { p.pts += 8; p.v++; }
                else if((ph>pa && rh>ra) || (ph<pa && rh<ra) || (ph===pa && rh===ra)) { p.pts += 3; p.e++; }
                else { p.d++; }
            }
        });
        ranking.push(p);
    });
    ranking.sort((a, b) => b.pts - a.pts || b.v - a.v || b.e - a.e);
    
    const tbody = document.getElementById('ranking-body-app');
    if (tbody) {
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
}
function showLoading(show) { document.getElementById('loading-spinner').style.display = show ? 'flex' : 'none'; }
function showToast(msg) {
    const t = document.getElementById('toast-notif');
    t.innerText = msg; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 3000);
}