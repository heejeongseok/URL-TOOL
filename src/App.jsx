import { useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import {
  TEMPLATES, LANDING_OPTIONS, LANDING_URL, DEFAULT_LANDING,
  BUJONG_CFG, AREA_EN, buildRows, buildFinalUrl
} from './data';
import './App.css';

const today = () => {
  const d = new Date();
  return String(d.getFullYear()).slice(2) + String(d.getMonth()+1).padStart(2,'0') + String(d.getDate()).padStart(2,'0');
};

// ─── 엑셀 다운로드 유틸 ───
function downloadXlsx(headers, data, sheetName, fileName) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
  const colWidths = headers.map((h,i) => ({ wch: [8,6,10,8,12,8,12,10,50,60,14,10,130][i] || 20 }));
  ws['!cols'] = colWidths;
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, fileName);
}

// ─── 칩 컴포넌트 ───
function Chip({ label, active, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`chip ${active ? `chip-on chip-${color}` : ''}`}
    >{label}</button>
  );
}

// ─── 랜딩 에디터 ───
function LandingEditor({ dev, tpl, landing, onChange }) {
  const areas = TEMPLATES[dev][tpl] || [];
  if (!areas.length) return null;
  return (
    <div className="landing-block">
      <div className={`landing-header landing-header-${dev.toLowerCase()}`}>
        <span className={`badge badge-${dev.toLowerCase()}`}>{dev}</span>
        {tpl} — {areas.length}개 영역
      </div>
      <table className="landing-table">
        <tbody>
          {areas.map(area => (
            <tr key={area}>
              <td className="area-name">{area}</td>
              <td>
                <select
                  value={landing[area] || DEFAULT_LANDING[area] || '산출페이지'}
                  onChange={e => onChange(area, e.target.value)}
                >
                  {LANDING_OPTIONS.map(l => <option key={l}>{l}</option>)}
                </select>
              </td>
              <td className="url-preview">
                {LANDING_URL[dev][landing[area] || DEFAULT_LANDING[area] || '산출페이지'] || ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── STEP 1: 에카 업로드용 ───
function Step1({ onRowsBuilt }) {
  const [sojae, setSojae] = useState('');
  const [date, setDate] = useState(today());
  const [bujong, setBujong] = useState('자동차');
  const [pcTpl, setPcTpl] = useState('일반형-5구');
  const [moTpl, setMoTpl] = useState('섬네일형-탭');
  const [kidPcStart, setKidPcStart] = useState(9001);
  const [kidMoStart, setKidMoStart] = useState(11001);
  const [landingPC, setLandingPC] = useState({});
  const [landingMO, setLandingMO] = useState({});
  const [generated, setGenerated] = useState(false);

  const setLanding = (dev, area, val) => {
    if (dev === 'PC') setLandingPC(p => ({ ...p, [area]: val }));
    else setLandingMO(p => ({ ...p, [area]: val }));
  };

  const getEffectiveLanding = (dev) => {
    const areas = TEMPLATES[dev][dev === 'PC' ? pcTpl : moTpl] || [];
    const base = dev === 'PC' ? landingPC : landingMO;
    const result = {};
    areas.forEach(a => { result[a] = base[a] || DEFAULT_LANDING[a] || '산출페이지'; });
    return result;
  };

  const generate = () => {
    if (!sojae || !date) { alert('소재명과 날짜를 입력해주세요!'); return; }
    const rows = buildRows({
      sojae, date, bujong, pcTpl, moTpl,
      landingPC: getEffectiveLanding('PC'),
      landingMO: getEffectiveLanding('MO'),
      kidPcStart: Number(kidPcStart),
      kidMoStart: Number(kidMoStart),
    });
    onRowsBuilt(rows);
    setGenerated(true);

    // 에카 업로드용 CSV 다운로드
    const headers = ['매체','디바이스','그룹명','범용/보종','소재명','날짜','영역명','랜딩구분','에카업로드검색어명','에카업로드URL(기본URL)'];
    const data = rows.map(r => ['네이버',r.dev,r.grp,r.bj,r.sojae,r.date,r.area,r.landing,r.searchName,r.baseUrl]);
    downloadXlsx(headers, data, '에카업로드', `에카업로드_${sojae}_${date}.xlsx`);

    // 키워드ID 누적 CSV
    const kidHeaders = ['소재명(에카검색어명)','영역명','키워드ID','코드','번호'];
    const kidData = rows.map(r => {
      const code = r.kidVal.replace(/\d+$/, '');
      const num = r.kidVal.replace(/^\D+/, '');
      return [r.searchName, r.area, r.kidVal, code, num];
    });
    downloadXlsx(kidHeaders, kidData, '키워드ID누적', `키워드ID_${sojae}_${date}.xlsx`);
  };

  return (
    <div className="step-content">
      {/* 소재명/날짜 */}
      <div className="card">
        <div className="card-title">소재명 & 날짜</div>
        <div className="grid2">
          <div className="form-group">
            <label>소재명 <span className="required">*</span></label>
            <input value={sojae} onChange={e=>setSojae(e.target.value)} placeholder="예: 출고대응" />
          </div>
          <div className="form-group">
            <label>날짜 <span className="required">*</span></label>
            <input value={date} onChange={e=>setDate(e.target.value)} maxLength={6} placeholder="예: 260513" />
          </div>
        </div>
      </div>

      {/* 보종 */}
      <div className="card">
        <div className="card-title">보종</div>
        <div className="chip-row">
          {Object.keys(BUJONG_CFG).map(b => (
            <Chip key={b} label={{'자동차':'🚗 자동차','이륜차':'🏍 이륜차','법인차':'🏢 법인차','화물차':'🚚 화물차','원데이':'📅 원데이','톡보험':'💬 톡보험'}[b]} active={bujong===b} color="dark" onClick={()=>setBujong(b)} />
          ))}
        </div>
      </div>

      {/* 템플릿 */}
      <div className="card">
        <div className="card-title">템플릿</div>
        <div className="tpl-section">
          <div className="tpl-label"><span className="badge badge-pc">PC</span></div>
          <div className="chip-row">
            {Object.keys(TEMPLATES.PC).map(t => (
              <Chip key={t} label={t==='일반형-5구'?'일반형-5구 ★':t} active={pcTpl===t} color="pc" onClick={()=>setPcTpl(t)} />
            ))}
          </div>
        </div>
        <div className="tpl-section" style={{marginTop:'0.75rem'}}>
          <div className="tpl-label"><span className="badge badge-mo">MO</span></div>
          <div className="chip-row">
            {Object.keys(TEMPLATES.MO).map(t => (
              <Chip key={t} label={t==='섬네일형-탭'?'섬네일형-탭 ★':t} active={moTpl===t} color="mo" onClick={()=>setMoTpl(t)} />
            ))}
          </div>
        </div>
      </div>

      {/* 랜딩 설정 */}
      <div className="card">
        <div className="card-title-row">
          <span className="card-title">영역별 랜딩 확인</span>
          <span className="card-hint">수정하면 전체 그룹 자동 적용</span>
        </div>
        <LandingEditor dev="PC" tpl={pcTpl} landing={landingPC} onChange={(a,v)=>setLanding('PC',a,v)} />
        <div style={{height:'0.75rem'}} />
        <LandingEditor dev="MO" tpl={moTpl} landing={landingMO} onChange={(a,v)=>setLanding('MO',a,v)} />
      </div>

      {/* 키워드ID */}
      <div className="card">
        <div className="card-title">키워드ID 시작번호</div>
        <div className="grid2">
          <div className="form-group">
            <label>PC</label>
            <input type="number" value={kidPcStart} onChange={e=>setKidPcStart(e.target.value)} />
          </div>
          <div className="form-group">
            <label>MO</label>
            <input type="number" value={kidMoStart} onChange={e=>setKidMoStart(e.target.value)} />
          </div>
        </div>
      </div>

      <button className="btn btn-primary btn-lg" onClick={generate}>
        ⬇ 에카 업로드용 파일 생성 & 다운로드
      </button>
      {generated && (
        <div className="success-msg">
          ✓ 에카업로드_{sojae}_{date}.xlsx &nbsp;·&nbsp; 키워드ID_{sojae}_{date}.xlsx 다운로드 완료!
        </div>
      )}
    </div>
  );
}

// ─── STEP 2: 최종 URL 완성 ───
function Step2({ rows1 }) {
  const [ekaFile, setEkaFile] = useState(null);
  const [ekaMap, setEkaMap] = useState({});
  const [searchNames, setSearchNames] = useState('');
  const [kidPcStart, setKidPcStart] = useState('');
  const [kidMoStart, setKidMoStart] = useState('');
  const [done, setDone] = useState(false);
  const [errCount, setErrCount] = useState(0);

  const handleEkaFile = useCallback((file) => {
    setEkaFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n').filter(l => l.trim());
      const map = {};
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',');
        if (cols.length < 4) continue;
        const name = cols[2]?.trim().replace(/^"|"$/g, '');
        const url = cols[3]?.trim().replace(/^"|"$/g, '');
        if (name && url) map[name] = url;
      }
      setEkaMap(map);
    };
    reader.readAsText(file, 'utf-8');
  }, []);

  const generate = () => {
    if (!ekaFile) { alert('에카 결과 파일을 업로드해주세요!'); return; }

    // 소재명 목록: rows1이 있으면 그걸 쓰고, 없으면 입력값 파싱
    let targetRows = rows1;
    if (!targetRows || !targetRows.length) {
      // 소재명 + 키워드ID 시작번호로 직접 계산
      const names = searchNames.trim().split('\n').filter(Boolean);
      if (!names.length) { alert('소재명 목록을 입력해주세요!'); return; }
      // 소재명에서 메타 파싱해서 rows 재생성
      let kidPc = Number(kidPcStart) || 9001;
      let kidMo = Number(kidMoStart) || 11001;
      targetRows = names.map(sn => {
        sn = sn.trim();
        const parts = sn.split('_');
        const dev = parts[0].includes('PC') ? 'PC' : 'MO';
        const grp = parts[1];
        const bj = parts[2];
        const date = parts[parts.length - 2];
        const area = parts[parts.length - 1];
        const sojae = parts.slice(3, -2).join('_');
        // 보종 찾기
        let cfg_group = null;
        for (const [, cfg] of Object.entries(BUJONG_CFG)) {
          cfg_group = cfg.groups.find(g => g.grp === grp && g.bj === bj);
          if (cfg_group) break;
        }
        if (!cfg_group) cfg_group = { kid_pre:'CIR', ptnr_pc:'C464', ptnr_mo:'C465', grp_en_pc:'', grp_en_mo:'', utm_bj:'car_personal' };
        const kidNum = dev === 'PC' ? kidPc++ : kidMo++;
        const kidVal = `${cfg_group.kid_pre}${kidNum}`;
        const areaEn = AREA_EN[area] || area;
        // 랜딩은 에카 URL에서 추출
        return {
          dev, grp, bj, sojae, date, area, areaEn,
          landing: '', baseUrl: '',
          searchName: sn, kidVal,
          ptnr: dev === 'PC' ? cfg_group.ptnr_pc : cfg_group.ptnr_mo,
          grpEn: dev === 'PC' ? cfg_group.grp_en_pc : cfg_group.grp_en_mo,
          utmBj: cfg_group.utm_bj,
        };
      });
    }

    let errors = 0;
    const results = targetRows.map(r => {
      const ekaUrl = ekaMap[r.searchName] || '';
      if (!ekaUrl) { errors++; return { ...r, finalUrl: '[에카URL없음]', landing: r.landing || '-' }; }
      const idx = ekaUrl.indexOf('src=');
      const ekaCode = idx >= 0 ? ekaUrl.substring(idx) : '';
      const landingUrlPart = idx >= 0 ? ekaUrl.substring(0, idx) : ekaUrl;

      // 랜딩구분: baseUrl로 역산
      const LANDING_URL_TO_NAME = {
        'https://www.directdb.co.kr/mainView.do?':'메인',
        'https://www.directdb.co.kr/at/prd/atarc/step1/formStepPreView.do?':'산출페이지',
        'https://www.directdb.co.kr/at/prd/atarc/step1/formStepPreView.do?isRenew=Y&':'갱신',
        'https://www.directdb.co.kr/at/prd/mtcc/step1/formStepPreView.do?':'이륜차',
        'https://www.directdb.co.kr/copr/atarc/step1/formStepPreView.do?':'법인자동차',
        'https://m.directdb.co.kr/mainView.do?':'메인',
        'https://m.directdb.co.kr/at/prd/atarc/step1/formStepPreView.do?':'산출페이지',
        'https://m.directdb.co.kr/at/prd/atarc/step1/formStepPreView.do?isRenew=Y&':'갱신',
        'https://m.directdb.co.kr/at/prd/mtcc/step1/formStepPreView.do?':'이륜차',
        'https://m.directdb.co.kr/at/prd/ondy/step1/formStepPreView.do?':'원데이',
        'https://m.directdb.co.kr/at/prd/atarc/step1/formStepPreView.do?pdcDvcd=buss&':'화물차',
        'https://m.directdb.co.kr/copr/atarc/step1/formStepPreView.do?':'법인차',
      };
      const landingName = r.landing || LANDING_URL_TO_NAME[landingUrlPart] || landingUrlPart;
      const baseUrl = r.baseUrl || landingUrlPart;
      const finalUrl = buildFinalUrl({ ...r, baseUrl }, ekaCode);
      return { ...r, baseUrl, landing: landingName, finalUrl };
    });

    setErrCount(errors);

    const headers = ['매체','디바이스','그룹명','범용/보종','소재명','날짜','영역명','에카업로드검색어명','랜딩구분','키워드ID','파트너코드','최종URL'];
    const data = results.map(r => ['네이버',r.dev,r.grp,r.bj,r.sojae,r.date,r.area,r.searchName,r.landing,r.kidVal,r.ptnr,r.finalUrl]);
    const fname = results[0] ? `최종URL_${results[0].sojae}_${results[0].date}.xlsx` : '최종URL.xlsx';
    downloadXlsx(headers, data, '최종URL', fname);
    setDone(true);
  };

  return (
    <div className="step-content">
      <div className="notice">
        에이스카운터에서 발급받은 결과 파일을 업로드하면 최종 URL이 완성됩니다.
      </div>

      {/* 에카 결과 파일 */}
      <div className="card">
        <div className="card-title">에카 결과 파일 업로드 <span className="required">*</span></div>
        <div
          className={`upload-area ${ekaFile ? 'upload-done' : ''}`}
          onClick={() => document.getElementById('eka-file-input').click()}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if(f) handleEkaFile(f); }}
        >
          <div className="upload-icon">{ekaFile ? '✓' : '📂'}</div>
          <div className="upload-text">
            {ekaFile ? ekaFile.name : '에카 결과 파일 드래그 또는 클릭 (.csv)'}
          </div>
          {ekaFile && <div className="upload-sub">{Object.keys(ekaMap).length}개 검색어 로드됨</div>}
        </div>
        <input id="eka-file-input" type="file" accept=".csv,.xlsx,.xls" style={{display:'none'}} onChange={e => e.target.files[0] && handleEkaFile(e.target.files[0])} />
      </div>

      {/* 소재명 직접 입력 (Step1 거치지 않았을 때) */}
      {(!rows1 || !rows1.length) && (
        <div className="card">
          <div className="card-title">소재명 목록</div>
          <div className="card-hint" style={{marginBottom:'0.5rem'}}>1단계를 거쳤다면 자동으로 적용됩니다. 바로 업로드하는 경우 아래에 입력하세요.</div>
          <textarea
            value={searchNames}
            onChange={e => setSearchNames(e.target.value)}
            rows={6}
            placeholder={'네이버MO_구사명_범용_전기차_260507_홈링크\n네이버MO_구사명_범용_전기차_260507_브랜드소식\n...'}
          />
          <div className="grid2" style={{marginTop:'0.75rem'}}>
            <div className="form-group">
              <label>PC 키워드ID 시작번호</label>
              <input type="number" value={kidPcStart} onChange={e=>setKidPcStart(e.target.value)} placeholder="예: 8690" />
            </div>
            <div className="form-group">
              <label>MO 키워드ID 시작번호</label>
              <input type="number" value={kidMoStart} onChange={e=>setKidMoStart(e.target.value)} placeholder="예: 10288" />
            </div>
          </div>
        </div>
      )}

      {rows1 && rows1.length > 0 && (
        <div className="info-box">
          ✓ 1단계에서 생성된 {rows1.length}개 행이 자동 연결됩니다.
        </div>
      )}

      <button className="btn btn-primary btn-lg" onClick={generate}>
        ⬇ 최종 URL 엑셀 다운로드
      </button>

      {done && (
        <div className="success-msg">
          ✓ 최종URL 엑셀 다운로드 완료!
          {errCount > 0 && <span className="warn-msg"> &nbsp;⚠ 에카URL 없음: {errCount}개</span>}
        </div>
      )}
    </div>
  );
}

// ─── 메인 앱 ───
export default function App() {
  const [step, setStep] = useState(1);
  const [rows1, setRows1] = useState([]);

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-db">DB</span>
            <span className="logo-text">네이버 브랜드검색 URL 생성기</span>
          </div>
          <div className="header-badge">DB손해보험</div>
        </div>
      </header>

      <main className="main">
        <div className="tab-bar">
          <button className={`tab ${step===1?'tab-on':''}`} onClick={()=>setStep(1)}>
            <span className="tab-num">01</span>
            <span className="tab-label">에카 업로드용 생성</span>
          </button>
          <div className="tab-arrow">→</div>
          <button className={`tab ${step===2?'tab-on':''}`} onClick={()=>setStep(2)}>
            <span className="tab-num">02</span>
            <span className="tab-label">최종 URL 완성</span>
          </button>
        </div>

        {step === 1 && <Step1 onRowsBuilt={rows => { setRows1(rows); }} />}
        {step === 2 && <Step2 rows1={rows1} />}
      </main>
    </div>
  );
}
