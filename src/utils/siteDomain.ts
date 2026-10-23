// Rheina 단독 앱 - 감정 기록 달력(MeM)은 별도 서비스(mem.ai.kr)에 있음
// - 앱 안의 '/mem' · '/calendar' · '/profile' 링크(내 기록 보기 등)는 MeM 주소로 넘김 (DomainGuard)
// 데이터·로그인은 MeM 과 같은 yournest-today Firebase 프로젝트를 그대로 사용 (src/firebase.ts)
const MEM_ORIGIN = 'https://mem.ai.kr';
const MEM_PATHS = ['/mem', '/calendar', '/profile'];

// MeM 경로면 MeM 주소를 돌려줌 (그 외는 Rheina 안에서 처리)
export function crossSiteUrl(pathname: string, search = ''): string | null {
  if (!MEM_PATHS.includes(pathname)) return null;
  const target = pathname === '/calendar' ? '/mem' : pathname;
  return `${MEM_ORIGIN}${target}${search}`;
}

// 로그인 후 / 로그아웃 후 기본으로 돌아갈 화면
export function siteHomePath(): string {
  return '/';
}
