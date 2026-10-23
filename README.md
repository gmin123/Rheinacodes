# Rheina · 감정 기반 작품 추천

지금의 상황과 감정을 고르면, 그 마음에 어울리는 작품과 가볼 만한 공간(미술관·갤러리)을 추천하는 서비스입니다. 추천받은 작품은 MeM(감정 기록 달력)에 저장할 수 있습니다.

감정 기록 달력(MeM)은 별도 저장소에 있습니다. 이 저장소에는 Rheina 화면만 있습니다.

## 화면

| 경로 | 화면 |
|---|---|
| `/` | 환영 화면 (위치·날씨·시간대) |
| `/emotion` | 상황 선택(15가지 중 1개) → 감정 선택(연결된 감정 중 2개) |
| `/result` | 감정 분석 → 클로징 멘트, 추천 공간 1곳, 추천 작품 2점, 상세 보기, MeM 저장 |
| `/login` | 이메일·카카오 로그인 |
| `/privacy` | 개인정보처리방침 |
| `/upload` | 작품 데이터 업로드 |
| `/admin` | 내부 관리자 페이지 (비밀번호 인증) |

앱 안의 "MeM", "내 기록 보기" 같은 링크는 MeM 주소(`https://mem.ai.kr`)로 넘어가며, 이때 로그인 상태가 함께 전달됩니다 (`src/utils/siteDomain.ts`, `src/components/DomainGuard.tsx`).

## 추천 방식

선택한 상황 1개와 감정 2개를 작품·공간의 상황 태그, 감정 태그와 비교해 점수를 매깁니다 (`src/utils/masterMatching.ts`).

- 상황 일치 8점, 같은 감정 10점, 같은 상세 감정 묶음 5점, 긍정 감정 10점
- Mirror(지금 감정을 비춰주는 작품)와 Balance(긍정적 전환) 반영 비율은 감정 조합별 클로징 멘트 매칭 유형을 따름
- 상위 점수 구간 안에서 점수에 비례한 무작위 순서로 추천, 생존 작가 작품 우선
- 공간은 같은 점수대 안에서 가까운 곳이 먼저 나올 확률이 높음

## 데이터

Firebase 프로젝트 `yournest-today-d2a73`의 `mydb` 데이터베이스를 사용합니다 (`src/firebase.ts`). MeM도 같은 데이터베이스를 씁니다.

| 컬렉션 | 내용 |
|---|---|
| `firstdata` | 추천 작품 |
| `Museumgallery` | 추천 공간 (미술관·갤러리) |
| `diaryEntries` | MeM 저장 기록 (사용자·날짜별) |
| `profiles`, `users`, `sessions`, `events` | 프로필, 회원 정보, 방문·행동 통계 |

`scripts/` 에는 작품 큐레이션 DB(엑셀)를 기존 데이터와 비교하는 읽기 전용 검증 스크립트와 그 결과가 있습니다.

## 실행

```bash
npm install
cp .env.example .env   # VITE_KAKAO_JS_KEY 에 카카오 JavaScript 키 입력
npm run dev            # http://localhost:3000
```

## 배포

`.firebaserc` 의 기본 프로젝트는 `yournest-today-d2a73` 입니다 (`https://yournest-today-d2a73.web.app`).

```bash
npm run build
firebase deploy --only hosting
```

`--only hosting` 없이 배포하면 Firestore·Storage 보안 규칙(`firestore.rules`, `storage.rules`)도 함께 덮어씁니다.
