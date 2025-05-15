# Summy

Next.js 기반의 대화 요약 웹 애플리케이션

## 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```
# XAI API 설정
NEXT_PUBLIC_XAI_API_URL=http://52.78.150.124:8080/api/xai/complete
```

## 프로젝트 구조

```
summy/
├── app/                    # Next.js 앱 디렉토리 (페이지 및 라우트)
│   ├── api/                # API 라우트
│   ├── components/         # 앱 전용 컴포넌트
│   ├── globals.css         # 전역 스타일
│   ├── layout.tsx          # 루트 레이아웃
│   └── page.tsx            # 홈페이지
├── components/             # 공통 컴포넌트
│   ├── auth/               # 인증 관련 컴포넌트
│   ├── common/             # 범용 컴포넌트
│   ├── dashboard/          # 대시보드 컴포넌트
│   ├── landing/            # 랜딩 페이지 컴포넌트
│   ├── layout/             # 레이아웃 컴포넌트
│   ├── theme/              # 테마 관련 컴포넌트
│   ├── ui/                 # UI 컴포넌트
│   └── utils/              # 컴포넌트 관련 유틸리티
├── hooks/                  # 커스텀 훅
├── lib/                    # 라이브러리 및 유틸리티 함수
├── public/                 # 정적 파일 (이미지, 폰트 등)
├── utils/                  # 전역 유틸리티 함수
├── .eslintrc.json          # ESLint 설정
├── .gitignore              # Git 무시 파일 목록
├── next.config.js          # Next.js 설정
├── package.json            # 프로젝트 정보 및 의존성
├── postcss.config.js       # PostCSS 설정
├── tailwind.config.js      # Tailwind CSS 설정
└── tsconfig.json           # TypeScript 설정
```

## 기술 스택

- **프레임워크**: Next.js 14
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **상태 관리**: React Hooks
- **HTTP 클라이언트**: Axios
- **UI 컴포넌트**: 자체 개발 컴포넌트 + Radix UI
- **애니메이션**: Framer Motion

## 실행 방법

### 개발 환경 설정

1. 저장소 클론하기:
```bash
git clone https://github.com/your-username/summy.git
cd summy
```

2. 의존성 설치:
```bash
npm install
# 또는
yarn install
# 또는
pnpm install
```

3. 개발 서버 실행:
```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

4. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 빌드 및 배포

프로덕션 빌드 생성:
```bash
npm run build
# 또는
yarn build
# 또는
pnpm build
```

프로덕션 서버 실행:
```bash
npm run start
# 또는
yarn start
# 또는
pnpm start
```

## PR(Pull Request) 방법

1. 개인 브랜치 생성:
```bash
git checkout -b feature/your-feature-name
```

2. 변경사항 구현 후 commit:
```bash
git add .
git commit -m "기능 구현: 기능 설명"
```

3. 원격 저장소에 push:
```bash
git push origin feature/your-feature-name
```

4. GitHub에서 Pull Request 생성:
   - 원격 저장소 페이지에서 "Compare & pull request" 버튼 클릭
   - PR 제목 및 설명 작성
   - 코드 리뷰어 지정 (필요시)
   - "Create pull request" 버튼 클릭

5. 코드 리뷰 및 피드백 반영 후 merge

## 주요 기능

- 텍스트 입력 및 파일 업로드를 통한 대화 내용 요약
- API를 통한 AI 요약 생성
- 에러 처리 및 사용자 피드백

## 기여 방법

1. 이슈 생성 또는 기존 이슈 확인
2. 기능 개발 또는 버그 수정
3. PR 제출
4. 코드 리뷰
5. 개선사항 반영

## 라이선스

Private project - 모든 권리 보유 