export const GAS_URL = 'https://script.google.com/macros/s/AKfycby2_UG5uFuIDsAIBxXIEx-nXHhdgl4uo6Gs4LavO5JZfg7o078ff31zYxwSztmMlQkd/exec';

export const TEMPLATES = {
  PC: {
    '일반형': ['홈링크','브랜드소식','메인이미지','타이틀','서브링크1','서브링크2','서브링크3','썸네일1','썸네일2','썸네일3'],
    '일반형-2구': ['홈링크','메인이미지','타이틀','서브링크1','서브링크2','서브링크3','썸네일1','썸네일2','썸네일3','다이나믹섬네일1','다이나믹섬네일2'],
    '일반형-5구': ['홈링크','브랜드소식','메인이미지','타이틀','서브링크1','서브링크2','썸네일1','썸네일2','썸네일3','다이나믹섬네일1','다이나믹섬네일2','다이나믹섬네일3','다이나믹섬네일4','다이나믹섬네일5'],
    '없음': []
  },
  MO: {
    '일반형-버튼': ['홈링크','브랜드소식','메인이미지','타이틀','메뉴1','메뉴2','메뉴3','메뉴4','썸네일1','썸네일2','썸네일3'],
    '일반형-리스팅': ['브랜드소식','서브링크1','서브링크2','서브링크3','컨텐츠1','컨텐츠2','버튼1','버튼2','썸네일1','썸네일2','썸네일3'],
    '섬네일형-탭': ['홈링크','브랜드소식','메인이미지','타이틀','탭1-1','탭1-2','탭1-3','탭2-1','탭2-2','탭2-3','탭3-1','탭3-2','탭3-3'],
    '섬네일형-플리킹': ['홈링크','브랜드소식','메인이미지','타이틀','썸네일1','썸네일2','썸네일3','썸네일4','썸네일5'],
    '없음': []
  }
};

export const LANDING_OPTIONS = ['메인','산출페이지','운전자보험','펫보험','갱신','이륜차','원데이','화물차','법인차','한문철','박수석님TM','자사TM','실손보험','결제혜택','이벤트'];

export const LANDING_URL = {
  PC: {
    '메인': 'https://www.directdb.co.kr/mainView.do?',
    '산출페이지': 'https://www.directdb.co.kr/at/prd/atarc/step1/formStepPreView.do?',
    '운전자보험': 'https://www.directdb.co.kr/at/prd/atarc/step1/formStepPreView.do?',
    '펫보험': 'https://www.directdb.co.kr/at/prd/atarc/step1/formStepPreView.do?',
    '갱신': 'https://www.directdb.co.kr/at/prd/atarc/step1/formStepPreView.do?isRenew=Y&',
    '이륜차': 'https://www.directdb.co.kr/at/prd/mtcc/step1/formStepPreView.do?',
    '원데이': 'https://www.directdb.co.kr/at/prd/atarc/step1/formStepPreView.do?',
    '화물차': 'https://www.directdb.co.kr/at/prd/atarc/step1/formStepPreView.do?',
    '법인차': 'https://www.directdb.co.kr/copr/atarc/step1/formStepPreView.do?',
    '한문철': 'https://www.directdb.co.kr/at/prd/atarc/step1/formStepPreView.do?',
    '박수석님TM': '1566-0015',
    '자사TM': '1566-0015',
    '실손보험': 'https://www.directdb.co.kr/at/prd/atarc/step1/formStepPreView.do?',
    '결제혜택': 'https://www.directdb.co.kr/evt/benefit/benefitView.do?',
    '이벤트': 'https://db-direct.co.kr/event/2024_sa?',
  },
  MO: {
    '메인': 'https://m.directdb.co.kr/mainView.do?',
    '산출페이지': 'https://m.directdb.co.kr/at/prd/atarc/step1/formStepPreView.do?',
    '운전자보험': 'https://m.directdb.co.kr/at/prd/atarc/step1/formStepPreView.do?',
    '펫보험': 'https://m.directdb.co.kr/at/prd/atarc/step1/formStepPreView.do?',
    '갱신': 'https://m.directdb.co.kr/at/prd/atarc/step1/formStepPreView.do?isRenew=Y&',
    '이륜차': 'https://m.directdb.co.kr/at/prd/mtcc/step1/formStepPreView.do?',
    '원데이': 'https://m.directdb.co.kr/at/prd/ondy/step1/formStepPreView.do?',
    '화물차': 'https://m.directdb.co.kr/at/prd/atarc/step1/formStepPreView.do?pdcDvcd=buss&',
    '법인차': 'https://m.directdb.co.kr/copr/atarc/step1/formStepPreView.do?',
    '한문철': 'https://m.directdb.co.kr/at/prd/atarc/step1/formStepPreView.do?',
    '박수석님TM': '1566-0015',
    '자사TM': '1566-0015',
    '실손보험': 'https://m.directdb.co.kr/at/prd/atarc/step1/formStepPreView.do?',
    '결제혜택': 'https://m.directdb.co.kr/evt/benefit/benefitView.do?',
    '이벤트': 'https://m.db-direct.co.kr/event/2024_sa?',
  }
};

// ★ 범용/보종 구분된 기본 랜딩
export const DEFAULT_LANDING = {
  PC: {
    '일반형-5구': {
      범용: { 홈링크:'메인',브랜드소식:'산출페이지',메인이미지:'산출페이지',타이틀:'산출페이지',서브링크1:'산출페이지',서브링크2:'산출페이지',썸네일1:'산출페이지',썸네일2:'운전자보험',썸네일3:'실손보험',다이나믹섬네일1:'산출페이지',다이나믹섬네일2:'갱신',다이나믹섬네일3:'산출페이지',다이나믹섬네일4:'산출페이지',다이나믹섬네일5:'산출페이지' },
      보종: { 홈링크:'메인',브랜드소식:'산출페이지',메인이미지:'산출페이지',타이틀:'산출페이지',서브링크1:'산출페이지',서브링크2:'산출페이지',썸네일1:'산출페이지',썸네일2:'갱신',썸네일3:'이륜차',다이나믹섬네일1:'산출페이지',다이나믹섬네일2:'산출페이지',다이나믹섬네일3:'산출페이지',다이나믹섬네일4:'산출페이지',다이나믹섬네일5:'산출페이지' },
    },
    '일반형': {
      범용: { 홈링크:'메인',브랜드소식:'산출페이지',메인이미지:'산출페이지',타이틀:'산출페이지',서브링크1:'산출페이지',서브링크2:'산출페이지',서브링크3:'산출페이지',썸네일1:'산출페이지',썸네일2:'운전자보험',썸네일3:'실손보험' },
      보종: { 홈링크:'메인',브랜드소식:'산출페이지',메인이미지:'산출페이지',타이틀:'산출페이지',서브링크1:'산출페이지',서브링크2:'산출페이지',서브링크3:'산출페이지',썸네일1:'산출페이지',썸네일2:'갱신',썸네일3:'이륜차' },
    },
    '일반형-2구': {
      범용: { 홈링크:'메인',메인이미지:'산출페이지',타이틀:'산출페이지',서브링크1:'산출페이지',서브링크2:'산출페이지',서브링크3:'산출페이지',썸네일1:'산출페이지',썸네일2:'운전자보험',썸네일3:'실손보험',다이나믹섬네일1:'산출페이지',다이나믹섬네일2:'갱신' },
      보종: { 홈링크:'메인',메인이미지:'산출페이지',타이틀:'산출페이지',서브링크1:'산출페이지',서브링크2:'산출페이지',서브링크3:'산출페이지',썸네일1:'산출페이지',썸네일2:'갱신',썸네일3:'이륜차',다이나믹섬네일1:'산출페이지',다이나믹섬네일2:'산출페이지' },
    },
    '없음': { 범용: {}, 보종: {} },
  },
  MO: {
    '섬네일형-탭': {
      범용: { 홈링크:'메인',브랜드소식:'산출페이지',메인이미지:'산출페이지',타이틀:'산출페이지','탭1-1':'산출페이지','탭1-2':'운전자보험','탭1-3':'실손보험','탭2-1':'산출페이지','탭2-2':'갱신','탭2-3':'이륜차','탭3-1':'산출페이지','탭3-2':'산출페이지','탭3-3':'산출페이지' },
      보종: { 홈링크:'메인',브랜드소식:'산출페이지',메인이미지:'산출페이지',타이틀:'산출페이지','탭1-1':'산출페이지','탭1-2':'갱신','탭1-3':'이륜차','탭2-1':'산출페이지','탭2-2':'산출페이지','탭2-3':'산출페이지','탭3-1':'산출페이지','탭3-2':'산출페이지','탭3-3':'산출페이지' },
    },
    '일반형-버튼': {
      범용: { 홈링크:'메인',브랜드소식:'산출페이지',메인이미지:'산출페이지',타이틀:'산출페이지',메뉴1:'산출페이지',메뉴2:'운전자보험',메뉴3:'실손보험',메뉴4:'산출페이지',썸네일1:'산출페이지',썸네일2:'갱신',썸네일3:'이륜차' },
      보종: { 홈링크:'메인',브랜드소식:'산출페이지',메인이미지:'산출페이지',타이틀:'산출페이지',메뉴1:'산출페이지',메뉴2:'갱신',메뉴3:'이륜차',메뉴4:'산출페이지',썸네일1:'산출페이지',썸네일2:'산출페이지',썸네일3:'산출페이지' },
    },
    '일반형-리스팅': {
      범용: { 브랜드소식:'산출페이지',서브링크1:'산출페이지',서브링크2:'운전자보험',서브링크3:'실손보험',컨텐츠1:'산출페이지',컨텐츠2:'갱신',버튼1:'산출페이지',버튼2:'이륜차',썸네일1:'산출페이지',썸네일2:'산출페이지',썸네일3:'산출페이지' },
      보종: { 브랜드소식:'산출페이지',서브링크1:'산출페이지',서브링크2:'갱신',서브링크3:'이륜차',컨텐츠1:'산출페이지',컨텐츠2:'산출페이지',버튼1:'산출페이지',버튼2:'산출페이지',썸네일1:'산출페이지',썸네일2:'산출페이지',썸네일3:'산출페이지' },
    },
    '섬네일형-플리킹': {
      범용: { 홈링크:'메인',브랜드소식:'산출페이지',메인이미지:'산출페이지',타이틀:'산출페이지',썸네일1:'산출페이지',썸네일2:'운전자보험',썸네일3:'실손보험',썸네일4:'갱신',썸네일5:'이륜차' },
      보종: { 홈링크:'메인',브랜드소식:'산출페이지',메인이미지:'산출페이지',타이틀:'산출페이지',썸네일1:'산출페이지',썸네일2:'갱신',썸네일3:'이륜차',썸네일4:'산출페이지',썸네일5:'산출페이지' },
    },
    '없음': { 범용: {}, 보종: {} },
  }
};

export const BUJONG_CFG = {
  자동차: { groups: [
    { grp:'구사명', bj:'범용', kid_pre:'IFA', ptnr_pc:'C464', ptnr_mo:'C465', grp_en_pc:'pcgroup_old_brand', grp_en_mo:'mogroup_old_brand', utm_bj:'brand' },
    { grp:'신사명', bj:'범용', kid_pre:'IFC', ptnr_pc:'C464', ptnr_mo:'C465', grp_en_pc:'pcgroup_new_brand', grp_en_mo:'mogroup_new_brand', utm_bj:'brand' },
    { grp:'구사명', bj:'보종', kid_pre:'CIB', ptnr_pc:'C464', ptnr_mo:'C465', grp_en_pc:'pcgroup_old_car', grp_en_mo:'mogroup_old_car', utm_bj:'car_personal' },
    { grp:'신사명', bj:'보종', kid_pre:'CID', ptnr_pc:'C464', ptnr_mo:'C465', grp_en_pc:'pcgroup_new_car', grp_en_mo:'mogroup_new_car', utm_bj:'car_personal' },
  ]},
  이륜차: { groups: [{ grp:'이륜차-일반그룹', bj:'보종', kid_pre:'CIR', ptnr_pc:'C614', ptnr_mo:'C614', grp_en_pc:'pcgroup_bike', grp_en_mo:'mogroup_bike', utm_bj:'car_bike_personal' }]},
  법인차: { groups: [{ grp:'법인차', bj:'보종', kid_pre:'COR', ptnr_pc:'C464', ptnr_mo:'CB03', grp_en_pc:'pcgroup_general_corpatarc', grp_en_mo:'mogroup_corporation', utm_bj:'car_corporate' }]},
  화물차: { groups: [{ grp:'화물차', bj:'보종', kid_pre:'CIR', ptnr_pc:'C464', ptnr_mo:'C735', grp_en_pc:'pcgroup_buss', grp_en_mo:'general_buss', utm_bj:'car_truck' }]},
  원데이: { groups: [{ grp:'원데이', bj:'보종', kid_pre:'CIR', ptnr_pc:'C464', ptnr_mo:'C539', grp_en_pc:'pcgroup_oneday', grp_en_mo:'mogroup_oneday', utm_bj:'car_oneday' }]},
  톡보험: { groups: [{ grp:'톡보험', bj:'보종', kid_pre:'CIS', ptnr_pc:'C464', ptnr_mo:'C465', grp_en_pc:'pcgroup_talk', grp_en_mo:'mogroup_talk', utm_bj:'car_talk' }]},
};

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

// 구글 시트에서 마지막 키워드ID 번호 가져오기
export async function fetchLastKidNums() {
  try {
    const res = await fetch(`${GAS_URL}?action=getLastKidNums`);
    const data = await res.json();
    return { pc: data.pc, mo: data.mo };
  } catch {
    return { pc: null, mo: null };
  }
}

// 구글 시트에 키워드ID 누적 저장
export async function appendKeywords(rows) {
  try {
    const res = await fetch(GAS_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'appendKeywords', rows }),
    });
    return await res.json();
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// URL 빌드
export function buildRows({ sojae, date, bujong, pcTpl, moTpl, landingPC, landingMO, kidPcStart, kidMoStart }) {
  const cfg = BUJONG_CFG[bujong];
  const pcAreas = TEMPLATES.PC[pcTpl] || [];
  const moAreas = TEMPLATES.MO[moTpl] || [];
  let kidPc = kidPcStart;
  let kidMo = kidMoStart;
  const rows = [];

  for (const g of cfg.groups) {
    if (!pcAreas.length) continue;
    for (const area of pcAreas) {
      const landing = landingPC[g.bj]?.[area] || '산출페이지';
      const baseUrl = LANDING_URL.PC[landing] || LANDING_URL.PC['산출페이지'];
      const kidVal = `${g.kid_pre}${kidPc++}`;
      rows.push({ dev:'PC', grp:g.grp, bj:g.bj, sojae, date, area, areaEn:AREA_EN[area]||area, landing, baseUrl, searchName:`네이버PC_${g.grp}_${g.bj}_${sojae}_${date}_${area}`, kidVal, ptnr:g.ptnr_pc, grpEn:g.grp_en_pc, utmBj:g.utm_bj });
    }
  }
  for (const g of cfg.groups) {
    if (!moAreas.length) continue;
    for (const area of moAreas) {
      const landing = landingMO[g.bj]?.[area] || '산출페이지';
      const baseUrl = LANDING_URL.MO[landing] || LANDING_URL.MO['산출페이지'];
      const kidVal = `${g.kid_pre}${kidMo++}`;
      rows.push({ dev:'MO', grp:g.grp, bj:g.bj, sojae, date, area, areaEn:AREA_EN[area]||area, landing, baseUrl, searchName:`네이버MO_${g.grp}_${g.bj}_${sojae}_${date}_${area}`, kidVal, ptnr:g.ptnr_mo, grpEn:g.grp_en_mo, utmBj:g.utm_bj });
    }
  }
  return rows;
}

export function buildFinalUrl(row, ekaCode) {
  const utmSrc = `naver_bs_${row.dev === 'PC' ? 'pc' : 'mo'}`;
  const utmCont = `${row.grpEn}_${row.date}_${row.areaEn}`;
  return `${row.baseUrl}${ekaCode}&partner_code=${row.ptnr}&keyword=${row.kidVal}&utm_source=${utmSrc}&utm_medium=bs&utm_campaign=${row.utmBj}&utm_content=${utmCont}`;
}
