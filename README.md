# 나의 내면 동물 성격 테스트 🦁

## 프로젝트 개요

당신의 내면 동물을 발견하는 재미있는 바이럴 성격 테스트입니다. 12개의 질문을 통해 12가지 동물 유형(사자, 독수리, 늑대, 돌고래 등) 중 당신이 무엇인지 알아보세요.

- **플랫폼**: Web (dopabrain.com)
- **기술**: HTML5, CSS3, Vanilla JavaScript
- **PWA**: Progressive Web App 지원
- **다국어**: 12개 언어 지원 (한국어, 영어, 중국어, 힌디어, 러시아어, 일본어, 스페인어, 포르투갈어, 인도네시아어, 터키어, 독일어, 프랑스어)

## 기능

### 핵심 기능
- **12개 질문 테스트**: 각 질문 4개 선택지
- **12가지 동물 유형**:
  - 🦁 사자 (Lion) - 리더십
  - 🦅 독수리 (Eagle) - 분석력
  - 🐺 늑대 (Wolf) - 독립성
  - 🐬 돌고래 (Dolphin) - 공감능력
  - 🐱 고양이 (Cat) - 세련됨
  - 🦉 부엉이 (Owl) - 지혜
  - 🐻 곰 (Bear) - 신뢰성
  - 🦊 여우 (Fox) - 영리함
  - 🐰 토끼 (Rabbit) - 민감성
  - 🦋 나비 (Butterfly) - 창의성
  - 🐉 용 (Dragon) - 강력함
  - 🦄 유니콘 (Unicorn) - 특별함

### 결과 화면
- 동물별 성격 특징 설명
- 장점 및 약점 분석
- 호환되는 동물 정보
- Canvas 기반 결과 이미지 생성

### SNS 공유 기능
- 카카오톡 공유
- 트위터 공유
- 링크 복사
- 결과 이미지 다운로드

### 기술 특성
- **다크모드 기본**: 2026년 UI/UX 트렌드 반영
- **Glassmorphism**: 반투명 카드 디자인
- **반응형 디자인**: 모바일(360px) ~ 데스크톱 완벽 지원
- **접근성**: WCAG 표준 준수
- **PWA**: 오프라인 지원, 설치 가능

## 파일 구조

```
animal-personality/
├── index.html              # 메인 HTML (OG태그, GA4, PWA 설정)
├── manifest.json          # PWA 매니페스트
├── sw.js                  # Service Worker (오프라인 지원)
├── css/
│   └── style.css         # 다크모드, 반응형, 애니메이션 스타일
├── js/
│   ├── app.js            # 메인 앱 로직
│   ├── i18n.js           # 다국어 지원 (표준 모듈)
│   ├── quiz-data.js      # 질문 및 동물 데이터
│   └── locales/          # 번역 파일 (12개 언어)
│       ├── ko.json
│       ├── en.json
│       ├── zh.json
│       ├── hi.json
│       ├── ru.json
│       ├── ja.json
│       ├── es.json
│       ├── pt.json
│       ├── id.json
│       ├── tr.json
│       ├── de.json
│       └── fr.json
├── icon-192.svg          # 192x192 아이콘
├── icon-512.svg          # 512x512 아이콘
└── README.md             # 이 파일
```

## 로컬 테스트

### 방법 1: Python 서버
```bash
cd projects/animal-personality
python -m http.server 8000
# http://localhost:8000 에서 확인
```

### 방법 2: VS Code Live Server
- `index.html` 우클릭 → "Live Server로 열기"

## SEO 최적화

- **Schema.org JSON-LD**: SoftwareApplication 마크업
- **OG 태그**: SNS 공유 최적화
- **hreflang**: 다국어 SEO
- **메타 설명**: 검색 결과 최적화
- **모바일 친화**: Viewport 설정, 터치 최적화

## 광고 설정

- **Google AdSense**: ca-pub-3600813755953882
- **배치 위치**:
  - 상단 배너 (90px 높이)
  - 하단 배너 (90px 높이)
  - 추천 섹션 전

## 다국어 지원

모든 UI 텍스트는 i18n 시스템을 통해 번역됩니다. 언어 선택기로 12개 언어 간 전환 가능합니다.

**지원 언어**:
- 한국어 (ko)
- English (en)
- 中文 (zh)
- हिन्दी (hi)
- Русский (ru)
- 日本語 (ja)
- Español (es)
- Português (pt)
- Bahasa Indonesia (id)
- Türkçe (tr)
- Deutsch (de)
- Français (fr)

## 데이터 플로우

1. **홈 화면**: 테스트 시작 버튼
2. **질문 화면**: 12개 질문에 답변 (점수 계산)
3. **결과 화면**: 가장 높은 점수의 동물 표시
4. **공유**: 결과를 SNS에 공유 가능

## PWA 기능

- **설치**: "홈 화면에 추가" 지원
- **오프라인**: Service Worker 캐싱
- **아이콘**: 다양한 크기의 SVG 아이콘
- **테마 컬러**: 보라색 (#8e44ad)

## 성능 최적화

- **이미지**: SVG 형식 (확장성, 용량 최소화)
- **캐싱**: Service Worker를 통한 오프라인 지원
- **번들 크기**: 기본 로드 후 필요시 언어 파일 로드
- **에니메이션**: CSS 기반 (60fps)

## 바이럴 최적화

- **결과 이미지**: Canvas로 생성된 공유용 이미지
- **SNS 공유**: 카카오톡, 트위터, 일반 링크 복사
- **Open Graph**: 카카오톡/인스타 미리보기 최적화
- **해시태그**: SNS 발견성 개선

## 수익화 전략

1. **광고**: 상단/하단 AdSense 배너
2. **프리미엄** (향후):
   - 광고 제거 (₩3,900)
   - AI 심층 해석 (광고 시청 후 제공)

## 배포

1. GitHub Pages 또는 dopabrain.com에 배포
2. Google Search Console 등록
3. Google Play 스토어 등록 (웹앱)
4. 소셜 미디어 공유로 바이럴 마케팅

## 라이선스

Copyright 2026 DopaBrain. All rights reserved.

## 기여

버그 리포트 및 제안은 Issue를 통해 제출해주세요.
