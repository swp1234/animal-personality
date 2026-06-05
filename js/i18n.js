class I18n {
    constructor() {
        this.translations = {};
        this.supportedLanguages = ['ko', 'en', 'zh', 'hi', 'ru', 'ja', 'es', 'pt', 'id', 'tr', 'de', 'fr'];
        this.currentLang = this.detectLanguage();
    }

    detectLanguage() {
        try {
            const params = new URLSearchParams(window.location.search);
            const langFromUrl = params.get('lang');
            if (langFromUrl && this.supportedLanguages.includes(langFromUrl)) {
                return langFromUrl;
            }
        } catch (error) {
            console.warn('Language param detection failed:', error.message);
        }

        try {
            const savedLang = localStorage.getItem('appLanguage');
            if (savedLang && this.supportedLanguages.includes(savedLang)) {
                return savedLang;
            }
        } catch (error) {
            console.warn('Saved language detection failed:', error.message);
        }

        const browserLang = (navigator.language || 'ko').split('-')[0].toLowerCase();
        if (this.supportedLanguages.includes(browserLang)) {
            return browserLang;
        }

        return 'ko';
    }

    async loadTranslations(lang) {
        if (!this.supportedLanguages.includes(lang)) {
            throw new Error(`Unsupported language: ${lang}`);
        }

        if (this.translations[lang]) {
            return this.translations[lang];
        }

        const response = await fetch(`js/locales/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load ${lang}.json`);
        }

        this.translations[lang] = await response.json();
        return this.translations[lang];
    }

    t(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];

        for (const item of keys) {
            if (value && typeof value === 'object' && item in value) {
                value = value[item];
            } else {
                return key;
            }
        }

        return value ?? key;
    }

    getSeoHref(lang) {
        if (!lang || lang === 'x-default') {
            return 'https://dopabrain.com/animal-personality/';
        }

        return `https://dopabrain.com/animal-personality/?lang=${lang}`;
    }

    syncSeoState(lang, updateHistory = false) {
        const currentUrl = new URL(window.location.href);
        const currentHasLangParam = currentUrl.searchParams.has('lang');
        const canonicalHref = this.getSeoHref(updateHistory || currentHasLangParam ? lang : 'x-default');
        const canonicalEl = document.querySelector('link[rel="canonical"]');
        if (canonicalEl) canonicalEl.href = canonicalHref;

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.content = canonicalHref;

        const twitterUrl = document.querySelector('meta[name="twitter:url"]');
        if (twitterUrl) twitterUrl.content = canonicalHref;

        document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => {
            const hreflang = link.getAttribute('hreflang');
            link.href = this.getSeoHref(hreflang === 'x-default' ? 'x-default' : hreflang);
        });

        if (updateHistory) {
            const nextUrl = new URL(canonicalHref);
            nextUrl.hash = currentUrl.hash;
            if (currentUrl.pathname !== nextUrl.pathname || currentUrl.search !== nextUrl.search || currentUrl.hash !== nextUrl.hash) {
                window.history.replaceState({}, '', nextUrl.pathname + nextUrl.search + nextUrl.hash);
            }
        }
    }

    async setLanguage(lang) {
        if (!this.supportedLanguages.includes(lang)) {
            return false;
        }

        await this.loadTranslations(lang);
        this.currentLang = lang;
        localStorage.setItem('appLanguage', lang);
        this.updateUI();
        this.syncSeoState(lang, true);
        return true;
    }

    updateUI() {
        document.documentElement.lang = this.currentLang;

        document.querySelectorAll('[data-i18n]').forEach((element) => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);

            if (translation === key) return;

            if (element.tagName === 'META') {
                element.setAttribute('content', translation);
                return;
            }

            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.setAttribute('placeholder', translation);
                return;
            }

            element.textContent = translation;
        });

        const title = this.t('meta.title') !== 'meta.title'
            ? this.t('meta.title')
            : `${this.t('home.title')} | DopaBrain`;
        document.title = title;

        document.querySelectorAll('.lang-option').forEach((option) => {
            option.classList.toggle('active', option.getAttribute('data-lang') === this.currentLang);
        });
    }

    getCurrentLanguage() {
        return this.currentLang;
    }

    async init() {
        try {
            await this.loadTranslations(this.currentLang);
        } catch (error) {
            console.warn('Primary locale failed, falling back to English:', error.message);
            this.currentLang = 'en';
            await this.loadTranslations('en');
        }

        this.updateUI();
        this.syncSeoState(this.currentLang);
    }
}

const i18n = new I18n();

(async () => {
    try {
        await i18n.init();
    } catch (error) {
        console.error('i18n bootstrap failed:', error);
        window.i18n = {
            t: (key) => key,
            setLanguage: async () => true,
            loadTranslations: async () => ({}),
            getCurrentLanguage: () => 'en',
            getSeoHref: (lang) => `https://dopabrain.com/animal-personality/${lang && lang !== 'x-default' ? `?lang=${lang}` : ''}`
        };
        return;
    }

    window.i18n = i18n;
})();
