export const GAS_URL = 'https://script.google.com/macros/s/AKfycby2_UG5uFuIDsAIBxXIEx-nXHhdgl4uo6Gs4LavO5JZfg7o078ff31zYxwSztmMlQkd/exec';

export const TEMPLATES = {
  PC: {
    '일반형': ['홈링크','브랜드소식','메인이미지','타이틀','서브링크1','서브링크2','서브링크3','썸네일1','썸네일2','썸네일3'],
    '일반형-2구': ['홈링크','브랜드소식','메인이미지','타이틀','서브링크1','서브링크2','서브링크3','썸네일1','썸네일2','썸네일3','다이나믹섬네일1','다이나믹섬네일2'],
    '일반형-5구': ['홈링크','브랜드소식','메인이미지','타이틀','서브링크1','서브링크2','서브링크3','썸네일1','썸네일2','썸네일3','다이나믹섬네일1','다이나믹섬네일2','다이나믹섬네일3','다이나믹섬네일4','다이나믹섬네일5'],
    '없음': []
  },
  MO: {
    '일반형-버튼': ['홈링크','브랜드소식','메인이미지','타이틀','메뉴1','메뉴2','메뉴3','메뉴4'],
    '리스팅형-3구섬네일': ['홈링크','브랜드소식','컨텐츠1','버튼1','컨텐츠2','버튼2'],
    '섬네일형-탭': ['홈링크','브랜드소식','메인이미지','타이틀','탭1-1','탭1-2','탭1-3','탭2-1','탭2-2','탭2-3','탭3-1','탭3-2','탭3-3'],
    '섬네일형-플리킹': ['홈링크','브랜드소식','메인이미지','타이틀','썸네일1','썸네일2','썸네일3','썸네일4','썸네일5'],
    '없음': []
  }
};

export const LANDING_OPTIONS = ['메인','산출페이지','운전자보험','펫보험','갱신','이륜차','원데이','화물차','법인차','한문철','박수석님TM','자사TM','실손보험','결제혜택','이벤트'];

// LANDING_URL은 더 이상 하드코딩하지 않음.
// 구글 시트 <랜딩URL인덱스>에서 동적으로 로드됨 (fetchLandingUrlIndex 참조)

// ★ 범용/보종 구분된 기본 랜딩
export const DEFAULT_LANDING = {
  PC: {
    '일반형-5구': {
      범용: { 홈링크:'메인',브랜드소식:'산출페이지',메인이미지:'산출페이지',타이틀:'산출페이지',서브링크1:'산출페이지',서브링크2:'산출페이지',썸네일1:'산출페이지',썸네일2:'운전자보험',썸네일3:'펫보험',다이나믹섬네일1:'산출페이지',다이나믹섬네일2:'갱신',다이나믹섬네일3:'산출페이지',다이나믹섬네일4:'산출페이지',다이나믹섬네일5:'산출페이지' },
      보종: { 홈링크:'메인',브랜드소식:'산출페이지',메인이미지:'산출페이지',타이틀:'산출페이지',서브링크1:'산출페이지',서브링크2:'산출페이지',썸네일1:'산출페이지',썸네일2:'갱신',썸네일3:'이륜차',다이나믹섬네일1:'산출페이지',다이나믹섬네일2:'산출페이지',다이나믹섬네일3:'산출페이지',다이나믹섬네일4:'산출페이지',다이나믹섬네일5:'산출페이지' },
    },
    '일반형': {
      범용: { 홈링크:'메인',브랜드소식:'산출페이지',메인이미지:'산출페이지',타이틀:'산출페이지',서브링크1:'산출페이지',서브링크2:'산출페이지',서브링크3:'산출페이지',썸네일1:'산출페이지',썸네일2:'운전자보험',썸네일3:'펫보험' },
      보종: { 홈링크:'메인',브랜드소식:'산출페이지',메인이미지:'산출페이지',타이틀:'산출페이지',서브링크1:'산출페이지',서브링크2:'산출페이지',서브링크3:'산출페이지',썸네일1:'산출페이지',썸네일2:'갱신',썸네일3:'이륜차' },
    },
    '일반형-2구': {
      범용: { 홈링크:'메인',메인이미지:'산출페이지',타이틀:'산출페이지',서브링크1:'산출페이지',서브링크2:'산출페이지',서브링크3:'산출페이지',썸네일1:'산출페이지',썸네일2:'운전자보험',썸네일3:'펫보험',다이나믹섬네일1:'산출페이지',다이나믹섬네일2:'갱신' },
      보종: { 홈링크:'메인',메인이미지:'산출페이지',타이틀:'산출페이지',서브링크1:'산출페이지',서브링크2:'산출페이지',서브링크3:'산출페이지',썸네일1:'산출페이지',썸네일2:'갱신',썸네일3:'이륜차',다이나믹섬네일1:'산출페이지',다이나믹섬네일2:'산출페이지' },
    },
    '없음': { 범용: {}, 보종: {} },
  },
  MO: {
    '섬네일형-탭': {
      범용: { 홈링크:'메인',브랜드소식:'산출페이지',메인이미지:'산출페이지',타이틀:'산출페이지','탭1-1':'산출페이지','탭1-2':'운전자보험','탭1-3':'펫보험','탭2-1':'산출페이지','탭2-2':'갱신','탭2-3':'이륜차','탭3-1':'산출페이지','탭3-2':'산출페이지','탭3-3':'산출페이지' },
      보종: { 홈링크:'메인',브랜드소식:'산출페이지',메인이미지:'산출페이지',타이틀:'산출페이지','탭1-1':'산출페이지','탭1-2':'갱신','탭1-3':'이륜차','탭2-1':'산출페이지','탭2-2':'산출페이지','탭2-3':'산출페이지','탭3-1':'산출페이지','탭3-2':'산출페이지','탭3-3':'산출페이지' },
    },
    '일반형-버튼': {
      범용: { 홈링크:'메인',브랜드소식:'산출페이지',메인이미지:'산출페이지',타이틀:'산출페이지',메뉴1:'산출페이지',메뉴2:'운전자보험',메뉴3:'펫보험',메뉴4:'산출페이지',썸네일1:'산출페이지',썸네일2:'갱신',썸네일3:'이륜차' },
      보종: { 홈링크:'메인',브랜드소식:'산출페이지',메인이미지:'산출페이지',타이틀:'산출페이지',메뉴1:'산출페이지',메뉴2:'갱신',메뉴3:'이륜차',메뉴4:'산출페이지',썸네일1:'산출페이지',썸네일2:'산출페이지',썸네일3:'산출페이지' },
    },
    '리스팅형-3구섬네일': {
      범용: { 홈링크:'메인',브랜드소식:'산출페이지',컨텐츠1:'산출페이지',버튼1:'산출페이지',컨텐츠2:'갱신',버튼2:'이륜차' },
      보종: { 홈링크:'메인',브랜드소식:'산출페이지',컨텐츠1:'산출페이지',버튼1:'산출페이지',컨텐츠2:'산출페이지',버튼2:'산출페이지' },
    },
    '섬네일형-플리킹': {
      범용: { 홈링크:'메인',브랜드소식:'산출페이지',메인이미지:'산출페이지',타이틀:'산출페이지',썸네일1:'산출페이지',썸네일2:'운전자보험',썸네일3:'펫보험',썸네일4:'갱신',썸네일5:'이륜차' },
      보종: { 홈링크:'메인',브랜드소식:'산출페이지',메인이미지:'산출페이지',타이틀:'산출페이지',썸네일1:'산출페이지',썸네일2:'갱신',썸네일3:'이륜차',썸네일4:'산출페이지',썸네일5:'산출페이지' },
    },
    '없음': { 범용: {}, 보종: {} },
  }
};

// ════════════════════════════════════════════════════════════
// ★ URL 규칙 (2026.10 개편) — 원본은 구글 시트 [설정_URL규칙]
//   앱을 열면 시트에서 읽어와 아래 값을 덮어씀 (applyRules).
//   아래 DEFAULT_RULES는 시트 연결이 안 될 때 쓰는 "비상용 기본값"이며,
//   시트 초기값(initUrlRulesSheet)과 동일하게 맞춰져 있음.
// ════════════════════════════════════════════════════════════
export const DEFAULT_RULES = {
  // 소재유형(칩) → 생성되는 그룹들.  utm = utm_campaign / name = 검색어(소재명)의 그룹명 / bj = 랜딩 기본값 템플릿
  // pcOn:'X' 이면 PC 행 생성 안 함
  groups: [
    { type:'자동차', prod:'범용', utmName:'브랜드', utm:'brand', name:'자동차', bj:'범용', ptnrPc:'C464', ptnrMo:'C465', pcOn:'O' },
    { type:'자동차', prod:'보종', utmName:'자동차보험_개인용', utm:'car_personal', name:'자동차', bj:'보종', ptnrPc:'C464', ptnrMo:'C465', pcOn:'O' },
    { type:'TM', prod:'TM', utmName:'자동차보험_개인용', utm:'car_personal', name:'TM', bj:'보종', ptnrPc:'C464', ptnrMo:'C465', pcOn:'O' },
    { type:'원데이', prod:'원데이', utmName:'자동차보험_원데이', utm:'car_oneday', name:'원데이', bj:'보종', ptnrPc:'C464', ptnrMo:'C539', pcOn:'O' },
    { type:'화물차', prod:'화물차', utmName:'자동차보험_영업용_화물차', utm:'car_truck', name:'화물차', bj:'보종', ptnrPc:'C735', ptnrMo:'C735', pcOn:'O' },
    { type:'법인차', prod:'법인차', utmName:'자동차보험_법인용', utm:'car_corporate', name:'법인차', bj:'보종', ptnrPc:'CB03', ptnrMo:'CB03', pcOn:'O' },
    { type:'이륜차(개인용)', prod:'이륜차', utmName:'자동차보험_이륜차_개인용', utm:'car_bike_personal', name:'이륜차-일반그룹', bj:'보종', ptnrPc:'C614', ptnrMo:'C614', pcOn:'O' },
    { type:'이륜차(법인용)', prod:'이륜차', utmName:'자동차보험_이륜차_법인용', utm:'car_bike_corporate', name:'이륜차-법인그룹', bj:'보종', ptnrPc:'C614', ptnrMo:'C614', pcOn:'O' },
    { type:'톡보험', prod:'톡보험', utmName:'자동차보험_개인용', utm:'car_personal', name:'톡보험', bj:'보종', ptnrPc:'C464', ptnrMo:'C465', pcOn:'X' },
  ],
  // utm_content = {값}_{날짜}_{영역명}.  defaultType = 이 소재유형을 고르면 기본 선택 (쉼표로 여러 개)
  contents: [
    { label:'일반', value:'general', defaultType:'' },
    { label:'특약', value:'special', defaultType:'' },
    { label:'한문철', value:'han', defaultType:'' },
    { label:'앰배서더', value:'ambassador', defaultType:'' },
    { label:'TM', value:'tm', defaultType:'TM' },
    { label:'긴급출동', value:'sos', defaultType:'' },
    { label:'톡보험', value:'talk', defaultType:'톡보험' },
  ],
  // keyword(키워드ID) 앞 코드. 표에 없는 상품은 같은 기기의 '보종' 코드 사용
  kidCodes: [
    { dev:'PC', prod:'범용', code:'IFC' }, { dev:'PC', prod:'보종', code:'CID' },
    { dev:'MO', prod:'범용', code:'IFH' }, { dev:'MO', prod:'보종', code:'CIR' }, { dev:'MO', prod:'톡보험', code:'TCS' },
  ],
  // 랜딩(상품)별 파트너코드. 표에 없는 랜딩/메인/산출페이지는 그룹의 파트너코드 사용
  landingPtnr: [
    { landing:'이륜차', pc:'C614', mo:'C614' },
    { landing:'원데이', pc:'', mo:'C539' },
    { landing:'화물차', pc:'C735', mo:'C735' },
    { landing:'법인차', pc:'CB03', mo:'CB03' },
    { landing:'한문철', pc:'CA85', mo:'CA85' },
  ],
};

// 화면에서 쓰는 형태 (applyRules가 채움 — 객체를 교체하지 않고 내용만 바꿈)
export const BUJONG_CFG = {};
export const CONTENT_TYPES = [];
export const KID_CODE = { PC:{}, MO:{} };
export const LANDING_PTNR = {};

export function applyRules(r) {
  if (!r?.groups?.length) return false;
  const ok = v => String(v ?? '').trim();
  Object.keys(BUJONG_CFG).forEach(k => delete BUJONG_CFG[k]);
  CONTENT_TYPES.length = 0;
  KID_CODE.PC = {}; KID_CODE.MO = {};
  Object.keys(LANDING_PTNR).forEach(k => delete LANDING_PTNR[k]);

  (r.contents || []).forEach(c => { if (ok(c.label) && ok(c.value)) CONTENT_TYPES.push({ label:ok(c.label), value:ok(c.value), defaultType:ok(c.defaultType) }); });
  for (const g of r.groups) {
    const type = ok(g.type); if (!type || !ok(g.utm)) continue;
    if (!BUJONG_CFG[type]) {
      const def = CONTENT_TYPES.find(c => c.defaultType.split(',').map(x => x.trim()).includes(type));
      BUJONG_CFG[type] = { label:type, defaultContent: def?.value || CONTENT_TYPES[0]?.value || 'general', groups:[] };
    }
    BUJONG_CFG[type].groups.push({
      name: ok(g.name), prod: ok(g.prod), bj: ok(g.bj) === '범용' ? '범용' : '보종',
      ptnr_pc: ok(g.ptnrPc), ptnr_mo: ok(g.ptnrMo), utm_bj: ok(g.utm), utmName: ok(g.utmName),
      moOnly: ok(g.pcOn).toUpperCase() === 'X',
    });
  }
  (r.kidCodes || []).forEach(k => { const d = ok(k.dev).toUpperCase(); if (KID_CODE[d] && ok(k.prod) && ok(k.code)) KID_CODE[d][ok(k.prod)] = ok(k.code); });
  (r.landingPtnr || []).forEach(l => { if (ok(l.landing)) LANDING_PTNR[ok(l.landing)] = { PC: ok(l.pc), MO: ok(l.mo) }; });
  return Object.keys(BUJONG_CFG).length > 0;
}
applyRules(DEFAULT_RULES);

export function getKidCode(dev, prod) {
  const t = KID_CODE[dev];
  return t[prod] || t['보종'];
}

export const AREA_EN = {
  홈링크:'homelink', 브랜드소식:'brandnews', 메인이미지:'mainimage', 타이틀:'title',
  서브링크1:'sub_1', 서브링크2:'sub_2', 서브링크3:'sub_3',
  썸네일1:'thumb_1', 썸네일2:'thumb_2', 썸네일3:'thumb_3', 썸네일4:'thumb_4', 썸네일5:'thumb_5',
  다이나믹섬네일1:'da_thumb_1', 다이나믹섬네일2:'da_thumb_2', 다이나믹섬네일3:'da_thumb_3',
  다이나믹섬네일4:'da_thumb_4', 다이나믹섬네일5:'da_thumb_5',
  메뉴1:'menu_1', 메뉴2:'menu_2', 메뉴3:'menu_3', 메뉴4:'menu_4',
  '탭1-1':'tab_1-1', '탭1-2':'tab_1-2', '탭1-3':'tab_1-3',
  '탭2-1':'tab_2-1', '탭2-2':'tab_2-2', '탭2-3':'tab_2-3',
  '탭3-1':'tab_3-1', '탭3-2':'tab_3-2', '탭3-3':'tab_3-3',
  컨텐츠1:'contents_1', 컨텐츠2:'contents_2', 컨텐츠3:'contents_3',
  버튼1:'button_1', 버튼2:'button_2', 버튼3:'button_3',
};

// [키워드ID] 시트에서 PC/MO 마지막 번호 가져오기
// PC: F열 번호, MO: M열 번호
// 응답이 없을 때 무한 로딩되지 않도록 타임아웃 적용 (기본 15초)
function fetchWithTimeout(url, ms = 15000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  return fetch(url, { redirect: 'follow', signal: ctrl.signal }).finally(() => clearTimeout(t));
}

export async function fetchLastKidNums() {
  try {
    const res = await fetchWithTimeout(`${GAS_URL}?action=getLastKidNums`);
    const data = await res.json();
    return { pc: data.pc, mo: data.mo };
  } catch {
    return { pc: null, mo: null };
  }
}

// [키워드ID] 시트에 누적 저장
// 1) GAS에서 PC/MO 마지막 번호를 가져와 +1부터 번호 부여
// 2) rows에 kidVal 확정 후 시트에 저장
// PC: B(날짜) C(소재명) D(키워드ID) E(코드) F(번호)
// MO: H(날짜) I(소재명) J(영역명) K(키워드ID) L(코드) M(번호)
export async function appendKeywords(rows, pcStart, moStart) {
  // ★ 시트 재조회 대신 화면에서 받은(자동로드 또는 직접수정한) 마지막 번호 사용
  let kidPc = (pcStart ?? 9000) + 1;
  let kidMo = (moStart ?? 11000) + 1;

  // rows에 kidVal 확정
  rows.forEach(r => {
    if (r.dev === 'PC') r.kidVal = `${r.kidCode}${kidPc++}`;
    else                r.kidVal = `${r.kidCode}${kidMo++}`;
  });

  const pcRows = rows
    .filter(r => r.dev === 'PC')
    .map(r => ({
      date: r.date,
      searchName: r.searchName,
      area: r.area,
      kidVal: r.kidVal,
      code: r.kidCode,
      num: parseInt(r.kidVal.replace(r.kidCode, '')),
    }));

  const moRows = rows
    .filter(r => r.dev === 'MO')
    .map(r => ({
      date: r.date,
      searchName: r.searchName,
      area: r.area,
      kidVal: r.kidVal,
      code: r.kidCode,
      num: parseInt(r.kidVal.replace(r.kidCode, '')),
    }));

  try {
    const res = await fetch(GAS_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'appendKeywords', pcRows, moRows }),
    });
    return await res.json();
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// 구글 시트 [설정_URL규칙]에서 규칙 가져오기 → applyRules로 반영
export async function fetchUrlRules() {
  try {
    const res = await fetchWithTimeout(`${GAS_URL}?action=getUrlRules`);
    const data = await res.json();
    if (data.error) return { ok:false, error:data.error };
    return { ok: applyRules(data), error: '규칙이 비어 있음' };
  } catch (e) {
    return { ok:false, error:e.message };
  }
}

// 파트너코드 결정: 랜딩 상품별 표([설정_URL규칙] 4번 표) → 그 외엔 그룹의 파트너코드
function resolvePartner(dev, landing, g) {
  const own = dev === 'PC' ? g.ptnr_pc : g.ptnr_mo;
  return LANDING_PTNR[landing]?.[dev] || own;
}

// 구글 시트 <랜딩URL인덱스>에서 PC/MO 랜딩URL 맵 가져오기
// PC: B열=이름, D열=URL / MO: G열=이름, H열=URL
export async function fetchLandingUrlIndex() {
  try {
    const res = await fetch(`${GAS_URL}?action=getLandingUrlIndex`, { redirect: 'follow' });
    const data = await res.json();
    if (data.PC && data.MO) return data;
    return null;
  } catch {
    return null;
  }
}

// URL 빌드
// kidPcStart/kidMoStart는 appendKeywords에서 처리 (buildRows는 번호 없이 행만 생성)
export function buildRows({ sojae, date, bujong, contType, pcTpl, moTpl, landingPC, landingMO, landingUrlIndex, excluded = {} }) {
  const cfg = BUJONG_CFG[bujong];
  const content = contType || cfg.defaultContent || 'general';
  const devs = [
    { dev:'PC', areas: (TEMPLATES.PC[pcTpl] || []).filter(a => !excluded.PC?.[a]), sel: landingPC, index: landingUrlIndex?.PC || {} },
    { dev:'MO', areas: (TEMPLATES.MO[moTpl] || []).filter(a => !excluded.MO?.[a]), sel: landingMO, index: landingUrlIndex?.MO || {} },
  ];
  const rows = [];

  for (const d of devs) {
    if (!d.areas.length) continue;
    for (const g of cfg.groups) {
      if (g.moOnly && d.dev === 'PC') continue;
      const kidCode = getKidCode(d.dev, g.prod);
      for (const area of d.areas) {
        const landing = d.sel[g.bj]?.[area] || '산출페이지';
        const baseUrl = d.index[landing] || d.index['산출페이지'] || '';
        const ptnr = resolvePartner(d.dev, landing, g);
        const ekaExclude = ['운전자보험','실손보험','펫보험'].includes(landing);
        rows.push({
          dev: d.dev, grp: g.name, bj: g.bj, sojae, date, area,
          areaEn: AREA_EN[area] || area, landing, baseUrl,
          searchName: `네이버${d.dev}_${g.name}_${g.bj}_${sojae}_${date}_${area}`,
          kidCode, kidVal:'', ptnr, utmBj: g.utm_bj, contType: content, ekaExclude,
        });
      }
    }
  }
  return rows;
}

// [최종URL누적] 시트에 저장
// B(날짜) C(기기) D(소재명) E(최종URL)
export async function appendFinalUrls(rows) {
  const data = rows.map(r => ({
    date: r.date,
    dev: r.dev,
    searchName: r.searchName,
    finalUrl: r.finalUrl,
  }));
  try {
    const res = await fetch(GAS_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'appendFinalUrls', rows: data }),
    });
    return await res.json();
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// 최종 URL
// {baseUrl}src=..&kw=..(에카) &partner_code &keyword &utm_source &utm_medium &utm_campaign &utm_content &utm_term={query}
export function buildFinalUrl(row, ekaCode) {
  const utmSrc = `naver_bs_${row.dev === 'PC' ? 'pc' : 'mo'}`;
  const utmCont = `${row.contType}_${row.date}_${row.areaEn}`;
  return `${row.baseUrl}${ekaCode}&partner_code=${row.ptnr}&keyword=${row.kidVal}&utm_source=${utmSrc}&utm_medium=bs&utm_campaign=${row.utmBj}&utm_content=${utmCont}&utm_term={query}`;
}
