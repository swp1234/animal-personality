/**
 * Animal Personality - Wilderness Survival Journey
 * Immersive biome-based survival scenarios that reveal your spirit animal
 */

// =========== GAME DATA ===========
const BIOMES = {
    forest: { emoji: '🌲', color: '#2d6a4f' },
    ocean: { emoji: '🌊', color: '#0077b6' },
    mountain: { emoji: '🏔️', color: '#6c757d' },
    desert: { emoji: '🏜️', color: '#c17817' }
};

// 12 existing animals mapped to 4 biomes (3 per biome)
const ANIMALS = {
    wolf:      { emoji: '🐺', biome: 'forest',   traits: ['loyalty', 'instinct', 'independence', 'mystery'],   pack: ['bear', 'fox'],      rival: 'cat' },
    bear:      { emoji: '🐻', biome: 'forest',   traits: ['strength', 'protection', 'patience', 'warmth'],     pack: ['wolf', 'owl'],      rival: 'butterfly' },
    fox:       { emoji: '🦊', biome: 'forest',   traits: ['cleverness', 'adaptability', 'charm', 'creativity'],pack: ['eagle', 'butterfly'],rival: 'bear' },
    dolphin:   { emoji: '🐬', biome: 'ocean',    traits: ['empathy', 'social', 'harmony', 'playfulness'],      pack: ['rabbit', 'unicorn'],rival: 'lion' },
    cat:       { emoji: '🐱', biome: 'ocean',    traits: ['independence', 'elegance', 'intuition', 'mystery'], pack: ['owl', 'wolf'],      rival: 'dolphin' },
    owl:       { emoji: '🦉', biome: 'ocean',    traits: ['wisdom', 'insight', 'analysis', 'patience'],        pack: ['cat', 'eagle'],     rival: 'fox' },
    eagle:     { emoji: '🦅', biome: 'mountain', traits: ['vision', 'strategy', 'speed', 'objectivity'],       pack: ['lion', 'fox'],      rival: 'rabbit' },
    lion:      { emoji: '🦁', biome: 'mountain', traits: ['leadership', 'courage', 'charisma', 'determination'],pack: ['eagle', 'dragon'],  rival: 'owl' },
    dragon:    { emoji: '🐉', biome: 'mountain', traits: ['power', 'ambition', 'influence', 'mystery'],        pack: ['lion', 'unicorn'],  rival: 'rabbit' },
    rabbit:    { emoji: '🐰', biome: 'desert',   traits: ['sensitivity', 'speed', 'gentleness', 'intuition'], pack: ['dolphin', 'butterfly'],rival: 'dragon' },
    butterfly: { emoji: '🦋', biome: 'desert',   traits: ['transformation', 'creativity', 'freedom', 'beauty'],pack: ['rabbit', 'unicorn'],rival: 'bear' },
    unicorn:   { emoji: '🦄', biome: 'desert',   traits: ['idealism', 'uniqueness', 'purity', 'imagination'], pack: ['butterfly', 'dolphin'],rival: 'eagle' }
};

// Scenario scene icons per biome
const SCENARIO_ICONS = {
    forest:   ['🌙', '🐾', '💧', '👁️', '⛈️', '🍎'],
    ocean:    ['🌊', '🐟', '🏝️', '🌀', '🌙', '👀'],
    mountain: ['🔀', '❄️', '🦅', '⛰️', '🌫️', '🏔️'],
    desert:   ['☀️', '💧', '🌪️', '🐾', '✨', '🌵']
};

// Binary scoring: each choice maps to animal traits
// choiceA and choiceB each have scoring weights for the 3 animals of the chosen biome
const SCENARIOS = {
    forest: [
        { icon: 0, choiceA: { wolf: 1, bear: 0, fox: 2 }, choiceB: { wolf: 2, bear: 1, fox: 0 } },
        { icon: 1, choiceA: { wolf: 2, bear: 2, fox: 0 }, choiceB: { wolf: 0, bear: 0, fox: 2 } },
        { icon: 2, choiceA: { wolf: 1, bear: 0, fox: 2 }, choiceB: { wolf: 0, bear: 2, fox: 1 } },
        { icon: 3, choiceA: { wolf: 0, bear: 1, fox: 0 }, choiceB: { wolf: 2, bear: 0, fox: 2 } },
        { icon: 4, choiceA: { wolf: 0, bear: 2, fox: 1 }, choiceB: { wolf: 1, bear: 0, fox: 2 } },
        { icon: 5, choiceA: { wolf: 1, bear: 0, fox: 2 }, choiceB: { wolf: 0, bear: 2, fox: 0 } }
    ],
    ocean: [
        { icon: 0, choiceA: { dolphin: 2, cat: 1, owl: 0 }, choiceB: { dolphin: 0, cat: 2, owl: 1 } },
        { icon: 1, choiceA: { dolphin: 2, cat: 0, owl: 1 }, choiceB: { dolphin: 0, cat: 1, owl: 2 } },
        { icon: 2, choiceA: { dolphin: 2, cat: 1, owl: 0 }, choiceB: { dolphin: 0, cat: 2, owl: 1 } },
        { icon: 3, choiceA: { dolphin: 1, cat: 0, owl: 0 }, choiceB: { dolphin: 0, cat: 2, owl: 2 } },
        { icon: 4, choiceA: { dolphin: 2, cat: 1, owl: 0 }, choiceB: { dolphin: 0, cat: 0, owl: 2 } },
        { icon: 5, choiceA: { dolphin: 2, cat: 0, owl: 1 }, choiceB: { dolphin: 0, cat: 2, owl: 0 } }
    ],
    mountain: [
        { icon: 0, choiceA: { eagle: 1, lion: 2, dragon: 2 }, choiceB: { eagle: 2, lion: 0, dragon: 0 } },
        { icon: 1, choiceA: { eagle: 1, lion: 2, dragon: 1 }, choiceB: { eagle: 2, lion: 0, dragon: 0 } },
        { icon: 2, choiceA: { eagle: 2, lion: 1, dragon: 0 }, choiceB: { eagle: 0, lion: 2, dragon: 1 } },
        { icon: 3, choiceA: { eagle: 1, lion: 0, dragon: 2 }, choiceB: { eagle: 2, lion: 1, dragon: 0 } },
        { icon: 4, choiceA: { eagle: 0, lion: 1, dragon: 2 }, choiceB: { eagle: 2, lion: 1, dragon: 0 } },
        { icon: 5, choiceA: { eagle: 0, lion: 0, dragon: 1 }, choiceB: { eagle: 1, lion: 2, dragon: 0 } }
    ],
    desert: [
        { icon: 0, choiceA: { rabbit: 0, butterfly: 1, unicorn: 2 }, choiceB: { rabbit: 2, butterfly: 0, unicorn: 1 } },
        { icon: 1, choiceA: { rabbit: 0, butterfly: 2, unicorn: 1 }, choiceB: { rabbit: 2, butterfly: 0, unicorn: 1 } },
        { icon: 2, choiceA: { rabbit: 2, butterfly: 0, unicorn: 1 }, choiceB: { rabbit: 0, butterfly: 1, unicorn: 2 } },
        { icon: 3, choiceA: { rabbit: 0, butterfly: 2, unicorn: 1 }, choiceB: { rabbit: 1, butterfly: 0, unicorn: 2 } },
        { icon: 4, choiceA: { rabbit: 1, butterfly: 0, unicorn: 2 }, choiceB: { rabbit: 2, butterfly: 1, unicorn: 0 } },
        { icon: 5, choiceA: { rabbit: 0, butterfly: 2, unicorn: 0 }, choiceB: { rabbit: 2, butterfly: 0, unicorn: 1 } }
    ]
};

// i18n keys for animal data (names, descriptions, etc.)
// These map to locale JSON keys like "animals.wolf.name", "animals.wolf.description", etc.


// =========== APP CLASS ===========
class WildernessSurvivalApp {
    constructor() {
        this.selectedBiome = null;
        this.currentScenario = 0;
        this.scores = {};
        this.result = null;
        this.shareUrl = window.location.href;
        this.init();
    }

    async init() {
        try {
            try {
                await i18n.loadTranslations(i18n.currentLang);
                i18n.updateUI();
            } catch (e) {
                console.warn('i18n init failed:', e);
            }

            this.cacheElements();
            this.attachEventListeners();
            this.loadRecommendations();
            this.setupTheme();
            this.renderBiomeCards();
        } catch (e) {
            console.error('App init error:', e);
        } finally {
            const loader = document.getElementById('appLoader');
            if (loader) {
                loader.classList.add('hidden');
                setTimeout(() => loader.remove(), 300);
            }
            this.engagementTracked = false;
            this.trackFirstInteraction();
        }
    }

    trackFirstInteraction() {
        const handler = () => {
            this.trackEngagement('first_interaction');
            document.removeEventListener('click', handler);
            document.removeEventListener('keydown', handler);
        };
        document.addEventListener('click', handler, { once: true });
        document.addEventListener('keydown', handler, { once: true });
    }

    trackEngagement(label) {
        if (this.engagementTracked) return;
        this.engagementTracked = true;
        if (typeof gtag === 'function') {
            gtag('event', 'engagement', {
                event_category: 'animal_personality',
                event_label: label
            });
        }
    }

    setupTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const savedTheme = localStorage.getItem('theme') || 'dark';
            document.documentElement.setAttribute('data-theme', savedTheme);
            themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';
            themeToggle.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme');
                const next = current === 'light' ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', next);
                localStorage.setItem('theme', next);
                themeToggle.textContent = next === 'light' ? '🌙' : '☀️';
            });
        }
    }

    cacheElements() {
        this.homeScreen = document.getElementById('homeScreen');
        this.biomeScreen = document.getElementById('biomeScreen');
        this.scenarioScreen = document.getElementById('scenarioScreen');
        this.resultScreen = document.getElementById('resultScreen');
        this.startBtn = document.getElementById('startBtn');
        this.retakeBtn = document.getElementById('retakeBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.shareKakaoBtn = document.getElementById('shareKakaoBtn');
        this.shareTwitterBtn = document.getElementById('shareTwitterBtn');
        this.shareUrlBtn = document.getElementById('shareUrlBtn');
        this.langToggle = document.getElementById('lang-toggle');
        this.langMenu = document.getElementById('lang-menu');
        this.langOptions = document.querySelectorAll('.lang-option');
        this.biomeGrid = document.getElementById('biomeGrid');
        this.scenarioBg = document.getElementById('scenarioBg');
        this.scenarioProgressFill = document.getElementById('scenarioProgressFill');
        this.scenarioStep = document.getElementById('scenarioStep');
        this.scenarioScene = document.getElementById('scenarioScene');
        this.scenarioIcon = document.getElementById('scenarioIcon');
        this.scenarioText = document.getElementById('scenarioText');
        this.scenarioChoices = document.getElementById('scenarioChoices');
        this.resultCanvas = document.getElementById('resultCanvas');
        this.recGrid = document.getElementById('recGrid');
    }

    attachEventListeners() {
        this.startBtn.addEventListener('click', () => this.startJourney());
        this.retakeBtn.addEventListener('click', () => this.resetJourney());
        this.downloadBtn.addEventListener('click', () => this.downloadResultImage());
        this.shareKakaoBtn.addEventListener('click', () => this.shareKakao());
        this.shareTwitterBtn.addEventListener('click', () => this.shareTwitter());
        this.shareUrlBtn.addEventListener('click', () => this.shareUrl());
        this.langToggle.addEventListener('click', () => this.toggleLanguageMenu());
        this.langOptions.forEach(option => {
            option.addEventListener('click', (e) => this.changeLanguage(e.target.dataset.lang));
        });
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.language-selector')) {
                this.langMenu.classList.add('hidden');
            }
        });
    }

    // =========== PHASE 0: START ===========
    startJourney() {
        if (typeof gtag === 'function') {
            gtag('event', 'test_start', { app_name: 'animal-personality', content_type: 'wilderness_survival' });
        }
        this.trackEngagement('test_start');
        this.switchScreen(this.homeScreen, this.biomeScreen);
    }

    // =========== PHASE 1: BIOME SELECTION ===========
    renderBiomeCards() {
        this.biomeGrid.innerHTML = '';
        const biomeKeys = Object.keys(BIOMES);
        biomeKeys.forEach(key => {
            const card = document.createElement('button');
            card.className = 'biome-card';
            card.setAttribute('data-biome', key);
            card.innerHTML = `
                <div class="biome-emoji">${BIOMES[key].emoji}</div>
                <div class="biome-name" data-i18n="biome.${key}">${i18n.t('biome.' + key)}</div>
                <div class="biome-desc" data-i18n="biome.${key}_desc">${i18n.t('biome.' + key + '_desc')}</div>
            `;
            card.addEventListener('click', () => this.selectBiome(key));
            this.biomeGrid.appendChild(card);
        });
    }

    selectBiome(biome) {
        this.selectedBiome = biome;
        this.currentScenario = 0;
        this.scores = {};

        // Initialize scores for the 3 animals of this biome
        const biomeAnimals = Object.keys(ANIMALS).filter(a => ANIMALS[a].biome === biome);
        biomeAnimals.forEach(a => { this.scores[a] = 0; });

        if (typeof gtag === 'function') {
            gtag('event', 'biome_selected', { app_name: 'animal-personality', biome: biome });
        }

        // Set biome background
        this.scenarioBg.className = 'scenario-bg ' + biome;

        this.switchScreen(this.biomeScreen, this.scenarioScreen);
        this.displayScenario();
    }

    // =========== PHASE 2: SURVIVAL SCENARIOS ===========
    displayScenario() {
        const scenarios = SCENARIOS[this.selectedBiome];
        const scenario = scenarios[this.currentScenario];
        const icons = SCENARIO_ICONS[this.selectedBiome];

        // Update progress
        const progress = ((this.currentScenario + 1) / scenarios.length) * 100;
        this.scenarioProgressFill.style.width = progress + '%';
        this.scenarioStep.textContent = `${this.currentScenario + 1} / ${scenarios.length}`;

        // Scene icon
        this.scenarioIcon.textContent = icons[scenario.icon];

        // Scene text from i18n
        const scenarioKey = `scenarios.${this.selectedBiome}.${this.currentScenario}`;
        this.scenarioText.textContent = i18n.t(scenarioKey + '.text');

        // Render two binary choices
        this.scenarioChoices.innerHTML = '';

        const choiceABtn = document.createElement('button');
        choiceABtn.className = 'scenario-choice';
        choiceABtn.textContent = i18n.t(scenarioKey + '.a');
        choiceABtn.addEventListener('click', () => this.makeChoice('A', scenario));

        const choiceBBtn = document.createElement('button');
        choiceBBtn.className = 'scenario-choice';
        choiceBBtn.textContent = i18n.t(scenarioKey + '.b');
        choiceBBtn.addEventListener('click', () => this.makeChoice('B', scenario));

        this.scenarioChoices.appendChild(choiceABtn);
        this.scenarioChoices.appendChild(choiceBBtn);

        // Animate scene in
        this.scenarioScene.style.animation = 'none';
        // Force reflow
        void this.scenarioScene.offsetHeight;
        this.scenarioScene.style.animation = 'sceneFadeIn 0.5s ease';
    }

    makeChoice(choice, scenario) {
        const scoring = choice === 'A' ? scenario.choiceA : scenario.choiceB;

        // Add scores
        for (const animal in scoring) {
            this.scores[animal] = (this.scores[animal] || 0) + scoring[animal];
        }

        // Mark selected
        const buttons = this.scenarioChoices.querySelectorAll('.scenario-choice');
        buttons.forEach((btn, i) => {
            if ((choice === 'A' && i === 0) || (choice === 'B' && i === 1)) {
                btn.classList.add('selected');
            }
            btn.style.pointerEvents = 'none';
        });

        // Flash a random animal silhouette from this biome
        this.flashAnimalSilhouette();

        // Next scenario after delay
        setTimeout(() => {
            if (this.currentScenario < SCENARIOS[this.selectedBiome].length - 1) {
                this.currentScenario++;
                this.displayScenario();
            } else {
                this.finishJourney();
            }
        }, 600);
    }

    flashAnimalSilhouette() {
        const biomeAnimals = Object.keys(ANIMALS).filter(a => ANIMALS[a].biome === this.selectedBiome);
        const randomAnimal = biomeAnimals[Math.floor(Math.random() * biomeAnimals.length)];

        const flash = document.createElement('div');
        flash.className = 'animal-flash';
        flash.textContent = ANIMALS[randomAnimal].emoji;
        document.body.appendChild(flash);

        setTimeout(() => flash.remove(), 900);
    }

    // =========== PHASE 3: RESULT ===========
    finishJourney() {
        this.calculateResult();
        this.switchScreen(this.scenarioScreen, this.resultScreen);
        this.displayResult();

        // Show ad
        const adTop = document.getElementById('ad-top');
        if (adTop) adTop.style.display = '';

        if (typeof gtag === 'function') {
            gtag('event', 'test_complete', {
                app_name: 'animal-personality',
                result_type: this.result.key,
                biome: this.selectedBiome
            });
        }
    }

    calculateResult() {
        let maxScore = -1;
        let resultKey = null;

        for (const animal in this.scores) {
            if (this.scores[animal] > maxScore) {
                maxScore = this.scores[animal];
                resultKey = animal;
            }
        }

        this.result = {
            key: resultKey,
            data: ANIMALS[resultKey]
        };
    }

    displayResult() {
        const animal = this.result.data;
        const key = this.result.key;

        // Set biome background
        const resultBg = document.getElementById('resultBg');
        resultBg.className = 'result-bg ' + this.selectedBiome;

        // Animal icon
        document.getElementById('resultAnimalIcon').textContent = animal.emoji;

        // Title and subtitle
        document.getElementById('resultTitle').textContent = i18n.t('animals.' + key + '.name');
        document.getElementById('resultSubtitle').textContent = i18n.t('animals.' + key + '.description');

        // Characteristics
        document.getElementById('resultCharacteristics').textContent = i18n.t('animals.' + key + '.characteristics');

        // Trait cards
        const traitCards = document.getElementById('traitCards');
        traitCards.innerHTML = '';
        const traitEmojis = {
            loyalty: '🤝', instinct: '⚡', independence: '🐺', mystery: '🌙',
            strength: '💪', protection: '🛡️', patience: '⏳', warmth: '❤️',
            cleverness: '🧠', adaptability: '🔄', charm: '✨', creativity: '🎨',
            empathy: '💕', social: '👥', harmony: '☯️', playfulness: '🎭',
            elegance: '👑', intuition: '🔮', wisdom: '📚', insight: '🔍',
            analysis: '📊', vision: '👁️', strategy: '♟️', speed: '⚡',
            objectivity: '⚖️', leadership: '🏛️', courage: '🦁', charisma: '🌟',
            determination: '🎯', power: '🔥', ambition: '🚀', influence: '🌐',
            sensitivity: '🌸', gentleness: '🕊️', transformation: '🦋', freedom: '🕊️',
            beauty: '💎', idealism: '🌈', uniqueness: '⭐', purity: '🤍',
            imagination: '💭'
        };

        animal.traits.forEach(trait => {
            const card = document.createElement('div');
            card.className = 'trait-card';
            card.innerHTML = `
                <div class="trait-emoji">${traitEmojis[trait] || '✨'}</div>
                <div class="trait-label" data-i18n="traits.${trait}">${i18n.t('traits.' + trait)}</div>
            `;
            traitCards.appendChild(card);
        });

        // Compatible animals (pack)
        const compatContainer = document.getElementById('compatAnimals');
        compatContainer.innerHTML = '';
        animal.pack.forEach(packKey => {
            const packAnimal = ANIMALS[packKey];
            const div = document.createElement('div');
            div.className = 'compat-animal';
            div.innerHTML = `
                <span class="compat-animal-emoji">${packAnimal.emoji}</span>
                <span data-i18n="animals.${packKey}.name">${i18n.t('animals.' + packKey + '.name')}</span>
            `;
            compatContainer.appendChild(div);
        });

        // Rival animal
        const rivalContainer = document.getElementById('rivalAnimal');
        rivalContainer.innerHTML = '';
        const rivalKey = animal.rival;
        const rivalData = ANIMALS[rivalKey];
        const rivalDiv = document.createElement('div');
        rivalDiv.className = 'compat-animal rival-animal';
        rivalDiv.innerHTML = `
            <span class="compat-animal-emoji">${rivalData.emoji}</span>
            <span data-i18n="animals.${rivalKey}.name">${i18n.t('animals.' + rivalKey + '.name')}</span>
        `;
        rivalContainer.appendChild(rivalDiv);

        // Percentile stat
        const pStat = document.getElementById('percentile-stat');
        if (pStat) {
            const pctVal = Math.floor(Math.random() * 12) + 6;
            const template = i18n.t('result.percentileStat') || 'Only <strong>{percent}%</strong> of participants are this animal type';
            pStat.innerHTML = template.replace('{percent}', pctVal);
        }

        // Canvas share image
        this.generateResultCanvas();

        // Google Ads refresh
        if (window.adsbygoogle) {
            try { adsbygoogle.push({}); } catch (e) { /* Ad error */ }
        }
    }

    generateResultCanvas() {
        const canvas = this.resultCanvas;
        const ctx = canvas.getContext('2d');
        const key = this.result.key;
        const animal = this.result.data;

        // Biome background gradient
        const biomeColors = {
            forest: ['#0b3d1e', '#2d6a4f'],
            ocean: ['#03045e', '#0077b6'],
            mountain: ['#2b2d42', '#495057'],
            desert: ['#7f5539', '#ddb892']
        };
        const colors = biomeColors[this.selectedBiome] || ['#0f0f23', '#1a1a2e'];
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, colors[0]);
        gradient.addColorStop(1, colors[1]);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dark overlay for readability
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 22px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(i18n.t('result.wilderness_spoken'), canvas.width / 2, 50);

        // Animal emoji
        ctx.font = '80px Arial';
        ctx.fillText(animal.emoji, canvas.width / 2, 150);

        // Animal name
        ctx.font = 'bold 28px Arial';
        ctx.fillStyle = '#b56edb';
        ctx.fillText(i18n.t('animals.' + key + '.name'), canvas.width / 2, 210);

        // Biome
        ctx.font = '14px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fillText(BIOMES[this.selectedBiome].emoji + ' ' + i18n.t('biome.' + this.selectedBiome), canvas.width / 2, 240);

        // Traits
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        const traitTexts = animal.traits.map(t => i18n.t('traits.' + t));
        ctx.fillText(traitTexts.join(' · '), canvas.width / 2, 280);

        // Description
        ctx.font = '13px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        const desc = i18n.t('animals.' + key + '.description');
        const words = desc.split(' ');
        let line = '';
        let y = 320;
        words.forEach(word => {
            const testLine = line + word + ' ';
            if (ctx.measureText(testLine).width > canvas.width - 60) {
                ctx.fillText(line.trim(), canvas.width / 2, y);
                line = word + ' ';
                y += 20;
            } else {
                line = testLine;
            }
        });
        if (line.trim()) ctx.fillText(line.trim(), canvas.width / 2, y);

        // Pack
        y += 40;
        ctx.font = 'bold 13px Arial';
        ctx.fillStyle = 'rgba(181, 110, 219, 0.9)';
        ctx.fillText(i18n.t('result.your_pack'), canvas.width / 2, y);
        y += 22;
        ctx.font = '24px Arial';
        const packEmojis = animal.pack.map(p => ANIMALS[p].emoji).join('  ');
        ctx.fillText(packEmojis, canvas.width / 2, y);

        // Footer
        ctx.font = '12px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fillText('DopaBrain.com', canvas.width / 2, canvas.height - 20);
    }

    downloadResultImage() {
        const canvas = this.resultCanvas;
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `spirit-animal-${this.result.key}.png`;
        link.click();

        if (typeof gtag === 'function') {
            gtag('event', 'save_image', { app_name: 'animal-personality', content_type: 'test_result' });
        }

        const btn = this.downloadBtn;
        const originalText = btn.textContent;
        btn.textContent = i18n.t('share.download_success');
        setTimeout(() => { btn.textContent = originalText; }, 2000);
    }

    shareKakao() {
        if (!window.Kakao) return;
        const key = this.result.key;
        if (typeof gtag === 'function') {
            gtag('event', 'share', { method: 'kakao', app_name: 'animal-personality', content_type: 'test_result' });
        }
        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: i18n.t('animals.' + key + '.name') + ' ' + ANIMALS[key].emoji,
                description: i18n.t('animals.' + key + '.description'),
                imageUrl: window.location.origin + '/animal-personality/icon-512.svg',
                link: { webUrl: this.shareUrl, mobileWebUrl: this.shareUrl }
            }
        });
    }

    shareTwitter() {
        const key = this.result.key;
        if (typeof gtag === 'function') {
            gtag('event', 'share', { method: 'twitter', app_name: 'animal-personality', content_type: 'test_result' });
        }
        const name = i18n.t('animals.' + key + '.name');
        const text = i18n.t('share.twitter_text').replace('{animal}', name + ' ' + ANIMALS[key].emoji);
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(this.shareUrl)}`;
        window.open(url, '_blank');
    }

    shareUrl() {
        const key = this.result.key;
        if (typeof gtag === 'function') {
            gtag('event', 'share', { method: navigator.share ? 'native' : 'clipboard', app_name: 'animal-personality', content_type: 'test_result' });
        }
        const name = i18n.t('animals.' + key + '.name');
        if (navigator.share) {
            navigator.share({
                title: i18n.t('home.title'),
                text: i18n.t('share.native_text').replace('{animal}', name),
                url: this.shareUrl
            });
        } else {
            navigator.clipboard.writeText(this.shareUrl).then(() => {
                const btn = this.shareUrlBtn;
                const originalText = btn.textContent;
                btn.textContent = i18n.t('share.copied');
                setTimeout(() => { btn.textContent = originalText; }, 2000);
            });
        }
    }

    // =========== NAVIGATION ===========
    switchScreen(from, to) {
        from.classList.remove('active');
        to.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    resetJourney() {
        this.resultScreen.classList.remove('active');
        this.homeScreen.classList.add('active');
        this.selectedBiome = null;
        this.currentScenario = 0;
        this.scores = {};
        this.result = null;
        const adTop = document.getElementById('ad-top');
        if (adTop) adTop.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    loadRecommendations() {
        const recommendations = [
            { name: i18n.t('rec.brain_type') || '뇌유형 검사', emoji: '🧠', link: '../brain-type/' },
            { name: i18n.t('rec.mbti_love') || 'MBTI 궁합', emoji: '💕', link: '../mbti-love/' },
            { name: i18n.t('rec.dream_fortune') || '꿈해몽/운세', emoji: '🔮', link: '../dream-fortune/' },
            { name: i18n.t('rec.color_personality') || '성격 색상', emoji: '🎨', link: '../color-personality/' },
            { name: i18n.t('rec.emotion_temp') || '감정 온도계', emoji: '🌡️', link: '../emotion-temp/' },
            { name: i18n.t('rec.hsp_test') || 'HSP 검사', emoji: '✨', link: '../hsp-test/' }
        ];

        this.recGrid.innerHTML = '';
        recommendations.forEach(rec => {
            const card = document.createElement('a');
            card.href = rec.link;
            card.className = 'rec-card';
            card.innerHTML = `
                <div class="rec-emoji">${rec.emoji}</div>
                <div class="rec-name">${rec.name}</div>
            `;
            this.recGrid.appendChild(card);
        });
    }

    toggleLanguageMenu() {
        this.langMenu.classList.toggle('hidden');
    }

    changeLanguage(lang) {
        i18n.setLanguage(lang).then(() => {
            this.langMenu.classList.add('hidden');
            this.renderBiomeCards();
            this.loadRecommendations();
            // Re-render current scenario if in scenario phase
            if (this.scenarioScreen.classList.contains('active') && this.selectedBiome) {
                this.displayScenario();
            }
            // Re-render result if showing
            if (this.resultScreen.classList.contains('active') && this.result) {
                this.displayResult();
            }
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.app = new WildernessSurvivalApp();
});
