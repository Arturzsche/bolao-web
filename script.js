const API_URL = "https://bolao-api-2lej.onrender.com"; 

let currentUser = null;
let adminResults = {};
let allUsersData = [];

// OS 72 JOGOS REAIS
const ALL_GAMES = [
    ["11 DE JUNHO (QUI)", [
        { id: 'g01', time: '16:00', grp: "A", t1: "México", f1: "mx", t2: "África do Sul", f2: "za" },
        { id: 'g02', time: '23:00', grp: "A", t1: "Cor. do Sul", f1: "kr", t2: "Rep. Tcheca", f2: "cz" }
    ]],
    ["12 DE JUNHO (SEX)", [
        { id: 'g03', time: '16:00', grp: "B", t1: "Canadá", f1: "ca", t2: "Bósnia e H.", f2: "ba" },
        { id: 'g04', time: '22:00', grp: "D", t1: "EUA", f1: "us", t2: "Paraguai", f2: "py" }
    ]],
    ["13 DE JUNHO (SÁB)", [
        { id: 'g05', time: '16:00', grp: "B", t1: "Catar", f1: "qa", t2: "Suíça", f2: "ch" },
        { id: 'g06', time: '19:00', grp: "C", t1: "Brasil", f1: "br", t2: "Marrocos", f2: "ma" },
        { id: 'g07', time: '22:00', grp: "C", t1: "Haiti", f1: "ht", t2: "Escócia", f2: "gb-sct" },
        { id: 'g08', time: '01:00', grp: "D", t1: "Austrália", f1: "au", t2: "Turquia", f2: "tr" }
    ]],
    ["14 DE JUNHO (DOM)", [
        { id: 'g09', time: '14:00', grp: "E", t1: "Alemanha", f1: "de", t2: "Curaçao", f2: "cw" },
        { id: 'g10', time: '17:00', grp: "F", t1: "Holanda", f1: "nl", t2: "Japão", f2: "jp" },
        { id: 'g11', time: '20:00', grp: "E", t1: "C. Marfim", f1: "ci", t2: "Equador", f2: "ec" },
        { id: 'g12', time: '23:00', grp: "F", t1: "Suécia", f1: "se", t2: "Tunísia", f2: "tn" }
    ]],
    ["15 DE JUNHO (SEG)", [
        { id: 'g13', time: '13:00', grp: "H", t1: "Espanha", f1: "es", t2: "Cabo Verde", f2: "cv" },
        { id: 'g14', time: '16:00', grp: "G", t1: "Bélgica", f1: "be", t2: "Egito", f2: "eg" },
        { id: 'g15', time: '19:00', grp: "H", t1: "Arábia S.", f1: "sa", t2: "Uruguai", f2: "uy" },
        { id: 'g16', time: '22:00', grp: "G", t1: "Irã", f1: "ir", t2: "Nova Zel.", f2: "nz" }
    ]],
    ["16 DE JUNHO (TER)", [
        { id: 'g17', time: '16:00', grp: "I", t1: "França", f1: "fr", t2: "Senegal", f2: "sn" },
        { id: 'g18', time: '19:00', grp: "I", t1: "Iraque", f1: "iq", t2: "Noruega", f2: "no" },
        { id: 'g19', time: '22:00', grp: "J", t1: "Argentina", f1: "ar", t2: "Argélia", f2: "dz" },
        { id: 'g20', time: '01:00', grp: "J", t1: "Áustria", f1: "at", t2: "Jordânia", f2: "jo" }
    ]],
    ["17 DE JUNHO (QUA)", [
        { id: 'g21', time: '14:00', grp: "K", t1: "Portugal", f1: "pt", t2: "RD Congo", f2: "cd" },
        { id: 'g22', time: '17:00', grp: "L", t1: "Inglaterra", f1: "gb-eng", t2: "Croácia", f2: "hr" },
        { id: 'g23', time: '20:00', grp: "L", t1: "Gana", f1: "gh", t2: "Panamá", f2: "pa" },
        { id: 'g24', time: '23:00', grp: "K", t1: "Uzbequistão", f1: "uz", t2: "Colômbia", f2: "co" }
    ]],
    ["18 DE JUNHO (QUI)", [
        { id: 'g25', time: '13:00', grp: "A", t1: "Rep. Tcheca", f1: "cz", t2: "África do Sul", f2: "za" },
        { id: 'g26', time: '16:00', grp: "B", t1: "Suíça", f1: "ch", t2: "Bósnia e H.", f2: "ba" },
        { id: 'g27', time: '19:00', grp: "B", t1: "Canadá", f1: "ca", t2: "Catar", f2: "qa" },
        { id: 'g28', time: '22:00', grp: "A", t1: "México", f1: "mx", t2: "Cor. do Sul", f2: "kr" }
    ]],
    ["19 DE JUNHO (SEX)", [
        { id: 'g29', time: '16:00', grp: "D", t1: "EUA", f1: "us", t2: "Austrália", f2: "au" },
        { id: 'g30', time: '19:00', grp: "C", t1: "Escócia", f1: "gb-sct", t2: "Marrocos", f2: "ma" },
        { id: 'g31', time: '21:30', grp: "C", t1: "Brasil", f1: "br", t2: "Haiti", f2: "ht" },
        { id: 'g32', time: '01:00', grp: "D", t1: "Turquia", f1: "tr", t2: "Paraguai", f2: "py" }
    ]],
    ["20 DE JUNHO (SÁB)", [
        { id: 'g33', time: '14:00', grp: "F", t1: "Holanda", f1: "nl", t2: "Suécia", f2: "se" },
        { id: 'g34', time: '17:00', grp: "E", t1: "Alemanha", f1: "de", t2: "C. Marfim", f2: "ci" },
        { id: 'g35', time: '21:00', grp: "E", t1: "Equador", f1: "ec", t2: "Curaçao", f2: "cw" },
        { id: 'g36', time: '01:00', grp: "F", t1: "Tunísia", f1: "tn", t2: "Japão", f2: "jp" }
    ]],
    ["21 DE JUNHO (DOM)", [
        { id: 'g37', time: '13:00', grp: "H", t1: "Espanha", f1: "es", t2: "Arábia S.", f2: "sa" },
        { id: 'g38', time: '16:00', grp: "G", t1: "Bélgica", f1: "be", t2: "Irã", f2: "ir" },
        { id: 'g39', time: '19:00', grp: "H", t1: "Uruguai", f1: "uy", t2: "Cabo Verde", f2: "cv" },
        { id: 'g40', time: '22:00', grp: "G", t1: "Nova Zel.", f1: "nz", t2: "Egito", f2: "eg" }
    ]],
    ["22 DE JUNHO (SEG)", [
        { id: 'g41', time: '14:00', grp: "J", t1: "Argentina", f1: "ar", t2: "Áustria", f2: "at" },
        { id: 'g42', time: '18:00', grp: "I", t1: "França", f1: "fr", t2: "Iraque", f2: "iq" },
        { id: 'g43', time: '21:00', grp: "I", t1: "Noruega", f1: "no", t2: "Senegal", f2: "sn" },
        { id: 'g44', time: '00:00', grp: "J", t1: "Jordânia", f1: "jo", t2: "Argélia", f2: "dz" }
    ]],
    ["23 DE JUNHO (TER)", [
        { id: 'g45', time: '14:00', grp: "K", t1: "Portugal", f1: "pt", t2: "Uzbequistão", f2: "uz" },
        { id: 'g46', time: '17:00', grp: "L", t1: "Inglaterra", f1: "gb-eng", t2: "Gana", f2: "gh" },
        { id: 'g47', time: '20:00', grp: "L", t1: "Panamá", f1: "pa", t2: "Croácia", f2: "hr" },
        { id: 'g48', time: '23:00', grp: "K", t1: "Colômbia", f1: "co", t2: "RD Congo", f2: "cd" }
    ]],
    ["24 DE JUNHO (QUA)", [
        { id: 'g49', time: '16:00', grp: "B", t1: "Suíça", f1: "ch", t2: "Canadá", f2: "ca" },
        { id: 'g50', time: '16:00', grp: "B", t1: "Bósnia e H.", f1: "ba", t2: "Catar", f2: "qa" },
        { id: 'g51', time: '19:00', grp: "C", t1: "Marrocos", f1: "ma", t2: "Haiti", f2: "ht" },
        { id: 'g52', time: '19:00', grp: "C", t1: "Escócia", f1: "gb-sct", t2: "Brasil", f2: "br" },
        { id: 'g53', time: '22:00', grp: "A", t1: "África do Sul", f1: "za", t2: "Cor. do Sul", f2: "kr" },
        { id: 'g54', time: '22:00', grp: "A", t1: "Rep. Tcheca", f1: "cz", t2: "México", f2: "mx" }
    ]],
    ["25 DE JUNHO (QUI)", [
        { id: 'g55', time: '17:00', grp: "E", t1: "Equador", f1: "ec", t2: "Alemanha", f2: "de" },
        { id: 'g56', time: '17:00', grp: "E", t1: "Curaçao", f1: "cw", t2: "C. Marfim", f2: "ci" },
        { id: 'g57', time: '20:00', grp: "F", t1: "Tunísia", f1: "tn", t2: "Holanda", f2: "nl" },
        { id: 'g58', time: '20:00', grp: "F", t1: "Japão", f1: "jp", t2: "Suécia", f2: "se" },
        { id: 'g59', time: '23:00', grp: "D", t1: "Turquia", f1: "tr", t2: "EUA", f2: "us" },
        { id: 'g60', time: '23:00', grp: "D", t1: "Paraguai", f1: "py", t2: "Austrália", f2: "au" }
    ]],
    ["26 DE JUNHO (SEX)", [
        { id: 'g61', time: '16:00', grp: "I", t1: "Senegal", f1: "sn", t2: "Iraque", f2: "iq" },
        { id: 'g62', time: '16:00', grp: "I", t1: "Noruega", f1: "no", t2: "França", f2: "fr" },
        { id: 'g63', time: '21:00', grp: "H", t1: "Cabo Verde", f1: "cv", t2: "Arábia S.", f2: "sa" },
        { id: 'g64', time: '21:00', grp: "H", t1: "Uruguai", f1: "uy", t2: "Espanha", f2: "es" },
        { id: 'g65', time: '00:00', grp: "G", t1: "Egito", f1: "eg", t2: "Irã", f2: "ir" },
        { id: 'g66', time: '00:00', grp: "G", t1: "Nova Zel.", f1: "nz", t2: "Bélgica", f2: "be" }
    ]],
    ["27 DE JUNHO (SÁB)", [
        { id: 'g67', time: '18:00', grp: "L", t1: "Croácia", f1: "hr", t2: "Gana", f2: "gh" },
        { id: 'g68', time: '18:00', grp: "L", t1: "Panamá", f1: "pa", t2: "Inglaterra", f2: "gb-eng" },
        { id: 'g69', time: '20:30', grp: "K", t1: "RD Congo", f1: "cd", t2: "Uzbequistão", f2: "uz" },
        { id: 'g70', time: '20:30', grp: "K", t1: "Colômbia", f1: "co", t2: "Portugal", f2: "pt" },
        { id: 'g71', time: '23:00', grp: "J", t1: "Jordânia", f1: "jo", t2: "Argentina", f2: "ar" },
        { id: 'g72', time: '23:00', grp: "J", t1: "Argélia", f1: "dz", t2: "Áustria", f2: "at" }
    ]]
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
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: lastUser.name })
            }).then(r => r.json());

            if (resp.success) entrar(lastUser.name);
        } catch (e) { alert("Erro de conexão."); }
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
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
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
    if(currentUser) localStorage.setItem('bolao_last_user', JSON.stringify(currentUser));
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

function parseKickoff(dayStr, timeStr) {
    const match = dayStr.match(/(\d+)\s+DE\s+([A-Z]+)/i);
    if(!match) return Date.now();
    
    let day = parseInt(match[1]);
    const month = match[2].toUpperCase() === "JULHO" ? 6 : 5; 
    const [hours, minutes] = timeStr.split(':').map(Number);
    
    if (hours === 0 || hours === 1) {
        day += 1;
    }
    
    return new Date(2026, month, day, hours, minutes, 0).getTime();
}

function getMatchState(kickoffMs) {
    const now = Date.now();
    const openTime = new Date(kickoffMs);
    openTime.setHours(0, 0, 0, 0); 
    
    if (now >= kickoffMs) return 'late'; 
    if (now >= openTime.getTime()) return 'countdown'; 
    return 'future'; 
}

function renderGames(containerId, mode) {
    const container = document.getElementById(containerId);
    if(!container) return;
    let html = '';
    
    ALL_GAMES.forEach(day => {
        html += `<div class="day-container"><div class="day-title-bar">${day[0]}</div>`;
        
        day[1].forEach(game => {
            const prefix = mode === 'user' ? 'u' : 'a';
            const kickoffMs = parseKickoff(day[0], game.time);
            const state = getMatchState(kickoffMs);
            
            const isDisabled = (mode === 'user' && state === 'late') ? 'disabled' : '';
            
            let lockIcon = '';
            let extraBtn = '';

            if (mode === 'user') {
                if (state === 'late') {
                    lockIcon = `<span class="lock-status late"><i class="ph-fill ph-lock-key"></i> Fechado</span>`;
                } else if (state === 'countdown') {
                    lockIcon = `<span class="lock-status open countdown-timer" data-match="${game.id}" data-kickoff="${kickoffMs}"><i class="ph-bold ph-clock"></i> ...</span>`;
                } else {
                    lockIcon = `<span class="lock-status open"><i class="ph-fill ph-check-circle"></i> Aberto</span>`;
                }
            } else if (mode === 'admin') {
                // BOTÃO DE LIXEIRA ADICIONADO PARA O ADMIN
                extraBtn = `<button class="btn-clear-admin" onclick="limparGabaritoJogo('${game.id}')" title="Apagar Placar"><i class="ph-bold ph-trash"></i></button>`;
            }

            const onInput = `oninput="updateMatchRowColor(this)"`;
            
            html += `
            <div class="match-entry-row ${mode === 'admin' ? 'admin-mode' : ''}">
                <div class="entry-group-box">
                    <span class="group-letter">${game.grp}</span>
                    <span class="match-time">${game.time}</span>
                    ${lockIcon}
                </div>
                <div class="entry-team-box home">${game.t1} <span class="fi fi-${game.f1}"></span></div>
                <div class="entry-inputs-box">
                    <input type="number" min="0" max="99" inputmode="numeric" class="entry-input ${prefix}-h-${game.id}" data-match="${game.id}" ${onInput} ${isDisabled}>
                    <span class="entry-vs">x</span>
                    <input type="number" min="0" max="99" inputmode="numeric" class="entry-input ${prefix}-a-${game.id}" data-match="${game.id}" ${onInput} ${isDisabled}>
                </div>
                <div class="entry-team-box away"><span class="fi fi-${game.f2}"></span> ${game.t2}</div>
                ${extraBtn ? `<div class="entry-admin-action">${extraBtn}</div>` : ''}
            </div>`;
        });
        html += `</div>`;
    });
    container.innerHTML = html;
}

// FUNÇÃO PARA O ADMIN LIMPAR O JOGO INDIVIDUAL
window.limparGabaritoJogo = function(mId) {
    if(!confirm("Apagar o placar oficial deste jogo? Os pontos de todos serão recalculados ao clicar em Publicar.")) return;
    const hInput = document.querySelector(`.a-h-${mId}`);
    const aInput = document.querySelector(`.a-a-${mId}`);
    if(hInput) hInput.value = "";
    if(aInput) aInput.value = "";
    if(hInput) updateMatchRowColor(hInput);
    showToast("Placar apagado! Clique em 'Publicar Gabarito' para confirmar.");
};

function updateMatchRowColor(inputElement) {
    const mId = inputElement.getAttribute('data-match');
    const hInput = document.querySelector(`.u-h-${mId}`) || document.querySelector(`.a-h-${mId}`);
    const aInput = document.querySelector(`.u-a-${mId}`) || document.querySelector(`.a-a-${mId}`);
    
    if(!hInput || !aInput) return;
    const row = hInput.closest('.match-entry-row');
    if(!row) return;

    row.classList.remove('win-match', 'draw-match');
    
    if(hInput.value !== "" && aInput.value !== "") {
        const h = parseInt(hInput.value);
        const a = parseInt(aInput.value);
        if(h === a) row.classList.add('draw-match');
        else row.classList.add('win-match');
    }
}

async function carregarDadosDaNuvem() {
    showLoading(true);
    const timestamp = Date.now(); 
    const fetchOpts = { cache: 'no-store' }; 
    
    if (currentUser.name !== "Admin") {
        try {
            const urlSegura = `${API_URL}/palpites/${encodeURIComponent(currentUser.name)}?t=${timestamp}`;
            const meusPalpites = await fetch(urlSegura, fetchOpts).then(r => r.json());
            if (meusPalpites && !meusPalpites.error) preencherPalpitesAtuais(meusPalpites);
        } catch(e) { console.error("Erro ao puxar palpites pessoais"); }
    }

    try {
        adminResults = await fetch(`${API_URL}/palpites/Admin?t=${timestamp}`, fetchOpts).then(r => r.json());
        if (currentUser.name === "Admin" && adminResults && !adminResults.error) {
            Object.keys(adminResults).forEach(mId => {
                const h = document.querySelector(`.a-h-${mId}`); const a = document.querySelector(`.a-a-${mId}`);
                if(h && a) { h.value = adminResults[mId].h; a.value = adminResults[mId].a; updateMatchRowColor(h); }
            });
        }
    } catch(e) { console.error("Erro ao puxar gabarito"); }

    try {
        const usersResp = await fetch(`${API_URL}/users?t=${timestamp}`, fetchOpts).then(r => r.json());
        if(Array.isArray(usersResp)) allUsersData = usersResp;
    } catch(e) { console.error("Erro ao puxar tabela de usuários"); }

    calculateAndRenderRanking();
    showLoading(false);
}

function preencherPalpitesAtuais(palpitesSalvos) {
    Object.keys(palpitesSalvos).forEach(mId => {
        const h = document.querySelector(`.u-h-${mId}`); const a = document.querySelector(`.u-a-${mId}`);
        if(h && a) { 
            h.value = palpitesSalvos[mId].h; 
            a.value = palpitesSalvos[mId].a; 
            updateMatchRowColor(h);
            
            h.disabled = true;
            a.disabled = true;
        }
    });
}

function salvarNoMongo() {
    let temPalpiteNovo = false; 
    
    ALL_GAMES.forEach(day => {
        day[1].forEach(game => {
            const hInput = document.querySelector(`.u-h-${game.id}`);
            const aInput = document.querySelector(`.u-a-${game.id}`);
            
            if (hInput && aInput && hInput.value !== "" && aInput.value !== "" && !hInput.disabled) {
                const hVal = parseInt(hInput.value);
                const aVal = parseInt(aInput.value);
                const kickoffMs = parseKickoff(day[0], game.time);
                
                if (hVal >= 0 && aVal >= 0 && Date.now() < kickoffMs) {
                    temPalpiteNovo = true;
                }
            }
        });
    });

    if (!temPalpiteNovo) {
        showToast("Nenhum palpite novo válido para salvar!");
        return;
    }
    
    document.getElementById('confirm-modal').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('confirm-modal').style.display = 'none';
}

async function executarSalvamento() {
    fecharModal(); 
    showLoading(true);
    let palpitesParaSalvar = {};
    
    ALL_GAMES.forEach(day => {
        day[1].forEach(game => {
            const hInput = document.querySelector(`.u-h-${game.id}`);
            const aInput = document.querySelector(`.u-a-${game.id}`);
            
            if (hInput && aInput && hInput.value !== "" && aInput.value !== "") {
                const hVal = parseInt(hInput.value);
                const aVal = parseInt(aInput.value);
                const kickoffMs = parseKickoff(day[0], game.time);
                
                if (hVal >= 0 && aVal >= 0) {
                    if (!hInput.disabled) {
                        if (Date.now() < kickoffMs) {
                            palpitesParaSalvar[game.id] = { h: hVal, a: aVal };
                        }
                    } else {
                        palpitesParaSalvar[game.id] = { h: hVal, a: aVal };
                    }
                }
            }
        });
    });
    
    try {
        const response = await fetch(`${API_URL}/salvar`, { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ name: currentUser.name, jogos: palpitesParaSalvar }) 
        });
        
        const data = await response.json();
        
        if(data.success) {
            showToast("Palpites Salvos com Sucesso!");
            
            Object.keys(palpitesParaSalvar).forEach(mId => {
                const h = document.querySelector(`.u-h-${mId}`); 
                const a = document.querySelector(`.u-a-${mId}`);
                if(h) h.disabled = true;
                if(a) a.disabled = true;
            });
        }
    } catch (err) {
        alert("Falha de conexão. Tente novamente.");
    }
    
    await carregarDadosDaNuvem();
    showLoading(false);
}

async function saveAdminResults() {
    showLoading(true);
    let gabarito = {};
    
    ALL_GAMES.forEach(day => {
        day[1].forEach(game => {
            const hInput = document.querySelector(`.a-h-${game.id}`);
            const aInput = document.querySelector(`.a-a-${game.id}`);
            // Pega TODOS os campos do admin que NÃO estão em branco (se o admin apagou na lixeira, ele será ignorado aqui)
            if (hInput && aInput && hInput.value !== "" && aInput.value !== "") {
                const hVal = parseInt(hInput.value);
                const aVal = parseInt(aInput.value);
                if (hVal >= 0 && aVal >= 0) {
                    gabarito[game.id] = { h: hVal, a: aVal };
                }
            }
        });
    });

    try {
        await fetch(`${API_URL}/salvar`, { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ name: "Admin", jogos: gabarito }) 
        });
        showToast("Gabarito Publicado!");
    } catch (err) {
        alert("Erro ao publicar o gabarito.");
    }
    
    await carregarDadosDaNuvem();
    showLoading(false);
}

function calculateAndRenderRanking() {
    const tbody = document.getElementById('ranking-body-app');
    if (!tbody) return;

    if (!Array.isArray(allUsersData) || allUsersData.length === 0 || (allUsersData.length === 1 && allUsersData[0].name === "Admin")) {
        tbody.innerHTML = `<tr><td colspan="5" style="padding: 20px; color: #999;">Nenhum participante registrado ainda.</td></tr>`;
        return;
    }

    let ranking = [];
    const safeAdminResults = adminResults || {};

    allUsersData.forEach(u => {
        if (!u || !u.name || u.name === "Admin") return;
        
        // ADICIONADO: Separação de pontos (cravados = 8pts, acertos simples = 3pts)
        let p = { name: u.name, pts: 0, acertos: 0, cravados: 0 };
        const palps = u.jogos || {};
        
        Object.keys(safeAdminResults).forEach(mId => {
            if(palps[mId] && safeAdminResults[mId]) {
                const ph = parseInt(palps[mId].h), pa = parseInt(palps[mId].a);
                const rh = parseInt(safeAdminResults[mId].h), ra = parseInt(safeAdminResults[mId].a);
                if(!isNaN(ph) && !isNaN(pa) && !isNaN(rh) && !isNaN(ra)) {
                    if(ph === rh && pa === ra) { 
                        p.pts += 8; 
                        p.cravados++; 
                    } else if((ph>pa && rh>ra) || (ph<pa && rh<ra) || (ph===pa && rh===ra)) { 
                        p.pts += 3; 
                        p.acertos++; 
                    }
                }
            }
        });
        ranking.push(p);
    });

    // Desempate: 1º Pontos, 2º Mais placares exatos, 3º Mais acertos simples
    ranking.sort((a, b) => b.pts - a.pts || b.cravados - a.cravados || b.acertos - a.acertos);
    
    tbody.innerHTML = ranking.map((r, i) => {
        return `<tr>
            <td class="td-pos" style="color:var(--ge-blue); font-weight: 800;">${i+1}</td>
            <td style="text-align: left; padding-left: 15px; font-weight: 600;">${r.name}</td>
            <td class="td-pts" style="color:var(--text-dark); font-weight: 800; font-size: 1.1rem; background: #F9F9F9;">${r.pts}</td>
            <td style="color: #666; font-weight: 700;">${r.acertos}</td>
            <td style="color: #06AA48; font-weight: 800;">${r.cravados}</td>
        </tr>`;
    }).join('');
}

function switchTab(tab) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    const targetView = document.getElementById('view-' + tab);
    if(targetView) targetView.classList.add('active');
    const activeBtn = document.querySelector(`.tab-btn[onclick*="${tab}"]`);
    if(activeBtn) activeBtn.classList.add('active');
    
    localStorage.setItem('bolao_active_tab', tab);
    if (tab === 'ranking') carregarRankingSilencioso();
}

function showLoading(show) { document.getElementById('loading-spinner').style.display = show ? 'flex' : 'none'; }
function showToast(msg) {
    const t = document.getElementById('toast-notif');
    t.innerText = msg; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 3000);
}

async function carregarRankingSilencioso() {
    try {
        const timestamp = Date.now();
        const fetchOpts = { cache: 'no-store' };
        
        const usersResp = await fetch(`${API_URL}/users?t=${timestamp}`, fetchOpts).then(r => r.json());
        if(Array.isArray(usersResp)) allUsersData = usersResp;
        
        const adminResp = await fetch(`${API_URL}/palpites/Admin?t=${timestamp}`, fetchOpts).then(r => r.json());
        if(adminResp && !adminResp.error) adminResults = adminResp;
        
        calculateAndRenderRanking();
    } catch(e) {}
}

setInterval(() => {
    const viewRanking = document.getElementById('view-ranking');
    if (viewRanking && viewRanking.classList.contains('active')) carregarRankingSilencioso();
}, 10000);

setInterval(() => {
    const timers = document.querySelectorAll('.countdown-timer');
    const now = Date.now();
    
    timers.forEach(timer => {
        const kickoff = parseInt(timer.getAttribute('data-kickoff'));
        const mId = timer.getAttribute('data-match');
        const diff = kickoff - now;

        if (diff <= 0) {
            timer.classList.remove('open', 'countdown-timer');
            timer.classList.add('late');
            timer.innerHTML = `<i class="ph-fill ph-lock-key"></i> Fechado`;
            
            if (currentUser && currentUser.name !== "Admin") {
                const hInput = document.querySelector(`.u-h-${mId}`);
                const aInput = document.querySelector(`.u-a-${mId}`);
                if(hInput) hInput.disabled = true;
                if(aInput) aInput.disabled = true;
            }
        } else {
            const h = Math.floor(diff / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);
            
            let timeText = "";
            if (h > 0) timeText += `${h}h `;
            timeText += `${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
            
            timer.innerHTML = `<i class="ph-bold ph-clock"></i> ${timeText}`;
        }
    });
}, 1000);
