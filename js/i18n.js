/**
 * i18n (Internationalization) Module
 * 다국어 지원을 위한 표준 모듈
 * 지원 언어: 한국어(ko), English(en), 中文(zh), हिन्दी(hi), Русский(ru), 日本語(ja), Español(es), Português(pt), Indonesia(id), Türkçe(tr), Deutsch(de), Français(fr)
 */

class I18n {
    constructor() {
        this.translations = {};
        this.supportedLanguages = ['ko', 'en', 'zh', 'hi', 'ru', 'ja', 'es', 'pt', 'id', 'tr', 'de', 'fr'];
        this.currentLang = this.detectLanguage();
    }

    /**
     * 브라우저 언어 감지 및 기본값 반환
     */
    detectLanguage() {
        // 1. localStorage에서 저장된 언어 확인
        const savedLang = localStorage.getItem('appLanguage');
        if (savedLang && this.supportedLanguages.includes(savedLang)) {
            return savedLang;
        }

        // 2. 브라우저 언어 확인
        const browserLang = navigator.language.split('-')[0].toLowerCase();
        if (this.supportedLanguages.includes(browserLang)) {
            return browserLang;
        }

        // 3. 기본값: 한국어
        return 'ko';
    }

    /**
     * 특정 언어의 번역 JSON 파일 로드
     */
    async loadTranslations(lang) {
        if (!this.supportedLanguages.includes(lang)) {
            console.warn(`Unsupported language: ${lang}`);
            return;
        }

        try {
            const response = await fetch(`js/locales/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load ${lang}.json`);
            }
            this.translations[lang] = await response.json();
        } catch (error) {
            console.error(`Error loading translations for ${lang}:`, error);
            // Fallback to English
            if (lang !== 'en') {
                await this.loadTranslations('en');
            }
        }
    }

    /**
     * 번역 키를 기반으로 텍스트 반환 (dot notation 지원)
     * 예: 'home.title', 'button.start'
     */
    t(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key; // 번역이 없으면 키를 반환
            }
        }

        return value || key;
    }

    /**
     * 언어 변경
     */
    async setLanguage(lang) {
        if (!this.supportedLanguages.includes(lang)) {
            console.warn(`Unsupported language: ${lang}`);
            return;
        }

        if (!(lang in this.translations)) {
            await this.loadTranslations(lang);
        }

        this.currentLang = lang;
        localStorage.setItem('appLanguage', lang);
        this.updateUI();
    }

    /**
     * UI 요소의 data-i18n 속성을 기반으로 텍스트 업데이트
     */
    updateUI() {
        // data-i18n 속성이 있는 모든 요소를 찾아 번역 적용
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);

            // input, textarea 등의 placeholder 처리
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                // 일반 텍스트 요소
                element.textContent = translation;
            }
        });

        // 언어 선택기 활성 상태 업데이트
        const langOptions = document.querySelectorAll('.lang-option');
        langOptions.forEach(option => {
            if (option.getAttribute('data-lang') === this.currentLang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });

        // 페이지 언어 속성 업데이트
        document.documentElement.lang = this.currentLang;
    }

    /**
     * 초기화 - 언어 로드 및 UI 업데이트
     */
    async init() {
        // 기본 언어 및 모든 지원 언어 로드
        await this.loadTranslations(this.currentLang);

        // 나머지 언어도 백그라운드에서 로드
        for (const lang of this.supportedLanguages) {
            if (lang !== this.currentLang) {
                this.loadTranslations(lang).catch(() => {
                    // 각 언어 로드 실패는 무시
                });
            }
        }

        // UI 업데이트
        this.updateUI();
    }

    /**
     * 현재 설정된 언어 반환
     */
    getCurrentLanguage() {
        return this.currentLang;
    }

    /**
     * 언어 코드를 바탕으로 언어명 반환
     */
    getLanguageName(lang) {
        const names = {
            ko: '한국어',
            en: 'English',
            zh: '中文',
            hi: 'हिन्दी',
            ru: 'Русский',
            ja: '日本語',
            es: 'Español',
            pt: 'Português',
            id: 'Bahasa Indonesia',
            tr: 'Türkçe',
            de: 'Deutsch',
            fr: 'Français'
        };
        return names[lang] || lang;
    }

    /**
     * 지원 언어 목록 반환
     */
    getSupportedLanguages() {
        return this.supportedLanguages;
    }
}

// 전역 i18n 인스턴스 생성
const i18n = new I18n();
