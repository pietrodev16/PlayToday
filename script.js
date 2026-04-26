const myGames = [
    // ZEN / CHILL
    { name: "Stardew Valley", mood: "chill", platforms: ["pc", "ps", "xbox", "mobile"], minTime: 20, hltb: "52h", reason: "Sua fazenda, suas regras.", challenges: ["Pesque 2 peixes", "Plante algo novo"] },
    { name: "Animal Crossing", mood: "chill", platforms: ["mobile"], minTime: 15, hltb: "60h", reason: "Vida tranquila na ilha.", challenges: ["Fale com um vizinho"] },
    { name: "Unpacking", mood: "chill", platforms: ["pc", "ps", "xbox"], minTime: 10, hltb: "4h", reason: "A calma de organizar caixas.", challenges: ["Organize o quarto"] },
    { name: "Monument Valley", mood: "chill", platforms: ["mobile"], minTime: 5, hltb: "2h", reason: "Arquitetura impossível e paz.", challenges: ["Complete um capítulo"] },

    // FOCUS / DESAFIO
    { name: "Elden Ring", mood: "focus", platforms: ["pc", "ps", "xbox"], minTime: 60, hltb: "58h", reason: "Enfrente deuses.", challenges: ["Vencer um Boss sem Summon"] },
    { name: "Hollow Knight", mood: "focus", platforms: ["pc", "ps", "xbox"], minTime: 30, hltb: "27h", reason: "Metroidvania desafiador.", challenges: ["Explorar uma área nova"] },
    { name: "Dead Cells", mood: "focus", platforms: ["mobile", "pc", "ps", "xbox"], minTime: 15, hltb: "15h", reason: "Morra, aprenda e repita.", challenges: ["Passar da primeira fase ileso"] },

    // STORY / IMERSÃO
    { name: "The Last of Us", mood: "story", platforms: ["ps", "pc"], minTime: 50, hltb: "15h", reason: "Uma história inesquecível.", challenges: ["Passar um combate no stealth"] },
    { name: "Halo Infinite", mood: "story", platforms: ["xbox", "pc"], minTime: 40, hltb: "18h", reason: "O Master Chief te espera.", challenges: ["Destruir uma base Banished"] },
    { name: "Genshin Impact", mood: "story", platforms: ["mobile", "pc", "ps"], minTime: 20, hltb: "∞", reason: "Mundo aberto e magias.", challenges: ["Descobrir um baú escondido"] },

    // COMPETITIVE / TRYHARD
    { name: "Valorant", mood: "competitive", platforms: ["pc"], minTime: 40, hltb: "Online", reason: "Tática e precisão.", challenges: ["Fazer um clutch"] },
    { name: "Wild Rift", mood: "competitive", platforms: ["mobile"], minTime: 15, hltb: "Online", reason: "LoL na palma da mão.", challenges: ["Ganhar como MVP"] },
    { name: "Rocket League", mood: "competitive", platforms: ["pc", "ps", "xbox"], minTime: 5, hltb: "Online", reason: "Futebol de carros.", challenges: ["Fazer um gol aéreo"] },

    // HORROR
    { name: "Resident Evil 4", mood: "horror", platforms: ["pc", "ps", "xbox"], minTime: 40, hltb: "16h", reason: "Sobreviva ao vilarejo.", challenges: ["Matar 5 inimigos na faca"] },
    { name: "Phasmophobia", mood: "horror", platforms: ["pc"], minTime: 20, hltb: "Online", reason: "Caça fantasmas.", challenges: ["Identificar o fantasma"] },
    { name: "Granny", mood: "horror", platforms: ["mobile"], minTime: 5, hltb: "∞", reason: "Fuja da casa da vovó.", challenges: ["Encontrar a chave mestra"] }
];

// Mostra/Esconde opções de Mobile
function toggleMobileOptions() {
    const platform = document.getElementById('platformInput').value;
    const mobileGroup = document.getElementById('mobileOsGroup');
    mobileGroup.style.display = platform === 'mobile' ? 'block' : 'none';
}

function decidirJogo() {
    const platform = document.getElementById('platformInput').value;
    const os = document.getElementById('osInput').value;
    const time = parseInt(document.getElementById('timeInput').value) || 0;
    const mood = document.getElementById('moodInput').value;
    const card = document.getElementById('gameCard');

    // --- LÓGICA DE FILTRO INTELIGENTE (ANTI-ERRO) ---
    // Tenta: Plataforma + Vibe + Tempo
    let filtrados = myGames.filter(g => g.platforms.includes(platform) && g.mood === mood && g.minTime <= time);

    // Fallback 1: Ignora o tempo, foca na Vibe + Plataforma
    if (filtrados.length === 0) {
        filtrados = myGames.filter(g => g.platforms.includes(platform) && g.mood === mood);
    }

    // Fallback 2: Se mesmo assim não achar, pega qualquer jogo da plataforma
    if (filtrados.length === 0) {
        filtrados = myGames.filter(g => g.platforms.includes(platform));
    }

    if (filtrados.length > 0) {
        const game = filtrados[Math.floor(Math.random() * filtrados.length)];
        
        document.getElementById('chosenGame').innerText = game.name;
        document.getElementById('gameReason').innerText = game.reason;
        document.getElementById('gameTime').innerText = `⏳ Média HLTB: ${game.hltb}`;
        document.getElementById('challengeText').innerText = game.challenges[Math.floor(Math.random() * game.challenges.length)];

        // --- DEFINIÇÃO DA LOJA ESPECÍFICA ---
        const btnStore = document.getElementById('btnStore');
        let url = "";

        if (platform === "pc") {
            url = `https://store.steampowered.com/search/?term=${encodeURIComponent(game.name)}`;
            btnStore.innerText = "🛒 Ver na Steam";
        } else if (platform === "ps") {
            url = `https://store.playstation.com/pt-br/search/${encodeURIComponent(game.name)}`;
            btnStore.innerText = "🛒 Ver na PS Store";
        } else if (platform === "xbox") {
            url = `https://www.xbox.com/pt-BR/search?q=${encodeURIComponent(game.name)}`;
            btnStore.innerText = "🛒 Ver na MS Store";
        } else if (platform === "mobile") {
            if (os === "android") {
                url = `https://play.google.com/store/search?q=${encodeURIComponent(game.name)}&c=apps`;
                btnStore.innerText = "🛒 Google Play";
            } else {
                url = `https://www.apple.com/br/search/${encodeURIComponent(game.name)}?src=globalnav`;
                btnStore.innerText = "🛒 App Store";
            }
        }

        btnStore.onclick = () => window.open(url, '_blank');
        card.classList.add('is-flipped');
    }
}

function voltar() {
    document.getElementById('gameCard').classList.remove('is-flipped');
}
