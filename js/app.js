/**
 * Animal Personality Test - Main Application Logic
 * 나의 내면 동물 성격 테스트
 */

class AnimalPersonalityApp {
    constructor() {
        this.currentQuestion = 0;
        this.scores = {};
        this.answers = [];
        this.result = null;
        this.shareUrl = window.location.href;
        this.init();
    }

    async init() {
        // i18n 초기화
        await i18n.init();

        // DOM 요소 캐싱
        this.cacheElements();

        // 이벤트 리스너 등록
        this.attachEventListeners();

        // 추천 섹션 로드
        this.loadRecommendations();

        // 앱 로더 숨기기
        setTimeout(() => {
            this.appLoader.classList.add('hidden');
        }, 500);
    }

    cacheElements() {
        this.appLoader = document.getElementById('appLoader');
        this.homeScreen = document.getElementById('homeScreen');
        this.quizScreen = document.getElementById('quizScreen');
        this.resultScreen = document.getElementById('resultScreen');
        this.startBtn = document.getElementById('startBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.retakeBtn = document.getElementById('retakeBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.shareKakaoBtn = document.getElementById('shareKakaoBtn');
        this.shareTwitterBtn = document.getElementById('shareTwitterBtn');
        this.shareUrlBtn = document.getElementById('shareUrlBtn');
        this.langToggle = document.getElementById('lang-toggle');
        this.langMenu = document.getElementById('lang-menu');
        this.langOptions = document.querySelectorAll('.lang-option');
        this.progressFill = document.getElementById('progressFill');
        this.progressText = document.getElementById('progressText');
        this.questionTitle = document.getElementById('questionTitle');
        this.choicesContainer = document.getElementById('choicesContainer');
        this.resultCanvas = document.getElementById('resultCanvas');
        this.recGrid = document.getElementById('recGrid');
    }

    attachEventListeners() {
        // Home screen
        this.startBtn.addEventListener('click', () => this.startQuiz());

        // Quiz navigation
        this.prevBtn.addEventListener('click', () => this.previousQuestion());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());

        // Result screen
        this.retakeBtn.addEventListener('click', () => this.resetQuiz());
        this.downloadBtn.addEventListener('click', () => this.downloadResultImage());
        this.shareKakaoBtn.addEventListener('click', () => this.shareKakao());
        this.shareTwitterBtn.addEventListener('click', () => this.shareTwitter());
        this.shareUrlBtn.addEventListener('click', () => this.shareUrl());

        // Language selector
        this.langToggle.addEventListener('click', () => this.toggleLanguageMenu());
        this.langOptions.forEach(option => {
            option.addEventListener('click', (e) => this.changeLanguage(e.target.dataset.lang));
        });

        // Close language menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.language-selector')) {
                this.langMenu.classList.add('hidden');
            }
        });
    }

    startQuiz() {
        this.homeScreen.classList.remove('active');
        this.quizScreen.classList.add('active');
        this.currentQuestion = 0;
        this.scores = {};
        this.answers = [];
        this.displayQuestion();
    }

    displayQuestion() {
        const question = quizData.questions[this.currentQuestion];
        if (!question) return;

        // 질문 제목 표시
        this.questionTitle.textContent = question.question;

        // 선택지 표시
        this.choicesContainer.innerHTML = '';
        question.choices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = 'btn choice-btn';
            btn.textContent = choice.text;
            btn.addEventListener('click', () => this.selectChoice(index, choice));
            this.choicesContainer.appendChild(btn);
        });

        // 진행률 업데이트
        this.updateProgress();

        // 버튼 상태 업데이트
        this.updateNavigationButtons();
    }

    selectChoice(index, choice) {
        this.answers[this.currentQuestion] = choice;

        // 점수 계산
        for (const animal in choice.animals) {
            this.scores[animal] = (this.scores[animal] || 0) + choice.animals[animal];
        }

        // 버튼 활성화 상태 업데이트
        const buttons = this.choicesContainer.querySelectorAll('.choice-btn');
        buttons.forEach((btn, i) => {
            if (i === index) {
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
        });

        // 자동으로 다음 질문으로 이동
        setTimeout(() => {
            if (this.currentQuestion < quizData.questions.length - 1) {
                this.nextQuestion();
            }
        }, 300);
    }

    nextQuestion() {
        if (this.currentQuestion < quizData.questions.length - 1) {
            this.currentQuestion++;
            this.displayQuestion();
        } else {
            this.finishQuiz();
        }
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            // 이전 선택 복원
            const buttons = this.choicesContainer.querySelectorAll('.choice-btn');
            if (this.answers[this.currentQuestion]) {
                buttons.forEach((btn, i) => {
                    if (btn.textContent === this.answers[this.currentQuestion].text) {
                        btn.classList.add('selected');
                    } else {
                        btn.classList.remove('selected');
                    }
                });
            }
            this.displayQuestion();
        }
    }

    updateProgress() {
        const progress = ((this.currentQuestion + 1) / quizData.questions.length) * 100;
        this.progressFill.style.width = progress + '%';
        this.progressText.textContent = `${this.currentQuestion + 1} / ${quizData.questions.length}`;
    }

    updateNavigationButtons() {
        // 이전 버튼 활성화 여부
        this.prevBtn.disabled = this.currentQuestion === 0;

        // 다음 버튼 비활성화 (자동으로 진행됨)
        this.nextBtn.style.display = 'none';
    }

    finishQuiz() {
        this.quizScreen.classList.remove('active');
        this.resultScreen.classList.add('active');
        this.calculateResult();
        this.displayResult();
    }

    calculateResult() {
        // 가장 높은 점수를 가진 동물 찾기
        let maxScore = 0;
        let resultAnimal = null;

        for (const animal in this.scores) {
            if (this.scores[animal] > maxScore) {
                maxScore = this.scores[animal];
                resultAnimal = animal;
            }
        }

        this.result = {
            animal: resultAnimal,
            data: quizData.animals[resultAnimal],
            scores: this.scores
        };
    }

    displayResult() {
        const animal = this.result.data;

        // 동물 아이콘
        document.getElementById('resultAnimalIcon').textContent = animal.emoji;

        // 제목 및 설명
        document.getElementById('resultTitle').textContent = animal.name;
        document.getElementById('resultSubtitle').textContent = animal.description;

        // 상세 정보
        document.getElementById('resultCharacteristics').textContent = animal.characteristics;
        document.getElementById('resultStrengths').textContent = animal.strengths;
        document.getElementById('resultWeaknesses').textContent = animal.weaknesses;
        document.getElementById('resultCompatible').textContent = animal.compatible;

        // Canvas 결과 이미지 생성
        this.generateResultCanvas();

        // Google Ads 갱신
        if (window.adsbygoogle) {
            try {
                adsbygoogle.push({});
            } catch (e) {
                // Ad loading error
            }
        }
    }

    generateResultCanvas() {
        const canvas = this.resultCanvas;
        const ctx = canvas.getContext('2d');
        const animal = this.result.data;

        // 캔버스 배경
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#0f0f23');
        gradient.addColorStop(1, '#1a1a2e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 제목
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('나의 내면 동물은?', canvas.width / 2, 60);

        // 동물 아이콘
        ctx.font = '80px Arial';
        ctx.fillText(animal.emoji, canvas.width / 2, 150);

        // 동물 이름
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = '#8e44ad';
        ctx.fillText(animal.name, canvas.width / 2, 200);

        // 설명 텍스트 (줄바꿈 처리)
        ctx.font = '14px Arial';
        ctx.fillStyle = '#b0b0b0';
        const description = animal.description;
        const words = description.split(' ');
        let line = '';
        let y = 250;

        words.forEach(word => {
            const testLine = line + word + ' ';
            const metrics = ctx.measureText(testLine);

            if (metrics.width > canvas.width - 40) {
                ctx.fillText(line, canvas.width / 2, y);
                line = word + ' ';
                y += 20;
            } else {
                line = testLine;
            }
        });
        if (line) {
            ctx.fillText(line, canvas.width / 2, y);
        }

        // 출처 표시
        ctx.font = '12px Arial';
        ctx.fillStyle = '#666666';
        ctx.fillText('DopaBrain.com', canvas.width / 2, canvas.height - 20);
    }

    downloadResultImage() {
        const canvas = this.resultCanvas;
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `animal-personality-${this.result.animal}.png`;
        link.click();

        // 피드백
        const btn = this.downloadBtn;
        const originalText = btn.textContent;
        btn.textContent = i18n.t('share.download_success');
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }

    shareKakao() {
        if (!window.Kakao) {
            alert('카카오톡 공유 기능은 준비 중입니다.');
            return;
        }

        const animal = this.result.data;
        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: `나의 내면 동물: ${animal.name} 🦁`,
                description: animal.description,
                imageUrl: window.location.origin + '/animal-personality/icon-512.svg',
                link: {
                    webUrl: this.shareUrl,
                    mobileWebUrl: this.shareUrl
                }
            }
        });
    }

    shareTwitter() {
        const animal = this.result.data;
        const text = `나의 내면 동물은 ${animal.name} 🦁입니다! 당신은 무엇일까요? 테스트 해보세요!`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(this.shareUrl)}`;
        window.open(url, '_blank');
    }

    shareUrl() {
        const animal = this.result.data;
        const text = `나의 내면 동물: ${animal.name}\n${this.shareUrl}`;

        if (navigator.share) {
            navigator.share({
                title: '나의 내면 동물',
                text: `나의 내면 동물은 ${animal.name}입니다!`,
                url: this.shareUrl
            });
        } else {
            // Fallback: 링크 복사
            navigator.clipboard.writeText(this.shareUrl).then(() => {
                const btn = this.shareUrlBtn;
                const originalText = btn.textContent;
                btn.textContent = i18n.t('share.copied');
                setTimeout(() => {
                    btn.textContent = originalText;
                }, 2000);
            });
        }
    }

    resetQuiz() {
        this.resultScreen.classList.remove('active');
        this.homeScreen.classList.add('active');
        this.currentQuestion = 0;
        this.scores = {};
        this.answers = [];
        this.result = null;
    }

    loadRecommendations() {
        // 추천 섹션 로드 (다른 테스트 앱 링크)
        // 이는 나중에 실제 앱 링크로 업데이트될 수 있습니다
        const recommendations = [
            { name: 'Brain Type', emoji: '🧠', link: '../brain-type/' },
            { name: 'MBTI Love', emoji: '💕', link: '../mbti-love/' },
            { name: 'Dream Fortune', emoji: '🔮', link: '../dream-fortune/' }
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
        i18n.setLanguage(lang);
        this.langMenu.classList.add('hidden');

        // 현재 화면 업데이트
        if (this.quizScreen.classList.contains('active')) {
            this.displayQuestion();
        }
    }
}

// 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AnimalPersonalityApp();
});
