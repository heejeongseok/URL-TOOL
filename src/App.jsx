import { useState, useCallback, useEffect } from 'react';
import * as XLSX from 'xlsx';
import {
  TEMPLATES, LANDING_OPTIONS, LANDING_URL, DEFAULT_LANDING,
  BUJONG_CFG, AREA_EN, buildRows, buildFinalUrl,
  fetchLastKidNums, appendKeywords
} from './data';
import './App.css';

const today = () => {
  const d = new Date();
  return String(d.getFullYear()).slice(2) + String(d.getMonth()+1).padStart(2,'0') + String(d.getDate()).padStart(2,'0');
};

function downloadXlsx(headers, data, sheetName, fileName) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
  ws['!cols'] = headers.map((_,i) => ({ wch: [8,6,10,8,12,8,12,10,10,50,60,14,10,130][i] || 20 }));
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, fileName);
}

function Chip({ label, active, color, onClick }) {
  return <button onClick={onClick} className={`chip ${active ? `chip-on chip-${color}` : ''}`}>{label}</button>;
}

// 랜딩 에디터 — 범용/보종 나란히
function LandingEditor({ dev, tpl, landing, onChange }) {
  const areas = TEMPLATES[dev][tpl] || [];
  if (!areas.length) return null;
  const isHighlight = val => val !== '산출페이지' && val !== '메인';
  const makeOpts = sel => LANDING_OPTIONS.map(l => <option key={l} selected={l===sel}>{l}</option>);

  return (
    <div className="landing-block-wrap">
      {['범용','보종'].map(bj => (
        <div key={bj} className="landing-block">
          <div className={`landing-header landing-header-${dev.toLowerCase()}`}>
            <span className={`badge badge-${dev.toLowerCase()}`}>{dev}</span>
            <span className={`badge badge-${bj==='범용'?'brand':'car'}`}>{bj}</span>
            <span className="landing-count">{areas.length}개</span>
          </div>
          <table className="landing-table">
            <tbody>
              {areas.map(area => {
                const val = landing[bj]?.[area] || DEFAULT_LANDING[dev]?.[tpl]?.[bj]?.[area] || '산출페이지';
                return (
                  <tr key={area} className={isHighlight(val) ? 'hl' : ''}>
                    <td className="area-name">{area}</td>
                    <td>
                      <select value={val} onChange={e => onChange(dev, bj, area, e.target.value)}>
                        {LANDING_OPTIONS.map(l => <option key={l}>{l}</option>)}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

function Step1({ onRowsBuilt }) {
  const [sojae, setSojae] = useState('');
  const [date, setDate] = useState(today());
  const [bujong, setBujong] = useState('자동차');
  const [pcTpl, setPcTpl] = useState('일반형-5구');
  const [moTpl, setMoTpl] = useState('섬네일형-탭');
  const [kidPcStart, setKidPcStart] = useState('');
  const [kidMoStart, setKidMoStart] = useState('');
  const [landing, setLanding] = useState({ PC: { 범용:{}, 보종:{} }, MO: { 범용:{}, 보종:{} } });
  const [loading, setLoading] = useState(false);
  const [sheetStatus, setSheetStatus] = useState('');
  const [generated, setGenerated] = useState(false);

  // 시트에서 마지막 키워드ID 자동 불러오기
  useEffect(() => {
    setSheetStatus('구글 시트에서 마지막 키워드ID 불러오는 중...');
    fetchLastKidNums().then(({ pc, mo }) => {
      if (pc !== null) { setKidPcStart(pc + 1); setSheetStatus(`✓ 구글 시트 연결됨 — PC 마지막: ${pc} → 다음: ${pc+1}`); }
      else { setKidPcStart(9001); setSheetStatus('구글 시트 데이터 없음 — 기본값 사용'); }
      if (mo !== null) setKidMoStart(mo + 1);
      else setKidMoStart(11001);
    });
  }, []);

  const handleLandingChange = (dev, bj, area, val) => {
    setLanding(prev => ({
      ...prev,
      [dev]: { ...prev[dev], [bj]: { ...prev[dev][bj], [area]: val } }
    }));
  };

  const getEffectiveLanding = (dev) => {
    const tpl = dev === 'PC' ? pcTpl : moTpl;
    const areas = TEMPLATES[dev][tpl] || [];
    const result = { 범용: {}, 보종: {} };
    ['범용','보종'].forEach(bj => {
      areas.forEach(a => {
        result[bj][a] = landing[dev][bj][a] || DEFAULT_LANDING[dev]?.[tpl]?.[bj]?.[a] || '산출페이지';
      });
    });
    return result;
  };

  const generate = async () => {
    if (!sojae || !date) { alert('소재명과 날짜를 입력해주세요!'); return; }
    setLoading(true);
    try {
      const rows = buildRows({
        sojae, date, bujong, pcTpl, moTpl,
        landingPC: getEffectiveLanding('PC'),
        landingMO: getEffectiveLanding('MO'),
        kidPcStart: Number(kidPcStart),
        kidMoStart: Number(kidMoStart),
      });
      onRowsBuilt(rows);

      // 에카 업로드용 CSV (키워드ID/파트너코드 제외)
      const ekaHeaders = ['매체','디바이스','그룹명','범용/보종','소재명','날짜','영역명','랜딩구분','에카업로드검색어명','에카업로드URL(기본URL)'];
      const ekaData = rows.map(r => ['네이버',r.dev,r.grp,r.bj,r.sojae,r.date,r.area,r.landing,r.searchName,r.baseUrl]);
      downloadXlsx(ekaHeaders, ekaData, '에카업로드', `에카업로드_${sojae}_${date}.xlsx`);

      // 구글 시트에 키워드ID 누적 저장
      setSheetStatus('구글 시트에 키워드ID 저장 중...');
      const result = await appendKeywords(rows.map(r => ({ searchName: r.searchName, area: r.area, kidVal: r.kidVal })));
      if (result.success) {
        setSheetStatus(`✓ 구글 시트에 ${result.count}개 키워드ID 저장 완료!`);
      } else {
        setSheetStatus('⚠ 구글 시트 저장 실패 — 로컬 CSV는 정상 다운로드됨');
      }
      setGenerated(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="step-content">
      <div className="card">
        <div className="card-title">소재명 & 날짜</div>
        <div className="grid2">
          <div className="form-group"><label>소재명 <span className="required">*</span></label><input value={sojae} onChange={e=>setSojae(e.target.value)} placeholder="예: 출고대응"/></div>
          <div className="form-group"><label>날짜 <span className="required">*</span></label><input value={date} onChange={e=>setDate(e.target.value)} maxLength={6} placeholder="예: 260513"/></div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">보종</div>
        <div className="chip-row">
          {Object.keys(BUJONG_CFG).map(b => (
            <Chip key={b} label={{'자동차':'🚗 자동차','이륜차':'🏍 이륜차','법인차':'🏢 법인차','화물차':'🚚 화물차','원데이':'📅 원데이','톡보험':'💬 톡보험'}[b]} active={bujong===b} color="dark" onClick={()=>setBujong(b)}/>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">템플릿</div>
        <div className="tpl-section">
          <span className="badge badge-pc">PC</span>
          <div className="chip-row">
            {Object.keys(TEMPLATES.PC).map(t => <Chip key={t} label={t==='일반형-5구'?'일반형-5구 ★':t} active={pcTpl===t} color="pc" onClick={()=>setPcTpl(t)}/>)}
          </div>
        </div>
        <div className="tpl-section" style={{marginTop:'.625rem'}}>
          <span className="badge badge-mo">MO</span>
          <div className="chip-row">
            {Object.keys(TEMPLATES.MO).map(t => <Chip key={t} label={t==='섬네일형-탭'?'섬네일형-탭 ★':t} active={moTpl===t} color="mo" onClick={()=>setMoTpl(t)}/>)}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title-row">
          <span className="card-title">영역별 랜딩 설정</span>
          <span className="card-hint">
            <span className="hl-dot"></span> 산출페이지·메인 외 랜딩 표시
          </span>
        </div>
        <LandingEditor dev="PC" tpl={pcTpl} landing={landing.PC} onChange={handleLandingChange}/>
        <div style={{height:'.75rem'}}/>
        <LandingEditor dev="MO" tpl={moTpl} landing={landing.MO} onChange={handleLandingChange}/>
      </div>

      <div className="card">
        <div className="card-title">키워드ID 시작번호</div>
        {sheetStatus && <div className={`sheet-status ${sheetStatus.includes('✓')?'ok':''}`}>{sheetStatus}</div>}
        <div className="grid2" style={{marginTop:'.5rem'}}>
          <div className="form-group"><label>PC</label><input type="number" value={kidPcStart} onChange={e=>setKidPcStart(e.target.value)}/></div>
          <div className="form-group"><label>MO</label><input type="number" value={kidMoStart} onChange={e=>setKidMoStart(e.target.value)}/></div>
        </div>
      </div>

      <button className="btn btn-primary btn-lg" onClick={generate} disabled={loading}>
        {loading ? '생성 중...' : '⬇ 에카 업로드용 파일 생성 & 다운로드'}
      </button>
      {generated && <div className="success-msg">✓ 에카업로드_{sojae}_{date}.xlsx 다운로드 완료! 키워드ID 구글 시트에 저장됨.</div>}
    </div>
  );
}

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
      const lines = e.target.result.split('\n').filter(l => l.trim());
      const map = {};
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',');
        if (cols.length < 4) continue;
        const name = cols[2]?.trim().replace(/^"|"$/g,'');
        const url = cols[3]?.trim().replace(/^"|"$/g,'');
        if (name && url) map[name] = url;
      }
      setEkaMap(map);
    };
    reader.readAsText(file, 'utf-8');
  }, []);

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

  const generate = () => {
    if (!ekaFile) { alert('에카 결과 파일을 업로드해주세요!'); return; }
    let targetRows = rows1;
    if (!targetRows?.length) {
      const names = searchNames.trim().split('\n').filter(Boolean);
      if (!names.length) { alert('소재명 목록을 입력해주세요!'); return; }
      let kpc = Number(kidPcStart)||9001, kmo = Number(kidMoStart)||11001;
      targetRows = names.map(sn => {
        sn = sn.trim();
        const parts = sn.split('_');
        const dev = parts[0].includes('PC')?'PC':'MO';
        const grp = parts[1], bj = parts[2];
        const date = parts[parts.length-2], area = parts[parts.length-1];
        const sojae = parts.slice(3,-2).join('_');
        let cfg_group = null;
        for (const cfg of Object.values(BUJONG_CFG)) {
          cfg_group = cfg.groups.find(g => g.grp===grp && g.bj===bj);
          if (cfg_group) break;
        }
        if (!cfg_group) cfg_group = {kid_pre:'CIR',ptnr_pc:'C464',ptnr_mo:'C465',grp_en_pc:'',grp_en_mo:'',utm_bj:'car_personal'};
        const kidNum = dev==='PC'?kpc++:kmo++;
        return { dev, grp, bj, sojae, date, area, areaEn:AREA_EN[area]||area, landing:'', baseUrl:'', searchName:sn, kidVal:`${cfg_group.kid_pre}${kidNum}`, ptnr:dev==='PC'?cfg_group.ptnr_pc:cfg_group.ptnr_mo, grpEn:dev==='PC'?cfg_group.grp_en_pc:cfg_group.grp_en_mo, utmBj:cfg_group.utm_bj };
      });
    }

    let errors = 0;
    const results = targetRows.map(r => {
      const ekaUrl = ekaMap[r.searchName] || '';
      if (!ekaUrl) { errors++; return {...r, finalUrl:'[에카URL없음]', landingName: r.landing||'-'}; }
      const idx = ekaUrl.indexOf('src=');
      const ekaCode = idx>=0?ekaUrl.substring(idx):'';
      const landingUrlPart = idx>=0?ekaUrl.substring(0,idx):ekaUrl;
      const landingName = r.landing || LANDING_URL_TO_NAME[landingUrlPart] || landingUrlPart;
      const baseUrl = r.baseUrl || landingUrlPart;
      const finalUrl = buildFinalUrl({...r, baseUrl}, ekaCode);
      return {...r, baseUrl, landingName, finalUrl};
    });

    setErrCount(errors);
    const headers = ['매체','디바이스','그룹명','범용/보종','소재명','날짜','영역명','에카업로드검색어명','랜딩구분','키워드ID','파트너코드','최종URL'];
    const data = results.map(r => ['네이버',r.dev,r.grp,r.bj,r.sojae,r.date,r.area,r.searchName,r.landingName||r.landing,r.kidVal,r.ptnr,r.finalUrl]);
    const fname = results[0]?`최종URL_${results[0].sojae}_${results[0].date}.xlsx`:'최종URL.xlsx';
    downloadXlsx(headers, data, '최종URL', fname);
    setDone(true);
  };

  return (
    <div className="step-content">
      <div className="notice">에이스카운터에서 발급받은 결과 파일을 업로드하면 최종 URL이 완성됩니다.</div>
      <div className="card">
        <div className="card-title">에카 결과 파일 업로드 <span className="required">*</span></div>
        <div className={`upload-area ${ekaFile?'upload-done':''}`} onClick={()=>document.getElementById('eka-file').click()} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)handleEkaFile(f);}}>
          <div className="upload-icon">{ekaFile?'✓':'📂'}</div>
          <div className="upload-text">{ekaFile?ekaFile.name:'에카 결과 파일 드래그 또는 클릭 (.csv)'}</div>
          {ekaFile&&<div className="upload-sub">{Object.keys(ekaMap).length}개 검색어 로드됨</div>}
        </div>
        <input id="eka-file" type="file" accept=".csv,.xlsx" style={{display:'none'}} onChange={e=>e.target.files[0]&&handleEkaFile(e.target.files[0])}/>
      </div>

      {(!rows1?.length) && (
        <div className="card">
          <div className="card-title">소재명 목록 & 키워드ID</div>
          <textarea value={searchNames} onChange={e=>setSearchNames(e.target.value)} rows={5} placeholder={'네이버MO_구사명_범용_전기차_260507_홈링크\n...'}/>
          <div className="grid2" style={{marginTop:'.75rem'}}>
            <div className="form-group"><label>PC 키워드ID 시작번호</label><input type="number" value={kidPcStart} onChange={e=>setKidPcStart(e.target.value)} placeholder="예: 8690"/></div>
            <div className="form-group"><label>MO 키워드ID 시작번호</label><input type="number" value={kidMoStart} onChange={e=>setKidMoStart(e.target.value)} placeholder="예: 10288"/></div>
          </div>
        </div>
      )}
      {rows1?.length>0&&<div className="info-box">✓ 1단계에서 생성된 {rows1.length}개 행 자동 연결됨</div>}

      <button className="btn btn-primary btn-lg" onClick={generate}>⬇ 최종 URL 엑셀 다운로드</button>
      {done&&<div className="success-msg">✓ 최종URL 엑셀 다운로드 완료!{errCount>0&&<span className="warn-msg"> ⚠ 에카URL 없음: {errCount}개</span>}</div>}
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(1);
  const [rows1, setRows1] = useState([]);
  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo"><span className="logo-db">DB</span><span className="logo-text">네이버 브랜드검색 URL 생성기</span></div>
          <div className="header-badge">DB손해보험</div>
        </div>
      </header>
      <main className="main">
        <div className="tab-bar">
          <button className={`tab ${step===1?'tab-on':''}`} onClick={()=>setStep(1)}><span className="tab-num">01</span><span className="tab-label">에카 업로드용 생성</span></button>
          <div className="tab-arrow">→</div>
          <button className={`tab ${step===2?'tab-on':''}`} onClick={()=>setStep(2)}><span className="tab-num">02</span><span className="tab-label">최종 URL 완성</span></button>
        </div>
        {step===1&&<Step1 onRowsBuilt={rows=>{setRows1(rows);}}/>}
        {step===2&&<Step2 rows1={rows1}/>}
      </main>
    </div>
  );
}
