# TBH SHOP - React E-commerce Project

## 프로젝트 구조

```
src/
├── components/           # 공통 컴포넌트
│   ├── common/          # 범용 컴포넌트 (모달, 버튼 등)
│   ├── layout/          # 레이아웃 관련 컴포넌트
│   ├── search/          # 검색 관련 컴포넌트
│   └── product/         # 상품 관련 컴포넌트
├── features/            # 비즈니스 로직별 기능
│   ├── product/         # 상품 관련 기능
│   │   ├── components/  # 상품 전용 컴포넌트
│   │   └── hooks/       # 상품 관련 커스텀 훅
│   └── category/        # 카테고리 관련 기능
├── pages/               # 페이지 컴포넌트
│   ├── category/        # 카테고리 페이지
│   ├── product/         # 상품 페이지
│   └── toss/            # 결제 관련 페이지
├── hooks/               # 공통 커스텀 훅
├── api/                 # API 관련 로직
├── shared/              # 공유 유틸리티
│   ├── state/           # 상태 관리
│   └── theme/           # 테마 설정
└── assets/              # 정적 자산
```

## 주요 기술 스택

- **React 19** - 최신 React 버전
- **Vite** - 빠른 개발 서버 및 빌드 도구
- **Material-UI (MUI)** - UI 컴포넌트 라이브러리
- **Tailwind CSS** - 유틸리티 기반 CSS 프레임워크
- **Framer Motion** - 애니메이션 라이브러리
- **React Router** - 클라이언트 사이드 라우팅

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 프로젝트 특징

- **모던 아키텍처**: Feature-based 폴더 구조
- **컴포넌트 재사용성**: 공통 컴포넌트의 체계적 관리
- **반응형 디자인**: 모바일과 데스크톱 모두 지원
- **접근성**: ARIA 라벨 및 키보드 네비게이션 지원
- **성능 최적화**: 코드 스플리팅 및 지연 로딩

## 개발 가이드라인

1. **컴포넌트 위치**: 기능별로 적절한 폴더에 배치
2. **네이밍 컨벤션**: PascalCase (컴포넌트), camelCase (함수/변수)
3. **Props 타입**: 명확한 prop 인터페이스 정의
4. **에러 처리**: 사용자 친화적인 에러 메시지 제공
